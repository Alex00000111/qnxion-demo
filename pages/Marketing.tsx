
import React from 'react';
import { 
  ArrowRight, 
  Users, 
  Zap, 
  ShieldCheck, 
  BarChart3, 
  CheckCircle2, 
  Globe, 
  MessageSquare,
  Share2,
  TrendingUp,
  Mail,
  User,
  Sparkles
} from 'lucide-react';

interface MarketingProps {
  onGetStarted: (mode?: 'self' | 'agency') => void;
}

export const Marketing: React.FC<MarketingProps> = ({ onGetStarted }) => {
  return (
    <div className="min-h-screen bg-white text-gray-900 overflow-x-hidden font-['Inter']">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center">
            <img 
              src="/tpac-logo.jpg" 
              alt="TPAC Logo" 
              className="h-12 w-auto"
            />
          </div>
          <div className="hidden md:flex items-center gap-10">
            <a href="#features" className="text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#ecosystem" className="text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">Ecosystem</a>
            <a href="#pricing" className="text-sm font-semibold text-gray-500 hover:text-indigo-600 transition-colors">Pricing</a>
            <button 
              onClick={() => onGetStarted()}
              className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-indigo-100 hover:bg-indigo-700 transition-all"
            >
              Sign In
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-indigo-50 text-indigo-700 rounded-full text-sm font-bold animate-fade-in">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              TPAC Impact Collective Ecosystem is Live
            </div>
            <h1 className="text-5xl lg:text-7xl font-extrabold tracking-tight leading-[1.1] text-gray-900">
              Multiply your <span className="text-indigo-600">visibility</span> through collaboration.
            </h1>
            <p className="text-xl text-gray-500 max-w-xl leading-relaxed">
              Join the Third Party Advantage Conference (TPAC) ecosystem. Choose between full control or high-touch agency management.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
              <button 
                onClick={() => onGetStarted('self')}
                className="group p-6 bg-white border-2 border-indigo-100 rounded-3xl text-left hover:border-indigo-600 hover:bg-indigo-50/30 transition-all"
              >
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-2xl flex items-center justify-center mb-4 group-hover:bg-indigo-600 group-hover:text-white transition-all">
                  <User size={24} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-1">Self Managed</h3>
                <p className="text-xs text-gray-500 leading-relaxed mb-4">You create the content, build the campaigns, and maintain full control.</p>
                <div className="flex items-center gap-2 text-indigo-600 font-bold text-sm">
                  Register <ArrowRight size={16} />
                </div>
              </button>

              <button 
                onClick={() => onGetStarted('agency')}
                className="group p-6 bg-indigo-900 border-2 border-indigo-800 rounded-3xl text-left hover:border-white transition-all shadow-xl shadow-indigo-900/20"
              >
                <div className="w-12 h-12 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-4 group-hover:bg-white group-hover:text-indigo-900 transition-all">
                  <Sparkles size={24} />
                </div>
                <h3 className="font-bold text-white text-lg mb-1">Agency Managed</h3>
                <p className="text-xs text-indigo-300 leading-relaxed mb-4">Our experts handle content, strategy, and supervision for you.</p>
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  Register <ArrowRight size={16} />
                </div>
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -inset-4 bg-indigo-100 rounded-[48px] rotate-3 blur-2xl opacity-30"></div>
            <div className="relative bg-white border border-gray-100 rounded-[40px] shadow-2xl overflow-hidden p-4">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=1200&q=80" 
                className="w-full h-auto rounded-[32px] object-cover"
                alt="Collaboration Dashboard"
              />
              <div className="absolute top-10 left-10 bg-white/90 backdrop-blur-md p-4 rounded-2xl shadow-xl border border-white/50 animate-bounce-slow">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-500 text-white rounded-lg">
                    <TrendingUp size={20} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase">Daily Reach</p>
                    <p className="text-lg font-bold text-gray-900">+42.8k</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50" id="ecosystem">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          <div className="text-center space-y-2">
            <p className="text-4xl font-extrabold text-indigo-600">95%</p>
            <p className="text-sm font-bold text-gray-500 uppercase">Reciprocity Rate</p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-4xl font-extrabold text-indigo-600">12x</p>
            <p className="text-sm font-bold text-gray-500 uppercase">Engagement Boost</p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-4xl font-extrabold text-indigo-600">8M+</p>
            <p className="text-sm font-bold text-gray-500 uppercase">Monthly Impressions</p>
          </div>
          <div className="text-center space-y-2">
            <p className="text-4xl font-extrabold text-indigo-600">$0</p>
            <p className="text-sm font-bold text-gray-500 uppercase">Ad Spend Needed</p>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-32 px-6" id="features">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-extrabold text-gray-900">Built for the Third Party Advantage</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">Our ecosystem logic ensures that quality content from any company gets the visibility it deserves through a decentralized collective network.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-6 group">
              <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[24px] flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition-all duration-300">
                <Users size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Collective Reach</h3>
              <p className="text-gray-500 leading-relaxed">
                Connect your personal and company accounts. When you post, the collective network echos your message across thousands of high-quality connections.
              </p>
            </div>

            <div className="space-y-6 group">
              <div className="w-16 h-16 bg-orange-50 text-orange-600 rounded-[24px] flex items-center justify-center group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                <Zap size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Social Credit Engine</h3>
              <p className="text-gray-500 leading-relaxed">
                Our reciprocity-based credit system ensures fair play. The more you contribute to the ecosystem, the more multiplier actions you receive in return.
              </p>
            </div>

            <div className="space-y-6 group">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-[24px] flex items-center justify-center group-hover:bg-green-600 group-hover:text-white transition-all duration-300">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Human-AI Oversight</h3>
              <p className="text-gray-500 leading-relaxed">
                Leverage AI content generation with a strict human review layer. No post goes live without your team's explicit approval or safety deadline.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-20 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <img 
            src="/tpac-logo.jpg" 
            alt="TPAC Logo" 
            className="h-10 grayscale opacity-50"
          />
          <div className="flex gap-8 text-sm font-bold text-gray-400">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600">Contact Support</a>
            <a href="#" className="hover:text-indigo-600">Ecosystem Rules</a>
          </div>
          <p className="text-sm font-medium text-gray-400">© 2026 TPAC Impact Collective Ecosystem. All rights reserved.</p>
        </div>
      </footer>

      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-fade-in { animation: fade-in 0.6s ease-out forwards; }
        .animate-bounce-slow { animation: bounce-slow 4s ease-in-out infinite; }
      `}</style>
    </div>
  );
};
