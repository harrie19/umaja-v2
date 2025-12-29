/**
 * UMAJA Core API Server
 * Express.js backend with John Cleese personality
 */
import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { UmajaGuardian } from '../lib/umaja-core/index.js';
dotenv.config();
const app = express();
const PORT = process.env.PORT || 3001;
// Middleware
app.use(cors());
app.use(express.json());
// Initialize the Guardian
const processId = parseInt(process.env.SACRED_TURBO_PID || '14430', 10);
if (isNaN(processId)) {
    console.error('Error: SACRED_TURBO_PID must be a valid number. Using default 14430.');
}
const guardian = new UmajaGuardian(isNaN(processId) ? 14430 : processId);
// Initialize on server start
guardian.initialize().catch((error) => {
    console.error('Failed to initialize UMAJA Guardian:', error);
    console.error('Error details:', error instanceof Error ? error.message : 'Unknown error');
    console.error('Please check your configuration and try again.');
});
/**
 * Root endpoint
 */
app.get('/', (req, res) => {
    res.json({
        name: 'UMAJA Core API',
        version: '4.2.2',
        personality: 'C3PO + John Cleese',
        message: guardian.respond('idle')
    });
});
/**
 * GET /api/umaja-core/watcher
 * Get Guardian status and last check
 */
app.get('/api/umaja-core/watcher', async (req, res) => {
    try {
        const status = await guardian.performHealthCheck();
        res.json({
            success: true,
            data: status,
            personality: guardian.respond('health_check')
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            personality: guardian.respond('error')
        });
    }
});
/**
 * POST /api/umaja-core/watcher
 * Manual health check trigger
 */
app.post('/api/umaja-core/watcher', async (req, res) => {
    try {
        await guardian.monitorProcess();
        const status = await guardian.performHealthCheck();
        res.json({
            success: true,
            data: status,
            personality: guardian.respond('health_check')
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            personality: guardian.respond('error')
        });
    }
});
/**
 * GET /api/umaja-core/gaianet
 * Get current GaiaNet credit balance
 */
app.get('/api/umaja-core/gaianet', async (req, res) => {
    try {
        const message = await guardian.syncGaiaNet();
        const gaianetSync = guardian.getGaiaNetSync();
        const summary = await gaianetSync.calculateAccumulated();
        res.json({
            success: true,
            data: summary,
            personality: message
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            personality: guardian.respond('error')
        });
    }
});
/**
 * POST /api/umaja-core/gaianet
 * Force credit sync
 */
app.post('/api/umaja-core/gaianet', async (req, res) => {
    try {
        const gaianetSync = guardian.getGaiaNetSync();
        const credits = await gaianetSync.fetchCredits();
        res.json({
            success: true,
            data: { credits },
            personality: guardian.respond('credit_update', { credits })
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            personality: guardian.respond('error')
        });
    }
});
/**
 * GET /api/umaja-core/bio-reminder
 * Get next scheduled plant feeding
 */
app.get('/api/umaja-core/bio-reminder', async (req, res) => {
    try {
        const bioMatrix = guardian.getBioMatrix();
        const reminder = await bioMatrix.createReminder();
        const nextFeeding = bioMatrix.getNextScheduledFeeding();
        res.json({
            success: true,
            data: {
                reminder,
                nextScheduledFeeding: nextFeeding,
                lastFeeding: bioMatrix.getLastFeedingTime()
            },
            personality: reminder.message
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            personality: guardian.respond('error')
        });
    }
});
/**
 * POST /api/umaja-core/bio-reminder
 * Log feeding completion
 */
app.post('/api/umaja-core/bio-reminder', async (req, res) => {
    try {
        const { type, amount, notes } = req.body;
        if (!type || !amount) {
            return res.status(400).json({
                success: false,
                error: 'Type and amount are required',
                personality: guardian.respond('error')
            });
        }
        const bioMatrix = guardian.getBioMatrix();
        await bioMatrix.logFeeding(type, amount, notes);
        const message = await guardian.logFeeding(type, amount);
        res.json({
            success: true,
            data: {
                type,
                amount,
                timestamp: new Date()
            },
            personality: message
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            personality: guardian.respond('error')
        });
    }
});
/**
 * POST /api/umaja-core/milestone
 * Trigger milestone celebration
 */
app.post('/api/umaja-core/milestone', async (req, res) => {
    try {
        const { amount, type } = req.body;
        if (!amount || !type) {
            return res.status(400).json({
                success: false,
                error: 'Amount and type are required',
                personality: guardian.respond('error')
            });
        }
        let message;
        if (type === 'payout') {
            message = await guardian.handlePayout(amount);
        }
        else {
            message = guardian.respond('milestone', { amount });
        }
        const bioMatrix = guardian.getBioMatrix();
        const milestoneReached = await bioMatrix.checkMilestone(amount);
        let bioReminder = null;
        if (milestoneReached) {
            bioReminder = await bioMatrix.createReminder();
        }
        res.json({
            success: true,
            data: {
                amount,
                type,
                milestoneReached,
                bioReminder,
                timestamp: new Date()
            },
            personality: message
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            personality: guardian.respond('error')
        });
    }
});
/**
 * GET /api/umaja-core/status
 * Complete system overview
 */
app.get('/api/umaja-core/status', async (req, res) => {
    try {
        const status = await guardian.getStatus();
        res.json({
            success: true,
            data: status,
            personality: status.message
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error',
            personality: guardian.respond('error')
        });
    }
});
// Start server
app.listen(PORT, () => {
    console.log(`\n🚀 UMAJA Core API Server running on port ${PORT}`);
    console.log(`📡 API Base: http://localhost:${PORT}/api/umaja-core`);
    console.log('\nAvailable endpoints:');
    console.log('  GET  /api/umaja-core/status       - Complete system status');
    console.log('  GET  /api/umaja-core/watcher      - Guardian health check');
    console.log('  POST /api/umaja-core/watcher      - Manual health check');
    console.log('  GET  /api/umaja-core/gaianet       - GaiaNet credits');
    console.log('  POST /api/umaja-core/gaianet       - Force credit sync');
    console.log('  GET  /api/umaja-core/bio-reminder  - Plant feeding schedule');
    console.log('  POST /api/umaja-core/bio-reminder  - Log feeding');
    console.log('  POST /api/umaja-core/milestone     - Milestone celebration');
    console.log('\n');
});
export default app;
//# sourceMappingURL=index.js.map