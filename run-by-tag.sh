#!/bin/bash

# Script to run Samsung TV tests by Cucumber tag
# Usage: ./run-by-tag.sh @samsungSmoke

set -e

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

# Setup Node.js version using nvm
setup_node_version() {
    # Load nvm if available
    export NVM_DIR="$HOME/.nvm"
    if [ -s "$NVM_DIR/nvm.sh" ]; then
        source "$NVM_DIR/nvm.sh"
        
        # Use Node.js 22.11.0 (required for this project)
        if nvm use 22.11.0 >/dev/null 2>&1; then
            log_info "Using Node.js $(node --version)"
        else
            log_warning "Node.js 22.11.0 not found, installing..."
            nvm install 22.11.0
            nvm use 22.11.0
            log_success "Node.js 22.11.0 installed and activated"
        fi
    else
        log_warning "nvm not found, using system Node.js $(node --version)"
        # Check if Node.js version is compatible
        NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
        if [ "$NODE_VERSION" -lt 18 ]; then
            log_error "Node.js version must be >= 18.8.0"
            exit 1
        fi
    fi
}

# Load configuration
load_config() {
    local config_file="./.samsung-tv.conf"
    
    if [ -f "$config_file" ]; then
        log_info "Loading configuration from $config_file"
        source "$config_file"
    else
        log_error "Configuration file not found: $config_file"
        exit 1
    fi
}

# Setup environment variables
setup_environment() {
    log_info "Setting up environment variables..."
    
    # Export Samsung TV configuration
    export SAMSUNG_TV_IP="${TV_IP}"
    export SAMSUNG_TV_PORT="${TV_PORT}"
    export SAMSUNG_APP_PACKAGE="${APP_PACKAGE}"
    export TEST_APPIUM_TIZEN_RC_TOKEN="${RC_TOKEN}"
    export TEST_APPIUM_TIZEN_CHROMEDRIVER="${CHROMEDRIVER_PATH}"
    
    log_success "Environment variables set"
    log_info "RC_TOKEN: ${RC_TOKEN}"
    log_info "CHROMEDRIVER: ${CHROMEDRIVER_PATH}"
}

# Check TV connection
check_tv_connection() {
    log_info "Checking Samsung TV connection at ${TV_IP}:${TV_PORT}..."
    
    # Check if TV is reachable
    if nc -z -w 5 "${TV_IP}" "${TV_PORT}" 2>/dev/null; then
        log_success "Samsung TV is reachable at ${TV_IP}"
    else
        log_warning "Samsung TV may not be reachable at ${TV_IP}:${TV_PORT}"
        log_info "Attempting connection recovery..."
        
        if [ -f "./reset-connection.sh" ]; then
            ./reset-connection.sh --quick
        fi
    fi
}

# Run tests by tag with retry logic
run_tests_by_tag() {
    local tag="$1"
    local max_retries=3
    local retry_count=0
    
    if [ -z "$tag" ]; then
        log_error "Tag is required"
        log_info "Usage: $0 @tagName"
        log_info "Example: $0 @samsungSmoke"
        exit 1
    fi
    
    log_info "Running tests with tag: $tag"
    log_info "Max retries: $max_retries"
    echo ""
    
    # Run tests with retry logic
    while [ $retry_count -lt $max_retries ]; do
        retry_count=$((retry_count + 1))
        
        if [ $retry_count -eq 1 ]; then
            log_info "🚀 Test attempt $retry_count of $max_retries"
        else
            log_warning "🔄 Retry attempt $retry_count of $max_retries"
            log_info "Performing connection recovery before retry..."
            
            # Quick connection recovery
            if [ -f "./reset-connection.sh" ]; then
                ./reset-connection.sh --quick > /dev/null 2>&1 || true
            fi
            sleep 3
        fi
        
        echo ""
        
        # Run WebDriverIO with tag expression
        if npm run wdio -- --cucumberOpts.tagExpression="$tag"; then
            log_success "✅ Tests completed successfully on attempt $retry_count!"
            return 0
        else
            if [ $retry_count -lt $max_retries ]; then
                log_warning "❌ Tests failed on attempt $retry_count, will retry..."
                sleep 5
            else
                log_error "❌ Tests failed after $max_retries attempts!"
                return 1
            fi
        fi
    done
    
    exit 1
}

# Cleanup function
cleanup() {
    log_info "Cleaning up..."
    
    # Use the advanced recovery script for cleanup if available
    if [ -f "./reset-connection.sh" ]; then
        log_info "Using advanced cleanup with reset-connection.sh..."
        ./reset-connection.sh --quick > /dev/null 2>&1 || true
    fi
    
    log_info "Cleanup completed"
}

# Main execution
main() {
    local tag="$1"
    
    # Setup Node.js version first
    setup_node_version
    
    # Load configuration
    load_config
    
    log_info "🚀 Starting Samsung TV Test Runner (Tag Mode)..."
    log_info "================================================"
    
    # Check TV connection
    check_tv_connection
    
    # Setup environment
    setup_environment
    
    log_info "================================================"
    echo ""
    
    # Run tests by tag
    run_tests_by_tag "$tag"
    
    # Cleanup
    cleanup
}

# Trap exit to ensure cleanup
trap cleanup EXIT

# Run main function
main "$@"
