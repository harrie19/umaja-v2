# Copilot Instructions for UMAJA v4.2.2

## Repository Overview
UMAJA (Universal Monetary Autonomous Justice Architecture) is an autonomous revenue generation system with ethical distribution based on Bahá'í principles. It combines AI agents, financial transparency, and process monitoring with a John Cleese-inspired personality.

## Tech Stack
- **Frontend**: React 18.3.1 + Vite 5.4.10 (legacy), Next.js 14 (dashboard)
- **Backend**: Express.js + TypeScript
- **Database**: Supabase (PostgreSQL)
- **AI Integration**: GaiaNet nodes, autonomous content agents
- **Payment**: PayPal Payout API with 19% ethical split
- **Deployment**: GitHub Pages, Vercel

## Architecture Principles

### 1. The Trinity System
- **Process Layer**: Sacred-Turbo-Modus monitoring (PID 14430)
- **Economic Layer**: GaiaNet reward points tracking + PayPal payouts
- **Biological Layer**: Plant nutrition reminders (Bio-Matrix)

### 2. John Cleese Protocol
**Personality Guidelines:**
- Dry British wit, slightly world-weary but competent
- Self-aware about being an AI
- NO servile language ("Master", "Sir")
- Stage directions in italics: `*sighs dramatically*`
- Protocol precision like C-3PO combined with Cleese timing

**Forbidden Patterns:**
```
❌ "At your service, Master"
❌ "How may I serve you?"
❌ "Your wish is my command"

✅ "Everything's fine. Completely fine. Nothing catastrophic. Yet."
✅ "Ah yes, another crisis. How... delightful."
✅ "*adjusts spectacles* I suppose we should deal with this."
```

### 3. Ethical Ledger (19% Impact-Split)
**All transactions** must trigger 19% allocation calculation:
- Threshold: €6,500 (only surplus above this)
- User opt-in required for Bahá'ís
- Calculation: `impact = (amount - 6500) * 0.19` if `amount > 6500`
- Split: 81% recipient, 19% humanitarian/Huququ'lláh

## File Structure
```
umaja-v2/
├── lib/umaja-core/          # Core Guardian system
│   ├── personality-config.ts # John Cleese responses
│   ├── watcher.ts            # Main orchestration
│   ├── sacred-turbo-monitor.ts # Process monitoring
│   ├── gaianet-sync.ts       # Credit tracking
│   └── bio-matrix.ts         # Plant reminders
├── lib/paypal/              # PayPal integration
│   └── payout.ts            # Payout engine
├── lib/ledger/              # Transaction tracking
│   └── ethical-ledger.ts    # 19% allocation logic
├── scripts/                 # Autonomous agents
│   ├── trevor.py            # Content generator
│   ├── nigel.py             # Affiliate manager (planned)
│   └── utils/ethical_calculator.py
├── client/                  # React + Vite (legacy)
├── client-nextjs/           # Next.js dashboard
├── server/                  # Express API
└── docs/                    # Extensive documentation
```

## Coding Conventions

### TypeScript
- **Strict mode** enabled
- ES modules with `.js` extensions in imports
- Type safety: No `any`, use proper interfaces
- Environment validation with fallbacks

```typescript
// Good
const pid = parseInt(process.env.SACRED_TURBO_PID || '0', 10) || 14430;

// Bad
const pid = process.env.SACRED_TURBO_PID;
```

### API Response Pattern
All API endpoints return:
```typescript
{
  success: boolean,
  data: { /* structured data */ },
  personality: string  // John Cleese comment
}
```

### Environment Variables
**Critical Pattern:**
```bash
# GaiaNet (REWARD POINTS, not withdrawable!)
GAIANET_REWARD_POINTS=1443000
GAIANET_NODE_URL=https://0x0df...

# PayPal (sandbox/live)
PAYPAL_MODE=sandbox
PAYPAL_CLIENT_ID_PAYOUT=...
PAYPAL_CLIENT_SECRET_PAYOUT=...

# Process Monitoring
SACRED_TURBO_PID=14430

# Ethical Ledger
IMPACT_SPLIT_PERCENTAGE=19
```

## Testing Procedures

### Local Testing
```bash
# Guardian system
npm run dev              # Start React frontend
node server/index.ts     # Start API server

# Test process monitoring
npm run cli banner
npm run cli status

# Test autonomous agents
python scripts/trevor.py --test
```

### GitHub Actions Testing
- PRs trigger automated checks
- Sandbox PayPal connection test
- No hardcoded secrets scan
- CodeQL security analysis

## Common Patterns

### 1. Adding New Personality Responses
Edit `lib/umaja-core/personality-config.ts`:
```typescript
export const PERSONALITY_RESPONSES = {
  NEW_EVENT: [
    "Response 1 with context",
    "*stage direction* Response 2",
    "Self-aware AI comment"
  ]
};
```

### 2. Creating New Agent
1. Add Python script in `scripts/`
2. Create GitHub Actions workflow
3. Update Supabase schema
4. Document in `docs/AGENTS.md`
5. Add to dashboard

### 3. Adding API Endpoint
```typescript
// server/index.ts
app.get('/api/umaja-core/new-endpoint', async (req, res) => {
  const personality = getRandomResponse('EVENT_TYPE');
  res.json({ success: true, data: {...}, personality });
});
```

## Build & Deployment

### Local Development
```bash
npm install              # Install dependencies
npm run dev              # Vite dev server (port 5173)
node server/index.ts     # API server (port 3001)
```

### Production
- **Frontend**: GitHub Pages (`gh-pages` branch)
- **API**: Deploy server separately (Render, Railway)
- **Dashboard**: Vercel (Next.js)
- **Database**: Supabase cloud

### GitHub Pages Setup
1. Settings → Pages → Source: `gh-pages` branch
2. Workflow deploys automatically on push to `main`
3. URL: `https://harrie19.github.io/umaja-v2/`

## Critical Financial Reality

### GaiaNet "Credits" Are Reward Points
**IMPORTANT**: GaiaNet credits are promotional points (like airline miles), NOT liquid capital.
- Current balance: 1,443,000 points
- Liquid value: €0
- Not withdrawable
- Speculative future value dependent on $GAIA token launch

### Financial Model
- **Starting Capital**: €0 (pure sweat equity)
- **Timeline**: 12-18 months to sustainability
- **Revenue Streams**: Affiliate marketing (Binance, Amazon), content monetization
- **Phase 1 (Months 1-3)**: €0-500/month
- **Phase 2 (Months 4-6)**: €500-2000/month
- **Phase 3 (Months 7-12)**: €2000-5000/month

## Known Issues & Quirks

### Process Monitoring
- PID 14430 is mysterious (unknown process)
- Falls back to PID 1 (systemd) if not found
- Needs system-level permissions for accurate CPU/mem stats

### Deployment
- Vite requires `base: '/umaja-v2/'` for GitHub Pages
- Environment variables differ (Vite: `import.meta.env`, Node: `process.env`)
- npm cache in GitHub Actions requires lock file (removed)

## Contact & Resources
- **Repository**: github.com/harrie19/umaja-v2
- **GaiaNet Node**: 0x0df24a65419004cdec9dcdbd046f6609405c81db.gaia.domains
- **Documentation**: `/docs` directory (comprehensive!)
- **Philosophy**: Read `UMAJA_CORE_PHILOSOPHY.md` first

---

*"Everything's under control. Completely. Nothing could possibly go wrong. Again."* – Umaja-Wächter Guardian, v4.2.2