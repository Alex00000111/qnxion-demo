
import React from 'react';
import { 
  LayoutDashboard, 
  PenTool, 
  Mail, 
  BarChart2, 
  Fingerprint, 
  Users, 
  Settings, 
  LogOut, 
  CreditCard, 
  Bell,
  Zap
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activePage: string;
  onNavigate: (page: string) => void;
  onLogout: () => void;
  managementMode: 'self' | 'agency';
}

export const Layout: React.FC<LayoutProps> = ({ children, activePage, onNavigate, onLogout, managementMode }) => {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'generator', label: 'Post Generator', icon: PenTool },
    { id: 'inbox', label: 'Inbox', icon: Mail },
    { id: 'analytics', label: 'Analytics', icon: BarChart2 },
    { id: 'personalization', label: 'Personalization', icon: Fingerprint },
    { id: 'ecosystem', label: 'Ecosystem', icon: Users },
  ];

  return (
    <div className="flex h-screen bg-[#f9fafb]">
      {/* Sidebar */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-100 flex items-center gap-2">
          <img src="/tpac-logo.jpg" alt="TPAC" className="h-8 w-auto rounded" />
          <span className="text-xl font-bold text-gray-900 tracking-tight">QNXION</span>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activePage === item.id 
                  ? 'bg-indigo-50 text-indigo-700' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
          
          <div className="pt-4 mt-4 border-t border-gray-100">
             <button
              onClick={() => onNavigate('billing')}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                activePage === 'billing' ? 'bg-indigo-50 text-indigo-700' : 'text-gray-500 hover:bg-gray-50'
              }`}
            >
              <CreditCard size={20} />
              Billing & Plans
            </button>
          </div>
        </nav>

        {/* Account & Credits */}
        <div className="p-4 border-t border-gray-100 space-y-3">
          <div className="px-4 py-3 bg-indigo-900 rounded-xl text-white shadow-lg">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] font-bold text-indigo-300 uppercase tracking-widest">Ecosystem Credits</span>
              <Zap size={14} className="text-indigo-400" />
            </div>
            <p className="text-xl font-bold">8,450</p>
          </div>
          <div className="space-y-1">
            <button className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium text-gray-500 hover:bg-gray-50">
              <Settings size={16} />
              Settings
            </button>
            <button 
              onClick={onLogout}
              className="w-full flex items-center gap-3 px-4 py-2 rounded-lg text-xs font-medium text-red-500 hover:bg-red-50"
            >
              <LogOut size={16} />
              Sign Out
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative">
        <header className="sticky top-0 z-20 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h1 className="text-lg font-semibold text-gray-900 capitalize">
              {activePage.replace('-', ' ')}
            </h1>
            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${
              managementMode === 'agency' 
                ? 'bg-purple-100 text-purple-700 border border-purple-200' 
                : 'bg-indigo-100 text-indigo-700 border border-indigo-200'
            }`}>
              {managementMode === 'agency' ? 'Agency Managed' : 'Self Managed'}
            </span>
          </div>
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-gray-600 relative">
              <Bell size={20} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
            </button>
            <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">Emmanuel</p>
                <p className="text-xs text-gray-500">Founding Member</p>
              </div>
              <img 
                src="https://picsum.photos/seed/admin/40/40" 
                alt="Profile" 
                className="w-10 h-10 rounded-full border border-gray-200"
              />
            </div>
          </div>
        </header>

        <div className="p-8 h-[calc(100vh-73px)]">
          {children}
        </div>
      </main>
    </div>
  );
};
