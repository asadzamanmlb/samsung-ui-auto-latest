import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const jsonDir = path.join(__dirname, 'reports', 'json');

console.log('🧹 Cleaning up JSON report files...');

// Function to clean up duplicate JSON files
function cleanupDuplicateJsonFiles() {
  if (!fs.existsSync(jsonDir)) {
    console.log('❌ JSON directory does not exist:', jsonDir);
    return;
  }

  const files = fs.readdirSync(jsonDir).filter(file => file.endsWith('.json'));
  
  if (files.length === 0) {
    console.log('ℹ️ No JSON files found to clean up.');
    return;
  }

  console.log(`📁 Found ${files.length} JSON file(s) in ${jsonDir}`);

  const featureGroups = {};

  // Group files by feature name
  files.forEach(file => {
    const featureName = file.split('_')[0];
    if (!featureGroups[featureName]) {
      featureGroups[featureName] = [];
    }
    featureGroups[featureName].push(file);
  });

  // Keep only the latest file for each feature
  Object.keys(featureGroups).forEach(featureName => {
    const group = featureGroups[featureName];
    
    if (group.length > 1) {
      // Sort by timestamp (newest first)
      group.sort().reverse();
      
      // Keep the first (newest) file, delete the rest
      const toKeep = group[0];
      const toDelete = group.slice(1);
      
      console.log(`📌 Keeping: ${toKeep}`);
      
      toDelete.forEach(file => {
        const filePath = path.join(jsonDir, file);
        try {
          fs.unlinkSync(filePath);
          console.log(`🗑️  Deleted: ${file}`);
        } catch (error) {
          console.error(`❌ Failed to delete ${file}:`, error.message);
        }
      });
    } else {
      console.log(`✅ ${featureName}: Only one file, no cleanup needed.`);
    }
  });

  console.log('✅ JSON cleanup completed!');
}

// Run cleanup
try {
  cleanupDuplicateJsonFiles();
} catch (error) {
  console.error('❌ Error during cleanup:', error.message);
  process.exit(1);
}
