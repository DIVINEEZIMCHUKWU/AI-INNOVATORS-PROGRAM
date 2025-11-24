
import React from 'react';
import { PHONES, CONTACT_EMAIL, LOCATION, WHATSAPP_URL, ENROLL_URL, INSTAGRAM_URL, FACEBOOK_URL } from '../constants';
import { Mail, Phone, MapPin, Facebook, Instagram, MessageCircle } from 'lucide-react';

export const Footer: React.FC = () => {
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
    <footer className="bg-slate-950 text-slate-400 pt-16 pb-8">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-white text-xl font-bold mb-4">AI Young Innovators</h3>
            <p className="text-sm leading-relaxed mb-6">
              Equipping the next generation with the tools, ethics, and skills to thrive in an AI-driven world. <strong className="text-white">Virtual & Future-Ready.</strong>
            </p>
             <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white text-sm px-4 py-2 rounded-lg transition-colors mb-6"
            >
              <MessageCircle className="w-4 h-4" />
              Get a Free Trial
            </a>

            <div className="flex gap-4">
              <a href={FACEBOOK_URL} target="_blank" rel="noreferrer" className="hover:text-blue-500 transition-colors" title="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href={WHATSAPP_URL} target="_blank" rel="noreferrer" className="hover:text-green-400 transition-colors" title="Chat on WhatsApp">
                <MessageCircle className="w-5 h-5" />
              </a>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" className="hover:text-pink-500 transition-colors" title="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#" onClick={(e) => handleScroll(e, '#')} className="hover:text-brand-400 transition-colors">Home</a></li>
              <li><a href="#modules" onClick={(e) => handleScroll(e, '#modules')} className="hover:text-brand-400 transition-colors">Syllabus</a></li>
              <li><a href="#schools" onClick={(e) => handleScroll(e, '#schools')} className="hover:text-brand-400 transition-colors">For Schools</a></li>
              <li><a href="#requirements" onClick={(e) => handleScroll(e, '#requirements')} className="hover:text-brand-400 transition-colors">Requirements</a></li>
              <li><a href={ENROLL_URL} onClick={(e) => handleScroll(e, ENROLL_URL)} className="hover:text-brand-400 transition-colors">Enroll Now</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold mb-4">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-brand-500 shrink-0" />
                <div className="flex flex-col">
                  {PHONES.map(phone => (
                    <span key={phone}>{phone}</span>
                  ))}
                </div>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-brand-500 shrink-0" />
                <span className="break-all">{CONTACT_EMAIL}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-brand-500 shrink-0" />
                <span>{LOCATION}</span>
              </li>
            </ul>
             <a 
              href={WHATSAPP_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-4 inline-block text-green-500 font-semibold hover:text-green-400 text-sm"
            >
              Chat with us on WhatsApp &rarr;
            </a>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 text-center text-xs">
          <p>&copy; {new Date().getFullYear()} AI Young Innovators Program. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
