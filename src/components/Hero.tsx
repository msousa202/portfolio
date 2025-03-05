import React from 'react';
import { motion } from 'framer-motion';
import { Database, LineChart, PieChart, ArrowRight } from 'lucide-react';
import profileImage from '../assets/profile.png';

const Hero: React.FC = () => {
  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="min-h-screen pt-16 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Reordered grid for mobile - image first, then content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Profile Image - Shows first on mobile */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative flex justify-center w-full order-1 lg:order-2 mb-8 lg:mb-0"
          >
            <div className="w-56 h-56 sm:w-64 sm:h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-purple-500/30">
              <img 
                src={profileImage}
                alt="Mário" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </motion.div>
          
          {/* Text Content - Shows second on mobile */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 text-center lg:text-left">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Mário Sousa
              </span>
            </h1>
            <h2 className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-4 md:mb-6 text-center lg:text-left">
              Data Analyst | Business Intelligence Enthusiast
            </h2>
            <p className="text-gray-400 mb-6 md:mb-8 max-w-lg mx-auto lg:mx-0 text-center lg:text-left text-sm sm:text-base">
              Transforming complex data into actionable insights. Specializing in data analysis, 
              ETL pipeline development, and business intelligence solutions that drive strategic decisions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <motion.button
                onClick={scrollToProjects}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg
                           flex items-center justify-center gap-2 hover:opacity-90 transition-opacity text-sm sm:text-base"
              >
                View Projects
                <ArrowRight size={18} className="sm:w-5 sm:h-5" />
              </motion.button>
              
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 sm:px-8 py-3 bg-gray-800 text-white font-medium rounded-lg
                           hover:bg-gray-700 transition-colors text-sm sm:text-base"
              >
                Get in Touch
              </motion.a>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-24"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-12 text-center">
            My Services
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all group relative overflow-hidden">
              <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <Database size={28} className="text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Data Analysis</h4>
              <p className="text-gray-400">
                Transforming raw data into meaningful insights through statistical analysis, 
                data visualization, and predictive modeling to support decision-making.
              </p>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-purple-900/80 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-medium mb-4">Interested in this service?</p>
                <a 
                  href="#contact?service=Data Analysis" 
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                      // Set a URL parameter that the Contact component can read
                      window.history.pushState({}, '', '#contact?service=Data Analysis');
                      // Dispatch an event that the Contact component can listen for
                      window.dispatchEvent(new CustomEvent('serviceRequested', { 
                        detail: { service: 'Data Analysis' } 
                      }));
                    }
                  }}
                  className="px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Request Service
                </a>
              </div>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all group relative overflow-hidden">
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <LineChart size={28} className="text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">ETL Pipelines</h4>
              <p className="text-gray-400">
                Building robust Extract, Transform, Load processes to automate data workflows, 
                ensuring data quality and accessibility across your organization.
              </p>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-blue-900/80 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-medium mb-4">Interested in this service?</p>
                <a 
                  href="#contact?service=ETL Pipelines" 
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState({}, '', '#contact?service=ETL Pipelines');
                      window.dispatchEvent(new CustomEvent('serviceRequested', { 
                        detail: { service: 'ETL Pipelines' } 
                      }));
                    }
                  }}
                  className="px-6 py-2 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Request Service
                </a>
              </div>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all group relative overflow-hidden">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <PieChart size={28} className="text-cyan-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Business Intelligence</h4>
              <p className="text-gray-400">
                Creating interactive dashboards and reports that provide real-time visibility 
                into key performance indicators and business metrics.
              </p>
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-cyan-900/80 backdrop-blur-sm flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <p className="text-white text-lg font-medium mb-4">Interested in this service?</p>
                <a 
                  href="#contact?service=Business Intelligence" 
                  onClick={(e) => {
                    e.preventDefault();
                    const contactSection = document.getElementById('contact');
                    if (contactSection) {
                      contactSection.scrollIntoView({ behavior: 'smooth' });
                      window.history.pushState({}, '', '#contact?service=Business Intelligence');
                      window.dispatchEvent(new CustomEvent('serviceRequested', { 
                        detail: { service: 'Business Intelligence' } 
                      }));
                    }
                  }}
                  className="px-6 py-2 bg-cyan-600 text-white font-medium rounded-lg hover:bg-cyan-700 transition-colors"
                >
                  Request Service
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
