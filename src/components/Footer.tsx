import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Globe, Mail } from 'lucide-react'; // Cleaned up unused imports
import PrivacyPolicyModal from './PrivacyPolicyModal';

const Footer: React.FC = () => {
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
  
  // Removed cookie state as it was commented out

  return (
    <>
      {/* Main Footer */}
      <footer className="bg-purple-100 text-purple-900">
        {/* Kept smaller padding (py-8) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid md:grid-cols-4 gap-8">
            
            {/* Company Info */}
            <div className="md:col-span-2">
              {/* MODIFIED: Reverted to a single, simple animation for the whole block */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: -80 }} // Removed negative 'y'
                viewport={{ once: true }}
              >
                {/* --- LOGO SECTION --- */}
                {/* Kept smaller margin (mb-4) */}
                <div className="flex items-center space-x-2 mb-4">
                  <img 
                    src="/2.svg" 
                    alt="Xalt Ventures Logo Icon" 
                    className="h-30 w-20 translate-x-6 translate-y-1" // Reverted 'y' translate
                  />
                  <img 
                    src="/test1.png" 
                    alt="XALT VENTURES EMPOWER SUCCESS" 
                    className="h-60 w-29 translate-x-2 translate-y-1" // Reverted 'y' translate
                  />
                </div>
                {/* --- END LOGO SECTION --- */}

                {/* Kept smaller margin (mb-4) */}
                <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: -80 }} // Removed negative 'y'
                viewport={{ once: true }}
              >
                <p className="text-purple-700 mb-4 leading-relaxed max-w-md">
                  Empowering businesses worldwide with innovative consulting solutions, 
                  strategic guidance, and transformative growth strategies.
                </p>
                <div className="flex space-x-4">
                  <a href="#" className="w-10 h-10 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center hover:bg-purple-300 hover:text-purple-800 transition-colors duration-300">
                    <Globe className="w-5 h-5" />
                  </a>
                  <a href="mailto:contact@xaltventures.com" className="w-10 h-10 bg-purple-200 text-purple-700 rounded-full flex items-center justify-center hover:bg-purple-300 hover:text-purple-800 transition-colors duration-300">
                    <Mail className="w-5 h-5" />
                  </a>
                </div>
              </motion.div>
              </motion.div> 
              {/* MODIFIED: Removed the second motion.div wrapper that was breaking the layout */}
            </div>

            {/* Quick Links */}
            <div>
              {/* Kept smaller margin (mb-4) */}
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-3">
                {['Home', 'About', 'Services', 'Global', 'Contact'].map((link) => (
                  <li key={link}>
                    <a href={`#${link.toLowerCase().replace(' ', '')}`} className="text-purple-700 hover:text-purple-900 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              {/* Kept smaller margin (mb-4) */}
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-purple-700 hover:text-purple-900 transition-colors duration-200 text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          {/* Kept smaller margins (mt-8 pt-6) */}
          <motion.div
                initial={{ opacity: 0, y: -90 }}
                whileInView={{ opacity: 1, y: -90 }} // Removed negative 'y'
                viewport={{ once: true }}>
          <div className="border-t border-purple-200 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-purple-600 text-sm">
              © 2024 Xalt Ventures – All Rights Reserved.
            </p>
            <div className="flex items-center space-x-4 mt-4 sm:mt-0">
              <span className="text-purple-600 text-sm">Melbourne</span>
            </div>
          </div>
          </motion.div>

        </div>
      </footer>

      {/* Privacy Policy Modal */}
      <AnimatePresence>
        {isPrivacyModalOpen && (
          <PrivacyPolicyModal 
            key="privacy-modal" 
            onClose={() => setIsPrivacyModalOpen(false)} 
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default Footer;