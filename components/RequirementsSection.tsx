import React from 'react';
import { Laptop, Wifi, UserCheck, Clock, ShieldCheck, MessageCircle } from 'lucide-react';
import { ENROLL_URL, WHATSAPP_URL } from '../constants';

export const RequirementsSection: React.FC = () => {
  const requirements = [
    { icon: UserCheck, title: "Age Group", desc: "Ages 7-20 (Adults also welcome)" },
    { icon: Laptop, title: "Equipment", desc: "Access to Computer, Laptop, or Tablet" },
    { icon: Wifi, title: "Internet", desc: "Stable connection for Virtual sessions" },
    { icon: ShieldCheck, title: "Consent", desc: "Parental consent for minors" },
    { icon: Clock, title: "Commitment", desc: "Agree to program duration" },
  ];

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
    <section id="requirements" className="py-20 bg-slate-900 text-white scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold mb-8">
              Program Requirements
            </h2>
            <p className="text-slate-300 text-lg mb-10">
              To ensure a successful and smooth <strong className="text-white">Virtual Learning</strong> experience for everyone, participants must meet the following simple requirements.
            </p>

            <div className="grid sm:grid-cols-2 gap-6 mb-8">
              {requirements.map((req, i) => (
                <div key={i} className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/50 border border-slate-700">
                  <div className="text-brand-400 mt-1">
                    <req.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg">{req.title}</h4>
                    <p className="text-slate-400 text-sm">{req.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            
             <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white px-6 py-3 rounded-full font-bold transition-all"
              >
                <MessageCircle className="w-5 h-5" />
                Chat Us on WhatsApp Now
              </a>
          </div>

          <div className="lg:w-1/2 bg-brand-600 rounded-3xl p-10 lg:p-12 text-center flex flex-col justify-center items-center shadow-2xl shadow-brand-900/50 relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
            
            <div className="relative z-10">
              <h3 className="text-3xl font-bold mb-4">Ready to Innovate?</h3>
              <p className="text-brand-100 mb-8 text-lg">
                Unlock your child's creative potential with AI today. Spots fill up quickly for our weekend cohorts.
              </p>
              <a 
                href={ENROLL_URL}
                onClick={(e) => handleScroll(e, ENROLL_URL)}
                className="inline-block bg-white text-brand-600 font-bold text-xl px-10 py-4 rounded-full hover:bg-brand-50 transition-colors transform hover:scale-105 shadow-lg mb-4"
              >
                Enroll Now
              </a>
               <a 
                href={WHATSAPP_URL}
                className="block text-brand-100 hover:text-white font-semibold underline"
              >
                 Get a Free Trial Today
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};