import React, { useState } from 'react';
import {
  LayoutDashboard,
  Users,
  UserCheck,
  ShieldCheck,
  Newspaper,
  Sliders,
  BarChart3,
  ChevronDown,
  ChevronRight,
  PlusCircle,
  Building,
  Map,
  Compass,
  Radio,
  FileText,
  X
} from 'lucide-react';
import { AdminViewType, UserViewType } from '../../types';

interface SidebarProps {
  portalMode: 'admin' | 'user';
  adminView: AdminViewType;
  userView: UserViewType;
  onSelectAdminView: (view: AdminViewType) => void;
  onSelectUserView: (view: UserViewType) => void;
  isOpen: boolean;
  onClose: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  portalMode,
  adminView,
  userView,
  onSelectAdminView,
  onSelectUserView,
  isOpen,
  onClose,
}) => {
  const [isMasterOpen, setIsMasterOpen] = useState(
    adminView.startsWith('department') ||
    adminView.startsWith('division') ||
    adminView.startsWith('source') ||
    adminView.startsWith('state') ||
    adminView.startsWith('city')
  );

  const [isAdminMgmtOpen, setIsAdminMgmtOpen] = useState(adminView === 'admin_list');
  const [isUserMgmtOpen, setIsUserMgmtOpen] = useState(adminView === 'app_user_list');
  const [isNewsPostOpen, setIsNewsPostOpen] = useState(adminView === 'news_post_list' || adminView === 'add_news_post');

  const handleAdminNav = (view: AdminViewType) => {
    onSelectAdminView(view);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  const handleUserNav = (view: UserViewType) => {
    onSelectUserView(view);
    if (window.innerWidth < 1024) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile Backdrop */}
      {isOpen && (
        <div
          onClick={onClose}
          className="fixed inset-0 bg-slate-900/50 z-40 lg:hidden backdrop-blur-xs transition-opacity"
        />
      )}

      {/* Main Sidebar Container - Northern Railway Vibrant Blue Theme */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#0070ba] text-white flex flex-col justify-between transition-transform duration-300 ease-in-out lg:static lg:translate-x-0 ${
          isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full overflow-y-auto custom-scrollbar">
          {/* Top Logo and Close Button on Mobile */}
          <div className="p-4 flex items-center justify-between border-b border-white/15">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-[#c02828] border-2 border-amber-300 flex items-center justify-center shrink-0 shadow-xs">
                <span className="text-[9px] font-extrabold text-white uppercase tracking-tighter">NR</span>
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-wide uppercase leading-tight">
                  NORTHERN RAILWAY
                </h2>
                <p className="text-[10px] text-sky-100/80 font-medium">
                  {portalMode === 'admin' ? 'Admin Management' : 'Media Information'}
                </p>
              </div>
            </div>
            <button onClick={onClose} className="p-1 rounded text-white/80 hover:text-white hover:bg-white/10 lg:hidden">
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Menus based on Portal Mode */}
          <div className="py-4 px-3 space-y-1">
            {portalMode === 'admin' ? (
              <>
                {/* 1. Dashboard */}
                <button
                  onClick={() => handleAdminNav('dashboard')}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    adminView === 'dashboard'
                      ? 'bg-white/20 text-white shadow-xs border-l-4 border-amber-400'
                      : 'text-sky-50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-sky-200" />
                  <span>Dashboard</span>
                </button>

                {/* 2. Admin Management Dropdown */}
                <div>
                  <button
                    onClick={() => setIsAdminMgmtOpen(!isAdminMgmtOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      adminView === 'admin_list'
                        ? 'bg-white/15 text-white'
                        : 'text-sky-50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Users className="w-4 h-4 text-sky-200" />
                      <span>Admin Management</span>
                    </div>
                    {isAdminMgmtOpen ? <ChevronDown className="w-3.5 h-3.5 text-sky-200" /> : <ChevronRight className="w-3.5 h-3.5 text-sky-200" />}
                  </button>

                  {isAdminMgmtOpen && (
                    <div className="ml-7 mt-1 space-y-1 border-l border-white/20 pl-2">
                      <button
                        onClick={() => handleAdminNav('admin_list')}
                        className={`w-full text-left px-3 py-1.5 rounded text-[11px] font-medium transition-all ${
                          adminView === 'admin_list' ? 'bg-white/25 text-white font-bold' : 'text-sky-100 hover:bg-white/10'
                        }`}
                      >
                        Admin List
                      </button>
                    </div>
                  )}
                </div>

                {/* 3. User Management Dropdown */}
                <div>
                  <button
                    onClick={() => setIsUserMgmtOpen(!isUserMgmtOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      adminView === 'app_user_list'
                        ? 'bg-white/15 text-white'
                        : 'text-sky-50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <UserCheck className="w-4 h-4 text-sky-200" />
                      <span>User Management</span>
                    </div>
                    {isUserMgmtOpen ? <ChevronDown className="w-3.5 h-3.5 text-sky-200" /> : <ChevronRight className="w-3.5 h-3.5 text-sky-200" />}
                  </button>

                  {isUserMgmtOpen && (
                    <div className="ml-7 mt-1 space-y-1 border-l border-white/20 pl-2">
                      <button
                        onClick={() => handleAdminNav('app_user_list')}
                        className={`w-full text-left px-3 py-1.5 rounded text-[11px] font-medium transition-all ${
                          adminView === 'app_user_list' ? 'bg-white/25 text-white font-bold' : 'text-sky-100 hover:bg-white/10'
                        }`}
                      >
                        App User
                      </button>
                    </div>
                  )}
                </div>

                {/* 4. Role Management */}
                <button
                  onClick={() => handleAdminNav('role_list')}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    adminView === 'role_list'
                      ? 'bg-white/20 text-white shadow-xs border-l-4 border-amber-400'
                      : 'text-sky-50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <ShieldCheck className="w-4 h-4 text-sky-200" />
                  <span>Role Management</span>
                </button>

                {/* 5. News Post Dropdown */}
                <div>
                  <button
                    onClick={() => setIsNewsPostOpen(!isNewsPostOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      adminView === 'news_post_list' || adminView === 'add_news_post'
                        ? 'bg-white/15 text-white'
                        : 'text-sky-50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Newspaper className="w-4 h-4 text-sky-200" />
                      <span>News Post</span>
                    </div>
                    {isNewsPostOpen ? <ChevronDown className="w-3.5 h-3.5 text-sky-200" /> : <ChevronRight className="w-3.5 h-3.5 text-sky-200" />}
                  </button>

                  {isNewsPostOpen && (
                    <div className="ml-7 mt-1 space-y-1 border-l border-white/20 pl-2">
                      <button
                        onClick={() => handleAdminNav('news_post_list')}
                        className={`w-full text-left px-3 py-1.5 rounded text-[11px] font-medium transition-all ${
                          adminView === 'news_post_list' ? 'bg-white/25 text-white font-bold' : 'text-sky-100 hover:bg-white/10'
                        }`}
                      >
                        News Post List
                      </button>
                      <button
                        onClick={() => handleAdminNav('add_news_post')}
                        className={`w-full text-left px-3 py-1.5 rounded text-[11px] font-medium transition-all flex items-center space-x-1.5 ${
                          adminView === 'add_news_post' ? 'bg-white/25 text-white font-bold' : 'text-sky-100 hover:bg-white/10'
                        }`}
                      >
                        <PlusCircle className="w-3 h-3 text-amber-300" />
                        <span>Add News Post</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 6. Master Setting with sub-items */}
                <div>
                  <button
                    onClick={() => setIsMasterOpen(!isMasterOpen)}
                    className={`w-full flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                      adminView.startsWith('department') ||
                      adminView.startsWith('division') ||
                      adminView.startsWith('source') ||
                      adminView.startsWith('state') ||
                      adminView.startsWith('city')
                        ? 'bg-white/15 text-white'
                        : 'text-sky-50 hover:bg-white/10 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <Sliders className="w-4 h-4 text-sky-200" />
                      <span>Master Setting</span>
                    </div>
                    {isMasterOpen ? <ChevronDown className="w-3.5 h-3.5 text-sky-200" /> : <ChevronRight className="w-3.5 h-3.5 text-sky-200" />}
                  </button>

                  {isMasterOpen && (
                    <div className="ml-7 mt-1 space-y-1 border-l border-white/20 pl-2">
                      <button
                        onClick={() => handleAdminNav('department_list')}
                        className={`w-full text-left px-3 py-1.5 rounded text-[11px] font-medium transition-all flex items-center space-x-2 ${
                          adminView === 'department_list' ? 'bg-white/25 text-white font-bold' : 'text-sky-100 hover:bg-white/10'
                        }`}
                      >
                        <Building className="w-3 h-3 text-sky-300" />
                        <span>Department</span>
                      </button>
                      <button
                        onClick={() => handleAdminNav('division_list')}
                        className={`w-full text-left px-3 py-1.5 rounded text-[11px] font-medium transition-all flex items-center space-x-2 ${
                          adminView === 'division_list' ? 'bg-white/25 text-white font-bold' : 'text-sky-100 hover:bg-white/10'
                        }`}
                      >
                        <Compass className="w-3 h-3 text-sky-300" />
                        <span>Division</span>
                      </button>
                      <button
                        onClick={() => handleAdminNav('source_list')}
                        className={`w-full text-left px-3 py-1.5 rounded text-[11px] font-medium transition-all flex items-center space-x-2 ${
                          adminView === 'source_list' ? 'bg-white/25 text-white font-bold' : 'text-sky-100 hover:bg-white/10'
                        }`}
                      >
                        <Radio className="w-3 h-3 text-sky-300" />
                        <span>Source</span>
                      </button>
                      <button
                        onClick={() => handleAdminNav('state_list')}
                        className={`w-full text-left px-3 py-1.5 rounded text-[11px] font-medium transition-all flex items-center space-x-2 ${
                          adminView === 'state_list' ? 'bg-white/25 text-white font-bold' : 'text-sky-100 hover:bg-white/10'
                        }`}
                      >
                        <Map className="w-3 h-3 text-sky-300" />
                        <span>State</span>
                      </button>
                      <button
                        onClick={() => handleAdminNav('city_list')}
                        className={`w-full text-left px-3 py-1.5 rounded text-[11px] font-medium transition-all flex items-center space-x-2 ${
                          adminView === 'city_list' ? 'bg-white/25 text-white font-bold' : 'text-sky-100 hover:bg-white/10'
                        }`}
                      >
                        <FileText className="w-3 h-3 text-sky-300" />
                        <span>City/Village</span>
                      </button>
                    </div>
                  )}
                </div>

                {/* 7. Report Management */}
                <button
                  onClick={() => handleAdminNav('report')}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    adminView === 'report'
                      ? 'bg-white/20 text-white shadow-xs border-l-4 border-amber-400'
                      : 'text-sky-50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 text-sky-200" />
                  <span>Report</span>
                </button>
              </>
            ) : (
              /* User Portal Sidebar */
              <>
                <button
                  onClick={() => handleUserNav('home')}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    userView === 'home'
                      ? 'bg-white/20 text-white shadow-xs border-l-4 border-amber-400'
                      : 'text-sky-50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <LayoutDashboard className="w-4 h-4 text-sky-200" />
                  <span>Dashboard</span>
                </button>

                <button
                  onClick={() => handleUserNav('all_news')}
                  className={`w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide transition-all ${
                    userView === 'all_news' || userView === 'news_detail'
                      ? 'bg-white/20 text-white shadow-xs border-l-4 border-amber-400'
                      : 'text-sky-50 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Newspaper className="w-4 h-4 text-sky-200" />
                  <span>News</span>
                </button>

                <button
                  onClick={() => {
                    handleAdminNav('report');
                  }}
                  className="w-full flex items-center space-x-3 px-3.5 py-2.5 rounded-lg text-xs font-semibold tracking-wide text-sky-50 hover:bg-white/10 hover:text-white transition-all"
                >
                  <BarChart3 className="w-4 h-4 text-sky-200" />
                  <span>Report</span>
                </button>
              </>
            )}
          </div>
        </div>

        {/* Sidebar Footer info */}
        <div className="p-3 border-t border-white/15 bg-black/10 text-[10px] text-sky-100 text-center">
          <p className="font-semibold tracking-wider">NORTHERN RAILWAY</p>
          <p className="text-white/60 text-[9px] mt-0.5">Govt. of India &bull; PR Cell</p>
        </div>
      </aside>
    </>
  );
};
