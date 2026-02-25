
import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Plus, ArrowUpRight, ArrowDownLeft, ShieldAlert, UserX, Trash2 } from 'lucide-react';
import { Company } from '../types';

const mockCompanies: Company[] = [
  { id: '1', name: 'TechFlow Solutions', industry: 'SaaS', credits: 4200, avatar: 'https://picsum.photos/seed/techflow/40/40', isBlacklisted: false },
  { id: '2', name: 'Peresoft', industry: 'ERP Solutions', credits: 3850, avatar: 'https://picsum.photos/seed/peresoft/40/40', isBlacklisted: false },
  { id: '3', name: 'Realm ID', industry: 'Digital Identity', credits: 5100, avatar: 'https://picsum.photos/seed/realmid/40/40', isBlacklisted: false },
  { id: '4', name: 'Sage Enterprise', industry: 'Accounting', credits: 3200, avatar: 'https://picsum.photos/seed/sage-e/40/40', isBlacklisted: false },
  { id: '5', name: 'Cradle Tech', industry: 'FinTech', credits: 2840, avatar: 'https://picsum.photos/seed/cradle/40/40', isBlacklisted: false },
  { id: '6', name: 'Asamco Digital', industry: 'Marketing', credits: 1950, avatar: 'https://picsum.photos/seed/asamco/40/40', isBlacklisted: false },
];

export const EcosystemAdmin: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'partners' | 'blacklist'>('partners');

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
            onClick={() => setActiveTab('blacklist')}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${activeTab === 'blacklist' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-500 hover:text-gray-900'}`}
          >
            Engagement Blacklist
          </button>
        </div>
      </div>

      {activeTab === 'partners' ? (
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
      ) : (
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
