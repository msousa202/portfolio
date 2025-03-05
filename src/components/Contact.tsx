import React, { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle } from 'lucide-react';
import { supabase } from '../lib/supabase';
import emailjs from '@emailjs/browser';

interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const Contact: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState('');

  // EmailJS configuration from environment variables
  const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  
  const form = useRef<HTMLFormElement>(null);
  
  // Initialize EmailJS and listen for service request events
  useEffect(() => {
    emailjs.init(EMAILJS_PUBLIC_KEY);
    
    // Check URL for service parameter
    const checkUrlForService = () => {
      const hash = window.location.hash;
      if (hash.includes('?service=')) {
        const service = decodeURIComponent(hash.split('?service=')[1]);
        setFormData(prev => ({
          ...prev,
          subject: `Service Request: ${service}`
        }));
      }
    };
    
    // Initial check
    checkUrlForService();
    
    // Listen for service requested events
    const handleServiceRequested = (event: CustomEvent<{ service: string }>) => {
      setFormData(prev => ({
        ...prev,
        subject: `Service Request: ${event.detail.service}`
      }));
    };
    
    window.addEventListener('serviceRequested', handleServiceRequested as EventListener);
    window.addEventListener('hashchange', checkUrlForService);
    
    return () => {
      window.removeEventListener('serviceRequested', handleServiceRequested as EventListener);
      window.removeEventListener('hashchange', checkUrlForService);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (!formData.email || !formData.email.includes('@')) {
      setError('Please enter a valid email address');
      setIsSubmitting(false);
      return;
    }

    try {
      // 1. Send email notification using EmailJS
      if (form.current) {
        await emailjs.sendForm(
          EMAILJS_SERVICE_ID,
          EMAILJS_TEMPLATE_ID,
          form.current,
          EMAILJS_PUBLIC_KEY
        );
      } else {
        throw new Error('Form reference is null');
      }
      
      // 2. Try to insert data into Supabase contact_messages table
      try {
        await supabase
          .from('contact_messages')
          .insert([
            { 
              name: formData.name,
              email: formData.email,
              subject: formData.subject,
              message: formData.message
            }
          ]);
      } catch (dbErr) {
        // Silently handle database errors - email was still sent
      }
      
      setIsSuccess(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
    } catch (err) {
      if (err instanceof Error) {
        setError(`Failed to send message: ${err.message}`);
      } else {
        setError('Failed to send message. Please try again later.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const clearForm = useCallback(() => {
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
    setError('');
    
    // Also clear the URL parameter
    if (window.location.hash.includes('?')) {
      const baseHash = window.location.hash.split('?')[0];
      window.history.pushState({}, '', baseHash);
    }
  }, []);

  return (
    <section id="contact" className="min-h-screen pt-0 pb-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-gray-400 max-w-2xl mx-auto">
            Have a question or want to work together? Feel free to send me a message!
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gray-900/50 backdrop-blur-sm p-6 sm:p-8 rounded-xl border border-purple-500/20"
          >
            {isSuccess ? (
              <div className="text-center py-6">
                <CheckCircle size={48} className="text-green-500 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                <p className="text-gray-300">
                  Thank you for reaching out. I'll get back to you as soon as possible.
                </p>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="mt-6 px-6 py-2 bg-purple-600 text-white font-medium rounded-lg hover:bg-purple-700 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form ref={form} onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="your.email@example.com"
                      className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="What is this regarding?"
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message here..."
                    rows={6}
                    className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 resize-none"
                    required
                  />
                </div>

                {error && <p className="text-sm text-red-400">{error}</p>}

                <div className="mb-4 text-sm text-gray-400">
                  By submitting this form, you agree to our <button 
                    type="button"
                    onClick={() => {
                      // Use window.location to navigate to Terms of Service
                      const currentHash = window.location.hash;
                      // Store current hash to return after viewing terms
                      sessionStorage.setItem('returnTo', currentHash);
                      // Set showTerms state in App component
                      window.dispatchEvent(new CustomEvent('toggleTerms', { detail: { show: true } }));
                    }}
                    className="text-purple-400 hover:text-purple-300 underline transition-colors"
                  >
                    Terms of Service
                  </button> regarding how your data is stored and processed.
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:opacity-90 transition-opacity flex items-center justify-center"
                  >
                    {isSubmitting ? (
                      <span>Sending...</span>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={18} className="ml-2" />
                      </>
                    )}
                  </button>
                  
                  <button
                    type="button"
                    onClick={clearForm}
                    className="w-full sm:w-auto px-6 py-3 bg-gray-800 text-gray-300 font-medium rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Clear Form
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
