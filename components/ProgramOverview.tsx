import React from 'react';
import { Target, Rocket, Lightbulb, MessageCircle } from 'lucide-react';
import { TECH_KID_IMAGES, WHATSAPP_URL } from '../constants';

export const ProgramOverview: React.FC = () => {
  return (
    <section id="overview" className="py-20 bg-slate-50 scroll-mt-28">
      <div className="container mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <div className="lg:w-1/2">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mb-6">
              More Than Just Coding. <br/>
              <span className="text-brand-600">Future-Ready Skills.</span>
            </h2>
            <p className="text-slate-600 text-lg leading-relaxed mb-6">
              Our weekend program is meticulously designed to equip young learners with practical skills in Artificial Intelligence (AI) and digital creation. 
            </p>
            <p className="text-slate-600 text-lg leading-relaxed mb-8">
              Through a <strong className="text-slate-900">100% Virtual</strong> project-based approach, students move from being passive consumers of technology to becoming <strong className="text-slate-900">confident creators</strong>, learning to use AI tools responsibly to build, innovate, and express their ideas.
            </p>
            
            <div className="space-y-4 mb-8">
              {[
                { icon: Target, text: "Project-Based Learning Approach" },
                { icon: Rocket, text: "Practical, Hands-on Experience" },
                { icon: Lightbulb, text: "Responsible AI Usage & Ethics" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3">
                  <div className="bg-brand-100 p-2 rounded-lg text-brand-600">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-slate-800">{item.text}</span>
                </div>
              ))}
            </div>

            <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold transition-colors shadow-md"
            >
              <MessageCircle className="w-5 h-5" />
              Chat Us on WhatsApp Now
            </a>
          </div>
          
          <div className="lg:w-1/2 grid grid-cols-2 gap-4">
            <img 
              src={TECH_KID_IMAGES[4]} 
              alt="Student using AI" 
              className="rounded-2xl shadow-xl translate-y-8 object-cover h-80 w-full"
            />
            <img 
              src={TECH_KID_IMAGES[5]} 
              alt="Group collaboration" 
              className="rounded-2xl shadow-xl -translate-y-8 object-cover h-80 w-full"
            />
          </div>
        </div>
      </div>
    </section>
  );
};