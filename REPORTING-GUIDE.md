# Samsung TV Test Reporting Guide

## Overview

This project uses a comprehensive Cucumber-based reporting system that generates multiple report formats:

1. **HTML Nice Report** - Interactive timeline-based report with screenshots
2. **Cucumber HTML Report** - Bootstrap-themed report with detailed scenario information
3. **PDF Report** - Printable version of the HTML report
4. **JSON Reports** - Raw test data for further processing
5. **Terminal Logs** - Complete console output saved to `terminal.txt`

## Report Generation

Reports are automatically generated after each test run. The reporting system is configured in `wdio.conf.js`.

### Report Locations

```
reports/
├── json/                          # Raw JSON test data
│   └── feature-name_timestamp.json
├── timeline-html/
│   ├── index.html                 # Main Cucumber HTML report
│   ├── report.pdf                 # PDF version of the report
│   └── temp/                      # HTML Nice Reporter files
│       ├── index.html
│       └── Master.html
└── terminal.txt                   # Complete console logs
```

## Running Tests with Reports

### Basic Test Run

```bash
./run test @loginTest
```

Reports will be automatically generated in the `./reports/` directory.

### Run with Slack Notification

```bash
SLACK=Y ./run test @samsungSmoke
```

This will send a Slack notification with test results after completion.

### View Reports

After test execution:

```bash
# Open HTML report in browser
open reports/timeline-html/index.html

# View PDF report
open reports/timeline-html/report.pdf

# Check terminal logs
cat terminal.txt
```

## Report Features

### HTML Nice Report

- **Timeline View**: Visual timeline of test execution
- **Screenshots**: Automatic screenshots on failures
- **Step Details**: Detailed Cucumber step information
- **Retry Information**: Shows which tests were retried
- **Collapsible Sections**: Expand/collapse test suites and scenarios

### Cucumber HTML Report

- **Bootstrap Theme**: Clean, modern UI
- **Metadata**: Test environment, device, platform info
- **Scenario Timestamps**: Exact execution times
- **Pass/Fail Summary**: Quick overview of test results
- **Expandable Scenarios**: All scenarios expanded by default

### PDF Report

- **Printable Format**: A4 size with proper margins
- **Complete Information**: All test details included
- **Shareable**: Easy to email or attach to tickets

## Report Configuration

### Metadata

The following metadata is included in all reports:

```javascript
{
  "Test Environment": "STG",
  "Device": "Samsung TV (Tizen)",
  "Platform": "TizenTV",
  "Test Run": "Oct 06 2025 at 11:30:45 AM",
  "OS": "darwin"
}
```

### Customizing Reports

Edit `wdio.conf.js` to customize report settings:

```javascript
// Change report title
reportTitle: `Samsung TV Automation Test Report - ${timestamp}`

// Change report theme
theme: "bootstrap" // or "hierarchy", "foundation", "simple"

// Enable/disable features
includeScreenshots: true,
scenarioTimestamp: true,
failedSummaryReport: false,
```

## Report Scripts

### reportCleanUp.js

Removes duplicate JSON files, keeping only the latest version of each feature.

```bash
node reportCleanUp.js
```

### modifyHtml.cjs

Expands all collapsed scenarios in the HTML report for better visibility.

```bash
node modifyHtml.cjs
```

### saveHtml.js

Removes pie charts and other visual elements from the HTML report.

```bash
node saveHtml.js ./reports/timeline-html/index.html
```

### make-playwrightpdf/make-playwrightpdf.js

Generates a PDF version of the HTML report using Playwright.

```bash
node make-playwrightpdf/make-playwrightpdf.js
```

## Slack Notifications

To enable Slack notifications, set the `SLACK` environment variable:

```bash
export SLACK=Y
```

Configure Slack webhook in `slackNotification.js`.

## Troubleshooting

### Reports Not Generated

1. Check that all dependencies are installed:
   ```bash
   npm install
   ```

2. Verify the `reports/` directory exists and is writable

3. Check `terminal.txt` for error messages

### Missing Screenshots

Screenshots are only captured on test failures. To enable screenshots for all steps:

```javascript
// In wdio.conf.js
afterStep: async function (step, scenario, result, context) {
  await browser.takeScreenshot();
}
```

### PDF Generation Fails

Ensure Playwright is properly installed:

```bash
npm install playwright
npx playwright install chromium
```

### JSON Files Not Cleaned Up

Run the cleanup script manually:

```bash
node reportCleanUp.js
```

## CI/CD Integration

### Jenkins

```groovy
stage('Run Tests') {
    steps {
        sh './run test @samsungSmoke'
    }
}

stage('Publish Reports') {
    steps {
        publishHTML([
            allowMissing: false,
            alwaysLinkToLastBuild: true,
            keepAll: true,
            reportDir: 'reports/timeline-html',
            reportFiles: 'index.html',
            reportName: 'Samsung TV Test Report'
        ])
    }
}
```

### GitHub Actions

```yaml
- name: Run Tests
  run: ./run test @samsungSmoke

- name: Upload Test Reports
  uses: actions/upload-artifact@v3
  if: always()
  with:
    name: test-reports
    path: reports/
```

## Best Practices

1. **Always review reports** after test runs to identify failures
2. **Archive reports** for historical tracking
3. **Share PDF reports** with stakeholders who don't need interactive features
4. **Use terminal.txt** for debugging test execution issues
5. **Clean up old reports** regularly to save disk space

## Report Retention

By default, reports are cleaned before each test run. To preserve reports:

```javascript
// In wdio.conf.js, comment out the cleanup:
// await rimraf(reportsDir);
```

Or manually backup reports before running new tests:

```bash
cp -r reports/ reports-backup-$(date +%Y%m%d-%H%M%S)/
```

## Support

For issues with reporting:
1. Check `terminal.txt` for error messages
2. Verify all npm packages are installed
3. Ensure Node.js version is 22.11.0 or higher
4. Review the `wdio.conf.js` configuration

## Additional Resources

- [WebdriverIO Reporters](https://webdriver.io/docs/reporters)
- [Cucumber HTML Reporter](https://www.npmjs.com/package/cucumber-html-reporter)
- [WDIO HTML Nice Reporter](https://www.npmjs.com/package/wdio-html-nice-reporter)
- [Playwright PDF Generation](https://playwright.dev/docs/api/class-page#page-pdf)
