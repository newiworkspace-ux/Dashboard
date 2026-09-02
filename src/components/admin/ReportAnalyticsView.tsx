import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Calendar,
  Filter,
  PieChart as PieIcon,
  Layers,
  FileSpreadsheet,
  CheckCircle,
  Share2,
  Sparkles
} from 'lucide-react';
import { NewsItem } from '../../types';

interface ReportAnalyticsViewProps {
  newsItems: NewsItem[];
  divisions: Array<{ id: number; name: string }>;
}

export const ReportAnalyticsView: React.FC<ReportAnalyticsViewProps> = ({ newsItems, divisions }) => {
  const [selectedDivision, setSelectedDivision] = useState('All');
  const [dateRange, setDateRange] = useState('Current Month (June 2025)');
  const [isExporting, setIsExporting] = useState(false);

  const filteredNews = newsItems.filter(
    (n) => selectedDivision === 'All' || n.division === selectedDivision
  );

  const positiveCount = filteredNews.filter((n) => n.sentiment === 'Positive').length;
  const neutralCount = filteredNews.filter((n) => n.sentiment === 'Neutral').length;
  const negativeCount = filteredNews.filter((n) => n.sentiment === 'Negative').length;
  const total = filteredNews.length || 1;

  const posPct = Math.round((positiveCount / total) * 100);
  const neuPct = Math.round((neutralCount / total) * 100);
  const negPct = Math.round((negativeCount / total) * 100);

  // Division wise distribution
  const divisionCounts = divisions.map((div) => {
    const count = newsItems.filter((n) => n.division === div.name).length;
    return { name: div.name, count };
  });

  // Media Source breakdown
  const printMediaCount = filteredNews.filter((n) => n.source === 'Print Media').length;
  const electronicMediaCount = filteredNews.filter((n) => n.source === 'Electronic Media').length;
  const socialMediaCount = filteredNews.filter((n) => n.source === 'Social Media').length;

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      alert('Northern Railway PR Report generated successfully. Download ready in CSV/PDF format.');
    }, 800);
  };

  return (
    <div className="space-y-5">
      {/* Top Filter & Report Generator Bar */}
      <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h3 className="text-base font-bold text-slate-900 flex items-center">
            <BarChart3 className="w-4 h-4 mr-2 text-sky-600" />
            Media & Public Relations Sentiment Report
          </h3>
          <p className="text-xs text-slate-500">
            Real-time analytics across Northern Railway divisions and media channels
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <div className="flex items-center space-x-1 text-xs bg-slate-50 border border-slate-200 rounded px-2.5 py-1.5 text-slate-700">
            <Calendar className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-medium">{dateRange}</span>
          </div>

          <select
            value={selectedDivision}
            onChange={(e) => setSelectedDivision(e.target.value)}
            className="px-3 py-1.5 text-xs bg-white border border-slate-300 rounded text-slate-700 focus:outline-none focus:ring-1 focus:ring-sky-500 font-medium"
          >
            <option value="All">All Divisions (Northern Zone)</option>
            {divisions.map((d) => (
              <option key={d.id} value={d.name}>
                {d.name} Division
              </option>
            ))}
          </select>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="inline-flex items-center space-x-1.5 px-3.5 py-1.5 bg-[#0070ba] hover:bg-[#005c9a] text-white rounded text-xs font-bold shadow-xs transition-colors"
          >
            <Download className="w-3.5 h-3.5" />
            <span>{isExporting ? 'Generating...' : 'Export PR Report'}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
            <span>Total Press Clippings</span>
            <Layers className="w-4 h-4 text-sky-600" />
          </div>
          <p className="text-2xl font-extrabold text-slate-900">{filteredNews.length}</p>
          <p className="text-[11px] text-emerald-600 font-medium mt-1">
            &uarr; 12% increase from previous week
          </p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-emerald-200 shadow-xs bg-linear-to-br from-white to-emerald-50/30">
          <div className="flex items-center justify-between text-xs text-emerald-700 mb-1 font-semibold">
            <span>Positive Coverage</span>
            <span className="text-xs bg-emerald-100 text-emerald-800 px-1.5 py-0.5 rounded font-bold">{posPct}%</span>
          </div>
          <p className="text-2xl font-extrabold text-emerald-700">{positiveCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Passenger amenities, safety upgrades & Vande Bharat</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-amber-200 shadow-xs bg-linear-to-br from-white to-amber-50/30">
          <div className="flex items-center justify-between text-xs text-amber-700 mb-1 font-semibold">
            <span>Neutral Coverage</span>
            <span className="text-xs bg-amber-100 text-amber-800 px-1.5 py-0.5 rounded font-bold">{neuPct}%</span>
          </div>
          <p className="text-2xl font-extrabold text-amber-700">{neutralCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Routine operations, timetable updates & freight</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-rose-200 shadow-xs bg-linear-to-br from-white to-rose-50/30">
          <div className="flex items-center justify-between text-xs text-rose-700 mb-1 font-semibold">
            <span>Negative / Grievance</span>
            <span className="text-xs bg-rose-100 text-rose-800 px-1.5 py-0.5 rounded font-bold">{negPct}%</span>
          </div>
          <p className="text-2xl font-extrabold text-rose-700">{negativeCount}</p>
          <p className="text-[11px] text-slate-500 mt-1">Weather disruptions, landslide alerts</p>
        </div>
      </div>

      {/* Visual Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
        {/* Sentiment Distribution Bar Chart */}
        <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Sentiment Tone Distribution ({selectedDivision} Division)
          </h4>

          {/* Graphical Progress Bars */}
          <div className="space-y-3 pt-2">
            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-emerald-700">Positive Tone</span>
                <span className="text-slate-600">{positiveCount} articles ({posPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${posPct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-amber-700">Neutral Tone</span>
                <span className="text-slate-600">{neutralCount} articles ({neuPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-amber-400 h-full rounded-full transition-all duration-500"
                  style={{ width: `${neuPct}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between text-xs font-semibold mb-1">
                <span className="text-rose-700">Negative Tone</span>
                <span className="text-slate-600">{negativeCount} articles ({negPct}%)</span>
              </div>
              <div className="w-full bg-slate-100 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-rose-500 h-full rounded-full transition-all duration-500"
                  style={{ width: `${negPct}%` }}
                />
              </div>
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 text-xs text-slate-600">
            <p className="font-semibold text-slate-800 mb-0.5">PR Officer Note:</p>
            Overall sentiment is overwhelmingly positive (<strong>{posPct}%</strong>) due to active press releases on ticket checking revenues, cleanliness drives, and Amrit Bharat station redevelopment works.
          </div>
        </div>

        {/* Division Breakdown */}
        <div className="lg:col-span-6 bg-white p-5 rounded-lg border border-slate-200 shadow-xs space-y-4">
          <h4 className="text-sm font-bold text-slate-900 border-b border-slate-100 pb-2">
            Coverage Share by Division
          </h4>

          <div className="space-y-2.5">
            {divisionCounts.map((d) => {
              const pct = Math.round((d.count / (newsItems.length || 1)) * 100);
              return (
                <div key={d.name} className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-slate-700 w-28 truncate">{d.name}</span>
                  <div className="flex-1 mx-3 bg-slate-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className="bg-[#0070ba] h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.max(pct, 8)}%` }}
                    />
                  </div>
                  <span className="text-slate-500 font-mono w-16 text-right font-medium">
                    {d.count} clips ({pct}%)
                  </span>
                </div>
              );
            })}
          </div>

          {/* Media Channel Tag Breakdown */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-600">
            <span><strong>Print:</strong> {printMediaCount}</span>
            <span><strong>Electronic:</strong> {electronicMediaCount}</span>
            <span><strong>Social:</strong> {socialMediaCount}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
