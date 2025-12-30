# SACRED-TURBO SETUP GUIDE

## Setting Up Process Monitoring for UMAJA Core

### 📋 Overview

The Sacred-Turbo-Modus refers to the critical process (default PID 14430) that UMAJA Guardian monitors. This guide walks you through:

1. Identifying your process PID
2. Installing the monitoring daemon
3. Configuring the systemd service
4. Log file locations and troubleshooting

---

## 🔍 Step 1: Identify Your Process PID

### What is PID 14430?

PID 14430 is the **placeholder** process ID used in the examples. You need to identify your actual critical process.

### Find Your Process

**Option A: By Name**
```bash
# Find process by name
ps aux | grep "your-process-name"

# Example: Find node processes
ps aux | grep node
```

**Option B: By Port**
```bash
# Find process using a specific port
lsof -i :3000
netstat -tulpn | grep 3000
```

**Option C: List All Your Processes**
```bash
# List all processes owned by you
ps -u $USER

# More detailed view
ps aux | grep $USER
```

### Note Your PID

Once you've identified your critical process, note the PID:
```bash
# Example output:
user     14430  2.1  3.2  /path/to/your/process
         ^^^^^ 
         This is your PID
```

---

## 🔧 Step 2: Configure Environment Variables

### Create .env File

In the project root, create or edit `.env.local`:

```bash
cd /path/to/umaja-v2
nano .env.local
```

Add:
```env
# Sacred-Turbo-Modus Configuration
SACRED_TURBO_PID=14430

# Replace 14430 with your actual process PID
# Example: SACRED_TURBO_PID=28451

# GaiaNet Configuration
GAIANET_NODE_URL=https://0x0df24a65419004cdec9dcdbd046f6609405c81db.gaia.domains

# IMPORTANT: These are promotional reward points, NOT withdrawable funds
# Think of them like airline miles - valuable for network use, but not cash
GAIANET_REWARD_POINTS=1443000

# API Server Port
PORT=3001
```

### Important Notes

⚠️ **The PID will change** if your process restarts. For production use, consider:
- Using a PID file (e.g., `/var/run/yourapp.pid`)
- Monitoring by process name instead
- Using a process manager like PM2 or systemd

---

## 🚀 Step 3: Install the Monitoring Daemon

### Manual Installation

1. **Copy Scripts to System Location**
```bash
sudo cp scripts/sacred-turbo.sh /usr/local/bin/umaja-watcher
sudo chmod +x /usr/local/bin/umaja-watcher
```

2. **Test the Monitor Script**
```bash
# Run manually first to test
bash scripts/sacred-turbo.sh

# You should see:
# 🤖 UMAJA Guardian - Sacred-Turbo Monitor Started
# Monitoring PID: 14430
# ...
```

Press `Ctrl+C` to stop the test.

### Automated Installation

Use the provided installation script:

```bash
sudo bash scripts/install-service.sh
```

This will:
- ✅ Copy the monitor script to `/usr/local/bin/`
- ✅ Create systemd service file
- ✅ Enable auto-start on boot
- ✅ Configure restart policies

---

## 🔄 Step 4: Systemd Service Configuration

### Service File Location

After installation:
```
/etc/systemd/system/umaja-watcher.service
```

### Manual Service Setup (Alternative)

If you prefer manual setup:

1. **Copy Service File**
```bash
sudo cp scripts/umaja-watcher.service /etc/systemd/system/
```

2. **Edit Service File**
```bash
sudo nano /etc/systemd/system/umaja-watcher.service
```

Update the `ExecStart` path if needed:
```ini
[Service]
ExecStart=/usr/local/bin/umaja-watcher
Environment="SACRED_TURBO_PID=14430"
```

3. **Enable and Start**
```bash
# Reload systemd
sudo systemctl daemon-reload

# Enable service
sudo systemctl enable umaja-watcher

# Start service
sudo systemctl start umaja-watcher

# Check status
sudo systemctl status umaja-watcher
```

---

## 📊 Step 5: Managing the Service

### Common Commands

**Start the service:**
```bash
sudo systemctl start umaja-watcher
```

**Stop the service:**
```bash
sudo systemctl stop umaja-watcher
```

**Restart the service:**
```bash
sudo systemctl restart umaja-watcher
```

**Check status:**
```bash
sudo systemctl status umaja-watcher
```

**View logs:**
```bash
# Follow logs in real-time
sudo journalctl -u umaja-watcher -f

# View last 100 lines
sudo journalctl -u umaja-watcher -n 100

# View logs from today
sudo journalctl -u umaja-watcher --since today
```

**Disable auto-start:**
```bash
sudo systemctl disable umaja-watcher
```

---

## 📝 Step 6: Log File Locations

### System Logs

**Journald (systemd) Logs:**
```bash
# Real-time logs
sudo journalctl -u umaja-watcher -f

# Filter by priority
sudo journalctl -u umaja-watcher -p err

# Export logs
sudo journalctl -u umaja-watcher > umaja-logs.txt
```

**Custom Log File:**
```
/var/log/umaja-guardian.log
```

View custom logs:
```bash
# Tail logs
sudo tail -f /var/log/umaja-guardian.log

# View entire log
sudo less /var/log/umaja-guardian.log

# Search logs
sudo grep "ERROR" /var/log/umaja-guardian.log
```

### Log Rotation

Create log rotation config:
```bash
sudo nano /etc/logrotate.d/umaja-guardian
```

Add:
```
/var/log/umaja-guardian.log {
    daily
    rotate 7
    compress
    delaycompress
    notifempty
    create 644 root root
}
```

---

## 🔧 Troubleshooting

### Issue: Service Won't Start

**Check service status:**
```bash
sudo systemctl status umaja-watcher
```

**Check logs for errors:**
```bash
sudo journalctl -u umaja-watcher -n 50
```

**Common fixes:**
- Verify script path in service file
- Check script permissions: `ls -l /usr/local/bin/umaja-watcher`
- Ensure script is executable: `sudo chmod +x /usr/local/bin/umaja-watcher`

### Issue: Process Not Detected

**Verify PID exists:**
```bash
ps -p 14430
```

**If process doesn't exist:**
1. Find your actual process PID
2. Update `.env.local` with correct PID
3. Update service file environment variable
4. Restart service: `sudo systemctl restart umaja-watcher`

### Issue: Permission Denied on Log File

**Fix log file permissions:**
```bash
sudo touch /var/log/umaja-guardian.log
sudo chmod 644 /var/log/umaja-guardian.log
```

### Issue: Service Keeps Restarting

**Check if restart command is configured:**
```bash
nano scripts/sacred-turbo.sh
```

Look for `RESTART_COMMAND` variable. If empty, the service will log errors but can't restart the process.

**Set restart command:**
```bash
# Example for Node.js app
RESTART_COMMAND="cd /path/to/app && npm start &"

# Example with PM2
RESTART_COMMAND="pm2 restart app-name"

# Example with systemd
RESTART_COMMAND="systemctl restart your-app"
```

---

## 🎯 Advanced Configuration

### Monitor Multiple Processes

Create multiple service instances:

```bash
# Copy service file with new name
sudo cp /etc/systemd/system/umaja-watcher.service \
       /etc/systemd/system/umaja-watcher-secondary.service

# Edit new service
sudo nano /etc/systemd/system/umaja-watcher-secondary.service
```

Change environment variable:
```ini
Environment="SACRED_TURBO_PID=28451"
```

Enable and start:
```bash
sudo systemctl daemon-reload
sudo systemctl enable umaja-watcher-secondary
sudo systemctl start umaja-watcher-secondary
```

### Customize Check Interval

Edit the monitor script:
```bash
sudo nano /usr/local/bin/umaja-watcher
```

Change `CHECK_INTERVAL`:
```bash
CHECK_INTERVAL=60  # seconds (default: 1 minute)
CHECK_INTERVAL=30  # 30 seconds
CHECK_INTERVAL=300 # 5 minutes
```

Restart service:
```bash
sudo systemctl restart umaja-watcher
```

---

## 📡 Integration with UMAJA Core API

The API server provides additional monitoring through HTTP endpoints:

### Start API Server

```bash
# Install dependencies
npm install

# Build TypeScript
npm run build

# Start server
npm run start:server
```

### API Endpoints

**Check Guardian Status:**
```bash
curl http://localhost:3001/api/umaja-core/status
```

**Manual Health Check:**
```bash
curl -X POST http://localhost:3001/api/umaja-core/watcher
```

**View Logs via API:**
Access logs through the API for remote monitoring:
```bash
curl http://localhost:3001/api/umaja-core/watcher
```

---

## ✅ Verification Checklist

After setup, verify:

- [ ] Process PID correctly identified
- [ ] `.env.local` configured with correct PID
- [ ] Monitor script is executable
- [ ] Service installed and enabled
- [ ] Service is running: `systemctl status umaja-watcher`
- [ ] Logs are being written: `tail /var/log/umaja-guardian.log`
- [ ] Process monitoring works (check logs for updates)
- [ ] API server can communicate with Guardian

---

## 🚨 Production Recommendations

For production environments:

1. **Use Process Managers**: PM2, systemd, supervisord
2. **Monitor by Name**: Not just PID (PIDs change on restart)
3. **Set Up Alerts**: Email/Slack notifications on failures
4. **Regular Log Review**: Automate log analysis
5. **Backup Strategy**: Keep config files in version control
6. **Resource Limits**: Set memory/CPU limits in systemd
7. **Health Checks**: Use API endpoints for external monitoring

---

## 🆘 Getting Help

**Check Logs First:**
```bash
sudo journalctl -u umaja-watcher -n 100
sudo tail -50 /var/log/umaja-guardian.log
```

**Test Script Manually:**
```bash
bash scripts/sacred-turbo.sh
```

**Verify Permissions:**
```bash
ls -l /usr/local/bin/umaja-watcher
ls -l /var/log/umaja-guardian.log
```

**Common Issues:**
- PID doesn't exist → Find correct PID
- Permission denied → Check file permissions
- Service won't start → Check journalctl logs
- Process not restarting → Configure RESTART_COMMAND

---

*adjusts spectacles*

Right then. Your Sacred-Turbo-Modus monitoring should now be operational.

Good luck. You'll probably need it.

**— The UMAJA Core Team**
