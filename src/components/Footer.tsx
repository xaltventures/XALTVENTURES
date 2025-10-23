import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Mail, Phone, MapPin } from 'lucide-react';
import PrivacyPolicyModal from './PrivacyPolicyModal'; // <-- Import new component


const Footer: React.FC = () => {
  const [showCookieBanner, setShowCookieBanner] = useState(true);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false); // <-- Add state for modal

  return (
    <>
      {/* Cookie Banner */}
      <AnimatePresence>
        {showCookieBanner && (
          <motion.div
            key="cookie-banner" // <-- Add key for AnimatePresence
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 bg-slate-800 border-t border-slate-700 p-4"
          >
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-gray-300 text-sm">
                We use cookies to analyze traffic and optimize your experience.
              </p>
              <div className="flex space-x-3">
                <button
                  onClick={() => setShowCookieBanner(false)}
                  className="px-4 py-2 text-gray-300 hover:text-white transition-colors text-sm"
                >
                  Decline
                </button>
                <button
                  onClick={() => setShowCookieBanner(false)}
                  className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm"
                >
                  Accept All
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Footer */}
      <footer className="bg-slate-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex items-center space-x-3 mb-6"
              >
                <img 
                  src="/1.svg" 
                  alt="Xalt Ventures xalt_logo" 
                  className="w-20 h-20"
                />
                <div className="flex flex-col items-start">
                  <div className="flex items-center leading-none">
                    <span className="text-2xl font-bold">XALT</span>
                    <span className="text-purple-400 text-2xl font-bold ml-1">VENTURES</span>
                  </div>
                  <span 
                    className="text-[10px] text-white uppercase tracking-wider mt-0" 
                    style={{ letterSpacing: '0.15em', lineHeight: '1' }}
                  >
                    EMPOWER SUCCESS
                  </span>
                </div>

                
              </motion.div>
              <p className="text-gray-300 mb-6 leading-relaxed max-w-md">
                Empowering businesses worldwide with innovative consulting solutions, 
                strategic guidance, and transformative growth strategies.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300">
                  <Globe className="w-5 h-5" />
                </a>
                <a href="mailto:contact@xaltventures.com" className="w-10 h-10 bg-slate-700 rounded-full flex items-center justify-center hover:bg-purple-600 transition-colors duration-300">
                  <Mail className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['About', 'Services', 'Global', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-gray-300 hover:text-white transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-lg font-semibold mb-6">Legal</h4>
              <ul className="space-y-3">
                <li>
                  {/* --- MODIFIED LINK --- */}
                  <button
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-gray-300 hover:text-white transition-colors duration-200 text-left"
                  >
                    Privacy Policy
                  </button>
                  {/* --- END MODIFICATION --- */}
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-slate-700 mt-12 pt-8 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © 2024 Xalt Ventures – All Rights Reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <span className="text-gray-400 text-sm">Melbourne</span>
            </div>
          </div>
        </div>
      </footer>

      {/* --- ADD MODAL --- */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <PrivacyPolicyModal 
            key="privacy-modal" 
            onClose={() => setIsPrivacyModalOpen(false)} 
          />
        )}
      </AnimatePresence>
      {/* --- END ADDITION --- */}
    </>
  );
};

export default Footer;

