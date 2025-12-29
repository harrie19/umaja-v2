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

export class UmajaGuardian {
  private processId: number;
  private checkInterval: number = 60000; // 1 minute
  private personality: JohnCleesePersonality;
  private processMonitor: SacredTurboMonitor;
  private gaianetSync: GaiaNetSync;
  private bioMatrix: BioMatrix;
  private isMonitoring: boolean = false;

  constructor(processId: number = 14430) {
    this.processId = processId;
    this.personality = new JohnCleesePersonality();
    this.processMonitor = new SacredTurboMonitor(processId);
    this.gaianetSync = new GaiaNetSync();
    this.bioMatrix = new BioMatrix();
  }

  /**
   * Initialize the Guardian system
   */
  public async initialize(): Promise<void> {
    console.log(this.personality.getStartupBanner());
    
    // Start process monitoring
    this.startMonitoring();
    
    // Log startup event
    const response = this.personality.respond('startup');
    console.log(`\n${response.message}\n`);
  }

  /**
   * Monitor Sacred-Turbo-Modus process
   */
  public async monitorProcess(): Promise<void> {
    const isRunning = await this.processMonitor.isRunning();
    
    if (!isRunning) {
      const response = this.personality.respond('process_restart', { pid: this.processId });
      console.log(`⚠️  ${response.message}`);
      
      // Attempt restart
      await this.restartProcess();
    } else {
      const stats = await this.processMonitor.getStats();
      if (stats) {
        console.log(`✓ Process ${this.processId} running - CPU: ${stats.cpu}%, Memory: ${stats.memory}%`);
      }
    }
  }

  /**
   * Auto-restart process on failure
   */
  public async restartProcess(): Promise<void> {
    const result = await this.processMonitor.restart();
    
    if (result.success) {
      const response = this.personality.respond('process_start', { pid: result.newPid });
      console.log(`✓ ${response.message}`);
    } else {
      const response = this.personality.respond('error');
      console.log(`✗ ${response.message}`);
      console.log(`  Details: ${result.message}`);
    }
  }

  /**
   * Perform comprehensive system health check
   */
  public async performHealthCheck(): Promise<SystemStatus> {
    const isRunning = await this.processMonitor.isRunning();
    const stats = await this.processMonitor.getStats();
    
    let status: 'operational' | 'degraded' | 'critical';
    let message: string;

    if (!isRunning) {
      status = 'critical';
      const response = this.personality.respond('error');
      message = response.message;
    } else if (stats && stats.cpu > 80) {
      status = 'degraded';
      message = `Process running but CPU usage is high (${stats.cpu}%). *adjusts spectacles nervously*`;
    } else {
      status = 'operational';
      const response = this.personality.respond('health_check');
      message = response.message;
    }

    return {
      processRunning: isRunning,
      processId: this.processId,
      uptime: stats?.uptime || 0,
      lastCheck: new Date(),
      status,
      message
    };
  }

  /**
   * Generate personality response for an event
   */
  public respond(event: EventType, data?: any): string {
    const response = this.personality.respond(event, data);
    return response.message;
  }

  /**
   * Handle payout event with Ethical Ledger split
   */
  public async handlePayout(amount: number): Promise<string> {
    const ethicalAmount = amount * 0.19;
    const personalAmount = amount * 0.81;
    
    const response = this.personality.respond('payout_success', { amount });
    
    // Check for milestone
    const milestoneReached = await this.bioMatrix.checkMilestone(amount);
    
    let fullMessage = response.message;
    
    if (milestoneReached) {
      const bioReminder = await this.bioMatrix.createReminder();
      fullMessage += `\n\n${bioReminder.message}`;
    }
    
    return fullMessage;
  }

  /**
   * Sync GaiaNet credits
   */
  public async syncGaiaNet(): Promise<string> {
    try {
      const summary = await this.gaianetSync.calculateAccumulated();
      const response = this.personality.respond('credit_update', { credits: summary.current });
      
      return `${response.message}\n\nCurrent: ${summary.current.toLocaleString()} | Accumulated: ${summary.accumulated.toLocaleString()}`;
    } catch (error) {
      const response = this.personality.respond('error');
      return `${response.message}\n\nGaiaNet sync failed: ${error instanceof Error ? error.message : 'Unknown error'}`;
    }
  }

  /**
   * Get bio-matrix reminder
   */
  public async getBioReminder(): Promise<string> {
    const reminder = await this.bioMatrix.createReminder();
    return reminder.message;
  }

  /**
   * Log plant feeding
   */
  public async logFeeding(type: string, amount: string): Promise<string> {
    await this.bioMatrix.logFeeding(type, amount);
    return `Feeding logged: ${type} - ${amount}. The plants thank you. Probably.`;
  }

  /**
   * Get complete system status
   */
  public async getStatus(): Promise<any> {
    const healthCheck = await this.performHealthCheck();
    const gaianetSummary = await this.gaianetSync.calculateAccumulated();
    const nextFeeding = this.bioMatrix.getNextScheduledFeeding();
    const lastFeeding = this.bioMatrix.getLastFeedingTime();

    return {
      guardian: {
        version: '4.2.2',
        personality: 'C3PO + John Cleese',
        status: healthCheck.status
      },
      process: {
        pid: this.processId,
        running: healthCheck.processRunning,
        uptime: healthCheck.uptime
      },
      gaianet: {
        credits: gaianetSummary.current,
        accumulated: gaianetSummary.accumulated,
        lastSync: gaianetSummary.lastSync
      },
      bioMatrix: {
        lastFeeding,
        nextScheduledFeeding: nextFeeding,
        nutrition: this.bioMatrix.getNutrition()
      },
      message: healthCheck.message
    };
  }

  /**
   * Start continuous monitoring
   */
  public startMonitoring(): void {
    if (this.isMonitoring) {
      console.log('Monitoring already active');
      return;
    }

    this.isMonitoring = true;
    this.processMonitor.startMonitoring((isRunning) => {
      if (!isRunning) {
        const response = this.personality.respond('process_restart', { pid: this.processId });
        console.log(`⚠️  ${response}`);
      }
    });

    console.log(`✓ Guardian monitoring started for PID ${this.processId}`);
  }

  /**
   * Stop monitoring
   */
  public stopMonitoring(): void {
    this.processMonitor.stopMonitoring();
    this.isMonitoring = false;
    console.log('✓ Guardian monitoring stopped');
  }

  /**
   * Get personality instance
   */
  public getPersonality(): JohnCleesePersonality {
    return this.personality;
  }

  /**
   * Get process monitor instance
   */
  public getProcessMonitor(): SacredTurboMonitor {
    return this.processMonitor;
  }

  /**
   * Get GaiaNet sync instance
   */
  public getGaiaNetSync(): GaiaNetSync {
    return this.gaianetSync;
  }

  /**
   * Get Bio-Matrix instance
   */
  public getBioMatrix(): BioMatrix {
    return this.bioMatrix;
  }
}

export default UmajaGuardian;
