import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { mockMarketData, mockWatchlist } from '../data/mockData';
import { MarketSymbol, WatchlistItem } from '../types/market';

type MarketContextType = {
  marketData: MarketSymbol[];
  watchlist: WatchlistItem[];
  selectedSymbol: WatchlistItem | null;
  addToWatchlist: (symbol: string, name: string) => void;
  removeFromWatchlist: (symbol: string) => void;
  selectSymbol: (symbol: string) => void;
  isMarketOpen: boolean;
};

const MarketContext = createContext<MarketContextType | undefined>(undefined);

export const MarketProvider = ({ children }: { children: ReactNode }) => {
  const [marketData, setMarketData] = useState<MarketSymbol[]>(mockMarketData);
  const [watchlist, setWatchlist] = useState<WatchlistItem[]>(mockWatchlist);
  const [selectedSymbol, setSelectedSymbol] = useState<WatchlistItem | null>(mockWatchlist[0]);
  const [isMarketOpen, setIsMarketOpen] = useState(true);

  useEffect(() => {
    // Simulate market data updates
    const interval = setInterval(() => {
      setMarketData(prevData => 
        prevData.map(item => ({
          ...item,
          price: parseFloat((item.price + (Math.random() - 0.5) * 0.1).toFixed(2)),
          change: parseFloat((item.change + (Math.random() - 0.5) * 0.05).toFixed(2)),
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const addToWatchlist = (symbol: string, name: string) => {
    if (!watchlist.some(item => item.symbol === symbol)) {
      const newItem = {
        symbol,
        name,
        price: 0,
        change: 0,
        volume: 0,
        aiScore: Math.floor(Math.random() * 100),
      };
      setWatchlist([...watchlist, newItem]);
    }
  };

  const removeFromWatchlist = (symbol: string) => {
    setWatchlist(watchlist.filter(item => item.symbol !== symbol));
    if (selectedSymbol?.symbol === symbol) {
      setSelectedSymbol(watchlist[0] || null);
    }
  };

  const selectSymbol = (symbol: string) => {
    const found = watchlist.find(item => item.symbol === symbol);
    setSelectedSymbol(found || null);
  };

  return (
    <MarketContext.Provider
      value={{
        marketData,
        watchlist,
        selectedSymbol,
        addToWatchlist,
        removeFromWatchlist,
        selectSymbol,
        isMarketOpen,
      }}
    >
      {children}
    </MarketContext.Provider>
  );
};

export const useMarket = (): MarketContextType => {
  const context = useContext(MarketContext);
  if (context === undefined) {
    throw new Error('useMarket must be used within a MarketProvider');
  }
  return context;
};