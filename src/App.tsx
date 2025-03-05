import Background from './components/Background';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Path from './components/Path';
import Projects from './components/Projects';
import Contact from './components/Contact';

function App() {
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
        <Hero />
        <Path />
        <Projects />
        <Contact />
      </main>
      
      <footer className="bg-black/30 backdrop-blur-sm py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-gray-400">
          <p>© {new Date().getFullYear()} Mário Sousa. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
