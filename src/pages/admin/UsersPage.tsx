import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Search, ChevronDown, Plus, X, Mail, Users, Lock, Shield } from 'lucide-react';
import { GradientButton } from '../../components/GradientButton';

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: 'Admin' | 'User';
  registeredDate: string;
}

export function UsersPage() {
  // Initialize with default admin user
  const [users, setUsers] = useState<User[]>(() => {
    const storedUsers = localStorage.getItem('users');
    if (storedUsers) {
      return JSON.parse(storedUsers);
    }

    // Default admin user
    const defaultUsers = [
      { id: 1, name: 'Admin User', email: 'admin@raynova.com', password: 'admin123', role: 'Admin' as const, registeredDate: new Date().toISOString() }
    ];
    localStorage.setItem('users', JSON.stringify(defaultUsers));
    return defaultUsers;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User' as 'Admin' | 'User'
  });

  const handleRoleChange = (userId: number, newRole: 'Admin' | 'User') => {
    const updatedUsers = users.map(user =>
      user.id === userId ? { ...user, role: newRole } : user
    );
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));
  };

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();

    // Check if email already exists
    if (users.some(u => u.email === newUser.email)) {
      alert('A user with this email already exists!');
      return;
    }

    const userToAdd: User = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      name: newUser.name,
      email: newUser.email,
      password: newUser.password,
      role: newUser.role,
      registeredDate: new Date().toISOString()
    };

    const updatedUsers = [...users, userToAdd];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    // Reset form
    setNewUser({ name: '', email: '', password: '', role: 'User' });
    setIsAddUserModalOpen(false);
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout activePage="users">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-[#efe9d6] mb-2">User Management</h2>
          <p className="text-[#efe9d6]/60">Manage registered users and their roles</p>
        </div>

        {/* Search & Stats */}
        <div className="mb-8">
          {/* Search */}
          <div className='flex items-center gap-8'>
            <div className="relative flex flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c9a227]" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#232323]/60 border border-[#c9a227]/20 rounded-xl pl-12 pr-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
              />
            </div>
            {/* Add User Button */}
            <div className="flex">
              <GradientButton
                onClick={() => setIsAddUserModalOpen(true)}
                className="w-full md:w-auto"
              >
                <div className='flex gap-2 items-center'>
                  <Plus className="w-5 h-5 mr-2" />
                  Add User
                </div>
              </GradientButton>
            </div>
          </div>

          {/* Stats */}
          {/* <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Total Users</div>
            <div className="text-[#c9a227] text-2xl">{users.length}</div>
          </div>

          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Admins</div>
            <div className="text-[#c9a227] text-2xl">
              {users.filter(u => u.role === 'Admin').length}
            </div>
          </div> */}
        </div>



        {/* Add User Modal */}
        {isAddUserModalOpen && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="relative bg-[#232323] backdrop-blur-xl border border-[#c9a227]/20 rounded-3xl p-8 w-full max-w-2xl shadow-[0_20px_60px_rgba(201,162,39,0.3)]">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-[#efe9d6] text-2xl">Add New User</h3>
                <button
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="text-[#efe9d6]/60 hover:text-[#c9a227] transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleAddUser} className="space-y-6">
                <div>
                  <label className="flex gap-2 text-[#efe9d6] text-sm mb-2">
                    <Users className="w-4 h-4 inline mr-2" />
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={newUser.name}
                    onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                    className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                    placeholder="Enter full name"
                  />
                </div>

                <div>
                  <label className="flex gap-2 text-[#efe9d6] text-sm mb-2">
                    <Mail className="w-4 h-4 inline mr-2" />
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={newUser.email}
                    onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
                    className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                    placeholder="email@example.com"
                  />
                </div>

                <div>
                  <label className="flex gap-2 text-[#efe9d6] text-sm mb-2">
                    <Lock className="w-4 h-4 inline mr-2" />
                    Password *
                  </label>
                  <input
                    type="password"
                    required
                    value={newUser.password}
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
                    className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                    placeholder="Enter secure password"
                    minLength={6}
                  />
                </div>

                <div>
                  <label className="flex gap-2 text-[#efe9d6] text-sm mb-2">
                    <Shield className="w-4 h-4 inline mr-2" />
                    Role *
                  </label>
                  <div className="relative w-full">
                    <select
                      value={newUser.role}
                      onChange={(e) => setNewUser({ ...newUser, role: e.target.value as 'Admin' | 'User' })}
                      className="w-full appearance-none bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 pr-10 text-[#efe9d6] focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 cursor-pointer"
                    >
                      <option value="User">User</option>
                      <option value="Admin">Admin</option>
                    </select>
                    <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#efe9d6]/60 pointer-events-none" />
                  </div>
                  <p className="text-[#efe9d6]/40 text-xs mt-2">
                    Admins have full access to the dashboard and can manage all content
                  </p>
                </div>

                <div className="flex gap-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddUserModalOpen(false)}
                    className="flex-1 px-6 py-3 bg-[#efe9d6]/5 border border-[#efe9d6]/20 rounded-xl text-[#efe9d6] hover:bg-[#efe9d6]/10 transition-all duration-300"
                  >
                    Cancel
                  </button>
                  <GradientButton type="submit" className="flex">
                    <div className='flex gap-2 items-center'>
                      <Plus className="w-5 h-5 inline mr-2" />
                      Create User
                    </div>
                  </GradientButton>
                </div>
              </form>
            </div>
          </div>
        )}

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
