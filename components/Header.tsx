import React, { useState, useEffect } from 'react';
import { Menu, X, Sparkles, MessageCircle } from 'lucide-react';
import { ENROLL_URL, WHATSAPP_URL } from '../constants';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
      setIsMobileMenuOpen(false);
    }
  };

  const navLinks = [
    { name: 'Overview', href: '#overview' },
    { name: 'Modules', href: '#modules' },
    { name: 'For Schools', href: '#schools' },
    { name: 'Requirements', href: '#requirements' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-6 flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
          <div className="bg-brand-600 p-1.5 rounded-lg">
            <Sparkles className="w-6 h-6 text-white" />
          </div>
          <span className={`font-bold text-xl tracking-tight ${isScrolled ? 'text-slate-900' : 'text-white'}`}>
            AI Innovators
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden lg:flex items-center gap-6">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className={`text-sm font-medium hover:text-brand-500 transition-colors ${
                isScrolled ? 'text-slate-600' : 'text-white/90 hover:text-white'
              }`}
            >
              {link.name}
            </a>
          ))}
          
           <a 
            href={WHATSAPP_URL}
            target="_blank"
            rel="noreferrer"
            className={`flex items-center gap-1 text-sm font-bold ${isScrolled ? 'text-green-600' : 'text-green-400'}`}
          >
            <MessageCircle className="w-4 h-4" /> Free Trial
          </a>

          <a 
            href={ENROLL_URL}
            onClick={(e) => handleNavClick(e, ENROLL_URL)}
            className={`px-5 py-2.5 rounded-full font-semibold text-sm transition-all transform hover:scale-105 ${
              isScrolled 
                ? 'bg-brand-600 text-white hover:bg-brand-700' 
                : 'bg-white text-brand-600 hover:bg-brand-50'
            }`}
          >
            Enroll Now
          </a>
        </nav>

        {/* Mobile Menu Toggle */}
        <button 
          className="lg:hidden p-2 text-slate-600"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu className={isScrolled ? 'text-slate-900' : 'text-white'} />}
        </button>
      </div>

      {/* Mobile Nav */}
      {isMobileMenuOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white border-t border-slate-100 shadow-xl py-4 px-6 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a 
              key={link.name}
              href={link.href}
              className="text-slate-600 font-medium py-2 border-b border-slate-50"
              onClick={(e) => handleNavClick(e, link.href)}
            >
              {link.name}
            </a>
          ))}
           <a 
              href={WHATSAPP_URL}
              className="text-green-600 font-bold py-2 flex items-center gap-2"
            >
              <MessageCircle className="w-4 h-4" /> Get Free Trial
            </a>
          <a 
            href={ENROLL_URL}
            onClick={(e) => handleNavClick(e, ENROLL_URL)}
            className="w-full text-center bg-brand-600 text-white py-3 rounded-lg font-semibold mt-2"
          >
            Enroll Now
          </a>
        </div>
      )}
    </header>
  );
};