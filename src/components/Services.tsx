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
  Play,Cpu,Plane,ShieldCheck,HeartHandshake
} from 'lucide-react';

const Services: React.FC = () => {
  const [selectedPartner, setSelectedPartner] = React.useState<string | null>(null);

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
  title: 'AI Powered Automation and industrial IOT Solutions',
  description: 'Althinect empowers industries to transition from legacy systems to Industry 4.0 and beyond through smart Industrial IoT, AI, and ERP solutions that enhance connectivity, efficiency, and real-time decision-making. By integrating AI-driven process automation with Industrial IoT solutions, we enable real-time monitoring and smart data-driven decision-making.',
  features: ['AI Industry 5.0 / Industrial IoT', 'AI Insights', 'Smart Operations']
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
  title: 'Automate. Optimize. Grow ',
  description: 'We empower your enterprise to make AI real, scalable, and accountable by uniting human and machine intelligence for orchestrated, explainable, and outcome-driven performance. With intelligent AI automation that connects systems, streamlines workflows, and drives real-time decisions — making your business smarter, faster, and effortlessly scalable',
  features: ['Automate complex workflows', 'Smart decision making', 'Scale operations']
},
{
  icon: HeartHandshake,
  title: 'Romance. Adventure. Luxury.',
  description: 'Indulge in a luxurious escape where romance meets adventure, wildlife, and culture — from serene beaches to untamed safaris and vibrant local traditions. Your perfect honeymoon awaits with bespoke experiences blending luxury, exploration, and authentic connection.',
  features: ['Luxurious escapes infused with romance and adventure', 'Encounter wildlife and immerse in rich local culture', 'Curated experiences for unforgettable honeymoons']
},

/*  //
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
   */  //

];

  const partnerInfo = {
    althinect: {
      name: 'Althinect',
      title: 'Industrial IoT & AI Solutions',
      description: 'Althinect specializes in Industrial IoT (IIoT) and AI solutions to facilitate the digital transformation of businesses. They aim to enhance business operations by making them smarter, faster, connected, and scalable.',
      services: [
        'Custom IoT Solutions',
        'Virtual IoT Architecture Design',
        'Industrial IoT Solutions',
        'ERP Integration',
        'AI-driven Predictive Analytics',
        'Industrial Automation and Control',
        'Smart Manufacturing',
        'Smart Asset Management'
      ],
      sectors: ['Manufacturing', 'Logistics', 'Asset Management', 'Infrastructure']
    },
    louis_bianco: {
      name: 'Louis Bianco',
      title: 'Australian Quality Products & Manufacturing',
      description: 'Louis Bianco is an Australian company that supplies a range of products conforming to Australian quality and technical standards. They manufacture products to any required specification and supply them to markets worldwide.',
      services: [
        'Bespoke Product Manufacturing',
        'Australian Quality Standards',
        'Global Supply Chain',
        'Wholesale Distribution',
        'Custom Specifications'
      ],
      locations: ['Melbourne, Australia (Head Office)', 'Xiamen, China']
    },
    sierra: {
      name: 'Sierra Construction',
      title: 'Telecommunication Engineering',
      description: 'Sierra Construction is a leading engineering and construction company in Sri Lanka with over 40 years of experience. The company has a strong presence in various sectors and is committed to delivering high-quality, sustainable infrastructure projects.',
      services: [
        'Fiber Optic Networks',
        'Microwave & Optical Transmission',
        'Mobile Tower Infrastructure',
        'Data Centers',
        'Water Supply & Sewerage',
        'Roads & Bridges',
        'Civil Engineering',
        'Electrical Engineering'
      ],
      experience: '40+ years of excellence'
    }
  };

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
        
        {/* Partners Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mt-32 mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 text-center">
            Our Partners
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed text-center mb-12">
            Collaborating with industry leaders to deliver excellence
          </p>
          
          <div className="relative overflow-hidden">
            {/* Gradient overlays for fade effect */}
            <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
            <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
            
            {/* Scrolling container */}
            <div className="flex animate-scroll">
              {/* First set of logos */}
              <div className="flex items-center justify-around min-w-full px-8">
                <img 
                  src="/althinect_logo_1.png" 
                  alt="Althinect" 
                  onClick={() => setSelectedPartner('althinect')}
                  className="h-8 md:h-12 object-contain transition-all duration-300 hover:scale-110 cursor-pointer" 
                />
                <img 
                  src="/louis_bianco_logo.png" 
                  alt="Louis Bianco" 
                  onClick={() => setSelectedPartner('louis_bianco')}
                  className="h-23 md:h-24 object-contain transition-all duration-300 hover:scale-110 cursor-pointer" 
                />
                <img 
                  src="/sierra_logo.png" 
                  alt="Sierra" 
                  onClick={() => setSelectedPartner('sierra')}
                  className="h-23 md:h-24 object-contain transition-all duration-300 hover:scale-110 cursor-pointer" 
                />
              </div>
              {/* Duplicate set for seamless loop */}
              <div className="flex items-center justify-around min-w-full px-8">
                <img 
                  src="/althinect_logo_1.png" 
                  alt="Althinect" 
                  onClick={() => setSelectedPartner('althinect')}
                  className="h-8 md:h-12 object-contain transition-all duration-300 hover:scale-110 cursor-pointer" 
                />
                <img 
                  src="/louis_bianco_logo.png" 
                  alt="Louis Bianco" 
                  onClick={() => setSelectedPartner('louis_bianco')}
                  className="h-23 md:h-24 object-contain transition-all duration-300 hover:scale-110 cursor-pointer" 
                />
                <img 
                  src="/sierra_logo.png" 
                  alt="Sierra" 
                  onClick={() => setSelectedPartner('sierra')}
                  className="h-23 md:h-24 object-contain transition-all duration-300 hover:scale-110 cursor-pointer" 
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Partner Info Modal */}
        {selectedPartner && (
          <div 
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedPartner(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-8">
                {/* Header with Logo and Close Button */}
                <div className="flex justify-end items-center gap-4 mb-6">
                  <img 
                    src={
                      selectedPartner === 'althinect' ? '/althinect_logo_1.png' :
                      selectedPartner === 'louis_bianco' ? '/louis_bianco_logo.png' :
                      '/sierra_logo.png'
                    }
                    alt={partnerInfo[selectedPartner as keyof typeof partnerInfo].name}
                    className={
                      selectedPartner === 'althinect' 
                      ? 'h-8 md:h-12 object-contain' // <-- Smaller size for Althinect
                      : 'h-16 md:h-20 object-contain' // <-- Original larger size for others
                    }
                  />
                  <button
                    onClick={() => setSelectedPartner(null)}
                    className="text-slate-400 hover:text-slate-600 transition-colors ml-4"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>

                <div>
                  
                    <a href={
                      selectedPartner === 'althinect' ? 'https://althinect.com' :
                      selectedPartner === 'louis_bianco' ? 'https://louisbianco.com.au' :
                      'https://construction.sierra.lk/service/telecommunication-engineering/'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl font-bold text-slate-800 hover:text-purple-600 transition-colors inline-flex items-center gap-2 mb-2"
                  >
                    {partnerInfo[selectedPartner as keyof typeof partnerInfo].name}
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                  <p className="text-lg text-purple-600 font-semibold mb-6">
                    {partnerInfo[selectedPartner as keyof typeof partnerInfo].title}
                  </p>
                  
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {partnerInfo[selectedPartner as keyof typeof partnerInfo].description}
                  </p>

                  {/* Services/Offerings */}
                  <div className="mb-6">
                    <h4 className="text-xl font-bold text-slate-800 mb-4">Services & Solutions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {partnerInfo[selectedPartner as keyof typeof partnerInfo].services.map((service, idx) => (
                        <div key={idx} className="flex items-start">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                          <span className="text-slate-600">{service}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Additional Info */}
                  {'sectors' in partnerInfo[selectedPartner as keyof typeof partnerInfo] && (
                    <div className="bg-purple-50 rounded-xl p-4 mb-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Key Sectors</h4>
                      <p className="text-slate-600">
                        {(partnerInfo[selectedPartner as keyof typeof partnerInfo] as any).sectors.join(' • ')}
                      </p>
                    </div>
                  )}

                  {'locations' in partnerInfo[selectedPartner as keyof typeof partnerInfo] && (
                    <div className="bg-purple-50 rounded-xl p-4 mb-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Locations</h4>
                      {(partnerInfo[selectedPartner as keyof typeof partnerInfo] as any).locations.map((loc: string, idx: number) => (
                        <p key={idx} className="text-slate-600">{loc}</p>
                      ))}
                    </div>
                  )}

                  {'experience' in partnerInfo[selectedPartner as keyof typeof partnerInfo] && (
                    <div className="bg-purple-50 rounded-xl p-4 mb-4">
                      <h4 className="font-semibold text-slate-800 mb-2">Experience</h4>
                      <p className="text-slate-600">
                        {(partnerInfo[selectedPartner as keyof typeof partnerInfo] as any).experience}
                      </p>
                    </div>
                  )}

                  {/* Visit Website Link */}
                  <div className="mt-6 pt-6 border-t border-slate-200">

                     <a href={
                        selectedPartner === 'althinect' ? 'https://althinect.com' :
                        selectedPartner === 'louis_bianco' ? 'https://louisbianco.com.au' :
                        'https://construction.sierra.lk/service/telecommunication-engineering/'
                      }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-semibold rounded-full hover:from-purple-700 hover:to-purple-800 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                    >
                      Visit Website
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}

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