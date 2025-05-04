import { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';
import { useUser } from '../../context/UserContext';
import { useMarket } from '../../context/MarketContext';

const Header = () => {
  const { toggleTheme, darkMode } = useTheme();
  const { user, logout } = useUser();
  const { isMarketOpen } = useMarket();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <header className="h-16 flex items-center justify-between px-6 border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 z-30">
      <div className="flex items-center">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={18} />
          <input
            type="text"
            placeholder="Search symbols, news, signals..."
            className="pl-10 pr-4 py-2 w-64 md:w-80 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className={`h-2 w-2 rounded-full ${isMarketOpen ? 'bg-emerald-500' : 'bg-red-500'}`}></div>
          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
            {isMarketOpen ? 'Markets Open' : 'Markets Closed'}
          </span>
        </div>
        
        <button
          onClick={toggleTheme}
          className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
          aria-label="Toggle theme"
        >
          {darkMode ? (
            <svg className="h-5 w-5 text-yellow-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          ) : (
            <svg className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
            </svg>
          )}
        </button>
        
        <div className="relative">
          <button
            onClick={() => setShowNotifications(!showNotifications)}
            className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700 relative"
            aria-label="Notifications"
          >
            <Bell size={20} className="text-slate-600 dark:text-slate-300" />
            <span className="absolute top-1 right-1 h-4 w-4 rounded-full bg-red-500 text-white text-xs flex items-center justify-center">
              3
            </span>
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-slate-200 dark:border-slate-700">
              <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200">Notifications</h3>
              </div>
              <div className="max-h-72 overflow-y-auto">
                <div className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700 border-l-4 border-blue-500">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">AAPL signal triggered</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Buy signal at $173.50 with 89% confidence</p>
                  <p className="text-xs text-slate-400 mt-1">10 minutes ago</p>
                </div>
                <div className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Market update</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">US markets opened higher with tech leading</p>
                  <p className="text-xs text-slate-400 mt-1">35 minutes ago</p>
                </div>
                <div className="px-4 py-2 hover:bg-slate-100 dark:hover:bg-slate-700">
                  <p className="text-sm font-medium text-slate-800 dark:text-slate-200">Portfolio alert</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">Your MSFT position is up 3.85% today</p>
                  <p className="text-xs text-slate-400 mt-1">2 hours ago</p>
                </div>
              </div>
              <div className="px-4 py-2 text-center border-t border-slate-200 dark:border-slate-700">
                <button className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-2 p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-700"
            aria-label="User menu"
          >
            {user?.avatarUrl ? (
              <img
                src={user.avatarUrl}
                alt={user.name}
                className="h-8 w-8 rounded-full object-cover border-2 border-slate-200 dark:border-slate-700"
              />
            ) : (
              <User size={20} className="text-slate-600 dark:text-slate-300" />
            )}
            <span className="hidden md:block text-sm font-medium text-slate-800 dark:text-slate-200">
              {user?.name || 'Guest'}
            </span>
          </button>
          
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-md shadow-lg py-1 z-50 border border-slate-200 dark:border-slate-700">
              <div className="px-4 py-2 border-b border-slate-200 dark:border-slate-700">
                <p className="text-sm font-medium text-slate-800 dark:text-slate-200">{user?.name}</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
              </div>
              <a
                href="#settings"
                className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Account Settings
              </a>
              <a
                href="#subscription"
                className="block px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Subscription
              </a>
              <button
                onClick={logout}
                className="block w-full text-left px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-700"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;