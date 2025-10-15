import React from 'react';
import { motion } from 'framer-motion';
import { 
  BarChart3, 
  Target, 
  Lightbulb, 
  Users, 
  TrendingUp, 
  Globe,
  Briefcase,
  Package,
  Play,Cpu,Plane,ShieldCheck
} from 'lucide-react';

const Services: React.FC = () => {
  const services =[
  // New additions (original 3)
  {
  icon: Package,
  title: 'High Quality Building Materials',
  description: 'With a cohort of property developers and building material importers globally, our unique services have enabled us to provide high quality building materials to markets in UAE, Indonesia, Malaysia and Africa.',
  features: ['Global Sourcing', 'Quality Assurance', 'Reliable Supply']
},
{
  icon: Briefcase,
  title: 'Business and Management',
  description: 'Our team consists of experienced consultants with diverse backgrounds in various industries. We combine our expertise to deliver innovative solutions to our clients, and pride ourselves at providing c-suite advice to start-ups.',
  features: ['Consulting Services', 'C-Suite Advice', 'Industry Expertise']
},
{
  icon: Play,
  title: 'Sports & Recreation',
  description: 'With a wide network of suppliers and manufacturers that we have built close relationships with over the last 20 years; an emerging demand we cater to, is in the A-Z set-up of recreational and sports facilities.',
  features: ['Facility Setup', 'Supplier Network', 'Equipment Supply']
},

{
  icon: Cpu,
  title: 'Intelligent Automation & IoT Solutions',
  description: 'We help businesses unlock the potential of intelligent automation and connected systems. By integrating AI-driven process automation with Industrial IoT solutions, we enable real-time monitoring and smart data-driven decision-making. Our solutions reduce downtime, optimize resources, and transform operations into smarter, more efficient, and future-ready ecosystems.',
  features: ['AI Automation', 'Industrial IoT', 'Smart Operations']
},
{
  icon: Plane,
  title: 'Aviation Safety & Quality Database',
  description: 'A cloud-based platform built for the aviation sector to simplify safety, quality, and compliance management. From airlines and charter operators to MROs, flight schools, and airport operators, our system centralizes incident reporting, audits, hazard tracking, training, supplier oversight, and asset management.',
  features: ['Safety Management', 'Compliance Tracking', 'Aviation Quality']
},
{
  icon: ShieldCheck,
  title: 'Enterprise Incident & WHS Management Platform',
  description: 'A cloud-based solution that enables organizations to manage audits, incidents, investigations, hazards, suppliers, assets, training, Work Health & Safety (WHS), and compliance from a single platform. Built for commercial and industrial enterprises, it improves visibility, strengthens accountability, and supports a culture of safety and operational excellence.',
  features: ['Incident Management', 'WHS Compliance', 'Operational Excellence']
},

// Existing 6 services
{
  icon: BarChart3,
  title: 'Business Strategy',
  description: 'Comprehensive strategic planning and market analysis to position your business for sustainable growth and competitive advantage.',
  features: ['Market Analysis', 'Strategic Planning', 'Competitive Intelligence']
},
{
  icon: TrendingUp,
  title: 'Market Growth',
  description: 'Accelerate your market expansion with data-driven growth strategies and innovative market penetration techniques.',
  features: ['Growth Strategies', 'Market Expansion', 'Revenue Optimization']
},
{
  icon: Lightbulb,
  title: 'Innovation Consulting',
  description: 'Transform your business through digital innovation, process optimization, and cutting-edge technology adoption.',
  features: ['Digital Transformation', 'Process Innovation', 'Technology Integration']
},
{
  icon: Users,
  title: 'Leadership Development',
  description: 'Build exceptional leadership capabilities and high-performing teams that drive organizational excellence.',
  features: ['Executive Coaching', 'Team Building', 'Leadership Training']
},
{
  icon: Globe,
  title: 'Global Expansion',
  description: 'Navigate international markets with confidence through our expertise in cross-cultural business strategies.',
  features: ['International Strategy', 'Cultural Integration', 'Global Operations']
},
{
  icon: Target,
  title: 'Performance Optimization',
  description: 'Maximize operational efficiency and business performance through systematic analysis and strategic improvements.',
  features: ['Process Optimization', 'Performance Metrics', 'Efficiency Enhancement']
}

];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">
            What We Do
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            We provide comprehensive consulting services designed to transform your business 
            and unlock its full potential in the global marketplace.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border border-slate-100 hover:border-purple-200 hover:-translate-y-2"
            >
              <div className="relative">
                <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl flex items-center justify-center mb-6 group-hover:from-purple-600 group-hover:to-purple-700 transition-all duration-500">
                  <service.icon className="w-8 h-8 text-purple-600 group-hover:text-white transition-colors duration-500" />
                </div>
                
                <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-purple-600 transition-colors duration-300">
                  {service.title}
                </h3>
                
                <p className="text-slate-600 mb-6 leading-relaxed">
                  {service.description}
                </p>
                
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center text-sm text-slate-500">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mr-3"></div>
                      {feature}
                    </li>
                  ))}
                </ul>

                {/* Hover Effect Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 to-amber-400/5 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <a
            href="#contact"
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            Get Started Today
            <TrendingUp className="w-5 h-5 ml-2" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;