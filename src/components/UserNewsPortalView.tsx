import React, { useState } from 'react';
import {
  Search,
  Calendar,
  Building2,
  Tag,
  Share2,
  ExternalLink,
  Printer,
  ThumbsUp,
  Eye,
  Filter,
  ArrowRight,
  X,
  Sparkles,
  Bookmark,
  Newspaper
} from 'lucide-react';
import { NewsItem, SentimentType } from '../types';
import { NewsClippingCard } from './common/NewsClippingCard';

interface UserNewsPortalViewProps {
  newsItems: NewsItem[];
  divisions: Array<{ id: number; name: string }>;
  departments: Array<{ id: number; name: string }>;
  onViewNewsDetail?: (news: NewsItem) => void;
}

export const UserNewsPortalView: React.FC<UserNewsPortalViewProps> = ({
  newsItems,
  divisions,
  departments,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [selectedSentiment, setSelectedSentiment] = useState<string>('All');
  const [selectedDepartment, setSelectedDepartment] = useState('All');
  const [activeModalNews, setActiveModalNews] = useState<NewsItem | null>(null);
  const [likedMap, setLikedMap] = useState<Record<string, boolean>>({});

  const filteredNews = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.source.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDivision = selectedDivision === 'All' || item.division === selectedDivision;
    const matchesSentiment = selectedSentiment === 'All' || item.sentiment === selectedSentiment;
    const matchesDepartment = selectedDepartment === 'All' || item.department === selectedDepartment;

    return matchesSearch && matchesDivision && matchesSentiment && matchesDepartment;
  });

  const handleLike = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLikedMap((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const handleShare = (news: NewsItem, e?: React.MouseEvent) => {
    e?.stopPropagation();
    if (navigator.share) {
      navigator
        .share({
          title: news.title,
          text: `${news.title} - Northern Railway Media Archive`,
          url: window.location.href,
        })
        .catch(() => {});
    } else {
      navigator.clipboard.writeText(`${news.title} - ${news.originUrl || window.location.href}`);
      alert('News link copied to clipboard!');
    }
  };

  return (
    <div className="space-y-6">
      {/* Editorial Newspaper Header Banner */}
      <div className="newsprint-bg border border-slate-300 rounded-lg p-5 md:p-8 shadow-xs">
        <div className="max-w-4xl mx-auto text-center space-y-2 border-b-2 border-slate-900/80 pb-4 mb-4">
          <div className="flex items-center justify-center space-x-2 text-[10px] md:text-xs font-mono font-bold tracking-widest text-slate-600 uppercase">
            <span>OFFICIAL PRESS CLIPPINGS</span>
            <span>&bull;</span>
            <span>NORTHERN RAILWAY</span>
            <span>&bull;</span>
            <span>PUBLIC RELATIONS CELL</span>
          </div>
          <h2 className="font-serif text-2xl md:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
            Daily Press Clippings & Media Monitoring
          </h2>
          <p className="text-xs md:text-sm text-slate-600 max-w-2xl mx-auto font-serif italic">
            Authorized repository of verified newspaper clippings, electronic broadcasts, and regional media reports across Delhi, Punjab, Haryana, Uttar Pradesh, and Jammu & Kashmir.
          </p>
        </div>

        {/* Global Search & Quick Filter Pills */}
        <div className="max-w-3xl mx-auto space-y-3">
          <div className="relative bg-white rounded-lg border border-slate-300 shadow-xs flex items-center">
            <Search className="w-5 h-5 text-slate-400 absolute left-3.5" />
            <input
              type="text"
              placeholder="Search headline, newspaper, city, station, or department..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-2.5 text-xs md:text-sm text-slate-900 rounded-lg focus:outline-none focus:ring-1 focus:ring-sky-600"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="mr-3 text-xs text-slate-400 hover:text-slate-600 px-2 py-0.5 bg-slate-100 rounded"
              >
                Clear
              </button>
            )}
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
            <div className="flex flex-wrap items-center gap-2">
              <select
                value={selectedDivision}
                onChange={(e) => setSelectedDivision(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="All">All Divisions</option>
                {divisions.map((d) => (
                  <option key={d.id} value={d.name}>
                    {d.name} Division
                  </option>
                ))}
              </select>

              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 max-w-[150px]"
              >
                <option value="All">All Departments</option>
                {departments.map((dep) => (
                  <option key={dep.id} value={dep.name}>
                    {dep.name}
                  </option>
                ))}
              </select>

              <select
                value={selectedSentiment}
                onChange={(e) => setSelectedSentiment(e.target.value)}
                className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded font-medium text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
              >
                <option value="All">All Sentiments</option>
                <option value="Positive">Positive</option>
                <option value="Neutral">Neutral</option>
                <option value="Negative">Negative</option>
              </select>
            </div>

            <div className="text-xs text-slate-500 font-mono">
              Found <strong className="text-slate-800">{filteredNews.length}</strong> press items
            </div>
          </div>
        </div>
      </div>

      {/* Featured / Lead Press Article */}
      {filteredNews.length > 0 && (
        <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden hover:border-sky-400 transition-colors">
          <div className="bg-slate-50 border-b border-slate-200 px-4 py-2 flex items-center justify-between text-xs text-slate-600 font-semibold">
            <span className="flex items-center text-sky-700">
              <Sparkles className="w-3.5 h-3.5 mr-1" /> Lead Editorial Clipping
            </span>
            <span className="font-mono text-slate-400">{filteredNews[0].date}</span>
          </div>

          <div className="p-5 md:p-6 grid grid-cols-1 md:grid-cols-12 gap-5 items-start">
            <div className="md:col-span-8 space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs">
                <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold border border-emerald-300">
                  {filteredNews[0].sentiment}
                </span>
                <span className="text-slate-600 font-medium">
                  {filteredNews[0].source} &bull; {filteredNews[0].subSource}
                </span>
                <span className="text-slate-400">&bull; {filteredNews[0].division} Division</span>
              </div>

              <h3
                onClick={() => setActiveModalNews(filteredNews[0])}
                className="font-serif text-xl md:text-2xl font-bold text-slate-900 hover:text-sky-700 cursor-pointer leading-tight transition-colors"
              >
                {filteredNews[0].title}
              </h3>

              <p className="text-xs md:text-sm text-slate-600 line-clamp-3 leading-relaxed font-serif">
                {filteredNews[0].description}
              </p>

              <div className="pt-2 flex items-center space-x-4 text-xs text-slate-500">
                <button
                  onClick={() => setActiveModalNews(filteredNews[0])}
                  className="px-3.5 py-1.5 bg-[#0070ba] hover:bg-[#005c9a] text-white rounded font-bold transition-colors flex items-center space-x-1.5"
                >
                  <span>Read Full Clipping</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                <button
                  onClick={(e) => handleLike(filteredNews[0].id, e)}
                  className={`flex items-center space-x-1 px-2.5 py-1.5 rounded border transition-colors ${
                    likedMap[filteredNews[0].id]
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                  <span>{(filteredNews[0].likes || 0) + (likedMap[filteredNews[0].id] ? 1 : 0)}</span>
                </button>

                <button
                  onClick={(e) => handleShare(filteredNews[0], e)}
                  className="p-1.5 border border-slate-200 hover:bg-slate-50 rounded text-slate-600"
                  title="Share"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            <div className="md:col-span-4 bg-[#fbf9f4] border border-slate-300 rounded p-4 text-center">
              <div className="w-full aspect-4/3 bg-linear-to-br from-sky-900 to-slate-900 rounded text-white flex flex-col items-center justify-center p-3 text-center">
                <Newspaper className="w-8 h-8 text-amber-300 mb-2" />
                <span className="text-xs font-bold uppercase tracking-wider text-sky-200">
                  {filteredNews[0].subSource || 'Press Document'}
                </span>
                <span className="text-[10px] text-slate-300 mt-1">
                  {filteredNews[0].city}, {filteredNews[0].state}
                </span>
              </div>
              <div className="mt-2 text-[10px] font-mono text-slate-500">
                Official PR Document #{filteredNews[0].srNo}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Grid of Newspaper Clipping Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredNews.slice(1).map((news) => (
          <NewsClippingCard
            key={news.id}
            news={news}
            onClick={(n) => setActiveModalNews(n)}
          />
        ))}
      </div>

      {filteredNews.length === 0 && (
        <div className="bg-white rounded-lg border border-slate-200 p-12 text-center text-slate-400">
          <Newspaper className="w-10 h-10 mx-auto text-slate-300 mb-3" />
          <p className="text-sm font-semibold text-slate-700">No press clippings found</p>
          <p className="text-xs text-slate-400 mt-1">Try resetting search or division filters</p>
        </div>
      )}

      {/* Full Screen / Rich News Clipping Detail Modal */}
      {activeModalNews && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-3 md:p-6 overflow-y-auto">
          <div className="bg-white rounded-lg border border-slate-300 shadow-2xl max-w-3xl w-full max-h-[90vh] flex flex-col overflow-hidden animate-in fade-in zoom-in-95">
            {/* Modal Top Control Bar */}
            <div className="p-3.5 bg-slate-900 text-white flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-bold uppercase tracking-wider text-sky-300">
                  Northern Railway Media Archive
                </span>
                <span className="text-slate-500">&bull;</span>
                <span className="text-xs text-slate-300">Doc #{activeModalNews.srNo}</span>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => window.print()}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors"
                  title="Print Press Release"
                >
                  <Printer className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => handleShare(activeModalNews, e)}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors"
                  title="Share"
                >
                  <Share2 className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setActiveModalNews(null)}
                  className="p-1.5 hover:bg-slate-800 rounded text-slate-300 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body styled like genuine newspaper sheet */}
            <div className="p-6 md:p-8 overflow-y-auto newsprint-bg space-y-5 custom-scrollbar">
              {/* Masthead */}
              <div className="border-b-2 border-slate-900 pb-3 text-center">
                <div className="flex items-center justify-between text-xs font-mono text-slate-600 uppercase border-b border-slate-300 pb-1.5 mb-2">
                  <span>{activeModalNews.source} &bull; {activeModalNews.subSource}</span>
                  <span>{activeModalNews.city}, {activeModalNews.state}</span>
                  <span>{activeModalNews.date} {activeModalNews.time}</span>
                </div>
                <h2 className="font-serif text-2xl md:text-3xl font-extrabold text-slate-900 leading-tight">
                  {activeModalNews.title}
                </h2>
              </div>

              {/* Badges and division markers */}
              <div className="flex flex-wrap items-center justify-between gap-2 text-xs border-b border-slate-300 pb-3">
                <div className="flex items-center space-x-2">
                  <span
                    className={`font-semibold px-2 py-0.5 rounded text-[11px] ${
                      activeModalNews.sentiment === 'Positive'
                        ? 'bg-emerald-100 text-emerald-800 border border-emerald-300'
                        : activeModalNews.sentiment === 'Negative'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : 'bg-amber-100 text-amber-800 border border-amber-300'
                    }`}
                  >
                    Sentiment: {activeModalNews.sentiment}
                  </span>
                  <span className="font-medium text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded text-[11px]">
                    {activeModalNews.division} Division
                  </span>
                  <span className="font-medium text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded text-[11px]">
                    {activeModalNews.department}
                  </span>
                </div>

                {activeModalNews.originUrl && (
                  <a
                    href={activeModalNews.originUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center space-x-1 text-sky-700 font-semibold hover:underline text-xs"
                  >
                    <span>View Origin URL</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </div>

              {/* Full clipping text */}
              <div className="font-serif text-sm md:text-base text-slate-800 leading-relaxed space-y-4 whitespace-pre-line text-justify">
                {activeModalNews.description}
              </div>

              {/* Footer Stamp */}
              <div className="pt-4 border-t border-slate-300 flex items-center justify-between text-xs text-slate-500 font-mono">
                <div>Verified by: {activeModalNews.roleName}</div>
                <div>Status: {activeModalNews.status}</div>
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="p-3 bg-slate-100 border-t border-slate-200 flex items-center justify-between">
              <button
                onClick={(e) => handleLike(activeModalNews.id, e)}
                className={`flex items-center space-x-1.5 px-3 py-1.5 rounded text-xs font-semibold transition-colors ${
                  likedMap[activeModalNews.id]
                    ? 'bg-rose-600 text-white'
                    : 'bg-white border border-slate-300 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                <span>
                  {likedMap[activeModalNews.id] ? 'Liked' : 'Like'} ({(activeModalNews.likes || 0) + (likedMap[activeModalNews.id] ? 1 : 0)})
                </span>
              </button>

              <button
                onClick={() => setActiveModalNews(null)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-900 text-white rounded text-xs font-semibold transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
