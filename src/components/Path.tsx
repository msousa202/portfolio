import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineItemProps {
  title: string;
  university?: string;
  universityUrl?: string;
  period: string;
  description: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, university, universityUrl, period, description, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} flex-col md:gap-8 mb-12`}
    >
      <div className="md:w-1/2 flex flex-col items-center md:items-end md:pr-8 md:text-right">
        <div className={`${index % 2 === 0 ? 'md:text-right' : 'md:text-left'} text-left`}>
          <h3 className="text-xl font-bold text-white">{title}</h3>
          {university && (
            <p className="text-blue-400 font-medium mb-1">
              {universityUrl ? (
                <a 
                  href={universityUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors"
                >
                  {university}
                </a>
              ) : (
                university
              )}
            </p>
          )}
          <p className="text-purple-400 font-medium">{period}</p>
        </div>
      </div>
      
      <div className="hidden md:flex flex-col items-center">
        <div className="w-4 h-4 bg-purple-500 rounded-full z-10"></div>
        <div className="w-1 bg-purple-500/30 h-full -mt-2"></div>
      </div>
      
      <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
        <div className={`bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 ${index % 2 === 0 ? 'md:text-left' : 'md:text-left'} text-left`}>
          <p className="text-gray-300 whitespace-pre-line">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Path: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'professional' | 'education'>('professional');

  const professionalExperiences = [
    {
      title: "Business Analyst",
      university: "Capgemini",
      universityUrl: "https://www.capgemini.com/",
      period: "Oct 2023 - Apr 2024",
      description: "As part of the CRM Academy @ Capgemini Portugal, I developed a strong foundation in Salesforce and CRM technologies. My role involved gathering requirements, participating in workshops, and closely collaborating with the technical team to bridge the gap between clients and developers."
    },
    {
      title: "SCA Data Analyst",
      university: "Crayon",
      universityUrl: "https://www.crayon.com/",
      period: "Oct 2024 - Present",
      description: "Optimized ETL scripts and streamlined workflows, developing a centralized application for script execution. Integrated backend connections with Power BI and multiple tenants to enhance data visualization. Focused on automation and process optimization to modernize legacy systems for efficiency and scalability."
    }
  ];

  const educationPath = [
    {
      title: "Bachelor degree in Information Systems",
      university: "NOVA IMS - Information Management School",
      universityUrl: "https://www.novaims.unl.pt/en/education/programs/bachelor-s-degrees/information-systems/#",
      period: "Sep 2020 - Jun 2024",
      description: "In this degree, I developed skills that enable me to analyze, design, and implement Information Systems and Technologies, bridging the gap between various business areas and the field of Information Systems."
    },
    {
      title: "Exchange Program, Erasmus+",
      university: "Vilnius University",
      universityUrl: "https://www.vu.lt/en/",
      period: "Feb 2023 - Jun 2023",
      description: "I participated in the Erasmus+ Program, gaining an invaluable international educational experience. During this time, I deepened my knowledge in Python, project management, pricing and sales management, Ubuntu (ethical hacking), and brand management."
    },
    {
      title: "Masters degree in Information Management",
      university: "NOVA IMS - Information Management School",
      universityUrl: "https://www.novaims.unl.pt/en/education/programs/postgraduate-programs-and-master-degree-programs/master-degree-in-information-management-with-a-specialization-in-business-intelligence/",
      period: "Sep 2023 - Jun 2025",
      description: "This degree has equipped me with the skills to design, build, and utilize business intelligence and analytics processes to support organizational decision-making and knowledge management. This expertise enables me to drive value creation and enhance both operational and strategic excellence."
    }
  ];

  return (
    <section id="path" className="min-h-screen py-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Journey</h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-8">
            Exploring my professional experiences and educational background that have shaped my expertise in data analysis and business intelligence.
          </p>

          {/* Tab buttons */}
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('professional')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'professional'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Professional Path
            </button>
            <button
              onClick={() => setActiveTab('education')}
              className={`px-6 py-2 rounded-lg font-medium transition-all ${
                activeTab === 'education'
                  ? 'bg-purple-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              Education Path
            </button>
          </div>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line (visible on mobile) */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-purple-500/30 md:hidden"></div>
          
          {/* Timeline items */}
          <div className="relative z-10">
            {(activeTab === 'professional' ? professionalExperiences : educationPath).map((exp, index) => (
              <TimelineItem
                key={index}
                title={exp.title}
                university={exp.university}
                universityUrl={exp.universityUrl}
                period={exp.period}
                description={exp.description}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Path;
