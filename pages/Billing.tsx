
import React from 'react';
import { CreditCard, Download, ExternalLink, ShieldCheck, Clock, Zap, ArrowRight, Wallet, User, Sparkles } from 'lucide-react';

interface BillingProps {
  onSelectPlan: () => void;
  managementMode: 'self' | 'agency';
}

export const Billing: React.FC<BillingProps> = ({ onSelectPlan, managementMode }) => {
  const basePrice = 760;
  const multiplier = managementMode === 'agency' ? 1.5 : 1.0;
  const finalPrice = basePrice * multiplier;

  return (
    <div className="space-y-8 max-w-5xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 bg-white border border-gray-200 rounded-[32px] p-8 shadow-[0_4px_24px_rgba(99,102,241,0.06)] flex flex-col justify-between">
          <div className="flex justify-between items-start mb-8">
            <div>
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-1">Current Subscription</h3>
              <div className="flex items-center gap-3">
                <p className="text-3xl font-bold text-gray-900">TPAC Enterprise x4</p>
                <span className={`px-2 py-1 rounded-full text-[10px] font-bold uppercase border flex items-center gap-1 ${
                  managementMode === 'agency' 
                    ? 'bg-purple-50 text-purple-600 border-purple-100' 
                    : 'bg-indigo-50 text-indigo-600 border-indigo-100'
                }`}>
                  {managementMode === 'agency' ? <Sparkles size={10} /> : <User size={10} />}
                  {managementMode === 'agency' ? 'Agency' : 'Self'}
                </span>
                <span className="bg-green-50 text-green-600 text-xs font-bold px-2 py-1 rounded-full border border-green-100">Active</span>
              </div>
            </div>
            <button 
              onClick={onSelectPlan}
              className="text-indigo-600 font-bold hover:bg-indigo-50 px-4 py-2 rounded-xl transition-all border border-indigo-100"
            >
              Manage Plans
            </button>
          </div>
          <div className="grid grid-cols-2 gap-8 border-t border-gray-50 pt-8">
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Next Payment</p>
              <p className="text-lg font-bold text-gray-900">March 15, 2026</p>
              <p className="text-xs text-gray-400 font-bold">${finalPrice.toFixed(2)} (VAT Free Default)</p>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-400 uppercase mb-1">Payment Method</p>
              <div className="flex items-center gap-2">
                <div className="w-10 h-6 bg-gray-100 rounded-md border border-gray-200 flex items-center justify-center text-[8px] font-bold text-gray-400">VISA</div>
                <p className="text-sm font-bold text-gray-900">•••• 4242</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-indigo-900 rounded-[32px] p-8 text-white shadow-xl flex flex-col justify-between relative overflow-hidden">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Wallet size={80} />
          </div>
          <div>
            <h3 className="text-indigo-300 text-sm font-bold uppercase tracking-widest mb-1">Agency Credit</h3>
            <p className="text-3xl font-bold text-white">18.5 hrs</p>
            <p className="text-xs text-indigo-400 mt-1">Available for Content & Supervision</p>
          </div>
          <button className="w-full mt-8 py-3 bg-white/10 hover:bg-white/20 transition-all rounded-2xl text-sm font-bold flex items-center justify-center gap-2">
            Buy More Hours
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-[32px] shadow-[0_4px_24px_rgba(99,102,241,0.06)] overflow-hidden">
        <div className="p-8 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-xl font-bold text-gray-900">Billing History</h3>
          <button className="text-sm font-bold text-gray-400 hover:text-gray-600 flex items-center gap-2">
            View Stripe Dashboard
            <ExternalLink size={14} />
          </button>
        </div>
        <div className="divide-y divide-gray-50">
          {[
            { date: 'Feb 15, 2026', desc: 'TPAC Enterprise x4 — February', amount: '$760.00', status: 'Paid', taxStatus: 'VAT Exempt' },
            { date: 'Jan 15, 2026', desc: 'TPAC Enterprise x4 — January', amount: '$760.00', status: 'Paid', taxStatus: 'VAT Exempt' },
            { date: 'Jan 8, 2026', desc: 'Agency Content Package (15 hrs)', amount: '$1,800.00', status: 'Paid', taxStatus: 'VAT Exempt' },
            { date: 'Dec 15, 2025', desc: 'TPAC Enterprise x4 — December', amount: '$760.00', status: 'Paid', taxStatus: 'VAT Exempt' },
          ].map((inv, i) => (
            <div key={i} className="p-8 flex items-center justify-between hover:bg-gray-50/50 transition-all">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-100 text-gray-500 rounded-xl">
                  <CreditCard size={20} />
                </div>
                <div>
                  <p className="font-bold text-gray-900">{inv.desc}</p>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-gray-400">{inv.date}</p>
                    <span className="text-[10px] text-indigo-500 font-bold border border-indigo-100 px-1 rounded">{inv.taxStatus}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-8">
                <div className="text-right">
                  <p className="font-bold text-gray-900">{inv.amount}</p>
                  <span className="text-[10px] font-bold text-green-500 uppercase">{inv.status}</span>
                </div>
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all">
                  <Download size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
