/**
 * Ethical Ledger System for UMAJA v4.2.2
 * Tracks all transactions with 19% Impact-Split
 */

// TypeScript Interfaces
export interface Transaction {
  id: string;
  timestamp: Date;
  type: 'payout' | 'payment' | 'refund';
  originalAmount: number;
  impactAmount: number;
  recipientAmount: number;
  impactPercentage: number;
  currency: string;
  recipient?: string;
  status: 'pending' | 'completed' | 'failed';
  paypalBatchId?: string;
  metadata?: Record<string, any>;
  mode: 'sandbox' | 'live';
}

export interface LedgerStats {
  totalTransactions: number;
  totalOriginalAmount: number;
  totalImpactAmount: number;
  totalRecipientAmount: number;
  impactPercentage: number;
  currency: string;
  mode: 'sandbox' | 'live';
}

export interface LedgerStatus {
  stats: LedgerStats;
  recentTransactions: Transaction[];
  lastUpdated: Date;
}

/**
 * Ethical Ledger Class
 */
export class EthicalLedger {
  private transactions: Transaction[] = [];
  private mode: 'sandbox' | 'live';
  private impactPercentage: number;

  constructor() {
    this.mode = (process.env.ETHICAL_LEDGER_MODE as 'sandbox' | 'live') || 
                (process.env.PAYPAL_MODE as 'sandbox' | 'live') || 'live';
    this.impactPercentage = parseInt(process.env.IMPACT_SPLIT_PERCENTAGE || '19', 10);
  }

  /**
   * Generate unique transaction ID
   */
  private generateTransactionId(): string {
    return `TXN_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Record a new transaction
   */
  recordTransaction(
    type: 'payout' | 'payment' | 'refund',
    originalAmount: number,
    impactAmount: number,
    recipientAmount: number,
    currency: string = 'USD',
    recipient?: string,
    paypalBatchId?: string,
    metadata?: Record<string, any>
  ): Transaction {
    const transaction: Transaction = {
      id: this.generateTransactionId(),
      timestamp: new Date(),
      type,
      originalAmount,
      impactAmount,
      recipientAmount,
      impactPercentage: this.impactPercentage,
      currency,
      recipient,
      status: 'pending',
      paypalBatchId,
      metadata,
      mode: this.mode,
    };

    this.transactions.push(transaction);
    return transaction;
  }

  /**
   * Update transaction status
   */
  updateTransactionStatus(
    transactionId: string,
    status: 'pending' | 'completed' | 'failed',
    metadata?: Record<string, any>
  ): Transaction | null {
    const transaction = this.transactions.find(t => t.id === transactionId);
    
    if (transaction) {
      transaction.status = status;
      if (metadata) {
        transaction.metadata = { ...transaction.metadata, ...metadata };
      }
      return transaction;
    }
    
    return null;
  }

  /**
   * Get transaction by ID
   */
  getTransaction(transactionId: string): Transaction | null {
    return this.transactions.find(t => t.id === transactionId) || null;
  }

  /**
   * Get all transactions with optional filters
   */
  getTransactions(filters?: {
    type?: 'payout' | 'payment' | 'refund';
    status?: 'pending' | 'completed' | 'failed';
    startDate?: Date;
    endDate?: Date;
    mode?: 'sandbox' | 'live';
  }): Transaction[] {
    let filtered = [...this.transactions];

    if (filters) {
      if (filters.type) {
        filtered = filtered.filter(t => t.type === filters.type);
      }
      if (filters.status) {
        filtered = filtered.filter(t => t.status === filters.status);
      }
      if (filters.startDate) {
        filtered = filtered.filter(t => t.timestamp >= filters.startDate!);
      }
      if (filters.endDate) {
        filtered = filtered.filter(t => t.timestamp <= filters.endDate!);
      }
      if (filters.mode) {
        filtered = filtered.filter(t => t.mode === filters.mode);
      }
    }

    return filtered;
  }

  /**
   * Calculate ledger statistics
   */
  private calculateStats(transactions: Transaction[]): LedgerStats {
    const stats: LedgerStats = {
      totalTransactions: transactions.length,
      totalOriginalAmount: 0,
      totalImpactAmount: 0,
      totalRecipientAmount: 0,
      impactPercentage: this.impactPercentage,
      currency: 'USD',
      mode: this.mode,
    };

    transactions.forEach(transaction => {
      stats.totalOriginalAmount += transaction.originalAmount;
      stats.totalImpactAmount += transaction.impactAmount;
      stats.totalRecipientAmount += transaction.recipientAmount;
    });

    // Round to 2 decimal places
    stats.totalOriginalAmount = parseFloat(stats.totalOriginalAmount.toFixed(2));
    stats.totalImpactAmount = parseFloat(stats.totalImpactAmount.toFixed(2));
    stats.totalRecipientAmount = parseFloat(stats.totalRecipientAmount.toFixed(2));

    return stats;
  }

  /**
   * Get ledger status with statistics
   */
  getStatus(limit: number = 10): LedgerStatus {
    const allTransactions = this.getTransactions();
    const recentTransactions = allTransactions
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);

    return {
      stats: this.calculateStats(allTransactions),
      recentTransactions,
      lastUpdated: new Date(),
    };
  }

  /**
   * Get ledger status by mode (sandbox/live)
   */
  getStatusByMode(mode: 'sandbox' | 'live', limit: number = 10): LedgerStatus {
    const filteredTransactions = this.getTransactions({ mode });
    const recentTransactions = filteredTransactions
      .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
      .slice(0, limit);

    return {
      stats: this.calculateStats(filteredTransactions),
      recentTransactions,
      lastUpdated: new Date(),
    };
  }

  /**
   * Clear all transactions (use with caution)
   */
  clearTransactions(mode?: 'sandbox' | 'live'): void {
    if (mode) {
      this.transactions = this.transactions.filter(t => t.mode !== mode);
    } else {
      this.transactions = [];
    }
  }

  /**
   * Export transactions to JSON
   */
  exportTransactions(): string {
    return JSON.stringify(this.transactions, null, 2);
  }

  /**
   * Import transactions from JSON
   */
  importTransactions(jsonData: string): void {
    try {
      const imported = JSON.parse(jsonData);
      if (Array.isArray(imported)) {
        // Convert timestamp strings back to Date objects
        this.transactions = imported.map(t => ({
          ...t,
          timestamp: new Date(t.timestamp),
        }));
      }
    } catch (error) {
      throw new Error(`Failed to import transactions: ${error instanceof Error ? error.message : 'Invalid JSON'}`);
    }
  }

  /**
   * Get impact summary for reporting
   */
  getImpactSummary(): {
    totalImpactGenerated: number;
    transactionCount: number;
    averageImpactPerTransaction: number;
    mode: string;
  } {
    const stats = this.calculateStats(this.transactions);
    
    return {
      totalImpactGenerated: stats.totalImpactAmount,
      transactionCount: stats.totalTransactions,
      averageImpactPerTransaction: stats.totalTransactions > 0 
        ? parseFloat((stats.totalImpactAmount / stats.totalTransactions).toFixed(2))
        : 0,
      mode: this.mode,
    };
  }
}

// Export singleton instance
export const ethicalLedger = new EthicalLedger();
