/**
 * UMAJA Core Type Definitions
 * The John Cleese Protocol - Type Safety Edition
 */
export interface SystemStatus {
    processRunning: boolean;
    processId: number;
    uptime: number;
    lastCheck: Date;
    status: 'operational' | 'degraded' | 'critical';
    message: string;
}
export interface ProcessStats {
    pid: number;
    cpu: number;
    memory: number;
    uptime: number;
}
export interface RestartResult {
    success: boolean;
    newPid?: number;
    message: string;
    timestamp: Date;
}
export interface GaiaNetConfig {
    nodeUrl: string;
    baseCredits: number;
}
export interface CreditSummary {
    current: number;
    accumulated: number;
    lastSync: Date;
    delta: number;
}
export interface LogAnalysis {
    totalRequests: number;
    successRate: number;
    errors: string[];
    lastActivity: Date;
}
export interface PlantNutrition {
    calmag: string;
    biobizz: string;
}
export interface NutritionAlert {
    type: 'calmag' | 'biobizz' | 'both';
    dosage: string;
    urgency: 'low' | 'medium' | 'high';
    message: string;
    timestamp: Date;
}
export interface FeedingLog {
    type: string;
    amount: string;
    timestamp: Date;
    notes?: string;
}
export interface MilestoneEvent {
    amount: number;
    type: 'payout' | 'credit';
    timestamp: Date;
    bioReminderTriggered: boolean;
}
export interface PersonalityResponse {
    message: string;
    context: string;
    timestamp: Date;
    mood?: 'content' | 'concerned' | 'weary' | 'dramatic';
}
export type EventType = 'process_restart' | 'process_start' | 'process_stop' | 'health_check' | 'payout_success' | 'credit_update' | 'bio_reminder' | 'milestone' | 'error' | 'idle' | 'startup';
//# sourceMappingURL=types.d.ts.map