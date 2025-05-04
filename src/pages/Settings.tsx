import { useState } from 'react';
import { User, Bell, Lock, CreditCard, BarChart3, ExternalLink, Zap } from 'lucide-react';
import { useUser } from '../context/UserContext';
import { useTheme } from '../context/ThemeContext';

const Settings = () => {
  const { user, updateUserPreferences } = useUser();
  const { darkMode, toggleTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('profile');
  
  if (!user) return null;
  
  return (
    <div className="flex flex-col h-full">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-1">
          Settings
        </h1>
        <p className="text-slate-500 dark:text-slate-400">
          Manage your account settings and preferences
        </p>
      </div>
      
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-700">
              <div className="flex items-center">
                <img 
                  src={user.avatarUrl} 
                  alt={user.name} 
                  className="h-12 w-12 rounded-full object-cover mr-4" 
                />
                <div>
                  <h3 className="font-semibold text-slate-800 dark:text-slate-200">{user.name}</h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                </div>
              </div>
            </div>
            <nav className="p-2">
              <button
                onClick={() => setActiveTab('profile')}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === 'profile' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <User size={18} className="mr-3" />
                Profile
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === 'notifications' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Bell size={18} className="mr-3" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === 'security' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Lock size={18} className="mr-3" />
                Security
              </button>
              <button
                onClick={() => setActiveTab('billing')}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === 'billing' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <CreditCard size={18} className="mr-3" />
                Billing
              </button>
              <button
                onClick={() => setActiveTab('trading')}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === 'trading' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <BarChart3 size={18} className="mr-3" />
                Trading Preferences
              </button>
              <button
                onClick={() => setActiveTab('integrations')}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === 'integrations' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <ExternalLink size={18} className="mr-3" />
                Integrations
              </button>
              <button
                onClick={() => setActiveTab('premium')}
                className={`flex items-center w-full px-3 py-2 rounded-md text-sm ${
                  activeTab === 'premium' 
                    ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 font-medium' 
                    : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                }`}
              >
                <Zap size={18} className="mr-3 text-amber-500" />
                Premium Features
              </button>
            </nav>
          </div>
        </div>
        
        <div className="lg:col-span-3">
          <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 p-6">
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Profile Settings</h2>
                <div className="space-y-4">
                  <div>
                    <label className="label">Full Name</label>
                    <input type="text" className="input" defaultValue={user.name} />
                  </div>
                  <div>
                    <label className="label">Email Address</label>
                    <input type="email" className="input" defaultValue={user.email} />
                  </div>
                  <div>
                    <label className="label">Bio</label>
                    <textarea 
                      className="input h-24"
                      placeholder="Tell us about yourself as a trader..."
                    ></textarea>
                  </div>
                  <div>
                    <label className="label">Profile Picture</label>
                    <div className="flex items-center">
                      <img 
                        src={user.avatarUrl} 
                        alt={user.name} 
                        className="h-16 w-16 rounded-full object-cover mr-4" 
                      />
                      <button className="btn btn-outline border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                        Change
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="label">Theme</label>
                    <div className="flex items-center space-x-4">
                      <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-md flex items-center ${
                          !darkMode ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                        </svg>
                        Light
                      </button>
                      <button
                        onClick={toggleTheme}
                        className={`px-4 py-2 rounded-md flex items-center ${
                          darkMode ? 'bg-blue-600 text-white' : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                        </svg>
                        Dark
                      </button>
                    </div>
                  </div>
                  <div className="pt-4">
                    <button className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'trading' && (
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 mb-4">Trading Preferences</h2>
                <div className="space-y-6">
                  <div>
                    <label className="label">Risk Level</label>
                    <div className="grid grid-cols-3 gap-4 mt-2">
                      <button
                        onClick={() => updateUserPreferences({ riskLevel: 'low' })}
                        className={`py-3 px-4 rounded-md flex flex-col items-center ${
                          user.preferences.riskLevel === 'low' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <span className="text-lg mb-1">🛡️</span>
                        <span className="font-medium">Low Risk</span>
                        <span className="text-xs mt-1">Conservative</span>
                      </button>
                      <button
                        onClick={() => updateUserPreferences({ riskLevel: 'medium' })}
                        className={`py-3 px-4 rounded-md flex flex-col items-center ${
                          user.preferences.riskLevel === 'medium' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <span className="text-lg mb-1">⚖️</span>
                        <span className="font-medium">Medium Risk</span>
                        <span className="text-xs mt-1">Balanced</span>
                      </button>
                      <button
                        onClick={() => updateUserPreferences({ riskLevel: 'high' })}
                        className={`py-3 px-4 rounded-md flex flex-col items-center ${
                          user.preferences.riskLevel === 'high' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                        }`}
                      >
                        <span className="text-lg mb-1">🚀</span>
                        <span className="font-medium">High Risk</span>
                        <span className="text-xs mt-1">Aggressive</span>
                      </button>
                    </div>
                  </div>
                  
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="label mb-0">Automated Trading</label>
                      <div className="relative inline-block w-12 h-6 transition duration-200 ease-in-out rounded-full">
                        <input
                          type="checkbox"
                          id="autoTrading"
                          className="absolute w-6 h-6 transition duration-200 ease-in-out transform bg-white border-2 rounded-full appearance-none cursor-pointer peer border-slate-300 dark:border-slate-600 checked:translate-x-6 checked:border-blue-600"
                          checked={user.preferences.autoTradingEnabled}
                          onChange={() => updateUserPreferences({ autoTradingEnabled: !user.preferences.autoTradingEnabled })}
                        />
                        <label
                          htmlFor="autoTrading"
                          className="block w-full h-full overflow-hidden rounded-full cursor-pointer bg-slate-300 dark:bg-slate-700 peer-checked:bg-blue-600"
                        ></label>
                      </div>
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                      Allow the AI to automatically execute trades based on signals
                    </p>
                  </div>
                  
                  <div>
                    <label className="label">Default Position Size</label>
                    <select className="input">
                      <option value="fixed">Fixed Amount ($1,000)</option>
                      <option value="percentage">Percentage of Balance (2%)</option>
                      <option value="risk">Risk-Based (1% account risk)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="label">Default Chart Timeframe</label>
                    <div className="flex flex-wrap gap-2">
                      {['1m', '5m', '15m', '30m', '1h', '4h', '1d', '1w'].map((timeframe) => (
                        <button
                          key={timeframe}
                          className="px-3 py-1 text-sm font-medium rounded bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-200 dark:hover:bg-slate-600"
                        >
                          {timeframe}
                        </button>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <label className="label">Default Indicators</label>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div className="flex items-center">
                        <input type="checkbox" id="rsi" className="mr-2" defaultChecked />
                        <label htmlFor="rsi">RSI</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="macd" className="mr-2" defaultChecked />
                        <label htmlFor="macd">MACD</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="ema" className="mr-2" defaultChecked />
                        <label htmlFor="ema">EMA (20, 50, 200)</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="bb" className="mr-2" defaultChecked />
                        <label htmlFor="bb">Bollinger Bands</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="volume" className="mr-2" defaultChecked />
                        <label htmlFor="volume">Volume Profile</label>
                      </div>
                      <div className="flex items-center">
                        <input type="checkbox" id="atr" className="mr-2" />
                        <label htmlFor="atr">ATR</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <button className="btn btn-primary">
                      Save Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === 'premium' && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Premium Features</h2>
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${user.isPremium ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-400'}`}>
                    {user.isPremium ? 'Active Premium' : 'Free Tier'}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                    <div className="p-6 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="text-center text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Free</h3>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">$0</span>
                        <span className="text-slate-500 dark:text-slate-400">/month</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Basic charting capabilities</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Market data with 15-min delay</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Limited watchlist (5 symbols)</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Basic portfolio tracking</span>
                        </li>
                        <li className="flex items-start opacity-50">
                          <svg className="h-5 w-5 text-slate-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">AI trade signals</span>
                        </li>
                        <li className="flex items-start opacity-50">
                          <svg className="h-5 w-5 text-slate-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Advanced risk management</span>
                        </li>
                      </ul>
                      <div className="mt-6">
                        <button className="btn w-full text-blue-600 dark:text-blue-400 border border-blue-600 dark:border-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                          Current Plan
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-2 border-blue-600 dark:border-blue-500 rounded-lg overflow-hidden relative">
                    <div className="absolute top-0 inset-x-0 px-4 py-1 bg-blue-600 text-white text-xs font-bold text-center">
                      MOST POPULAR
                    </div>
                    <div className="p-6 bg-blue-50 dark:bg-blue-900/20 border-b border-blue-200 dark:border-blue-700 pt-8">
                      <h3 className="text-center text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Pro</h3>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">$29</span>
                        <span className="text-slate-500 dark:text-slate-400">/month</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">All Free features</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Real-time market data</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">AI trade signals (10/day)</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Advanced risk management</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Unlimited watchlists</span>
                        </li>
                        <li className="flex items-start opacity-50">
                          <svg className="h-5 w-5 text-slate-400 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Automated trading</span>
                        </li>
                      </ul>
                      <div className="mt-6">
                        <button className="btn btn-primary w-full">
                          Upgrade Now
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                    <div className="p-6 bg-slate-50 dark:bg-slate-800 border-b border-slate-200 dark:border-slate-700">
                      <h3 className="text-center text-lg font-bold text-slate-800 dark:text-slate-200 mb-2">Elite</h3>
                      <div className="text-center">
                        <span className="text-3xl font-bold text-slate-800 dark:text-slate-200">$99</span>
                        <span className="text-slate-500 dark:text-slate-400">/month</span>
                      </div>
                    </div>
                    <div className="p-6">
                      <ul className="space-y-3">
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">All Pro features</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Unlimited AI trade signals</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Automated trading</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Pattern recognition AI</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Sentiment analysis</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="h-5 w-5 text-emerald-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span className="text-slate-600 dark:text-slate-400">Priority support</span>
                        </li>
                      </ul>
                      <div className="mt-6">
                        <button className="btn btn-outline w-full border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                          Upgrade Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-6">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <Zap size={24} className="text-blue-600 dark:text-blue-400" />
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold text-slate-800 dark:text-slate-200 mb-1">Premium Features Available</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                        Upgrade your account to access advanced AI trading features, real-time market data, and professional-grade tools.
                      </p>
                      <button className="btn btn-primary">
                        View All Premium Features
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;