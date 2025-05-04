import { useState } from 'react';
import { ArrowUpRight, ArrowDownRight, Download, Briefcase, Clock, DollarSign } from 'lucide-react';
import { mockPortfolio } from '../data/mockData';

const Portfolio = () => {
  const [activeTab, setActiveTab] = useState('positions');
  const { totalValue, dailyChange, positions, tradeHistory } = mockPortfolio;
  
  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Portfolio
        </h1>
        <div className="flex items-center space-x-2">
          <button className="btn btn-outline text-slate-700 dark:text-slate-300 border-slate-300 dark:border-slate-700">
            <Download size={16} className="mr-2" />
            Export
          </button>
          <button className="btn btn-primary">
            <DollarSign size={16} className="mr-2" />
            Deposit
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">Total Portfolio Value</p>
              <p className="text-2xl font-bold text-slate-800 dark:text-slate-200 mt-1">
                ${totalValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className={`flex items-center ${dailyChange >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
              {dailyChange >= 0 ? <ArrowUpRight size={18} /> : <ArrowDownRight size={18} />}
              <span className="ml-1 font-semibold">{Math.abs(dailyChange).toFixed(2)}%</span>
            </div>
          </div>
          <div className="mt-4 h-10">
            {/* Mini chart placeholder */}
            <div className="h-full w-full bg-gradient-to-r from-blue-500/10 to-blue-500/30 rounded"></div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center text-slate-500 dark:text-slate-400 mb-1">
            <Briefcase size={18} className="mr-2" />
            <p className="text-sm font-medium">Active Positions</p>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{positions.length}</p>
          <div className="mt-2 flex items-center text-xs text-slate-600 dark:text-slate-400">
            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
              <div 
                className="h-full bg-blue-600"
                style={{ width: `${(positions.length / 10) * 100}%` }}
              ></div>
            </div>
            <span className="ml-2">Max: 10</span>
          </div>
          <div className="mt-4 flex text-sm">
            <div className="flex-1">
              <p className="text-xs text-slate-500 dark:text-slate-400">Unrealized P/L</p>
              <p className="font-medium text-emerald-600">
                +$1,265.25
              </p>
            </div>
            <div className="flex-1">
              <p className="text-xs text-slate-500 dark:text-slate-400">Today's P/L</p>
              <p className="font-medium text-emerald-600">
                +$346.80
              </p>
            </div>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center text-slate-500 dark:text-slate-400 mb-1">
            <Clock size={18} className="mr-2" />
            <p className="text-sm font-medium">Recent Activity</p>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">{tradeHistory.length} trades</p>
          <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Win Rate</p>
              <p className="font-medium text-slate-800 dark:text-slate-200">
                68%
              </p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Avg. Return</p>
              <p className="font-medium text-emerald-600">
                +4.32%
              </p>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center text-xs text-slate-500 dark:text-slate-400">
            <span>Last trade: 2 hours ago</span>
            <a href="#history" className="text-blue-600 dark:text-blue-400 hover:underline">View history</a>
          </div>
        </div>
      </div>
      
      <div className="bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 flex-1 overflow-hidden flex flex-col">
        <div className="border-b border-slate-200 dark:border-slate-700">
          <div className="flex">
            <button
              onClick={() => setActiveTab('positions')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'positions'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Open Positions
            </button>
            <button
              onClick={() => setActiveTab('history')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'history'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Trade History
            </button>
            <button
              onClick={() => setActiveTab('performance')}
              className={`px-6 py-3 text-sm font-medium ${
                activeTab === 'performance'
                  ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              Performance Analytics
            </button>
          </div>
        </div>
        
        <div className="p-4 flex-1 overflow-auto">
          {activeTab === 'positions' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-2">Symbol</th>
                    <th className="px-4 py-2">Entry Price</th>
                    <th className="px-4 py-2">Current Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Value</th>
                    <th className="px-4 py-2">P/L</th>
                    <th className="px-4 py-2">Open Date</th>
                    <th className="px-4 py-2">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {positions.map((position) => (
                    <tr 
                      key={position.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <td className="px-4 py-3">
                        <div>
                          <div className="font-medium text-slate-800 dark:text-slate-200">{position.symbol}</div>
                          <div className="text-xs text-slate-500 dark:text-slate-400">{position.name}</div>
                        </div>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                        ${position.entryPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                        ${position.currentPrice.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {position.quantity.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                        ${position.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3">
                        <div className={`flex items-center ${position.pl >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {position.pl >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                          <span className="ml-1 font-medium">
                            ${Math.abs(position.pl).toFixed(2)} ({Math.abs(position.plPercentage).toFixed(2)}%)
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {new Date(position.openDate).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex space-x-2">
                          <button className="px-2 py-1 text-xs font-medium rounded bg-red-600 text-white">
                            Close
                          </button>
                          <button className="px-2 py-1 text-xs font-medium rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'history' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    <th className="px-4 py-2">Symbol</th>
                    <th className="px-4 py-2">Type</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Quantity</th>
                    <th className="px-4 py-2">Value</th>
                    <th className="px-4 py-2">P/L</th>
                    <th className="px-4 py-2">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
                  {tradeHistory.map((trade) => (
                    <tr 
                      key={trade.id}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800"
                    >
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                        {trade.symbol}
                      </td>
                      <td className="px-4 py-3">
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          trade.type === 'buy' 
                            ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400' 
                            : 'bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400'
                        }`}>
                          {trade.type.toUpperCase()}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                        ${trade.price.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {trade.quantity.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                        ${trade.value.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </td>
                      <td className="px-4 py-3">
                        {trade.pl !== undefined ? (
                          <div className={`flex items-center ${trade.pl >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                            {trade.pl >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                            <span className="ml-1 font-medium">
                              ${Math.abs(trade.pl).toFixed(2)} ({Math.abs(trade.plPercentage || 0).toFixed(2)}%)
                            </span>
                          </div>
                        ) : (
                          <span className="text-slate-500 dark:text-slate-400">-</span>
                        )}
                      </td>
                      <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                        {new Date(trade.date).toLocaleDateString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          
          {activeTab === 'performance' && (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="flex justify-center mb-6">
                  <div className="w-36 h-36 rounded-full border-8 border-blue-600 flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-3xl font-bold text-slate-800 dark:text-slate-200">68%</p>
                      <p className="text-sm text-slate-500 dark:text-slate-400">Win Rate</p>
                    </div>
                  </div>
                </div>
                <h2 className="text-xl font-semibold text-slate-800 dark:text-slate-200 mb-2">
                  Performance Analytics
                </h2>
                <p className="text-slate-600 dark:text-slate-400 max-w-md">
                  Get detailed insights about your trading performance with advanced analytics.
                </p>
                <button className="mt-4 btn btn-primary">
                  Generate Full Report
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;