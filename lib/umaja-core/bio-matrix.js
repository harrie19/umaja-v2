/**
 * Bio-Matrix System
 * Plant nutrition tracking and milestone-based reminders
 */
export class BioMatrix {
    constructor() {
        this.feedingHistory = [];
        this.milestoneThreshold = 250; // Default €250 milestone
        this.lastMilestoneAmount = 0;
        this.nutrition = {
            calmag: '5-10ml per 10L water',
            biobizz: '2-3ml per 10L water'
        };
    }
    /**
     * Check if a financial milestone has been reached
     */
    async checkMilestone(amount) {
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
    async createReminder(type) {
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
    async logFeeding(type, amount, notes) {
        const log = {
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
    getFeedingHistory(limit = 10) {
        return this.feedingHistory.slice(-limit);
    }
    /**
     * Get last feeding time
     */
    getLastFeedingTime() {
        if (this.feedingHistory.length === 0) {
            return null;
        }
        return this.feedingHistory[this.feedingHistory.length - 1].timestamp;
    }
    /**
     * Calculate urgency based on last feeding
     */
    calculateUrgency() {
        const lastFeeding = this.getLastFeedingTime();
        if (!lastFeeding) {
            return 'high'; // No feeding history
        }
        const hoursSinceLastFeeding = (Date.now() - lastFeeding.getTime()) / (1000 * 60 * 60);
        if (hoursSinceLastFeeding > 168) { // 7 days
            return 'high';
        }
        else if (hoursSinceLastFeeding > 72) { // 3 days
            return 'medium';
        }
        return 'low';
    }
    /**
     * Set milestone threshold
     */
    setMilestoneThreshold(amount) {
        this.milestoneThreshold = amount;
    }
    /**
     * Get milestone threshold
     */
    getMilestoneThreshold() {
        return this.milestoneThreshold;
    }
    /**
     * Get nutrition information
     */
    getNutrition() {
        return { ...this.nutrition };
    }
    /**
     * Update nutrition guidelines
     */
    updateNutrition(nutrition) {
        this.nutrition = {
            ...this.nutrition,
            ...nutrition
        };
    }
    /**
     * Get next scheduled feeding reminder
     */
    getNextScheduledFeeding() {
        const lastFeeding = this.getLastFeedingTime();
        if (!lastFeeding) {
            return new Date(); // Immediate if never fed
        }
        // Schedule next feeding in 3 days
        const nextFeeding = new Date(lastFeeding.getTime() + (3 * 24 * 60 * 60 * 1000));
        return nextFeeding;
    }
}
BioMatrix.MAX_FEEDING_HISTORY = 100;
export default BioMatrix;
//# sourceMappingURL=bio-matrix.js.map