# Test Execution Improvements

## ✅ Changes Made

### 1. Pre-Test Cleanup (NEW!)

Before each test run, the script now:
- **Kills the Samsung TV app** (`was_kill $APP_PACKAGE`) to ensure clean state
- **Resets SDB connection** (disconnect, kill-server, start-server)
- Waits for everything to stabilize before starting the test

This prevents issues where the app is in a bad state from a previous test.

### 2. Retry Control with RETRY Flag (NEW!)

**Default Behavior: NO RETRIES**
- Tests run once by default
- Cleaner output, faster feedback

**Enable Retries:**
```bash
# Run with retry enabled (up to 3 attempts)
RETRY=Y ./run test @devEnvironmentSelection

# Or use lowercase
RETRY=y ./run test @loginTest

# Or use 'yes'
RETRY=yes ./run test @svodVideoPlaybackTest
```

**Benefits:**
- ✅ Faster test execution by default (no unnecessary retries)
- ✅ Cleaner logs when tests pass on first attempt
- ✅ Option to enable retries for flaky tests or CI/CD pipelines
- ✅ Clear messaging about retry mode status

### 3. devEnvironmentSelection Test Fixed

**Old Scenario (BROKEN):**
```gherkin
Scenario: User bypasses onboarding and reaches home page
  When I click Get Started button
  And I skip onboarding screens
  And I click Explore Free Content button  # ❌ Button doesn't exist
  Then I should see home page             # ❌ Never reached
```

**New Scenario (WORKING):**
```gherkin
Scenario: User logs in and reaches home page
  Given I am in onboarding page
  When I click Have Mlb account
  And I login successfully to the mlb app
  Then I should see home page             # ✅ Uses proven login flow

Scenario: Switch to dev environment from settings
  Given I am on the home page
  When I switch to dev environment from dev settings
  Then I should see dev environment settings updated
```

**Key Changes:**
- ✅ Uses the working login flow instead of trying to bypass onboarding
- ✅ Simplified dev environment switching scenario
- ✅ Added proper verification step
- ✅ Fixed "Explore Free Content" step to handle Cancel button on Create Account screen

## 📋 Usage Examples

### Run test without retries (default):
```bash
./run test @devEnvironmentSelection
```

### Run test with retries:
```bash
RETRY=Y ./run test @devEnvironmentSelection
```

### Run test with retries in CI/CD:
```bash
export RETRY=Y
./run test @samsungSmoke
```

### Multiple tests with retry:
```bash
RETRY=Y ./run-by-tag.sh @samsungSmoke
```

## 🎯 When to Use Retries

**Use RETRY=Y when:**
- ✅ Running in CI/CD pipelines (network issues, timing issues)
- ✅ Testing on unreliable networks
- ✅ Running known flaky tests
- ✅ Long test suites where you want resilience

**Don't use RETRY=Y when:**
- ❌ Developing/debugging tests (you want to see failures immediately)
- ❌ Running quick smoke tests
- ❌ Tests are reliable and fast

## 🔧 Pre-Test Cleanup Details

The cleanup happens automatically before every test and includes:

1. **App Termination:**
   ```bash
   $SDB_PATH shell 0 was_kill $APP_PACKAGE
   ```

2. **SDB Reset:**
   ```bash
   $SDB_PATH disconnect $TV_IP:$TV_PORT
   $SDB_PATH kill-server
   $SDB_PATH start-server
   ```

3. **Wait Times:**
   - 2 seconds after app kill
   - 1 second after kill-server
   - 2 seconds after start-server

This ensures every test starts with a clean slate.

## 📊 Log Output Improvements

**Without Retries:**
```
[INFO] Retry mode disabled: Tests will run once
[INFO] 🚀 Running test...
[SUCCESS] ✅ Test completed successfully!
```

**With Retries:**
```
[INFO] Retry mode enabled: Tests will retry up to 3 times on failure
[INFO] 🚀 Test attempt 1 of 3
[WARNING] ❌ Test failed on attempt 1, will retry...
[WARNING] 🔄 Retry attempt 2 of 3
[SUCCESS] ✅ Test completed successfully on attempt 2!
```

## 🚀 Summary

These improvements make the test suite:
1. **More Reliable** - Clean state before each test
2. **Faster** - No retries by default
3. **Flexible** - Easy to enable retries when needed
4. **Clearer** - Better log messages and feedback
5. **More Maintainable** - Fixed broken test scenarios

