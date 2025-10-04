#!/bin/bash

# Samsung TV Connection Recovery Script
# This script handles complete connection recovery, app launching, and connection verification

set -e  # Exit on any error

# Load configuration from .samsung-tv.conf
CONFIG_FILE="$(dirname "$0")/.samsung-tv.conf"
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
else
    echo "❌ Configuration file not found: $CONFIG_FILE"
    echo "Please run './run discover' to create the configuration file"
    exit 1
fi

# Configuration with fallbacks
TV_IP="${TV_IP:-}"
TV_PORT="${TV_PORT:-26101}"
APP_PACKAGE="${APP_PACKAGE:-gGnYSxMq0L.MLBTVSTG}"
MAX_RETRIES=3
RETRY_DELAY=5

# Validate required configuration
if [ -z "$TV_IP" ]; then
    echo "❌ TV_IP not configured in $CONFIG_FILE"
    echo "Please set TV_IP in the configuration file or run './run discover'"
    exit 1
fi

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Logging functions
log_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

log_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

log_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

log_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# Function to kill all existing processes
kill_existing_processes() {
    log_info "🔪 Killing existing Appium and ChromeDriver processes..."
    
    # Kill Appium processes
    if pgrep -f "appium" > /dev/null; then
        pkill -f "appium" || true
        log_info "Killed Appium processes"
    else
        log_info "No Appium processes found"
    fi
    
    # Kill ChromeDriver processes
    if pgrep -f "chromedriver" > /dev/null; then
        pkill -f "chromedriver" || true
        log_info "Killed ChromeDriver processes"
    else
        log_info "No ChromeDriver processes found"
    fi
    
    # Kill any WebDriver sessions
    if pgrep -f "webdriver" > /dev/null; then
        pkill -f "webdriver" || true
        log_info "Killed WebDriver processes"
    fi
    
    # Wait for processes to fully terminate
    sleep 3
    log_success "All processes terminated"
}

# Function to reset SDB connection
reset_sdb_connection() {
    log_info "🔄 Resetting SDB connection..."
    
    # Disconnect from TV
    log_info "Disconnecting from TV..."
    sdb disconnect ${TV_IP}:${TV_PORT} 2>/dev/null || true
    
    # Kill SDB server
    log_info "Killing SDB server..."
    sdb kill-server 2>/dev/null || true
    
    # Wait a moment
    sleep 2
    
    # Start SDB server
    log_info "Starting SDB server..."
    sdb start-server
    
    # Wait for server to initialize
    sleep 3
    
    # Connect to TV
    log_info "Connecting to TV at ${TV_IP}:${TV_PORT}..."
    if sdb connect ${TV_IP}:${TV_PORT}; then
        log_success "SDB connected successfully"
        return 0
    else
        log_error "Failed to connect via SDB"
        return 1
    fi
}

# Function to verify SDB connection
verify_sdb_connection() {
    log_info "🔍 Verifying SDB connection..."
    
    if sdb devices | grep -q "${TV_IP}:${TV_PORT}.*device"; then
        log_success "SDB connection verified - TV is connected"
        sdb devices
        return 0
    else
        log_warning "SDB connection not verified"
        sdb devices
        return 1
    fi
}

# Function to launch MLB app on TV
launch_mlb_app() {
    log_info "📱 Launching MLB app on Samsung TV..."
    
    # Check if app is already running
    if sdb shell "ps aux | grep -v grep | grep ${APP_PACKAGE}" > /dev/null 2>&1; then
        log_info "MLB app is already running, stopping it first..."
        sdb shell "pkill -f ${APP_PACKAGE}" 2>/dev/null || true
        sleep 2
    fi
    
    # Launch the app
    log_info "Starting MLB app..."
    if sdb shell "app_launcher -s ${APP_PACKAGE}" 2>/dev/null; then
        log_success "MLB app launched successfully"
        sleep 5  # Wait for app to initialize
        return 0
    else
        log_error "Failed to launch MLB app"
        return 1
    fi
}

# Function to verify app is running
verify_app_running() {
    log_info "🔍 Verifying MLB app is running..."
    
    if sdb shell "ps aux | grep -v grep | grep ${APP_PACKAGE}" > /dev/null 2>&1; then
        log_success "MLB app is running"
        return 0
    else
        log_warning "MLB app is not running"
        return 1
    fi
}

# Function to check TV network connectivity
check_tv_connectivity() {
    log_info "🌐 Checking TV network connectivity..."
    
    if ping -c 3 -W 5 ${TV_IP} > /dev/null 2>&1; then
        log_success "TV is reachable at ${TV_IP}"
        return 0
    else
        log_error "TV is not reachable at ${TV_IP}"
        return 1
    fi
}

# Function to perform complete recovery with retries
perform_recovery() {
    local attempt=1
    
    while [ $attempt -le $MAX_RETRIES ]; do
        log_info "🔄 Recovery attempt $attempt of $MAX_RETRIES"
        
        # Step 1: Check TV connectivity
        if ! check_tv_connectivity; then
            log_error "TV not reachable, cannot proceed with recovery"
            if [ $attempt -eq $MAX_RETRIES ]; then
                return 1
            fi
            log_info "Waiting ${RETRY_DELAY} seconds before retry..."
            sleep $RETRY_DELAY
            ((attempt++))
            continue
        fi
        
        # Step 2: Kill existing processes
        kill_existing_processes
        
        # Step 3: Reset SDB connection
        if ! reset_sdb_connection; then
            log_error "SDB connection failed on attempt $attempt"
            if [ $attempt -eq $MAX_RETRIES ]; then
                return 1
            fi
            log_info "Waiting ${RETRY_DELAY} seconds before retry..."
            sleep $RETRY_DELAY
            ((attempt++))
            continue
        fi
        
        # Step 4: Verify SDB connection
        if ! verify_sdb_connection; then
            log_error "SDB verification failed on attempt $attempt"
            if [ $attempt -eq $MAX_RETRIES ]; then
                return 1
            fi
            log_info "Waiting ${RETRY_DELAY} seconds before retry..."
            sleep $RETRY_DELAY
            ((attempt++))
            continue
        fi
        
        # Step 5: Launch MLB app
        if ! launch_mlb_app; then
            log_error "App launch failed on attempt $attempt"
            if [ $attempt -eq $MAX_RETRIES ]; then
                return 1
            fi
            log_info "Waiting ${RETRY_DELAY} seconds before retry..."
            sleep $RETRY_DELAY
            ((attempt++))
            continue
        fi
        
        # Step 6: Verify app is running
        if ! verify_app_running; then
            log_error "App verification failed on attempt $attempt"
            if [ $attempt -eq $MAX_RETRIES ]; then
                return 1
            fi
            log_info "Waiting ${RETRY_DELAY} seconds before retry..."
            sleep $RETRY_DELAY
            ((attempt++))
            continue
        fi
        
        # If we get here, everything succeeded
        log_success "🎉 Complete recovery successful on attempt $attempt!"
        return 0
    done
    
    log_error "❌ Recovery failed after $MAX_RETRIES attempts"
    return 1
}

# Function to show usage
show_usage() {
    echo "Usage: $0 [OPTIONS]"
    echo ""
    echo "Samsung TV Connection Recovery Script"
    echo ""
    echo "Options:"
    echo "  --quick, -q     Quick recovery (kill processes + reset SDB only)"
    echo "  --full, -f      Full recovery (default: kill processes + reset SDB + launch app)"
    echo "  --check, -c     Check current connection status only"
    echo "  --help, -h      Show this help message"
    echo ""
    echo "Examples:"
    echo "  $0              # Full recovery"
    echo "  $0 --quick      # Quick recovery without app launch"
    echo "  $0 --check      # Check connection status"
}

# Function to check current status
check_status() {
    log_info "📊 Checking current connection status..."
    
    echo ""
    log_info "🌐 Network Connectivity:"
    if check_tv_connectivity; then
        echo "  ✅ TV is reachable"
    else
        echo "  ❌ TV is not reachable"
    fi
    
    echo ""
    log_info "🔗 SDB Connection:"
    if verify_sdb_connection; then
        echo "  ✅ SDB is connected"
    else
        echo "  ❌ SDB is not connected"
    fi
    
    echo ""
    log_info "📱 MLB App Status:"
    if verify_app_running; then
        echo "  ✅ MLB app is running"
    else
        echo "  ❌ MLB app is not running"
    fi
    
    echo ""
    log_info "🔧 Process Status:"
    if pgrep -f "appium" > /dev/null; then
        echo "  ⚠️  Appium processes found: $(pgrep -f "appium" | wc -l)"
    else
        echo "  ✅ No Appium processes"
    fi
    
    if pgrep -f "chromedriver" > /dev/null; then
        echo "  ⚠️  ChromeDriver processes found: $(pgrep -f "chromedriver" | wc -l)"
    else
        echo "  ✅ No ChromeDriver processes"
    fi
}

# Main execution
main() {
    echo "🚀 Samsung TV Connection Recovery Script"
    echo "========================================"
    
    case "${1:-}" in
        --quick|-q)
            log_info "🔄 Performing quick recovery..."
            kill_existing_processes
            if reset_sdb_connection && verify_sdb_connection; then
                log_success "✅ Quick recovery completed successfully!"
                exit 0
            else
                log_error "❌ Quick recovery failed!"
                exit 1
            fi
            ;;
        --check|-c)
            check_status
            exit 0
            ;;
        --help|-h)
            show_usage
            exit 0
            ;;
        --full|-f|"")
            log_info "🔄 Performing full recovery..."
            if perform_recovery; then
                log_success "✅ Full recovery completed successfully!"
                check_status
                exit 0
            else
                log_error "❌ Full recovery failed!"
                exit 1
            fi
            ;;
        *)
            log_error "Unknown option: $1"
            show_usage
            exit 1
            ;;
    esac
}

# Run main function with all arguments
main "$@"
