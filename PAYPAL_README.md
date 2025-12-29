# PayPal Integration Quick Start

This directory contains the PayPal Payout Integration with Ethical Ledger for UMAJA v4.2.2.

## 📁 Structure

```
.
├── lib/
│   ├── paypal/
│   │   └── payout.ts          # PayPal Payout Engine
│   └── ledger/
│       └── ethical-ledger.ts   # Ethical Ledger System
├── api/
│   ├── paypal/
│   │   └── payout/
│   │       └── route.ts        # Payout API endpoint
│   ├── test-connection/
│   │   └── route.ts            # Connection test endpoint
│   └── ledger/
│       └── status/
│           └── route.ts        # Ledger status endpoint
├── docs/
│   └── PAYPAL_INTEGRATION.md   # Complete documentation
└── .env.example                # Environment variables template
```

## 🚀 Quick Setup

1. **Copy environment template:**
   ```bash
   cp .env.example .env.local
   ```

2. **Add your PayPal credentials to `.env.local`:**
   ```env
   PAYPAL_MODE=sandbox
   PAYPAL_CLIENT_ID=your_actual_client_id
   PAYPAL_CLIENT_SECRET=your_actual_client_secret
   ```

3. **Install dependencies:**
   ```bash
   npm install
   ```

4. **Test the connection:**
   ```bash
   # Run your application and visit:
   # http://localhost:3000/api/test-connection
   ```

## 📖 Documentation

For complete documentation, see [docs/PAYPAL_INTEGRATION.md](docs/PAYPAL_INTEGRATION.md)

## ✨ Features

- ✅ **19% Impact-Split** - Automatically applied to all transactions
- ✅ **Sandbox & Live Mode** - Easy switching between environments
- ✅ **Ethical Ledger** - Complete transaction tracking
- ✅ **Type Safety** - Full TypeScript support
- ✅ **Secure** - No hardcoded credentials

## 🔒 Security

- All credentials are loaded from environment variables
- `.env` files are excluded from git
- No sensitive data in source code
- Production credentials should be stored in GitHub Secrets

## 🧪 Testing

The integration includes automated tests via GitHub Actions. See `.github/workflows/paypal-test.yml`

## 📞 Support

For issues or questions, check the [complete documentation](docs/PAYPAL_INTEGRATION.md) or open an issue.
