#!/bin/bash

# Script to get/verify RC Token from Samsung TV
# This can be run before tests to ensure the RC token is correct

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Load configuration
CONFIG_FILE="$(dirname "$0")/.samsung-tv.conf"
if [ -f "$CONFIG_FILE" ]; then
    source "$CONFIG_FILE"
else
    echo -e "${RED}[ERROR]${NC} Configuration file not found: $CONFIG_FILE"
    exit 1
fi

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

echo "=== Samsung TV RC Token Checker ==="
echo ""

# Check if SDB is available
if [ ! -f "$SDB_PATH" ]; then
    log_error "SDB not found at: $SDB_PATH"
    log_info "Please install Tizen Studio or update SDB_PATH in $CONFIG_FILE"
    exit 1
fi

# Check if TV is connected
log_info "Checking connection to TV at ${TV_IP}:${TV_PORT}..."

if ! ping -c 1 -W 2 $TV_IP > /dev/null 2>&1; then
    log_error "TV is not reachable at $TV_IP"
    log_info "Please ensure:"
    log_info "  1. TV is powered on"
    log_info "  2. TV is connected to the network"
    log_info "  3. TV IP address is correct in $CONFIG_FILE"
    exit 1
fi

log_success "TV is reachable at $TV_IP"

# Try to connect via SDB
log_info "Attempting SDB connection..."

# Disconnect first to ensure clean state
$SDB_PATH disconnect ${TV_IP}:${TV_PORT} 2>/dev/null || true

# Try to connect
if $SDB_PATH connect ${TV_IP}:${TV_PORT} 2>&1 | grep -q "connected"; then
    log_success "SDB connected successfully"
    
    # Check if devices are listed
    if $SDB_PATH devices | grep -q "${TV_IP}:${TV_PORT}"; then
        log_success "TV is listed in SDB devices"
        
        # Display current configuration
        echo ""
        log_info "Current RC Token Configuration:"
        echo "  RC_TOKEN: $RC_TOKEN"
        echo "  TV_IP: $TV_IP"
        echo "  TV_PORT: $TV_PORT"
        echo ""
        
        log_success "RC Token is configured and SDB connection is working!"
        log_info "Your current RC token should work for tests."
        echo ""
        log_info "Note: RC tokens typically don't change unless you:"
        log_info "  - Reset Developer Mode on the TV"
        log_info "  - Factory reset the TV"
        log_info "  - Manually change it in TV Developer Settings"
        
        exit 0
    else
        log_warning "TV connected but not listed in devices"
    fi
else
    log_error "Failed to connect via SDB"
    log_info "This might indicate an RC token issue"
fi

# If we get here, there might be an issue
echo ""
log_warning "Unable to verify RC token automatically via SDB"
log_info "RC tokens cannot be retrieved programmatically from the TV"
echo ""
log_info "To verify/update your RC token:"
log_info "  1. On your Samsung TV remote, press: Home"
log_info "  2. Navigate to: Apps"
log_info "  3. Enter Developer Mode: Type '12345' on the remote"
log_info "  4. Check if Developer Mode is ON"
log_info "  5. Note the RC Token displayed (8-digit number)"
log_info "  6. If different from $RC_TOKEN, update $CONFIG_FILE"
echo ""
log_info "Current RC Token in config: $RC_TOKEN"
echo ""

# Offer to test with current token
read -p "Do you want to test with the current RC token? (y/n): " -n 1 -r
echo
if [[ $REPLY =~ ^[Yy]$ ]]; then
    log_info "Proceeding with current RC token: $RC_TOKEN"
    exit 0
else
    log_info "Please verify RC token on TV and update if needed"
    exit 1
fi


