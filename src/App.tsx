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

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <Background />
      <Navbar scrollToSection={scrollToSection} />
      
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
          <p className="mb-2">© {new Date().getFullYear()} Mário. All rights reserved.</p>
          <button 
            onClick={() => setShowTerms(!showTerms)} 
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
