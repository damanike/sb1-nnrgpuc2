import { mockRiskAnalysis, mockPortfolio } from '../data/mockData';
import { AlertTriangle, TrendingUp, AlertCircle, PieChart, BarChart2, Shield } from 'lucide-react';

const RiskManagement = () => {
  const { dailyVaR, portfolioCorrelation, riskExposure, positionSizing } = mockRiskAnalysis;
  const { positions } = mockPortfolio;
  
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-slate-800 dark:text-slate-200">
          Risk Management
        </h1>
        <button className="btn btn-primary">
          <AlertTriangle size={16} className="mr-2" />
          Run Risk Assessment
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="card p-4">
          <div className="flex items-center text-slate-500 dark:text-slate-400 mb-1">
            <AlertTriangle size={18} className="mr-2" />
            <p className="text-sm font-medium">Value at Risk (VaR)</p>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            ${dailyVaR.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Maximum expected loss over the next trading day
          </p>
          <div className="mt-4 h-10 bg-gradient-to-r from-amber-500/10 to-amber-500/30 rounded"></div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center text-slate-500 dark:text-slate-400 mb-1">
            <TrendingUp size={18} className="mr-2" />
            <p className="text-sm font-medium">Portfolio Correlation</p>
          </div>
          <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">
            {(portfolioCorrelation * 100).toFixed(0)}%
          </p>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Level of interdependence between your assets
          </p>
          <div className="mt-4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <div 
              className="h-full rounded-full bg-amber-500"
              style={{ width: `${portfolioCorrelation * 100}%` }}
            ></div>
          </div>
          <div className="mt-1 flex justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Diversified</span>
            <span>Correlated</span>
          </div>
        </div>
        
        <div className="card p-4">
          <div className="flex items-center text-slate-500 dark:text-slate-400 mb-1">
            <Shield size={18} className="mr-2" />
            <p className="text-sm font-medium">Risk/Reward Ratio</p>
          </div>
          <div className="flex items-end">
            <p className="text-2xl font-bold text-slate-800 dark:text-slate-200">1:</p>
            <p className="text-2xl font-bold text-emerald-600">2.4</p>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Average profit vs. loss across all positions
          </p>
          <div className="mt-4 flex space-x-1">
            <div className="h-10 w-1/3 bg-red-500 rounded-l-md flex items-center justify-center">
              <span className="text-xs font-medium text-white">Risk</span>
            </div>
            <div className="h-10 w-2/3 bg-emerald-500 rounded-r-md flex items-center justify-center">
              <span className="text-xs font-medium text-white">Reward</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <PieChart size={20} className="mr-2 text-blue-600" />
              Sector Exposure
            </h2>
          </div>
          <div className="flex space-x-6">
            <div className="w-40 h-40 relative">
              {/* Placeholder for pie chart */}
              <div className="absolute inset-0 rounded-full border-8 border-blue-600 flex items-center justify-center">
                <div className="w-full h-full rounded-full overflow-hidden">
                  {Object.entries(riskExposure).map(([sector, percentage], index) => {
                    const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-red-500', 'bg-purple-500'];
                    const rotation = index === 0 ? 0 : Object.entries(riskExposure)
                      .slice(0, index)
                      .reduce((acc, [, value]) => acc + (value as number), 0) * 3.6;
                    
                    return (
                      <div 
                        key={sector}
                        className={`absolute top-0 left-0 w-full h-full ${colors[index % colors.length]}`}
                        style={{ 
                          clipPath: `polygon(50% 50%, 50% 0%, ${50 + 50 * Math.sin((rotation + (percentage as number) * 3.6) * Math.PI / 180)}% ${50 - 50 * Math.cos((rotation + (percentage as number) * 3.6) * Math.PI / 180)}%, ${50 + 50 * Math.sin(rotation * Math.PI / 180)}% ${50 - 50 * Math.cos(rotation * Math.PI / 180)}%)` 
                        }}
                      ></div>
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex-1">
              <div className="space-y-3">
                {Object.entries(riskExposure).map(([sector, percentage], index) => {
                  const colors = ['bg-blue-500', 'bg-emerald-500', 'bg-amber-500', 'bg-red-500', 'bg-purple-500'];
                  return (
                    <div key={sector} className="flex items-center">
                      <div className={`h-3 w-3 rounded-sm ${colors[index % colors.length]} mr-2`}></div>
                      <div className="flex-1">
                        <div className="flex justify-between">
                          <span className="text-sm font-medium text-slate-700 dark:text-slate-300 capitalize">
                            {sector}
                          </span>
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            {percentage}%
                          </span>
                        </div>
                        <div className="w-full h-1 bg-slate-200 dark:bg-slate-700 rounded-full mt-1">
                          <div 
                            className={`h-full rounded-full ${colors[index % colors.length]}`}
                            style={{ width: `${percentage}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="mt-4">
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  <AlertCircle size={14} className="inline mr-1 text-amber-500" />
                  High technology exposure detected
                </p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="card p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200 flex items-center">
              <BarChart2 size={20} className="mr-2 text-blue-600" />
              Position Sizing Calculator
            </h2>
          </div>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="label">Account Balance</label>
              <input 
                type="text" 
                className="input" 
                defaultValue="$125,840.76" 
              />
            </div>
            <div>
              <label className="label">Risk Per Trade (%)</label>
              <input 
                type="number" 
                className="input" 
                defaultValue={positionSizing.currentRiskPerTrade} 
                min="0.1" 
                max="10"
                step="0.1"
              />
            </div>
            <div>
              <label className="label">Entry Price</label>
              <input type="number" className="input" placeholder="Enter price" />
            </div>
            <div>
              <label className="label">Stop Loss</label>
              <input type="number" className="input" placeholder="Enter stop loss" />
            </div>
          </div>
          
          <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-md mb-4">
            <h3 className="font-medium text-blue-800 dark:text-blue-300 mb-2">Position Size Recommendations</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs text-blue-700 dark:text-blue-400">Max Position Size</p>
                <p className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                  ${positionSizing.maxPositionSize.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-700 dark:text-blue-400">Recommended Position Size</p>
                <p className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                  ${positionSizing.recommendedPositionSize.toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-700 dark:text-blue-400">Max Risk Amount</p>
                <p className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                  ${(125840.76 * positionSizing.currentRiskPerTrade / 100).toLocaleString('en-US', { maximumFractionDigits: 2 })}
                </p>
              </div>
              <div>
                <p className="text-xs text-blue-700 dark:text-blue-400">Risk/Reward Ratio</p>
                <p className="text-lg font-semibold text-blue-800 dark:text-blue-300">
                  1:2.5 (Optimal)
                </p>
              </div>
            </div>
          </div>
          
          <button className="btn btn-primary w-full">
            Calculate Position Size
          </button>
        </div>
      </div>
      
      <div className="card p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
            Position Risk Analysis
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <th className="px-4 py-2">Symbol</th>
                <th className="px-4 py-2">Current Risk</th>
                <th className="px-4 py-2">% of Portfolio</th>
                <th className="px-4 py-2">Risk Rating</th>
                <th className="px-4 py-2">Correlation</th>
                <th className="px-4 py-2">AI Recommendation</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {positions.map((position) => {
                // Mock risk calculations
                const portfolioPercentage = (position.value / mockPortfolio.totalValue * 100).toFixed(1);
                const riskRating = Math.random() * 100;
                const riskColor = riskRating > 75 ? 'bg-red-500' : riskRating > 50 ? 'bg-amber-500' : 'bg-emerald-500';
                const correlation = Math.random().toFixed(2);
                
                return (
                  <tr 
                    key={position.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-800"
                  >
                    <td className="px-4 py-3">
                      <div className="font-medium text-slate-800 dark:text-slate-200">{position.symbol}</div>
                    </td>
                    <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                      ${(position.value * 0.02).toFixed(2)}
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {portfolioPercentage}%
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${riskColor}`}
                            style={{ width: `${riskRating}%` }}
                          ></div>
                        </div>
                        <span className="ml-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                          {riskRating > 75 ? 'High' : riskRating > 50 ? 'Medium' : 'Low'}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                      {correlation}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        {riskRating > 75 ? (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-400">
                            Reduce Position
                          </span>
                        ) : riskRating > 50 ? (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-400">
                            Monitor Closely
                          </span>
                        ) : (
                          <span className="px-2 py-1 rounded text-xs font-medium bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400">
                            Position Optimal
                          </span>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default RiskManagement;