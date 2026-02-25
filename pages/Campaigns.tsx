
import React, { useState } from 'react';
import { 
  Plus, 
  Linkedin, 
  Mail, 
  MessageCircle, 
  ChevronRight,
  TrendingUp,
  BarChart3,
  Languages,
  Eye,
  UserPlus,
  Users,
  MessageSquare,
  Award,
  Clock,
  Zap,
  ChevronLeft,
  X,
  Smile,
  Paperclip,
  Undo2,
  Redo2,
  MoreVertical,
  Layers,
  Search,
  Check,
  Target,
  UserCheck,
  ShieldAlert
} from 'lucide-react';
import { Campaign, Channel } from '../types';

const mockCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'TPAC Partner Acquisition — SA Tech',
    type: 'Outbound',
    status: 'Active',
    channels: [Channel.LINKEDIN, Channel.EMAIL],
    targets: 1200,
    successRate: 18.5,
    createdAt: '2026-01-15'
  },
  {
    id: '2',
    name: 'B2B Ecosystem Founders Network',
    type: 'Inbound',
    status: 'Active',
    channels: [Channel.LINKEDIN, Channel.WHATSAPP],
    targets: 850,
    successRate: 22.1,
    createdAt: '2026-02-01'
  },
  {
    id: '3',
    name: 'Ecosystem Onboarding Drip — New Partners',
    type: 'Outbound',
    status: 'Paused',
    channels: [Channel.EMAIL],
    targets: 4500,
    successRate: 12.8,
    createdAt: '2025-12-10'
  },
];

interface CampaignsProps {
  managementMode: 'self' | 'agency';
}

export const Campaigns: React.FC<CampaignsProps> = ({ managementMode }) => {
  const [isCreating, setIsCreating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [campaignName, setCampaignName] = useState('New QNXION Campaign');

  const steps = [
    { id: 1, label: 'Targeting' },
    { id: 2, label: 'Audience' },
    { id: 3, label: 'Campaign Flow' },
    { id: 4, label: 'Schedule' },
    { id: 5, label: 'Review' },
  ];

  if (isCreating && managementMode === 'self') {
    return (
      <div className="fixed inset-0 z-50 bg-[#f9fafb] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setIsCreating(false)}
              className="p-2 hover:bg-gray-100 rounded-full text-gray-400"
            >
              <X size={20} />
            </button>
            <h2 className="text-lg font-bold text-gray-900">Create campaign flow</h2>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg text-sm font-bold text-gray-700 hover:bg-gray-50">
              <Plus size={16} /> Add new
            </button>
          </div>
        </header>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-6">
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="bg-white border border-gray-200 rounded-2xl shadow-[0_4px_24px_rgba(99,102,241,0.06)] overflow-hidden">
                  <div className="p-4 border-b border-gray-100 bg-[#fff5f2] flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-orange-100 text-orange-600 rounded-lg">
                        <Layers size={20} />
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">Connect Flow</h3>
                        <p className="text-xs text-gray-500">Send your targets a connection request, with an optional connection note and follow-up message</p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3 bg-indigo-900 text-white px-4 py-2 rounded-lg text-sm font-medium">
                      <span>Connection Flow A</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded text-[10px] flex items-center gap-1">
                        <Users size={10} /> 400
                      </span>
                      <MoreVertical size={16} className="ml-2 cursor-pointer opacity-70" />
                    </div>
                    <button className="flex items-center gap-2 text-indigo-600 font-bold text-sm px-4 py-2 hover:bg-indigo-50 rounded-lg">
                      <Plus size={16} /> Create split test
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <FlowActionCard icon={Languages} title="Automatic translation" desc="Automatically translate messages to recipients language" toggle />
                  <FlowActionCard icon={Eye} title="View profile" desc="View the target's profile immediately before connecting" toggle />
                  <FlowActionCard icon={UserPlus} title="Connection Request" desc="Send a connection request to your targets. This step is always active" active />
                  
                  <button onClick={() => setShowTemplateModal(true)} className="w-full flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-all bg-white">
                    <div className="p-2 bg-gray-50 rounded-lg group-hover:bg-indigo-50"><Plus size={20} /></div>
                    <span className="font-bold">Add a Connection Note</span>
                  </button>

                  <FlowActionCard icon={MessageSquare} title="React to a post" desc="Engage your target by reacting to their latest post" toggle />
                  <FlowActionCard icon={Clock} title="Message Sequence" desc="Send a follow-up sequence after targets accept your connection request. Sequences stop when a lead replies" toggle />

                  <button className="w-full flex items-center gap-3 p-4 border-2 border-dashed border-gray-200 rounded-2xl text-gray-400 hover:border-indigo-300 hover:text-indigo-500 transition-all bg-white">
                    <div className="p-2 bg-gray-50 rounded-lg"><Plus size={20} /></div>
                    <span className="font-bold">Add a Follow-Up Message</span>
                  </button>

                  <div className="bg-indigo-50 border border-indigo-200 rounded-2xl p-4 flex items-center justify-between shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
                    <div className="flex items-center gap-4">
                      <div className="p-2 bg-white text-indigo-600 rounded-xl shadow-[0_4px_24px_rgba(99,102,241,0.06)]"><Target size={24} /></div>
                      <div>
                        <h4 className="font-bold text-gray-900">Company Page Invite</h4>
                        <p className="text-xs text-gray-500">Automatically invite targets to follow your company page after connection</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4">
                      <select className="bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-700">
                        <option>TPAC Impact Collective</option>
                        <option>TPAC Engineering Hub</option>
                      </select>
                      <div className="w-12 h-6 bg-indigo-600 rounded-full relative cursor-pointer">
                        <div className="absolute right-1 top-1 bg-white w-4 h-4 rounded-full"></div>
                      </div>
                    </div>
                  </div>

                  <FlowActionCard icon={Award} title="Endorse a skill" desc="Ping your target by endorsing one of their skills" toggle />
                </div>
              </div>
            )}
            {/* ... other steps ... */}
            {currentStep === 1 && (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Campaign Basics</h2>
                  <p className="text-gray-500">Name your campaign and select your sending accounts</p>
                </div>
                <div className="space-y-4">
                   <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] space-y-4">
                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Name</label>
                      <input type="text" value={campaignName} onChange={(e) => setCampaignName(e.target.value)} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500" />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        <footer className="bg-white border-t border-gray-200 px-8 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : setIsCreating(false)} className="px-6 py-2.5 bg-gray-50 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-all">Back</button>
            <button onClick={() => currentStep < 5 ? setCurrentStep(currentStep + 1) : setIsCreating(false)} className="px-8 py-2.5 bg-gray-900 text-white font-bold rounded-lg hover:bg-black transition-all shadow-lg">{currentStep === 5 ? 'Finish' : 'Next'}</button>
          </div>
        </footer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Campaign Manager</h2>
          <p className="text-gray-500">Scale your outreach across LinkedIn, Email, and WhatsApp</p>
        </div>
        {managementMode === 'self' ? (
          <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition-all shadow-lg"
          >
            <Plus size={20} />
            Create New Campaign
          </button>
        ) : (
          <div className="flex items-center gap-4 bg-purple-50 px-6 py-3 rounded-xl border border-purple-100 text-purple-700">
            <ShieldAlert size={20} />
            <div className="text-sm font-bold">
              Campaigns Managed by TPAC Agency
              <p className="text-[10px] font-medium text-purple-500">Reach out to your representative for changes.</p>
            </div>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] flex items-center gap-4">
          <div className="w-12 h-12 bg-green-50 rounded-xl flex items-center justify-center text-green-600">
            <TrendingUp size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Avg. Response Rate</p>
            <p className="text-xl font-bold text-gray-900">18.4%</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] flex items-center gap-4">
          <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center text-indigo-600">
            <BarChart3 size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Active Contacts</p>
            <p className="text-xl font-bold text-gray-900">6,550</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600">
            <Linkedin size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Posts Echoed</p>
            <p className="text-xl font-bold text-gray-900">142</p>
          </div>
        </div>
      </div>

      <div className={`bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(99,102,241,0.06)] ${managementMode === 'agency' ? 'opacity-70 pointer-events-none grayscale-[0.5]' : ''}`}>
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Campaign Name</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider">Performance</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase tracking-wider text-right"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {mockCampaigns.map((camp) => (
              <tr key={camp.id} className="hover:bg-gray-50 group transition-colors">
                <td className="px-6 py-5 font-bold text-gray-900">{camp.name}</td>
                <td className="px-6 py-5">
                   <span className={`px-3 py-1 rounded-full text-xs font-bold ${camp.status === 'Active' ? 'bg-green-50 text-green-700' : 'bg-gray-100 text-gray-600'}`}>
                    {camp.status}
                  </span>
                </td>
                <td className="px-6 py-5 font-bold text-gray-700">{camp.successRate}%</td>
                <td className="px-6 py-5 text-right"><ChevronRight size={20} className="text-gray-300" /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const FlowActionCard: React.FC<{ icon: any, title: string, desc: string, toggle?: boolean, active?: boolean }> = ({ icon: Icon, title, desc, toggle, active }) => (
  <div className={`bg-white border border-gray-200 rounded-2xl p-4 flex items-center justify-between shadow-[0_4px_24px_rgba(99,102,241,0.06)] transition-all ${active ? 'ring-2 ring-indigo-600 border-transparent' : ''}`}>
    <div className="flex items-center gap-4">
      <div className={`p-2 rounded-xl ${active ? 'bg-indigo-600 text-white' : 'bg-gray-100 text-gray-500'}`}><Icon size={24} /></div>
      <div><h4 className="font-bold text-gray-900">{title}</h4><p className="text-xs text-gray-500">{desc}</p></div>
    </div>
    {toggle && <div className="w-12 h-6 bg-gray-200 rounded-full relative cursor-pointer"><div className="absolute left-1 top-1 bg-white w-4 h-4 rounded-full"></div></div>}
  </div>
);
