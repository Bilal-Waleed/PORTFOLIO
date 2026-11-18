import { lazy, Suspense, useState, useEffect } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import LoadingScreen from './components/LoadingScreen';
import { ScrollAnimationProvider } from './context/ScrollAnimationContext';

const About = lazy(() => import('./components/About'));
const Services = lazy(() => import('./components/Services'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Achievements = lazy(() => import('./components/Achievements'));
const Contact = lazy(() => import('./components/Contact'));

let introFinished = false;

export default function App() {
  const [showButton, setShowButton] = useState(false);
  const [intro, setIntro] = useState(introFinished ? 'done' : 'play');

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
    if (introFinished) return undefined;

    // Short intro; mount main content under the overlay ASAP for better LCP.
    const leaveTimer = setTimeout(() => setIntro('leave'), 420);
    const doneTimer = setTimeout(() => {
      introFinished = true;
      setIntro('done');
    }, 620);

    return () => {
      clearTimeout(leaveTimer);
      clearTimeout(doneTimer);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const showContent = intro === 'leave' || intro === 'done';
  const animateNow = intro === 'done';

  return (
    <ScrollAnimationProvider>
      <div>
        {intro !== 'done' && <LoadingScreen leaving={intro === 'leave'} />}

        {showContent && (
          <div
            className="w-full relative opacity-100"
            aria-hidden={intro !== 'done'}
          >
            <Navbar startAnimation={animateNow} />
            <main>
              {/* Start hero as soon as overlay begins leaving — portrait can paint for LCP */}
              <Hero startAnimation={showContent} />
              <Suspense fallback={null}>
                <About />
                <Services />
                <Projects />
              </Suspense>
              <Suspense fallback={null}>
                <Skills />
                <Achievements />
                <Contact />
              </Suspense>
            </main>

            <AnimatePresence>
              {showButton && (
                <motion.button
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.25 }}
                  onClick={scrollToTop}
                  className="fixed bottom-8 right-8 bg-cyan-400 text-black p-3 rounded-full shadow-lg hover:bg-cyan-500 transition-all duration-300 focus:outline-none z-50"
                  aria-label="Scroll to top"
                >
                  <FaArrowUp className="text-xl" aria-hidden="true" focusable="false" />
                </motion.button>
              )}
            </AnimatePresence>
          </div>
        )}
      </div>
    </ScrollAnimationProvider>
  );
}
