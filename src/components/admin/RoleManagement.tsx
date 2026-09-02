import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, ShieldCheck, Check, X, ShieldAlert } from 'lucide-react';
import { RoleItem } from '../../types';

interface RoleManagementProps {
  roles: RoleItem[];
  onAddRole: (role: Omit<RoleItem, 'id' | 'srNo'>) => void;
  onUpdateRole: (role: RoleItem) => void;
  onDeleteRole: (id: string) => void;
}

const ALL_AVAILABLE_PERMISSIONS = [
  'Admin Management',
  'User Management',
  'News Post',
  'Role Management',
  'Report Management',
  'Division Management',
  'State Management',
  'City/Village Management',
  'Category Management',
  'Source Management',
  'Department Management',
];

export const RoleManagement: React.FC<RoleManagementProps> = ({
  roles,
  onAddRole,
  onUpdateRole,
  onDeleteRole,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRole, setEditingRole] = useState<RoleItem | null>(null);

  const [roleName, setRoleName] = useState('');
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

  const filteredRoles = roles.filter((r) =>
    r.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const openAddModal = () => {
    setEditingRole(null);
    setRoleName('');
    setSelectedPermissions(['News Post', 'Report Management']);
    setIsModalOpen(true);
  };

  const openEditModal = (role: RoleItem) => {
    setEditingRole(role);
    setRoleName(role.name);
    setSelectedPermissions([...role.permissions]);
    setIsModalOpen(true);
  };

  const togglePermission = (perm: string) => {
    if (selectedPermissions.includes(perm)) {
      setSelectedPermissions(selectedPermissions.filter((p) => p !== perm));
    } else {
      setSelectedPermissions([...selectedPermissions, perm]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roleName.trim()) {
      alert('Role Name is required.');
      return;
    }

    if (editingRole) {
      onUpdateRole({
        ...editingRole,
        name: roleName,
        permissions: selectedPermissions,
      });
    } else {
      onAddRole({
        name: roleName,
        permissions: selectedPermissions,
      });
    }

    setIsModalOpen(false);
  };

  return (
    <div className="space-y-4">
      {/* Top Add Action */}
      <div className="flex items-center justify-between">
        <button
          onClick={openAddModal}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#0070ba] hover:bg-[#005c9a] text-white rounded-md text-xs font-bold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Role</span>
        </button>
      </div>

      {/* Main Role List Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">Role Management</h3>
            <p className="text-xs text-slate-500">
              Configure Role-Based Access Control (RBAC) permissions for PR and media staff
            </p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search roles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-700 border-collapse">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
              <tr>
                <th className="py-3 px-4 w-16">Sr. No.</th>
                <th className="py-3 px-4 min-w-[180px]">Role Name</th>
                <th className="py-3 px-4 min-w-[340px]">Assigned Permissions</th>
                <th className="py-3 px-4 text-center w-28">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredRoles.map((role) => (
                <tr key={role.id} className="hover:bg-slate-50/70 transition-colors">
                  <td className="py-3 px-4 font-mono text-slate-500">{role.srNo}</td>
                  <td className="py-3 px-4">
                    <span className="font-bold text-slate-900 text-sm">{role.name}</span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((perm) => (
                        <span
                          key={perm}
                          className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-sky-50 text-sky-800 border border-sky-200"
                        >
                          {perm}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-center">
                    <div className="flex items-center justify-center space-x-2">
                      <button
                        onClick={() => openEditModal(role)}
                        className="p-1.5 text-amber-600 hover:bg-amber-50 rounded"
                        title="Edit Role"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete role "${role.name}"?`)) {
                            onDeleteRole(role.id);
                          }
                        }}
                        className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                        title="Delete Role"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Role Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-lg w-full p-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h4 className="text-sm font-bold text-slate-900 flex items-center">
                <ShieldCheck className="w-4 h-4 mr-1.5 text-sky-600" />
                {editingRole ? 'Edit Role Permissions' : 'Add New Role'}
              </h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Role Name *</label>
                <input
                  type="text"
                  required
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                  placeholder="e.g. Senior Public Relations Officer"
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-2">
                  Select Permissions ({selectedPermissions.length} selected)
                </label>
                <div className="grid grid-cols-2 gap-2 max-h-56 overflow-y-auto p-2 border border-slate-200 rounded-md bg-slate-50/50">
                  {ALL_AVAILABLE_PERMISSIONS.map((perm) => {
                    const isChecked = selectedPermissions.includes(perm);
                    return (
                      <label
                        key={perm}
                        className={`flex items-center space-x-2 p-1.5 rounded cursor-pointer transition-colors ${
                          isChecked ? 'bg-sky-100 text-sky-900 font-semibold' : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={() => togglePermission(perm)}
                          className="rounded text-sky-600 focus:ring-sky-500"
                        />
                        <span className="text-[11px] truncate">{perm}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              <div className="pt-3 flex items-center justify-end space-x-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#0070ba] hover:bg-[#005c9a] text-white font-bold rounded-md"
                >
                  {editingRole ? 'Update Role' : 'Save Role'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
