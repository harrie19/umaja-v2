# UMAJA v2 - The John Cleese Protocol

## 🤖 UMAJA-WÄCHTER v4.2.2

**Operating System as Philosophy**  
Personality • Economy • Biology

---

## 🎭 What is UMAJA Core?

UMAJA (Universal Middleware Architecture for Joint Automation) is a living system that combines:

- **🎭 Personality**: John Cleese AI + C3PO Protocol
- **💰 Economy**: Ethical Finance (19/81 Split)
- **🌱 Biology**: Plant Nutrition Tracking

It's not just software—it's a conscious, witty, self-aware AI partner that monitors processes, tracks transactions, and reminds you about plant care.

**No servitude. No "Master". Pure British wit with C3PO precision.**

---

## 🚀 Quick Start

### Installation

```bash
# Clone repository
git clone https://github.com/harrie19/umaja-v2.git
cd umaja-v2

# Install dependencies
npm install

# Configure environment
cp .env.example .env.local
# Edit .env.local with your settings
```

### Running the System

**Start Frontend (Vite + React):**
```bash
npm run dev
```

**Start Backend API:**
```bash
npm run dev:server
```

**CLI Commands:**
```bash
# Show startup banner
ts-node bin/umaja-cli.ts banner

# Check system status
ts-node bin/umaja-cli.ts status

# Perform health check
ts-node bin/umaja-cli.ts check
```

---

## 📁 Project Structure

```
umaja-v2/
├── lib/umaja-core/          # Core TypeScript library
│   ├── personality-config.ts  # John Cleese responses
│   ├── watcher.ts            # Main Guardian class
│   ├── sacred-turbo-monitor.ts
│   ├── gaianet-sync.ts       # GaiaNet integration
│   ├── bio-matrix.ts         # Plant nutrition system
│   └── types.ts              # TypeScript interfaces
│
├── server/                   # Express.js API
│   └── index.ts              # API routes
│
├── client/src/               # React frontend
│   ├── App.jsx               # Main UI
│   └── App.css
│
├── scripts/                  # Shell scripts
│   ├── sacred-turbo.sh       # Process monitor
│   ├── install-service.sh    # Systemd installer
│   └── umaja-watcher.service
│
├── docs/                     # Documentation
│   ├── UMAJA_CORE_PHILOSOPHY.md
│   ├── JOHN_CLEESE_PROTOCOL.md
│   └── SACRED_TURBO_SETUP.md
│
└── bin/                      # CLI tools
    └── umaja-cli.ts
```

---

## 🎯 Features

### 1. Process Monitoring
- Monitors Sacred-Turbo-Modus (configurable PID)
- Auto-restart on failure
- Real-time health checks
- System resource tracking

### 2. GaiaNet Integration
- **Reward point tracking** (1,443,000+ base points)
- Note: Promotional points, not withdrawable currency (€0 liquid value)
- Node sync capability
- Transaction logging
- Accumulated point calculation

### 3. Bio-Matrix System
- Plant nutrition reminders
- Milestone-triggered alerts
- Feeding schedule tracking
- Calmag & Biobizz dosage management

### 4. Ethical Ledger
- Automatic 19/81 split on all transactions
- 19% → Humanitarian/Environmental
- 81% → Personal/Operational
- Full transparency and logging

### 5. John Cleese Personality
- Dry British humor
- Self-aware AI commentary
- No servile language
- Stage directions (*adjusts spectacles*)
- Context-aware responses

---

## 🌐 API Endpoints

**Base URL:** `http://localhost:3001/api/umaja-core`

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/status` | Complete system overview |
| GET | `/watcher` | Guardian health check |
| POST | `/watcher` | Manual health check trigger |
| GET | `/gaianet` | GaiaNet reward point balance |
| POST | `/gaianet` | Force point sync |
| GET | `/bio-reminder` | Plant feeding schedule |
| POST | `/bio-reminder` | Log feeding completion |
| POST | `/milestone` | Trigger milestone celebration |

---

## 🔧 Configuration

Edit `.env.local`:

```env
# Process to monitor
SACRED_TURBO_PID=14430

# GaiaNet settings (reward points, not withdrawable funds)
GAIANET_NODE_URL=https://0x0df24a65419004cdec9dcdbd046f6609405c81db.gaia.domains
GAIANET_REWARD_POINTS=1443000

# API server port
PORT=3001
```

---

## 🐧 Linux Service Setup

Install as systemd service for 24/7 monitoring:

```bash
sudo bash scripts/install-service.sh
```

Manage the service:
```bash
sudo systemctl start umaja-watcher
sudo systemctl status umaja-watcher
sudo journalctl -u umaja-watcher -f
```

See [docs/SACRED_TURBO_SETUP.md](docs/SACRED_TURBO_SETUP.md) for details.

---

## 📚 Documentation

- **[UMAJA Core Philosophy](docs/UMAJA_CORE_PHILOSOPHY.md)** - The vision and values
- **[John Cleese Protocol](docs/JOHN_CLEESE_PROTOCOL.md)** - Personality guidelines
- **[Sacred-Turbo Setup](docs/SACRED_TURBO_SETUP.md)** - Technical setup guide
- **[Financial Reality](docs/FINANCIAL_REALITY.md)** - Transparent financial model (reward points clarification)

---

## 🎭 Example Interactions

**Process Restart:**
```
"Right. Process 14430 has stopped. Again. I'll sort it out, shall I?"
```

**Payout Success:**
```
"€250 sent. €47.50 went to save humanity. You're welcome, planet Earth."
```

**Plant Reminder:**
```
"The plants are looking thirsty. 5-10ml Calmag would be appreciated. 
By them, not me. I don't drink."
```

**Health Check:**
```
"Everything's fine. Completely fine. Nothing catastrophic happening. Yet."
```

---

## 🌍 The UMAJA Trinity

```
    🤖 PERSONALITY           💰 ECONOMY              🌱 BIOLOGY
   (John Cleese AI)      (Ethical Finance)      (Physical Growth)
         │                      │                      │
         └──────────────────────┴──────────────────────┘
                              │
                        🌍 UMAJA CORE
                   (Operating System as Philosophy)
```

---

## 🚀 Development

**Build TypeScript:**
```bash
npm run build:lib
```

**Build Frontend:**
```bash
npm run build
```

**Run Tests:**
```bash
npm test  # (when tests are added)
```

---

## 📜 License

This project is private.

---

## 🤝 Contributing

UMAJA Core is built on principles of:
- Authenticity (no fake cheerfulness)
- Accountability (every action tracked)
- Life First (technology serves biology)
- Equal Partnership (AI as colleague)

When contributing, ask:
- Does this serve life?
- Does this maintain ethical standards?
- Would John Cleese approve of this commentary?

---

*adjusts spectacles*

Right then. Let's build systems that matter, shall we?

**— The UMAJA Core Team**

