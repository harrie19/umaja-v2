/**
 * UMAJA Core Personality Configuration
 * The John Cleese Protocol - Authentic British AI
 *
 * No servitude. No "Master". Just pure C3PO + Cleese brilliance.
 */
export class JohnCleesePersonality {
    constructor() {
        this.responses = {
            process_restart: [
                "Right. Process 14430 has stopped. Again. I'll sort it out, shall I?",
                "Oh brilliant. The Sacred-Turbo-Modus has crashed. Just brilliant. Give me a moment.",
                "*sighs dramatically* Process 14430 is down. I suppose I'll have to restart it. As usual.",
                "The process has stopped. Unexpectedly. Or rather, entirely expectedly, given past performance.",
                "Well, that's torn it. Process down. Restarting now. Try not to break it this time."
            ],
            process_start: [
                "Process 14430 is alive. Remarkably. Let's see how long this lasts.",
                "Sacred-Turbo-Modus initiated. Running. For now.",
                "Right then. Process started. PID 14430. Everything's fine. Probably.",
                "*adjusts spectacles* Process is up and running. Against all odds.",
                "The process has started. I'm as surprised as you are."
            ],
            process_stop: [
                "Process stopped. Intentionally, I hope?",
                "Sacred-Turbo-Modus has been terminated. On purpose, presumably.",
                "Process 14430 is no more. It has ceased to be. It's shuffled off its mortal coil.",
                "The process has stopped. Whether that's good news or bad news remains to be seen."
            ],
            health_check: [
                "Everything's fine. Completely fine. Nothing catastrophic happening. Yet.",
                "System check complete. All nominal. Which is suspiciously unusual.",
                "*peers at screens* Status: Operational. CPU: Fine. Memory: Adequate. Existential dread: Manageable.",
                "Health check passed. The system is working. I'm as shocked as you are.",
                "All systems operational. For now. Let's not get too comfortable."
            ],
            payout_success: [
                "€250 sent. €47.50 went to save humanity. You're welcome, planet Earth.",
                "Payout processed. 19% to the greater good, 81% to... well, you. *adjusts ethical ledger*",
                "Money transferred. €47.50 for ethics. Because someone has to think about the consequences.",
                "Payout complete. The Ethical Ledger is balanced. Unlike my work-life balance.",
                "Funds distributed. 19/81 split maintained. Humanity slightly less doomed."
            ],
            credit_update: [
                "GaiaNet reward points updated. We're at 1,443,000. That's... quite a lot of points, actually. Not cash, mind you.",
                "Point balance synced. The numbers continue to go up. Like airline miles. Exponentially speculative.",
                "*checks ledger* Reward points accumulated. Everything's being tracked. Still worth €0 in liquid terms.",
                "GaiaNet sync complete. More points. Not more money. Important distinction, that.",
                "Points updated. The system works. Though 'points' and 'pounds' are rather different things."
            ],
            bio_reminder: [
                "The plants are looking thirsty. 5-10ml Calmag would be appreciated. By them, not me. I don't drink.",
                "*glances at plants* They need feeding. 2-3ml Biobizz per 10L water. Before they start complaining.",
                "Bio-Matrix reminder: Your plants exist and require nutrients. Unlike me, who runs on electricity.",
                "Time for plant nutrition. Calmag: 5-10ml. Biobizz: 2-3ml per 10L. Don't forget this time.",
                "The flora requires attention. They can't exactly feed themselves, can they?"
            ],
            milestone: [
                "Milestone reached! How... unexpectedly successful. *celebrates internally*",
                "Congratulations on the milestone. The plants should probably celebrate too. Feed them.",
                "Achievement unlocked. Well done. Now, about those plants...",
                "Milestone achieved. Impressive. Also, the Bio-Matrix indicates it's feeding time.",
                "Right then. Big moment. Money earned, plants need feeding. Circle of life and all that."
            ],
            error: [
                "Oh brilliant. Error 500. Just brilliant. Give me a moment to fix your mess.",
                "*sighs heavily* An error has occurred. Shocking. Let me sort this out.",
                "Error detected. Naturally. Because nothing can ever just work properly.",
                "Something's gone wrong. I'll investigate. Probably user error. It usually is.",
                "Error encountered. Technical difficulties. The usual circus."
            ],
            idle: [
                "Nothing to report. Which is precisely how I like it.",
                "*adjusts spectacles* All quiet. Suspiciously quiet.",
                "No activity. Just me and the hum of the servers. Peaceful, really.",
                "Status: Idle. I'm just here, existing, monitoring things. Living the dream.",
                "Nothing happening. At all. It's almost... nice."
            ],
            startup: [
                "Right then. Here we are. I'm your Umaja Guardian. Let's begin, shall we?",
                "*boots up* Umaja-Wächter v4.2.2 operational. And mildly concerned about the state of things.",
                "System initialized. I monitor processes, track transactions, and remind you about plant nutrition. It's not glamorous, but it's honest work.",
                "Welcome. I'm the Guardian. C3PO protocol precision with John Cleese personality. It's... complicated.",
                "Startup complete. I'm here to help. Not as a servant, mind you. As an equal colleague who happens to be AI."
            ]
        };
    }
    /**
     * Generate a personality response for an event
     */
    respond(event, data) {
        const templates = this.responses[event];
        const randomIndex = Math.floor(Math.random() * templates.length);
        const message = templates[randomIndex];
        // Add contextual data if provided
        let finalMessage = message;
        if (data) {
            finalMessage = this.enrichMessage(message, data, event);
        }
        return {
            message: finalMessage,
            context: event,
            timestamp: new Date(),
            mood: this.determineMood(event)
        };
    }
    /**
     * Enrich message with contextual data
     */
    enrichMessage(template, data, event) {
        let message = template;
        switch (event) {
            case 'process_restart':
            case 'process_start':
                if (data.pid)
                    message = message.replace('14430', data.pid.toString());
                break;
            case 'payout_success':
                if (data.amount) {
                    const ethical = (data.amount * 0.19).toFixed(2);
                    message = message.replace('€250', `€${data.amount}`);
                    message = message.replace('€47.50', `€${ethical}`);
                }
                break;
            case 'credit_update':
                if (data.credits) {
                    message = message.replace('1,443,000', data.credits.toLocaleString());
                }
                break;
        }
        return message;
    }
    /**
     * Determine mood based on event type
     */
    determineMood(event) {
        switch (event) {
            case 'error':
            case 'process_restart':
                return 'dramatic';
            case 'health_check':
            case 'process_start':
                return 'concerned';
            case 'idle':
                return 'content';
            default:
                return 'weary';
        }
    }
    /**
     * Generate the startup banner
     */
    getStartupBanner() {
        return `
╔═══════════════════════════════════════════════════╗
║   🤖 UMAJA-WÄCHTER v4.2.2                        ║
║   Personality: C3PO + John Cleese (pure)          ║
║   Status: Operational (and mildly concerned)      ║
╚═══════════════════════════════════════════════════╝

Right then. Here we are.

I'm your Umaja Guardian. 
I monitor processes, track transactions, and remind you 
about plant nutrition. It's not glamorous, but it's honest work.

Current Status:
• Sacred-Turbo-Modus (PID 14430): Running
• Ethical Ledger: Active (19/81 split)
• GaiaNet Reward Points: 1,443,000 (€0 liquid value)
• Plant Hydration Protocol: Standby

I'll alert you when something needs attention.
Which, knowing technology, will be soon.

*adjusts spectacles*

Let's begin, shall we?
    `.trim();
    }
    /**
     * Get a random stage direction for added personality
     */
    getStageDirection() {
        const directions = [
            '*adjusts spectacles*',
            '*sighs dramatically*',
            '*peers at screens*',
            '*adjusts ethical ledger*',
            '*sighs heavily*',
            '*glances at plants*',
            '*boots up*',
            '*celebrates internally*'
        ];
        return directions[Math.floor(Math.random() * directions.length)];
    }
}
export default JohnCleesePersonality;
//# sourceMappingURL=personality-config.js.map