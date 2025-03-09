# Mário Sousa - Portfolio Website

A modern, responsive portfolio website showcasing data analysis and business intelligence projects. Built with React, TypeScript, and Tailwind CSS, this portfolio features an elegant design with smooth animations and interactive elements.

![Portfolio Preview](src/assets/profile.png)

## Overview

This portfolio website serves as a professional showcase for Mário Sousa, a Data Analyst and Business Intelligence specialist. The site features:

- **Professional Profile**: Highlighting skills and services in data analysis, ETL pipelines, and business intelligence
- **Interactive Project Showcase**: Horizontal timeline with detailed project modals displaying README content
- **Service Request System**: Interactive service cards with direct contact form integration
- **Contact Form**: Dual-storage system using Supabase for data persistence and EmailJS for notifications
- **Responsive Design**: Fully responsive layout optimized for all devices from mobile to desktop
- **Modern UI**: Sleek animations and transitions powered by Framer Motion

## Tech Stack

- **Frontend Framework**: React with TypeScript
- **Styling**: Tailwind CSS for utility-first styling
- **Animations**: Framer Motion for smooth transitions and effects
- **Icons**: Lucide React for modern, customizable icons
- **Backend Integration**: 
  - Supabase for database storage (contact form submissions)
  - EmailJS for sending email notifications
- **Build Tool**: Vite for fast development and optimized production builds
- **Deployment**: Configured for Netlify with custom deployment scripts

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase account (for database functionality)
- EmailJS account (for email notifications)

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/mario-sousa/portfolio-1.git
   cd portfolio-1
   ```

2. Install dependencies
   ```bash
   npm install
   # or
   yarn install
   ```

3. Set up environment variables
   - Copy `.env.example` to `.env`
   - Fill in your Supabase and EmailJS credentials (see Environment Variables section)

4. Start the development server
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. Open your browser and navigate to `http://localhost:5173` (or the port shown in your terminal)

## Project Structure

```
portfolio-1/
├── public/                  # Static assets
│   ├── images/              # Project images and icons
│   └── ...
├── src/
│   ├── assets/              # Local assets (profile picture, logo)
│   ├── components/          # React components
│   │   ├── Background.tsx   # Animated background effect
│   │   ├── Contact.tsx      # Contact form with Supabase/EmailJS integration
│   │   ├── Hero.tsx         # Main landing section with services
│   │   ├── Navbar.tsx       # Navigation component
│   │   ├── Path.tsx         # Career/education path section
│   │   ├── ProjectModal.tsx # Modal for displaying project details
│   │   ├── Projects.tsx     # Interactive project timeline
│   │   └── ...
│   ├── lib/                 # Utility libraries
│   │   └── supabase.ts      # Supabase client configuration
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── supabase/
│   └── migrations/          # Database schema migrations
├── .env.example             # Example environment variables
└── ...                      # Configuration files
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

### Setting Up Supabase

1. Create a Supabase account at [supabase.com](https://supabase.com)
2. Create a new project
3. Run the migration script in `supabase/migrations/` or manually create:
   - A `subscribers` table for newsletter subscriptions
   - A `contact_messages` table for storing contact form submissions
4. Copy your project URL and anon key to the `.env` file

### Setting Up EmailJS

1. Create an EmailJS account at [emailjs.com](https://www.emailjs.com)
2. Create an email service and template
3. Copy your service ID, template ID, and public key to the `.env` file

## Development Workflow

### Local Development

```bash
# Start development server
npm run dev

# Lint your code
npm run lint
```

### Production Build

```bash
# Standard production build
npm run build

# Enhanced production build with environment variable checks
npm run build:prod
```

The enhanced build script (`build:prod`) will:
- Check for required environment variables
- Build the project with production optimizations
- Output the build to the `dist` directory
- Provide statistics about the build size

### Deployment

This project includes custom scripts for Netlify deployment:

```bash
# Test Netlify deployment locally
npm run netlify:test

# Deploy to Netlify
npm run netlify:deploy
```

#### Deployment Options

1. **Netlify** (Recommended)
   - Use the included helper script: `npm run netlify:deploy`
   - Or connect your GitHub repository to Netlify for continuous deployment

2. **Vercel**
   - Great alternative for React applications
   - Provides serverless functions if needed

3. **GitHub Pages**
   - Free hosting for static websites
   - Works well with this portfolio site

4. **Cloudflare Pages**
   - Fast global CDN with free hosting

## Customization Guide

### Personalizing Your Portfolio

1. **Profile Information**
   - Update personal details in `src/components/Hero.tsx`
   - Replace profile image in `src/assets/profile.png`

2. **Projects**
   - Edit the `projects` array in `src/components/Projects.tsx`:
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

3. **Services**
   - Modify the services section in `src/components/Hero.tsx`
   - Each service card can be customized with different icons, colors, and descriptions

4. **Career Path**
   - Update your career and education timeline in `src/components/Path.tsx`

5. **Contact Form**
   - Customize form fields in `src/components/Contact.tsx`
   - Ensure your EmailJS template variables match the form field names

### Styling

- The project uses Tailwind CSS for styling
- Main color scheme and design elements can be adjusted in `tailwind.config.js`
- Background effects can be modified in `src/components/Background.tsx`

## Features In-Depth

### Interactive Project Timeline

The project showcase features a horizontal timeline with interactive project cards. Clicking on a project opens a modal with:
- Project title and description
- Technologies used
- GitHub and demo links
- Full README content rendered with Markdown

### Service Request System

The services section includes interactive cards that:
- Display service information
- Show an overlay on hover with a "Request Service" button
- Automatically populate the contact form with the selected service

### Contact Form with Dual Storage

The contact form implements a robust submission system:
- Sends an email notification via EmailJS
- Stores the message in Supabase for future reference
- Includes form validation and error handling
- Features Terms of Service integration

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- React and TypeScript communities for excellent documentation
- Tailwind CSS for streamlined styling capabilities
- Framer Motion for powerful animation tools
- Supabase for providing a robust backend solution
- EmailJS for reliable email integration
