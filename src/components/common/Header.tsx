import React, { useState } from 'react';
import { User, Bell, ChevronDown, Shield, Newspaper, LogOut, Menu, X, ExternalLink, CheckCircle } from 'lucide-react';

interface HeaderProps {
  portalMode: 'admin' | 'user';
  onTogglePortalMode: (mode: 'admin' | 'user') => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  currentUser?: { name: string; email: string; role: string };
}

export const Header: React.FC<HeaderProps> = ({
  portalMode,
  onTogglePortalMode,
  onToggleSidebar,
  currentUser = { name: 'User Profile', email: 'iamkumarsandeep12@gmail.com', role: 'Super Admin' },
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-slate-200 shadow-xs">
      <div className="flex items-center justify-between px-3 md:px-6 py-2.5">
        {/* Left Side: Logo & Northern Railway Brand */}
        <div className="flex items-center space-x-3">
          <button
            onClick={onToggleSidebar}
            className="p-1.5 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg lg:hidden"
            aria-label="Toggle Sidebar"
          >
            <Menu className="w-6 h-6" />
          </button>

          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => onTogglePortalMode('user')}>
            {/* Indian Railways Official Emblem SVG Icon */}
            <div className="w-10 h-10 rounded-full bg-[#c02828] border-2 border-amber-400 flex items-center justify-center shadow-xs overflow-hidden shrink-0">
              <div className="w-8 h-8 rounded-full border border-amber-300 flex flex-col items-center justify-center text-white">
                <span className="text-[7px] font-bold tracking-tighter uppercase leading-none">INDIAN</span>
                <span className="text-[8px] font-extrabold text-amber-200 leading-none">RAIL</span>
                <span className="text-[6px] font-semibold leading-none">WAYS</span>
              </div>
            </div>

            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-base md:text-xl font-extrabold tracking-wide text-slate-900 uppercase font-sans">
                  NORTHERN RAILWAY
                </h1>
                <span className="hidden sm:inline-block text-[10px] uppercase font-bold tracking-wider px-2 py-0.5 bg-blue-50 text-blue-700 border border-blue-200 rounded">
                  Media & PR Portal
                </span>
              </div>
              <p className="text-[11px] text-slate-500 hidden sm:block">
                {portalMode === 'admin' ? 'Centralized Public Relations & Media Monitoring' : 'Official Press Clippings & News Archives'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Portal Switcher & User Profile Menu */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {/* Quick Portal Switch Tab Button */}
          <div className="bg-slate-100 p-1 rounded-lg flex items-center text-xs font-semibold">
            <button
              onClick={() => onTogglePortalMode('admin')}
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition-all ${
                portalMode === 'admin'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              <span className="hidden md:inline">Admin Portal</span>
            </button>
            <button
              onClick={() => onTogglePortalMode('user')}
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition-all ${
                portalMode === 'user'
                  ? 'bg-sky-600 text-white shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Newspaper className="w-3.5 h-3.5" />
              <span className="hidden md:inline">News Portal</span>
            </button>
          </div>

          {/* Notification bell */}
          <button
            onClick={() => setShowNotificationToast(!showNotificationToast)}
            className="relative p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white animate-pulse"></span>
          </button>

          {/* User Profile Dropdown */}
          <div className="relative">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center space-x-2 p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors"
            >
              <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-700 font-semibold text-xs">
                <User className="w-4 h-4 text-slate-600" />
              </div>
              <span className="text-xs md:text-sm font-medium text-slate-800 hidden sm:inline">
                {currentUser.name}
              </span>
              <ChevronDown className="w-4 h-4 text-slate-500" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="px-4 py-2 border-b border-slate-100">
                  <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                  <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                  <div className="mt-1 inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-100 text-sky-800">
                    {currentUser.role}
                  </div>
                </div>

                <div className="py-1">
                  <button
                    onClick={() => {
                      onTogglePortalMode(portalMode === 'admin' ? 'user' : 'admin');
                      setIsDropdownOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-sky-50 hover:text-sky-700 flex items-center justify-between"
                  >
                    <span>Switch to {portalMode === 'admin' ? 'User News Portal' : 'Admin Dashboard'}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                  </button>

                  <a
                    href="#terms"
                    onClick={(e) => {
                      e.preventDefault();
                      setIsDropdownOpen(false);
                    }}
                    className="block px-4 py-2 text-xs text-slate-700 hover:bg-slate-50"
                  >
                    Account Settings
                  </a>
                </div>

                <div className="border-t border-slate-100 pt-1">
                  <button
                    onClick={() => {
                      setIsDropdownOpen(false);
                      alert('Session is active. Logged in as Northern Railway PR Administrator.');
                    }}
                    className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Log Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Notification Toast Modal if clicked */}
      {showNotificationToast && (
        <div className="absolute right-4 top-14 w-80 bg-white border border-slate-200 rounded-lg shadow-xl p-3 z-50">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center">
              <Bell className="w-3.5 h-3.5 mr-1 text-sky-600" /> Recent Media Alerts
            </span>
            <button onClick={() => setShowNotificationToast(false)} className="text-slate-400 hover:text-slate-600">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-sky-50 rounded border border-sky-100">
              <p className="font-semibold text-sky-900">New positive coverage published</p>
              <p className="text-slate-600 text-[11px]">Amar Ujala Hardoi - Goods shed renovation coverage added.</p>
              <span className="text-[10px] text-slate-400">10 mins ago</span>
            </div>
            <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
              <p className="font-semibold text-emerald-900">Ferozpur Division report synced</p>
              <p className="text-slate-600 text-[11px]">Ticket checking drive report verified by Content Analyst.</p>
              <span className="text-[10px] text-slate-400">1 hour ago</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
