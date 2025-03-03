import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

interface TimelineItemProps {
  title: string;
  period: string;
  description: string;
  index: number;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ title, period, description, index }) => {
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
          <p className="text-purple-400 font-medium">{period}</p>
        </div>
      </div>
      
      <div className="hidden md:flex flex-col items-center">
        <div className="w-4 h-4 bg-purple-500 rounded-full z-10"></div>
        <div className="w-1 bg-purple-500/30 h-full -mt-2"></div>
      </div>
      
      <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
        <div className={`bg-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-purple-500/20 ${index % 2 === 0 ? 'md:text-left' : 'md:text-left'} text-left`}>
          <p className="text-gray-300">{description}</p>
        </div>
      </div>
    </motion.div>
  );
};

const Path: React.FC = () => {
  const experiences = [
    {
      title: "Business Analyst @ Capgemini",
      period: "Oct 2023 - Apr 2024",
      description: "Led data analysis initiatives for enterprise clients, developing custom BI solutions that improved decision-making processes. Implemented ETL pipelines that reduced reporting time by 40% and increased data accuracy."
    },
    {
      title: "Football Match Analytics",
      period: "Jan 2024 - Jun 2024",
      description: "Developed a comprehensive analytics system for football match data, creating predictive models for player performance and match outcomes. Built interactive dashboards that provided real-time insights during matches."
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
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">My Professional Path</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            A journey through my professional experiences and projects that have shaped my expertise in data analysis and business intelligence.
          </p>
        </motion.div>
        
        <div className="relative">
          {/* Timeline line (visible on mobile) */}
          <div className="absolute left-4 top-0 bottom-0 w-1 bg-purple-500/30 md:hidden"></div>
          
          {/* Timeline items */}
          <div className="relative z-10">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={index}
                title={exp.title}
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