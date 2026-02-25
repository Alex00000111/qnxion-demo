
import React, { useState, useEffect, useRef } from 'react';
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
  ShieldAlert,
  Lock,
  CheckCircle2,
  Calendar,
  Info,
} from 'lucide-react';
import { Campaign, Channel } from '../types';

const CONFETTI_COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6'];

const initialCampaigns: Campaign[] = [
  {
    id: '1',
    name: 'TPAC Partner Acquisition — SA Tech',
    type: 'Outbound',
    status: 'Active',
    channels: [Channel.LINKEDIN, Channel.EMAIL],
    targets: 1200,
    successRate: 18.5,
    createdAt: '2026-01-15',
  },
  {
    id: '2',
    name: 'B2B Ecosystem Founders Network',
    type: 'Inbound',
    status: 'Active',
    channels: [Channel.LINKEDIN, Channel.WHATSAPP],
    targets: 850,
    successRate: 22.1,
    createdAt: '2026-02-01',
  },
  {
    id: '3',
    name: 'Ecosystem Onboarding Drip — New Partners',
    type: 'Outbound',
    status: 'Paused',
    channels: [Channel.EMAIL],
    targets: 4500,
    successRate: 12.8,
    createdAt: '2025-12-10',
  },
];

interface CampaignsProps {
  managementMode: 'self' | 'agency';
}

const getTomorrow = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};
const getIn31Days = () => {
  const d = new Date();
  d.setDate(d.getDate() + 31);
  return d.toISOString().split('T')[0];
};

export const Campaigns: React.FC<CampaignsProps> = ({ managementMode }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>(initialCampaigns);
  const [isCreating, setIsCreating] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [showTemplateModal, setShowTemplateModal] = useState(false);
  const [campaignName, setCampaignName] = useState('New QNXION Campaign');

  // Targeting state
  const [audienceType, setAudienceType] = useState<'individual' | 'company' | 'both'>('individual');
  const [selectedIndustries, setSelectedIndustries] = useState<string[]>(['Technology', 'Finance']);
  const [selectedCompanySize, setSelectedCompanySize] = useState<string[]>(['51–200', '201–500']);
  const [selectedSeniority, setSelectedSeniority] = useState<string[]>(['VP', 'C-Suite']);
  const [isCalculating, setIsCalculating] = useState(false);
  const prevTargetingRef = useRef({ audienceType, selectedIndustries, selectedCompanySize, selectedSeniority });

  // Schedule state
  const [startDate, setStartDate] = useState(getTomorrow);
  const [endDate, setEndDate] = useState(getIn31Days);
  const [sendTime, setSendTime] = useState('10:30 AM');
  const [showFreqTooltip, setShowFreqTooltip] = useState(false);

  // Launch state
  const [showToast, setShowToast] = useState(false);
  const [launchConfetti, setLaunchConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

  const steps = [
    { id: 1, label: 'Targeting' },
    { id: 2, label: 'Audience' },
    { id: 3, label: 'Campaign Flow' },
    { id: 4, label: 'Schedule' },
    { id: 5, label: 'Review' },
  ];

  const calculateAudiencePool = () => {
    let pool = 800;
    pool += selectedIndustries.length * 720;
    pool += selectedCompanySize.length * 550;
    pool += selectedSeniority.length * 420;
    if (audienceType === 'both') pool = Math.round(pool * 1.45);
    if (audienceType === 'company') pool = Math.round(pool * 0.6);
    return pool;
  };

  useEffect(() => {
    const prev = prevTargetingRef.current;
    const changed =
      prev.audienceType !== audienceType ||
      JSON.stringify(prev.selectedIndustries) !== JSON.stringify(selectedIndustries) ||
      JSON.stringify(prev.selectedCompanySize) !== JSON.stringify(selectedCompanySize) ||
      JSON.stringify(prev.selectedSeniority) !== JSON.stringify(selectedSeniority);
    if (changed && currentStep === 2) {
      setIsCalculating(true);
      const t = setTimeout(() => setIsCalculating(false), 800);
      prevTargetingRef.current = { audienceType, selectedIndustries, selectedCompanySize, selectedSeniority };
      return () => clearTimeout(t);
    }
    prevTargetingRef.current = { audienceType, selectedIndustries, selectedCompanySize, selectedSeniority };
  }, [audienceType, selectedIndustries, selectedCompanySize, selectedSeniority, currentStep]);

  const togglePill = (
    value: string,
    list: string[],
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value]);
  };

  const handleLaunch = () => {
    const pieces = Array.from({ length: 32 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      color: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      delay: Math.random() * 0.6,
    }));
    setLaunchConfetti(pieces);
    const newCampaign: Campaign = {
      id: String(Date.now()),
      name: campaignName,
      type: 'Outbound',
      status: 'Active',
      channels: [Channel.LINKEDIN],
      targets: calculateAudiencePool(),
      successRate: 0,
      createdAt: startDate,
    };
    setCampaigns(prev => [newCampaign, ...prev]);
    setShowToast(true);
    setTimeout(() => {
      setIsCreating(false);
      setCurrentStep(1);
      setShowToast(false);
      setLaunchConfetti([]);
      setCampaignName('New QNXION Campaign');
      setAudienceType('individual');
      setSelectedIndustries(['Technology', 'Finance']);
      setSelectedCompanySize(['51–200', '201–500']);
      setSelectedSeniority(['VP', 'C-Suite']);
      setStartDate(getTomorrow());
      setEndDate(getIn31Days());
      setSendTime('10:30 AM');
    }, 2800);
  };

  const handleNext = () => {
    if (currentStep === 5) {
      handleLaunch();
    } else {
      setCurrentStep(s => s + 1);
    }
  };

  if (isCreating && managementMode === 'self') {
    const audiencePool = calculateAudiencePool();

    return (
      <div className="fixed inset-0 z-50 bg-[#f9fafb] flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-4 duration-300">
        {/* Confetti */}
        {launchConfetti.map(c => (
          <div
            key={c.id}
            className="animate-confetti fixed w-2.5 h-2.5 rounded-sm pointer-events-none z-[60]"
            style={{ left: `${c.x}%`, top: '-10px', backgroundColor: c.color, animationDelay: `${c.delay}s` }}
          />
        ))}

        {/* Toast */}
        {showToast && (
          <div className="fixed bottom-24 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-gray-900 text-white px-6 py-3.5 rounded-xl shadow-2xl z-50 animate-in fade-in slide-in-from-bottom-2 duration-300">
            <CheckCircle2 size={18} className="text-green-400" />
            <span className="font-semibold text-sm">Campaign launched successfully</span>
          </div>
        )}

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

        {/* Step indicator */}
        <div className="bg-white border-b border-gray-100 px-8 py-3 flex items-center justify-center gap-2">
          {steps.map((step, i) => (
            <React.Fragment key={step.id}>
              <div className="flex items-center gap-1.5">
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold transition-all ${
                  currentStep === step.id
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                    : currentStep > step.id
                    ? 'bg-indigo-100 text-indigo-600'
                    : 'bg-gray-100 text-gray-400'
                }`}>
                  {currentStep > step.id ? <Check size={11} /> : step.id}
                </div>
                <span className={`text-xs font-semibold hidden sm:block transition-colors ${
                  currentStep === step.id ? 'text-gray-900' : 'text-gray-400'
                }`}>
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div className={`h-px w-6 transition-colors ${currentStep > i + 1 ? 'bg-indigo-300' : 'bg-gray-200'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-5xl mx-auto space-y-6">

            {/* ── Step 1: Targeting ── */}
            {currentStep === 1 && (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Define Your Target Audience</h2>
                  <p className="text-gray-500">Who do you want to reach with this campaign?</p>
                </div>

                {/* Campaign Name */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Campaign Name</label>
                    <input
                      type="text"
                      value={campaignName}
                      onChange={e => setCampaignName(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                    />
                  </div>
                </div>

                {/* Audience Type */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">Audience Type</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[
                      { value: 'individual', label: 'Individual Professionals', icon: UserCheck },
                      { value: 'company', label: 'Company Admins', icon: Users },
                      { value: 'both', label: 'Both', icon: Target },
                    ].map(({ value, label, icon: Icon }) => (
                      <button
                        key={value}
                        onClick={() => setAudienceType(value as typeof audienceType)}
                        className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all text-center ${
                          audienceType === value
                            ? 'border-indigo-600 bg-indigo-50 text-indigo-700'
                            : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                        }`}
                      >
                        <Icon size={20} />
                        <span className="text-xs font-bold leading-tight">{label}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Industry */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">Industry</label>
                  <div className="flex flex-wrap gap-2">
                    {['Technology', 'Finance', 'Consulting', 'Manufacturing'].map(ind => (
                      <button
                        key={ind}
                        onClick={() => togglePill(ind, selectedIndustries, setSelectedIndustries)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                          selectedIndustries.includes(ind)
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        {ind}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Company Size */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">Company Size</label>
                  <div className="flex flex-wrap gap-2">
                    {['11–50', '51–200', '201–500', '500+'].map(size => (
                      <button
                        key={size}
                        onClick={() => togglePill(size, selectedCompanySize, setSelectedCompanySize)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                          selectedCompanySize.includes(size)
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Seniority */}
                <div className="space-y-3">
                  <label className="block text-sm font-bold text-gray-700">Seniority Level</label>
                  <div className="flex flex-wrap gap-2">
                    {['Director', 'VP', 'C-Suite', 'Founder'].map(sen => (
                      <button
                        key={sen}
                        onClick={() => togglePill(sen, selectedSeniority, setSelectedSeniority)}
                        className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
                          selectedSeniority.includes(sen)
                            ? 'bg-indigo-600 text-white border-indigo-600'
                            : 'bg-white text-gray-600 border-gray-200 hover:border-indigo-300'
                        }`}
                      >
                        {sen}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ── Step 2: Audience Preview ── */}
            {currentStep === 2 && (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Audience Preview</h2>
                  <p className="text-gray-500">Based on your targeting selections</p>
                </div>

                {/* Estimated pool */}
                <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] text-center space-y-2">
                  <p className="text-sm font-bold text-gray-500 uppercase tracking-wider">Estimated Audience Pool</p>
                  {isCalculating ? (
                    <div className="flex items-center justify-center gap-3 py-2">
                      <div className="h-12 w-36 bg-gray-100 rounded-xl animate-pulse" />
                      <span className="text-sm text-gray-400 font-medium">Calculating…</span>
                    </div>
                  ) : (
                    <p className="text-6xl font-extrabold text-gray-900 tracking-tight">
                      {audiencePool.toLocaleString()}
                    </p>
                  )}
                  <p className="text-xs text-gray-400">
                    Qualified profiles matching your criteria
                  </p>
                </div>

                {/* Audience composition bar */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] space-y-4">
                  <p className="text-sm font-bold text-gray-700">Audience Composition</p>
                  <div className="flex h-4 rounded-full overflow-hidden">
                    <div className="bg-indigo-600 flex items-center justify-center" style={{ width: '45%' }} />
                    <div className="bg-violet-500" style={{ width: '35%' }} />
                    <div className="bg-slate-300" style={{ width: '20%' }} />
                  </div>
                  <div className="flex items-center gap-6 text-xs font-semibold">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-indigo-600" />
                      <span className="text-gray-600">Job Title Match 45%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-violet-500" />
                      <span className="text-gray-600">Industry Match 35%</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-slate-300" />
                      <span className="text-gray-600">Network Overlap 20%</span>
                    </div>
                  </div>
                </div>

                <p className="text-center text-sm text-gray-400">
                  Refine targeting in Step 1 to adjust your audience
                </p>
              </div>
            )}

            {/* ── Step 3: Campaign Flow ── */}
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

            {/* ── Step 4: Schedule ── */}
            {currentStep === 4 && (
              <div className="max-w-2xl mx-auto space-y-8">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Schedule Your Campaign</h2>
                  <p className="text-gray-500">Set your campaign timeline and optimal send window</p>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700">Start Date</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          value={startDate}
                          onChange={e => setStartDate(e.target.value)}
                          className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-bold text-gray-700">End Date</label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                          type="date"
                          value={endDate}
                          onChange={e => setEndDate(e.target.value)}
                          className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Optimal Send Time</label>
                    <div className="relative">
                      <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                      <select
                        value={sendTime}
                        onChange={e => setSendTime(e.target.value)}
                        className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm appearance-none bg-white"
                      >
                        <option>9:00 AM</option>
                        <option>10:30 AM</option>
                        <option>2:00 PM</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="block text-sm font-bold text-gray-700">Session Frequency</label>
                    <div className="flex items-center justify-between px-4 py-3 bg-gray-50 rounded-xl border border-gray-200">
                      <span className="text-sm font-medium text-gray-700">
                        5 actions per session · 3 sessions per week
                      </span>
                      <div className="flex items-center gap-2 relative">
                        <button
                          onMouseEnter={() => setShowFreqTooltip(true)}
                          onMouseLeave={() => setShowFreqTooltip(false)}
                          className="p-1 text-gray-400 hover:text-gray-600"
                        >
                          <Lock size={14} />
                        </button>
                        {showFreqTooltip && (
                          <div className="absolute right-0 bottom-full mb-2 w-60 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg z-10 pointer-events-none">
                            Enforced by QNXION to comply with LinkedIn rate limits
                            <div className="absolute top-full right-3 border-4 border-transparent border-t-gray-900" />
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 px-4 py-3 bg-green-50 border border-green-200 rounded-xl">
                  <CheckCircle2 size={16} className="text-green-600" />
                  <span className="text-sm font-bold text-green-700">LinkedIn Rate-Limit Compliant</span>
                  <span className="text-xs text-green-600 ml-1">· Optimised for account safety</span>
                </div>
              </div>
            )}

            {/* ── Step 5: Review & Launch ── */}
            {currentStep === 5 && (
              <div className="max-w-2xl mx-auto space-y-6">
                <div className="text-center space-y-2">
                  <h2 className="text-3xl font-bold text-gray-900">Review & Launch</h2>
                  <p className="text-gray-500">Everything looks good. Launch when ready.</p>
                </div>

                {/* Campaign Summary */}
                <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] space-y-5">
                  <h3 className="font-bold text-gray-900 text-lg border-b border-gray-100 pb-3">Campaign Summary</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Campaign Name</span>
                      <span className="font-bold text-gray-900">{campaignName}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Audience Type</span>
                      <span className="font-bold text-gray-900 capitalize">
                        {audienceType === 'individual' ? 'Individual Professionals' : audienceType === 'company' ? 'Company Admins' : 'Both'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Industries</span>
                      <span className="font-bold text-gray-900">{selectedIndustries.join(', ') || 'None selected'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Seniority</span>
                      <span className="font-bold text-gray-900">{selectedSeniority.join(', ') || 'None selected'}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Flow Steps</span>
                      <span className="font-bold text-gray-900">5 actions configured</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Start Date</span>
                      <span className="font-bold text-gray-900">{new Date(startDate).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">End Date</span>
                      <span className="font-bold text-gray-900">{new Date(endDate).toLocaleDateString('en-ZA', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500 font-medium">Send Time</span>
                      <span className="font-bold text-gray-900">{sendTime}</span>
                    </div>
                  </div>
                </div>

                {/* Projected Results */}
                <div className="bg-indigo-600 p-6 rounded-2xl text-white space-y-4">
                  <h3 className="font-bold text-lg">Expected Outcomes in 30 Days</h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <p className="text-2xl font-extrabold">32%</p>
                      <p className="text-xs text-indigo-200 mt-1 font-medium">Connection Acceptance Rate</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <p className="text-2xl font-extrabold">~87</p>
                      <p className="text-xs text-indigo-200 mt-1 font-medium">New Connections</p>
                    </div>
                    <div className="bg-white/10 rounded-xl p-4 text-center">
                      <p className="text-2xl font-extrabold">~14</p>
                      <p className="text-xs text-indigo-200 mt-1 font-medium">Pipeline Accounts</p>
                    </div>
                  </div>
                  <p className="text-xs text-indigo-300">Based on ecosystem benchmarks for your industry + targeting selections</p>
                </div>
              </div>
            )}

          </div>
        </div>

        <footer className="bg-white border-t border-gray-200 px-8 py-4">
          <div className="max-w-5xl mx-auto flex items-center justify-between">
            <button
              onClick={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : setIsCreating(false)}
              className="px-6 py-2.5 bg-gray-50 text-gray-700 font-bold rounded-lg hover:bg-gray-100 transition-all"
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className={`px-8 py-2.5 font-bold rounded-lg transition-all shadow-lg ${
                currentStep === 5
                  ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                  : 'bg-gray-900 text-white hover:bg-black'
              }`}
            >
              {currentStep === 5 ? 'Launch Campaign' : 'Next'}
            </button>
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
            {campaigns.map((camp) => (
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
