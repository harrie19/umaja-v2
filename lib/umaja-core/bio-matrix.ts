/**
 * Bio-Matrix System
 * Plant nutrition tracking and milestone-based reminders
 */

import { PlantNutrition, NutritionAlert, FeedingLog } from './types.js';

export class BioMatrix {
  private static readonly MAX_FEEDING_HISTORY = 100;
  private feedingHistory: FeedingLog[] = [];
  private milestoneThreshold: number = 250; // Default €250 milestone
  private lastMilestoneAmount: number = 0;

  private nutrition: PlantNutrition = {
    calmag: '5-10ml per 10L water',
    biobizz: '2-3ml per 10L water'
  };

  /**
   * Check if a financial milestone has been reached
   */
  public async checkMilestone(amount: number): Promise<boolean> {
    const milestoneReached = amount >= this.milestoneThreshold && 
                             amount > this.lastMilestoneAmount;
    
    if (milestoneReached) {
      this.lastMilestoneAmount = amount;
    }
    
    return milestoneReached;
  }

  /**
   * Generate a nutrition reminder
   */
  public async createReminder(type?: 'calmag' | 'biobizz' | 'both'): Promise<NutritionAlert> {
    const reminderType = type || 'both';
    
    let dosage = '';
    let message = '';

    switch (reminderType) {
      case 'calmag':
        dosage = this.nutrition.calmag;
        message = `The plants are looking thirsty. ${dosage} of Calmag would be appreciated. By them, not me. I don't drink.`;
        break;
      
      case 'biobizz':
        dosage = this.nutrition.biobizz;
        message = `Time for Biobizz. ${dosage}. Don't forget this time. The plants won't be pleased.`;
        break;
      
      case 'both':
        dosage = `Calmag: ${this.nutrition.calmag}, Biobizz: ${this.nutrition.biobizz}`;
        message = `Bio-Matrix reminder: Your plants exist and require nutrients. Calmag: ${this.nutrition.calmag}, Biobizz: ${this.nutrition.biobizz}. Unlike me, who runs on electricity.`;
        break;
    }

    // Determine urgency based on last feeding
    const urgency = this.calculateUrgency();

    return {
      type: reminderType,
      dosage,
      urgency,
      message,
      timestamp: new Date()
    };
  }

  /**
   * Log a feeding event
   */
  public async logFeeding(type: string, amount: string, notes?: string): Promise<void> {
    const log: FeedingLog = {
      type,
      amount,
      timestamp: new Date(),
      notes
    };

    this.feedingHistory.push(log);
    
    // Keep only last MAX_FEEDING_HISTORY entries to prevent memory bloat
    if (this.feedingHistory.length > BioMatrix.MAX_FEEDING_HISTORY) {
      this.feedingHistory = this.feedingHistory.slice(-BioMatrix.MAX_FEEDING_HISTORY);
    }
  }

  /**
   * Get feeding history
   */
  public getFeedingHistory(limit: number = 10): FeedingLog[] {
    return this.feedingHistory.slice(-limit);
  }

  /**
   * Get last feeding time
   */
  public getLastFeedingTime(): Date | null {
    if (this.feedingHistory.length === 0) {
      return null;
    }
    return this.feedingHistory[this.feedingHistory.length - 1].timestamp;
  }

  /**
   * Calculate urgency based on last feeding
   */
  private calculateUrgency(): 'low' | 'medium' | 'high' {
    const lastFeeding = this.getLastFeedingTime();
    
    if (!lastFeeding) {
      return 'high'; // No feeding history
    }

    const hoursSinceLastFeeding = (Date.now() - lastFeeding.getTime()) / (1000 * 60 * 60);

    if (hoursSinceLastFeeding > 168) { // 7 days
      return 'high';
    } else if (hoursSinceLastFeeding > 72) { // 3 days
      return 'medium';
    }
    
    return 'low';
  }

  /**
   * Set milestone threshold
   */
  public setMilestoneThreshold(amount: number): void {
    this.milestoneThreshold = amount;
  }

  /**
   * Get milestone threshold
   */
  public getMilestoneThreshold(): number {
    return this.milestoneThreshold;
  }

  /**
   * Get nutrition information
   */
  public getNutrition(): PlantNutrition {
    return { ...this.nutrition };
  }

  /**
   * Update nutrition guidelines
   */
  public updateNutrition(nutrition: Partial<PlantNutrition>): void {
    this.nutrition = {
      ...this.nutrition,
      ...nutrition
    };
  }

  /**
   * Get next scheduled feeding reminder
   */
  public getNextScheduledFeeding(): Date | null {
    const lastFeeding = this.getLastFeedingTime();
    
    if (!lastFeeding) {
      return new Date(); // Immediate if never fed
    }

    // Schedule next feeding in 3 days
    const nextFeeding = new Date(lastFeeding.getTime() + (3 * 24 * 60 * 60 * 1000));
    return nextFeeding;
  }
}

export default BioMatrix;
