#!/bin/bash
# Sacred-Turbo Monitor Script
# Monitors PID 14430 (Sacred-Turbo-Modus) and auto-restarts on failure

# Configuration
PID=${SACRED_TURBO_PID:-14430}
LOG_FILE="/var/log/umaja-guardian.log"
CHECK_INTERVAL=60  # seconds

# Restart command - MUST BE CONFIGURED FOR AUTO-RESTART TO WORK
# Examples:
#   RESTART_COMMAND="cd /path/to/app && npm start &"
#   RESTART_COMMAND="pm2 restart app-name"
#   RESTART_COMMAND="systemctl restart your-app"
RESTART_COMMAND=""  # Set this to your actual restart command

# Ensure log directory exists
LOG_DIR=$(dirname "$LOG_FILE")
if [ ! -d "$LOG_DIR" ]; then
    echo "Creating log directory: $LOG_DIR"
    sudo mkdir -p "$LOG_DIR"
    sudo chmod 755 "$LOG_DIR"
fi

# Logging function
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a "$LOG_FILE"
}

# Check if process is running
check_process() {
    if ps -p "$PID" > /dev/null 2>&1; then
        return 0  # Process is running
    else
        return 1  # Process is not running
    fi
}

# Restart process
restart_process() {
    log "⚠️  Process $PID is not running. Attempting restart..."
    
    if [ -z "$RESTART_COMMAND" ]; then
        log "❌ No restart command configured. Please set RESTART_COMMAND in the script."
        return 1
    fi
    
    # Execute restart command
    eval "$RESTART_COMMAND"
    
    sleep 5
    
    # Verify restart
    if check_process; then
        log "✅ Process restarted successfully. New PID: $PID"
        return 0
    else
        log "❌ Process restart failed"
        return 1
    fi
}

# Main monitoring loop
main() {
    log "🤖 UMAJA Guardian - Sacred-Turbo Monitor Started"
    log "Monitoring PID: $PID"
    log "Check interval: ${CHECK_INTERVAL}s"
    log "Log file: $LOG_FILE"
    echo ""
    
    while true; do
        if check_process; then
            # Get process stats
            CPU=$(ps -p "$PID" -o %cpu= | xargs)
            MEM=$(ps -p "$PID" -o %mem= | xargs)
            
            log "✓ Process $PID running - CPU: ${CPU}%, Memory: ${MEM}%"
        else
            log "⚠️  Process $PID is not running!"
            restart_process
        fi
        
        sleep "$CHECK_INTERVAL"
    done
}

# Handle script termination
trap 'log "🛑 UMAJA Guardian stopped"; exit 0' INT TERM

# Start monitoring
main
