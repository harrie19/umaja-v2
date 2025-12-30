# 📱 Mobile Development Guide - UMAJA

## Overview

UMAJA is designed to be fully manageable from mobile devices. This guide covers tools, workflows, and best practices for maintaining and developing UMAJA on iOS and Android devices.

---

## 🛠️ Recommended Tools

### iOS Tools

#### Working Copy (Git Client)
- **Cost:** Free (Pro upgrade recommended)
- **Purpose:** Full Git repository management
- **Features:**
  - Clone repositories
  - Commit and push changes
  - File editing with syntax highlighting
  - SSH key support
  - Integrates with other apps

#### iSH (Linux Shell)
- **Cost:** Free
- **Purpose:** Alpine Linux environment on iOS
- **Features:**
  - Python execution
  - Package management (apk)
  - Script testing
  - File system access

#### Textastic (Code Editor)
- **Cost:** Paid
- **Purpose:** Professional code editing
- **Features:**
  - Syntax highlighting for 80+ languages
  - FTP/SFTP support
  - Git integration
  - Code completion

#### Shortcuts (Automation)
- **Cost:** Free (built-in)
- **Purpose:** Automate common tasks
- **Features:**
  - Trigger GitHub Actions
  - Check system status
  - Open frequently used URLs

### Android Tools

#### Termux (Terminal Emulator)
- **Cost:** Free
- **Purpose:** Full Linux environment
- **Features:**
  - Python, Node.js, Git
  - Package management (pkg)
  - SSH client
  - Script execution

#### Acode (Code Editor)
- **Cost:** Free
- **Purpose:** Lightweight code editor
- **Features:**
  - Syntax highlighting
  - GitHub integration
  - Plugin support
  - File browser

#### MGit (Git Client)
- **Cost:** Free
- **Purpose:** Git repository management
- **Features:**
  - Clone, commit, push
  - Branch management
  - SSH keys
  - Diff viewer

---

## 📅 Daily Workflow

### Morning Check (5 minutes)

```
1. Open GitHub Mobile App
   └─> Check Actions tab for overnight runs
   └─> Review any failures or alerts

2. Review Dashboard (via mobile browser)
   └─> https://umaja-dashboard.vercel.app
   └─> Check agent status
   └─> Review live logs

3. Check Notifications
   └─> Email alerts
   └─> Telegram notifications (if configured)
   └─> GitHub notifications
```

### Automated Execution

Trevor agent runs automatically at 8:00 UTC daily:
- No manual intervention needed
- GitHub Actions handles execution
- Content committed automatically
- Check logs if needed

### Evening Review (10 minutes)

```
1. Verify Trevor Execution
   └─> Check content/articles/ for new files
   └─> Review generated article
   └─> Check JSON metadata

2. Review System Status
   └─> Open status-check workflow results
   └─> Verify no errors in logs
   └─> Check ethical allocation reports

3. Plan Tomorrow (if needed)
   └─> Queue manual runs
   └─> Update agent configurations
   └─> Review pending issues
```

---

## ☁️ GitHub Codespaces (Mobile)

### Setup

1. **Open Repository on Mobile**
   ```
   - Navigate to github.com/harrie19/umaja-v2
   - Tap "Code" button
   - Select "Codespaces" tab
   - Tap "Create codespace on main"
   ```

2. **Wait for Environment**
   - Codespace builds (2-3 minutes)
   - VS Code interface loads in browser
   - Full development environment ready

3. **Mobile Optimization**
   ```
   - Rotate to landscape for better view
   - Use split screen on tablets
   - Enable "Desktop Site" in browser settings
   - Zoom as needed
   ```

### Common Tasks in Codespaces

#### Test Trevor Agent
```bash
python scripts/trevor.py --test --day 1
```

#### Install Dependencies
```bash
pip install -r scripts/requirements.txt
```

#### Check Git Status
```bash
git status
git log --oneline -5
```

#### Edit Files
- Use VS Code interface
- Syntax highlighting works
- IntelliSense available
- Terminal access at bottom

### Limitations
- Battery intensive (keep charger handy)
- Requires stable internet
- Limited to 60 hours/month (free tier)
- Better on tablets than phones

---

## 🌐 n8n.cloud Mobile Access

### Setup

1. **Create n8n.cloud Account**
   - Visit n8n.cloud
   - Sign up (free tier available)
   - Verify email

2. **Import UMAJA Workflow**
   - Open n8n editor
   - Import `n8n-workflows/daily-monitoring.json`
   - Configure credentials

3. **Mobile Access**
   - Bookmark: https://app.n8n.cloud
   - Login on mobile browser
   - Request desktop site for full features

### Mobile Monitoring

#### Quick Status Check
```
1. Open n8n.cloud on mobile
2. View workflow execution history
3. Check for red (failed) executions
4. Review success rate
```

#### Trigger Manual Execution
```
1. Open workflow
2. Tap "Execute Workflow" button
3. Wait for completion
4. Review output
```

#### Configure Alerts
- Set up Telegram bot for notifications
- Configure email alerts
- Use webhooks to external services

---

## 🚨 Emergency Fixes from Mobile

### Scenario: Trevor Agent Failed

**Step 1: Diagnose**
```
1. Open GitHub Actions on mobile
2. Find failed workflow run
3. Read error logs
4. Identify issue (API key, syntax error, etc.)
```

**Step 2: Quick Fix**
```
Option A: Using Working Copy (iOS)
1. Open repository in Working Copy
2. Navigate to scripts/trevor.py
3. Edit file
4. Commit and push

Option B: Using GitHub Web
1. Navigate to file on github.com
2. Tap edit (pencil icon)
3. Make changes
4. Commit directly to branch

Option C: Using Codespaces
1. Open Codespace
2. Edit file in VS Code
3. Commit and push
```

**Step 3: Re-run**
```
1. Open GitHub Actions
2. Find Trevor Daily workflow
3. Tap "Run workflow"
4. Enable test mode
5. Execute and verify
```

### Scenario: Dashboard Down

**Quick Check:**
```
1. Visit Vercel dashboard on mobile
2. Check deployment status
3. Review build logs
4. Check for deployment errors
```

**Trigger Redeploy:**
```
1. Make minor commit (e.g., add space to README)
2. Push to main branch
3. Vercel auto-deploys
4. Wait 2-3 minutes
5. Verify site is up
```

---

## ⌨️ Keyboard Shortcuts (Mobile)

### iOS (with External Keyboard)

```
Working Copy:
- Cmd+N: New file
- Cmd+S: Save
- Cmd+K: Commit
- Cmd+P: Push

Safari:
- Cmd+T: New tab
- Cmd+R: Refresh
- Cmd+L: Focus address bar
```

### Android (with External Keyboard)

```
Termux:
- Ctrl+C: Cancel command
- Ctrl+D: Exit
- Volume Up + Q: Show extra keys

Acode:
- Ctrl+S: Save
- Ctrl+F: Find
- Ctrl+H: Replace
```

---

## 📱 Mobile-Optimized Dashboard

### Responsive Design Features

```css
/* Mobile viewport (< 640px) */
- Single column layout
- Larger touch targets (min 44px)
- Collapsible sections
- Horizontal scrolling tables
- Bottom navigation bar

/* Tablet viewport (640px - 1024px) */
- Two column grid
- Sidebar navigation
- Expanded cards
- Multi-select actions

/* Desktop viewport (> 1024px) */
- Three column grid
- Persistent sidebar
- Detailed views
- Keyboard shortcuts
```

### Mobile Testing

```bash
# Start development server
cd client
npm install
npm run dev

# Access from mobile device
# Find your local IP: ifconfig | grep inet
# Visit: http://[YOUR_IP]:3000

# Or use ngrok for external access
ngrok http 3000
# Visit provided URL on mobile
```

---

## 🔋 Battery & Data Conservation

### Battery Tips
- Close unused browser tabs
- Disable auto-refresh when not needed
- Use "Low Power Mode" during long sessions
- Keep device plugged in for heavy tasks

### Data Usage Tips
- Prefer WiFi for GitHub Codespaces
- Enable "Lite Mode" in Chrome (Android)
- Disable auto-play videos
- Download workflows/docs for offline reference

---

## 📂 Offline Capabilities

### What Works Offline
- View cloned repository (Working Copy/MGit)
- Read documentation (if cached)
- Edit files locally
- Plan changes and commits

### What Requires Internet
- Push/pull from GitHub
- GitHub Actions execution
- Dashboard access
- Supabase queries
- API integrations

### Offline Workflow
```
1. Clone repo when online
2. Work on changes offline
3. Test locally (if tools installed)
4. Queue commits
5. Push when back online
```

---

## 🎯 Best Practices

### 1. Use Notifications
- Enable GitHub mobile notifications
- Set up Telegram alerts
- Use email for important updates
- Configure n8n for real-time monitoring

### 2. Bookmark Key URLs
```
- Dashboard: https://umaja-dashboard.vercel.app
- GitHub Actions: https://github.com/harrie19/umaja-v2/actions
- Supabase: https://app.supabase.com
- n8n: https://app.n8n.cloud
- Vercel: https://vercel.com/dashboard
```

### 3. Document Everything
- Use GitHub Issues for tracking
- Add comments to commits
- Update docs as you work
- Log decisions in Issues

### 4. Test Before Merging
- Always use `--test` flag first
- Review generated output
- Check logs for errors
- Verify in staging environment

### 5. Keep Dependencies Updated
- Check for security updates weekly
- Test updates in separate branch
- Document breaking changes
- Notify team of updates

---

## 🆘 Support & Resources

### Mobile-Friendly Resources
- GitHub Mobile App: Full featured, well optimized
- Stack Overflow: Mobile web works well
- Python Docs: Mobile-responsive
- Next.js Docs: Excellent mobile experience

### Community
- GitHub Discussions: Ask questions
- Discord/Slack: Real-time help (if set up)
- Twitter: Follow updates (#UMAJA)

### Learning Resources
- "Working Copy Guide" - iOS Git workflows
- "Termux Wiki" - Android terminal setup
- "Mobile DevOps" - General best practices

---

## 🔮 Future Mobile Features

Planned improvements:
- [ ] Native mobile app (React Native)
- [ ] Offline-first capabilities
- [ ] Push notifications
- [ ] Voice commands for common tasks
- [ ] Mobile-optimized code editor
- [ ] Simplified workflow triggers

---

## 📞 Quick Reference

### Emergency Contacts
```
System Down: Check GitHub Actions
Agent Failed: Review workflow logs
Dashboard Error: Check Vercel deployment
Database Issue: Review Supabase status page
```

### Quick Commands
```bash
# Test Trevor
python scripts/trevor.py --test

# Check Git status
git status --short

# View recent commits
git log --oneline -5

# Push changes
git add . && git commit -m "msg" && git push
```

---

*"Mobility is freedom. UMAJA works where you work."*

---

*Updated: 2025-12-30*  
*UMAJA Mobile Development Guide*
