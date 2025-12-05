import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Search, ChevronDown } from 'lucide-react';

interface User {
  id: number;
  name: string;
  email: string;
  role: 'Admin' | 'User';
  registeredDate: string;
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', registeredDate: '2024-01-15' },
    { id: 2, name: 'Sarah Johnson', email: 'sarah@example.com', role: 'User', registeredDate: '2024-02-20' },
    { id: 3, name: 'Michael Chen', email: 'michael@example.com', role: 'User', registeredDate: '2024-03-10' },
    { id: 4, name: 'Emily Rodriguez', email: 'emily@example.com', role: 'User', registeredDate: '2024-03-25' },
    { id: 5, name: 'David Park', email: 'david@example.com', role: 'User', registeredDate: '2024-04-05' }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const handleRoleChange = (userId: number, newRole: 'Admin' | 'User') => {
    setUsers(users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    ));
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout activePage="users">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-[#efe9d6] mb-2">User Management</h2>
          <p className="text-[#efe9d6]/60">Manage registered users and their roles</p>
        </div>

        {/* Search & Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {/* Search */}
          <div className="md:col-span-2">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c9a227]" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#232323]/60 border border-[#c9a227]/20 rounded-xl pl-12 pr-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Total Users</div>
            <div className="text-[#c9a227] text-2xl">{users.length}</div>
          </div>

          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Admins</div>
            <div className="text-[#c9a227] text-2xl">
              {users.filter(u => u.role === 'Admin').length}
            </div>
          </div>
        </div>

        {/* Users Table */}
        <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#c9a227]/10">
                  <th className="text-left px-6 py-4 text-[#efe9d6] text-sm">User Name</th>
                  <th className="text-left px-6 py-4 text-[#efe9d6] text-sm">Email</th>
                  <th className="text-left px-6 py-4 text-[#efe9d6] text-sm">Registered</th>
                  <th className="text-left px-6 py-4 text-[#efe9d6] text-sm">Current Role</th>
                  <th className="text-left px-6 py-4 text-[#efe9d6] text-sm">Change Role</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map((user) => (
                  <tr
                    key={user.id}
                    className="border-b border-[#c9a227]/5 hover:bg-[#c9a227]/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-[#efe9d6]">{user.name}</td>
                    <td className="px-6 py-4 text-[#efe9d6]/70">{user.email}</td>
                    <td className="px-6 py-4 text-[#efe9d6]/70">
                      {new Date(user.registeredDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex px-3 py-1 rounded-full text-xs ${user.role === 'Admin'
                          ? 'bg-[#c9a227]/20 text-[#c9a227] border border-[#c9a227]/30'
                          : 'bg-[#efe9d6]/10 text-[#efe9d6]/70 border border-[#efe9d6]/20'
                          }`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative">
                        <select
                          value={user.role}
                          onChange={(e) => handleRoleChange(user.id, e.target.value as 'Admin' | 'User')}
                          className="appearance-none bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-lg px-4 py-2 pr-10 text-[#efe9d6] text-sm focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 cursor-pointer"
                        >
                          <option value="User">User</option>
                          <option value="Admin">Admin</option>
                        </select>
                        <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#efe9d6]/60 pointer-events-none" />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUsers.length === 0 && (
            <div className="text-center py-12 text-[#efe9d6]/60">
              No users found matching your search.
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}
