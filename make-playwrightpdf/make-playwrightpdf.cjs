import playwright from 'playwright';
import fs from 'fs';

var html = fs.readFileSync('reports/timeline-html/index.html', 'utf8');

async function generatePDFfromHTML(htmlContent, outputPath) {
    const browser = await playwright.chromium.launch();
    const page = await browser.newPage();
    await page.setContent(htmlContent);
    await page.pdf({ path: outputPath });
    console.log('PDF generated successfully');
    await browser.close();
  }

  generatePDFfromHTML(html, './reports/timeline-html/index.pdf');