import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

const TermsOfService: React.FC = () => {
  return (
    <section id="terms" className="min-h-screen pt-24 pb-12 flex items-center">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12 relative"
        >
          <button
            onClick={() => window.dispatchEvent(new CustomEvent('toggleTerms', { detail: { show: false } }))}
            className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors flex items-center"
            aria-label="Back to main content"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span className="hidden sm:inline">Back</span>
          </button>
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Terms of Service</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-purple-500/20"
        >
          <div className="prose prose-invert max-w-none">
            <h3>1. Introduction</h3>
            <p>
              Welcome to Mário's Portfolio website. By accessing or using this website, you agree to be bound by these Terms of Service.
            </p>

            <h3>2. Data Collection and Usage</h3>
            <p>
              When you submit information through forms on this website (such as the contact form), we collect personal data including but not limited to:
            </p>
            <ul>
              <li>Your name</li>
              <li>Your email address</li>
              <li>Any additional information you provide in message fields</li>
            </ul>

            <h3>3. Data Storage</h3>
            <p>
              All data collected through this website is stored in a secure, encrypted database. We implement appropriate technical and organizational measures to protect your personal data against unauthorized or unlawful processing, accidental loss, destruction, or damage.
            </p>

            <h3>4. Data Sharing</h3>
            <p>
              We may share your personal information with third parties under the following circumstances:
            </p>
            <ul>
              <li>With service providers who assist in operating our website and conducting business (such as email service providers)</li>
              <li>When required by law or to respond to legal process</li>
              <li>To protect our rights, property, or safety, or that of our users or others</li>
            </ul>

            <h3>5. Your Rights</h3>
            <p>
              You have the right to:
            </p>
            <ul>
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate personal data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to processing of your personal data</li>
              <li>Request restriction of processing your personal data</li>
            </ul>
            <p>
              To exercise any of these rights, please contact us through the contact form on this website.
            </p>

            <h3>6. Changes to Terms</h3>
            <p>
              We reserve the right to modify these terms at any time. We will provide notice of significant changes by updating the date at the top of these terms and you waive any right to receive specific notice of each such change.
            </p>

            <h3>7. Contact Information</h3>
            <p>
              If you have any questions about these Terms of Service, please contact us through the contact form on this website.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TermsOfService;
