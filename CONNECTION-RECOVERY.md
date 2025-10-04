# Samsung TV Connection Recovery Guide

This project now includes comprehensive connection recovery functionality to handle Samsung TV automation issues programmatically.

## 🚀 Quick Start

### Using the Main Script

```bash
# Check connection status
./run recover check

# Quick recovery (recommended for most issues)
./run recover quick

# Full recovery (includes app launch)
./run recover full

# Simple reset command
./run reset
```

### Using the Dedicated Recovery Script

```bash
# Check current status
./reset-connection.sh --check

# Quick recovery
./reset-connection.sh --quick

# Full recovery
./reset-connection.sh --full
```

## 📋 Recovery Options

### 1. **Check Status** (`--check` / `check`)

- ✅ Verifies TV network connectivity
- ✅ Checks SDB connection status
- ✅ Verifies MLB app status
- ✅ Shows running processes
- ⚡ **Use when**: You want to diagnose current issues

### 2. **Quick Recovery** (`--quick` / `quick`)

- 🔪 Kills Appium and ChromeDriver processes
- 🔄 Resets SDB connection
- 🔗 Reconnects to Samsung TV
- ⚡ **Use when**: Tests are failing due to connection issues
- ⏱️ **Duration**: ~10 seconds

### 3. **Full Recovery** (`--full` / `full`)

- 🔪 Kills all processes
- 🔄 Resets SDB connection
- 🔗 Reconnects to Samsung TV
- 📱 Launches MLB app
- ✅ Verifies app is running
- ⚡ **Use when**: Complete system reset needed
- ⏱️ **Duration**: ~30-60 seconds

## 🛠️ Integration Features

### Automatic Recovery

The recovery functionality is automatically integrated into the test runner:

- **Connection Check**: Automatically runs quick recovery if SDB connection fails
- **Cleanup**: Uses advanced cleanup during test completion
- **Error Handling**: Graceful fallback to basic recovery if script unavailable

### Error Scenarios Handled

1. **WebDriver Timeout Errors**

   ```bash
   ./run recover quick
   ```

2. **SDB Connection Lost**

   ```bash
   ./run recover quick
   ```

3. **Chrome Not Reachable**

   ```bash
   ./run recover full
   ```

4. **Hanging Processes**
   ```bash
   ./run reset
   ```

## 🔧 Technical Details

### Process Management

- Kills `appium`, `chromedriver`, and `webdriver` processes
- Graceful termination with fallback to force kill
- Waits for complete process cleanup

### SDB Connection Management

- Disconnects existing connections
- Kills and restarts SDB server
- Establishes fresh connection to TV
- Verifies connection status

### App Management

- Stops existing MLB app instances
- Launches fresh app instance
- Verifies app is running correctly

### Retry Logic

- Up to 3 retry attempts for full recovery
- 5-second delay between retries
- Comprehensive error reporting

## 📊 Status Indicators

### Network Connectivity

- ✅ TV is reachable
- ❌ TV is not reachable

### SDB Connection

- ✅ SDB is connected
- ❌ SDB is not connected

### MLB App Status

- ✅ MLB app is running
- ❌ MLB app is not running

### Process Status

- ✅ No hanging processes
- ⚠️ Processes found (with count)

## 🚨 Troubleshooting

### Common Issues

1. **TV Not Reachable**

   - Check TV is powered on
   - Verify network connection
   - Confirm IP address in configuration

2. **SDB Connection Fails**

   - Run `./run recover quick`
   - Check Tizen Studio installation
   - Verify SDB path in configuration

3. **App Launch Fails**
   - App may already be running
   - Check app package name
   - Verify TV developer mode is enabled

### Manual Recovery Steps

If automated recovery fails, you can run the manual steps:

```bash
# Kill processes
pkill -f "appium" && pkill -f "chromedriver" && sleep 2

# Reset SDB (using configuration from .samsung-tv.conf)
sdb disconnect ${TV_IP}:${TV_PORT}
sdb kill-server
sdb start-server
sdb connect ${TV_IP}:${TV_PORT}

# Verify connection
sdb devices
```

## 🎯 Best Practices

1. **Use Quick Recovery First**: Start with `./run recover quick` for most issues
2. **Check Status**: Use `./run recover check` to diagnose problems
3. **Full Recovery for Stubborn Issues**: Use `./run recover full` when quick recovery doesn't work
4. **Regular Cleanup**: The system automatically cleans up after tests
5. **Monitor Logs**: Watch for connection warnings during test execution

## 🔄 Integration with Tests

The recovery functionality is seamlessly integrated:

- **Before Tests**: Automatic connection verification
- **During Tests**: Graceful error handling
- **After Tests**: Automatic cleanup
- **On Failure**: Advanced recovery options available

This ensures maximum reliability and minimal manual intervention for Samsung TV automation testing.
