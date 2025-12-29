# PayPal Integration Documentation - UMAJA v4.2.2

## 📋 Table of Contents
- [Overview](#overview)
- [Features](#features)
- [Setup Instructions](#setup-instructions)
- [API Endpoints](#api-endpoints)
- [Security Best Practices](#security-best-practices)
- [Sandbox to Live Migration](#sandbox-to-live-migration)
- [Troubleshooting](#troubleshooting)

## 🎯 Overview

This integration provides a complete PayPal Payout system with an Ethical Ledger that automatically applies a 19% Impact-Split to all transactions. The system supports both sandbox and live modes, making it easy to develop and test before going to production.

### Key Components

1. **PayPal Payout Engine** (`lib/paypal/payout.ts`)
   - Handles single and batch payouts
   - Automatic authentication and token management
   - 19% Impact-Split calculation
   - Sandbox/Live mode switching

2. **Ethical Ledger System** (`lib/ledger/ethical-ledger.ts`)
   - Transaction tracking and history
   - Impact statistics and reporting
   - Export/Import functionality

3. **API Routes**
   - `/api/paypal/payout` - Create payouts
   - `/api/test-connection` - Test PayPal connectivity
   - `/api/ledger/status` - View ledger status

## ✨ Features

- ✅ Secure credential management via environment variables
- ✅ Automatic 19% Impact-Split for Ethical Ledger
- ✅ Support for single and batch payouts
- ✅ Sandbox and live mode switching
- ✅ Transaction history and statistics
- ✅ TypeScript type safety
- ✅ Comprehensive error handling
- ✅ Automated testing via GitHub Actions

## 🔧 Setup Instructions

### 1. Prerequisites

- Node.js 18+ installed
- PayPal Business Account
- PayPal API credentials (Client ID and Secret)

### 2. Get PayPal Credentials

#### For Sandbox (Development):
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Navigate to "Apps & Credentials"
3. Select "Sandbox" tab
4. Create a new app or use existing one
5. Copy Client ID and Secret

#### For Live (Production):
1. Go to [PayPal Developer Dashboard](https://developer.paypal.com/dashboard/)
2. Navigate to "Apps & Credentials"
3. Select "Live" tab
4. Create a new app or use existing one
5. Copy Client ID and Secret

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# PayPal Configuration
PAYPAL_MODE=sandbox
PAYPAL_SANDBOX_URL=https://api-m.sandbox.paypal.com
PAYPAL_LIVE_URL=https://api-m.paypal.com

# Main Application
PAYPAL_CLIENT_ID=your_sandbox_client_id_here
PAYPAL_CLIENT_SECRET=your_sandbox_client_secret_here

# UMAJA_OS (Optional - for separate OS app)
PAYPAL_CLIENT_ID_OS=your_os_client_id_here
PAYPAL_CLIENT_SECRET_OS=your_os_client_secret_here

# UMAJA_PAYOUT (Recommended for payouts)
PAYPAL_CLIENT_ID_PAYOUT=your_payout_client_id_here
PAYPAL_CLIENT_SECRET_PAYOUT=your_payout_client_secret_here

# Ethical Ledger
ETHICAL_LEDGER_MODE=live
IMPACT_SPLIT_PERCENTAGE=19
```

### 4. Install Dependencies

```bash
npm install
```

### 5. Test the Connection

```bash
# Using curl
curl http://localhost:3000/api/test-connection

# Or visit in browser
# http://localhost:3000/api/test-connection
```

Expected response:
```json
{
  "success": true,
  "message": "Successfully connected to PayPal API",
  "mode": "sandbox",
  "timestamp": "2025-12-29T22:00:00.000Z",
  "configuration": {
    "hasClientId": true,
    "hasClientSecret": true,
    "mode": "sandbox",
    "impactSplitPercentage": "19"
  }
}
```

## 🚀 API Endpoints

### 1. Create Single Payout

**Endpoint:** `POST /api/paypal/payout`

**Request Body:**
```json
{
  "type": "single",
  "recipient": "recipient@example.com",
  "amount": 100.00,
  "currency": "USD",
  "note": "Payment for services"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Payout created successfully",
  "transactionId": "TXN_1735512000000_abc123",
  "impactSplit": {
    "originalAmount": 100.00,
    "impactAmount": 19.00,
    "recipientAmount": 81.00,
    "percentage": 19
  },
  "data": {
    "batch_header": {
      "payout_batch_id": "ABCDEFGHIJK",
      "batch_status": "PENDING"
    }
  }
}
```

### 2. Create Batch Payout

**Endpoint:** `POST /api/paypal/payout`

**Request Body:**
```json
{
  "type": "batch",
  "currency": "USD",
  "recipients": [
    {
      "email": "recipient1@example.com",
      "amount": 100.00,
      "note": "Payment 1"
    },
    {
      "email": "recipient2@example.com",
      "amount": 150.00,
      "note": "Payment 2"
    }
  ]
}
```

**Response:**
```json
{
  "success": true,
  "message": "Batch payout created successfully",
  "transactionId": "TXN_1735512000000_xyz789",
  "impactSplit": {
    "originalAmount": 250.00,
    "impactAmount": 47.50,
    "recipientAmount": 202.50,
    "percentage": 19
  }
}
```

### 3. Test Connection

**Endpoint:** `GET /api/test-connection`

**Response:**
```json
{
  "success": true,
  "message": "Successfully connected to PayPal API",
  "mode": "sandbox",
  "timestamp": "2025-12-29T22:00:00.000Z",
  "configuration": {
    "hasClientId": true,
    "hasClientSecret": true,
    "mode": "sandbox",
    "impactSplitPercentage": "19"
  }
}
```

### 4. Get Ledger Status

**Endpoint:** `GET /api/ledger/status?limit=10&mode=sandbox`

**Query Parameters:**
- `limit` (optional): Number of recent transactions to return (default: 10)
- `mode` (optional): Filter by mode ('sandbox' or 'live')

**Response:**
```json
{
  "success": true,
  "message": "Ledger status retrieved successfully",
  "status": {
    "stats": {
      "totalTransactions": 5,
      "totalOriginalAmount": 500.00,
      "totalImpactAmount": 95.00,
      "totalRecipientAmount": 405.00,
      "impactPercentage": 19,
      "currency": "USD",
      "mode": "sandbox"
    },
    "recentTransactions": [...],
    "lastUpdated": "2025-12-29T22:00:00.000Z"
  },
  "impactSummary": {
    "totalImpactGenerated": 95.00,
    "transactionCount": 5,
    "averageImpactPerTransaction": 19.00,
    "mode": "sandbox"
  }
}
```

## 🔒 Security Best Practices

### 1. Never Hardcode Credentials
❌ **BAD:**
```typescript
const clientId = 'AYourActualClientId123';
const clientSecret = 'EYourActualSecret456';
```

✅ **GOOD:**
```typescript
const clientId = process.env.PAYPAL_CLIENT_ID;
const clientSecret = process.env.PAYPAL_CLIENT_SECRET;
```

### 2. Use GitHub Secrets for CI/CD

For GitHub Actions workflows:
1. Go to your repository Settings
2. Navigate to "Secrets and variables" → "Actions"
3. Add the following secrets:
   - `PAYPAL_CLIENT_ID`
   - `PAYPAL_CLIENT_SECRET`
   - `PAYPAL_CLIENT_ID_PAYOUT` (if using separate credentials)
   - `PAYPAL_CLIENT_SECRET_PAYOUT`

### 3. Separate Credentials for Different Environments

Use different PayPal apps for sandbox and production:
- **Sandbox App:** For development and testing
- **Production App:** For live transactions

### 4. .gitignore Configuration

Ensure your `.gitignore` includes:
```
.env
.env.local
.env.production
.env.development
*secret*
*credential*
```

### 5. Error Handling

The system is designed to avoid exposing sensitive information in error messages:
```typescript
// Generic error messages for API responses
{
  "success": false,
  "message": "Authentication failed",
  "error": "Invalid credentials"
}
// Detailed errors are logged server-side only
```

## 🔄 Sandbox to Live Migration

### Step 1: Test Thoroughly in Sandbox

1. Run all tests with sandbox credentials
2. Verify payouts are created successfully
3. Check Ethical Ledger is recording transactions
4. Test error handling with invalid data

```bash
# Set sandbox mode
PAYPAL_MODE=sandbox
```

### Step 2: Get Production Credentials

1. Apply for PayPal production access if needed
2. Create a new app in the "Live" section
3. Copy production Client ID and Secret
4. Store them securely

### Step 3: Update Environment Variables

Update your `.env.local` or production environment:

```bash
# Switch to live mode
PAYPAL_MODE=live

# Use production credentials
PAYPAL_CLIENT_ID=your_production_client_id
PAYPAL_CLIENT_SECRET=your_production_client_secret
PAYPAL_CLIENT_ID_PAYOUT=your_production_payout_client_id
PAYPAL_CLIENT_SECRET_PAYOUT=your_production_payout_client_secret
```

### Step 4: Update GitHub Secrets

Replace sandbox secrets with production secrets in GitHub:
- Settings → Secrets and variables → Actions
- Update each secret with production values

### Step 5: Deploy and Monitor

1. Deploy to production
2. Monitor first few transactions closely
3. Check Ethical Ledger for accurate recording
4. Verify PayPal dashboard shows transactions

## 🔧 Troubleshooting

### Issue: "Authentication failed"

**Symptoms:** Test connection fails with authentication error

**Solutions:**
1. Verify credentials are correct
2. Check if credentials match the mode (sandbox vs live)
3. Ensure no extra spaces in `.env` file
4. Verify app is active in PayPal dashboard

```bash
# Test credentials
curl http://localhost:3000/api/test-connection
```

### Issue: "Payout failed: Insufficient funds"

**Symptoms:** Payout API returns insufficient funds error

**Solutions:**
1. **Sandbox:** Add funds to sandbox test account
   - Go to PayPal Sandbox Accounts
   - Add funds to business account
2. **Live:** Ensure PayPal business account has sufficient balance

### Issue: "Cannot find module 'lib/paypal/payout'"

**Symptoms:** Import errors when running the application

**Solutions:**
1. Verify file structure is correct
2. Check TypeScript configuration
3. Run `npm install` to ensure dependencies are installed
4. Check that files are in correct directories:
   - `lib/paypal/payout.ts`
   - `lib/ledger/ethical-ledger.ts`
   - `api/paypal/payout/route.ts`

### Issue: Impact-Split Not Working

**Symptoms:** Full amount is sent without 19% split

**Solutions:**
1. Verify `IMPACT_SPLIT_PERCENTAGE=19` in environment
2. Check Ethical Ledger is recording transactions
3. Review transaction history: `GET /api/ledger/status`

```bash
# Check environment variable
echo $IMPACT_SPLIT_PERCENTAGE
```

### Issue: "Invalid recipient email"

**Symptoms:** Payout fails with invalid recipient error

**Solutions:**
1. Ensure email is a valid PayPal account email
2. For sandbox, use sandbox test account emails
3. Verify recipient has accepted PayPal terms

### Issue: GitHub Actions Failing

**Symptoms:** CI/CD workflow fails

**Solutions:**
1. Check if all required files are committed
2. Verify `.gitignore` is not excluding necessary files
3. Ensure GitHub Secrets are configured (optional for some tests)
4. Review workflow logs in Actions tab

## 📊 Monitoring and Analytics

### Check Ledger Statistics

```bash
# Get current ledger status
curl http://localhost:3000/api/ledger/status

# Get sandbox transactions only
curl http://localhost:3000/api/ledger/status?mode=sandbox

# Get more transactions
curl http://localhost:3000/api/ledger/status?limit=50
```

### View PayPal Dashboard

- **Sandbox:** https://www.sandbox.paypal.com
- **Live:** https://www.paypal.com

Monitor:
- Payout history
- Account balance
- Transaction fees
- Failed payouts

## 🎯 Best Practices

1. **Always test in sandbox first**
   - Never go directly to production
   - Test all edge cases

2. **Monitor Impact-Split accuracy**
   - Regularly check ledger statistics
   - Verify 19% is correctly calculated

3. **Keep credentials secure**
   - Use environment variables
   - Never commit `.env` files
   - Rotate credentials periodically

4. **Handle errors gracefully**
   - Always check response status
   - Log errors server-side
   - Show user-friendly messages

5. **Regular backups**
   - Export ledger data periodically
   - Store backups securely

## 📞 Support

For issues or questions:
1. Check this documentation
2. Review PayPal API documentation: https://developer.paypal.com/docs/api/
3. Check GitHub Issues for known problems
4. Contact UMAJA support

## 📝 Changelog

### v4.2.2 (2025-12-29)
- Initial PayPal Payout integration
- Ethical Ledger System implementation
- 19% Impact-Split feature
- Sandbox and live mode support
- Comprehensive documentation

## 📄 License

This integration is part of UMAJA v4.2.2
