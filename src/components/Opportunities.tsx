import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Opportunities: React.FC = () => {
  // ==========================================
  // CAROUSEL LOGIC
  // ==========================================
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const adSlides = [
    {
      id: 'partner-ad',
      src: '/OPPORTUNITY TO PARTNER.svg',
      title: 'Strategic Partnership',
      duration: 5000,
    },
    {
      id: 'construction-ad',
      src: '/Construction Partner.png',
      title: 'Infrastructure Growth',
      duration: 5000,
    },
    {
      id: 'beauty-ad',
      src: '/K_beauty_brand.png',
      title: 'Global Retail Expansion',
      duration: 5000,
    }
  ];

  const currentAd = adSlides[currentAdIndex];

  const slideVariants = {
    enter: { x: 100, opacity: 0, scale: 0.95 },
    center: { x: 0, opacity: 1, scale: 1 },
    exit: { x: -100, opacity: 0, scale: 0.95 },
  };

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentAdIndex((prev) => (prev === adSlides.length - 1 ? 0 : prev + 1));
    }, currentAd.duration);
    return () => clearInterval(interval);
  }, [currentAd.duration, adSlides.length, isPaused]);

  const goToAd = (index: number) => {
    setCurrentAdIndex(index);
  };

  return (
    <section id="opportunities" className="w-full bg-white overflow-hidden text-slate-900 font-sans py-20">
      
      {/* Background Particles (Light Theme) */}
      <div className="absolute inset-0 opacity-30 pointer-events-none">
        {/* Left-side ball removed */}
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-100 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-4 z-10">
        
        {/* ==========================================
            SECTION HEADER
           ========================================== */}
        <div className="mb-12 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-violet-600 to-purple-600">
            Opportunities
          </h2>
          <div className="w-20 h-1 bg-violet-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto text-lg">
            Explore strategic partnerships and business opportunities with our global network.
          </p>
        </div>

        {/* ==========================================
            ADS CAROUSEL (Light Theme)
           ========================================== */}
        <div className="relative">
          
          {/* Interactive Card Container */}
          <div 
            className="relative h-[500px] md:h-[700px] flex items-center justify-center"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={currentAd.id}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="absolute inset-0 w-full h-full"
              >
                {/* Glass Card (Light Mode) */}
                <div className="w-full h-full max-w-7xl mx-auto rounded-3xl bg-white/60 backdrop-blur-xl border border-slate-200 shadow-2xl shadow-slate-200/50 overflow-hidden relative group transition-all duration-300 hover:shadow-violet-200/50 hover:border-violet-200">
                  
                  {/* Hover Glow Effect */}
                  <div className="absolute inset-0 bg-gradient-to-br from-violet-500/20 to-amber-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  
                  {/* Content Wrapper */}
                  <div className="relative w-full h-full flex flex-col items-center justify-center p-4">
                     {/* Image */}
                    <img 
                      src={currentAd.src} 
                      alt={currentAd.title}
                      className="w-full h-full object-contain drop-shadow-lg transition-transform duration-700 group-hover:scale-[1.01]"
                    />
                    
                    {/* Caption */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                      <span className="px-6 py-3 bg-white/90 backdrop-blur-md rounded-full text-slate-800 text-sm font-bold border border-slate-200 shadow-sm whitespace-nowrap">
                        {currentAd.title}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center mt-8 gap-3">
            {adSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => goToAd(index)}
                className={`h-1.5 transition-all duration-300 rounded-full ${
                  index === currentAdIndex 
                    ? 'w-10 bg-amber-500 shadow-[0_0_10px_rgba(245,158,11,0.5)]' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default Opportunities;
