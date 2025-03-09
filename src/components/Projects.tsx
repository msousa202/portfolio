import React, { useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { Folder } from 'lucide-react';
import { useInView } from 'react-intersection-observer';
// @ts-ignore
import ProjectModal from './ProjectModal';

export interface Project {
  id: string;
  title: string;
  description: string;
  readmeContent: string;
  imageUrl: string;
  demoUrl?: string;
  githubUrl?: string;
  technologies: string[];
  date: string;
}

const Projects: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const controls = useAnimation();
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  // Sample projects data
  const projects: Project[] = [
    {
      id: '1',
      title: 'Smart City Project',
      description: 'Exploratory data analysis on traffic behavior patterns.',
      date: 'April 2024',
      readmeContent: `# Data Analysis Project

## Overview
This project involves comprehensive exploratory data analysis on traffic patterns in the city of Lisbon. The analysis helped identify key pendular movements, at entry/exit of the city.

## Key Features
- Data cleaning and preprocessing using Pandas.
- Identify patterns and outliers using waze data.
- Visualization of traffic entensity at x,y hours.
- Predictive modeling to forecast future trends.

## Technologies Used
- Python for data processing and analysis.
- Pandas for data manipulation.
- SQL for database connection.
- Google Colab for predictive modeling.
- Power BI for data visualization and insights.

## Results
The analysis revealed several key customer segments and purchasing patterns that were previously unknown. These insights led to a 15% increase in targeted marketing effectiveness.`,
      imageUrl: '/images/projects/project1.svg',
      technologies: ['Python', 'SQL', 'PowerBI', 'Microsoft Fabric'],
      githubUrl: 'https://github.com/mario-sousa/data-analysis-project'
    },
    {
      id: '2',
      title: 'ETL Pipeline Project',
      description: 'Automated data pipeline for processing football data',
      date: 'May 2024',
      readmeContent: `# ETL Pipeline Project

## Overview
This project implements an automated ETL (Extract, Transform, Load) pipeline for processing football statistical data from Kaggle into a centralized data warehouse.

## Key Features
- Automated data extraction from various sources (APIs, Kaggle, CSV files).
- Data transformation including cleaning, normalization, and enrichment.
- Queries for data warehouse quality assurance.
- Scheduled data loading into a data warehouse
- Data visualization.

## Technologies Used
- Microsoft Fabric for core processing logic
- Pyspark & SQL for workflow orchestration
- Kaggle APIs for database connection
- Python for data cleaning and normalization

## Results
The pipeline successfully processes over 250 thousand football statistics daily with 99.9% reliability, reducing manual data processing time by 85%.`,
      imageUrl: '/images/projects/project2.svg',
      technologies: ['Python', 'SQL', 'Pyspark', 'Microsoft Fabric', 'PowerBI'],
      githubUrl: 'https://github.com/mario-sousa/etl-pipeline-project',
      demoUrl: 'https://etl-pipeline-demo.example.com'
    },
    {
      id: '3', /* TODO: Update Project, for something created by me, could be even this website.*/
      title: 'Full Stack Web App',
      description: 'Interactive BI dashboard for executive insights',
      date: 'March 2025',
      readmeContent: `# BI Dashboard Project

## Overview
This project delivers an interactive business intelligence dashboard providing real-time insights for executive decision-making. The dashboard consolidates data from multiple business systems into actionable visualizations.

## Key Features
- Real-time data integration from multiple sources
- Interactive visualizations with drill-down capabilities
- Customizable KPI tracking and alerts
- Mobile-responsive design for on-the-go access

## Technologies Used
- Power BI for dashboard development
- DAX for advanced calculations
- SQL for data querying
- Azure for cloud hosting

## Results
The dashboard is now used by 50+ executives daily, leading to faster decision-making and a measurable 12% improvement in operational efficiency.`,
      imageUrl: '/images/projects/project3.svg',
      technologies: ['Power BI', 'DAX', 'SQL', 'Azure'],
      demoUrl: 'https://bi-dashboard-demo.example.com'
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <section id="projects" className="min-h-screen pt-4 pb-0">
      <div className="max-w-7xl mx-auto px-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Projects</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Explore my latest projects and contributions in data analysis and business intelligence
          </p>
        </motion.div>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={controls}
          className="relative"
        >
          {/* Timeline line */}
          <div className="absolute h-1 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 top-1/2 left-0 right-0 transform -translate-y-1/2 rounded-full" />

          {/* Projects timeline */}
          <div className="relative flex justify-between items-center gap-4 md:gap-8 overflow-x-auto pb-32 px-4 snap-x snap-mandatory -mx-4 px-8 md:px-4">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                variants={itemVariants}
                className="flex flex-col items-center snap-center min-w-[200px] md:min-w-[250px]"
              >
                <div className="mb-6 text-sm text-gray-400">{project.date}</div>
                <button
                  onClick={() => setSelectedProject(project)}
                  className="group relative flex flex-col items-center"
                  aria-label={`View ${project.title} details`}
                >
                  <div className="w-20 h-20 bg-gray-800/80 backdrop-blur-sm rounded-full flex items-center justify-center
                               border-2 border-purple-500 hover:border-purple-400 transition-all
                               group-hover:bg-gray-700 group-hover:scale-110 shadow-lg shadow-purple-500/20">
                    <Folder className="w-10 h-10 text-purple-500 group-hover:text-purple-400" />
                  </div>
                  <div className="absolute -bottom-24 w-48 md:w-60">
                    <h3 className="text-white font-medium text-lg mb-1">{project.title}</h3>
                    <p className="text-gray-400 text-sm">{project.description}</p>
                  </div>
                </button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Project Modal */}
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </div>
    </section>
  );
};

export default Projects;
