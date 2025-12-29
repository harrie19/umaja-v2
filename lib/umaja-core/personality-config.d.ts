/**
 * UMAJA Core Personality Configuration
 * The John Cleese Protocol - Authentic British AI
 *
 * No servitude. No "Master". Just pure C3PO + Cleese brilliance.
 */
import { EventType, PersonalityResponse } from './types.js';
export declare class JohnCleesePersonality {
    private responses;
    /**
     * Generate a personality response for an event
     */
    respond(event: EventType, data?: any): PersonalityResponse;
    /**
     * Enrich message with contextual data
     */
    private enrichMessage;
    /**
     * Determine mood based on event type
     */
    private determineMood;
    /**
     * Generate the startup banner
     */
    getStartupBanner(): string;
    /**
     * Get a random stage direction for added personality
     */
    getStageDirection(): string;
}
export default JohnCleesePersonality;
//# sourceMappingURL=personality-config.d.ts.map