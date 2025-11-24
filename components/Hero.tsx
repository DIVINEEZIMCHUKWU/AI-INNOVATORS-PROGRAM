import React from 'react';
import { ENROLL_URL, TECH_KID_IMAGES, WHATSAPP_URL } from '../constants';
import { ArrowRight, MessageCircle } from 'lucide-react';

export const Hero: React.FC = () => {
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
    <section className="relative bg-slate-900 pt-24 pb-16 lg:pt-32 lg:pb-24 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-full z-0 pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-brand-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[-10%] left-[-10%] w-[700px] h-[700px] bg-accent-500/10 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          
          {/* Text Content */}
          <div className="lg:w-1/2 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-6 backdrop-blur-sm">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
              <span className="text-white text-xs font-bold tracking-wide uppercase">Admissions Open for Next Cohort</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-extrabold text-white tracking-tight mb-6 leading-[1.1]">
              Empower Your Child to Become an <span className="text-white">AI Innovator</span>
            </h1>
            
            <p className="text-lg text-slate-300 mb-8 leading-relaxed">
              Transform from a technology consumer to a confident creator. A comprehensive <span className="text-white font-semibold">100% Virtual</span> weekend program for ages 7-20, adults, and schools. 
              <span className="block mt-2 text-brand-300 font-medium">🚫 No disruption to academic activities.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <a 
                href={ENROLL_URL}
                onClick={(e) => handleScroll(e, ENROLL_URL)}
                className="w-full sm:w-auto px-8 py-4 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-bold text-lg transition-all shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2"
              >
                Enroll Now <ArrowRight className="w-5 h-5" />
              </a>
              <a 
                href="#modules"
                onClick={(e) => handleScroll(e, '#modules')}
                className="w-full sm:w-auto px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-xl font-semibold text-lg transition-all flex items-center justify-center gap-2 backdrop-blur-sm"
              >
                Explore Syllabus
              </a>
            </div>
            
            <div className="mt-8 flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
               <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="text-sm font-semibold text-green-400 hover:text-green-300 flex items-center gap-2 transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
                Get a FREE TRIAL today before registration
              </a>
            </div>
          </div>

          {/* Image Grid Visuals */}
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4 p-4 bg-white/5 rounded-3xl border border-white/10 backdrop-blur-sm">
              <div className="space-y-4 translate-y-8">
                <img src={TECH_KID_IMAGES[0]} alt="Kid learning AI" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 object-cover h-48 w-full" />
                <img src={TECH_KID_IMAGES[1]} alt="VR Future" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 object-cover h-64 w-full" />
              </div>
              <div className="space-y-4 -translate-y-8">
                 <img src={TECH_KID_IMAGES[2]} alt="Coding logic" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 object-cover h-64 w-full" />
                 <img src={TECH_KID_IMAGES[3]} alt="Robotics fun" className="rounded-2xl shadow-lg hover:scale-105 transition-transform duration-500 object-cover h-48 w-full" />
              </div>
            </div>
          </div>

        </div>
      </div>
      
      {/* Curve separator */}
      <div className="absolute bottom-0 left-0 w-full leading-none rotate-180 text-slate-50">
        <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none" className="relative block h-[60px] w-full fill-current">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"></path>
        </svg>
      </div>
    </section>
  );
};