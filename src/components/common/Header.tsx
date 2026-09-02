import React, { useState } from 'react';
import {
  User,
  Bell,
  ChevronDown,
  Shield,
  Newspaper,
  LogOut,
  Menu,
  X,
  ExternalLink,
  LogIn,
  UserPlus,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { AuthUser } from '../../types';

interface HeaderProps {
  portalMode: 'admin' | 'user';
  onTogglePortalMode: (mode: 'admin' | 'user') => void;
  onToggleSidebar: () => void;
  isSidebarOpen: boolean;
  currentUser: AuthUser | null;
  onOpenAuth: (mode?: 'login' | 'signup') => void;
  onLogout: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  portalMode,
  onTogglePortalMode,
  onToggleSidebar,
  currentUser,
  onOpenAuth,
  onLogout,
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showNotificationToast, setShowNotificationToast] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

  const handleConfirmLogout = () => {
    setShowLogoutConfirm(false);
    setIsDropdownOpen(false);
    onLogout();
  };

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

          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => onTogglePortalMode('user')}
          >
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
                {portalMode === 'admin'
                  ? 'Centralized Public Relations & Media Monitoring'
                  : 'Official Press Clippings & News Archives'}
              </p>
            </div>
          </div>
        </div>

        {/* Right Side: Quick Portal Switcher & User Profile / Login Buttons */}
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

          {/* Auth State: If Logged In show User Dropdown, If Logged Out show Login & Register */}
          {currentUser ? (
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 p-1.5 hover:bg-slate-100 rounded-lg text-slate-700 transition-colors border border-transparent hover:border-slate-200"
              >
                <div className="w-8 h-8 rounded-full bg-[#0070ba] text-white border border-sky-600 flex items-center justify-center font-bold text-xs shadow-xs">
                  {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="text-xs font-bold text-slate-800 block truncate max-w-[130px]">
                    {currentUser.name}
                  </span>
                  <span className="text-[10px] text-slate-500 block leading-tight">
                    {currentUser.role}
                  </span>
                </div>
                <ChevronDown className="w-4 h-4 text-slate-500" />
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-in fade-in slide-in-from-top-2 duration-150">
                  <div className="px-4 py-2.5 border-b border-slate-100">
                    <p className="text-xs font-bold text-slate-900">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-500 truncate">{currentUser.email}</p>
                    <div className="mt-1 flex items-center gap-1.5">
                      <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold bg-sky-100 text-sky-800">
                        {currentUser.role}
                      </span>
                      {currentUser.division && (
                        <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-medium bg-slate-100 text-slate-600">
                          {currentUser.division}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="py-1">
                    <button
                      onClick={() => {
                        onTogglePortalMode(portalMode === 'admin' ? 'user' : 'admin');
                        setIsDropdownOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-slate-700 hover:bg-sky-50 hover:text-sky-700 flex items-center justify-between font-medium"
                    >
                      <span>Switch to {portalMode === 'admin' ? 'User News Portal' : 'Admin Dashboard'}</span>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
                    </button>
                  </div>

                  <div className="border-t border-slate-100 pt-1">
                    <button
                      onClick={() => {
                        setIsDropdownOpen(false);
                        setShowLogoutConfirm(true);
                      }}
                      className="w-full text-left px-4 py-2 text-xs text-rose-600 hover:bg-rose-50 flex items-center space-x-2 font-semibold transition-colors"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      <span>Log Out (लॉग आउट)</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            /* Logged Out Controls */
            <div className="flex items-center space-x-2">
              <button
                onClick={() => onOpenAuth('login')}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 text-xs font-bold text-[#0070ba] bg-sky-50 hover:bg-sky-100 border border-sky-200 rounded-lg transition-colors"
              >
                <LogIn className="w-3.5 h-3.5" />
                <span>Log In (साइन इन)</span>
              </button>

              <button
                onClick={() => onOpenAuth('signup')}
                className="hidden sm:inline-flex items-center space-x-1.5 px-3.5 py-1.5 text-xs font-bold text-white bg-[#0070ba] hover:bg-[#005c9a] rounded-lg shadow-xs transition-colors"
              >
                <UserPlus className="w-3.5 h-3.5" />
                <span>Sign Up (पंजीकरण)</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Logout Confirmation Dialog */}
      {showLogoutConfirm && (
        <div className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in">
          <div className="bg-white rounded-xl shadow-2xl border border-slate-200 max-w-sm w-full p-5 text-center space-y-4">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto">
              <LogOut className="w-6 h-6" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900">Confirm Log Out</h3>
              <p className="text-xs text-slate-500 mt-1">
                Are you sure you want to end your Northern Railway PR management session?
              </p>
            </div>
            <div className="flex items-center justify-center space-x-3 pt-2">
              <button
                onClick={() => setShowLogoutConfirm(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-lg transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmLogout}
                className="px-4 py-2 bg-rose-600 hover:bg-rose-700 text-white text-xs font-bold rounded-lg shadow-xs transition-colors"
              >
                Yes, Log Out
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Notification Toast Modal if clicked */}
      {showNotificationToast && (
        <div className="absolute right-4 top-14 w-80 bg-white border border-slate-200 rounded-lg shadow-xl p-3 z-50">
          <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
            <span className="text-xs font-bold text-slate-800 flex items-center">
              <Bell className="w-3.5 h-3.5 mr-1 text-sky-600" /> Recent Media Alerts
            </span>
            <button
              onClick={() => setShowNotificationToast(false)}
              className="text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="space-y-2 text-xs">
            <div className="p-2 bg-sky-50 rounded border border-sky-100">
              <p className="font-semibold text-sky-900">New positive coverage published</p>
              <p className="text-slate-600 text-[11px]">
                Amar Ujala Hardoi - Goods shed renovation coverage added.
              </p>
              <span className="text-[10px] text-slate-400">10 mins ago</span>
            </div>
            <div className="p-2 bg-emerald-50 rounded border border-emerald-100">
              <p className="font-semibold text-emerald-900">Ferozpur Division report synced</p>
              <p className="text-slate-600 text-[11px]">
                Ticket checking drive report verified by Content Analyst.
              </p>
              <span className="text-[10px] text-slate-400">1 hour ago</span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

