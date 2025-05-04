import { ArrowUpRight, ArrowDownRight, TrendingUp, AlertTriangle, Zap } from 'lucide-react';
import { useMarket } from '../context/MarketContext';
import { mockTradeSignals, mockAIInsights } from '../data/mockData';
import MarketOverview from '../components/dashboard/MarketOverview';
import WatchlistTable from '../components/dashboard/WatchlistTable';
import AIInsightCard from '../components/dashboard/AIInsightCard';

const Dashboard = () => {
  const { watchlist, marketData } = useMarket();
  const topPerformers = [...marketData].sort((a, b) => b.change - a.change).slice(0, 3);
  const worstPerformers = [...marketData].sort((a, b) => a.change - b.change).slice(0, 3);
  
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">S&P 500</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">4,782.45</p>
              </div>
              <div className="flex items-center text-emerald-600">
                <ArrowUpRight size={18} />
                <span className="ml-1 font-semibold">0.88%</span>
              </div>
            </div>
            <div className="mt-4 h-10">
              {/* Mini chart placeholder */}
              <div className="h-full w-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/30 rounded"></div>
            </div>
          </div>
          
          <div className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">NASDAQ</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">16,423.98</p>
              </div>
              <div className="flex items-center text-emerald-600">
                <ArrowUpRight size={18} />
                <span className="ml-1 font-semibold">1.22%</span>
              </div>
            </div>
            <div className="mt-4 h-10">
              {/* Mini chart placeholder */}
              <div className="h-full w-full bg-gradient-to-r from-emerald-500/10 to-emerald-500/30 rounded"></div>
            </div>
          </div>
          
          <div className="card p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 dark:text-slate-400">VIX</p>
                <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">15.82</p>
              </div>
              <div className="flex items-center text-red-600">
                <ArrowDownRight size={18} />
                <span className="ml-1 font-semibold">-5.37%</span>
              </div>
            </div>
            <div className="mt-4 h-10">
              {/* Mini chart placeholder */}
              <div className="h-full w-full bg-gradient-to-r from-red-500/10 to-red-500/30 rounded"></div>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Market Overview</h2>
            <div className="flex space-x-2">
              <button className="btn btn-outline text-xs border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">Today</button>
              <button className="btn btn-outline text-xs border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">1W</button>
              <button className="btn btn-outline text-xs border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">1M</button>
            </div>
          </div>
          <MarketOverview />
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Watchlist</h2>
            <button className="btn btn-outline text-xs border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
              + Add Symbol
            </button>
          </div>
          <WatchlistTable watchlist={watchlist} />
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">AI Trade Signals</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-4">
            {mockTradeSignals.slice(0, 3).map((signal) => (
              <div 
                key={signal.id} 
                className="p-3 border rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center">
                    <div className={`h-8 w-8 rounded-md ${signal.type === 'buy' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'} flex items-center justify-center`}>
                      {signal.type === 'buy' ? <TrendingUp size={16} /> : <TrendingUp size={16} className="transform rotate-180" />}
                    </div>
                    <div className="ml-3">
                      <p className="font-medium text-slate-800 dark:text-slate-200">{signal.symbol}</p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">{signal.timeframe} timeframe</p>
                    </div>
                  </div>
                  <div className={`px-2 py-1 rounded text-xs font-medium ${signal.type === 'buy' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'}`}>
                    {signal.type.toUpperCase()}
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mb-2">
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Entry</p>
                    <p className="font-medium text-slate-800 dark:text-slate-200">{signal.entryPrice}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Stop Loss</p>
                    <p className="font-medium text-red-600 dark:text-red-400">{signal.stopLoss}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 dark:text-slate-400">Take Profit</p>
                    <p className="font-medium text-emerald-600 dark:text-emerald-400">{signal.takeProfit}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <Zap size={14} className="text-amber-500" />
                    <span className="ml-1 text-xs font-medium">
                      {signal.confidence}% confidence
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    {new Date(signal.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            <button className="btn w-full bg-blue-600 hover:bg-blue-700 text-white">
              Get More Signals
            </button>
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Market Movers</h2>
            <div className="flex">
              <button className="px-3 py-1 text-xs font-medium rounded-l bg-blue-600 text-white">Gainers</button>
              <button className="px-3 py-1 text-xs font-medium rounded-r bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-slate-200">Losers</button>
            </div>
          </div>
          <div className="space-y-2">
            {topPerformers.map((stock) => (
              <div key={stock.symbol} className="flex items-center justify-between p-2 hover:bg-slate-50 dark:hover:bg-slate-800 rounded-md">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-md bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                    {stock.symbol.charAt(0)}
                  </div>
                  <div className="ml-3">
                    <p className="font-medium text-slate-800 dark:text-slate-200">{stock.symbol}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{stock.name}</p>
                  </div>
                </div>
                <div>
                  <p className="font-medium text-slate-800 dark:text-slate-200">${stock.price.toFixed(2)}</p>
                  <p className="text-xs text-emerald-600 flex items-center justify-end">
                    <ArrowUpRight size={12} />
                    <span className="ml-1">{stock.change.toFixed(2)}%</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">AI Market Insights</h2>
            <button className="text-blue-600 dark:text-blue-400 text-sm hover:underline">View All</button>
          </div>
          <div className="space-y-3">
            {mockAIInsights.map((insight) => (
              <AIInsightCard key={insight.id} insight={insight} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;