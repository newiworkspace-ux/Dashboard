import React from 'react';
import { NewsItem } from '../../types';
import { Calendar, MapPin, Building2, Tag, ArrowRight } from 'lucide-react';

interface NewsClippingCardProps {
  news: NewsItem;
  onClick?: (news: NewsItem) => void;
  compact?: boolean;
}

export const NewsClippingCard: React.FC<NewsClippingCardProps> = ({ news, onClick, compact = false }) => {
  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">Positive</span>;
      case 'Negative':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">Negative</span>;
      case 'Neutral':
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">Neutral</span>;
    }
  };

  return (
    <div
      onClick={() => onClick && onClick(news)}
      className={`group bg-white rounded-lg border border-slate-200 hover:border-sky-400 hover:shadow-lg transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between ${
        compact ? 'p-3' : 'p-4'
      }`}
    >
      {/* Newspaper Styled Clipping Preview */}
      <div className="space-y-3">
        {/* Realistic Newspaper Header box */}
        <div className="bg-[#fcfbf7] border border-slate-300 rounded p-3 shadow-xs relative overflow-hidden">
          {/* Top newspaper masthead bar */}
          <div className="border-b border-slate-300 pb-1.5 mb-2 flex items-center justify-between text-[11px] text-slate-500 font-mono tracking-tight">
            <span className="font-bold text-slate-700 uppercase truncate">
              {news.subSource || 'Print Media'} &bull; {news.source}
            </span>
            <span className="text-slate-500 shrink-0 ml-1">{news.date}</span>
          </div>

          {/* Newspaper Main Headline */}
          <h4 className="font-serif font-bold text-slate-900 leading-snug line-clamp-2 text-sm md:text-base group-hover:text-sky-700 transition-colors">
            {news.title}
          </h4>

          {/* Realistic Simulated Newspaper Image & Text Snippet */}
          <div className="mt-2.5 grid grid-cols-12 gap-2 items-start">
            <div className="col-span-4 bg-slate-100 border border-slate-200 rounded overflow-hidden aspect-4/3 relative flex items-center justify-center">
              {/* Simulated Rail Inspection / Train Photo */}
              <div className="w-full h-full bg-linear-to-tr from-sky-900 via-slate-800 to-indigo-900 text-white flex flex-col items-center justify-center p-1 text-center">
                <span className="text-[10px] font-bold tracking-wider text-sky-300 uppercase">Northern Rly</span>
                <span className="text-[8px] text-slate-300 truncate max-w-full px-1">{news.division} Div</span>
              </div>
            </div>
            <div className="col-span-8">
              <p className="text-[11px] text-slate-600 line-clamp-3 leading-relaxed font-serif text-justify">
                {news.description}
              </p>
            </div>
          </div>

          {/* Simulated Newspaper footer print mark */}
          <div className="mt-2 pt-1.5 border-t border-slate-200 flex items-center justify-between text-[10px] text-slate-400 font-mono">
            <span>{news.city || 'Delhi'}, {news.state || 'Northern Zone'}</span>
            <span>NR-PR-DOC#{news.srNo}</span>
          </div>
        </div>

        {/* Metadata pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1 text-xs">
          {getSentimentBadge(news.sentiment)}
          <span className="inline-flex items-center text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px]">
            <Building2 className="w-3 h-3 mr-1 text-slate-400" />
            {news.division}
          </span>
          <span className="inline-flex items-center text-slate-600 bg-slate-100 px-2 py-0.5 rounded text-[11px] truncate max-w-[140px]">
            <Tag className="w-3 h-3 mr-1 text-slate-400" />
            {news.department}
          </span>
        </div>
      </div>

      {/* Card bottom info */}
      <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
        <span className="flex items-center text-slate-500 font-medium">
          <Calendar className="w-3.5 h-3.5 mr-1 text-slate-400" />
          {news.date}
        </span>
        <span className="inline-flex items-center text-sky-600 font-semibold text-xs group-hover:translate-x-0.5 transition-transform">
          Read News <ArrowRight className="w-3.5 h-3.5 ml-1" />
        </span>
      </div>
    </div>
  );
};
