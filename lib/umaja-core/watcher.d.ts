/**
 * UMAJA Guardian - The Watcher
 * Main orchestration class combining all UMAJA Core subsystems
 * with John Cleese personality
 */
import { JohnCleesePersonality } from './personality-config.js';
import { SacredTurboMonitor } from './sacred-turbo-monitor.js';
import { GaiaNetSync } from './gaianet-sync.js';
import { BioMatrix } from './bio-matrix.js';
import { SystemStatus, EventType } from './types.js';
export declare class UmajaGuardian {
    private processId;
    private checkInterval;
    private personality;
    private processMonitor;
    private gaianetSync;
    private bioMatrix;
    private isMonitoring;
    constructor(processId?: number);
    /**
     * Initialize the Guardian system
     */
    initialize(): Promise<void>;
    /**
     * Monitor Sacred-Turbo-Modus process
     */
    monitorProcess(): Promise<void>;
    /**
     * Auto-restart process on failure
     */
    restartProcess(): Promise<void>;
    /**
     * Perform comprehensive system health check
     */
    performHealthCheck(): Promise<SystemStatus>;
    /**
     * Generate personality response for an event
     */
    respond(event: EventType, data?: any): string;
    /**
     * Handle payout event with Ethical Ledger split
     */
    handlePayout(amount: number): Promise<string>;
    /**
     * Sync GaiaNet credits
     */
    syncGaiaNet(): Promise<string>;
    /**
     * Get bio-matrix reminder
     */
    getBioReminder(): Promise<string>;
    /**
     * Log plant feeding
     */
    logFeeding(type: string, amount: string): Promise<string>;
    /**
     * Get complete system status
     */
    getStatus(): Promise<any>;
    /**
     * Start continuous monitoring
     */
    startMonitoring(): void;
    /**
     * Stop monitoring
     */
    stopMonitoring(): void;
    /**
     * Get personality instance
     */
    getPersonality(): JohnCleesePersonality;
    /**
     * Get process monitor instance
     */
    getProcessMonitor(): SacredTurboMonitor;
    /**
     * Get GaiaNet sync instance
     */
    getGaiaNetSync(): GaiaNetSync;
    /**
     * Get Bio-Matrix instance
     */
    getBioMatrix(): BioMatrix;
}
export default UmajaGuardian;
//# sourceMappingURL=watcher.d.ts.map