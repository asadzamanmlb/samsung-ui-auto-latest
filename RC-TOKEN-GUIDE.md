# RC Token Guide for Samsung TV Testing

## What is an RC Token?

The RC (Remote Control) Token is an 8-digit security code that allows remote control of your Samsung TV through development tools like Appium and SDB (Smart Development Bridge).

## Do You Need to Change It?

**NO** - The RC token is **static and persistent**. You typically set it once and it remains the same.

### Your Current RC Token
```
RC_TOKEN="14813311"
```

This token is **final** and will continue to work unless:

## When RC Token Changes (Rare Cases)

The RC token only changes if:

1. **Developer Mode is Reset** - If you turn OFF and ON Developer Mode on the TV
2. **Factory Reset** - If you factory reset your Samsung TV
3. **Manual Change** - If you manually change it in TV Developer Settings
4. **TV Replacement** - If you switch to a different Samsung TV

## How to Check RC Token (If Needed)

If you ever need to verify or get the RC token from your TV:

### On Samsung TV:
1. Press **Home** on your remote
2. Navigate to **Apps**
3. Type **12345** on the remote (this enters Developer Mode)
4. Turn **ON** Developer Mode
5. The **RC Token** will be displayed on screen (8-digit number)

### Using the Script:
```bash
# Check if your current RC token is working
./get-rc-token.sh
```

This script will:
- Verify TV connectivity
- Test SDB connection with current RC token
- Show your current RC token configuration
- Guide you if there are any issues

## Automatic RC Token Verification

### Before Running Tests (Optional)

If you want to verify the RC token before each test run:

```bash
# Check RC token first, then run test
./get-rc-token.sh && ./run test @loginTest
```

### In CI/CD Pipeline

Add to your CI/CD script:
```bash
#!/bin/bash
# Verify RC token before running tests
./get-rc-token.sh || {
    echo "RC Token verification failed"
    echo "Please check TV connection and RC token"
    exit 1
}

# Run tests
./run test @loginTest
```

## Configuration

Your RC token is stored in `.samsung-tv.conf`:

```bash
RC_TOKEN="14813311"
```

### To Update RC Token:

**Method 1: Edit Config File**
```bash
nano .samsung-tv.conf
# Change RC_TOKEN="14813311" to your new token
```

**Method 2: Using sed**
```bash
sed -i '' 's/RC_TOKEN=".*"/RC_TOKEN="YOUR_NEW_TOKEN"/' .samsung-tv.conf
```

**Method 3: Environment Variable (Temporary)**
```bash
export SAMSUNG_TV_RC_TOKEN="YOUR_NEW_TOKEN"
./run test @loginTest
```

## Troubleshooting

### Issue: "SDB connection failed"
**Solution:** 
1. Run `./get-rc-token.sh` to verify RC token
2. Check if Developer Mode is enabled on TV
3. Verify RC token matches between TV and config file

### Issue: "Unable to connect to TV"
**Solution:**
1. Ensure TV is powered on
2. Check TV is on same network
3. Verify TV_IP in config is correct
4. Run `./run status` to check connection

### Issue: "RC Token might be incorrect"
**Solution:**
1. Check RC token on TV (see steps above)
2. Update `.samsung-tv.conf` with correct token
3. Run `./get-rc-token.sh` to verify

## Best Practices

1. **Set Once, Use Forever** - RC token rarely changes, no need to check constantly
2. **Document Your Token** - Keep a backup of your RC token in secure location
3. **Use Environment Variables in CI/CD** - Don't commit RC tokens to version control
4. **Verify After TV Changes** - Only check RC token after TV resets or Developer Mode changes

## Summary

✅ **Your current RC token (14813311) is final and will work consistently**

✅ **No need to check or change it before each test**

✅ **Only verify if you experience connection issues**

✅ **Use `./get-rc-token.sh` if you ever need to troubleshoot**

## Quick Commands

```bash
# Check RC token status
./get-rc-token.sh

# Run test with current RC token
./run test @loginTest

# Check overall system status
./run status

# Verify and run test (optional)
./get-rc-token.sh && ./run test @loginTest
```


