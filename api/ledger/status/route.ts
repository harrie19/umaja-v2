/**
 * Ethical Ledger Status API Route
 * GET /api/ledger/status
 * 
 * Retrieves ledger status, transaction history, and statistics
 */

import { ethicalLedger } from '../../../lib/ledger/ethical-ledger';

export interface LedgerStatusResponse {
  success: boolean;
  message: string;
  status?: {
    stats: {
      totalTransactions: number;
      totalOriginalAmount: number;
      totalImpactAmount: number;
      totalRecipientAmount: number;
      impactPercentage: number;
      currency: string;
      mode: string;
    };
    recentTransactions: Array<{
      id: string;
      timestamp: string;
      type: string;
      originalAmount: number;
      impactAmount: number;
      recipientAmount: number;
      impactPercentage: number;
      currency: string;
      recipient?: string;
      status: string;
      paypalBatchId?: string;
      mode: string;
    }>;
    lastUpdated: string;
  };
  impactSummary?: {
    totalImpactGenerated: number;
    transactionCount: number;
    averageImpactPerTransaction: number;
    mode: string;
  };
}

/**
 * Handle GET request for ledger status
 */
export async function GET(request: Request): Promise<Response> {
  try {
    const url = new URL(request.url);
    const limit = parseInt(url.searchParams.get('limit') || '10', 10);
    const mode = url.searchParams.get('mode') as 'sandbox' | 'live' | null;

    // Get ledger status
    const status = mode
      ? ethicalLedger.getStatusByMode(mode, limit)
      : ethicalLedger.getStatus(limit);

    // Get impact summary
    const impactSummary = ethicalLedger.getImpactSummary();

    // Format response
    const response: LedgerStatusResponse = {
      success: true,
      message: 'Ledger status retrieved successfully',
      status: {
        stats: status.stats,
        recentTransactions: status.recentTransactions.map(t => ({
          id: t.id,
          timestamp: t.timestamp.toISOString(),
          type: t.type,
          originalAmount: t.originalAmount,
          impactAmount: t.impactAmount,
          recipientAmount: t.recipientAmount,
          impactPercentage: t.impactPercentage,
          currency: t.currency,
          recipient: t.recipient,
          status: t.status,
          paypalBatchId: t.paypalBatchId,
          mode: t.mode,
        })),
        lastUpdated: status.lastUpdated.toISOString(),
      },
      impactSummary,
    };

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error('Ledger status API error:', error);

    const errorResponse: LedgerStatusResponse = {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve ledger status',
    };

    return Response.json(errorResponse, { status: 500 });
  }
}

/**
 * Handle POST request for specific queries
 */
export async function POST(request: Request): Promise<Response> {
  try {
    const body = await request.json();
    const limit = body.limit || 10;
    const mode = body.mode as 'sandbox' | 'live' | undefined;

    // Get ledger status
    const status = mode
      ? ethicalLedger.getStatusByMode(mode, limit)
      : ethicalLedger.getStatus(limit);

    // Get impact summary
    const impactSummary = ethicalLedger.getImpactSummary();

    // Format response
    const response: LedgerStatusResponse = {
      success: true,
      message: 'Ledger status retrieved successfully',
      status: {
        stats: status.stats,
        recentTransactions: status.recentTransactions.map(t => ({
          id: t.id,
          timestamp: t.timestamp.toISOString(),
          type: t.type,
          originalAmount: t.originalAmount,
          impactAmount: t.impactAmount,
          recipientAmount: t.recipientAmount,
          impactPercentage: t.impactPercentage,
          currency: t.currency,
          recipient: t.recipient,
          status: t.status,
          paypalBatchId: t.paypalBatchId,
          mode: t.mode,
        })),
        lastUpdated: status.lastUpdated.toISOString(),
      },
      impactSummary,
    };

    return Response.json(response, { status: 200 });
  } catch (error) {
    console.error('Ledger status API error:', error);

    const errorResponse: LedgerStatusResponse = {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to retrieve ledger status',
    };

    return Response.json(errorResponse, { status: 500 });
  }
}

// Export for Node.js environments
export default GET;
