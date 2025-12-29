/**
 * PayPal Test Connection API Route
 * GET /api/test-connection
 * 
 * Tests PayPal API connectivity and validates credentials
 */

import { paypalPayoutEngine } from '../../lib/paypal/payout';

export interface TestConnectionResponse {
  success: boolean;
  message: string;
  mode: string;
  timestamp: string;
  configuration: {
    hasClientId: boolean;
    hasClientSecret: boolean;
    mode: string;
    impactSplitPercentage: string;
  };
}

/**
 * Handle GET request for connection testing
 */
export async function GET(request: Request): Promise<Response> {
  try {
    // Test the connection
    const connectionTest = await paypalPayoutEngine.testConnection();

    // Get configuration status (without exposing actual values)
    const config = {
      hasClientId: !!(process.env.PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID_PAYOUT),
      hasClientSecret: !!(process.env.PAYPAL_CLIENT_SECRET || process.env.PAYPAL_CLIENT_SECRET_PAYOUT),
      mode: process.env.PAYPAL_MODE || 'sandbox',
      impactSplitPercentage: process.env.IMPACT_SPLIT_PERCENTAGE || '19',
    };

    const response: TestConnectionResponse = {
      success: connectionTest.success,
      message: connectionTest.message,
      mode: connectionTest.mode,
      timestamp: new Date().toISOString(),
      configuration: config,
    };

    return Response.json(response, {
      status: connectionTest.success ? 200 : 500,
    });
  } catch (error) {
    console.error('Test connection error:', error);

    const errorResponse: TestConnectionResponse = {
      success: false,
      message: error instanceof Error ? error.message : 'Connection test failed',
      mode: process.env.PAYPAL_MODE || 'sandbox',
      timestamp: new Date().toISOString(),
      configuration: {
        hasClientId: !!(process.env.PAYPAL_CLIENT_ID || process.env.PAYPAL_CLIENT_ID_PAYOUT),
        hasClientSecret: !!(process.env.PAYPAL_CLIENT_SECRET || process.env.PAYPAL_CLIENT_SECRET_PAYOUT),
        mode: process.env.PAYPAL_MODE || 'sandbox',
        impactSplitPercentage: process.env.IMPACT_SPLIT_PERCENTAGE || '19',
      },
    };

    return Response.json(errorResponse, { status: 500 });
  }
}

/**
 * Handle POST request (same as GET for flexibility)
 */
export async function POST(request: Request): Promise<Response> {
  return GET(request);
}

// Export for Node.js environments
export default GET;
