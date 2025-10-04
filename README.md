# MLB Samsung TV Automation

An automated testing framework for MLB app on Samsung Smart TV using Appium with Tizen Driver and Node.js JavaScript.

## 🚀 Overview

This project provides automated testing capabilities for the MLB application running on Samsung Tizen-based Smart TVs. It utilizes Appium's Tizen driver to interact with TV applications and perform various testing scenarios including navigation, content playback, and user interface validation.

## 📋 Prerequisites

### Hardware Requirements

- Samsung Smart TV (Tizen OS 4.0 or higher)
- Development machine (Windows, macOS, or Linux)
- USB cable for TV connection
- Remote control or compatible input device

### Software Requirements

- **Node.js** (v16.0 or higher)
- **npm** (v8.0 or higher)
- **Java** (JDK 8 or higher)
- **Android SDK** (for Appium dependencies)
- **Samsung Tizen Studio** (for TV app development and debugging)
- **Appium** (v2.0 or higher)
- **Appium Tizen Driver**

## 🛠️ Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/mlb-samsung-tv-automation.git
cd mlb-samsung-tv-automation
```

### 2. Install Node.js Dependencies

```bash
npm install
```

### 3. Install Appium and Tizen Driver

```bash
# Install Appium globally
npm install -g appium

# Install Tizen driver
appium driver install tizen

# Verify installation
appium driver list
```

### 4. Install Samsung Tizen Studio

1. Download from [Samsung Developer Portal](https://developer.samsung.com/tizen)
2. Install Tizen Studio
3. Configure SDK path and tools

### 5. Set Environment Variables

Create a `.env` file in the project root:

```bash
# Tizen Studio paths
TIZEN_HOME=/path/to/tizen-studio
SDB_PATH=/path/to/tizen-studio/tools/sdb

# TV Configuration
TV_IP=192.168.1.100
TV_PORT=26101

# Test Configuration
TEST_TIMEOUT=30000
IMPLICIT_WAIT=5000
```

## 📁 Project Structure

```ini
mlb-samsung-tv-automation/
├── config/
│   ├── capabilities.js          # Appium capabilities configuration
│   └── test-config.js           # Test environment settings
├── src/
│   ├── pages/                   # Page Object Model classes
│   │   ├── HomePage.js
│   │   ├── LoginPage.js
│   │   ├── VideoPlayerPage.js
│   │   └── NavigationPage.js
│   ├── utils/                   # Utility functions
│   │   ├── driver-helper.js
│   │   ├── tv-remote.js
│   │   └── assertions.js
│   └── constants/
│       └── selectors.js         # UI element selectors
├── tests/
│   ├── smoke/                   # Smoke tests
│   ├── regression/              # Regression test suite
│   ├── performance/             # Performance tests
│   └── integration/             # Integration tests
├── reports/                     # Test execution reports (screenshots disabled for Samsung TV)
├── package.json
├── .env.example
├── appium.config.js
└── README.md
```

## ⚙️ Configuration

### Appium Capabilities

Configure your TV connection in `config/capabilities.js`:

```javascript
const capabilities = {
  platformName: "Tizen",
  platformVersion: "6.0",
  deviceName: "Samsung Smart TV",
  app: "/path/to/mlb.wgt",
  udid: "YOUR_TV_DEVICE_ID",
  automationName: "Tizen",
  newCommandTimeout: 300,
  noReset: true,
  fullReset: false,
};
```

### TV Setup

1. Enable Developer Mode on Samsung TV:

   - Go to Apps → Settings → Developer Mode → ON
   - Enter your development PC's IP address

2. Connect TV via USB or network
3. Install MLB app on TV (if not already installed)

## 🏃‍♂️ Running Tests

### Start Appium Server

```bash
# Start Appium server
appium server --port 4723

# Or with specific configuration
appium server --config appium.config.js
```

### Execute Test Suites

```bash
# Run all tests
npm test

# Run smoke tests
npm run test:smoke

# Run regression tests
npm run test:regression

# Run specific test file
npm run test -- tests/smoke/login.test.js

# Run tests with custom parameters
npm run test -- --timeout 60000 --reporter spec
```

### Debug Mode

```bash
# Run tests in debug mode with verbose logging
npm run test:debug

# Run with Appium logs
DEBUG=1 npm test
```

## 🧪 Test Scenarios

### Included Test Cases

#### Authentication & Login

- Login with valid credentials
- Login with invalid credentials
- Logout functionality
- Session persistence

#### Navigation & UI

- Main menu navigation
- Content browsing
- Search functionality
- Settings navigation
- Remote control interactions

#### Video Playback

- Live game streaming
- VOD content playback
- Video controls (play, pause, seek)
- Audio/video quality settings
- Closed captions

#### Performance

- App launch time
- Content loading performance
- Memory usage monitoring
- Network connectivity tests

## 📝 Writing Tests

### Example Test Structure

```javascript
const { expect } = require("chai");
const HomePage = require("../src/pages/HomePage");
const VideoPlayerPage = require("../src/pages/VideoPlayerPage");

describe("MLB Video Playback Tests", () => {
  let homePage, videoPlayerPage;

  before(async () => {
    homePage = new HomePage(driver);
    videoPlayerPage = new VideoPlayerPage(driver);
  });

  it("should play live game successfully", async () => {
    await homePage.navigateToLiveGames();
    await homePage.selectFirstGame();
    await videoPlayerPage.waitForVideoToLoad();

    const isPlaying = await videoPlayerPage.isVideoPlaying();
    expect(isPlaying).to.be.true;
  });
});
```

### Page Object Model Example

```javascript
class HomePage {
  constructor(driver) {
    this.driver = driver;
  }

  get liveGamesButton() {
    return this.driver.$('//button[@text="Live Games"]');
  }

  async navigateToLiveGames() {
    await this.liveGamesButton.click();
    await this.driver.pause(2000);
  }
}
```

## 📊 Reporting

### Test Reports

- HTML reports generated in `reports/` directory
- Page source captured on test failures (screenshots disabled for Samsung TV compatibility)
- Video recordings for failed tests (optional)
- Performance metrics and timing data

### Viewing Reports

```bash
# Open latest HTML report
npm run report:open

# Generate custom report
npm run report:generate
```

## 🔧 Troubleshooting

### Common Issues

#### TV Connection Problems

```bash
# Check TV connectivity
sdb devices

# Connect to TV
sdb connect YOUR_TV_IP:26101

# Install app manually
sdb -s YOUR_TV_IP:26101 install mlb.wgt
```

#### Appium Driver Issues

```bash
# Reinstall Tizen driver
appium driver uninstall tizen
appium driver install tizen

# Check driver status
appium driver list --installed
```

#### Element Not Found

- Verify selectors in `src/constants/selectors.js`
- Use Appium Inspector for element identification
- Check for timing issues with explicit waits

### Debug Tools

- **Appium Inspector**: Visual element inspection
- **Tizen Studio**: TV app debugging
- **Chrome DevTools**: Remote debugging (if supported)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Code Standards

- Follow ESLint configuration
- Use Page Object Model pattern
- Write descriptive test names
- Include appropriate assertions
- Add comments for complex logic

## 🆘 Support

- **Documentation**: [Samsung Tizen Docs](https://docs.tizen.org/)
- **Appium Tizen**: [Appium Tizen Driver](https://github.com/Samsung/appium-tizen-driver)
- **Issues**: Create an issue in this repository
- **Discussions**: Use GitHub Discussions for questions

## 📚 Additional Resources

- [Appium Documentation](https://appium.io/docs/en/2.0/)
- [Samsung Smart TV Development](https://developer.samsung.com/smarttv)
- [Tizen Web Application](https://docs.tizen.org/application/web/)
- [WebDriver Protocol](https://w3c.github.io/webdriver/)

---

**Happy Testing! ⚾📺**
