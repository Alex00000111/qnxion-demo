
import React, { useState } from 'react';
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar
} from 'recharts';
import { Clock, TrendingUp, Users, Heart, MessageSquare, Share2, Eye } from 'lucide-react';
import { MOCK_ECMS_METRICS, MOCK_CHART_DATA, MOCK_LINKEDIN_METRICS } from '../lib/mockData';

type TimeRange = '7d' | '30d' | '90d';

// ── Metrics per time range ────────────────────────────────────────────────
const RANGE_METRICS: Record<TimeRange, {
  impressions: number; impressionsChange: number;
  followers: number; followersChange: number;
  reactions: number; reactionsChange: number;
  comments: number; commentsChange: number;
  reposts: number; repostsChange: number;
  label: string;
}> = {
  '7d': {
    impressions: 8400,   impressionsChange: 12,
    followers: 42,       followersChange: 18,
    reactions: 680,      reactionsChange: 31,
    comments: 74,        commentsChange: 22,
    reposts: 148,        repostsChange: 44,
    label: '7-day',
  },
  '30d': {
    impressions: 45200,  impressionsChange: 34,
    followers: 215,      followersChange: 215,
    reactions: 3840,     reactionsChange: 185,
    comments: 412,       commentsChange: 94,
    reposts: 890,        repostsChange: 240,
    label: '30-day',
  },
  '90d': {
    impressions: 118600, impressionsChange: 67,
    followers: 640,      followersChange: 58,
    reactions: 9200,     reactionsChange: 210,
    comments: 1040,      commentsChange: 128,
    reposts: 2480,       repostsChange: 290,
    label: '90-day',
  },
};

// Generate 90-day chart data by extrapolating from the 30-day array
const CHART_DATA_90D = Array.from({ length: 90 }, (_, i) => {
  const base = MOCK_CHART_DATA[i % 30];
  const factor = 1 + (i / 90) * 0.6;
  return {
    ...base,
    day: `Day ${i + 1}`,
    impressions: Math.round(base.impressions * factor),
    followers: Math.round(base.followers * (1 + i * 0.007)),
    ecosystemMultiplier: Math.round((base.ecosystemMultiplier ?? 0) * factor),
  };
});

export const Analytics: React.FC = () => {
  const [timeRange, setTimeRange] = useState<TimeRange>('30d');

  const metrics = RANGE_METRICS[timeRange];

  // Chart data per range
  const chartData =
    timeRange === '7d'
      ? MOCK_CHART_DATA.slice(-7)
      : timeRange === '90d'
      ? CHART_DATA_90D
      : MOCK_CHART_DATA;

  // Reach comparison (always 7 data points for the top section chart)
  const reachData = MOCK_CHART_DATA.slice(-7).map((d, i) => ({
    name: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
    qnxion: d.impressions,
    manual: Math.round(d.impressions * 0.22),
  }));

  return (
    <div className="space-y-8">
      {/* Software Value Header */}
      <div className="bg-indigo-900 rounded-[32px] p-8 text-white relative overflow-hidden shadow-xl">
        <div className="absolute top-0 right-0 p-12 opacity-10">
          <TrendingUp size={160} />
        </div>
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          <div className="space-y-2">
            <p className="text-indigo-300 text-sm font-bold uppercase tracking-widest">Est. Software Value</p>
            <h2 className="text-5xl font-extrabold">$4,280<span className="text-indigo-400 text-xl font-medium ml-2">saved/mo</span></h2>
            <p className="text-xs text-indigo-300">Based on manual time saved & engagement reach cost</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-1">
              <Clock size={20} className="text-indigo-300" />
              <span className="text-sm font-bold">Time Saved</span>
            </div>
            <p className="text-2xl font-bold">186 hrs</p>
            <p className="text-[10px] text-indigo-300 mt-1">Manual LinkedIn activity replaced by AI</p>
          </div>
          <div className="bg-white/10 backdrop-blur-md p-6 rounded-2xl border border-white/20">
            <div className="flex items-center gap-3 mb-1">
              <Users size={20} className="text-indigo-300" />
              <span className="text-sm font-bold">Ecosystem Reach Delta</span>
            </div>
            <p className="text-2xl font-bold">+310%</p>
            <p className="text-[10px] text-indigo-300 mt-1">Growth compared to siloed engagement</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Reach Chart */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h3 className="text-lg font-bold text-gray-900">Reach Multiplier Comparison</h3>
              <p className="text-sm text-gray-500">Manual Effort vs. QNXION Ecosystem</p>
            </div>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={reachData}>
                <defs>
                  <linearGradient id="colorQnxion" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 12}} />
                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="qnxion" stroke="#6366f1" fillOpacity={1} fill="url(#colorQnxion)" strokeWidth={3} />
                <Area type="monotone" dataKey="manual" stroke="#94a3b8" fillOpacity={0} strokeWidth={2} strokeDasharray="5 5" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Engagement Distribution */}
        <div className="bg-white p-8 rounded-[32px] border border-gray-200 shadow-sm flex flex-col">
          <h3 className="text-lg font-bold text-gray-900 mb-6">Engagement Source Distribution</h3>
          <div className="flex-1 flex flex-col justify-center space-y-8">
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-gray-600">Organic (Direct)</span>
                <span>15%</span>
              </div>
              <div className="h-4 w-full bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-gray-400" style={{width: '15%'}}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-indigo-600">Ecosystem Multiplier (High Reciprocity)</span>
                <span>65%</span>
              </div>
              <div className="h-4 w-full bg-indigo-100 rounded-full overflow-hidden">
                <div className="h-full bg-indigo-600" style={{width: '65%'}}></div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between text-sm font-bold">
                <span className="text-purple-600">AI Outreach Conversions</span>
                <span>20%</span>
              </div>
              <div className="h-4 w-full bg-purple-100 rounded-full overflow-hidden">
                <div className="h-full bg-purple-600" style={{width: '20%'}}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* LinkedIn Company Page Analytics — with time range selector */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold text-gray-900">LinkedIn Company Page Analytics</h2>
          <p className="text-sm text-gray-500">{metrics.label} performance overview powered by QNXION ecosystem</p>
        </div>
        <select
          value={timeRange}
          onChange={e => setTimeRange(e.target.value as TimeRange)}
          className="px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-700 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none shadow-sm"
        >
          <option value="7d">Last 7 days</option>
          <option value="30d">Last 30 days</option>
          <option value="90d">Last 90 days</option>
        </select>
      </div>

      {/* Engagement Summary Cards — update per range */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-50 text-pink-600 rounded-lg"><Heart size={20} /></div>
              <span className="text-sm font-medium text-gray-500">Reactions</span>
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+{metrics.reactionsChange}%</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.reactions.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-50 text-blue-600 rounded-lg"><MessageSquare size={20} /></div>
              <span className="text-sm font-medium text-gray-500">Comments</span>
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+{metrics.commentsChange}%</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.comments.toLocaleString()}</p>
        </div>
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] card-hover">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-50 text-purple-600 rounded-lg"><Share2 size={20} /></div>
              <span className="text-sm font-medium text-gray-500">Reposts</span>
            </div>
            <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-full">+{metrics.repostsChange}%</span>
          </div>
          <p className="text-3xl font-bold text-gray-900">{metrics.reposts.toLocaleString()}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Impressions Chart */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Impressions ({metrics.label} Trend)</h3>
            <p className="text-sm text-gray-500">Organic vs. Ecosystem Multiplier</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorImpressions" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorEcosystem" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ec4899" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#ec4899" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} interval={Math.floor(chartData.length / 6)} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="impressions" stroke="#6366f1" fillOpacity={1} fill="url(#colorImpressions)" strokeWidth={2} name="Total Impressions" />
                <Area type="monotone" dataKey="ecosystemMultiplier" stroke="#ec4899" fillOpacity={1} fill="url(#colorEcosystem)" strokeWidth={2} name="Ecosystem Multiplier" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Follower Growth Chart */}
        <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
          <div className="mb-6">
            <h3 className="text-lg font-bold text-gray-900">Follower Growth</h3>
            <p className="text-sm text-gray-500">{MOCK_LINKEDIN_METRICS.followers.total.toLocaleString()} total • +{metrics.followers} new this period</p>
          </div>
          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData}>
                <defs>
                  <linearGradient id="colorFollowers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.15}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} interval={Math.floor(chartData.length / 6)} />
                <YAxis axisLine={false} tickLine={false} tick={{fill: '#9ca3af', fontSize: 11}} domain={['dataMin - 50', 'dataMax + 50']} />
                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }} />
                <Area type="monotone" dataKey="followers" stroke="#10b981" fillOpacity={1} fill="url(#colorFollowers)" strokeWidth={2} name="Followers" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Content Performance Table */}
      <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h3 className="text-lg font-bold text-gray-900">Content Performance</h3>
          <p className="text-sm text-gray-500">Individual post metrics</p>
        </div>
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Post</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right">Impressions</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right">Engagement</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right">Reactions</th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase text-right">Comments</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {MOCK_LINKEDIN_METRICS.posts.map((post, i) => (
              <tr key={i} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-gray-900 truncate max-w-xs">{post.title}</p>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm font-bold text-gray-900">{post.impressions.toLocaleString()}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className={`text-sm font-bold ${post.engagementRate >= 15 ? 'text-green-600' : post.engagementRate >= 10 ? 'text-indigo-600' : 'text-gray-600'}`}>
                    {post.engagementRate}%
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-600">{post.reactions}</span>
                </td>
                <td className="px-6 py-4 text-right">
                  <span className="text-sm text-gray-600">{post.comments}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Visitor Demographics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {([
          { title: 'Job Function', data: MOCK_LINKEDIN_METRICS.visitorDemographics.jobFunction },
          { title: 'Industry', data: MOCK_LINKEDIN_METRICS.visitorDemographics.industry },
          { title: 'Seniority', data: MOCK_LINKEDIN_METRICS.visitorDemographics.seniority },
        ] as const).map(({ title, data }) => (
          <div key={title} className="bg-white p-6 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] card-hover">
            <h4 className="text-sm font-bold text-gray-900 mb-4">{title}</h4>
            <div className="space-y-3">
              {data.map((item) => (
                <div key={item.label}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-gray-600 font-medium">{item.label}</span>
                    <span className="font-bold text-gray-900">{item.percentage}%</span>
                  </div>
                  <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{width: `${item.percentage}%`}}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Follower Demographics (Location) */}
      <div className="bg-white p-8 rounded-2xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
        <h3 className="text-lg font-bold text-gray-900 mb-6">Follower Demographics — Location</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {MOCK_LINKEDIN_METRICS.followers.demographics.map((loc) => (
            <div key={loc.location} className="text-center p-4 bg-gray-50 rounded-xl">
              <p className="text-2xl font-bold text-indigo-600">{loc.percentage}%</p>
              <p className="text-xs text-gray-500 font-medium mt-1">{loc.location}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
