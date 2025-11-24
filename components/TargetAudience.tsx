import React from 'react';
import { AUDIENCES, WHATSAPP_URL } from '../constants';
import { CheckCircle2, MessageCircle } from 'lucide-react';

export const TargetAudience: React.FC = () => {
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  return (
    <section id="schools" className="py-20 bg-white scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-brand-600 font-semibold uppercase tracking-wider text-sm">Who is this for?</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3">
            Learning Pathways for Everyone
          </h2>
          <p className="text-slate-600 mt-4">
            Whether you're a student, a professional, or an educational institution, we have a tailored approach to help you harness the power of AI.
          </p>
          <div className="mt-6">
             <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-green-600 font-bold hover:underline"
              >
                <MessageCircle className="w-5 h-5" />
                Get a Free Trial Today Before Registration
              </a>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {AUDIENCES.map((audience) => (
            <div 
              key={audience.id} 
              className="relative group flex flex-col rounded-2xl border border-slate-200 bg-white overflow-hidden hover:shadow-2xl transition-shadow duration-300"
            >
              <div className={`h-2 w-full ${audience.color}`}></div>
              <div className="p-8 flex-grow">
                <h3 className="text-2xl font-bold text-slate-900 mb-3">{audience.title}</h3>
                <p className="text-slate-600 mb-6">{audience.description}</p>
                
                <ul className="space-y-3 mb-8">
                  {audience.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <CheckCircle2 className={`w-5 h-5 shrink-0 ${audience.id === 'schools' ? 'text-accent-500' : 'text-brand-500'}`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="p-8 pt-0 mt-auto space-y-3">
                <a 
                  href={audience.url}
                  onClick={(e) => handleScroll(e, audience.url)}
                  className={`w-full block text-center py-3 rounded-lg font-semibold transition-colors text-white ${audience.color} hover:opacity-90 shadow-md`}
                >
                  {audience.cta}
                </a>
                 <a 
                  href={WHATSAPP_URL}
                  className="w-full block text-center py-2 rounded-lg font-medium text-sm text-slate-500 hover:text-green-600 hover:bg-green-50 transition-colors"
                >
                  Chat on WhatsApp
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};