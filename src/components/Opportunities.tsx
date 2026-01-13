import React from 'react';

const Opportunities = () => {
  return (
    <section id="opportunities" className="relative w-full py-20 bg-white overflow-hidden text-slate-900">
      
      {/* Background Particles */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-20 w-72 h-72 bg-violet-400 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
        <div className="absolute top-20 right-20 w-72 h-72 bg-amber-300 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
      </div>

      <div className="relative container mx-auto px-6 z-10">
        
        {/* Section Header */}
        <div className="mb-16 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-4 gradient-text">
            Opportunities
          </h2>
          <div className="w-20 h-1 bg-violet-600 mx-auto rounded-full"></div>
          <p className="mt-4 text-slate-600 max-w-2xl mx-auto">
            Explore strategic partnerships and business opportunities with our global network.
          </p>
        </div>

        {/* Opportunity Card */}
        <div className="max-w-4xl mx-auto bg-white shadow-xl rounded-2xl border border-slate-200 p-8 md:p-12 glow-on-hover">
            
          {/* Opportunity Title */}
          <div className="mb-8 border-b border-slate-100 pb-8">
            <h3 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Global Tier-1 Contractor Seeking Australian Strategic Partner
            </h3>
            <p className="text-lg text-violet-600 font-medium">
              One of the Middle East & Africa’s largest Construction & Infrastructure Groups seeking entry into the Australian Market
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            
            {/* Target Project Sectors */}
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <span className="bg-violet-100 text-violet-600 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </span>
                Target Project Sectors
              </h4>
              <ul className="space-y-3 pl-2">
                {['Infrastructure', 'Transport', 'Water', 'Energy', 'PPP Projects'].map((item, index) => (
                  <li key={index} className="flex items-center text-slate-700">
                    <svg className="w-5 h-5 text-amber-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                    </svg>
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Preferred Partner Profile */}
            <div>
              <h4 className="text-xl font-bold text-slate-900 mb-4 flex items-center">
                <span className="bg-violet-100 text-violet-600 p-2 rounded-lg mr-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </span>
                Preferred Partner Profile
              </h4>
              <ul className="space-y-3 pl-2">
                <li className="flex items-start text-slate-700">
                  <svg className="w-5 h-5 text-violet-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Seeking Experienced Australian Partner with Local Expertise & Industry Connections</span>
                </li>
                <li className="flex items-start text-slate-700">
                  <svg className="w-5 h-5 text-violet-600 mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <span>Annual Turnover <strong className="text-slate-900">A$50m+</strong></span>
                </li>
              </ul>
            </div>

          </div>

          {/* Action Button */}
          <div className="mt-10 pt-8 border-t border-slate-100 flex justify-center">
            <a 
              href="https://www.linkedin.com/posts/xalt-ventures_please-refer-through-to-your-networks-this-activity-7416267784738779137-S6C8/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAAxV1sMBMO3A620WORt1mkNwl73UYSmjwI4"
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 text-base font-bold text-white transition-all duration-200 bg-gradient-to-r from-violet-600 to-purple-600 rounded-full hover:from-violet-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-600 glow-on-hover"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
              </svg>
              View Opportunity on LinkedIn
            </a>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Opportunities;