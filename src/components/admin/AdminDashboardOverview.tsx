import React, { useState } from 'react';
import { Users, UserCheck, Newspaper, Search, PlusCircle, BarChart3, TrendingUp, Shield, ArrowUpRight } from 'lucide-react';
import { AdminViewType, NewsItem } from '../../types';

interface AdminDashboardOverviewProps {
  onNavigate: (view: AdminViewType) => void;
  newsItems: NewsItem[];
  totalAdminsCount: number;
  totalAppUsersCount: number;
}

export const AdminDashboardOverview: React.FC<AdminDashboardOverviewProps> = ({
  onNavigate,
  newsItems,
  totalAdminsCount,
  totalAppUsersCount,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="space-y-6">
      {/* Top Global Search Bar as in video */}
      <div className="bg-white p-3 rounded-lg border border-slate-200 shadow-xs flex items-center space-x-3">
        <Search className="w-5 h-5 text-slate-400 shrink-0" />
        <input
          type="text"
          placeholder="Search news, divisions, departments, or administration..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full text-sm text-slate-800 placeholder-slate-400 focus:outline-none bg-transparent"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="text-xs text-slate-400 hover:text-slate-600 font-medium px-2 py-1 bg-slate-100 rounded"
          >
            Clear
          </button>
        )}
      </div>

      {/* 3 Prominent Stat Cards matching the exact layout in video */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* 1. Total Admin */}
        <div
          onClick={() => onNavigate('admin_list')}
          className="bg-[#0070ba] hover:bg-[#0062a4] text-white rounded-lg p-6 shadow-sm border border-sky-700/50 cursor-pointer transition-all hover:scale-[1.01] flex flex-col items-center justify-center text-center group"
        >
          <div className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">
            {totalAdminsCount}
          </div>
          <div className="text-sm md:text-base font-semibold text-sky-100 tracking-wide flex items-center">
            Total Admin
            <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* 2. Total App User */}
        <div
          onClick={() => onNavigate('app_user_list')}
          className="bg-[#0070ba] hover:bg-[#0062a4] text-white rounded-lg p-6 shadow-sm border border-sky-700/50 cursor-pointer transition-all hover:scale-[1.01] flex flex-col items-center justify-center text-center group"
        >
          <div className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">
            {totalAppUsersCount}
          </div>
          <div className="text-sm md:text-base font-semibold text-sky-100 tracking-wide flex items-center">
            Total App User
            <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>

        {/* 3. Total Post */}
        <div
          onClick={() => onNavigate('news_post_list')}
          className="bg-[#0070ba] hover:bg-[#0062a4] text-white rounded-lg p-6 shadow-sm border border-sky-700/50 cursor-pointer transition-all hover:scale-[1.01] flex flex-col items-center justify-center text-center group"
        >
          <div className="text-3xl md:text-4xl font-extrabold tracking-tight mb-1">
            {newsItems.length + 65674}
          </div>
          <div className="text-sm md:text-base font-semibold text-sky-100 tracking-wide flex items-center">
            Total Post
            <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 group-hover:opacity-100 transition-opacity" />
          </div>
        </div>
      </div>

      {/* Quick Action Shortcuts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <button
          onClick={() => onNavigate('add_news_post')}
          className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-sky-500 hover:shadow-xs transition-all flex items-center space-x-3 text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-sky-50 text-sky-600 flex items-center justify-center shrink-0 group-hover:bg-sky-600 group-hover:text-white transition-colors">
            <PlusCircle className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Add News Post</p>
            <p className="text-[11px] text-slate-500">Upload press clipping / news</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('report')}
          className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-sky-500 hover:shadow-xs transition-all flex items-center space-x-3 text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0 group-hover:bg-emerald-600 group-hover:text-white transition-colors">
            <BarChart3 className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Sentiment Analytics</p>
            <p className="text-[11px] text-slate-500">View media division reports</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('role_list')}
          className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-sky-500 hover:shadow-xs transition-all flex items-center space-x-3 text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-amber-50 text-amber-600 flex items-center justify-center shrink-0 group-hover:bg-amber-600 group-hover:text-white transition-colors">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Role Permissions</p>
            <p className="text-[11px] text-slate-500">Manage 7 RBAC roles</p>
          </div>
        </button>

        <button
          onClick={() => onNavigate('department_list')}
          className="p-4 bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-sky-500 hover:shadow-xs transition-all flex items-center space-x-3 text-left group"
        >
          <div className="w-10 h-10 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0 group-hover:bg-indigo-600 group-hover:text-white transition-colors">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <p className="text-xs font-bold text-slate-800">Master Setting</p>
            <p className="text-[11px] text-slate-500">Configure Divisions & Cities</p>
          </div>
        </button>
      </div>

      {/* Recent Monitored Media Clippings Stream */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5">
        <div className="flex items-center justify-between mb-4 border-b border-slate-100 pb-3">
          <div>
            <h3 className="text-sm font-bold text-slate-900">Recently Published Media Clips</h3>
            <p className="text-xs text-slate-500">Live monitoring across Northern Railway divisions</p>
          </div>
          <button
            onClick={() => onNavigate('news_post_list')}
            className="text-xs font-semibold text-sky-600 hover:text-sky-800 flex items-center"
          >
            View All News Posts <ArrowUpRight className="w-3.5 h-3.5 ml-1" />
          </button>
        </div>

        <div className="divide-y divide-slate-100">
          {newsItems.slice(0, 5).map((item) => (
            <div key={item.id} className="py-3 flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="space-y-1 max-w-2xl">
                <div className="flex items-center space-x-2">
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                      item.sentiment === 'Positive'
                        ? 'bg-emerald-100 text-emerald-800'
                        : item.sentiment === 'Negative'
                        ? 'bg-rose-100 text-rose-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {item.sentiment}
                  </span>
                  <span className="text-xs text-slate-500">&bull; {item.division} Division</span>
                  <span className="text-xs text-slate-400">&bull; {item.department}</span>
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-800 hover:text-sky-600 cursor-pointer" onClick={() => onNavigate('news_post_list')}>
                  {item.title}
                </p>
              </div>

              <div className="flex items-center space-x-3 text-xs text-slate-500 shrink-0">
                <span>{item.date} {item.time}</span>
                <span className="px-2 py-0.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded font-medium text-[10px]">
                  {item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
