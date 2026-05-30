import Navbar from './components/Navbar';
import Hero from './components/Hero';
import { FaArrowUp } from 'react-icons/fa';
import { useState, useEffect } from 'react';
import CursorTrail from './components/CursorTrail';
import { motion, AnimatePresence } from 'framer-motion';
import LoadingScreen from './components/LoadingScreen';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import { ScrollAnimationProvider } from './context/ScrollAnimationContext';

export default function App() {
  const [showButton, setShowButton] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        setShowButton(window.scrollY > 300);
        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const hasVisited = localStorage.getItem('hasVisited');
    if (hasVisited) {
      setLoading(false);
    }
  }, []);

  const finishLoading = () => {
    setLoading(false);
    localStorage.setItem('hasVisited', 'true');
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <ScrollAnimationProvider>
      <div>
        <CursorTrail />
        <AnimatePresence mode="wait">
          {loading ? (
            <LoadingScreen finishLoading={finishLoading} key="loading" />
          ) : (
            <div key="content" className="w-full relative">
              <Navbar startAnimation={!loading} />
              <main>
                <Hero startAnimation={!loading} />
                <About />
                <Skills />
                <Projects />
                <Achievements />
                <Contact />
              </main>

              <AnimatePresence>
                {showButton && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 bg-cyan-400 text-black p-3 rounded-full shadow-lg hover:bg-cyan-500 transition-all duration-300 focus:outline-none z-50"
                    aria-label="Scroll to top"
                  >
                    <FaArrowUp className="text-xl" />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          )}
        </AnimatePresence>
      </div>
    </ScrollAnimationProvider>
  );
}