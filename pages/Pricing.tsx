
import React, { useState } from 'react';
import { Check, ArrowLeft, Zap, Shield, Users, Sparkles, Clock, Star, Type, User } from 'lucide-react';

interface PricingProps {
  onBack: () => void;
  managementMode: 'self' | 'agency';
  setManagementMode: (mode: 'self' | 'agency') => void;
}

export const Pricing: React.FC<PricingProps> = ({ onBack, managementMode, setManagementMode }) => {
  const [isVatExempt, setIsVatExempt] = useState(true);
  const [vatNumber, setVatNumber] = useState('');
  const [isAgencySubscribed, setIsAgencySubscribed] = useState(false);

  const VAT_RATE = 0.21;

  const calculateTotal = (base: number) => {
    const multiplier = managementMode === 'agency' ? 1.5 : 1.0; // Example uplift for agency
    const price = base * multiplier;
    if (isVatExempt || vatNumber.length > 5) return price;
    return price + (price * VAT_RATE);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <button 
        onClick={onBack}
        className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-all"
      >
        <ArrowLeft size={20} />
        Back to Billing
      </button>

      <div className="text-center space-y-4">
        <h2 className="text-4xl font-extrabold text-gray-900 tracking-tight">Ecosystem Plans & Packages</h2>
        <p className="text-gray-500 text-lg max-w-2xl mx-auto">Scale your QNXION presence with personal, company, or human-supervised packages.</p>
        
        <div className="flex flex-col items-center gap-6 mt-12">
          {/* Management Selection Toggle */}
          <div className="flex items-center bg-gray-100 p-1.5 rounded-2xl border border-gray-200 shadow-inner">
            <button 
              onClick={() => setManagementMode('self')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all ${managementMode === 'self' ? 'bg-white shadow-md text-indigo-600' : 'text-gray-500'}`}
            >
              <User size={18} />
              Self Managed
            </button>
            <button 
              onClick={() => setManagementMode('agency')}
              className={`flex items-center gap-2 px-8 py-3 rounded-xl text-sm font-bold transition-all ${managementMode === 'agency' ? 'bg-indigo-900 shadow-md text-white' : 'text-gray-500'}`}
            >
              <Sparkles size={18} />
              Agency Managed
            </button>
          </div>

          <div className="flex items-center justify-center gap-4 bg-gray-50 p-1.5 rounded-2xl border border-gray-100">
            <button 
              onClick={() => setIsVatExempt(true)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${isVatExempt ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
            >
              VAT Free
            </button>
            <button 
              onClick={() => setIsVatExempt(false)}
              className={`px-6 py-2 rounded-xl text-xs font-bold transition-all ${!isVatExempt ? 'bg-white shadow-sm text-gray-900' : 'text-gray-400'}`}
            >
              EU (Standard + VAT)
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Basic Personal Plan */}
        <div className="bg-white border-2 border-gray-100 rounded-[32px] p-8 hover:border-indigo-200 transition-all flex flex-col relative overflow-hidden group">
          <div className="flex justify-between items-start mb-8">
            <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
              <Zap size={28} />
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-gray-900">${calculateTotal(190).toFixed(0)}</span>
              <span className="text-gray-400 font-medium ml-1">/mo</span>
              <p className="text-xs text-gray-400 mt-1">{isVatExempt ? 'Tax Exempt' : `Includes ${VAT_RATE * 100}% VAT`}</p>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Personal Account</h3>
          <p className="text-gray-500 mb-8">{managementMode === 'agency' ? 'Full service content and management for one account.' : 'Single LinkedIn profile connectivity with full ecosystem access.'}</p>
          <ul className="space-y-4 mb-10 flex-1">
            {[
              'Unlimited Auto-Engagement',
              managementMode === 'agency' ? 'Weekly Expert Content Review' : 'Campaign Flow Builder',
              managementMode === 'agency' ? 'Dedicated Account Supervisor' : 'AI Content Suggestions',
              'Direct Ecosystem Multiplier',
              'Social Credit Rewards'
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm font-medium text-gray-600">
                <Check size={18} className="text-green-500" />
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full py-4 bg-indigo-600 text-white rounded-2xl font-bold hover:bg-indigo-700 transition-all shadow-xl shadow-indigo-100">
            Subscribe Now
          </button>
        </div>

        {/* Company Page Plan */}
        <div className="bg-indigo-900 border-2 border-indigo-700 rounded-[32px] p-8 text-white flex flex-col relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Shield size={120} />
          </div>
          <div className="flex justify-between items-start mb-8 relative">
            <div className="p-3 bg-white/10 text-white rounded-2xl">
              <Shield size={28} />
            </div>
            <div className="text-right">
              <span className="text-3xl font-bold text-white">${calculateTotal(380).toFixed(0)}</span>
              <span className="text-indigo-300 font-medium ml-1">/mo</span>
              <p className="text-xs text-indigo-400 mt-1">{isVatExempt ? 'Tax Exempt' : `Includes ${VAT_RATE * 100}% VAT`}</p>
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 relative">Company Page</h3>
          <p className="text-indigo-200 mb-8 relative">{managementMode === 'agency' ? 'Full brand management and advocacy supervision.' : 'Automated growth for your brand\'s presence and employee advocacy.'}</p>
          <ul className="space-y-4 mb-10 flex-1 relative">
            {[
              'Company Page Invites Automation',
              managementMode === 'agency' ? 'Content Strategy Workshops' : 'Employee Advocacy Loop',
              'Brand Safety Filter Controls',
              'Advanced Analytics & Reporting',
              'Admin First-Contact Targeting',
              'Unified Brand Dashboard'
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm font-medium text-indigo-100">
                <Check size={18} className="text-indigo-400" />
                {feature}
              </li>
            ))}
          </ul>
          <button className="w-full py-4 bg-white text-indigo-900 rounded-2xl font-bold hover:bg-indigo-50 transition-all shadow-xl relative">
            Subscribe Now
          </button>
        </div>
      </div>

      {/* Agency Hourly Packages (Only show or highlight if agency managed) */}
      <div className={`bg-white border ${managementMode === 'agency' ? 'border-purple-500 ring-2 ring-purple-50' : 'border-gray-200'} rounded-[40px] p-12 shadow-sm transition-all`}>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 space-y-6">
            <div className="flex items-center gap-3 text-indigo-600">
              <Sparkles size={24} />
              <span className="text-sm font-bold uppercase tracking-widest">Premium Service</span>
            </div>
            <h3 className="text-3xl font-bold text-gray-900">Agency Hourly Packages</h3>
            <p className="text-gray-500 leading-relaxed">
              Need a human touch? Our experts provide professional content creation, account supervision, 
              and strategic ecosystem management to maximize your ROI.
            </p>
            
            <div className="flex items-center gap-4 p-4 bg-indigo-50 rounded-2xl w-fit">
              <div className="flex flex-col">
                <span className="text-xs font-bold text-indigo-400 uppercase">Hourly Rate</span>
                <span className="text-2xl font-bold text-indigo-900">${isAgencySubscribed ? '120' : '150'}</span>
              </div>
              <div className="h-10 w-px bg-indigo-200 mx-2"></div>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setIsAgencySubscribed(!isAgencySubscribed)}
                  className={`w-12 h-6 rounded-full relative transition-colors ${isAgencySubscribed ? 'bg-indigo-600' : 'bg-gray-300'}`}
                >
                  <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${isAgencySubscribed ? 'left-7' : 'left-1'}`}></div>
                </button>
                <span className="text-sm font-bold text-gray-700">Subscribed (Save 20%)</span>
              </div>
            </div>
          </div>

          <div className="w-full md:w-[400px] grid grid-cols-1 gap-4">
            {[
              { title: 'Content Suite', icon: Type, hours: 10 },
              { title: 'Supervision', icon: Eye, hours: 25 },
              { title: 'Elite Strategy', icon: Star, hours: 50 },
            ].map((pkg) => (
              <div key={pkg.title} className="p-6 border border-gray-100 rounded-3xl hover:border-indigo-500 hover:bg-gray-50 transition-all flex items-center justify-between group">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-white shadow-sm border border-gray-100 rounded-xl group-hover:bg-indigo-600 group-hover:text-white transition-all">
                    <pkg.icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{pkg.title}</h4>
                    <p className="text-xs text-gray-400">{pkg.hours} Hours Package</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">${(pkg.hours * (isAgencySubscribed ? 120 : 150)).toLocaleString()}</p>
                  <button className="text-[10px] font-bold text-indigo-600 hover:underline">Purchase</button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

const Eye: React.FC<{ size: number, className?: string }> = ({ size, className }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
