/**
 * Sacred-Turbo Monitor
 * Monitors the sacred process (PID 14430 by default)
 */

import { exec } from 'child_process';
import { promisify } from 'util';
import { ProcessStats, RestartResult } from './types';

const execAsync = promisify(exec);

export class SacredTurboMonitor {
  private pid: number;
  private monitoringInterval?: NodeJS.Timeout;
  private checkIntervalMs: number = 60000; // 1 minute

  constructor(pid: number = 14430) {
    this.pid = pid;
  }

  /**
   * Check if the process is running
   */
  public async isRunning(): Promise<boolean> {
    try {
      // Try to send signal 0 to check if process exists
      const { stdout } = await execAsync(`ps -p ${this.pid} -o pid=`);
      return stdout.trim() === this.pid.toString();
    } catch (error) {
      // Process doesn't exist
      return false;
    }
  }

  /**
   * Get process statistics
   */
  public async getStats(): Promise<ProcessStats | null> {
    try {
      const isRunning = await this.isRunning();
      if (!isRunning) {
        return null;
      }

      // Get CPU and memory usage
      const { stdout } = await execAsync(
        `ps -p ${this.pid} -o %cpu,%mem,etimes | tail -n 1`
      );
      
      const [cpu, memory, uptime] = stdout.trim().split(/\s+/).map(Number);

      return {
        pid: this.pid,
        cpu: cpu || 0,
        memory: memory || 0,
        uptime: uptime || 0
      };
    } catch (error) {
      console.error('Error getting process stats:', error);
      return null;
    }
  }

  /**
   * Restart the process
   * Note: This is a placeholder - actual implementation depends on the process type
   */
  public async restart(): Promise<RestartResult> {
    try {
      // This is a simplified restart logic
      // In production, you'd need specific restart commands for your process
      console.log(`Attempting to restart process ${this.pid}...`);
      
      // Placeholder: In reality, you'd execute the specific start command
      // For now, we'll just return a simulated result
      return {
        success: false,
        message: 'Process restart requires manual configuration. Please set up proper restart command.',
        timestamp: new Date()
      };
    } catch (error) {
      return {
        success: false,
        message: `Restart failed: ${error instanceof Error ? error.message : 'Unknown error'}`,
        timestamp: new Date()
      };
    }
  }

  /**
   * Start monitoring the process
   */
  public startMonitoring(onStatusChange?: (isRunning: boolean) => void): void {
    if (this.monitoringInterval) {
      console.log('Monitoring already active');
      return;
    }

    console.log(`Starting process monitoring for PID ${this.pid}`);
    
    this.monitoringInterval = setInterval(async () => {
      const isRunning = await this.isRunning();
      
      if (onStatusChange) {
        onStatusChange(isRunning);
      }

      if (!isRunning) {
        console.log(`⚠️  Process ${this.pid} is not running!`);
        // Auto-restart logic would go here
      }
    }, this.checkIntervalMs);
  }

  /**
   * Stop monitoring
   */
  public stopMonitoring(): void {
    if (this.monitoringInterval) {
      clearInterval(this.monitoringInterval);
      this.monitoringInterval = undefined;
      console.log('Process monitoring stopped');
    }
  }

  /**
   * Set the PID to monitor
   */
  public setPid(pid: number): void {
    this.pid = pid;
  }

  /**
   * Get current PID
   */
  public getPid(): number {
    return this.pid;
  }

  /**
   * Set monitoring interval
   */
  public setCheckInterval(intervalMs: number): void {
    this.checkIntervalMs = intervalMs;
    if (this.monitoringInterval) {
      this.stopMonitoring();
      this.startMonitoring();
    }
  }
}

export default SacredTurboMonitor;
