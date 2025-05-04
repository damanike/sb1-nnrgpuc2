import { useState, useEffect } from 'react';
import { RefreshCw, ChevronDown, Maximize2, SlidersHorizontal, Save } from 'lucide-react';
import { useMarket } from '../context/MarketContext';

const TradingView = () => {
  const { selectedSymbol, watchlist } = useMarket();
  const [timeframe, setTimeframe] = useState('1d');
  const [chartLoaded, setChartLoaded] = useState(false);
  
  useEffect(() => {
    // Simulate chart loading
    setChartLoaded(false);
    const timer = setTimeout(() => {
      setChartLoaded(true);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, [selectedSymbol, timeframe]);
  
  const timeframes = [
    { label: '1m', value: '1m' },
    { label: '5m', value: '5m' },
    { label: '15m', value: '15m' },
    { label: '1h', value: '1h' },
    { label: '4h', value: '4h' },
    { label: '1d', value: '1d' },
    { label: '1w', value: '1w' },
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
        <div className="flex items-center">
          <div className="relative">
            <div className="flex items-center space-x-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-md bg-white dark:bg-slate-800">
              <span className="font-medium text-slate-800 dark:text-slate-200">
                {selectedSymbol?.symbol || 'Select Symbol'}
              </span>
              <ChevronDown size={16} className="text-slate-400" />
            </div>
            {/* Dropdown would go here */}
          </div>
          <div className="mx-4 h-8 border-r border-slate-200 dark:border-slate-700"></div>
          <div className="flex gap-1">
            {timeframes.map((tf) => (
              <button
                key={tf.value}
                onClick={() => setTimeframe(tf.value)}
                className={`px-3 py-1 text-xs font-medium rounded ${
                  timeframe === tf.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-200'
                }`}
              >
                {tf.label}
              </button>
            ))}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
            <RefreshCw size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
            <SlidersHorizontal size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
            <Save size={18} />
          </button>
          <button className="p-2 rounded-md hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-500 dark:text-slate-400">
            <Maximize2 size={18} />
          </button>
        </div>
      </div>
      
      <div className="flex-1 bg-white dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden relative">
        {!chartLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-white dark:bg-slate-800">
            <div className="flex flex-col items-center">
              <div className="h-10 w-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              <p className="mt-4 text-slate-600 dark:text-slate-400">Loading chart...</p>
            </div>
          </div>
        )}
        
        {chartLoaded && (
          <div className="h-full flex flex-col">
            <div className="p-4 flex items-center justify-between border-b border-slate-200 dark:border-slate-700">
              <div>
                <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">
                  {selectedSymbol?.name || 'Select a symbol'}
                </h2>
                <div className="flex items-center mt-1">
                  <span className="text-2xl font-bold text-slate-800 dark:text-slate-200">
                    ${selectedSymbol?.price.toFixed(2)}
                  </span>
                  <div className={`ml-2 flex items-center ${selectedSymbol && selectedSymbol.change >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
                    {selectedSymbol && selectedSymbol.change >= 0 ? (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                      </svg>
                    ) : (
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                      </svg>
                    )}
                    <span className="ml-1 font-semibold">
                      {selectedSymbol ? Math.abs(selectedSymbol.change).toFixed(2) + '%' : '0.00%'}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <div className="text-center">
                  <p className="text-xs text-slate-500 dark:text-slate-400">AI Score</p>
                  <div className="flex items-center justify-center mt-1">
                    <div className="h-8 w-8 rounded-full flex items-center justify-center text-white font-medium text-sm"
                         style={{
                           backgroundColor: selectedSymbol && selectedSymbol.aiScore >= 80 ? '#10B981' : 
                                           selectedSymbol && selectedSymbol.aiScore >= 60 ? '#F59E0B' : '#EF4444'
                         }}>
                      {selectedSymbol?.aiScore || 0}
                    </div>
                  </div>
                </div>
                <button className="px-3 py-1 text-sm font-medium rounded bg-blue-600 text-white hover:bg-blue-700">
                  Trade
                </button>
              </div>
            </div>
            
            <div className="flex-1 p-4">
              {/* This would be replaced with actual TradingView chart */}
              <div className="h-full w-full bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700 flex items-center justify-center">
                <div className="text-center">
                  <p className="text-slate-600 dark:text-slate-400 mb-2">
                    TradingView Chart for {selectedSymbol?.symbol || 'selected symbol'}
                  </p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    In a production environment, this would be replaced with the TradingView Widget
                  </p>
                  
                  {/* Mock chart display */}
                  <div className="mt-4 h-[400px] w-full bg-gradient-to-b from-slate-100 to-white dark:from-slate-700 dark:to-slate-800 rounded border border-slate-200 dark:border-slate-600 relative overflow-hidden">
                    {/* Mock candles */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-50">
                      {Array(20).fill(0).map((_, i) => (
                        <div 
                          key={i}
                          className={`h-${Math.floor(Math.random() * 20) + 10} w-3 mx-1 ${
                            Math.random() > 0.5 ? 'bg-emerald-500' : 'bg-red-500'
                          }`}
                          style={{ height: `${Math.floor(Math.random() * 150) + 50}px` }}
                        ></div>
                      ))}
                    </div>
                    
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                      <button className="px-4 py-2 bg-blue-600 text-white rounded font-medium hover:bg-blue-700">
                        Activate TradingView Integration
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TradingView;