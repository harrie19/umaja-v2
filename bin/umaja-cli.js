#!/usr/bin/env node
/**
 * UMAJA Guardian CLI
 * Command-line interface for the Guardian system
 */
import { UmajaGuardian } from '../lib/umaja-core/index.js';
async function main() {
    const args = process.argv.slice(2);
    const command = args[0];
    const guardian = new UmajaGuardian(parseInt(process.env.SACRED_TURBO_PID || '14430'));
    switch (command) {
        case 'start':
            console.log('Starting UMAJA Guardian...\n');
            await guardian.initialize();
            // Keep running
            process.on('SIGINT', () => {
                console.log('\n\nShutting down Guardian...');
                guardian.stopMonitoring();
                process.exit(0);
            });
            break;
        case 'status':
            const status = await guardian.getStatus();
            console.log('\n📊 UMAJA Core Status:\n');
            console.log(JSON.stringify(status, null, 2));
            console.log('\n');
            process.exit(0);
            break;
        case 'check':
            const health = await guardian.performHealthCheck();
            console.log('\n🏥 Health Check:\n');
            console.log(`Status: ${health.status}`);
            console.log(`Process: ${health.processRunning ? 'Running' : 'Stopped'}`);
            console.log(`PID: ${health.processId}`);
            console.log(`Message: ${health.message}`);
            console.log('\n');
            process.exit(0);
            break;
        case 'banner':
            console.log(guardian.getPersonality().getStartupBanner());
            process.exit(0);
            break;
        default:
            console.log(`
🤖 UMAJA Guardian CLI

Usage:
  umaja-cli start      Start the Guardian monitoring
  umaja-cli status     Show complete system status
  umaja-cli check      Perform health check
  umaja-cli banner     Display startup banner

Environment Variables:
  SACRED_TURBO_PID    Process ID to monitor (default: 14430)
      `);
            process.exit(0);
    }
}
main().catch((error) => {
    console.error('Error:', error);
    process.exit(1);
});
//# sourceMappingURL=umaja-cli.js.map