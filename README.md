# Portfolio Website

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- **Interactive Project Showcase**: Horizontal timeline with project details in modal popups
- **Service Request System**: Hover over services to request them directly through the contact form
- **Contact Form**: Integrated with Supabase for storage and EmailJS for notifications
- **Responsive Design**: Looks great on all devices from mobile to desktop
- **Modern UI**: Sleek animations and transitions using Framer Motion

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/portfolio-website.git
   cd portfolio-website
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Fill in your Supabase and EmailJS credentials

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```
# Supabase configuration
VITE_SUPABASE_URL=your-supabase-url
VITE_SUPABASE_ANON_KEY=your-supabase-anon-key

# EmailJS configuration
VITE_EMAILJS_SERVICE_ID=your-emailjs-service-id
VITE_EMAILJS_TEMPLATE_ID=your-emailjs-template-id
VITE_EMAILJS_PUBLIC_KEY=your-emailjs-public-key
```

## Preparing for Production

### 1. Clean up your code

- Remove any console.log statements (the production build will do this automatically)
- Ensure all environment variables are set correctly

### 2. Build for production

```bash
npm run build:prod
# or
yarn build:prod
```

This will:
- Check for required environment variables
- Build the project with production optimizations
- Output the build to the `dist` directory
- Provide statistics about the build

### 3. Deploy your website

You can deploy your website to any of the following services:

- **Netlify**: Easy deployment with continuous integration
- **Vercel**: Great for React applications with serverless functions
- **GitHub Pages**: Free hosting for static websites
- **Cloudflare Pages**: Fast global CDN with free hosting

#### Deploying to Netlify

1. Create a Netlify account at [netlify.com](https://www.netlify.com)
2. Install the Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```
3. Deploy your site:
   ```bash
   netlify deploy
   ```

#### Deploying to Vercel

1. Create a Vercel account at [vercel.com](https://vercel.com)
2. Install the Vercel CLI:
   ```bash
   npm install -g vercel
   ```
3. Deploy your site:
   ```bash
   vercel
   ```

## Customization

### Adding Your Projects

Edit the `projects` array in `src/components/Projects.tsx` to add your own projects:

```typescript
const projects: Project[] = [
  {
    id: '1',
    title: 'Your Project Title',
    description: 'Short description of your project',
    date: 'Month Year',
    readmeContent: `# Project Title
    
## Overview
Project description...`,
    imageUrl: '/images/projects/your-project-image.jpg',
    technologies: ['Tech1', 'Tech2', 'Tech3'],
    githubUrl: 'https://github.com/yourusername/your-project',
    demoUrl: 'https://your-project-demo.com'
  },
  // Add more projects...
];
```

### Customizing Services

Edit the services section in `src/components/Hero.tsx` to showcase your own services.

## License

This project is licensed under the MIT License - see the LICENSE file for details.
