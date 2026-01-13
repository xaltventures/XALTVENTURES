import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ParticlesBackground from './components/ParticlesBackground';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Services from './components/Services';
import Opportunities from './components/Opportunities';
import GlobalPresence from './components/GlobalPresence';
import ContactForm from './components/ContactForm';
import Footer from './components/Footer';

function App() {
  const [isLoading, setIsLoading] =useState(true);

  useEffect(() => {
    // Simulate initial loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative">
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            className="fixed inset-0 z-50 bg-slate-900 flex items-center justify-center"
          >
            <div className="text-center">
              {/* --- CHANGES START HERE --- */}
              <motion.div
                initial={{ scale: 0, rotate: -180 ,y: 140}}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="w-25 h-25 rounded-full flex items-center justify-center mx-auto mb-3" // <-- RESTORED w-25 h-25, kept tight margin
              >
                <img 
                  src="/2.svg" 
                  alt="Xalt Ventures xalt_logo" 
                  className="w-80 h-40" // <-- RESTORED w-25 h-25
                />
              </motion.div>
              
                    {/* Replaced the H1 and P tags with this motion.img */}

              <motion.img

                src="/xalt_ventures_word_1.png"
                alt="XALT VENTURES - Discover Your Potential with Us"
                initial={{ opacity: 0, y: 100 }}
                animate={{ opacity: 1, y: 1 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="h-auto mx-auto mb-3 px-4" // Added padding for small screens
                style={{ maxWidth: '300px', width: '100%' }} // Responsive width
              />

              <motion.div
                initial={{ width: 0 ,y:-60}}
                animate={{ width: '200px' }}
                transition={{ delay: 1.2, duration: 0.8 }}
                className="h-1 bg-gradient-to-r from-purple-400 to-amber-400 mx-auto rounded-full"
              />
              {/* --- CHANGES END HERE --- */}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          <ParticlesBackground />
          <Navbar />
          <Hero />
          <About />
          <Services />
          <Opportunities />
          <GlobalPresence />
          <ContactForm />
          <Footer />
        </motion.div>
      )}
    </div>
  );
}

export default App;
