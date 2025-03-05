// Netlify local deployment test script
import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('🧪 Testing Netlify deployment locally...');

// Simulate Netlify environment
process.env.NODE_ENV = 'production';
process.env.CI = 'false';
process.env.NPM_FLAGS = '--include=dev';

// Check if .env file exists
try {
  console.log('📋 Checking .env file...');
  if (!fs.existsSync('.env')) {
    console.error('❌ .env file not found. Please create one with the required variables.');
    process.exit(1);
  }
  console.log('✅ .env file found.');
} catch (error) {
  console.error('❌ Error checking .env file:', error.message);
  process.exit(1);
}

// Check if netlify.toml exists
try {
  console.log('📋 Checking netlify.toml file...');
  if (!fs.existsSync('netlify.toml')) {
    console.error('❌ netlify.toml file not found. Please create one with the required configuration.');
    process.exit(1);
  }
  console.log('✅ netlify.toml file found.');
} catch (error) {
  console.error('❌ Error checking netlify.toml file:', error.message);
  process.exit(1);
}

// Check if .npmrc exists
try {
  console.log('📋 Checking .npmrc file...');
  if (!fs.existsSync('.npmrc')) {
    console.warn('⚠️ .npmrc file not found. Creating one...');
    fs.writeFileSync('.npmrc', '# Ensure dev dependencies are installed during build\nproduction=false\n');
  }
  console.log('✅ .npmrc file found.');
} catch (error) {
  console.error('❌ Error checking .npmrc file:', error.message);
  process.exit(1);
}

// Run the build command from netlify.toml
try {
  console.log('🔨 Running Netlify build command...');
  
  // Get the build command from netlify.toml
  const netlifyToml = fs.readFileSync('netlify.toml', 'utf8');
  const buildCommandMatch = netlifyToml.match(/command\s*=\s*"([^"]+)"/);
  
  if (!buildCommandMatch) {
    console.error('❌ Could not find build command in netlify.toml');
    process.exit(1);
  }
  
  const buildCommand = buildCommandMatch[1];
  console.log(`📋 Using build command: ${buildCommand}`);
  
  execSync(buildCommand, { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  console.error('This is likely the same error you would encounter on Netlify.');
  process.exit(1);
}

console.log('\n🎉 Local Netlify deployment test completed successfully!');
console.log('If this test passed, your site should deploy correctly on Netlify.');
console.log('\nNext steps:');
console.log('1. Commit these changes to your repository');
console.log('2. Push to your Git provider (GitHub, GitLab, or Bitbucket)');
console.log('3. Connect your repository to Netlify');
console.log('4. Set up your environment variables in the Netlify dashboard');
