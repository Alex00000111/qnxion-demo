
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts';
import { TrendingUp, Users, Heart, Share2, MessageSquare, Award, Sparkles, Eye, Search, BarChart3, Zap, X, CheckCircle2, ExternalLink } from 'lucide-react';
import { MOCK_ECMS_METRICS, MOCK_ACTIVITY_FEED, MOCK_ENGAGEMENT_CHART, MOCK_LINKEDIN_METRICS } from '../lib/mockData';

interface DashboardProps {
  managementMode: 'self' | 'agency';
}

const CONFETTI_COLORS = ['#6366f1', '#ec4899', '#10b981', '#f59e0b', '#8b5cf6', '#06b6d4'];

const AmplifyModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [url, setUrl] = useState('');
  const [phase, setPhase] = useState<'input' | 'success'>('input');
  const [confetti, setConfetti] = useState<Array<{ id: number; x: number; color: string; delay: number }>>([]);

  useEffect(() => {
    if (phase === 'success') {
      const pieces = Array.from({ length: 24 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        delay: Math.random() * 0.4,
      }));
      setConfetti(pieces);
      const t = setTimeout(onClose, 3500);
      return () => clearTimeout(t);
    }
  }, [phase, onClose]);

  const handleSubmit = () => {
    if (url.trim()) setPhase('success');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm" onClick={onClose}>
      <div className="animate-modal-in bg-white rounded-3xl shadow-2xl w-full max-w-md relative overflow-hidden" onClick={e => e.stopPropagation()}>
        {phase === 'input' ? (
          <div className="p-8 space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-900 flex items-center gap-2">
                <Zap className="text-indigo-600" size={22} />
                Amplify Organic Post
              </h3>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-xl transition-colors">
                <X size={18} className="text-gray-400" />
              </button>
            </div>
            <p className="text-sm text-gray-500">Paste the LinkedIn post URL to activate ecosystem amplification across all partner accounts.</p>
            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-500 uppercase tracking-wider">LinkedIn Post URL</label>
              <input
                type="text"
                value={url}
                onChange={e => setUrl(e.target.value)}
                placeholder="https://www.linkedin.com/posts/..."
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none text-sm"
              />
            </div>
            <button
              onClick={handleSubmit}
              disabled={!url.trim()}
              className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 active:scale-[0.98] transition-transform disabled:opacity-50 flex items-center justify-center gap-2"
            >
              <Zap size={18} />
              Amplify Now
            </button>
          </div>
        ) : (
          <div className="p-8 text-center relative overflow-hidden">
            {/* Confetti */}
            {confetti.map(c => (
              <div
                key={c.id}
                className="animate-confetti absolute w-2 h-2 rounded-sm"
                style={{
                  left: `${c.x}%`,
                  top: '-8px',
                  backgroundColor: c.color,
                  animationDelay: `${c.delay}s`,
                }}
              />
            ))}
            <div className="relative space-y-4">
              <div className="w-20 h-20 mx-auto bg-indigo-100 rounded-full flex items-center justify-center animate-pulse-ring">
                <Zap size={36} className="text-indigo-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900">Ecosystem Amplification Engaged</h3>
              <p className="text-sm text-gray-500">
                Your post is being distributed across 50+ partner accounts. Expect engagement within 15 minutes.
              </p>
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-green-600 bg-green-50 w-fit mx-auto px-4 py-2 rounded-full">
                <CheckCircle2 size={14} />
                Amplification Active
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export const Dashboard: React.FC<DashboardProps> = ({ managementMode }) => {
  const [showAmplify, setShowAmplify] = useState(false);

  return (
    <div className="space-y-8">
      {showAmplify && <AmplifyModal onClose={() => setShowAmplify(false)} />}
      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg">
              <Award size={24} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+24%</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Personal Credits</p>
          <p className="text-2xl font-bold text-gray-900">{MOCK_ECMS_METRICS.personalCredits.toLocaleString()}</p>
          <div className="mt-4 w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-600 h-full w-4/5"></div>
          </div>
          <p className="mt-2 text-[10px] text-gray-400">Receive 4.2k more passive actions</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-pink-50 text-pink-600 rounded-lg">
              <Heart size={24} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+185%</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Ecosystem Reactions</p>
          <p className="text-2xl font-bold text-gray-900">3,840</p>
          <p className="mt-2 text-xs text-gray-400">Total reactions from partners</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
              <Share2 size={24} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+240%</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Ecosystem Reposts</p>
          <p className="text-2xl font-bold text-gray-900">890</p>
          <p className="mt-2 text-xs text-gray-400">Viral reach via reshares</p>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] card-hover">
          <div className="flex items-center justify-between mb-4">
            <div className="p-2 bg-purple-50 text-purple-600 rounded-lg">
              <MessageSquare size={24} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+94%</span>
          </div>
          <p className="text-sm text-gray-500 font-medium">Ecosystem Comments</p>
          <p className="text-2xl font-bold text-gray-900">412</p>
          <p className="mt-2 text-xs text-gray-400">AI-suggested & human replies</p>
        </div>
      </div>

      {/* Amplify CTA */}
      <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 rounded-2xl p-6 flex items-center justify-between shadow-lg">
        <div className="flex items-center gap-4 text-white">
          <div className="p-3 bg-white/15 rounded-xl">
            <Zap size={24} />
          </div>
          <div>
            <h3 className="font-bold text-lg">Amplify an Organic Post</h3>
            <p className="text-indigo-200 text-sm">Boost any LinkedIn post across the entire partner ecosystem</p>
          </div>
        </div>
        <button
          onClick={() => setShowAmplify(true)}
          className="px-6 py-3 bg-white text-indigo-700 rounded-xl font-bold shadow-lg hover:bg-indigo-50 active:scale-[0.97] transition-transform flex items-center gap-2"
        >
          <Zap size={18} />
          Amplify Now
        </button>
      </div>

      {/* LinkedIn Snapshot Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 card-hover">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Eye size={20} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+{MOCK_LINKEDIN_METRICS.content.impressionsChange}%</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Impressions</p>
          <p className="text-2xl font-bold text-gray-900">{(MOCK_LINKEDIN_METRICS.content.impressions / 1000).toFixed(1)}k</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 card-hover">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Users size={20} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+{MOCK_LINKEDIN_METRICS.followers.newFollowersChange}%</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Followers</p>
          <p className="text-2xl font-bold text-gray-900">{MOCK_LINKEDIN_METRICS.followers.total.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 card-hover">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <Search size={20} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+{MOCK_LINKEDIN_METRICS.search.change}%</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Search Appearances</p>
          <p className="text-2xl font-bold text-gray-900">{MOCK_LINKEDIN_METRICS.search.appearances.toLocaleString()}</p>
        </div>

        <div className="bg-gradient-to-br from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100 card-hover">
          <div className="flex items-center justify-between mb-3">
            <div className="p-2 bg-indigo-100 text-indigo-600 rounded-lg">
              <BarChart3 size={20} />
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+{MOCK_LINKEDIN_METRICS.visitors.pageViewsChange}%</span>
          </div>
          <p className="text-xs text-gray-500 font-medium">Page Views</p>
          <p className="text-2xl font-bold text-gray-900">{MOCK_LINKEDIN_METRICS.visitors.pageViews.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 bg-white p-8 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Engagement Multiplier</h3>
              <p className="text-sm text-gray-500">Track how the ecosystem boosts your reach</p>
            </div>
            <select className="text-sm border-gray-200 rounded-lg focus:ring-indigo-500">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={MOCK_ENGAGEMENT_CHART}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Line type="monotone" dataKey="engagement" stroke="#6366f1" strokeWidth={3} dot={{ r: 4, fill: '#6366f1' }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="credits" stroke="#ec4899" strokeWidth={3} dot={{ r: 4, fill: '#ec4899' }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Sidebar Activity */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Recent Ecosystem Activity</h3>
          {managementMode === 'agency' && (
            <div className="mb-6 p-4 bg-purple-50 rounded-xl border border-purple-100 flex items-center gap-3">
              <Sparkles size={18} className="text-purple-600" />
              <p className="text-xs font-bold text-purple-700">Agent drafting 3 new posts for review</p>
            </div>
          )}
          <div className="space-y-6">
            {MOCK_ACTIVITY_FEED.map((item) => (
              <div key={item.id} className="flex gap-4">
                <div className="relative">
                  <img src={`https://picsum.photos/seed/${item.avatarSeed}/40/40`} className="w-10 h-10 rounded-full" alt="Partner" />
                  <div className="absolute -bottom-1 -right-1 bg-green-500 w-3 h-3 rounded-full border-2 border-white"></div>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    <span className="font-bold">{item.company}</span> {item.action}
                  </p>
                  <p className="text-xs text-gray-400 mt-1">{item.timeAgo} • +{item.credits} Credits</p>
                </div>
              </div>
            ))}
          </div>
          <button className="w-full mt-8 py-3 text-sm font-semibold text-indigo-600 bg-indigo-50 rounded-xl hover:bg-indigo-100 transition-colors">
            View All Activity
          </button>
        </div>
      </div>
    </div>
  );
};
