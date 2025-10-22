import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Globe, Maximize2, Minimize2, Phone, Mail, Clock } from 'lucide-react';

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
  color: string;
  phone: string;
  email: string;
  officeHours: string;
  timezone: string;
}

const offices: Office[] = [
  {
    city: 'Melbourne',
    country: 'Australia',
    address: 'Level 27, 101 Collins Street, Melbourne, Victoria 3000, Australia',
    coordinates: [-37.8150, 144.9693],
    color: 'from-purple-600 via-pink-500 to-magenta-500',
    phone: '+61 3 9653 7364',
    email: 'contact@xaltventures.com',
    officeHours: 'Monday - Friday, 9:00 AM - 5:00 PM',
    timezone: 'AEST'
  },
  {
    city: 'Xiamen',
    country: 'China',
    address: 'No.8304 Wanhai Rd 55, Siming District, Xiamen, Fujian 361000, China',
    coordinates: [24.4852, 118.1812],
    color: 'from-blue-600 via-cyan-500 to-teal-500',
    phone: 'N/A',
    email: 'contact@xaltventures.com',
    officeHours: 'Monday - Friday, 9:00 AM - 5:00 PM',
    timezone: 'CST'
  },
  {
    city: 'Doha',
    country: 'Qatar',
    address: 'P.O Box 55096, Doha-Qatar',
    coordinates: [25.2854, 51.5310],
    color: 'from-amber-600 via-orange-500 to-red-500',
    phone: 'N/A',
    email: 'contact@xaltventures.com',
    officeHours: 'Monday - Thursday, 9:00 AM - 5:00 PM',
    timezone: 'AST'
  },
  {
    city: 'Colombo',
    country: 'Sri Lanka',
    address: '29/17 Gunasekara Gardens, Nawala, Colombo, Sri Lanka',
    coordinates: [6.8949, 79.8883],
    color: 'from-emerald-600 via-teal-500 to-green-500',
    phone: '+94 77 333 0888',
    email: 'contact@xaltventures.com',
    officeHours: 'Monday - Friday, 9:00 AM - 5:00 PM',
    timezone: 'IST'
  }
];

const GlobalPresence: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(-1); // -1 means no office selected
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const fullscreenMapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const fullscreenMapInstanceRef = useRef<any>(null);
  const markersRef = useRef<any[]>([]);
  const fullscreenMarkersRef = useRef<any[]>([]);

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

  // Initialize main map
  useEffect(() => {
    if (isMapLoaded && mapRef.current && !mapInstanceRef.current) {
      initializeMap();
      updateMarkers(mapInstanceRef, mapRef, markersRef);
    }
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, [isMapLoaded]);

  // Handle map resize and state changes
  useEffect(() => {
    if (mapInstanceRef.current) {
      mapInstanceRef.current.invalidateSize();
      if (currentIndex === -1) {
        fitAllOffices(mapInstanceRef);
      } else {
        panToSelectedOffice(currentIndex, mapInstanceRef);
      }
      updateMarkers(mapInstanceRef, mapRef, markersRef);
    }
    if (fullscreenMapInstanceRef.current) {
      fullscreenMapInstanceRef.current.invalidateSize();
      if (currentIndex === -1) {
        fitAllOffices(fullscreenMapInstanceRef);
      } else {
        panToSelectedOffice(currentIndex, fullscreenMapInstanceRef);
      }
      updateMarkers(fullscreenMapInstanceRef, fullscreenMapRef, fullscreenMarkersRef);
    }
  }, [isFullscreen, currentIndex, isMapLoaded]);

  const initializeMap = (): void => {
    if (!mapRef.current) return;
    mapInstanceRef.current = window.L.map(mapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    });
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(mapInstanceRef.current);
    fitAllOffices(mapInstanceRef);
  };

  const initializeFullscreenMap = (): void => {
    if (!fullscreenMapRef.current || fullscreenMapInstanceRef.current) return;
    fullscreenMapInstanceRef.current = window.L.map(fullscreenMapRef.current, {
      zoomControl: true,
      scrollWheelZoom: true,
    });
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors',
    }).addTo(fullscreenMapInstanceRef.current);
    fitAllOffices(fullscreenMapInstanceRef);
    updateMarkers(fullscreenMapInstanceRef, fullscreenMapRef, fullscreenMarkersRef);
  };

  const updateMarkers = (mapInstance: any, mapRef: React.RefObject<HTMLDivElement>, markersRef: React.MutableRefObject<any[]>) => {
    if (!mapInstance.current) return;
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    offices.forEach((office, index) => {
      const customIcon = window.L.divIcon({
        html: `
          <div style="
            background: linear-gradient(135deg, ${office.color.split(' ')[0]}, ${office.color.split(' ')[2]}, ${office.color.split(' ')[4]});
            width: ${currentIndex === index ? '30px' : '20px'};
            height: ${currentIndex === index ? '30px' : '20px'};
            border-radius: 50%;
            border: 2px solid rgba(255, 255, 255, 0.9);
            box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
            display: flex; align-items: center; justify-content: center;
            cursor: pointer;
            animation: ${currentIndex === index ? 'pulse 1.8s infinite ease-in-out' : 'none'};
          ">
            <img src="/favicon.svg" style="
              width: ${currentIndex === index ? '16px' : '10px'};
              height: ${currentIndex === index ? '16px' : '10px'};
              object-fit: contain;
            " onerror="this.style.display='none';this.parentElement.style.background='white';" />
          </div>
          <style>
            @keyframes pulse {
              0%, 100% { transform: scale(1); opacity: 0.9; }
              50% { transform: scale(1.15); opacity: 1; }
            }
          </style>
        `,
        className: 'custom-xalt-marker',
        iconSize: [currentIndex === index ? 30 : 20, currentIndex === index ? 30 : 20],
        iconAnchor: [currentIndex === index ? 15 : 10, currentIndex === index ? 15 : 10],
        popupAnchor: [0, currentIndex === index ? -15 : -10]
      });

      const marker = window.L.marker(office.coordinates, { icon: customIcon })
        .addTo(mapInstance.current)
        .on('click', () => {
          setCurrentIndex(index);
          panToSelectedOffice(index, mapInstance);
        });

      markersRef.current.push(marker);
    });
  };

  const panToSelectedOffice = (index: number, mapInstance: any) => {
    if (mapInstance.current && offices[index]) {
      mapInstance.current.flyTo(offices[index].coordinates, 14, {
        animate: true,
        duration: 1.2
      });
    }
  };

  const fitAllOffices = (mapInstance: any) => {
    if (mapInstance.current) {
      const bounds = window.L.latLngBounds(offices.map(o => o.coordinates));
      mapInstance.current.fitBounds(bounds, { padding: [60, 60], maxZoom: 6 });
    }
  };

  const toggleFullscreen = (): void => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen) {
      setTimeout(() => {
        initializeFullscreenMap();
      }, 100);
    } else if (fullscreenMapInstanceRef.current) {
      fullscreenMapInstanceRef.current.remove();
      fullscreenMapInstanceRef.current = null;
      fullscreenMarkersRef.current = [];
    }
  };

  return (
    <>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;700&display=swap');
          body {
            font-family: 'Inter', sans-serif;
          }
          .card-shadow {
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1), inset 0 0 8px rgba(255, 255, 255, 0.2);
          }
          .card-shadow:hover {
            box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15), inset 0 0 10px rgba(255, 255, 255, 0.3);
          }
        `}
      </style>
      <section id="global" className="py-16 bg-gradient-to-br from-purple-50/50 via-white to-purple-100/50 text-slate-900 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/3 w-80 h-80 bg-purple-200/20 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute bottom-0 right-1/3 w-80 h-80 bg-purple-300/15 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '0.8s' }}></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent tracking-tight">
              Global Presence
            </h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed font-light">
              Connecting opportunities from our strategic hubs worldwide.
            </p>
          </motion.div>

          <div className="flex flex-col gap-6">
            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-200/30 to-purple-300/30 rounded-2xl blur-xl opacity-50"></div>
              <div className="relative bg-white/90 backdrop-blur-sm rounded-2xl p-5 shadow-lg border border-purple-100/50">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-slate-800 tracking-tight">Global Offices</h3>
                    <p className="text-sm text-slate-600 font-light">Select a marker or card to explore</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => fitAllOffices(mapInstanceRef)}
                      className="p-2.5 bg-purple-50/50 hover:bg-purple-100/70 rounded-lg transition-all duration-300 hover:scale-105 group"
                      title="View all offices"
                    >
                      <Globe className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                    </button>
                    <button
                      onClick={toggleFullscreen}
                      className="p-2.5 bg-purple-50/50 hover:bg-purple-100/70 rounded-lg transition-all duration-300 hover:scale-105 group"
                      title="Toggle fullscreen"
                    >
                      {isFullscreen ? (
                        <Minimize2 className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                      ) : (
                        <Maximize2 className="w-5 h-5 text-purple-600 group-hover:text-purple-700 transition-colors" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="relative bg-white rounded-xl overflow-hidden border border-purple-100/50 shadow-md">
                  <div ref={mapRef} className="w-full h-[400px]" />
                  {!isMapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-white/95">
                      <div className="text-center">
                        <div className="relative w-12 h-12 mx-auto mb-3">
                          <div className="absolute inset-0 border-2 border-purple-200 rounded-full"></div>
                          <div className="absolute inset-0 border-2 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        <p className="text-slate-600 font-medium text-sm">Loading map...</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-slate-600">
                  <span className="inline-block w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
                  <span>Click markers to explore our offices</span>
                </div>
              </div>
            </motion.div>

            {/* Office Cards in a Row */}
            <div className="flex flex-row gap-4 justify-center">
              {offices.map((office, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1, ease: 'easeOut' }}
                  viewport={{ once: true }}
                  className={`flex-1 min-w-0 max-w-xs bg-white/75 backdrop-blur-xl rounded-xl p-6 border border-purple-100/20 card-shadow cursor-pointer group hover:scale-105 hover:bg-white/85 transition-all duration-300 ${currentIndex === index ? 'ring-2 ring-purple-500/50' : ''}`}
                  onClick={() => {
                    setCurrentIndex(index);
                    panToSelectedOffice(index, mapInstanceRef);
                    if (isFullscreen) panToSelectedOffice(index, fullscreenMapInstanceRef);
                  }}
                >
                  <div className={`h-1.5 w-full rounded-t-xl bg-gradient-to-r ${office.color} mb-4 group-hover:opacity-90 transition-opacity`}></div>
                  <h3 className="text-xl font-bold text-slate-800 mb-2">{office.city}</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Globe className="w-4 h-4 text-purple-600" />
                      <p className="text-purple-600 font-medium text-sm">{office.country}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-purple-600 mt-0.5 flex-shrink-0" />
                      <p className="text-slate-700 text-sm leading-relaxed">{office.address}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-600" />
                      <p className="text-slate-700 text-sm">{office.phone}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-600" />
                      <a href={`mailto:${office.email}`} className="text-slate-700 text-sm truncate hover:underline">{office.email}</a>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="w-4 h-4 text-purple-600 mt-0.5" />
                      <div>
                        <p className="text-slate-700 text-sm">{office.officeHours}</p>
                        <p className="text-slate-600 text-sm">{office.timezone} Time</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Fullscreen Map Modal */}
      {isFullscreen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-gray-900/95 backdrop-blur-md flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.95 }}
            className="bg-white/95 rounded-2xl shadow-2xl w-full h-full max-w-[95vw] max-h-[95vh] relative overflow-hidden border border-purple-100/50"
          >
            <div className="absolute top-4 right-4 z-20 flex gap-3">
              <button
                onClick={() => fitAllOffices(fullscreenMapInstanceRef)}
                className="bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md transition-all duration-300 hover:scale-105 border border-purple-100/50"
                title="View all offices"
              >
                <Globe className="w-5 h-5 text-purple-600" />
              </button>
              <button
                onClick={toggleFullscreen}
                className="bg-white/80 hover:bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-md transition-all duration-300 hover:scale-105 border border-purple-100/50"
                title="Exit fullscreen"
              >
                <Minimize2 className="w-5 h-5 text-purple-600" />
              </button>
            </div>
            <div ref={fullscreenMapRef} className="w-full h-full" />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default GlobalPresence;