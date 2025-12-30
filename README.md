# 🤖 UMAJA v2 - Universal Monetary Autonomous Justice Architecture

[![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-2088FF?logo=github-actions&logoColor=white)](https://github.com/harrie19/umaja-v2/actions)
[![Python](https://img.shields.io/badge/Python-3.11+-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-Private-red)](LICENSE)

**Operating System as Philosophy**  
Autonomous Agents • Ethical Finance • Transparent Operations

---

## 🌟 What is UMAJA?

UMAJA (Universal Monetary Autonomous Justice Architecture) is an autonomous agent system that generates passive income while maintaining ethical revenue distribution based on Bahá'í principles of voluntary giving and justice.

### Core Features

- 🤖 **Autonomous Agents** - Self-operating agents (Trevor, Nigel, Percival) that generate content and revenue
- 📊 **Real-Time Dashboard** - Monitor agent status, earnings, and execution logs
- 💰 **Ethical Distribution** - Voluntary 19% allocation to humanitarian causes on surplus above €6,500
- 🔒 **Privacy & Transparency** - Open calculations, private choices, public impact
- 📱 **Mobile-First** - Fully manageable from iOS/Android devices
- 🌐 **Decentralized** - GitHub Actions + Vercel + Supabase architecture

---

## 🚀 Quick Start

### Prerequisites

```bash
- Node.js 18+
- Python 3.11+
- Git
- GitHub account
- (Optional) Supabase account for database
- (Optional) Vercel account for deployment
```

### Installation

```bash
# Clone repository
git clone https://github.com/harrie19/umaja-v2.git
cd umaja-v2

# Install Node.js dependencies
npm install

# Install Python dependencies
pip install -r scripts/requirements.txt

# Configure environment
cp .env.example .env.local
# Edit .env.local with your API keys
```

### Running Locally

**Test Trevor Agent:**
```bash
python scripts/trevor.py --test --day 1
```

**Start Dashboard (Legacy Vite Version):**
```bash
npm run dev
# Visit http://localhost:5173
```

**Start Backend API:**
```bash
npm run dev:server
# API available at http://localhost:3001
```

---

## 🤖 Autonomous Agents

### Trevor - The Philosopher 🟢 Active

**Purpose:** Generates daily philosophical articles about AI ethics and Bahá'í principles  
**Schedule:** Daily at 8:00 UTC  
**Revenue:** Content monetization  

```bash
# Manual execution
python scripts/trevor.py --test --day 1

# Via GitHub Actions
# Go to Actions > Trevor Daily > Run workflow
```

### Nigel - The Analyst 🟡 Pending

**Purpose:** Analytics and reporting on system performance  
**Schedule:** Weekly  
**Revenue:** Insight services  
**Status:** Development pending

### Percival - The Connector 🔵 Planned

**Purpose:** Community management and content distribution  
**Schedule:** On-demand  
**Revenue:** Engagement services  
**Status:** Future development

Learn more: [docs/AGENTS.md](docs/AGENTS.md)

---

## 📊 Dashboard Features

- **Agent Status Cards** - Real-time status, last run, next run, earnings
- **Live Logs** - Color-coded execution logs (success/error/info)
- **Revenue Tracking** - Total earnings and ethical allocations
- **Performance Metrics** - Execution times, success rates
- **Mobile Responsive** - Works on all devices

### Screenshot (Coming Soon)
```
┌─────────────────────────────────────────┐
│ 🤖 UMAJA Dashboard                      │
├─────────────────────────────────────────┤
│ Trevor    [🟢 Active]   €1,234  Run Now│
│ Nigel     [🟡 Pending]  €0      Pending│
│ Percival  [🔵 Planned]  €0      Planned│
├─────────────────────────────────────────┤
│ Live Logs:                              │
│ ✅ Trevor: Article generated (2s ago)   │
│ 💰 Allocation calculated: €23.46        │
│ 📝 Committed to repository              │
└─────────────────────────────────────────┘
```

---

## 💰 Ethical Framework

UMAJA implements a voluntary ethical allocation system inspired by Bahá'í principles.

### The 19% Rule

```
IF total_revenue > €6,500 (threshold):
    surplus = total_revenue - 6,500
    allocation = surplus × 0.19
    humanitarian_fund += allocation
```

### Example Calculation

```
Total Revenue: €10,000
Threshold:     €6,500
─────────────────────
Surplus:       €3,500
Allocation:    €665 (19% of surplus)
Remaining:     €9,335
```

### Key Principles

✅ **Voluntary** - Completely opt-in, no pressure  
✅ **Threshold-Based** - First €6,500 fully exempt  
✅ **Transparent** - All calculations public  
✅ **Private Choice** - Opt-in status is private  
✅ **Universal** - Open to all, regardless of belief  

Learn more: [docs/ETHICS.md](docs/ETHICS.md)

---

## 🏗️ Technology Stack

### Frontend
- **Framework:** Next.js 14 (planned) / Vite + React (current)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI:** Custom components

### Backend
- **API:** Express.js (Node.js)
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth

### Agents
- **Language:** Python 3.11+
- **Execution:** GitHub Actions
- **Storage:** GitHub repository + Supabase

### Infrastructure
- **Hosting:** Vercel (dashboard) + GitHub Pages
- **CI/CD:** GitHub Actions
- **Monitoring:** n8n.cloud (optional)
- **Alerts:** Telegram (optional)

---

## 📁 Project Structure

```
umaja-v2/
├── .github/workflows/         # GitHub Actions workflows
│   ├── trevor-daily.yml       # Trevor automation
│   ├── deploy-vercel.yml      # Vercel deployment
│   └── status-check.yml       # System health checks
│
├── scripts/                   # Python agents
│   ├── trevor.py              # Trevor content generator
│   ├── utils/
│   │   └── ethical_calculator.py  # Allocation logic
│   └── requirements.txt       # Python dependencies
│
├── content/articles/          # Generated content
│   └── YYYY-MM-DD-day-N-trevor.md
│
├── supabase/migrations/       # Database schemas
│   └── 001_initial_schema.sql
│
├── client/                    # Frontend (legacy Vite)
│   └── src/
│       ├── App.jsx
│       └── App.css
│
├── server/                    # Backend API
│   └── index.ts
│
├── lib/umaja-core/            # Core TypeScript library
│   ├── watcher.ts
│   ├── personality-config.ts
│   └── types.ts
│
├── docs/                      # Documentation
│   ├── AGENTS.md              # Agent documentation
│   ├── ETHICS.md              # Ethical framework
│   ├── MOBILE_DEVELOPMENT.md  # Mobile guide
│   ├── UMAJA_CORE_PHILOSOPHY.md
│   ├── JOHN_CLEESE_PROTOCOL.md
│   └── SACRED_TURBO_SETUP.md
│
├── n8n-workflows/             # Monitoring workflows
│   └── daily-monitoring.json
│
└── bin/                       # CLI tools
    └── umaja-cli.ts
```

---

## 🚀 Deployment

### Deploy Dashboard to Vercel

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
cd client
vercel --prod
```

Or use GitHub Actions (automatic on push to main).

### Setup Database

```bash
# 1. Create Supabase project at supabase.com
# 2. Run migration
supabase migration up

# Or manually execute:
# supabase/migrations/001_initial_schema.sql
```

### Configure GitHub Secrets

Required secrets for GitHub Actions:
```
OPENAI_API_KEY              # For Trevor content generation
NEXT_PUBLIC_SUPABASE_URL    # Supabase project URL
NEXT_PUBLIC_SUPABASE_ANON_KEY  # Supabase anon key
VERCEL_TOKEN                # Vercel deployment
VERCEL_ORG_ID               # Vercel organization
VERCEL_PROJECT_ID           # Vercel project
```

---

## 📱 Mobile Development

UMAJA is fully manageable from mobile devices!

### iOS Tools
- **Working Copy** - Git client
- **iSH** - Linux shell
- **Shortcuts** - Automation

### Android Tools
- **Termux** - Linux terminal
- **MGit** - Git client
- **Acode** - Code editor

### GitHub Codespaces
- Open repository on mobile
- Tap "Code" > "Codespaces"
- Full VS Code environment in browser

Learn more: [docs/MOBILE_DEVELOPMENT.md](docs/MOBILE_DEVELOPMENT.md)

---

## ⚙️ Configuration

### Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# API Keys
OPENAI_API_KEY=sk-your-key-here
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Configuration
NODE_ENV=development
TEST_MODE=true
ETHICAL_THRESHOLD=6500
ETHICAL_RATE=0.19

# Optional
N8N_WEBHOOK_URL=https://your-n8n.app/webhook/umaja
TELEGRAM_BOT_TOKEN=your-bot-token
```

### Agent Configuration

Agents are configured in the database:

```sql
UPDATE agents 
SET config = '{"schedule": "daily", "time": "08:00"}'
WHERE name = 'Trevor';
```

---

## 🗺️ Roadmap

### Q4 2025 ✅ (In Progress)
- [x] Trevor agent implementation
- [x] Ethical calculator
- [x] GitHub Actions automation
- [x] Documentation
- [ ] Next.js dashboard migration
- [ ] Supabase integration

### Q1 2026
- [ ] Nigel analytics agent
- [ ] Revenue tracking dashboard
- [ ] OpenAI integration (production)
- [ ] WordPress content distribution
- [ ] Telegram notifications

### Q2 2026
- [ ] Percival community agent
- [ ] Social media integrations
- [ ] Mobile app (React Native)
- [ ] Advanced analytics
- [ ] Multi-language support

### Future
- [ ] Blockchain integration
- [ ] Smart contracts
- [ ] DAO governance
- [ ] Global threshold adjustments
- [ ] Additional agents (Marcus, Elena, Zara, Quinn, Aria)

---

## 🤝 Contributing

UMAJA is built on principles of:
- **Authenticity** - No fake cheerfulness
- **Accountability** - Every action tracked
- **Life First** - Technology serves humanity
- **Equal Partnership** - AI as colleague

### Guidelines

1. Follow existing code style
2. Add tests for new features
3. Update documentation
4. Use meaningful commit messages
5. Ensure ethical allocation logic is preserved

### Development Process

```bash
# 1. Fork repository
# 2. Create feature branch
git checkout -b feature/amazing-feature

# 3. Make changes and test
python scripts/trevor.py --test

# 4. Commit and push
git add .
git commit -m "Add amazing feature"
git push origin feature/amazing-feature

# 5. Open Pull Request
```

---

## 🧪 Testing

### Test Trevor Agent
```bash
# Test mode (no API calls)
python scripts/trevor.py --test --day 1

# Specific day
python scripts/trevor.py --test --day 42

# Production mode (requires API keys)
python scripts/trevor.py --day 1
```

### Test Ethical Calculator
```bash
python scripts/utils/ethical_calculator.py
```

### Run GitHub Actions Locally
```bash
# Install act
brew install act  # macOS
# or sudo apt install act  # Linux

# Run workflow
act -j generate-content --secret-file .env.local
```

---

## 📚 Documentation

- **[Agents Guide](docs/AGENTS.md)** - Complete agent documentation
- **[Ethical Framework](docs/ETHICS.md)** - Revenue allocation principles
- **[Mobile Development](docs/MOBILE_DEVELOPMENT.md)** - Mobile workflow guide
- **[Core Philosophy](docs/UMAJA_CORE_PHILOSOPHY.md)** - Vision and values
- **[John Cleese Protocol](docs/JOHN_CLEESE_PROTOCOL.md)** - Personality guidelines
- **[Sacred-Turbo Setup](docs/SACRED_TURBO_SETUP.md)** - Technical setup

---

## 🎭 The UMAJA Trinity

```
    🤖 AUTONOMOUS AGENTS    💰 ETHICAL ECONOMY      🌍 GLOBAL IMPACT
   (Trevor, Nigel, Percival) (19% Allocation)    (Humanitarian Aid)
            │                      │                      │
            └──────────────────────┴──────────────────────┘
                                   │
                             🌟 UMAJA CORE
                    (Operating System as Philosophy)
```

---

## 🛡️ Security & Privacy

- ✅ No hardcoded secrets
- ✅ Environment variables for sensitive data
- ✅ GitHub Secrets for CI/CD
- ✅ Supabase RLS (Row Level Security)
- ✅ GDPR compliant
- ✅ Private opt-in/out status
- ✅ Encrypted data at rest
- ✅ Regular security audits

---

## 📞 Support & Contact

- **Issues:** [GitHub Issues](https://github.com/harrie19/umaja-v2/issues)
- **Discussions:** [GitHub Discussions](https://github.com/harrie19/umaja-v2/discussions)
- **Email:** [Contact via GitHub profile]
- **Documentation:** [docs/](docs/)

---

## 📜 License

This project is private. All rights reserved.

---

## 🙏 Acknowledgments

- **Bahá'í Faith** - Inspiration for ethical framework
- **Open Source Community** - Tools and libraries
- **Contributors** - Everyone who helps improve UMAJA
- **John Cleese** - Personality inspiration (unofficial)

---

## 🌟 Example Interactions

**Agent Execution:**
```
🤖 Trevor Agent v1.0.0 - Starting execution
📅 Generating content for day 1
🧪 Test mode: True
✅ Article saved to: content/articles/2025-12-30-day-1-trevor.md
💰 Hypothetical revenue allocation: €0.00 to humanitarian causes
```

**Ethical Allocation:**
```
Ethical Allocation Report
========================
Total Revenue: €10,000.00
Threshold: €6,500.00
Surplus: €3,500.00
Allocation (19%): €665.00
Remaining: €9,335.00
```

**Dashboard Status:**
```
┌─────────────────────────────────────────┐
│ Trevor:    🟢 Active    Last run: 2m ago│
│ Nigel:     🟡 Pending   Development     │
│ Percival:  🔵 Planned   Q1 2026         │
└─────────────────────────────────────────┘
```

---

*"The earth is but one country, and mankind its citizens."* - Bahá'u'lláh

---

<div align="center">

**Built with ❤️ for a more just and equitable world**

*adjusts spectacles*

Right then. Let's build systems that matter, shall we?

**— The UMAJA Team**

</div>

---

*Updated: 2025-12-30*  
*Version: 2.0.0 (Autonomous Agent System)*
