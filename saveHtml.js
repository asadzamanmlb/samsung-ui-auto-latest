import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get command line arguments
const args = process.argv.slice(2);
const inputPath = args[0] || path.join(__dirname, 'reports', 'timeline-html', 'index.html');
const outputPath = args[1] || inputPath;

console.log('💾 Processing HTML report...');
console.log(`📥 Input: ${inputPath}`);
console.log(`📤 Output: ${outputPath}`);

if (!fs.existsSync(inputPath)) {
  console.error('❌ Input HTML file not found:', inputPath);
  process.exit(1);
}

try {
  let htmlContent = fs.readFileSync(inputPath, 'utf8');
  
  // Remove feature pie chart if it exists
  // This regex looks for common pie chart container patterns
  htmlContent = htmlContent.replace(
    /<div[^>]*class="[^"]*pie-chart[^"]*"[^>]*>[\s\S]*?<\/div>/gi,
    ''
  );
  
  // Remove canvas elements that might be used for charts
  htmlContent = htmlContent.replace(
    /<canvas[^>]*id="[^"]*chart[^"]*"[^>]*>[\s\S]*?<\/canvas>/gi,
    ''
  );
  
  // Remove Chart.js script references if any
  htmlContent = htmlContent.replace(
    /<script[^>]*src="[^"]*chart[^"]*\.js[^"]*"[^>]*><\/script>/gi,
    ''
  );
  
  // Write processed content to output file
  fs.writeFileSync(outputPath, htmlContent, 'utf8');
  
  console.log('✅ HTML report processed successfully!');
} catch (error) {
  console.error('❌ Failed to process HTML report:', error.message);
  process.exit(1);
}