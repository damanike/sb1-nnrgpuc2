import { ArrowUpRight, ArrowDownRight, Star } from 'lucide-react';
import { WatchlistItem } from '../../types/market';
import { useMarket } from '../../context/MarketContext';

type WatchlistTableProps = {
  watchlist: WatchlistItem[];
};

const WatchlistTable = ({ watchlist }: WatchlistTableProps) => {
  const { selectSymbol } = useMarket();
  
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            <th className="px-4 py-2">Symbol</th>
            <th className="px-4 py-2">Price</th>
            <th className="px-4 py-2">Change</th>
            <th className="px-4 py-2">Volume</th>
            <th className="px-4 py-2">AI Score</th>
            <th className="px-4 py-2">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
          {watchlist.map((item) => (
            <tr 
              key={item.symbol}
              className="hover:bg-slate-50 dark:hover:bg-slate-800 cursor-pointer transition-colors"
              onClick={() => selectSymbol(item.symbol)}
            >
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <Star size={16} className="text-amber-400 mr-2" />
                  <div>
                    <div className="font-medium text-slate-800 dark:text-slate-200">{item.symbol}</div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">{item.name}</div>
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 font-medium text-slate-800 dark:text-slate-200">
                ${item.price.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <div className={`flex items-center ${item.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                  {item.change >= 0 ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span className="ml-1">{Math.abs(item.change).toFixed(2)}%</span>
                </div>
              </td>
              <td className="px-4 py-3 text-slate-600 dark:text-slate-400">
                {(item.volume / 1000000).toFixed(1)}M
              </td>
              <td className="px-4 py-3">
                <div className="flex items-center">
                  <div className="w-16 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${
                        item.aiScore >= 80 ? 'bg-emerald-500' : 
                        item.aiScore >= 60 ? 'bg-amber-500' : 
                        'bg-red-500'
                      }`}
                      style={{ width: `${item.aiScore}%` }}
                    ></div>
                  </div>
                  <span className="ml-2 text-xs font-medium text-slate-700 dark:text-slate-300">
                    {item.aiScore}
                  </span>
                </div>
              </td>
              <td className="px-4 py-3">
                <div className="flex space-x-2">
                  <button className="px-2 py-1 text-xs font-medium rounded bg-blue-600 text-white">
                    Trade
                  </button>
                  <button className="px-2 py-1 text-xs font-medium rounded border border-slate-300 dark:border-slate-700 text-slate-600 dark:text-slate-300">
                    Analyze
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default WatchlistTable;