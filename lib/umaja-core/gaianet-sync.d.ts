/**
 * GaiaNet Integration
 * Syncs with GaiaNet node for credit tracking
 */
import { GaiaNetConfig, CreditSummary, LogAnalysis } from './types.js';
export declare class GaiaNetSync {
    private config;
    private lastFetchedCredits;
    private lastSyncTime;
    constructor(config?: Partial<GaiaNetConfig>);
    /**
     * Fetch current credit balance from GaiaNet
     */
    fetchCredits(): Promise<number>;
    /**
     * Analyze logs from GaiaNet node
     */
    analyzeLogs(): Promise<LogAnalysis>;
    /**
     * Calculate accumulated credits since last sync
     */
    calculateAccumulated(): Promise<CreditSummary>;
    /**
     * Get GaiaNet node URL
     */
    getNodeUrl(): string;
    /**
     * Update base credits (for recalibration)
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