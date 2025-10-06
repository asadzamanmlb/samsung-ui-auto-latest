import { chromium } from 'playwright';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const htmlPath = path.join(__dirname, '..', 'reports', 'timeline-html', 'index.html');
const pdfPath = path.join(__dirname, '..', 'reports', 'timeline-html', 'report.pdf');

console.log('📄 Generating PDF from HTML report...');

(async () => {
  if (!fs.existsSync(htmlPath)) {
    console.error('❌ HTML report not found:', htmlPath);
    process.exit(1);
  }

  try {
    const browser = await chromium.launch({
      headless: true,
    });
    
    const page = await browser.newPage();
    
    // Load the HTML file
    await page.goto(`file://${htmlPath}`, {
      waitUntil: 'networkidle',
    });
    
    // Wait a bit for any dynamic content to load
    await page.waitForTimeout(2000);
    
    // Generate PDF
    await page.pdf({
      path: pdfPath,
      format: 'A4',
      printBackground: true,
      margin: {
        top: '20px',
        right: '20px',
        bottom: '20px',
        left: '20px',
      },
    });
    
    await browser.close();
    
    console.log('✅ PDF report generated successfully:', pdfPath);
  } catch (error) {
    console.error('❌ Failed to generate PDF:', error.message);
    process.exit(1);
  }
})();
