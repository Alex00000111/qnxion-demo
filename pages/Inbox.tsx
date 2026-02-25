
import React, { useState, useEffect } from 'react';
import { Search, Filter, Linkedin, Mail, MessageCircle, Send, MoreHorizontal, Phone, Video, Sparkles, User, ShieldCheck } from 'lucide-react';
import { Message, Channel } from '../types';

const mockMessages: Message[] = [
  { id: '1', sender: 'Thabo Molefe', avatar: 'https://picsum.photos/seed/thabo/40/40', content: 'Hi Emmanuel! Your post on ecosystem credits was brilliant. We at Peresoft would love to explore a partnership with TPAC. Are you free for a call this week?', time: '10:24 AM', channel: Channel.LINKEDIN, unread: true, status: 'AI_MANAGED' },
  { id: '2', sender: 'Sarah Chen', avatar: 'https://picsum.photos/seed/sarah-c/40/40', content: 'Following up on our conversation at the Cape Town conference. Attached is the co-marketing proposal for Q2. Let me know your thoughts — Realm ID is keen to move forward.', time: '9:15 AM', channel: Channel.EMAIL, unread: true, status: 'AI_MANAGED' },
  { id: '3', sender: 'James Okafor', avatar: 'https://picsum.photos/seed/james-o/40/40', content: 'Emmanuel, the Cradle Tech case study you published got shared internally at our firm. Our MD wants to discuss joining TPAC. Can we set up an intro call?', time: 'Yesterday', channel: Channel.LINKEDIN, unread: false, status: 'HUMAN_HANDOVER' },
  { id: '4', sender: 'Linda Groenewald', avatar: 'https://picsum.photos/seed/linda-g/40/40', content: 'Quick one — can we move our strategy session to 3 PM Thursday? Also, the Sage onboarding doc is ready for your review.', time: 'Yesterday', channel: Channel.WHATSAPP, unread: false, status: 'HUMAN_HANDOVER' },
  { id: '5', sender: 'David Nkosi', avatar: 'https://picsum.photos/seed/david-n/40/40', content: 'Just saw TechFlow hit 4,200 credits. The reciprocity engine is working beautifully. Would love to feature them in our next newsletter. Thoughts?', time: '2 days ago', channel: Channel.EMAIL, unread: false, status: 'HUMAN_HANDOVER' },
];

// ── Typing dots animation ─────────────────────────────────────────────────
const TypingIndicator: React.FC = () => (
  <div className="flex gap-4 max-w-2xl">
    <img src="https://picsum.photos/seed/thabo/40/40" className="w-8 h-8 rounded-full" alt="" />
    <div className="bg-white px-4 py-3 rounded-2xl border border-gray-200 shadow-sm flex items-center gap-1.5">
      {[0, 1, 2].map(i => (
        <span
          key={i}
          className="w-1.5 h-1.5 rounded-full bg-gray-400"
          style={{
            animation: 'typingBounce 1.2s ease-in-out infinite',
            animationDelay: `${i * 0.2}s`,
          }}
        />
      ))}
      <span className="ml-2 text-xs text-gray-400 font-medium">Lerato M. is typing…</span>
      <style>{`
        @keyframes typingBounce {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.4; }
          30% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>
    </div>
  </div>
);

interface InboxProps {
  managementMode: 'self' | 'agency';
}

export const Inbox: React.FC<InboxProps> = ({ managementMode }) => {
  const [selectedId, setSelectedId] = useState('1');
  const [searchQuery, setSearchQuery] = useState('');
  const [showTyping, setShowTyping] = useState(false);

  // One-time typing indicator: appears at 4s, disappears at 7s
  useEffect(() => {
    const t1 = setTimeout(() => setShowTyping(true), 4000);
    const t2 = setTimeout(() => setShowTyping(false), 7000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const filteredMessages = searchQuery.trim()
    ? mockMessages.filter(m =>
        m.sender.toLowerCase().includes(searchQuery.toLowerCase()) ||
        m.content.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : mockMessages;

  const activeMessage = mockMessages.find(m => m.id === selectedId);

  return (
    <div className="h-[calc(100vh-140px)] -m-8 bg-white flex rounded-2xl overflow-hidden shadow-2xl border border-gray-200">
      {/* 1/3 Chat List */}
      <div className="w-96 border-r border-gray-100 flex flex-col bg-gray-50/30">
        <div className="p-6 border-b border-gray-100 bg-white">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">Inbox</h2>
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Filter size={20} />
            </button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input
              type="text"
              placeholder="Search leads..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border-transparent focus:bg-white focus:border-indigo-500 rounded-xl transition-all outline-none text-sm"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-gray-50">
          {filteredMessages.length === 0 ? (
            <div className="p-8 text-center text-gray-400">
              <p className="text-sm">No conversations matching</p>
              <p className="text-xs font-medium mt-1 text-slate-400">"{searchQuery}"</p>
            </div>
          ) : (
            filteredMessages.map((msg) => (
              <button
                key={msg.id}
                onClick={() => setSelectedId(msg.id)}
                className={`w-full p-6 text-left hover:bg-white transition-all flex gap-4 ${selectedId === msg.id ? 'bg-white shadow-inner border-l-4 border-indigo-600' : ''}`}
              >
                <div className="relative flex-shrink-0">
                  <img src={msg.avatar} className="w-12 h-12 rounded-full border border-gray-100" alt="" />
                  <div className="absolute -bottom-1 -right-1 p-1 bg-white rounded-full shadow-sm">
                    {msg.channel === Channel.LINKEDIN && <Linkedin size={12} className="text-indigo-600" />}
                    {msg.channel === Channel.EMAIL && <Mail size={12} className="text-gray-400" />}
                    {msg.channel === Channel.WHATSAPP && <MessageCircle size={12} className="text-green-500" />}
                  </div>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-900 truncate">{msg.sender}</span>
                    <span className="text-[10px] text-gray-400 font-medium">{msg.time}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className={`text-xs truncate max-w-[140px] ${msg.unread ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                      {msg.content}
                    </p>
                    {msg.status === 'AI_MANAGED' ? (
                      <Sparkles size={14} className="text-purple-500 flex-shrink-0" />
                    ) : (
                      <User size={14} className="text-gray-400 flex-shrink-0" />
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* 2/3 Chat Area */}
      <div className="flex-1 flex flex-col bg-white">
        {activeMessage ? (
          <>
            <div className="px-8 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img src={activeMessage.avatar} className="w-10 h-10 rounded-full" alt="" />
                <div>
                  <h3 className="font-bold text-gray-900">{activeMessage.sender}</h3>
                  <div className="flex items-center gap-2">
                    <p className="text-xs text-green-500 font-bold flex items-center gap-1">
                      <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                      Online
                    </p>
                    <span className={`text-[10px] px-1.5 py-0.5 rounded font-bold flex items-center gap-1 border ${
                      activeMessage.status === 'AI_MANAGED'
                        ? 'bg-purple-50 text-purple-600 border-purple-100'
                        : 'bg-gray-50 text-gray-600 border-gray-100'
                    }`}>
                      {activeMessage.status === 'AI_MANAGED' ? <Sparkles size={10} /> : <User size={10} />}
                      {activeMessage.status === 'AI_MANAGED' ? 'AI Qualifying' : 'Human Handover'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <button className="px-4 py-2 border border-gray-200 rounded-xl text-xs font-bold text-gray-500 hover:bg-gray-50">View Profile</button>
                <div className="h-6 w-px bg-gray-100 mx-2"></div>
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Phone size={20} /></button>
                <button className="p-2 text-gray-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg"><Video size={20} /></button>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-gray-50/30">
              {/* Human Handover Marker */}
              {activeMessage.status === 'HUMAN_HANDOVER' && (
                <div className="flex items-center gap-4 justify-center my-8">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <div className="flex items-center gap-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest bg-white px-4 py-1.5 rounded-full border border-gray-100">
                    <ShieldCheck size={14} className="text-green-500" />
                    Human Handover - Lead Qualified
                  </div>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>
              )}

              <div className="flex gap-4 max-w-2xl">
                <img src={activeMessage.avatar} className="w-8 h-8 rounded-full" alt="" />
                <div className="bg-white p-4 rounded-2xl border border-gray-200 shadow-sm text-sm text-gray-800 leading-relaxed">
                  {activeMessage.content}
                </div>
              </div>

              <div className="flex flex-row-reverse gap-4 max-w-2xl ml-auto">
                <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-[10px] text-white font-bold">ME</div>
                <div className="bg-indigo-600 text-white p-4 rounded-2xl shadow-lg text-sm leading-relaxed">
                  Hi {activeMessage.sender.split(' ')[0]}, thanks for reaching out! I'd love to discuss how TPAC's ecosystem credit model can drive growth for your organization. Does Thursday at 2 PM work for a quick intro call?
                </div>
              </div>

              {/* One-time typing indicator */}
              {showTyping && <TypingIndicator />}
            </div>

            <div className="p-6 border-t border-gray-100">
              <div className="flex items-center gap-4 bg-gray-50 rounded-2xl p-2 pl-6">
                <input
                  type="text"
                  placeholder={`Reply via ${activeMessage.channel}...`}
                  className="flex-1 bg-transparent border-none focus:ring-0 text-sm font-medium py-2 outline-none"
                />
                <button className="p-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-all shadow-lg">
                  <Send size={18} />
                </button>
              </div>
              <div className="mt-3 flex gap-4 pl-2">
                <button className="text-[10px] font-bold text-indigo-600 hover:underline">Use Qualify Template</button>
                <button className="text-[10px] font-bold text-gray-400 hover:underline">Mark as High Potential</button>
                <button className="text-[10px] font-bold text-gray-400 hover:underline">Mute AI Assistant</button>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
            <Mail size={48} className="mb-4 opacity-20" />
            <p>Select a conversation to start messaging</p>
          </div>
        )}
      </div>
    </div>
  );
};
