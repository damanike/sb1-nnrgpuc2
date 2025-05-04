import { Zap, ExternalLink } from 'lucide-react';

type Insight = {
  id: string;
  title: string;
  description: string;
  confidence: number;
  createdAt: string;
  relatedSymbols: string[];
};

type AIInsightCardProps = {
  insight: Insight;
};

const AIInsightCard = ({ insight }: AIInsightCardProps) => {
  return (
    <div className="p-3 border border-slate-200 dark:border-slate-700 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors cursor-pointer">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-slate-800 dark:text-slate-200">{insight.title}</h3>
        <div className="flex items-center">
          <Zap size={14} className="text-amber-500" />
          <span className="ml-1 text-xs font-medium">{insight.confidence}%</span>
        </div>
      </div>
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-3">
        {insight.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="flex flex-wrap gap-1">
          {insight.relatedSymbols.map((symbol) => (
            <span key={symbol} className="inline-block px-2 py-1 text-xs font-medium bg-slate-100 dark:bg-slate-700 text-slate-800 dark:text-slate-300 rounded">
              {symbol}
            </span>
          ))}
        </div>
        <ExternalLink size={14} className="text-slate-400" />
      </div>
    </div>
  );
};

export default AIInsightCard;