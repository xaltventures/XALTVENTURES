import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Clock, Phone, Mail, Globe, Maximize2, Minimize2 } from 'lucide-react';





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
}

const GlobalPresence: React.FC = () => {
  const [isMapLoaded, setIsMapLoaded] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const office: Office = {
    city: 'Melbourne',
    country: 'Australia',
    address: 'Level 27, 101 Collins Street, Melbourne VIC 3000, Australia',
    coordinates: [-37.8136, 144.9631],
    timezone: 'AEDT',
    phone: '+61 3 9000 0000',
    email: 'melbourne@xaltventures.com'
  };

  // Load Leaflet and initialize map
  useEffect(() => {
    if (!window.L) {
      // Load Leaflet CSS
      const cssLink = document.createElement('link');
      cssLink.rel = 'stylesheet';
      cssLink.href = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.css';
      document.head.appendChild(cssLink);

      // Load Leaflet JS
      const script = document.createElement('script');
      script.src = 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/leaflet.min.js';
      script.onload = () => {
        setIsMapLoaded(true);
        initializeMap();
      };
      document.body.appendChild(script);
    } else {
      setIsMapLoaded(true);
      initializeMap();
    }

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  const initializeMap = (): void => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize map with Melbourne coordinates
    mapInstanceRef.current = window.L.map(mapRef.current, {
      center: office.coordinates,
      zoom: 15,
      zoomControl: true,
      scrollWheelZoom: true,
      dragging: true,
      touchZoom: true,
      doubleClickZoom: true
    });

    // Add OpenStreetMap tiles with custom styling
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19
    }).addTo(mapInstanceRef.current);

    // Custom marker icon
    const customIcon = window.L.divIcon({
      html: `
        <div style="
          background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #f59e0b 100%);
          width: 50px;
          height: 50px;
          border-radius: 50% 50% 50% 0;
          border: 4px solid white;
          box-shadow: 0 6px 20px rgba(124, 58, 237, 0.4);
          display: flex;
          align-items: center;
          justify-content: center;
          transform: rotate(-45deg);
          animation: pulse 2s infinite;
        ">
          <div style="
            color: white;
            font-weight: bold;
            font-size: 14px;
            transform: rotate(45deg);
            text-shadow: 0 1px 2px rgba(0,0,0,0.3);
          ">XV</div>
        </div>
        <style>
          @keyframes pulse {
            0%, 100% { transform: rotate(-45deg) scale(1); }
            50% { transform: rotate(-45deg) scale(1.1); }
          }
        </style>
      `,
      className: 'custom-xalt-marker',
      iconSize: [50, 50],
      iconAnchor: [25, 50],
      popupAnchor: [0, -50]
    });

    // Add marker with detailed popup
    const marker = window.L.marker(office.coordinates, { icon: customIcon }).addTo(mapInstanceRef.current);
    
    marker.bindPopup(`
      <div style="
        padding: 16px; 
        min-width: 250px; 
        font-family: system-ui, -apple-system, sans-serif;
      ">
        <div style="
          display: flex; 
          align-items: center; 
          margin-bottom: 12px;
          padding-bottom: 8px;
          border-bottom: 2px solid #7c3aed;
        ">
          <div style="
            background: linear-gradient(135deg, #7c3aed, #a855f7);
            width: 32px;
            height: 32px;
            border-radius: 8px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin-right: 12px;
          ">
            <span style="color: white; font-weight: bold; font-size: 14px;">XV</span>
          </div>
          <div>
            <div style="font-weight: bold; color: #1e293b; font-size: 16px;">
              XALT VENTURES
            </div>
            <div style="font-size: 12px; color: #7c3aed; font-weight: 600;">
              EMPOWER SUCCESS
            </div>
          </div>
        </div>
        
        <div style="space-y: 8px;">
          <div style="margin-bottom: 8px;">
            <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">📍 Address</div>
            <div style="color: #6b7280; font-size: 13px; line-height: 1.4;">
              ${office.address}
            </div>
          </div>
          
          <div style="margin-bottom: 8px;">
            <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">📞 Phone</div>
            <div style="color: #7c3aed; font-size: 14px;">
              <a href="tel:${office.phone}" style="text-decoration: none; color: #7c3aed;">
                ${office.phone}
              </a>
            </div>
          </div>
          
          <div style="margin-bottom: 8px;">
            <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">✉️ Email</div>
            <div style="color: #7c3aed; font-size: 14px;">
              <a href="mailto:${office.email}" style="text-decoration: none; color: #7c3aed;">
                ${office.email}
              </a>
            </div>
          </div>
          
          <div>
            <div style="font-weight: 600; color: #374151; margin-bottom: 4px;">🕒 Hours</div>
            <div style="color: #6b7280; font-size: 13px;">
              Mon-Fri: 9:00 AM - 5:00 PM (${office.timezone})
            </div>
          </div>
        </div>
      </div>
    `, {
      maxWidth: 300,
      className: 'custom-popup'
    });

    // Add a circle to highlight the business district
    window.L.circle(office.coordinates, {
      color: '#7c3aed',
      fillColor: '#a855f7',
      fillOpacity: 0.1,
      radius: 500,
      weight: 2,
      opacity: 0.6
    }).addTo(mapInstanceRef.current);

    // Add another circle for wider area coverage
    window.L.circle(office.coordinates, {
      color: '#f59e0b',
      fillColor: '#fbbf24',
      fillOpacity: 0.05,
      radius: 2000,
      weight: 1,
      opacity: 0.4
    }).addTo(mapInstanceRef.current);
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
      <section id="global" className="py-20 bg-slate-900 text-white relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-600 to-amber-400"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our Location
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Strategically located in Melbourne, we serve clients across 
              Australia and the Asia-Pacific region.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Interactive Map */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-slate-800 rounded-2xl p-6 shadow-2xl">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Our Melbourne Office</h3>
                  <button
                    onClick={toggleFullscreen}
                    className="p-2 hover:bg-slate-700 rounded-lg transition-colors duration-200"
                    title="Toggle fullscreen"
                  >
                    {isFullscreen ? <Minimize2 className="w-5 h-5" /> : <Maximize2 className="w-5 h-5" />}
                  </button>
                </div>
                
                <div className="relative bg-slate-700 rounded-xl overflow-hidden">
                  <div 
                    ref={mapRef} 
                    className="w-full h-80"
                    style={{ minHeight: '320px' }}
                  />
                  
                  {!isMapLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center bg-slate-700">
                      <div className="text-center">
                        <div className="w-12 h-12 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
                        <p className="text-gray-300">Loading interactive map...</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 text-xs text-gray-400 text-center">
                  📍 Click the marker for detailed contact information
                </div>
              </div>
            </motion.div>

            {/* Office Details */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="space-y-6"
            >
              <div className="bg-slate-800 rounded-2xl p-8 shadow-2xl">
                <h3 className="text-2xl font-bold mb-2">
                  {office.city}
                </h3>
                <p className="text-purple-400 mb-6">
                  {office.country}
                </p>

                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <MapPin className="w-5 h-5 text-amber-400 mt-1 flex-shrink-0" />
                    <p className="text-gray-300 leading-relaxed">
                      {office.address}
                    </p>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <a 
                      href={`tel:${office.phone}`}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                    >
                      {office.phone}
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <a 
                      href={`mailto:${office.email}`}
                      className="text-gray-300 hover:text-purple-400 transition-colors duration-200"
                    >
                      {office.email}
                    </a>
                  </div>

                  <div className="flex items-center space-x-3">
                    <Clock className="w-5 h-5 text-amber-400 flex-shrink-0" />
                    <p className="text-gray-300">
                      Open today: 09:00 am – 05:00 pm ({office.timezone})
                    </p>
                  </div>
                </div>
              </div>

              {/* Office Hours Widget */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-center"
              >
                <Clock className="w-8 h-8 text-amber-400 mx-auto mb-3" />
                <h4 className="font-semibold mb-2">Office Hours</h4>
                <p className="text-purple-100">
                  Monday - Friday: 9:00 AM - 5:00 PM
                </p>
                <p className="text-purple-200 text-sm mt-1">
                  {office.timezone} Time
                </p>
              </motion.div>

              {/* Map Controls Card */}
            
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
          className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-slate-800 rounded-xl shadow-2xl w-full h-full max-w-6xl max-h-[90vh] relative overflow-hidden"
          >
            <div className="absolute top-4 left-4 right-4 z-10 flex justify-between items-center">
              <div className="bg-white bg-opacity-90 backdrop-blur-sm rounded-lg px-4 py-2">
                <h3 className="font-bold text-slate-800">XALT VENTURES - Melbourne Office</h3>
                <p className="text-sm text-slate-600">101 Collins Street, Melbourne CBD</p>
              </div>
              <button
                onClick={toggleFullscreen}
                className="bg-white bg-opacity-90 backdrop-blur-sm rounded-full p-3 hover:bg-opacity-100 transition-all duration-200 shadow-lg"
              >
                <Minimize2 className="w-5 h-5 text-slate-700" />
              </button>
            </div>
            <div 
              ref={isFullscreen ? mapRef : undefined}
              className="w-full h-full"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
};

export default GlobalPresence;