import React, { useState } from 'react';
import { Plus, Search, Eye, Edit, Trash2, CheckCircle, Filter, FileText, ArrowUpDown, ChevronLeft, ChevronRight } from 'lucide-react';
import { NewsItem } from '../../types';

interface NewsPostListProps {
  newsItems: NewsItem[];
  onAddNew: () => void;
  onEditNews: (news: NewsItem) => void;
  onDeleteNews: (id: string) => void;
  onViewDetail: (news: NewsItem) => void;
}

export const NewsPostList: React.FC<NewsPostListProps> = ({
  newsItems,
  onAddNew,
  onEditNews,
  onDeleteNews,
  onViewDetail,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterDivision, setFilterDivision] = useState('All');
  const [filterSentiment, setFilterSentiment] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // Filter items
  const filteredItems = newsItems.filter((item) => {
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.division.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.roleName.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesDivision = filterDivision === 'All' || item.division === filterDivision;
    const matchesSentiment = filterSentiment === 'All' || item.sentiment === filterSentiment;

    return matchesSearch && matchesDivision && matchesSentiment;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage) || 1;
  const currentItems = filteredItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const getSentimentBadge = (sentiment: string) => {
    switch (sentiment) {
      case 'Positive':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">Positive</span>;
      case 'Negative':
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-200">Negative</span>;
      case 'Neutral':
      default:
        return <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-200">Neutral</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Top Action Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <button
          onClick={onAddNew}
          className="inline-flex items-center justify-center space-x-2 px-4 py-2.5 bg-[#0070ba] hover:bg-[#005c9a] text-white rounded-md text-xs font-bold shadow-xs transition-colors cursor-pointer w-fit"
        >
          <Plus className="w-4 h-4" />
          <span>Add News Post</span>
        </button>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-2">
          <select
            value={filterDivision}
            onChange={(e) => {
              setFilterDivision(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="All">All Divisions</option>
            <option value="Moradabad">Moradabad</option>
            <option value="Ferozpur">Ferozpur</option>
            <option value="Ambala">Ambala</option>
            <option value="Delhi">Delhi</option>
            <option value="Lucknow">Lucknow</option>
            <option value="Jammu">Jammu</option>
          </select>

          <select
            value={filterSentiment}
            onChange={(e) => {
              setFilterSentiment(e.target.value);
              setCurrentPage(1);
            }}
            className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded-md text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500"
          >
            <option value="All">All Sentiments</option>
            <option value="Positive">Positive</option>
            <option value="Neutral">Neutral</option>
            <option value="Negative">Negative</option>
          </select>
        </div>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        {/* Card Header & Search */}
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">News Post List</h3>
            <p className="text-xs text-slate-500">Showing {filteredItems.length} media monitoring posts</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search news post..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Responsive Table matching video columns */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-3 w-10 text-center">#</th>
                <th className="py-3 px-3 min-w-[240px]">News Title</th>
                <th className="py-3 px-3">State</th>
                <th className="py-3 px-3">Division</th>
                <th className="py-3 px-3">Department</th>
                <th className="py-3 px-3">Sentiments</th>
                <th className="py-3 px-3">Role Name</th>
                <th className="py-3 px-3 whitespace-nowrap">Date & Time</th>
                <th className="py-3 px-3 text-center">Status</th>
                <th className="py-3 px-3 text-center min-w-[100px]">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {currentItems.length > 0 ? (
                currentItems.map((item, idx) => (
                  <tr key={item.id} className="hover:bg-sky-50/40 transition-colors">
                    <td className="py-3 px-3 text-center text-slate-500 font-mono">
                      {(currentPage - 1) * itemsPerPage + idx + 1}
                    </td>
                    <td className="py-3 px-3">
                      <div
                        onClick={() => onViewDetail(item)}
                        className="font-medium text-slate-900 hover:text-sky-600 cursor-pointer line-clamp-2 max-w-sm"
                        title={item.title}
                      >
                        {item.title}
                      </div>
                      <span className="text-[10px] text-slate-400 font-mono">
                        {item.source} {item.subSource ? `&bull; ${item.subSource}` : ''}
                      </span>
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap font-medium text-slate-600">
                      {item.state}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-700 font-medium">
                      {item.division}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-600">
                      {item.department}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap">
                      {getSentimentBadge(item.sentiment)}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-500 text-[11px]">
                      {item.roleName}
                    </td>
                    <td className="py-3 px-3 whitespace-nowrap text-slate-600 text-[11px] font-mono">
                      {item.date} {item.time}
                    </td>
                    <td className="py-3 px-3 text-center">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-50 text-emerald-700 border border-emerald-200">
                        {item.status}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-center">
                      <div className="flex items-center justify-center space-x-1.5">
                        <button
                          onClick={() => onViewDetail(item)}
                          className="p-1 text-sky-600 hover:bg-sky-100 rounded transition-colors"
                          title="View clipping"
                        >
                          <Eye className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => onEditNews(item)}
                          className="p-1 text-amber-600 hover:bg-amber-100 rounded transition-colors"
                          title="Edit news"
                        >
                          <Edit className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (window.confirm(`Are you sure you want to delete "${item.title}"?`)) {
                              onDeleteNews(item.id);
                            }
                          }}
                          className="p-1 text-rose-600 hover:bg-rose-100 rounded transition-colors"
                          title="Delete news"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={10} className="py-8 text-center text-slate-400">
                    <FileText className="w-8 h-8 mx-auto text-slate-300 mb-2" />
                    <p className="text-sm font-medium text-slate-600">No news post found</p>
                    <p className="text-xs text-slate-400">Try adjusting your search criteria</p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination bar matching exact video UI */}
        <div className="p-3 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div>
            Showing <span className="font-semibold text-slate-700">{filteredItems.length > 0 ? (currentPage - 1) * itemsPerPage + 1 : 0}</span> to{' '}
            <span className="font-semibold text-slate-700">{Math.min(currentPage * itemsPerPage, filteredItems.length)}</span> of{' '}
            <span className="font-semibold text-slate-700">{filteredItems.length}</span> entries
          </div>

          <div className="flex items-center space-x-1">
            <button
              onClick={() => setCurrentPage(1)}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              First
            </button>
            <button
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Previous
            </button>

            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              const pageNum = i + 1;
              return (
                <button
                  key={pageNum}
                  onClick={() => setCurrentPage(pageNum)}
                  className={`w-7 h-7 rounded text-xs font-semibold ${
                    currentPage === pageNum
                      ? 'bg-[#0070ba] text-white'
                      : 'border border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                  }`}
                >
                  {pageNum}
                </button>
              );
            })}

            {totalPages > 5 && <span className="px-1 text-slate-400">...</span>}
            {totalPages > 5 && (
              <button
                onClick={() => setCurrentPage(totalPages)}
                className={`w-8 h-7 rounded text-xs font-semibold ${
                  currentPage === totalPages
                    ? 'bg-[#0070ba] text-white'
                    : 'border border-slate-200 bg-white hover:bg-slate-100 text-slate-700'
                }`}
              >
                {totalPages}
              </button>
            )}

            <button
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              onClick={() => setCurrentPage(totalPages)}
              disabled={currentPage === totalPages}
              className="px-2 py-1 rounded border border-slate-200 bg-white hover:bg-slate-100 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Last
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
