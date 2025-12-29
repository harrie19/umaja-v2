/**
 * Bio-Matrix System
 * Plant nutrition tracking and milestone-based reminders
 */
import { PlantNutrition, NutritionAlert, FeedingLog } from './types.js';
export declare class BioMatrix {
    private static readonly MAX_FEEDING_HISTORY;
    private feedingHistory;
    private milestoneThreshold;
    private lastMilestoneAmount;
    private nutrition;
    /**
     * Check if a financial milestone has been reached
     */
    checkMilestone(amount: number): Promise<boolean>;
    /**
     * Generate a nutrition reminder
     */
    createReminder(type?: 'calmag' | 'biobizz' | 'both'): Promise<NutritionAlert>;
    /**
     * Log a feeding event
     */
    logFeeding(type: string, amount: string, notes?: string): Promise<void>;
    /**
     * Get feeding history
     */
    getFeedingHistory(limit?: number): FeedingLog[];
    /**
     * Get last feeding time
     */
    getLastFeedingTime(): Date | null;
    /**
     * Calculate urgency based on last feeding
     */
    private calculateUrgency;
    /**
     * Set milestone threshold
     */
    setMilestoneThreshold(amount: number): void;
    /**
     * Get milestone threshold
     */
    getMilestoneThreshold(): number;
    /**
     * Get nutrition information
     */
    getNutrition(): PlantNutrition;
    /**
     * Update nutrition guidelines
     */
    updateNutrition(nutrition: Partial<PlantNutrition>): void;
    /**
     * Get next scheduled feeding reminder
     */
    getNextScheduledFeeding(): Date | null;
}
export default BioMatrix;
//# sourceMappingURL=bio-matrix.d.ts.map