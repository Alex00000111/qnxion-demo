
import React from 'react';
import { ShieldAlert, UserX, UserMinus, PlusCircle, Search } from 'lucide-react';

export const Blacklist: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Ecosystem Compliance</h2>
          <p className="text-gray-500">Control active/passive engagement reactions and exclusions</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2 bg-white border border-gray-200 text-gray-700 px-6 py-3 rounded-xl font-semibold hover:bg-gray-50 transition-all shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
            Exclusion Logs
          </button>
          <button className="flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-red-700 transition-all shadow-lg shadow-red-100">
            <PlusCircle size={20} />
            Add Exclusion
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Active Reactions Blacklist */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
          <div className="p-6 border-b border-gray-100 bg-red-50/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-red-100 text-red-600 rounded-lg">
                <UserX size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Active Reactions (Passive)</h3>
                <p className="text-xs text-gray-500">Who you will NOT promote</p>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-400">3 Blocked</span>
          </div>
          <div className="divide-y divide-gray-100">
            {[
              { name: 'Nexus Dynamics', reason: 'Competing Ecosystem Platform' },
              { name: 'GrowthPod Inc.', reason: 'Engagement Pod Operator' },
              { name: 'SpamReach Co.', reason: 'Spam & Low-Quality Content' },
            ].map((item, i) => (
              <div key={i} className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <img src={`https://picsum.photos/seed/bl${i + 20}/40/40`} className="w-10 h-10 rounded-lg grayscale" alt="" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">{item.name}</p>
                    <p className="text-xs text-gray-500">{item.reason}</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-indigo-600 hover:underline">Remove</button>
              </div>
            ))}
          </div>
          <div className="p-4 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search to add to blacklist..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-red-500 focus:border-red-500" />
            </div>
          </div>
        </div>

        {/* Passive Reactions Blacklist */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
          <div className="p-6 border-b border-gray-100 bg-orange-50/30 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                <UserMinus size={20} />
              </div>
              <div>
                <h3 className="font-bold text-gray-900">Passive Exposure (Active)</h3>
                <p className="text-xs text-gray-500">Who you don't want promotion FROM</p>
              </div>
            </div>
            <span className="text-xs font-bold text-gray-400">1 Blocked</span>
          </div>
          <div className="divide-y divide-gray-100">
             <div className="p-4 flex items-center justify-between hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <img src="https://picsum.photos/seed/bb/40/40" className="w-10 h-10 rounded-lg grayscale" alt="" />
                  <div>
                    <p className="text-sm font-bold text-gray-900">Shadow Agency</p>
                    <p className="text-xs text-gray-500">Brand Safety Exclusion</p>
                  </div>
                </div>
                <button className="text-xs font-bold text-indigo-600 hover:underline">Remove</button>
              </div>
              <div className="p-12 text-center text-gray-400">
                <ShieldAlert size={40} className="mx-auto mb-2 opacity-20" />
                <p className="text-sm">Manage who can see and react to your brand content within the ecosystem.</p>
              </div>
          </div>
          <div className="p-4 bg-gray-50">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input type="text" placeholder="Search to add to blacklist..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:ring-orange-500 focus:border-orange-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
