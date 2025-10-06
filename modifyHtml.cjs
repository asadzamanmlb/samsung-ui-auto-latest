const fs = require('fs');
const path = require('path');

const htmlPath = path.join(__dirname, 'reports', 'timeline-html', 'index.html');

console.log('🔧 Modifying HTML report to expand scenarios...');

if (!fs.existsSync(htmlPath)) {
  console.error('❌ HTML report not found:', htmlPath);
  process.exit(1);
}

try {
  let htmlContent = fs.readFileSync(htmlPath, 'utf8');
  
  // Expand all collapsed scenarios by default
  // Look for collapse classes and replace with expanded state
  htmlContent = htmlContent.replace(/class="collapse"/g, 'class="collapse show"');
  htmlContent = htmlContent.replace(/aria-expanded="false"/g, 'aria-expanded="true"');
  
  // Add custom CSS to ensure scenarios are visible
  const customCSS = `
    <style>
      .collapse.show {
        display: block !important;
      }
      .scenario-container {
        margin-bottom: 20px;
      }
      .scenario-heading {
        cursor: pointer;
      }
    </style>
  `;
  
  // Insert custom CSS before closing </head> tag
  htmlContent = htmlContent.replace('</head>', `${customCSS}</head>`);
  
  // Write modified content back to file
  fs.writeFileSync(htmlPath, htmlContent, 'utf8');
  
  console.log('✅ HTML report modified successfully!');
} catch (error) {
  console.error('❌ Failed to modify HTML report:', error.message);
  process.exit(1);
}