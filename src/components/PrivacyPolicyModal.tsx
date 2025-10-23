import React from 'react';
import { motion, Variants } from 'framer-motion';
import { X } from 'lucide-react';

interface PrivacyPolicyModalProps {
  onClose: () => void;
}

const backdropVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 50 },
  visible: { opacity: 1, scale: 1, y: 0, transition: { type: 'spring', stiffness: 300, damping: 30 } },
  exit: { opacity: 0, scale: 0.9, y: 50 },
};

const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ onClose }) => {
  // Process the policy text into readable elements
  const renderPolicyContent = () => {
    return (
      <>
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Privacy Policy</h2>
        
        <p className="text-gray-600 mb-4">
          Xalt Ventures Pty Ltd, is committed to providing a suite of quality services to
          you and our privacy policy outlines our ongoing obligation to you in respect of
          how we manage your Personal Information.
        </p>
        <p className="text-gray-600 mb-4">
          Having adopted the Australian Privacy Principles (APPs) contained in the
          Privacy Act 1988 (Cth) (the Privacy Act). The APPs govern the way in which
          we collect, use, disclose, store, secure and dispose of your Personal
          Information.
        </p>
        <p className="text-gray-600 mb-4">
          A copy of the Australian Privacy Principles may be obtained from the website
          of The Office of the Australian Information Commissioner at{' '}
          <a href="https://www.oaic.gov.au/" target="_blank" rel="noopener noreferrer" className="text-purple-600 hover:underline">
            https://www.oaic.gov.au/
          </a>
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">What is Personal Information and why do we collect it?</h3>
        <p className="text-gray-600 mb-4">
          Personal Information is information or an opinion that identifies an individual.
          Examples of Personal Information we collect include names, addresses, email
          addresses, phone and facsimile numbers.
        </p>
        <p className="text-gray-600 mb-4">
          This Personal Information is obtained in many ways including interviews,
          correspondence, by telephone and facsimile, by email, via our
          website https://xaltventures.com/ from media and publications, from other
          publicly available sources, from cookies and from third parties. We don’t
          guarantee website links or policies of any authorized or unauthorized third
          parties.
        </p>
        <p className="text-gray-600 mb-4">
          We collect your Personal Information for the primary purpose of providing our
          services to you, providing information to our clients and marketing. We may
          also use your Personal Information for secondary purposes closely related to
          the primary purpose, in circumstances where you would reasonably expect
          such use or disclosure. You may unsubscribe from our mailing/marketing lists
          at any time by contacting us in writing.
        </p>
        <p className="text-gray-600 mb-4">
          When we collect Personal Information, we will, where appropriate and where
          possible, explain to you why we are collecting the information and how we
          plan to use it.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Sensitive Information</h3>
        <p className="text-gray-600 mb-4">
          Sensitive information is defined in the Privacy Act to include information or
          opinion about such things as an individual’s racial or ethnic origin, political
          opinions, membership of a political association, religious or philosophical
          beliefs, membership of a trade union or other professional body, criminal
          record or health information.
        </p>
        <p className="text-gray-600 mb-4">
          Sensitive information will be used by us only:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4 pl-4">
          <li>For the primary purpose for which it was obtained</li>
          <li>For a secondary purpose that is directly related to the primary purpose</li>
          <li>With your consent, or where required or authorized by law.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Third Parties</h3>
        <p className="text-gray-600 mb-4">
          Where reasonable and practicable to do so, we will collect your Personal
          Information only from you. However, in some circumstances we may be
          provided with information by third parties. In such a case we will take
          reasonable steps to ensure that you are made aware of the information
          provided to us by the third party.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Disclosure of Personal Information</h3>
        <p className="text-gray-600 mb-4">
          Your Personal Information may be disclosed in a number of circumstances
          including the following:
        </p>
        <ul className="list-disc list-inside space-y-2 text-gray-600 mb-4 pl-4">
          <li>Third parties where you consent to the use or disclosure; and</li>
          <li>Where required or authorized by law.</li>
        </ul>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Security of Personal Information</h3>
        <p className="text-gray-600 mb-4">
          Your Personal Information is stored in a manner that reasonably protects it
          from misuse and loss and from unauthorized access, modification or
          disclosure.
        </p>
        <p className="text-gray-600 mb-4">
          When your Personal Information is no longer needed for the purpose for
          which it was obtained, we will take reasonable steps to destroy or
          permanently de-identify your Personal Information.
          However, most of the Personal Information is or will be stored in client files
          which will be kept by us for a minimum of 7 years.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Access to your Personal Information</h3>
        <p className="text-gray-600 mb-4">
          You may access the Personal Information we hold about you and to update
          and/or correct it, subject to certain exceptions. If you wish to access your
          Personal Information, please contact us in writing.
        </p>
        <p className="text-gray-600 mb-4">
          Xalt Ventures Pty Ltd will never charge a fee for your access request but
          may charge an administrative fee for providing a copy of your Personal
          Information.
        </p>
        <p className="text-gray-600 mb-4">
          In order to protect your Personal Information, we may require identification
          from you before releasing the requested information.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Maintaining the Quality of your Personal Information</h3>
        <p className="text-gray-600 mb-4">
          It is important to us that your Personal Information is up to date. We will take
          reasonable steps to make sure that your Personal Information is accurate,
          complete and up to date. If you find that the information we have is not up
          to date or is inaccurate, please advise us as soon as practicable so we can
          update our records and ensure we can continue to provide quality services to
          you.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Policy Updates</h3>
        <p className="text-gray-600 mb-4">
          This Policy may change from time to time and is available on our website.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-3 text-gray-800">Privacy Policy Complaints and Enquiries</h3>
        <p className="text-gray-600 mb-4">
          If you have any queries or complaints about our Privacy Policy, please contact
          us through our website.
        </p>
      </>
    );
  };

  return (
    <>
      {/* Backdrop */}
      <motion.div
        className="fixed inset-0 z-[60] bg-black bg-opacity-60"
        initial="hidden"
        animate="visible"
        exit="hidden"
        variants={backdropVariants}
        onClick={onClose}
      />

      {/* Modal */}
      <motion.div
        className="fixed inset-0 z-[70] flex items-center justify-center p-4"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={modalVariants}
      >
        <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden">
          {/* Modal Header */}
          <div className="flex justify-between items-center p-5 border-b">
            <h2 className="text-lg font-semibold text-gray-900">Privacy Policy</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-700 transition-colors rounded-full p-1"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          {/* Modal Content */}
          <div className="p-6 overflow-y-auto">
            {renderPolicyContent()}
          </div>

          {/* Modal Footer */}
          <div className="p-4 border-t bg-gray-50 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default PrivacyPolicyModal;