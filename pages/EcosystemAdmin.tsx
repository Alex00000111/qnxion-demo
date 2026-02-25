
import React, { useState, useEffect } from 'react';
import { Search, Filter, MoreHorizontal, Plus, ArrowUpRight, ArrowDownLeft, ShieldAlert, UserX, Trash2, Zap } from 'lucide-react';
import { Company } from '../types';

const mockCompanies: Company[] = [
  { id: '1', name: 'TechFlow Solutions', industry: 'SaaS', credits: 4200, avatar: '/techflow_solutions_inc_logo.jpg', isBlacklisted: false },
  { id: '2', name: 'Peresoft', industry: 'ERP Solutions', credits: 3850, avatar: '/peresoft_logo.jpg', isBlacklisted: false },
  { id: '3', name: 'Realm ID', industry: 'Digital Identity', credits: 5100, avatar: '/realm_id_logo.jpg', isBlacklisted: false },
  { id: '4', name: 'Sage Enterprise', industry: 'Accounting', credits: 3200, avatar: '/enterprisesage_logo.jpg', isBlacklisted: false },
  { id: '5', name: 'Cradle Tech', industry: 'FinTech', credits: 2840, avatar: 'https://picsum.photos/seed/cradle/40/40', isBlacklisted: false },
  { id: '6', name: 'Asamco Digital', industry: 'Marketing', credits: 1950, avatar: 'https://picsum.photos/seed/asamco/40/40', isBlacklisted: false },
];

// ── SVG node positions in a 620 × 320 viewBox ──────────────────────────────
const CENTER = { x: 310, y: 148 };
const PARTNERS = [
  { id: 'techflow', name: 'TechFlow Solutions', logo: '/techflow_solutions_inc_logo.jpg', x: 82,  y: 72,  gcu: '+3 GCU', dur: '2.4s', begin: '0s',   active: true  },
  { id: 'peresoft', name: 'Peresoft',            logo: '/peresoft_logo.jpg',               x: 538, y: 72,  gcu: '+1 GCU', dur: '2.8s', begin: '0.6s', active: true  },
  { id: 'realmid',  name: 'Realm ID',            logo: '/realm_id_logo.jpg',               x: 552, y: 210, gcu: '+2 GCU', dur: '2.0s', begin: '1.1s', active: true  },
  { id: 'sage',     name: 'Sage Enterprise',     logo: '/enterprisesage_logo.jpg',         x: 400, y: 268, gcu: '+1 GCU', dur: '3.2s', begin: '0.3s', active: false },
  { id: 'cradle',   name: 'Cradle Tech',         logo: `https://picsum.photos/seed/cradle/40/40`, x: 78, y: 250, gcu: '+2 GCU', dur: '2.6s', begin: '0.9s', active: false },
];

// ── Count-up hook (same as Dashboard) ───────────────────────────────────────
function useCountUp(target: number, duration = 1200, run = true): number {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!run) return;
    let start: number | null = null;
    let raf: number;
    const step = (timestamp: number) => {
      if (!start) start = timestamp;
      const progress = Math.min((timestamp - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration, run]);
  return value;
}

// ── Credit Flow Visualisation — pure SVG, zero HTML overlay ─────────────
const CreditFlowTab: React.FC = () => {
  const weeklyCredits = useCountUp(847, 1000, true);

  return (
    <div className="space-y-6">
      {/* Header stat */}
      <div className="flex items-center gap-3 p-5 bg-indigo-50 border border-indigo-100 rounded-2xl">
        <div className="p-2 bg-indigo-600 text-white rounded-xl">
          <Zap size={20} />
        </div>
        <div>
          <p className="text-xs font-bold text-indigo-500 uppercase tracking-wider">Credits flowing this week</p>
          <p className="text-2xl font-extrabold text-indigo-900">{weeklyCredits.toLocaleString()} GCU</p>
        </div>
      </div>

      {/* SVG graph — everything lives inside the SVG, no coordinate mismatch */}
      <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_4px_24px_rgba(99,102,241,0.06)] p-6">
        <h3 className="text-sm font-bold text-gray-700 mb-4">Live Credit Flow</h3>
        <div className="flex justify-center">
          <svg
            viewBox="0 0 620 320"
            width="620"
            height="320"
            style={{ maxWidth: '100%', display: 'block' }}
          >
            <defs>
              <linearGradient id="cfDotGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
              <linearGradient id="cfCenterGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#6366f1" />
                <stop offset="100%" stopColor="#4f46e5" />
              </linearGradient>
              {/* Circular clip masks for each partner avatar */}
              {PARTNERS.map(p => (
                <clipPath key={`clip-${p.id}`} id={`cfclip-${p.id}`}>
                  <circle cx={p.x} cy={p.y} r="20" />
                </clipPath>
              ))}
            </defs>

            {/* ── Layer 1: Dashed connection lines + hidden motion paths + GCU labels ── */}
            {PARTNERS.map(p => (
              <React.Fragment key={`line-${p.id}`}>
                <path
                  id={`cfpath-${p.id}`}
                  d={`M ${CENTER.x} ${CENTER.y} L ${p.x} ${p.y}`}
                  fill="none"
                  stroke="none"
                />
                <line
                  x1={CENTER.x} y1={CENTER.y}
                  x2={p.x} y2={p.y}
                  stroke="#e0e7ff"
                  strokeWidth="1.5"
                  strokeDasharray="4 3"
                />
                <text
                  x={(CENTER.x + p.x) / 2}
                  y={(CENTER.y + p.y) / 2 - 7}
                  textAnchor="middle"
                  fontSize="9"
                  fontWeight="700"
                  fill="#6366f1"
                  opacity="0.8"
                >
                  {p.gcu}
                </text>
              </React.Fragment>
            ))}

            {/* ── Layer 2: Active reciprocity pulse rings ── */}
            {PARTNERS.filter(p => p.active).map(p => (
              <circle key={`ring-${p.id}`} cx={p.x} cy={p.y} r="24" fill="none" stroke="#10b981" strokeWidth="1.5">
                <animate attributeName="opacity" values="0.45;0;0.45" dur="3.5s" repeatCount="indefinite" />
                <animate attributeName="r" values="22;32;22" dur="3.5s" repeatCount="indefinite" />
              </circle>
            ))}

            {/* ── Layer 3: Traveling dots ── */}
            {PARTNERS.map(p => (
              <circle key={`dot-${p.id}`} r="4.5" fill="url(#cfDotGrad)" opacity="0.9">
                <animateMotion dur={p.dur} repeatCount="indefinite" begin={p.begin}>
                  <mpath href={`#cfpath-${p.id}`} />
                </animateMotion>
              </circle>
            ))}

            {/* ── Layer 4: Partner nodes — white disc + clipped avatar image + label ── */}
            {PARTNERS.map(p => (
              <React.Fragment key={`node-${p.id}`}>
                <circle cx={p.x} cy={p.y} r="22" fill="white" stroke={p.active ? '#a5b4fc' : '#e5e7eb'} strokeWidth="2" />
                <image
                  href={p.logo}
                  x={p.x - 20} y={p.y - 20}
                  width="40" height="40"
                  clipPath={`url(#cfclip-${p.id})`}
                  preserveAspectRatio="xMidYMid slice"
                />
                {p.name.split(' ').slice(0, 2).map((word, wi) => (
                  <text
                    key={wi}
                    x={p.x}
                    y={p.y + 30 + wi * 11}
                    textAnchor="middle"
                    fontSize="9"
                    fontWeight="600"
                    fill="#4b5563"
                  >
                    {word}
                  </text>
                ))}
              </React.Fragment>
            ))}

            {/* ── Layer 5: Centre node — Emmanuel (renders on top of everything) ── */}
            <circle cx={CENTER.x} cy={CENTER.y} r="34" fill="none" stroke="#c7d2fe" strokeWidth="2.5" />
            <circle cx={CENTER.x} cy={CENTER.y} r="30" fill="url(#cfCenterGrad)" />
            <text
              x={CENTER.x} y={CENTER.y + 1}
              textAnchor="middle"
              dominantBaseline="central"
              fontSize="11"
              fontWeight="800"
              fill="white"
            >
              EM
            </text>
            <text
              x={CENTER.x} y={CENTER.y + 47}
              textAnchor="middle"
              fontSize="10"
              fontWeight="700"
              fill="#4f46e5"
            >
              Emmanuel
            </text>
          </svg>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-6 pt-3 border-t border-gray-100 mt-3">
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <div className="w-3 h-3 rounded-full bg-indigo-500 opacity-80" />
            Ecosystem Credit
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <div className="w-5 h-0.5 bg-indigo-300" />
            Credit flowing to your wallet
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-500">
            <div className="w-3 h-3 rounded-full border-2 border-green-500 opacity-70" />
            Active reciprocity partner
          </div>
        </div>
      </div>
    </div>
  );
};

export const EcosystemAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'partners' | 'creditflow' | 'blacklist'>('partners');

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ecosystem Management</h2>
          <p className="text-gray-500">Manage collaborative accounts, credits, and engagement rules</p>
        </div>
        <div className="flex bg-white border border-gray-200 p-1.5 rounded-xl shadow-sm">
          <button
            onClick={() => setActiveTab('partners')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'partners' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Partners
          </button>
          <button
            onClick={() => setActiveTab('creditflow')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'creditflow' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Credit Flow
          </button>
          <button
            onClick={() => setActiveTab('blacklist')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'blacklist' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Engagement Blacklist
          </button>
        </div>
      </div>

      {activeTab === 'partners' && (
        <>
          <div className="flex gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search companies, industries or admins..."
                className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg shadow-indigo-100">
              <Plus size={20} />
              Invite Partner
            </button>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
            <table className="w-full text-left">
              <thead className="bg-gray-50 border-b border-gray-200">
                <tr>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Company</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Industry</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Social Credits</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Multiplier Status</th>
                  <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {mockCompanies.map((company) => (
                  <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
                        <img src={company.avatar} alt="" className="w-10 h-10 rounded-lg" />
                        <span className="font-bold text-gray-900">{company.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-xs font-medium">
                        {company.industry}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <span className={`font-bold ${company.credits < 1000 ? 'text-orange-600' : 'text-indigo-600'}`}>
                          {company.credits.toLocaleString()}
                        </span>
                        {company.credits > 2000 ? <ArrowUpRight size={14} className="text-green-500" /> : <ArrowDownLeft size={14} className="text-orange-500" />}
                      </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-2">
                        <div className={`w-2.5 h-2.5 rounded-full ${company.credits > 500 ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></div>
                        <span className="text-sm font-medium text-gray-700">
                          {company.credits > 500 ? 'Reciprocity Active' : 'Low Credits - Passive Only'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="p-2 text-gray-400 hover:text-gray-600">
                        <MoreHorizontal size={20} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}

      {activeTab === 'creditflow' && <CreditFlowTab />}

      {activeTab === 'blacklist' && (
        <div className="space-y-6">
          <div className="bg-red-50 border border-red-100 rounded-2xl p-6 flex items-start gap-4">
            <ShieldAlert className="text-red-600 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 text-lg">Engagement Exclusions</h3>
              <p className="text-red-700 text-sm max-w-2xl">
                Add companies or individuals here whose content you never want to automatically like, comment on, or share.
                Excluding partners will also prevent them from reacting to your brand content.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <UserX size={18} className="text-red-500" />
                  Excluded from My Actions
                </h4>
                <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">+ Add New</button>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { name: 'Nexus Dynamics', industry: 'Competing Ecosystem' },
                  { name: 'GrowthPod Inc.', industry: 'Engagement Pods' },
                ].map((item, i) => (
                  <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                    <div className="flex items-center gap-3">
                      <img src={`https://picsum.photos/seed/ex${i + 10}/40/40`} className="w-10 h-10 rounded-full grayscale" alt="" />
                      <div>
                        <p className="text-sm font-bold text-gray-900">{item.name}</p>
                        <p className="text-xs text-gray-500">Industry: {item.industry}</p>
                      </div>
                    </div>
                    <button className="p-2 text-gray-300 hover:text-red-500 transition-colors"><Trash2 size={16} /></button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm">
              <div className="p-6 border-b border-gray-100 flex items-center justify-between">
                <h4 className="font-bold text-gray-900 flex items-center gap-2">
                  <ShieldAlert size={18} className="text-orange-500" />
                  Passive Exclusion (Brand Safety)
                </h4>
                <button className="text-xs font-bold text-indigo-600 bg-indigo-50 px-3 py-1.5 rounded-lg">+ Add New</button>
              </div>
              <div className="p-12 text-center text-gray-400">
                <p className="text-sm">No companies currently restricted from promoting your content.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
