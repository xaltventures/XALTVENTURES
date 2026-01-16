import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useForm, Controller } from 'react-hook-form';
import { Send, Upload, Check } from 'lucide-react';
import ReCAPTCHA from 'react-google-recaptcha';

interface FormData {
  name: string;
  email: string;
  message: string;
  file?: FileList;
  recaptcha: string; 
}

// ---
// This is your reCAPTCHA v2 Site Key for the front-end.
// Keep this as you have it.
// ---
const RECAPTCHA_SITE_KEY = "6LecxQEsAAAAANvPnnmm1PLaO7Xy9_vfuR7UCuAZ"; // Or your actual site key

// ---
// IMPORTANT: Replace this with your own Formspree Endpoint URL
// ---
const FORMSpree_ENDPOINT = "https://formspree.io/f/xgvpjryb"; 

const ContactForm: React.FC = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false); // Added for loading state
  const recaptchaRef = useRef<ReCAPTCHA>(null); 

  const { register, handleSubmit, formState: { errors }, reset, control } = useForm<FormData>();

  // --- THIS IS THE UPDATED ONSUBMIT FUNCTION ---
  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true); // Show loading feedback on button

    // Create a FormData object to send data, which is necessary for file uploads
    const formData = new FormData();
    formData.append('name', data.name);
    formData.append('email', data.email);
    formData.append('message', data.message);
    
    // Append the file if it exists
    if (data.file && data.file.length > 0) {
      formData.append('file', data.file[0]);
    }
    
    // Append the reCAPTCHA token using the key Formspree expects
    formData.append('g-recaptcha-response', data.recaptcha);

    try {
      const response = await fetch(FORMSpree_ENDPOINT, {
        method: 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json' // Tells Formspree to send us JSON back
        }
      });

      if (response.ok) {
        // --- Success ---
        setIsSubmitted(true);
        recaptchaRef.current?.reset();
        reset();
      } else {
        // --- Handle Server Error ---
        console.error('Formspree submission error:', await response.json());
        alert('There was an error sending your message. Please try again.');
      }
    } catch (error) {
      // --- Handle Network Error ---
      console.error('Form submission network error:', error);
      alert('There was a network error. Please check your connection and try again.');
    }

    setIsSubmitting(false); // Stop loading state

    // Reset the "Submitted" message after 3 seconds
    setTimeout(() => {
      setIsSubmitted(false);
    }, 3000);
  };
  // --- END OF UPDATED ONSUBMIT FUNCTION ---

  return (
    <section id="contact" className="py-20 bg-gradient-to-br from-slate-50 to-purple-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-700 to-pink-600 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Ready to transform your business? Let's start the conversation and 
            explore how we can help you achieve extraordinary results.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          viewport={{ once: true }}
          className="bg-white rounded-2xl shadow-2xl p-8 md:p-12"
        >
          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="text-center py-12"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 mb-2">Message Sent!</h3>
              <p className="text-slate-600">We'll get back to you within 24 hours.</p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {/* --- All form fields are unchanged --- */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    {...register('name', { required: 'Name is required' })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="Your full name"
                    disabled={isSubmitting}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    {...register('email', { 
                      required: 'Email is required',
                      pattern: {
                        value: /^\S+@\S+$/i,
                        message: 'Invalid email address'
                      }
                    })}
                    className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200"
                    placeholder="your.email@company.com"
                    disabled={isSubmitting}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-700 mb-2">
                  Message *
                </label>
                <textarea
                  {...register('message', { required: 'Message is required' })}
                  rows={6}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 resize-none"
                  placeholder="Tell us about your business challenges and how we can help..."
                  disabled={isSubmitting}
                />
                {errors.message && (
                  <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                )}
              </div>

              
              {/* --- reCAPTCHA Component --- */}
              <div>
                <Controller
                  name="recaptcha"
                  control={control}
                  rules={{ required: 'Please complete the reCAPTCHA' }}
                  render={({ field: { onChange } }) => (
                    <ReCAPTCHA
                      ref={recaptchaRef}
                      sitekey={RECAPTCHA_SITE_KEY}
                      onChange={onChange} // This sets the token value in the form state
                    />
                  )}
                />
                {errors.recaptcha && (
                  <p className="text-red-500 text-sm mt-1">{errors.recaptcha.message}</p>
                )}
              </div>
              {/* --- End reCAPTCHA --- */}


              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold py-4 px-8 rounded-xl hover:from-purple-700 hover:to-purple-800 transition-all duration-300 shadow-lg hover:shadow-xl flex items-center justify-center space-x-2 disabled:opacity-50"
                disabled={isSubmitting} // Disable button while submitting
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <span>Drop Us a Line!</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;
