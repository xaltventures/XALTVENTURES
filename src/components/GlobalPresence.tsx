import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Globe, Maximize2, Minimize2, ChevronLeft, ChevronRight, Building2, Sparkles } from 'lucide-react';

// Extend Window interface for Leaflet
declare global {
  interface Window {
    L: any;
  }
}

interface Office {
  city: string;
  country: string;
  address: string;
  coordinates: [number, number];
  timezone: string;
  phone: string;
  email: string;
  color: string;
}

const offices: Office[] = [
  {
    city: 'Melbourne',
    country: 'Australia',
    address: 'Level 27, 101 Collins Street, Melbourne, Victoria 3000, Australia',
    coordinates: [-37.8150, 144.9693],
    timezone: 'AEST',
    phone: '+61 3 9653 7364',
    email: 'contact.au@xaltventures.com',
    color: 'from-purple-500 to-pink-500'
  },
  {
    city: 'Xiamen',
    country: 'China',
    address: 'No.8304 Wanhai Rd 55, Siming District, Xiamen, Fujian 361000, China',
    coordinates: [24.4852, 118.1812],
    timezone: 'CST',
    phone: 'N/A',
    email: 'contact.cn@xaltventures.com',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    city: 'Doha',
    country: 'Qatar',
    address: 'P.O Box 55096, Doha-Qatar',
    coordinates: [25.2854, 51.5310],
    timezone: 'AST',
    phone: 'N/A',
    email: 'contact.qa@xaltventures.com',
    color: 'from-amber-500 to-orange-500'
  },
  {
    city: 'Nawala',
    country: 'Sri Lanka',
    address: '29/17 Gunasekara Gardens Nawala, Sri Lanka',
    coordinates: [6.8949, 79.8883],
    timezone: 'IST',
    phone: 'N/A',
    email: 'contact.lk@xaltventures.com',
    color: 'from-emerald-500 to-teal-500'
  }
];

const GlobalPresence: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);

  const selectedOffice = offices[currentIndex];

  const nextOffice = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % offices.length);
  };

  const prevOffice = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + offices.length) % offices.length);
  };

  // Load Leaflet
  useEffect(() => {
    const loadLeaflet = () => {
      if (window.L) {
        setIsMapLoaded(true);
        return;
      }
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
      document.head.appendChild(cssLink);
      const script = document.createElement('script');
      script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
      script.onload = () => setIsMapLoaded(true);
      document.body.appendChild(script);
    };
    loadLeaflet();
  }, []);

  // Initialize map and markers once Leaflet is loaded
  useEffect(() => {
    if (isMapLoaded && mapRef.current && !mapInstanceRef.current) {
      initializeMap();
      updateMarkers();
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isMapLoaded]);
  
  useEffect(() => {
    if (mapInstanceRef.current) {
        panToSelectedOffice();
    }
  }, [currentIndex, isMapLoaded]);

  const initializeMap = (): void => {
    if (!mapRef.current) return;
    mapInstanceRef.current = window.L.map(mapRef.current, {
      center: offices[0].coordinates,
      zoom: 1.5,
      zoomControl: true,
      scrollWheelZoom: true,
    });
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstanceRef.current);
  };

  const updateMarkers = () => {
    if (!mapInstanceRef.current) return;
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    offices.forEach((office, index) => {
        const customIcon = window.L.divIcon({
          html: `
            <div style="
              background: linear-gradient(135deg, #a855f7 0%, #ec4899 100%);
              width: 50px; height: 50px; border-radius: 50%;
              border: 4px solid rgba(255, 255, 255, 0.3); 
              box-shadow: 0 8px 25px rgba(168, 85, 247, 0.5), 0 0 0 0 rgba(168, 85, 247, 0.4);
              display: flex; align-items: center; justify-content: center;
              cursor: pointer; position: relative;
              animation: pulse 2s infinite;
              padding: 8px;
            ">
              <img src="/favicon.svg" alt="Office" style="width: 100%; height: 100%; object-fit: contain; filter: brightness(0) invert(1);" />
            </div>
            <style>
              @keyframes pulse {
                0%, 100% {
                  box-shadow: 0 8px 25px rgba(168, 85, 247, 0.5), 0 0 0 0 rgba(168, 85, 247, 0.4);
                }
                50% {
                  box-shadow: 0 8px 25px rgba(168, 85, 247, 0.5), 0 0 0 20px rgba(168, 85, 247, 0);
                }
              }
            </style>
          `,
          className: 'custom-xalt-marker',
          iconSize: [50, 50],
          iconAnchor: [25, 25],
          popupAnchor: [0, -25]
        });

        const marker = window.L.marker(office.coordinates, { icon: customIcon })
          .addTo(mapInstanceRef.current)
          .on('click', () => setCurrentIndex(index));
        
        markersRef.current.push(marker);
    });
  };

  const panToSelectedOffice = () => {
    if (mapInstanceRef.current && selectedOffice) {
        mapInstanceRef.current.flyTo(selectedOffice.coordinates, 14, {
            animate: true,
            duration: 1.5
        });
    }
  };

  const toggleFullscreen = (): void => {
    setIsFullscreen(!isFullscreen);
    setTimeout(() => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.invalidateSize();
      }
    }, 300);
  };

  return (
    <>
      <section id="global" className="py-24 bg-gradient-to-br from-purple-50 via-white to-purple-100 text-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-300/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-white/50 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-20"
          >
            <motion.div
              initial={{ scale: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 border border-purple-200 rounded-full mb-6"
            >
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-600 via-purple-800 to-purple-600 bg-clip-text text-transparent">
              Our Global Presence
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
              Connecting opportunities worldwide from our strategic locations across four continents.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-5 gap-8 items-start">
            {/* Left Column: Office Cards */}
            <div className="lg:col-span-2 space-y-6">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.4 }}
                        className="relative"
                    >
                      {/* Gradient Border Effect */}
                      <div className={`absolute inset-0 bg-gradient-to-r ${selectedOffice.color} rounded-3xl blur-xl opacity-30`}></div>
                      
                      <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-8 shadow-2xl border border-purple-100">
                        <div className="flex items-start justify-between mb-6">
                          <div>
                            <h3 className="text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-purple-800 bg-clip-text text-transparent">
                              {selectedOffice.city}
                            </h3>
                            <div className="flex items-center gap-2">
                              <Globe className="w-4 h-4 text-purple-600" />
                              <p className="text-purple-600 font-medium">{selectedOffice.country}</p>
                            </div>
                          </div>
                          <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${selectedOffice.color} flex items-center justify-center shadow-lg`}>
                            <Building2 className="w-8 h-8 text-white" />
                          </div>
                        </div>
                        
                        <div className="space-y-4">
                            <div className="group flex items-start gap-4 p-4 rounded-xl bg-purple-50/50 hover:bg-purple-100/50 transition-all duration-300">
                                <MapPin className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                                <p className="text-slate-700 leading-relaxed">{selectedOffice.address}</p>
                            </div>
                            
                            <div className="grid grid-cols-1 gap-3">
                              <a href={`tel:${selectedOffice.phone}`} className="group flex items-center gap-4 p-4 rounded-xl bg-purple-50/50 hover:bg-purple-100/70 transition-all duration-300">
                                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                    <Phone className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <div>
                                    <p className="text-xs text-slate-500 uppercase font-medium">Phone</p>
                                    <p className="text-slate-800 font-medium">{selectedOffice.phone}</p>
                                  </div>
                              </a>
                              
                              <a href={`mailto:${selectedOffice.email}`} className="group flex items-center gap-4 p-4 rounded-xl bg-purple-50/50 hover:bg-purple-100/70 transition-all duration-300">
                                  <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors">
                                    <Mail className="w-5 h-5 text-purple-600" />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-xs text-slate-500 uppercase font-medium">Email</p>
                                    <p className="text-slate-800 font-medium truncate">{selectedOffice.email}</p>
                                  </div>
                              </a>
                            </div>
                        </div>
                      </div>
                    </motion.div>
                </AnimatePresence>

                {/* Office Hours Card */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.2, duration: 0.6 }}
                    viewport={{ once: true }}
                    className="relative group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-purple-600 rounded-2xl blur-xl opacity-30 group-hover:opacity-50 transition-opacity"></div>
                  <div className="relative bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl p-6 text-center shadow-xl text-white">
                    <div className="w-14 h-14 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Clock className="w-7 h-7 text-white" />
                    </div>
                    <h4 className="font-bold text-lg mb-3">Office Hours</h4>
                    <div className="space-y-1">
                      <p className="text-purple-100 font-medium">Monday - Friday</p>
                      <p className="text-2xl font-bold">9:00 AM - 5:00 PM</p>
                      <p className="text-purple-100 text-sm mt-2">{selectedOffice.timezone} Time</p>
                    </div>
                  </div>
                </motion.div>
                
                {/* Navigation */}
                <div className="relative bg-white/80 backdrop-blur-xl rounded-2xl p-6 border border-purple-100 overflow-hidden shadow-lg">
                    {/* Animated Background Gradient */}
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-r ${selectedOffice.color} opacity-5`}
                      animate={{ 
                        backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                      }}
                      transition={{ 
                        duration: 3,
                        repeat: Infinity,
                        ease: "linear"
                      }}
                    />
                    
                    <div className="relative flex justify-between items-center">
                      <button 
                        onClick={prevOffice} 
                        className="group relative p-4 rounded-xl bg-purple-100 hover:bg-purple-200 transition-all duration-300 hover:scale-110 overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${selectedOffice.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                        <ChevronLeft className="relative w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors" />
                      </button>
                      
                      {/* Advanced Progress Bar */}
                      <div className="flex-1 mx-6">
                        <div className="relative h-3 bg-purple-100 rounded-full overflow-hidden backdrop-blur-sm">
                          {/* Background shimmer effect */}
                          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-shimmer" />
                          
                          {/* Progress fill */}
                          <motion.div 
                            className={`absolute inset-y-0 left-0 bg-gradient-to-r ${selectedOffice.color} rounded-full shadow-lg`}
                            initial={{ width: '0%' }}
                            animate={{ width: `${((currentIndex + 1) / offices.length) * 100}%` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          >
                            {/* Glow effect */}
                            <div className="absolute inset-0 bg-gradient-to-r from-white/30 via-transparent to-transparent" />
                          </motion.div>
                          
                          {/* Active indicator dot */}
                          <motion.div
                            className="absolute top-1/2 -translate-y-1/2 w-5 h-5 bg-white rounded-full shadow-xl border-2 border-purple-200"
                            initial={{ left: '0%' }}
                            animate={{ left: `calc(${((currentIndex + 1) / offices.length) * 100}% - 10px)` }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                          >
                            <div className={`absolute inset-0 rounded-full bg-gradient-to-r ${selectedOffice.color} animate-ping opacity-75`} />
                            <div className={`absolute inset-1 rounded-full bg-gradient-to-r ${selectedOffice.color}`} />
                          </motion.div>
                        </div>
                        
                        {/* Office name labels */}
                        <div className="flex justify-between mt-3">
                          {offices.map((office, index) => (
                            <motion.button
                              key={index}
                              onClick={() => setCurrentIndex(index)}
                              className={`text-xs transition-all duration-300 ${
                                index === currentIndex 
                                  ? 'text-purple-600 font-bold scale-110' 
                                  : 'text-slate-500 hover:text-slate-700'
                              }`}
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {office.city}
                            </motion.button>
                          ))}
                        </div>
                      </div>
                      
                      <button 
                        onClick={nextOffice} 
                        className="group relative p-4 rounded-xl bg-purple-100 hover:bg-purple-200 transition-all duration-300 hover:scale-110 overflow-hidden"
                      >
                        <div className={`absolute inset-0 bg-gradient-to-r ${selectedOffice.color} opacity-0 group-hover:opacity-20 transition-opacity`} />
                        <ChevronRight className="relative w-6 h-6 text-purple-600 group-hover:text-purple-700 transition-colors" />
                      </button>
                    </div>
                </div>
            </div>

            {/* Right Column: Interactive Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="lg:col-span-3 relative"
            >
              <div className="relative">
                {/* Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-200/50 to-purple-300/50 rounded-3xl blur-2xl"></div>
                
                <div className="relative bg-white/80 backdrop-blur-xl rounded-3xl p-6 shadow-2xl border border-purple-100">
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h3 className="text-xl font-bold text-slate-800">Our {selectedOffice.city} Office</h3>
                      <p className="text-sm text-slate-600">{selectedOffice.country}</p>
                    </div>
                    <button 
                      onClick={toggleFullscreen} 
                      className="p-3 hover:bg-purple-100 rounded-xl transition-all duration-300 hover:scale-110 group" 
                      title="Toggle fullscreen"
                    >
                      {isFullscreen ? 
                        <Minimize2 className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" /> : 
                        <Maximize2 className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                      }
                    </button>
                  </div>
                  
                  <div className="relative bg-white rounded-2xl overflow-hidden border border-purple-100 shadow-lg">
                    <div ref={mapRef} className="w-full h-[500px]" />
                    {!isMapLoaded && (
                      <div className="absolute inset-0 flex items-center justify-center bg-white">
                        <div className="text-center">
                          <div className="relative w-16 h-16 mx-auto mb-4">
                            <div className="absolute inset-0 border-4 border-purple-200 rounded-full"></div>
                            <div className="absolute inset-0 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                          </div>
                          <p className="text-slate-600 font-medium">Loading map...</p>
                        </div>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-5 flex items-center justify-center gap-2 text-sm text-slate-600">
                    <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                    <span>Click markers to explore our offices</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Fullscreen Map Modal */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-slate-900 rounded-3xl shadow-2xl w-full h-full max-w-7xl max-h-[95vh] relative overflow-hidden border border-slate-700"
          >
            <div className="absolute top-6 right-6 z-20">
              <button 
                onClick={toggleFullscreen} 
                className="bg-slate-800 hover:bg-slate-700 backdrop-blur-xl rounded-2xl p-4 shadow-xl transition-all duration-300 hover:scale-110 border border-slate-700"
              >
                <Minimize2 className="w-6 h-6 text-white" />
              </button>
            </div>
            <div ref={isFullscreen ? mapRef : undefined} className="w-full h-full" />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default GlobalPresence;