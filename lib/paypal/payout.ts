/**
 * PayPal Payout Engine for UMAJA v4.2.2
 * Implements secure PayPal payout functionality with sandbox/live mode support
 */

// TypeScript Interfaces
export interface PayPalConfig {
  mode: 'sandbox' | 'live';
  clientId: string;
  clientSecret: string;
  sandboxUrl: string;
  liveUrl: string;
}

export interface PayPalAuthResponse {
  scope: string;
  access_token: string;
  token_type: string;
  app_id: string;
  expires_in: number;
  nonce: string;
}

export interface PayoutItem {
  recipient_type: 'EMAIL' | 'PHONE' | 'PAYPAL_ID';
  amount: {
    value: string;
    currency: string;
  };
  receiver: string;
  note?: string;
  sender_item_id: string;
}

export interface PayoutBatch {
  sender_batch_header: {
    sender_batch_id: string;
    email_subject: string;
    email_message?: string;
  };
  items: PayoutItem[];
}

export interface PayoutResponse {
  batch_header: {
    payout_batch_id: string;
    batch_status: string;
    sender_batch_header: {
      sender_batch_id: string;
      email_subject: string;
    };
  };
  links: Array<{
    href: string;
    rel: string;
    method: string;
  }>;
}

export interface PayoutResult {
  success: boolean;
  data?: PayoutResponse;
  error?: string;
  impactSplit?: {
    originalAmount: number;
    impactAmount: number;
    recipientAmount: number;
    percentage: number;
  };
}

/**
 * PayPal Payout Engine Class
 */
export class PayPalPayoutEngine {
  private config: PayPalConfig;
  private accessToken: string | null = null;
  private tokenExpiry: number = 0;

  constructor() {
    // Load configuration from environment variables
    this.config = {
      mode: (process.env.PAYPAL_MODE as 'sandbox' | 'live') || 'sandbox',
      clientId: process.env.PAYPAL_CLIENT_ID_PAYOUT || process.env.PAYPAL_CLIENT_ID || '',
      clientSecret: process.env.PAYPAL_CLIENT_SECRET_PAYOUT || process.env.PAYPAL_CLIENT_SECRET || '',
      sandboxUrl: process.env.PAYPAL_SANDBOX_URL || 'https://api-m.sandbox.paypal.com',
      liveUrl: process.env.PAYPAL_LIVE_URL || 'https://api-m.paypal.com',
    };

    this.validateConfig();
  }

  /**
   * Validate configuration
   */
  private validateConfig(): void {
    if (!this.config.clientId || !this.config.clientSecret) {
      throw new Error('PayPal credentials not configured. Please set PAYPAL_CLIENT_ID and PAYPAL_CLIENT_SECRET environment variables.');
    }
  }

  /**
   * Get the appropriate base URL based on mode
   */
  private getBaseUrl(): string {
    return this.config.mode === 'live' ? this.config.liveUrl : this.config.sandboxUrl;
  }

  /**
   * Get access token with caching
   */
  private async getAccessToken(): Promise<string> {
    // Return cached token if still valid
    if (this.accessToken && Date.now() < this.tokenExpiry) {
      return this.accessToken;
    }

    try {
      const auth = Buffer.from(
        `${this.config.clientId}:${this.config.clientSecret}`
      ).toString('base64');

      const response = await fetch(`${this.getBaseUrl()}/v1/oauth2/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': `Basic ${auth}`,
        },
        body: 'grant_type=client_credentials',
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Authentication failed: ${response.status} - ${errorText}`);
      }

      const data: PayPalAuthResponse = await response.json();
      this.accessToken = data.access_token;
      // Set expiry to 90% of actual expiry time for safety margin
      this.tokenExpiry = Date.now() + (data.expires_in * 900);

      return this.accessToken;
    } catch (error) {
      throw new Error(`Failed to authenticate with PayPal: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  /**
   * Calculate 19% Impact-Split for Ethical Ledger
   */
  private calculateImpactSplit(amount: number, percentage: number = 19): {
    originalAmount: number;
    impactAmount: number;
    recipientAmount: number;
    percentage: number;
  } {
    const impactAmount = parseFloat((amount * (percentage / 100)).toFixed(2));
    const recipientAmount = parseFloat((amount - impactAmount).toFixed(2));

    return {
      originalAmount: amount,
      impactAmount,
      recipientAmount,
      percentage,
    };
  }

  /**
   * Test PayPal API connection
   */
  async testConnection(): Promise<{ success: boolean; message: string; mode: string }> {
    try {
      const token = await this.getAccessToken();
      
      return {
        success: true,
        message: 'Successfully connected to PayPal API',
        mode: this.config.mode,
      };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Connection failed',
        mode: this.config.mode,
      };
    }
  }

  /**
   * Create a single payout with Impact-Split
   */
  async createSinglePayout(
    recipientEmail: string,
    amount: number,
    currency: string = 'USD',
    note?: string
  ): Promise<PayoutResult> {
    try {
      // Calculate impact split
      const impactPercentage = parseInt(process.env.IMPACT_SPLIT_PERCENTAGE || '19', 10);
      const split = this.calculateImpactSplit(amount, impactPercentage);

      const token = await this.getAccessToken();
      const batchId = `UMAJA_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const payoutData: PayoutBatch = {
        sender_batch_header: {
          sender_batch_id: batchId,
          email_subject: 'You have a payout from UMAJA!',
          email_message: note || 'You have received a payout. Thanks for using UMAJA!',
        },
        items: [
          {
            recipient_type: 'EMAIL',
            amount: {
              value: split.recipientAmount.toFixed(2),
              currency: currency,
            },
            receiver: recipientEmail,
            note: note || 'UMAJA Payout',
            sender_item_id: `ITEM_${Date.now()}`,
          },
        ],
      };

      const response = await fetch(`${this.getBaseUrl()}/v1/payments/payouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payoutData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Payout failed: ${response.status} - ${errorText}`);
      }

      const data: PayoutResponse = await response.json();

      return {
        success: true,
        data,
        impactSplit: split,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Create batch payout with Impact-Split for each recipient
   */
  async createBatchPayout(
    recipients: Array<{ email: string; amount: number; note?: string }>,
    currency: string = 'USD'
  ): Promise<PayoutResult> {
    try {
      const token = await this.getAccessToken();
      const batchId = `UMAJA_BATCH_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      const impactPercentage = parseInt(process.env.IMPACT_SPLIT_PERCENTAGE || '19', 10);

      const items: PayoutItem[] = recipients.map((recipient, index) => {
        const split = this.calculateImpactSplit(recipient.amount, impactPercentage);
        
        return {
          recipient_type: 'EMAIL',
          amount: {
            value: split.recipientAmount.toFixed(2),
            currency: currency,
          },
          receiver: recipient.email,
          note: recipient.note || 'UMAJA Batch Payout',
          sender_item_id: `BATCH_ITEM_${Date.now()}_${index}`,
        };
      });

      const payoutData: PayoutBatch = {
        sender_batch_header: {
          sender_batch_id: batchId,
          email_subject: 'You have a payout from UMAJA!',
          email_message: 'You have received a batch payout. Thanks for using UMAJA!',
        },
        items,
      };

      const response = await fetch(`${this.getBaseUrl()}/v1/payments/payouts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(payoutData),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Batch payout failed: ${response.status} - ${errorText}`);
      }

      const data: PayoutResponse = await response.json();

      // Calculate total impact split for batch
      const totalOriginal = recipients.reduce((sum, r) => sum + r.amount, 0);
      const totalSplit = this.calculateImpactSplit(totalOriginal, impactPercentage);

      return {
        success: true,
        data,
        impactSplit: totalSplit,
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error occurred',
      };
    }
  }

  /**
   * Get payout batch status
   */
  async getPayoutStatus(payoutBatchId: string): Promise<any> {
    try {
      const token = await this.getAccessToken();

      const response = await fetch(
        `${this.getBaseUrl()}/v1/payments/payouts/${payoutBatchId}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to get payout status: ${response.status} - ${errorText}`);
      }

      return await response.json();
    } catch (error) {
      throw new Error(`Failed to get payout status: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }
}

// Export singleton instance
export const paypalPayoutEngine = new PayPalPayoutEngine();
