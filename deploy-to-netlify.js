// Netlify deployment script
import { execSync } from 'child_process';
import fs from 'fs';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

console.log('🚀 Netlify Deployment Helper');
console.log('============================');

// Check if Netlify CLI is installed
try {
  console.log('📋 Checking for Netlify CLI...');
  execSync('npx netlify --version', { stdio: 'pipe' });
  console.log('✅ Netlify CLI is installed.');
} catch (error) {
  console.log('⚠️ Netlify CLI not found. Installing Netlify CLI...');
  try {
    execSync('npm install netlify-cli --save-dev', { stdio: 'inherit' });
    console.log('✅ Netlify CLI installed successfully.');
  } catch (installError) {
    console.error('❌ Failed to install Netlify CLI:', installError.message);
    process.exit(1);
  }
}

// Check if user is logged in to Netlify
let isLoggedIn = false;
try {
  const netlifyStatus = execSync('npx netlify status', { stdio: 'pipe' }).toString();
  isLoggedIn = netlifyStatus.includes('Logged in');
  
  if (isLoggedIn) {
    console.log('✅ You are logged in to Netlify.');
  } else {
    console.log('⚠️ You are not logged in to Netlify.');
    console.log('🔑 Please log in to Netlify:');
    execSync('npx netlify login', { stdio: 'inherit' });
  }
} catch (error) {
  console.log('⚠️ Could not determine Netlify login status.');
  console.log('🔑 Please log in to Netlify:');
  execSync('npx netlify login', { stdio: 'inherit' });
}

// Run the build
console.log('\n📦 Building your site for production...');
try {
  execSync('npm run build:prod', { stdio: 'inherit' });
  console.log('✅ Build completed successfully!');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Ask if user wants to deploy to Netlify
rl.question('\n🌐 Do you want to deploy to Netlify now? (y/n): ', (answer) => {
  if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
    console.log('\n🚀 Deploying to Netlify...');
    
    // Ask if user wants to create a new site or use an existing one
    rl.question('🌐 Do you want to create a new site or use an existing one? (new/existing): ', (siteAnswer) => {
      if (siteAnswer.toLowerCase() === 'new') {
        // Initialize a new Netlify site
        console.log('\n🔧 Initializing a new Netlify site...');
        try {
          execSync('npx netlify init', { stdio: 'inherit' });
          console.log('✅ Netlify site initialized successfully!');
        } catch (error) {
          console.error('❌ Failed to initialize Netlify site:', error.message);
          rl.close();
          process.exit(1);
        }
      }
      
      // Deploy to Netlify
      console.log('\n🚀 Deploying to Netlify...');
      try {
        // Ask if user wants to deploy to production
        rl.question('🌐 Do you want to deploy to production? (y/n): ', (prodAnswer) => {
          if (prodAnswer.toLowerCase() === 'y' || prodAnswer.toLowerCase() === 'yes') {
            execSync('npx netlify deploy --prod', { stdio: 'inherit' });
          } else {
            execSync('npx netlify deploy', { stdio: 'inherit' });
            console.log('\n⚠️ This is a draft deployment. To deploy to production, run:');
            console.log('npx netlify deploy --prod');
          }
          
          console.log('\n🎉 Deployment process completed!');
          console.log('\n📝 Remember to set up your environment variables in the Netlify dashboard:');
          console.log('1. Go to your site dashboard in Netlify');
          console.log('2. Navigate to Site settings > Build & deploy > Environment');
          console.log('3. Add all variables from your .env file');
          
          rl.close();
        });
      } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        rl.close();
        process.exit(1);
      }
    });
  } else {
    console.log('\n📝 To deploy to Netlify later, run:');
    console.log('npx netlify deploy --prod');
    rl.close();
  }
