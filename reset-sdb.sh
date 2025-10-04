#!/bin/bash

# SDB Connection Reset Script
# This script resets the SDB connection to the Samsung TV

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

# Validate required configuration
if [ -z "$TV_IP" ]; then
    echo "❌ TV_IP not configured in $CONFIG_FILE"
    echo "Please set TV_IP in the configuration file or run './run discover'"
    exit 1
fi

echo "🔄 Resetting SDB connection to ${TV_IP}:${TV_PORT}..."

# Disconnect from the TV
echo "📱 Disconnecting from TV..."
sdb disconnect ${TV_IP}:${TV_PORT} 2>/dev/null || echo "⚠️ TV was not connected"

# Kill SDB server
echo "🛑 Killing SDB server..."
sdb kill-server

# Start SDB server
echo "🚀 Starting SDB server..."
sdb start-server

# Wait a moment for server to start
sleep 2

# Connect to the TV
echo "📱 Connecting to TV..."
if sdb connect ${TV_IP}:${TV_PORT}; then
    echo "✅ Successfully connected to TV"
else
    echo "❌ Failed to connect to TV"
    exit 1
fi

# Verify connection
echo "🔍 Verifying connection..."
if sdb devices | grep -q "${TV_IP}:${TV_PORT}.*device"; then
    echo "✅ SDB connection verified successfully"
    sdb devices
else
    echo "❌ SDB connection verification failed"
    sdb devices
    exit 1
fi

echo "🎉 SDB connection reset completed!"