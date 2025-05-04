export type MarketSymbol = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  marketCap?: number;
  high24h?: number;
  low24h?: number;
  type: 'stock' | 'forex' | 'crypto';
};

export type WatchlistItem = {
  symbol: string;
  name: string;
  price: number;
  change: number;
  volume: number;
  aiScore: number;
};

export type TradeSignal = {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  entryPrice: number;
  stopLoss: number;
  takeProfit: number;
  timeframe: '1m' | '5m' | '15m' | '1h' | '4h' | '1d';
  confidence: number;
  createdAt: string;
  reason: string;
};

export type Portfolio = {
  totalValue: number;
  dailyChange: number;
  positions: Position[];
  tradeHistory: Trade[];
};

export type Position = {
  id: string;
  symbol: string;
  name: string;
  entryPrice: number;
  currentPrice: number;
  quantity: number;
  value: number;
  pl: number;
  plPercentage: number;
  openDate: string;
};

export type Trade = {
  id: string;
  symbol: string;
  type: 'buy' | 'sell';
  price: number;
  quantity: number;
  value: number;
  fees: number;
  date: string;
  pl?: number;
  plPercentage?: number;
};