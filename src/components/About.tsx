import React, { useState } from 'react';
import { motion, useMotionValue} from 'framer-motion';
import { Target, Users, Globe, TrendingUp, Sparkles, ArrowRight, Star, Zap } from 'lucide-react';




interface Value {
  icon: React.ComponentType<any>;
  title: string;
  description: string;
  gradient: string;
  accentColor: string;
}

const About: React.FC = () => {
  const [hoveredValue, setHoveredValue] = useState<number | null>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const values: Value[] = [
    {
      icon: Target,
      title: 'Excellence',
      description: 'We deliver exceptional results through meticulous attention to detail and unwavering quality standards.',
      gradient: 'from-purple-500 via-purple-600 to-purple-700',
      accentColor: 'text-purple-600'
    },
    {
      icon: TrendingUp,
      title: 'Innovation',
      description: 'We embrace cutting-edge methodologies and creative solutions to drive transformative business outcomes.',
      gradient: 'from-slate-500 via-slate-600 to-slate-700',
      accentColor: 'text-slate-600'
    },
    {
      icon: Globe,
      title: 'Global Reach',
      description: 'Our international presence enables us to serve clients across diverse markets and cultural landscapes.',
      gradient: 'from-purple-400 via-purple-500 to-purple-600',
      accentColor: 'text-purple-500'
    },
    {
      icon: Users,
      title: 'Partnership',
      description: 'We build lasting relationships based on trust, transparency, and mutual success.',
      gradient: 'from-slate-600 via-purple-600 to-purple-700',
      accentColor: 'text-purple-700'
    }
  ];

  const handleMouseMove = (event: React.MouseEvent) => {
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(event.clientX - rect.left);
    mouseY.set(event.clientY - rect.top);
  };

  return (
    <section id="about" className="relative py-24 overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-white via-purple-50 to-slate-100">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(139,92,246,0.1),rgba(255,255,255,0))]"></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ 
            x: [0, 100, 0],
            y: [0, -50, 0],
            rotate: [0, 180, 360]
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-br from-purple-200 to-purple-300 rounded-full opacity-20 blur-xl"
        />
        <motion.div
          animate={{ 
            x: [0, -80, 0],
            y: [0, 100, 0],
            rotate: [360, 180, 0]
          }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-20 right-20 w-40 h-40 bg-gradient-to-br from-slate-200 to-slate-300 rounded-full opacity-15 blur-xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left Side - Enhanced Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
            onMouseMove={handleMouseMove}
          >
            {/* Main Image Container */}
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 via-slate-600 to-purple-600 rounded-3xl blur-xl opacity-25 group-hover:opacity-40 transition-opacity duration-500"></div>
              
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/20 backdrop-blur-sm">
                <img
                  src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Business consulting team"
                  className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-105"
                />
                
                {/* Overlay Gradient */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                
                {/* Floating Stats */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6, duration: 0.6 }}
                  viewport={{ once: true }}
                  className="absolute bottom-6 left-6 right-6"
                >
                  <div className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div>
                        <div className="text-2xl font-bold text-purple-600">150+</div>
                        <div className="text-sm text-slate-600">Projects</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-slate-700">50+</div>
                        <div className="text-sm text-slate-600">Clients</div>
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-purple-700">4</div>
                        <div className="text-sm text-slate-600">Countries</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Floating Badge */}
              <motion.div
                initial={{ scale: 0, rotate: -180 }}
                whileInView={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.8, duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-500 via-purple-600 to-slate-700 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
              >
                <Sparkles className="w-10 h-10 text-white" />
              </motion.div>
            </div>
          </motion.div>

          {/* Right Side - Enhanced Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            {/* Section Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="inline-flex items-center space-x-2 bg-gradient-to-r from-purple-100 to-slate-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium mb-6 border border-purple-200"
            >
              <Star className="w-4 h-4" />
              <span>About Xalt Ventures</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-slate-800 via-purple-600 to-slate-900 bg-clip-text text-transparent">
                Our Story
              </span>
            </h2>
            
            <div className="space-y-6 mb-10">
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 leading-relaxed relative pl-6 border-l-4 border-purple-400"
              >
                Founded out of a passion for helping businesses succeed with personalized,
                results-driven consulting. Xalt Ventures combines deep industry expertise
                with innovative strategies to unlock unprecedented growth for our clients.
              </motion.p>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                viewport={{ once: true }}
                className="text-lg text-slate-600 leading-relaxed relative pl-6 border-l-4 border-slate-400"
              >
                With offices in Melbourne and Xiamen, we bridge Eastern and Western business
                practices, offering unique insights that drive sustainable success in today's
                interconnected global economy.
              </motion.p>
            </div>

            {/* Call to Action */}
           <a href="#services">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-12"
            >
              <button className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-slate-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <span>Discover Our Impact</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-purple-700 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </button>
            </motion.div>
          </a> 

            {/* Enhanced Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ delay: 0.3 + index * 0.1, duration: 0.7 }}
                  viewport={{ once: true }}
                  onHoverStart={() => setHoveredValue(index)}
                  onHoverEnd={() => setHoveredValue(null)}
                  className="relative group cursor-pointer"
                >
                  {/* Glow Effect */}
                  <div className={`absolute -inset-2 bg-gradient-to-r ${value.gradient} rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-all duration-500`}></div>
                  
                  <div className="relative bg-white/80 backdrop-blur-lg rounded-2xl p-6 border border-white/30 shadow-lg hover:shadow-2xl transition-all duration-500 group-hover:bg-white/90 group-hover:scale-105">
                    {/* Icon Container */}
                    <motion.div
                      animate={hoveredValue === index ? { scale: 1.2, rotate: 360 } : { scale: 1, rotate: 0 }}
                      transition={{ duration: 0.6, type: "spring" }}
                      className={`w-14 h-14 bg-gradient-to-br ${value.gradient} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                    >
                      <value.icon className="w-7 h-7 text-white" />
                    </motion.div>
                    
                    {/* Content */}
                    <h3 className={`font-bold text-lg mb-3 text-center ${value.accentColor} group-hover:scale-105 transition-transform duration-300`}>
                      {value.title}
                    </h3>
                    
                    <p className="text-sm text-slate-600 leading-relaxed text-center group-hover:text-slate-700 transition-colors duration-300">
                      {value.description}
                    </p>

                    {/* Hover Indicator */}
                    <motion.div
                      initial={{ width: 0 }}
                      animate={hoveredValue === index ? { width: "100%" } : { width: 0 }}
                      transition={{ duration: 0.4 }}
                      className={`h-1 bg-gradient-to-r ${value.gradient} rounded-full mt-4 mx-auto`}
                    />

                    {/* Corner Accent */}
                    <div className={`absolute top-3 right-3 w-2 h-2 bg-gradient-to-br ${value.gradient} rounded-full opacity-60 group-hover:opacity-100 transition-opacity duration-300`}></div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Bottom Section - Achievement Banner */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-20 relative"
        >
          <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl border border-slate-700 overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(139,92,246,0.3),transparent_50%)]"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.1)_50%,transparent_75%)] bg-[length:60px_60px]"></div>
            </div>

            <div className="relative z-10 grid md:grid-cols-3 gap-8 items-center text-center md:text-left">
              <div>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 bg-gradient-to-br from-purple-500 to-slate-600 rounded-2xl flex items-center justify-center mx-auto md:mx-0 mb-4"
                >
                  <Zap className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className="text-2xl font-bold text-white mb-2">Proven Excellence</h3>
                <p className="text-slate-300">Transforming businesses with innovative solutions and strategic excellence.</p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-center md:justify-start space-x-4">
                  <div className="flex -space-x-2">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div
                        key={i}
                        className={`w-10 h-10 rounded-full border-3 border-white bg-gradient-to-br ${
                          i % 2 === 0 ? 'from-purple-500 to-purple-700' : 'from-slate-500 to-slate-700'
                        } flex items-center justify-center text-white font-bold text-sm`}
                      >
                        {i}
                      </div>
                    ))}
                  </div>
                  <div className="text-white">
                    <div className="font-bold">5-Star Rating</div>
                    <div className="text-sm text-slate-300">Client Satisfaction</div>
                  </div>
                </div>
                
                <div className="flex justify-center md:justify-start">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.div
                      key={star}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.1 * star, duration: 0.4 }}
                      viewport={{ once: true }}
                    >
                      <Star className="w-6 h-6 text-purple-400 fill-purple-400" />
                    </motion.div>
                  ))}
                </div>
              </div>


             
                
                    
              <div className="text-center md:text-right">
                <a href="#contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center space-x-3 bg-gradient-to-r from-purple-600 to-slate-700 text-white px-8 py-4 rounded-2xl font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                  >
                    <span className="relative z-10">Start Your Journey</span>
                    <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform duration-300" />

                    {/* Hover Effect */}
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                    {/* Shimmer Effect */}
                    <div className="absolute inset-0 -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent group-hover:animate-[shimmer_1s_ease-in-out] -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                  </motion.button>
                </a>

                
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { transform: translateX(-100%) skewX(-12deg); }
          100% { transform: translateX(200%) skewX(-12deg); }
        }
      `}</style>
    </section>
  );
};

export default About;