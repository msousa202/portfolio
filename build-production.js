// Production build script
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🚀 Starting production build process...');

// Check if .env file exists with required variables
try {
  console.log('📋 Checking environment variables...');
  const envFile = fs.readFileSync('.env', 'utf8');
  
  const requiredVars = [
    'VITE_SUPABASE_URL',
    'VITE_SUPABASE_ANON_KEY',
    'VITE_EMAILJS_SERVICE_ID',
    'VITE_EMAILJS_TEMPLATE_ID',
    'VITE_EMAILJS_PUBLIC_KEY'
  ];
  
  const missingVars = requiredVars.filter(varName => !envFile.includes(`${varName}=`));
  
  if (missingVars.length > 0) {
    console.error('❌ Missing required environment variables:');
    missingVars.forEach(varName => console.error(`   - ${varName}`));
    console.error('Please add these variables to your .env file and try again.');
    process.exit(1);
  }
  
  console.log('✅ All required environment variables found.');
} catch (error) {
  console.error('❌ Error reading .env file:', error.message);
  console.error('Please make sure you have a .env file with all required variables.');
  process.exit(1);
}

// Run production build
try {
  console.log('🔨 Building for production...');
  execSync('npm run build', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Check if dist directory exists
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  console.log(`📦 Production build is ready in the 'dist' directory.`);
  
  // Count files in dist directory
  const countFiles = (dir) => {
    let count = 0;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        count += countFiles(filePath);
      } else {
        count++;
      }
    });
    
    return count;
  };
  
  const fileCount = countFiles(distPath);
  console.log(`📊 Total files: ${fileCount}`);
  
  // Calculate total size
  const getTotalSize = (dir) => {
    let size = 0;
    const files = fs.readdirSync(dir);
    
    files.forEach(file => {
      const filePath = path.join(dir, file);
      if (fs.statSync(filePath).isDirectory()) {
        size += getTotalSize(filePath);
      } else {
        size += fs.statSync(filePath).size;
      }
    });
    
    return size;
  };
  
  const totalSize = getTotalSize(distPath);
  const sizeInMB = (totalSize / (1024 * 1024)).toFixed(2);
  console.log(`📊 Total size: ${sizeInMB} MB`);
  
  console.log('\n🚀 Your website is ready for deployment!');
  console.log('To deploy your website, you can use one of the following services:');
  console.log('- Netlify: https://www.netlify.com');
  console.log('- Vercel: https://vercel.com');
  console.log('- GitHub Pages: https://pages.github.com');
  console.log('- Cloudflare Pages: https://pages.cloudflare.com');
} else {
  console.error('❌ Dist directory not found. Build may have failed.');
  process.exit(1);
}
