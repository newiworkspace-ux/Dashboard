import React, { useState } from 'react';
import { Header } from './components/common/Header';
import { Sidebar } from './components/common/Sidebar';
import { Footer } from './components/common/Footer';
import { AdminDashboardOverview } from './components/admin/AdminDashboardOverview';
import { AdminManagement } from './components/admin/AdminManagement';
import { UserManagement } from './components/admin/UserManagement';
import { RoleManagement } from './components/admin/RoleManagement';
import { NewsPostList } from './components/admin/NewsPostList';
import { NewsPostForm } from './components/admin/NewsPostForm';
import { MasterSettingsView } from './components/admin/MasterSettingsView';
import { ReportAnalyticsView } from './components/admin/ReportAnalyticsView';
import { UserNewsPortalView } from './components/UserNewsPortalView';
import {
  AdminUser,
  AppUser,
  AdminViewType,
  UserViewType,
  NewsItem,
  RoleItem,
  MasterDepartment,
  MasterDivision,
  MasterSource,
  MasterState,
  MasterCity,
} from './types';
import {
  INITIAL_ADMIN_USERS,
  INITIAL_APP_USERS,
  INITIAL_ROLES,
  INITIAL_DEPARTMENTS,
  INITIAL_DIVISIONS,
  INITIAL_SOURCES,
  INITIAL_STATES,
  INITIAL_CITIES,
  INITIAL_NEWS_ITEMS,
} from './mockData';

export default function App() {
  // Portal Mode: Admin Management Portal or User News Portal
  const [portalMode, setPortalMode] = useState<'admin' | 'user'>('admin');
  const [adminView, setAdminView] = useState<AdminViewType>('dashboard');
  const [userView, setUserView] = useState<UserViewType>('home');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Core Data States
  const [newsItems, setNewsItems] = useState<NewsItem[]>(INITIAL_NEWS_ITEMS);
  const [admins, setAdmins] = useState<AdminUser[]>(INITIAL_ADMIN_USERS);
  const [appUsers, setAppUsers] = useState<AppUser[]>(INITIAL_APP_USERS);
  const [roles, setRoles] = useState<RoleItem[]>(INITIAL_ROLES);
  const [departments, setDepartments] = useState<MasterDepartment[]>(INITIAL_DEPARTMENTS);
  const [divisions, setDivisions] = useState<MasterDivision[]>(INITIAL_DIVISIONS);
  const [sources, setSources] = useState<MasterSource[]>(INITIAL_SOURCES);
  const [states, setStates] = useState<MasterState[]>(INITIAL_STATES);
  const [cities, setCities] = useState<MasterCity[]>(INITIAL_CITIES);

  // Currently editing news item (for Edit form)
  const [editingNewsItem, setEditingNewsItem] = useState<NewsItem | null>(null);

  // Handlers for News CRUD
  const handleAddNews = (newsData: Partial<NewsItem>) => {
    const newItem: NewsItem = {
      id: `news-${Date.now()}`,
      srNo: newsItems.length + 1,
      title: newsData.title || 'Untitled News',
      source: newsData.source || 'Print Media',
      subSource: newsData.subSource || 'News Paper',
      zone: newsData.zone || 'Northern Zone',
      division: newsData.division || 'Moradabad',
      department: newsData.department || 'Commercial',
      subDepartment: newsData.subDepartment || 'Passenger Amenities',
      state: newsData.state || 'Uttar Pradesh',
      city: newsData.city || 'Hardoi',
      date: newsData.date || '26-06-2025',
      time: newsData.time || '12:00 pm',
      originUrl: newsData.originUrl,
      mediaType: newsData.mediaType || 'Print Media',
      sentiment: newsData.sentiment || 'Positive',
      roleName: 'Content Analyst',
      status: newsData.status || 'Published',
      accidentalNotification: newsData.accidentalNotification || false,
      description: newsData.description || '',
      views: 1,
      likes: 0,
    };
    setNewsItems([newItem, ...newsItems]);
    setAdminView('news_post_list');
  };

  const handleUpdateNews = (newsData: Partial<NewsItem>) => {
    if (!editingNewsItem) return;
    setNewsItems(
      newsItems.map((item) =>
        item.id === editingNewsItem.id ? ({ ...item, ...newsData } as NewsItem) : item
      )
    );
    setEditingNewsItem(null);
    setAdminView('news_post_list');
  };

  const handleDeleteNews = (id: string) => {
    setNewsItems(newsItems.filter((item) => item.id !== id));
  };

  // Handlers for Admin User Management
  const handleAddAdmin = (adminData: Omit<AdminUser, 'id' | 'srNo'>) => {
    const newAdmin: AdminUser = {
      id: `admin-${Date.now()}`,
      srNo: admins.length + 1,
      ...adminData,
    };
    setAdmins([newAdmin, ...admins]);
  };

  const handleUpdateAdmin = (updatedAdmin: AdminUser) => {
    setAdmins(admins.map((a) => (a.id === updatedAdmin.id ? updatedAdmin : a)));
  };

  const handleDeleteAdmin = (id: string) => {
    setAdmins(admins.filter((a) => a.id !== id));
  };

  const handleToggleAdminStatus = (id: string) => {
    setAdmins(
      admins.map((a) =>
        a.id === id ? { ...a, status: a.status === 'Active' ? 'Blocked' : 'Active' } : a
      )
    );
  };

  // Handlers for App User Management
  const handleAddAppUser = (userData: Omit<AppUser, 'id' | 'srNo'>) => {
    const newUser: AppUser = {
      id: `user-${Date.now()}`,
      srNo: appUsers.length + 1,
      ...userData,
    };
    setAppUsers([newUser, ...appUsers]);
  };

  const handleUpdateAppUser = (updatedUser: AppUser) => {
    setAppUsers(appUsers.map((u) => (u.id === updatedUser.id ? updatedUser : u)));
  };

  const handleDeleteAppUser = (id: string) => {
    setAppUsers(appUsers.filter((u) => u.id !== id));
  };

  const handleToggleAppUserStatus = (id: string) => {
    setAppUsers(
      appUsers.map((u) =>
        u.id === id ? { ...u, status: u.status === 'Active' ? 'Blocked' : 'Active' } : u
      )
    );
  };

  // Handlers for Roles
  const handleAddRole = (roleData: Omit<RoleItem, 'id' | 'srNo'>) => {
    const newRole: RoleItem = {
      id: `role-${Date.now()}`,
      srNo: roles.length + 1,
      ...roleData,
    };
    setRoles([...roles, newRole]);
  };

  const handleUpdateRole = (updatedRole: RoleItem) => {
    setRoles(roles.map((r) => (r.id === updatedRole.id ? updatedRole : r)));
  };

  const handleDeleteRole = (id: string) => {
    setRoles(roles.filter((r) => r.id !== id));
  };

  // Handlers for Master Settings
  const handleAddDepartment = (name: string, subDepts: string[]) => {
    const newDept: MasterDepartment = {
      id: departments.length + 1,
      name,
      subDepartments: subDepts,
      createdDate: new Date().toLocaleDateString(),
      updatedDate: new Date().toLocaleDateString(),
    };
    setDepartments([...departments, newDept]);
  };

  const handleDeleteDepartment = (id: number) => {
    setDepartments(departments.filter((d) => d.id !== id));
  };

  const handleAddDivision = (name: string) => {
    const newDiv: MasterDivision = {
      id: divisions.length + 1,
      name,
      createdDate: new Date().toLocaleDateString(),
      updatedDate: new Date().toLocaleDateString(),
    };
    setDivisions([...divisions, newDiv]);
  };

  const handleDeleteDivision = (id: number) => {
    setDivisions(divisions.filter((d) => d.id !== id));
  };

  const handleAddSource = (name: string, subSources: string[]) => {
    const newSrc: MasterSource = {
      id: sources.length + 1,
      name,
      subSources,
      createdDate: new Date().toLocaleDateString(),
      updatedDate: new Date().toLocaleDateString(),
    };
    setSources([...sources, newSrc]);
  };

  const handleDeleteSource = (id: number) => {
    setSources(sources.filter((s) => s.id !== id));
  };

  const handleAddState = (name: string) => {
    const newSt: MasterState = {
      id: states.length + 1,
      name,
      createdDate: new Date().toLocaleDateString(),
      updatedDate: new Date().toLocaleDateString(),
    };
    setStates([...states, newSt]);
  };

  const handleDeleteState = (id: number) => {
    setStates(states.filter((s) => s.id !== id));
  };

  const handleAddCity = (name: string, state: string, pinCode: string) => {
    const newCt: MasterCity = {
      id: cities.length + 1,
      name,
      state,
      pinCode,
      createdDate: new Date().toLocaleDateString(),
      updatedDate: new Date().toLocaleDateString(),
    };
    setCities([...cities, newCt]);
  };

  const handleDeleteCity = (id: number) => {
    setCities(cities.filter((c) => c.id !== id));
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#f8fafc] text-slate-800">
      {/* Top Main Navigation Header */}
      <Header
        portalMode={portalMode}
        onTogglePortalMode={(mode) => setPortalMode(mode)}
        onToggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        isSidebarOpen={isSidebarOpen}
      />

      {/* Body Area with Sidebar + Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Responsive Sidebar */}
        <Sidebar
          portalMode={portalMode}
          adminView={adminView}
          userView={userView}
          onSelectAdminView={(view) => {
            setAdminView(view);
            if (view === 'add_news_post') {
              setEditingNewsItem(null);
            }
          }}
          onSelectUserView={(view) => setUserView(view)}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto p-3 sm:p-5 md:p-6 lg:p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {portalMode === 'admin' ? (
              <>
                {/* 1. Dashboard Overview */}
                {adminView === 'dashboard' && (
                  <AdminDashboardOverview
                    onNavigate={(v) => {
                      setAdminView(v);
                      if (v === 'add_news_post') setEditingNewsItem(null);
                    }}
                    newsItems={newsItems}
                    totalAdminsCount={admins.length}
                    totalAppUsersCount={appUsers.length}
                  />
                )}

                {/* 2. Admin Management */}
                {adminView === 'admin_list' && (
                  <AdminManagement
                    admins={admins}
                    roles={roles}
                    onAddAdmin={handleAddAdmin}
                    onUpdateAdmin={handleUpdateAdmin}
                    onDeleteAdmin={handleDeleteAdmin}
                    onToggleStatus={handleToggleAdminStatus}
                  />
                )}

                {/* 3. App User Management */}
                {adminView === 'app_user_list' && (
                  <UserManagement
                    appUsers={appUsers}
                    onAddUser={handleAddAppUser}
                    onUpdateUser={handleUpdateAppUser}
                    onDeleteUser={handleDeleteAppUser}
                    onToggleStatus={handleToggleAppUserStatus}
                  />
                )}

                {/* 4. Role Management */}
                {adminView === 'role_list' && (
                  <RoleManagement
                    roles={roles}
                    onAddRole={handleAddRole}
                    onUpdateRole={handleUpdateRole}
                    onDeleteRole={handleDeleteRole}
                  />
                )}

                {/* 5. News Post List */}
                {adminView === 'news_post_list' && (
                  <NewsPostList
                    newsItems={newsItems}
                    onAddNew={() => {
                      setEditingNewsItem(null);
                      setAdminView('add_news_post');
                    }}
                    onEditNews={(item) => {
                      setEditingNewsItem(item);
                      setAdminView('edit_news_post');
                    }}
                    onDeleteNews={handleDeleteNews}
                    onViewDetail={() => {
                      setPortalMode('user');
                    }}
                  />
                )}

                {/* 6. Add News Post Form */}
                {adminView === 'add_news_post' && (
                  <NewsPostForm
                    initialData={null}
                    onSubmit={handleAddNews}
                    onCancel={() => setAdminView('news_post_list')}
                    departments={departments}
                    divisions={divisions}
                    states={states}
                    cities={cities}
                  />
                )}

                {/* 7. Edit News Post Form */}
                {adminView === 'edit_news_post' && (
                  <NewsPostForm
                    initialData={editingNewsItem}
                    onSubmit={handleUpdateNews}
                    onCancel={() => {
                      setEditingNewsItem(null);
                      setAdminView('news_post_list');
                    }}
                    departments={departments}
                    divisions={divisions}
                    states={states}
                    cities={cities}
                  />
                )}

                {/* 8. Master Settings (Department, Division, Source, State, City) */}
                {(adminView === 'department_list' ||
                  adminView === 'division_list' ||
                  adminView === 'source_list' ||
                  adminView === 'state_list' ||
                  adminView === 'city_list') && (
                  <MasterSettingsView
                    activeTab={adminView}
                    departments={departments}
                    divisions={divisions}
                    sources={sources}
                    states={states}
                    cities={cities}
                    onAddDepartment={handleAddDepartment}
                    onUpdateDepartment={(d) =>
                      setDepartments(departments.map((x) => (x.id === d.id ? d : x)))
                    }
                    onDeleteDepartment={handleDeleteDepartment}
                    onAddDivision={handleAddDivision}
                    onDeleteDivision={handleDeleteDivision}
                    onAddSource={handleAddSource}
                    onDeleteSource={handleDeleteSource}
                    onAddState={handleAddState}
                    onDeleteState={handleDeleteState}
                    onAddCity={handleAddCity}
                    onDeleteCity={handleDeleteCity}
                  />
                )}

                {/* 9. Report / Analytics */}
                {adminView === 'report' && (
                  <ReportAnalyticsView newsItems={newsItems} divisions={divisions} />
                )}
              </>
            ) : (
              /* User News Portal View */
              <UserNewsPortalView
                newsItems={newsItems}
                divisions={divisions}
                departments={departments}
              />
            )}
          </div>
        </main>
      </div>

      {/* Global Footer */}
      <Footer onAdminClick={() => setPortalMode('admin')} />
    </div>
  );
}
