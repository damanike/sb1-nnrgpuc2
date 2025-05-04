import { useState } from 'react';
import { 
  Filter, 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  ArrowUpRight, 
  ArrowDownRight,
  AlertTriangle,
  TrendingUp,
  Zap
} from 'lucide-react';
import { mockTradeSignals } from '../data/mockData';

const MarketScanner = () => {
  const [activeTab, setActiveTab] = useState('signals');
  const [filterOpen, setFilterOpen] = useState(false);
  const [signalType, setSignalType] = useState('all');
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          AI Market Scanner
        </h1>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="btn btn-outline text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700"
          >
            <Filter size={16} className="mr-2" />
            Filters
          </button>
          <button className="btn btn-primary">
            <Zap size={16} className="mr-2" />
            Run Scan
          </button>
        </div>
      </div>
      
      {filterOpen && (
        <div className="bg-white dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700 mb-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Market</label>
              <select className="input">
                <option value="all">All Markets</option>
                <option value="stocks">Stocks</option>
                <option value="forex">Forex</option>
                <option value="crypto">Crypto</option>
              </select>
            </div>
            <div>
              <label className="label">Signal Type</label>
              <select className="input" value={signalType} onChange={(e) => setSignalType(e.target.value)}>
                <option value="all">All Signals</option>
                <option value="buy">Buy Signals</option>
                <option value="sell">Sell Signals</option>
              </select>
            </div>
            <div>
              <label className="label">Timeframe</label>
              <select className="input">
                <option value="all">All Timeframes</option>
                <option value="1m">1 Minute</option>
                <option value="5m">5 Minutes</option>
                <option value="15m">15 Minutes</option>
                <option value="1h">1 Hour</option>
                <option value="4h">4 Hours</option>
                <option value="1d">Daily</option>
              </select>
            </div>
            <div>
              <label className="label">Min. Confidence</label>
              <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
              <div className="flex justify-between text-xs text-slate-500 mt-1">
                <span>0%</span>
                <span>50%</span>
                <span>100%</span>
              </div>
            </div>
            <div>
              <label className="label">Risk/Reward</label>
              <select className="input">
                <option value="all">Any Ratio</option>
                <option value="high">High (3:1+)</option>
                <option value="medium">Medium (2:1)</option>
                <option value="low">Low (1:1)</option>
              </select>
            </div>
            <div>
              <label className="label">Volume</label>
              <select className="input">
                <option value="all">Any Volume</option>
                <option value="high">High</option>
                <option value="medium">Medium</option>
                <option value="low">Low</option>
              </select>
            </div>
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button className="btn text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 btn-outline">
              Reset
            </button>
            <button className="btn btn-primary">
              Apply Filters
            </button>
          </div>
        </div>
      )}
      
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex-1 overflow-hidden flex flex-col">
        <div className="border-b border-slate-200 dark:border-slate-700">
          <div className="flex overflow-x-auto">
            <button
              onClick={() => setActiveTab('signals')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'signals'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Trade Signals
            </button>
            <button
              onClick={() => setActiveTab('patterns')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'patterns'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Chart Patterns
            </button>
            <button
              onClick={() => setActiveTab('screener')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'screener'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              AI Screener
            </button>
            <button
              onClick={() => setActiveTab('sentiment')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'sentiment'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Sentiment Analysis
            </button>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-auto">
          {activeTab === 'signals' && (
            <div>
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  AI-Generated Trade Signals
                </h2>
                <div className="flex items-center">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={16} />
                    <input
                      type="text"
                      placeholder="Search signals..."
                      className="pl-10 pr-4 py-2 w-60 rounded-md border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="ml-2 relative">
                    <button className="btn btn-outline text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700 flex items-center">
                      <span className="mr-2">Sort by: Confidence</span>
                      <ChevronDown size={16} />
                    </button>
                    {/* Dropdown would go here */}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
                {/* Expanded signals with more details */}
                {mockTradeSignals.concat(mockTradeSignals).map((signal, index) => (
                  <div 
                    key={`${signal.id}-${index}`} 
                    className="p-4 border rounded-lg border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <div className={`h-10 w-10 rounded-md ${signal.type === 'buy' ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400' : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'} flex items-center justify-center`}>
                          {signal.type === 'buy' ? <TrendingUp size={20} /> : <TrendingUp size={20} className="transform rotate-180" />}
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
                    
                    <div className="grid grid-cols-3 gap-3 mb-3">
                      <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Entry</p>
                        <p className="font-medium text-slate-800 dark:text-slate-200">${signal.entryPrice.toFixed(2)}</p>
                      </div>
                      <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Stop Loss</p>
                        <p className="font-medium text-red-600 dark:text-red-400">${signal.stopLoss.toFixed(2)}</p>
                      </div>
                      <div className="p-2 bg-slate-100 dark:bg-slate-700 rounded">
                        <p className="text-xs text-slate-500 dark:text-slate-400">Take Profit</p>
                        <p className="font-medium text-emerald-600 dark:text-emerald-400">${signal.takeProfit.toFixed(2)}</p>
                      </div>
                    </div>
                    
                    <div className="mb-3">
                      <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">AI Confidence</p>
                      <div className="flex items-center">
                        <div className="flex-1 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              signal.confidence >= 80 ? 'bg-emerald-500' : 
                              signal.confidence >= 60 ? 'bg-amber-500' : 
                              'bg-red-500'
                            }`}
                            style={{ width: `${signal.confidence}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                          {signal.confidence}%
                        </span>
                      </div>
                    </div>
                    
                    <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
                      {signal.reason}
                    </p>
                    
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {new Date(signal.createdAt).toLocaleString()}
                      </p>
                      <div className="flex space-x-2">
                        <button className="px-3 py-1 text-xs font-medium rounded bg-blue-600 text-white hover:bg-blue-700">
                          Trade
                        </button>
                        <button className="px-3 py-1 text-xs font-medium rounded border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300">
                          Analyze
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 flex justify-center">
                <button className="btn btn-outline border-blue-500 text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20">
                  Load More Signals
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'patterns' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Chart Pattern Recognition
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-md">
                  Our AI-powered chart pattern recognition system helps you identify high-probability trading opportunities.
                </p>
                <button className="mt-4 btn btn-primary">
                  <Zap size={16} className="mr-2" />
                  Unlock Premium Feature
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'screener' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  AI Screener
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-md">
                  Screen thousands of assets in seconds with our advanced AI algorithms to find the best trading opportunities.
                </p>
                <button className="mt-4 btn btn-primary">
                  <Zap size={16} className="mr-2" />
                  Unlock Premium Feature
                </button>
              </div>
            </div>
          )}
          
          {activeTab === 'sentiment' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <AlertTriangle size={48} className="mx-auto text-amber-500 mb-4" />
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Sentiment Analysis
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-md">
                  Gauge market sentiment using advanced AI that analyzes news, social media, and institutional movements.
                </p>
                <button className="mt-4 btn btn-primary">
                  <Zap size={16} className="mr-2" />
                  Unlock Premium Feature
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MarketScanner;