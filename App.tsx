
import React, { useState } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './pages/Dashboard';
import { EcosystemAdmin } from './pages/EcosystemAdmin';
import { Campaigns } from './pages/Campaigns';
import { PostGenerator } from './pages/PostGenerator';
import { Inbox } from './pages/Inbox';
import { Analytics } from './pages/Analytics';
import { Personalization } from './pages/Personalization';
import { Billing } from './pages/Billing';
import { Pricing } from './pages/Pricing';
import { Marketing } from './pages/Marketing';

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('landing');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [managementMode, setManagementMode] = useState<'self' | 'agency'>('self');

  const handleLogin = (mode?: 'self' | 'agency') => {
    if (mode) setManagementMode(mode);
    setIsAuthenticated(true);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setCurrentPage('landing');
  };

  if (!isAuthenticated && currentPage === 'landing') {
    return <Marketing onGetStarted={(mode) => handleLogin(mode)} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard': return <Dashboard managementMode={managementMode} />;
      case 'generator': return <PostGenerator managementMode={managementMode} />;
      case 'inbox': return <Inbox managementMode={managementMode} />;
      case 'analytics': return <Analytics />;
      case 'personalization': return <Personalization managementMode={managementMode} />;
      case 'ecosystem': return <EcosystemAdmin />;
      case 'campaigns': return <Campaigns managementMode={managementMode} />;
      case 'billing': return <Billing onSelectPlan={() => setCurrentPage('pricing')} managementMode={managementMode} />;
      case 'pricing': return <Pricing onBack={() => setCurrentPage('billing')} managementMode={managementMode} setManagementMode={setManagementMode} />;
      default: return <Dashboard managementMode={managementMode} />;
    }
  };

  return (
    <Layout activePage={currentPage} onNavigate={setCurrentPage} onLogout={handleLogout} managementMode={managementMode}>
      {renderPage()}
    </Layout>
  );
};

export default App;
