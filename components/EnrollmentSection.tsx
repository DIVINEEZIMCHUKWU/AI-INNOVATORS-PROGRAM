import React, { useState } from 'react';

import { WHATSAPP_URL, CONTACT_EMAIL } from '../constants';
import { CheckCircle, Send, MessageCircle, Tag } from 'lucide-react';

export const EnrollmentSection: React.FC = () => {
  const [formState, setFormState] = useState({
    parentName: '',
    studentName: '',
    age: '',
    email: '',
    phone: '',
    goal: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setIsSubmitted(false);

    try {
      console.log('Submitting form to:', 'https://aiprograms-theta.vercel.app/api/register.mjs');
      console.log('Form data:', { studentName: formState.studentName, parentName: formState.parentName, age: formState.age, email: formState.email, phone: formState.phone, goal: formState.goal });
      
      const response = await fetch('https://aiprograms-theta.vercel.app/api/register.mjs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          studentName: formState.studentName,
          parentName: formState.parentName,
          age: formState.age,
          email: formState.email,
          phone: formState.phone,
          goal: formState.goal,
        }),
      });

      console.log('Response status:', response.status);
      console.log('Response headers:', Object.fromEntries(response.headers.entries()));

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Response error text:', errorText);
        
        let data;
        try {
          data = JSON.parse(errorText);
        } catch {
          data = { message: `Server returned ${response.status}: ${errorText}` };
        }
        
        const message = data?.message || `Server error: ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log('Response data:', data);

      setIsSubmitted(true);
    } catch (error) {
      console.error('Error submitting registration form:', error);
      alert(
        error instanceof Error
          ? error.message
          : 'Something went wrong while submitting the form. Please try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormState(prevState => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  if (isSubmitted) {
    return (
      <section id="enroll" className="py-20 bg-brand-900 text-white text-center scroll-mt-28">
        <div className="container mx-auto px-6 max-w-2xl">
          <div className="bg-white/10 backdrop-blur-md p-10 rounded-3xl border border-white/20">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-3xl font-bold mb-4">Registration Received!</h2>
            <p className="text-brand-100 mb-8 text-lg">
              Thank you for registering {formState.studentName}. We have received your details securely.
              <br/><br/>
              Our team will review your application and contact you shortly via WhatsApp to finalize the enrollment.
            </p>
            <a 
              href={WHATSAPP_URL}
              className="inline-flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-all"
            >
              <MessageCircle className="w-5 h-5" />
              Chat with us now
            </a>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="enroll" className="py-20 bg-slate-50 relative overflow-hidden scroll-mt-28">
       {/* Decorative background elements */}
       <div className="absolute top-0 right-0 w-1/3 h-full bg-brand-100/50 -skew-x-12 transform translate-x-20"></div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
           <span className="inline-block py-1 px-3 rounded-full bg-brand-100 text-brand-700 text-xs font-bold tracking-widest uppercase mb-3">
            Secure Your Spot
          </span>
          <h2 className="text-4xl font-bold text-slate-900 mb-4">Enrollment Form</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Fill out the form below to register. Training is <span className="font-bold text-brand-600">100% Virtual</span> and flexible.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 max-w-6xl mx-auto">
          {/* Pricing Card */}
          <div className="lg:w-1/3 order-2 lg:order-1">
            <div className="bg-white p-8 rounded-3xl shadow-xl border border-slate-100 sticky top-24">
              <h3 className="text-xl font-semibold text-slate-600 mb-4">Program Fee</h3>
              
              {/* Discount Logic */}
              <div className="flex flex-col mb-6 border-b border-dashed border-slate-200 pb-6">
                <div className="flex flex-wrap items-baseline gap-2 sm:gap-3 mb-1">
                  <span className="text-4xl sm:text-5xl font-bold text-brand-600">₦30,000</span>
                  <span className="text-lg sm:text-xl text-slate-400 line-through decoration-red-500">₦35,000</span>
                </div>
                <div className="flex items-center gap-2 text-red-500 font-bold text-sm animate-pulse">
                  <Tag className="w-4 h-4" />
                  <span>Early Bird Promo (First 20 Slots)</span>
                </div>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-xl mb-6 border border-blue-100">
                <p className="text-xs text-blue-800 leading-relaxed">
                  <strong>Note:</strong> Fees are slightly negotiable. Prices may vary based on program duration (e.g., 1 month vs 3 months) and specific module selection. Contact us for a custom plan.
                </p>
              </div>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-brand-500" />
                  <span>Full Access to All 5 Modules</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-brand-500" />
                  <span>Live Virtual Sessions</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-brand-500" />
                  <span>Project Portfolio Building</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-700">
                  <CheckCircle className="w-5 h-5 text-brand-500" />
                  <span>Mentorship Support</span>
                </div>
              </div>

              <a 
                href={WHATSAPP_URL}
                target="_blank"
                rel="noreferrer"
                className="w-full flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-xl transition-all shadow-lg hover:shadow-green-500/30 mb-3"
              >
                <MessageCircle className="w-5 h-5" />
                Get a Free Trial Today
              </a>
              <p className="text-center text-xs text-slate-400">
                Click to chat with us on WhatsApp before registering.
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="lg:w-2/3 order-1 lg:order-2">
            <form onSubmit={handleSubmit} className="bg-white p-8 md:p-10 rounded-3xl shadow-lg border border-slate-100">
              <h3 className="text-2xl font-bold text-slate-900 mb-6">Student Registration</h3>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Student Name</label>
                  <input 
                    type="text" 
                    name="studentName"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                    placeholder="Enter student's full name"
                    value={formState.studentName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Student Age</label>
                  <select 
                    name="age"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all bg-white"
                    value={formState.age}
                    onChange={handleChange}
                  >
                    <option value="">Select Age</option>
                    <option value="7-10">7-10 Years</option>
                    <option value="11-15">11-15 Years</option>
                    <option value="16-20">16-20 Years</option>
                    <option value="Adult">Adult (20+)</option>
                  </select>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-2">Parent/Guardian Name</label>
                  <input 
                    type="text" 
                    name="parentName"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                    placeholder="Enter parent's name"
                    value={formState.parentName}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-900 mb-2">WhatsApp Phone Number <span className="text-red-500 text-xs font-normal">(Compulsory)</span></label>
                  <input 
                    type="tel" 
                    name="phone"
                    required
                    className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                    placeholder="080..."
                    value={formState.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-slate-700 mb-2">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  required
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                  placeholder="name@example.com"
                  value={formState.email}
                  onChange={handleChange}
                />
              </div>

              <div className="mb-8">
                <label className="block text-sm font-medium text-slate-700 mb-2">Primary Learning Goal (Optional)</label>
                <textarea 
                  name="goal"
                  rows={3}
                  className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-200 outline-none transition-all"
                  placeholder="What do you hope to achieve from this program?"
                  value={formState.goal}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg py-4 rounded-xl transition-all shadow-lg shadow-brand-500/25 flex items-center justify-center gap-2 disabled:opacity-70"
              >
                {isSubmitting ? 'Processing...' : (
                  <>
                    Complete Registration <Send className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};