import { 
  LayoutDashboard, 
  LineChart, 
  Search, 
  Briefcase, 
  ShieldAlert, 
  Settings, 
  Package, 
  Users, 
  PanelLeft, 
  BarChart4 
} from 'lucide-react';
import { useUser } from '../../context/UserContext';

type SidebarProps = {
  activePage: string;
  setActivePage: (page: string) => void;
};

const Sidebar = ({ activePage, setActivePage }: SidebarProps) => {
  const { user } = useUser();
  
  const menuItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: <LayoutDashboard size={20} />,
    },
    {
      id: 'trading',
      label: 'Charts',
      icon: <LineChart size={20} />,
    },
    {
      id: 'scanner',
      label: 'AI Scanner',
      icon: <Search size={20} />,
    },
    {
      id: 'portfolio',
      label: 'Portfolio',
      icon: <Briefcase size={20} />,
    },
    {
      id: 'risk',
      label: 'Risk Management',
      icon: <ShieldAlert size={20} />,
    },
    {
      id: 'community',
      label: 'Community',
      icon: <Users size={20} />,
      premium: true,
    },
    {
      id: 'backtester',
      label: 'Backtester',
      icon: <BarChart4 size={20} />,
      premium: true,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: <Settings size={20} />,
    },
  ];

  return (
    <aside className="hidden md:flex md:w-64 flex-col bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-40">
      <div className="h-16 flex items-center justify-between px-4 border-b border-slate-200 dark:border-slate-700">
        <div className="flex items-center">
          <div className="h-8 w-8 rounded bg-blue-600 flex items-center justify-center">
            <PanelLeft className="h-5 w-5 text-white" />
          </div>
          <span className="ml-2 text-lg font-bold text-slate-800 dark:text-white">TradePilot</span>
        </div>
      </div>
      <nav className="flex-1 pt-4 pb-6 px-4 space-y-1 overflow-y-auto">
        {menuItems.map((item) => {
          if (item.premium && !user?.isPremium) {
            return (
              <div
                key={item.id}
                className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-slate-500 dark:text-slate-400 opacity-50 cursor-not-allowed"
              >
                <div className="mr-3 flex-shrink-0">{item.icon}</div>
                <span className="flex-1">{item.label}</span>
                <Package size={16} className="text-amber-500" />
              </div>
            );
          }
          
          return (
            <button
              key={item.id}
              onClick={() => setActivePage(item.id)}
              className={`group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full transition-colors ${
                activePage === item.id
                  ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700'
              }`}
            >
              <div className={`mr-3 flex-shrink-0 ${
                activePage === item.id
                  ? 'text-blue-600 dark:text-blue-400'
                  : 'text-slate-500 dark:text-slate-400'
              }`}>
                {item.icon}
              </div>
              <span className="flex-1">{item.label}</span>
              {item.premium && (
                <Package size={16} className="text-amber-500" />
              )}
            </button>
          );
        })}
      </nav>
      <div className="px-4 py-4 border-t border-slate-200 dark:border-slate-700">
        <div className="bg-blue-50 dark:bg-blue-900/30 rounded-md p-3">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Package className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800 dark:text-blue-300">
                {user?.isPremium ? 'Premium Plan' : 'Upgrade to Premium'}
              </h3>
              <div className="mt-1 text-xs text-blue-700 dark:text-blue-400">
                {user?.isPremium ? 'You have access to all features' : 'Unlock all AI features'}
              </div>
              {!user?.isPremium && (
                <button className="mt-2 px-2 py-1 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700">
                  Upgrade Now
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;