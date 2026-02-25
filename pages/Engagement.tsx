
import React, { useState } from 'react';
import { 
  Clock, 
  Heart, 
  MessageSquare, 
  Share2, 
  AlertCircle, 
  Award, 
  StopCircle, 
  ArrowRight, 
  Zap, 
  Linkedin, 
  ToggleLeft, 
  ToggleRight, 
  MoreVertical,
  ChevronDown,
  Building2,
  Lock
} from 'lucide-react';

const mockActions = [
  { id: '1', type: 'Comment', targetAuthor: 'Peresoft', targetPostId: 'p102', scheduledAt: 'In 45 mins', deadline: '30 mins left to stop', cost: 15, commentPreview: 'Brilliant take on ERP integration for mid-market — the ecosystem angle is spot on!' },
  { id: '2', type: 'Like', targetAuthor: 'Realm ID', targetPostId: 'p105', scheduledAt: 'In 2 hours', deadline: '1.5 hours left to stop', cost: 5 },
  { id: '3', type: 'Repost', targetAuthor: 'Cradle Tech', targetPostId: 'p110', scheduledAt: 'In 5 hours', deadline: '4 hours left to stop', cost: 30 },
];

const mockCompanyAccounts = [
  { id: 'acc1', name: 'Emmanuel', role: 'Founding Member & Ecosystem Lead', creditsEarned: 3240, creditsSpent: 1800, status: 'Active', avatar: '/Emmanuel.jpg' },
  { id: 'acc2', name: 'Naledi Dlamini', role: 'Head of Partnerships', creditsEarned: 2150, creditsSpent: 1400, status: 'Active', avatar: 'https://picsum.photos/seed/naledi/40/40' },
  { id: 'acc3', name: 'Sipho Mkhize', role: 'Content Strategist', creditsEarned: 1860, creditsSpent: 950, status: 'Active', avatar: 'https://picsum.photos/seed/sipho/40/40' },
];

export const Engagement: React.FC = () => {
  const [activeView, setActiveView] = useState<'planned' | 'accounts'>('planned');
  const [internalOnly, setInternalOnly] = useState(false);

  return (
    <div className="space-y-8 pb-12">
      {/* Top Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-indigo-600 rounded-3xl p-6 text-white shadow-xl flex flex-col justify-between group cursor-default">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-indigo-100 text-sm font-medium mb-1">Total Company Credits</p>
              <h3 className="text-4xl font-bold">7,250</h3>
            </div>
            <Zap className="text-indigo-300 opacity-50 group-hover:rotate-12 transition-transform" />
          </div>
          <div className="mt-4 flex items-center gap-2 text-xs font-bold bg-white/20 w-fit px-3 py-1.5 rounded-full">
            <Award size={14} />
            High Reciprocity Status
          </div>
        </div>
        
        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] flex flex-col justify-between">
          <div>
            <p className="text-gray-500 text-sm font-medium mb-1">Multiplier Efficiency</p>
            <h3 className="text-3xl font-bold text-gray-900">85%</h3>
            <p className="text-xs text-gray-400 mt-2">Aggregated reach boost across all accounts</p>
          </div>
          <div className="mt-4 h-2.5 w-full bg-gray-100 rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500" style={{width: '85%'}}></div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] flex flex-col justify-between">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium mb-1">Company Coverage</p>
              <h3 className="text-3xl font-bold text-gray-900">3/5</h3>
            </div>
            <Linkedin className="text-indigo-600" size={24} />
          </div>
          <p className="text-xs text-gray-400">LinkedIn accounts active in ecosystem</p>
        </div>
      </div>

      {/* Global Auto-Engagement Toggle */}
      <div className="bg-white border border-gray-200 rounded-3xl p-6 flex items-center justify-between shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-indigo-50 text-indigo-600 rounded-2xl">
            <Building2 size={24} />
          </div>
          <div>
            <h4 className="font-bold text-gray-900">Global Auto-Engagement Rules</h4>
            <p className="text-xs text-gray-500">Configure how your accounts behave within the collaborative ecosystem.</p>
          </div>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl border border-gray-100">
            <Lock size={16} className={internalOnly ? "text-indigo-600" : "text-gray-300"} />
            <span className="text-sm font-bold text-gray-700">Internal Engagement Only</span>
            <button 
              onClick={() => setInternalOnly(!internalOnly)}
              className={`w-12 h-6 rounded-full relative transition-colors ${internalOnly ? 'bg-indigo-600' : 'bg-gray-300'}`}
            >
              <div className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${internalOnly ? 'left-7' : 'left-1'}`}></div>
            </button>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="bg-white border border-gray-200 rounded-3xl shadow-[0_4px_24px_rgba(99,102,241,0.06)] overflow-hidden">
        <div className="px-8 pt-8 pb-4 border-b border-gray-100 flex items-center justify-between">
          <div className="flex gap-8">
            <button 
              onClick={() => setActiveView('planned')}
              className={`pb-4 text-sm font-bold transition-all relative ${activeView === 'planned' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Planned Actions
              {activeView === 'planned' && <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full"></span>}
            </button>
            <button 
              onClick={() => setActiveView('accounts')}
              className={`pb-4 text-sm font-bold transition-all relative ${activeView === 'accounts' ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'}`}
            >
              Company Accounts Overview
              {activeView === 'accounts' && <span className="absolute bottom-0 left-0 w-full h-1 bg-indigo-600 rounded-t-full"></span>}
            </button>
          </div>
          {activeView === 'planned' && (
            <button className="text-xs font-bold text-red-600 border border-red-100 px-4 py-2 rounded-xl hover:bg-red-50 transition-all">
              Emergency Stop All
            </button>
          )}
        </div>

        {activeView === 'planned' ? (
          <div className="divide-y divide-gray-100">
            {mockActions.map((action) => (
              <div key={action.id} className="p-8 flex items-center gap-8 group hover:bg-gray-50/50 transition-all">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                  action.type === 'Like' ? 'bg-pink-50 text-pink-600' : 
                  action.type === 'Comment' ? 'bg-purple-50 text-purple-600' : 
                  'bg-blue-50 text-blue-600'
                }`}>
                  {action.type === 'Like' && <Heart size={28} />}
                  {action.type === 'Comment' && <MessageSquare size={28} />}
                  {action.type === 'Repost' && <Share2 size={28} />}
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-gray-900 text-lg">{action.type} for {action.targetAuthor}</h4>
                    <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-0.5 rounded uppercase">-{action.cost} Credits</span>
                  </div>
                  {action.commentPreview && (
                    <p className="text-sm text-gray-600 italic mb-2">"{action.commentPreview}"</p>
                  )}
                  <div className="flex items-center gap-6 text-sm">
                    <span className="text-gray-500 flex items-center gap-1.5 font-medium">
                      <Clock size={16} />
                      {action.scheduledAt}
                    </span>
                    <span className="text-orange-600 font-bold flex items-center gap-1.5">
                      <AlertCircle size={16} />
                      {action.deadline}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-all">
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
                    Modify
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 text-sm font-bold text-red-600 bg-white border border-red-200 rounded-lg hover:bg-red-50">
                    <StopCircle size={16} />
                    Stop
                  </button>
                  <button className="p-2 text-gray-400 hover:text-indigo-600">
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {mockCompanyAccounts.map((account) => (
              <div key={account.id} className="p-8 flex items-center gap-8 group hover:bg-gray-50/50 transition-all">
                <div className="relative">
                  <img src={account.avatar} alt="" className="w-14 h-14 rounded-2xl border border-gray-100 shadow-[0_4px_24px_rgba(99,102,241,0.06)]" />
                  <div className="absolute -bottom-1 -right-1 bg-white p-1 rounded-lg shadow-md">
                    <Linkedin size={12} className="text-indigo-600" />
                  </div>
                </div>

                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-1">
                    <h4 className="font-bold text-gray-900 text-lg">{account.name}</h4>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                      account.status === 'Active' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-400'
                    }`}>
                      {account.status}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">{account.role}</p>
                  
                  <div className="flex gap-8">
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Credits Contributed</p>
                      <p className="text-sm font-bold text-indigo-600 flex items-center gap-1">
                        <ArrowRight size={14} className="rotate-[-45deg]" />
                        {account.creditsEarned}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Credits Consumed</p>
                      <p className="text-sm font-bold text-pink-600 flex items-center gap-1">
                        <ArrowRight size={14} className="rotate-[135deg]" />
                        {account.creditsSpent}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-wider font-bold text-gray-400 mb-1">Reciprocity Ratio</p>
                      <p className="text-sm font-bold text-gray-900">
                        {(account.creditsEarned / (account.creditsSpent || 1)).toFixed(1)}x
                      </p>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] font-bold text-gray-400 uppercase mb-2">Auto-Engagement</span>
                    <button className="text-indigo-600 hover:text-indigo-700 transition-colors">
                      {account.status === 'Active' ? <ToggleRight size={32} /> : <ToggleLeft size={32} className="text-gray-300" />}
                    </button>
                  </div>
                  <button className="p-2 text-gray-400 hover:text-gray-600">
                    <MoreVertical size={20} />
                  </button>
                </div>
              </div>
            ))}
            <div className="p-8 bg-gray-50/50 flex justify-center">
              <button className="flex items-center gap-2 px-6 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-gray-700 hover:border-indigo-300 transition-all shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
                <Linkedin size={18} className="text-indigo-600" />
                Connect New Company Account
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Reciprocity Rules Card */}
      <div className="bg-gradient-to-br from-indigo-700 to-indigo-900 rounded-3xl p-8 text-white relative overflow-hidden shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <Zap size={140} />
        </div>
        <div className="max-w-3xl relative">
          <h3 className="text-2xl font-bold mb-4">Ecosystem Intelligence</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-indigo-100 text-sm leading-relaxed">
            <div className="space-y-2">
              <p className="font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                Collective Contribution
              </p>
              <p>Your company's credits are pooled. High-contributing accounts like <span className="text-white font-bold">Emmanuel</span> generate capacity for newer accounts to receive boosts instantly.</p>
            </div>
            <div className="space-y-2">
              <p className="font-bold text-white flex items-center gap-2">
                <span className="w-2 h-2 bg-orange-400 rounded-full"></span>
                Smart Throttling {internalOnly && "(Internal Focused)"}
              </p>
              <p>QNXION automatically distributes engagements to avoid LinkedIn pattern detection. {internalOnly ? "Prioritizing reactions between accounts from your own company for maximum advocacy." : "Activity shifts to others if an account hits daily safety limits."}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
