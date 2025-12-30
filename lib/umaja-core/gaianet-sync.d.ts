/**
 * GaiaNet Reward Points Tracking
 *
 * CRITICAL CLARIFICATION (Added 2025-12-30):
 * These are PROMOTIONAL REWARD POINTS, not withdrawable funds.
 *
 * Think of them like airline miles - valuable for network use,
 * but NOT convertible to cash.
 *
 * Current Balance: 1,443,000 points
 * Liquid Value: €0
 * Speculative Future Value: Unknown (depends on $GAIA token launch)
 *
 * This affects the entire UMAJA financial model, which was originally
 * built assuming €500-5,000 starting capital. The reality is pure sweat equity.
 */
import { GaiaNetConfig, CreditSummary, LogAnalysis } from './types.js';
export declare class GaiaNetSync {
    private config;
    private lastFetchedCredits;
    private lastSyncTime;
    constructor(config?: Partial<GaiaNetConfig>);
    /**
     * Fetch current reward point balance from GaiaNet
     * Note: These are promotional points, not withdrawable currency
     */
    fetchCredits(): Promise<number>;
    /**
     * Analyze logs from GaiaNet node
     */
    analyzeLogs(): Promise<LogAnalysis>;
    /**
     * Calculate accumulated reward points since last sync
     */
    calculateAccumulated(): Promise<CreditSummary>;
    /**
     * Get GaiaNet node URL
     */
    getNodeUrl(): string;
    /**
     * Update base reward points (for recalibration)
     */
    updateBaseCredits(newBase: number): void;
    /**
     * Get current configuration
     */
    getConfig(): GaiaNetConfig;
    /**
     * Test connection to GaiaNet node
     */
    testConnection(): Promise<boolean>;
}
export default GaiaNetSync;
//# sourceMappingURL=gaianet-sync.d.ts.map