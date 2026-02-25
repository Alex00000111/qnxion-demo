
import React, { useState, useEffect } from 'react';
import {
  FileCheck,
  Lightbulb,
  Archive,
  Linkedin,
  Sparkles,
  MessageSquare,
  CheckCircle2,
  Info,
  MoreVertical,
  Plus,
  Mail,
  Zap,
  Clock,
  Layout,
  ExternalLink,
  ChevronRight,
  Loader2,
  RefreshCw,
  X
} from 'lucide-react';
import { PostStatus, Post } from '../types';
import { MOCK_REVIEW_QUEUE } from '../lib/mockData';

export const PostGenerator: React.FC<{ managementMode: 'self' | 'agency' }> = ({ managementMode }) => {
  const [activeTab, setActiveTab] = useState<'review' | 'ideas' | 'archive'>('review');

  const tabs = [
    { id: 'review', label: 'Review Center', icon: FileCheck },
    { id: 'ideas', label: 'Post Ideas', icon: Lightbulb },
    { id: 'archive', label: 'Archive', icon: Archive },
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      {/* Horizontal Tab Navigation (Google Cloud Style) */}
      <div className="flex items-center gap-8 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`flex items-center gap-2 pb-4 text-sm font-bold transition-all relative ${
              activeTab === tab.id ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            <tab.icon size={18} />
            {tab.label}
            {activeTab === tab.id && <span className="absolute bottom-0 left-0 w-full h-0.5 bg-indigo-600"></span>}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-hidden">
        {activeTab === 'review' && <ReviewCenter />}
        {activeTab === 'ideas' && <IdeaBoard />}
        {activeTab === 'archive' && <ArchiveView />}
      </div>
    </div>
  );
};

const ReviewCenter = () => {
  const [queue, setQueue] = useState(MOCK_REVIEW_QUEUE.map(item => ({
    ...item,
    isAlternative: false,
  })));
  const [approving, setApproving] = useState<string | null>(null);
  const [regenerating, setRegenerating] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState(queue[0]?.id ?? null);

  useEffect(() => {
    if (toast) {
      const t = setTimeout(() => setToast(null), 3000);
      return () => clearTimeout(t);
    }
  }, [toast]);

  const handleApprove = (id: string) => {
    setApproving(id);
    setTimeout(() => {
      setApproving(null);
      setQueue(prev => prev.filter(p => p.id !== id));
      setToast('Post Scheduled & Synced!');
      setSelectedId(prev => {
        const remaining = queue.filter(p => p.id !== id);
        return remaining.length > 0 ? remaining[0].id : null;
      });
    }, 1500);
  };

  const handleRegenerate = (id: string) => {
    setRegenerating(id);
    setTimeout(() => {
      setQueue(prev => prev.map(p =>
        p.id === id ? { ...p, isAlternative: !p.isAlternative } : p
      ));
      setRegenerating(null);
    }, 1200);
  };

  const selected = queue.find(p => p.id === selectedId) ?? queue[0] ?? null;

  return (
    <div className="h-full flex gap-8 relative">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-50 flex items-center gap-3 bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl animate-slide-in-toast">
          <CheckCircle2 size={20} />
          <span className="font-bold text-sm">{toast}</span>
        </div>
      )}

      {/* Left: Post Queue + Preview */}
      <div className="flex-1 flex flex-col gap-6">
        {/* Queue tabs */}
        <div className="flex gap-3 overflow-x-auto pb-1">
          {queue.map(post => (
            <button
              key={post.id}
              onClick={() => setSelectedId(post.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-xl text-xs font-bold transition-transform transition-opacity ${
                selectedId === post.id
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200 scale-105'
                  : 'bg-white border border-gray-200 text-gray-600 hover:border-indigo-300'
              }`}
            >
              {post.title.length > 30 ? post.title.slice(0, 30) + '...' : post.title}
            </button>
          ))}
          {queue.length === 0 && (
            <p className="text-sm text-gray-400 italic px-2">All posts approved! Queue is empty.</p>
          )}
        </div>

        {/* Preview card */}
        {selected && (
          <div className="flex-1 bg-white border border-gray-200 rounded-2xl p-8 flex flex-col shadow-[0_4px_24px_rgba(99,102,241,0.06)] overflow-hidden">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-bold text-gray-900 flex items-center gap-2">
                <Linkedin className="text-indigo-600" size={20} />
                LinkedIn Preview
              </h3>
              <div className="flex items-center gap-2">
                <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded ${
                  selected.isAlternative ? 'bg-purple-50 text-purple-600' : 'bg-gray-50 text-gray-400'
                }`}>
                  {selected.isAlternative ? 'Alternative' : 'Original'}
                </span>
                <span className="text-[10px] font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded">
                  Score: {selected.qualityScore}
                </span>
              </div>
            </div>

            <div className={`bg-gray-50 rounded-xl p-6 border border-gray-100 flex-1 relative overflow-y-auto ${
              regenerating === selected.id ? 'animate-shimmer' : ''
            }`}>
              <div className="flex items-center gap-3 mb-4">
                <img src="https://picsum.photos/seed/emmanuel-tpac/40/40" className="w-10 h-10 rounded-full" alt="Emmanuel" />
                <div>
                  <p className="text-sm font-bold text-gray-900">Emmanuel</p>
                  <p className="text-xs text-gray-400">Founding Member at TPAC Impact Collective</p>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="text-sm font-bold text-gray-900">{selected.title}</h4>
                <p className="text-gray-700 text-sm leading-relaxed whitespace-pre-line">
                  {selected.isAlternative ? selected.alternativeContent : selected.content}
                </p>
              </div>
              <div className="mt-6 text-xs text-gray-400 font-medium">
                Scheduled: {selected.scheduledTime}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Right: Action Panel */}
      <div className="w-[400px] bg-white border border-gray-200 rounded-2xl overflow-hidden flex flex-col shadow-lg">
        <div className="p-6 bg-indigo-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="font-bold text-sm">QNXION Co-Pilot</p>
              <p className="text-[10px] text-indigo-300">{queue.length} posts in review queue</p>
            </div>
          </div>
          <Info size={18} className="text-indigo-400 cursor-help" />
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-xl">
            <p className="text-sm text-indigo-900 font-medium">
              {selected
                ? `Ready to review "${selected.title.slice(0, 40)}...". Approve to schedule or regenerate for an alternative draft.`
                : 'All posts have been reviewed. Great work!'}
            </p>
          </div>

          {selected && (
            <>
              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-900">Quality Assessment</p>
                <div className="flex items-center gap-3">
                  <div className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-green-500 rounded-full transition-all duration-500"
                      style={{ width: `${selected.qualityScore}%` }}
                    />
                  </div>
                  <span className="text-sm font-bold text-green-600">{selected.qualityScore}%</span>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-sm font-bold text-gray-900">Tone Suggestions</p>
                <div className="flex flex-wrap gap-2">
                  {['More Casual', 'Punchier', 'Data-Heavy', 'Story-Driven'].map(tone => (
                    <button
                      key={tone}
                      className="text-[10px] font-bold text-indigo-600 border border-indigo-200 px-3 py-1.5 rounded-lg hover:bg-indigo-50 active:scale-95 transition-transform"
                    >
                      {tone}
                    </button>
                  ))}
                </div>
              </div>

              <div className="pt-4 space-y-3">
                <button
                  onClick={() => handleApprove(selected.id)}
                  disabled={approving === selected.id}
                  className="w-full py-3 bg-indigo-600 text-white rounded-xl font-bold shadow-lg hover:bg-indigo-700 active:scale-[0.98] transition-transform disabled:opacity-80 flex items-center justify-center gap-2"
                >
                  {approving === selected.id ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    <>
                      <CheckCircle2 size={18} />
                      Approve & Schedule
                    </>
                  )}
                </button>
                <button
                  onClick={() => handleRegenerate(selected.id)}
                  disabled={regenerating === selected.id}
                  className="w-full py-3 border border-gray-200 text-gray-600 rounded-xl font-bold hover:bg-gray-50 active:scale-[0.98] transition-transform disabled:opacity-80 flex items-center justify-center gap-2"
                >
                  {regenerating === selected.id ? (
                    <>
                      <RefreshCw size={18} className="animate-spin" />
                      Regenerating...
                    </>
                  ) : (
                    <>
                      <RefreshCw size={18} />
                      Regenerate Draft
                    </>
                  )}
                </button>
                <button className="w-full py-3 border border-red-100 text-red-500 rounded-xl font-bold hover:bg-red-50 active:scale-[0.98] transition-transform flex items-center justify-center gap-2">
                  <X size={18} />
                  Reject Draft
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const IdeaBoard = () => {
  const columns = [
    { title: 'Future Ideas', items: ['Cradle Tech 10x Case Study', 'TPAC Ecosystem Q1 Results', 'How Reciprocity Beats Ad Spend'] },
    { title: 'Waiting for Approval', items: ['Partner Spotlight: Peresoft', 'The Hidden ROI of Social Credits'] },
    { title: 'Published', items: ['Why Ecosystems Win in 2026', 'From 0 to 1M Impressions: Our Journey'] }
  ];

  return (
    <div className="h-full flex flex-col space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-900">Idea Kanban</h3>
        <button className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-md hover:bg-indigo-700">
          <Plus size={18} /> New Idea
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-6 flex-1 overflow-x-auto pb-4">
        {columns.map(col => (
          <div key={col.title} className="bg-gray-50/50 rounded-2xl p-4 flex flex-col space-y-4 border border-gray-100">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{col.title}</span>
              <span className="text-xs bg-white px-2 py-0.5 rounded-full border border-gray-200 text-gray-500">{col.items.length}</span>
            </div>
            <div className="space-y-3">
              {col.items.map(item => (
                <div key={item} className="bg-white p-4 rounded-xl border border-gray-200 shadow-[0_4px_24px_rgba(99,102,241,0.06)] hover:border-indigo-300 transition-colors cursor-grab group">
                  <div className="flex justify-between items-start mb-2">
                    <p className="text-sm font-bold text-gray-900">{item}</p>
                    <MoreVertical size={14} className="text-gray-300 opacity-0 group-hover:opacity-100" />
                  </div>
                  <div className="flex items-center gap-2 text-[10px] text-gray-400 font-medium">
                    <Clock size={12} /> 2 days ago
                  </div>
                </div>
              ))}
            </div>
            {col.title === 'Future Ideas' && (
              <button className="w-full py-3 border-2 border-dashed border-gray-200 rounded-xl text-xs font-bold text-gray-400 hover:text-indigo-600 hover:border-indigo-200 transition-all flex items-center justify-center gap-2">
                <Mail size={14} /> Import from Gmail/Notion
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ArchiveView = () => {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-[0_4px_24px_rgba(99,102,241,0.06)]">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b border-gray-200">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Post Content Excerpt</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Quality Score</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Performance</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">TTL Status</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right"></th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100">
          {[
            { text: "Why Third-Party Ecosystems Will Define B2B Growth in 2026...", quality: 94, perf: 92, ttl: "178 Days Left" },
            { text: "The death of cold outreach — and what replaces it...", quality: 92, perf: 88, ttl: "145 Days Left" },
            { text: "How Cradle Tech 10x'd their LinkedIn presence in 90 days...", quality: 88, perf: 96, ttl: "120 Days Left" }
          ].map((post, i) => (
            <tr key={i} className="hover:bg-gray-50 transition-colors">
              <td className="px-6 py-5">
                <p className="text-sm text-gray-900 font-medium truncate max-w-xs">{post.text}</p>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold ${post.quality > 85 ? 'text-green-600' : 'text-orange-600'}`}>{post.quality}</span>
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full ${post.quality > 85 ? 'bg-green-500' : 'bg-orange-500'}`} style={{width: `${post.quality}%`}}></div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-5">
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  <Zap size={14} />
                  {post.perf}
                </div>
              </td>
              <td className="px-6 py-5">
                <span className="px-3 py-1 bg-gray-100 text-gray-600 rounded-full text-[10px] font-bold uppercase tracking-wider">
                  {post.ttl}
                </span>
              </td>
              <td className="px-6 py-5 text-right">
                <button className="text-indigo-600 hover:text-indigo-800 transition-colors">
                  <ExternalLink size={18} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
