import React, { useState } from 'react';
import { Plus, Search, Edit, Trash2, Building, Compass, Radio, Map, FileText, X, Check } from 'lucide-react';
import { MasterCity, MasterDepartment, MasterDivision, MasterSource, MasterState } from '../../types';

interface MasterSettingsViewProps {
  activeTab: 'department_list' | 'division_list' | 'source_list' | 'state_list' | 'city_list';
  departments: MasterDepartment[];
  divisions: MasterDivision[];
  sources: MasterSource[];
  states: MasterState[];
  cities: MasterCity[];
  onAddDepartment: (name: string, subDepts: string[]) => void;
  onUpdateDepartment: (dept: MasterDepartment) => void;
  onDeleteDepartment: (id: number) => void;
  onAddDivision: (name: string) => void;
  onDeleteDivision: (id: number) => void;
  onAddSource: (name: string, subSources: string[]) => void;
  onDeleteSource: (id: number) => void;
  onAddState: (name: string) => void;
  onDeleteState: (id: number) => void;
  onAddCity: (name: string, state: string, pinCode: string) => void;
  onDeleteCity: (id: number) => void;
}

export const MasterSettingsView: React.FC<MasterSettingsViewProps> = ({
  activeTab,
  departments,
  divisions,
  sources,
  states,
  cities,
  onAddDepartment,
  onUpdateDepartment,
  onDeleteDepartment,
  onAddDivision,
  onDeleteDivision,
  onAddSource,
  onDeleteSource,
  onAddState,
  onDeleteState,
  onAddCity,
  onDeleteCity,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Form states for modals
  const [itemName, setItemName] = useState('');
  const [subItemsText, setSubItemsText] = useState('');
  const [selectedState, setSelectedState] = useState(states[0]?.name || 'Uttar Pradesh');
  const [pinCode, setPinCode] = useState('');

  const getTitleAndDesc = () => {
    switch (activeTab) {
      case 'department_list':
        return { title: 'Department List', desc: 'Northern Railway functional departments & sub-departments' };
      case 'division_list':
        return { title: 'Division List', desc: 'Operating divisions across Northern Railway zone' };
      case 'source_list':
        return { title: 'Source List', desc: 'Media sources & categorization channels' };
      case 'state_list':
        return { title: 'State List', desc: 'States covered under Northern Railway jurisdiction' };
      case 'city_list':
        return { title: 'City/Village List', desc: 'Cities, railway stations & postal pin code mapping' };
    }
  };

  const handleOpenAdd = () => {
    setItemName('');
    setSubItemsText('');
    setPinCode('');
    if (states.length > 0) setSelectedState(states[0].name);
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!itemName.trim()) return;

    if (activeTab === 'department_list') {
      const subDepts = subItemsText.split(',').map((s) => s.trim()).filter(Boolean);
      onAddDepartment(itemName, subDepts);
    } else if (activeTab === 'division_list') {
      onAddDivision(itemName);
    } else if (activeTab === 'source_list') {
      const subs = subItemsText.split(',').map((s) => s.trim()).filter(Boolean);
      onAddSource(itemName, subs);
    } else if (activeTab === 'state_list') {
      onAddState(itemName);
    } else if (activeTab === 'city_list') {
      onAddCity(itemName, selectedState, pinCode || '000000');
    }

    setIsModalOpen(false);
  };

  const { title, desc } = getTitleAndDesc();

  return (
    <div className="space-y-4">
      {/* Action Header */}
      <div className="flex items-center justify-between">
        <button
          onClick={handleOpenAdd}
          className="inline-flex items-center space-x-2 px-4 py-2.5 bg-[#0070ba] hover:bg-[#005c9a] text-white rounded-md text-xs font-bold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add {title.replace(' List', '')}</span>
        </button>
      </div>

      {/* Main Table Card */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs overflow-hidden">
        <div className="p-4 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <h3 className="text-base font-bold text-slate-900">{title}</h3>
            <p className="text-xs text-slate-500">{desc}</p>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder={`Search ${title.toLowerCase()}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border border-slate-300 rounded-md focus:outline-none focus:ring-1 focus:ring-sky-500"
            />
          </div>
        </div>

        {/* Content Table by active tab */}
        <div className="overflow-x-auto">
          {activeTab === 'department_list' && (
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-16">Sr. No.</th>
                  <th className="py-3 px-4 min-w-[200px]">Department Name</th>
                  <th className="py-3 px-4 min-w-[250px]">Sub-Departments</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4">Updated Date</th>
                  <th className="py-3 px-4 text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {departments
                  .filter((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((dept, index) => (
                    <tr key={dept.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500">{index + 1}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{dept.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {dept.subDepartments?.map((sd) => (
                            <span
                              key={sd}
                              className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium"
                            >
                              {sd}
                            </span>
                          )) || <span className="text-slate-400 italic">None</span>}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{dept.createdDate}</td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{dept.updatedDate}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete department "${dept.name}"?`)) {
                              onDeleteDepartment(dept.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeTab === 'division_list' && (
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-16">Sr. No.</th>
                  <th className="py-3 px-4">Division Name</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4">Updated Date</th>
                  <th className="py-3 px-4 text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {divisions
                  .filter((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((div, index) => (
                    <tr key={div.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500">{index + 1}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{div.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{div.createdDate}</td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{div.updatedDate}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete division "${div.name}"?`)) {
                              onDeleteDivision(div.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeTab === 'source_list' && (
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-16">Sr. No.</th>
                  <th className="py-3 px-4 min-w-[180px]">Source Name</th>
                  <th className="py-3 px-4 min-w-[250px]">Sub Sources</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4">Updated Date</th>
                  <th className="py-3 px-4 text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {sources
                  .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((src, index) => (
                    <tr key={src.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500">{index + 1}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{src.name}</td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {src.subSources?.map((sub) => (
                            <span
                              key={sub}
                              className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[10px] font-medium"
                            >
                              {sub}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{src.createdDate}</td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{src.updatedDate}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete source "${src.name}"?`)) {
                              onDeleteSource(src.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeTab === 'state_list' && (
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-16">Sr. No.</th>
                  <th className="py-3 px-4">State Name</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4">Updated Date</th>
                  <th className="py-3 px-4 text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {states
                  .filter((s) => s.name.toLowerCase().includes(searchQuery.toLowerCase()))
                  .map((st, index) => (
                    <tr key={st.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500">{index + 1}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{st.name}</td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{st.createdDate}</td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{st.updatedDate}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete state "${st.name}"?`)) {
                              onDeleteState(st.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}

          {activeTab === 'city_list' && (
            <table className="w-full text-left text-xs text-slate-700 border-collapse">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold text-[11px] border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4 w-16">Sr. No.</th>
                  <th className="py-3 px-4">City / Village</th>
                  <th className="py-3 px-4">State</th>
                  <th className="py-3 px-4">Pin Code</th>
                  <th className="py-3 px-4">Created Date</th>
                  <th className="py-3 px-4 text-center w-24">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {cities
                  .filter(
                    (c) =>
                      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.state.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      c.pinCode.includes(searchQuery)
                  )
                  .map((ct, index) => (
                    <tr key={ct.id} className="hover:bg-slate-50/70 transition-colors">
                      <td className="py-3 px-4 font-mono text-slate-500">{index + 1}</td>
                      <td className="py-3 px-4 font-bold text-slate-900">{ct.name}</td>
                      <td className="py-3 px-4 text-slate-700">{ct.state}</td>
                      <td className="py-3 px-4 font-mono text-slate-600">{ct.pinCode}</td>
                      <td className="py-3 px-4 font-mono text-slate-500 text-[11px]">{ct.createdDate}</td>
                      <td className="py-3 px-4 text-center">
                        <button
                          onClick={() => {
                            if (window.confirm(`Delete city "${ct.name}"?`)) {
                              onDeleteCity(ct.id);
                            }
                          }}
                          className="p-1.5 text-rose-600 hover:bg-rose-50 rounded"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Dynamic Add Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 flex items-center justify-center p-4 backdrop-blur-xs">
          <div className="bg-white rounded-lg border border-slate-200 shadow-xl max-w-md w-full p-5 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <h4 className="text-sm font-bold text-slate-900">
                Add {title.replace(' List', '')}
              </h4>
              <button onClick={() => setIsModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleFormSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  {title.replace(' List', '')} Name *
                </label>
                <input
                  type="text"
                  required
                  value={itemName}
                  onChange={(e) => setItemName(e.target.value)}
                  placeholder={`e.g. New ${title.replace(' List', '')}`}
                  className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none"
                />
              </div>

              {(activeTab === 'department_list' || activeTab === 'source_list') && (
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">
                    Sub-items (comma separated)
                  </label>
                  <input
                    type="text"
                    value={subItemsText}
                    onChange={(e) => setSubItemsText(e.target.value)}
                    placeholder="e.g. Unit 1, Unit 2, Operations"
                    className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none"
                  />
                </div>
              )}

              {activeTab === 'city_list' && (
                <>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Select State *</label>
                    <select
                      value={selectedState}
                      onChange={(e) => setSelectedState(e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none bg-white"
                    >
                      {states.map((st) => (
                        <option key={st.id} value={st.name}>
                          {st.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Pin Code</label>
                    <input
                      type="text"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      placeholder="e.g. 201001"
                      className="w-full px-3 py-2 border border-slate-300 rounded-md focus:ring-1 focus:ring-sky-500 focus:outline-none"
                    />
                  </div>
                </>
              )}

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
                  Save Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
