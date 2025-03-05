import { useState, useEffect } from 'react';
import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Path from './components/Path';
import Projects from './components/Projects';
import Contact from './components/Contact';
import TermsOfService from './components/TermsOfService';

function App() {
  const [showTerms, setShowTerms] = useState(false);
  
  // Listen for toggleTerms event from Contact component
  useEffect(() => {
    const handleToggleTerms = (event: CustomEvent<{ show: boolean }>) => {
      setShowTerms(event.detail.show);
      
      // Scroll to top when Terms of Service is opened
      if (event.detail.show) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    };
    
    window.addEventListener('toggleTerms', handleToggleTerms as EventListener);
    
    return () => {
      window.removeEventListener('toggleTerms', handleToggleTerms as EventListener);
    };
  }, []);
  
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleNavClick = (sectionId: string) => {
    if (showTerms) {
      // If we're in Terms of Service, first go back to main content
      setShowTerms(false);
      
      // Then scroll to the section after a small delay to ensure the main content is loaded
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      // If we're already in main content, just scroll to the section
      scrollToSection(sectionId);
    }
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <Background />
      <Navbar scrollToSection={handleNavClick} />
      
      <main>
        {!showTerms ? (
          <>
            <Hero />
            <Path />
            <Projects />
            <Contact />
          </>
        ) : (
          <TermsOfService />
        )}
      </main>
      
      <footer className="bg-black/30 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p className="mb-2">© {new Date().getFullYear()} Mário Sousa. All rights reserved.</p>
          <button 
            onClick={() => {
              setShowTerms(!showTerms);
              if (!showTerms) {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }} 
            className="text-gray-500 hover:text-gray-300 text-sm underline transition-colors"
          >
            {showTerms ? 'Back to Home' : 'Terms of Service'}
          </button>
        </div>
      </footer>
    </div>
  );
}

export default App;
