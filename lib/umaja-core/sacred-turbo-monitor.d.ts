/**
 * Sacred-Turbo Monitor
 * Monitors the sacred process (PID 14430 by default)
 */
import { ProcessStats, RestartResult } from './types.js';
export declare class SacredTurboMonitor {
    private pid;
    private monitoringInterval?;
    private checkIntervalMs;
    constructor(pid?: number);
    /**
     * Check if the process is running
     */
    isRunning(): Promise<boolean>;
    /**
     * Get process statistics
     */
    getStats(): Promise<ProcessStats | null>;
    /**
     * Restart the process
     * Note: This is a placeholder - actual implementation depends on the process type
     */
    restart(): Promise<RestartResult>;
    /**
     * Start monitoring the process
     */
    startMonitoring(onStatusChange?: (isRunning: boolean) => void): void;
    /**
     * Stop monitoring
     */
    stopMonitoring(): void;
    /**
     * Set the PID to monitor
     */
    setPid(pid: number): void;
    /**
     * Get current PID
     */
    getPid(): number;
    /**
     * Set monitoring interval
     */
    setCheckInterval(intervalMs: number): void;
}
export default SacredTurboMonitor;
//# sourceMappingURL=sacred-turbo-monitor.d.ts.map