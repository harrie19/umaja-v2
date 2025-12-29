/**
 * PayPal Payout API Route
 * POST /api/paypal/payout
 * 
 * Handles payout requests with Ethical Ledger integration
 */

import { paypalPayoutEngine } from '../../../lib/paypal/payout';
import { ethicalLedger } from '../../../lib/ledger/ethical-ledger';

export interface PayoutRequest {
  type: 'single' | 'batch';
  recipient?: string;
  recipients?: Array<{ email: string; amount: number; note?: string }>;
  amount?: number;
  currency?: string;
  note?: string;
}

export interface PayoutAPIResponse {
  success: boolean;
  message: string;
  data?: any;
  transactionId?: string;
  impactSplit?: {
    originalAmount: number;
    impactAmount: number;
    recipientAmount: number;
    percentage: number;
  };
  error?: string;
}

/**
 * Handle POST request for payouts
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body: PayoutRequest = await request.json();

    // Validate request
    if (!body.type || (body.type !== 'single' && body.type !== 'batch')) {
      return Response.json(
        {
          success: false,
          message: 'Invalid request: type must be "single" or "batch"',
        } as PayoutAPIResponse,
        { status: 400 }
      );
    }

    // Handle single payout
    if (body.type === 'single') {
      if (!body.recipient || !body.amount) {
        return Response.json(
          {
            success: false,
            message: 'Invalid request: recipient and amount are required for single payout',
          } as PayoutAPIResponse,
          { status: 400 }
        );
      }

      // Create payout
      const result = await paypalPayoutEngine.createSinglePayout(
        body.recipient,
        body.amount,
        body.currency || 'USD',
        body.note
      );

      if (!result.success) {
        return Response.json(
          {
            success: false,
            message: 'Payout failed',
            error: result.error,
          } as PayoutAPIResponse,
          { status: 500 }
        );
      }

      // Record in Ethical Ledger
      const transaction = ethicalLedger.recordTransaction(
        'payout',
        result.impactSplit!.originalAmount,
        result.impactSplit!.impactAmount,
        result.impactSplit!.recipientAmount,
        body.currency || 'USD',
        body.recipient,
        result.data?.batch_header.payout_batch_id,
        {
          note: body.note,
          paypalResponse: result.data,
        }
      );

      // Update transaction status to completed
      ethicalLedger.updateTransactionStatus(transaction.id, 'completed');

      return Response.json(
        {
          success: true,
          message: 'Payout created successfully',
          data: result.data,
          transactionId: transaction.id,
          impactSplit: result.impactSplit,
        } as PayoutAPIResponse,
        { status: 200 }
      );
    }

    // Handle batch payout
    if (body.type === 'batch') {
      if (!body.recipients || !Array.isArray(body.recipients) || body.recipients.length === 0) {
        return Response.json(
          {
            success: false,
            message: 'Invalid request: recipients array is required for batch payout',
          } as PayoutAPIResponse,
          { status: 400 }
        );
      }

      // Create batch payout
      const result = await paypalPayoutEngine.createBatchPayout(
        body.recipients,
        body.currency || 'USD'
      );

      if (!result.success) {
        return Response.json(
          {
            success: false,
            message: 'Batch payout failed',
            error: result.error,
          } as PayoutAPIResponse,
          { status: 500 }
        );
      }

      // Record in Ethical Ledger
      const transaction = ethicalLedger.recordTransaction(
        'payout',
        result.impactSplit!.originalAmount,
        result.impactSplit!.impactAmount,
        result.impactSplit!.recipientAmount,
        body.currency || 'USD',
        `Batch: ${body.recipients.length} recipients`,
        result.data?.batch_header.payout_batch_id,
        {
          recipients: body.recipients,
          paypalResponse: result.data,
        }
      );

      // Update transaction status to completed
      ethicalLedger.updateTransactionStatus(transaction.id, 'completed');

      return Response.json(
        {
          success: true,
          message: 'Batch payout created successfully',
          data: result.data,
          transactionId: transaction.id,
          impactSplit: result.impactSplit,
        } as PayoutAPIResponse,
        { status: 200 }
      );
    }

    return Response.json(
      {
        success: false,
        message: 'Invalid request type',
      } as PayoutAPIResponse,
      { status: 400 }
    );
  } catch (error) {
    console.error('Payout API error:', error);
    
    return Response.json(
      {
        success: false,
        message: 'Internal server error',
        error: error instanceof Error ? error.message : 'Unknown error',
      } as PayoutAPIResponse,
      { status: 500 }
    );
  }
}

// Export for Node.js environments
export default POST;
