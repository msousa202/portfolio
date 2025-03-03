import React from 'react';
import { motion } from 'framer-motion';
import { Database, LineChart, PieChart } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section id="home" className="min-h-screen pt-16 flex flex-col justify-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500">
                Mário Sousa
              </span>
            </h1>
            <h2 className="text-xl md:text-2xl text-gray-300 mb-6">
              Data Analyst | Business Intelligence Enthusiast
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg">
              Transforming complex data into actionable insights. Specializing in data analysis, 
              ETL pipeline development, and business intelligence solutions that drive strategic decisions.
            </p>
            <div className="flex space-x-4">
              <button 
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity"
              >
                Get in Touch
              </button>
              <button className="px-6 py-3 border border-purple-500 text-white font-medium rounded-lg hover:bg-purple-500/10 transition-colors">
                View Projects
              </button>
            </div>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative mx-auto lg:mx-0 w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-purple-500/30"
          >
            <img 
              src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80" 
              alt="Mário Sousa" 
              className="w-full h-full object-cover"
            />
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
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 hover:border-purple-500/50 transition-all group">
              <div className="w-14 h-14 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                <Database size={28} className="text-purple-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Data Analysis</h4>
              <p className="text-gray-400">
                Transforming raw data into meaningful insights through statistical analysis, 
                data visualization, and predictive modeling to support decision-making.
              </p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-blue-500/20 hover:border-blue-500/50 transition-all group">
              <div className="w-14 h-14 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                <LineChart size={28} className="text-blue-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">ETL Pipelines</h4>
              <p className="text-gray-400">
                Building robust Extract, Transform, Load processes to automate data workflows, 
                ensuring data quality and accessibility across your organization.
              </p>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-cyan-500/20 hover:border-cyan-500/50 transition-all group">
              <div className="w-14 h-14 bg-cyan-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-cyan-500/30 transition-colors">
                <PieChart size={28} className="text-cyan-400" />
              </div>
              <h4 className="text-xl font-semibold text-white mb-3">Business Intelligence</h4>
              <p className="text-gray-400">
                Creating interactive dashboards and reports that provide real-time visibility 
                into key performance indicators and business metrics.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;