import { useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Layout from './components/layout/Layout';
import Dashboard from './pages/Dashboard';
import TradingView from './pages/TradingView';
import MarketScanner from './pages/MarketScanner';
import Portfolio from './pages/Portfolio';
import RiskManagement from './pages/RiskManagement';
import Settings from './pages/Settings';
import { UserProvider } from './context/UserContext';
import { MarketProvider } from './context/MarketContext';

function App() {
  const [activePage, setActivePage] = useState('dashboard');

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'trading':
        return <TradingView />;
      case 'scanner':
        return <MarketScanner />;
      case 'portfolio':
        return <Portfolio />;
      case 'risk':
        return <RiskManagement />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <ThemeProvider>
      <UserProvider>
        <MarketProvider>
          <Layout activePage={activePage} setActivePage={setActivePage}>
            {renderPage()}
          </Layout>
        </MarketProvider>
      </UserProvider>
    </ThemeProvider>
  );
}

export default App;