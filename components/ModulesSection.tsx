import React from 'react';
import { MODULES, WHATSAPP_URL, TECH_KID_IMAGES } from '../constants';
import { MessageCircle } from 'lucide-react';

export const ModulesSection: React.FC = () => {
  return (
    <section id="modules" className="py-20 bg-slate-50 scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-brand-600 font-semibold uppercase tracking-wider text-sm">Curriculum</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3">
            Detailed Module Breakdown
          </h2>
          <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
            A comprehensive journey from the foundations of web development to advanced AI prompt engineering and multimedia creation.
          </p>
           <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 mt-4 text-green-600 font-bold border-b-2 border-green-100 hover:border-green-500 transition-all"
            >
              <MessageCircle className="w-4 h-4" />
              Questions about the syllabus? Chat us on WhatsApp now
            </a>
        </div>

        <div className="space-y-12">
          {MODULES.map((module, index) => (
            <div 
              key={module.id}
              className={`flex flex-col lg:flex-row gap-10 items-start ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
            >
              {/* Visual / Icon Side */}
              <div className="w-full lg:w-1/3">

                <div className="bg-white p-8 rounded-2xl shadow-lg border border-slate-100 text-center lg:text-left">
                  <div className="w-16 h-16 mx-auto lg:mx-0 bg-brand-50 rounded-xl flex items-center justify-center mb-6 text-brand-600">
                    <module.icon className="w-8 h-8" />
                  </div>
                  <span className="text-brand-600 font-bold tracking-wide text-sm uppercase mb-2 block">
                    Module {module.id}
                  </span>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">{module.title}</h3>
                  <p className="text-slate-500 font-medium">{module.subtitle}</p>

                  {/* Visual for this module using remaining TECH_KID_IMAGES[6-8] */}
                  <div className="mt-6">
                    <img
                      src={TECH_KID_IMAGES[6 + (index % 3)]}
                      alt="AI learning visual"
                      className="w-full h-40 object-cover rounded-xl shadow-md"
                    />
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-slate-100 lg:hidden">
                     <a href={WHATSAPP_URL} className="text-sm text-green-600 font-semibold flex items-center justify-center gap-2">
                       <MessageCircle className="w-4 h-4" /> Get Free Trial
                     </a>
                  </div>
                </div>
              </div>

              {/* Content Side */}
              <div className="w-full lg:w-2/3">
                <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                  {module.items.map((item, idx) => (
                    <div 
                      key={idx} 
                      className={`p-8 ${idx !== module.items.length - 1 ? 'border-b border-slate-100' : ''} hover:bg-brand-50/30 transition-colors`}
                    >
                      <h4 className="text-xl font-bold text-slate-800 mb-2">{item.title}</h4>
                      <p className="text-slate-600 leading-relaxed">{item.description}</p>
                    </div>
                  ))}
                  <div className="bg-slate-50 p-4 text-center border-t border-slate-100">
                     <a href={WHATSAPP_URL} className="text-sm font-semibold text-brand-600 hover:text-brand-700">
                        Learn more about Module {module.id} on WhatsApp &rarr;
                     </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};