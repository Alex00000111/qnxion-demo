
import React from 'react';
import { Clock, CheckCircle2, XCircle, Sparkles, User, FileText, Image as ImageIcon, Video, Paperclip, Mail, ShieldAlert } from 'lucide-react';

const mockPosts = [
  {
    id: '1',
    type: 'Post',
    content: "The TPAC ecosystem just crossed 214,500 GCU earned collectively. That's 1.25M organic impressions with zero ad spend. Reciprocity-based growth is no longer theoretical — it's proven. #TPAC #EcosystemGrowth #B2B",
    isAiGenerated: true,
    reviewDeadline: "2h 15m remaining",
    status: "Pending",
    author: "TPAC Content Team",
    media: [{ id: 'm1', name: 'TPAC_Q1_Results.png', type: 'image' }]
  },
  {
    id: '2',
    type: 'Article',
    title: "Why Third-Party Ecosystems Will Define B2B Growth in 2026",
    content: "The old playbook — cold outreach, ad spend, gated content — is dying. Companies that win in 2026 will build collaborative ecosystems where every member amplifies every other member. At TPAC Impact Collective, we've seen a 12x engagement multiplier when companies contribute authentic content...",
    isAiGenerated: false,
    reviewDeadline: "Expired - Auto-approved in 10m",
    status: "Reviewing",
    author: "Emmanuel (Founder)",
    media: [{ id: 'm2', name: 'Ecosystem_Framework.jpg', type: 'image' }, { id: 'm3', name: 'TPAC_Whitepaper.pdf', type: 'pdf' }]
  }
];

interface ContentReviewProps {
  managementMode: 'self' | 'agency';
}

export const ContentReview: React.FC<ContentReviewProps> = ({ managementMode }) => {
  return (
    <div className="space-y-6">
      {/* Idea Inbox Banner - Restricted in Agency Mode */}
      {managementMode === 'self' ? (
        <div className="bg-indigo-900 rounded-3xl p-8 flex items-center justify-between text-white shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Mail size={120} />
          </div>
          <div className="relative flex items-center gap-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <Mail size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Content Idea Inbox</h3>
              <p className="text-indigo-200">Send posts, articles, and media directly to: <span className="text-white font-mono font-bold bg-white/10 px-2 py-1 rounded">ideas@qnxion.ai</span></p>
            </div>
          </div>
          <button className="relative bg-white text-indigo-900 px-6 py-3 rounded-xl font-bold hover:bg-indigo-50 transition-all">
            View Raw Submissions
          </button>
        </div>
      ) : (
        <div className="bg-purple-900 rounded-3xl p-8 flex items-center justify-between text-white shadow-xl relative overflow-hidden border border-purple-400">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Sparkles size={120} />
          </div>
          <div className="relative flex items-center gap-8">
            <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-2xl flex items-center justify-center">
              <ShieldAlert size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-bold mb-1">Agency Management Active</h3>
              <p className="text-purple-200">Your TPAC Agent is drafting content based on your strategy. You can review and approve suggestions below.</p>
            </div>
          </div>
          <button disabled className="relative bg-white/20 text-white px-6 py-3 rounded-xl font-bold cursor-not-allowed border border-white/30">
            Agent Supervision Active
          </button>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Review Center</h2>
          <p className="text-gray-500">Approve posts, articles, and media before ecosystem distribution</p>
        </div>
        <div className="flex items-center gap-4 bg-white p-2 border border-gray-200 rounded-xl">
          <button className="px-4 py-2 bg-indigo-50 text-indigo-700 font-bold rounded-lg text-sm">To Review (8)</button>
          <button className="px-4 py-2 text-gray-500 font-medium rounded-lg text-sm hover:bg-gray-50">Scheduled (12)</button>
          <button className="px-4 py-2 text-gray-500 font-medium rounded-lg text-sm hover:bg-gray-50">History</button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {mockPosts.map((post) => (
          <div key={post.id} className="bg-white border border-gray-200 rounded-2xl shadow-[0_4px_24px_rgba(99,102,241,0.06)] overflow-hidden flex flex-col">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`p-2 rounded-lg ${post.isAiGenerated ? 'bg-purple-50 text-purple-600' : 'bg-blue-50 text-blue-600'}`}>
                  {post.type === 'Article' ? <FileText size={20} /> : (post.isAiGenerated ? <Sparkles size={20} /> : <User size={20} />)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{post.type} - {managementMode === 'agency' ? 'Agency Suggestion' : (post.isAiGenerated ? 'AI Suggestion' : 'Draft')}</p>
                  <p className="text-xs text-gray-400">By {post.author}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-xs font-bold text-orange-600 bg-orange-50 px-3 py-1.5 rounded-full">
                <Clock size={14} />
                {post.reviewDeadline}
              </div>
            </div>
            
            <div className="p-8 flex-1 space-y-6">
              {post.type === 'Article' && <h4 className="text-xl font-bold text-gray-900 leading-tight">{(post as any).title}</h4>}
              <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 min-h-[140px] text-gray-800 leading-relaxed font-medium italic">
                "{post.content}"
              </div>

              {post.media && post.media.length > 0 && (
                <div className="space-y-3">
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-wider flex items-center gap-2">
                    <Paperclip size={14} />
                    Attached Media ({post.media.length})
                  </p>
                  <div className="flex flex-wrap gap-3">
                    {post.media.map(file => (
                      <div key={file.id} className="flex items-center gap-3 bg-white border border-gray-200 px-4 py-2 rounded-xl shadow-[0_4px_24px_rgba(99,102,241,0.06)] hover:border-indigo-300 transition-colors cursor-pointer group">
                        {file.type === 'image' && <ImageIcon size={18} className="text-blue-500" />}
                        {file.type === 'pdf' && <FileText size={18} className="text-red-500" />}
                        {file.type === 'video' && <Video size={18} className="text-purple-500" />}
                        <span className="text-sm font-medium text-gray-700 truncate max-w-[150px]">{file.name}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="p-6 bg-gray-50 border-t border-gray-100 flex items-center gap-4">
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-white border border-gray-200 rounded-xl text-gray-700 font-bold hover:bg-gray-50 transition-colors">
                <XCircle size={20} className="text-red-500" />
                Reject
              </button>
              <button className="flex-1 flex items-center justify-center gap-2 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100">
                <CheckCircle2 size={20} />
                Approve to Send
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
