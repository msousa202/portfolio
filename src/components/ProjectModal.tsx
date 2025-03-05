import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Github, ExternalLink, Calendar } from 'lucide-react';
import { Project } from './Projects';
import ReactMarkdown from 'react-markdown';

export interface ProjectModalProps {
  project: Project;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />

        {/* Modal */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="relative bg-gray-900/90 backdrop-blur-sm rounded-xl border border-purple-500/20 shadow-xl max-w-4xl w-full max-h-[85vh] overflow-y-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors z-10"
            aria-label="Close modal"
          >
            <X size={24} />
          </button>

          {/* Content */}
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-8">
              {/* Project image/demo */}
              <div className="md:w-1/2">
                <div className="relative rounded-lg overflow-hidden shadow-lg shadow-purple-500/10">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="w-full h-auto"
                  />
                </div>
                
                {/* Date and Links */}
                <div className="mt-6 space-y-4">
                  <div className="flex items-center text-gray-400">
                    <Calendar size={18} className="mr-2" />
                    <span>{project.date}</span>
                  </div>
                  
                  <div className="flex flex-wrap gap-4">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-gray-800/50 px-4 py-2 rounded-lg hover:bg-gray-800"
                      >
                        <Github size={18} />
                        <span>View Code</span>
                      </a>
                    )}
                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors bg-gray-800/50 px-4 py-2 rounded-lg hover:bg-gray-800"
                      >
                        <ExternalLink size={18} />
                        <span>Live Demo</span>
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project info */}
              <div className="md:w-1/2 mt-6 md:mt-0">
                <h3 className="text-2xl font-bold text-white mb-3">{project.title}</h3>
                <p className="text-gray-300 mb-4">{project.description}</p>
                
                {/* Technologies */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* README content */}
                <div className="prose prose-invert prose-headings:text-white prose-headings:font-bold prose-p:text-gray-300 prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline prose-code:text-purple-300 prose-code:bg-gray-800/50 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none max-w-none">
                  <ReactMarkdown>{project.readmeContent}</ReactMarkdown>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default ProjectModal;
