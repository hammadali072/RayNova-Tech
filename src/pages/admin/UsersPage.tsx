import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Search, ChevronDown, Plus, X, Mail, Users, Lock, Shield, Edit2, Trash2, Save, Loader2 } from 'lucide-react';
import { GradientButton } from '../../components/GradientButton';
import { toast } from 'sonner';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../components/ui/alert-dialog";

interface User {
  _id: string; // Changed from id to _id for MongoDB
  id?: string; // Keep for compatibility if needed
  name: string;
  email: string;
  password?: string;
  role: 'Admin' | 'User';
  registeredDate: string;
}

export function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Edit state
  const [editingUserId, setEditingUserId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const [newUser, setNewUser] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User' as 'Admin' | 'User'
  });

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);



  const [editUserData, setEditUserData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'User' as 'Admin' | 'User'
  });

  // Fetch users from backend
  const fetchUsers = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/auth/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // Handle role change for existing users
  const handleRoleChange = async (userId: string, newRole: 'Admin' | 'User') => {
    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${userId}/role`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: newRole }),
      });

      if (!response.ok) throw new Error('Failed to update role');
      
      // Optimistic update or refetch
      fetchUsers();
      toast.success('Role updated successfully!');
    } catch (err) {
      console.error('Failed to update role', err);
      toast.error('Failed to update role. See console for details.');
    }
  };

  // Handle delete user
  // Handle delete user
  const confirmDelete = async () => {
    if (!deleteId) return;
    
    // Prevent deleting default admin (double check)
    const userToDelete = users.find(u => u._id === deleteId || u.id === deleteId);
    if (userToDelete?.email === 'admin@raynova.com') {
      toast.error('Cannot delete the default admin account!');
      setDeleteId(null);
      return;
    }

    setIsDeleting(true);

    try {
      const response = await fetch(`http://localhost:5000/api/auth/users/${deleteId}`, {
         method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete user');

      toast.success('User deleted successfully');
      fetchUsers();
    } catch (err) {
      console.error('Failed to delete user', err);
      toast.error('Failed to delete user. See console for details.');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  // Handle edit user
  const handleEditUser = (user: User) => {
    setEditingUserId(user._id || user.id || '');
    setIsEditMode(true);
    setEditUserData({
      name: user.name || '',
      email: user.email || '',
      password: '', // Don't show current password for security
      role: user.role || 'User'
    });
  };

  // Handle update user
  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!editingUserId) return;

    try {
      const updateData: any = {
        name: editUserData.name,
        email: editUserData.email,
        role: editUserData.role,
      };

      // Only update password if it's provided
      if (editUserData.password.trim() !== '') {
        updateData.password = editUserData.password;
      }

      const response = await fetch(`http://localhost:5000/api/auth/users/${editingUserId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updateData),
      });

      if (!response.ok) throw new Error('Failed to update user');

      // Reset edit mode
      cancelEdit();
      fetchUsers();
      toast.success('User updated successfully!');
    } catch (err) {
      console.error('Failed to update user', err);
      toast.error('Failed to update user. See console for details.');
    }
  };

  // Cancel edit mode
  const cancelEdit = () => {
    setIsEditMode(false);
    setEditingUserId(null);
    setEditUserData({
      name: '',
      email: '',
      password: '',
      role: 'User'
    });
  };

  const handleAddUser = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create user');
      }

      // Reset form
      setNewUser({
        name: '',
        email: '',
        password: '',
        role: 'User'
      });
      setIsAddUserModalOpen(false);
      fetchUsers();
      toast.success('User added successfully!');
    } catch (err: any) {
      console.error('Failed to add user', err);
      toast.error(err.message);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout activePage="users">
      {/* Main container with proper spacing for sidebar */}
      <div className="max-w-7xl mx-auto pl-0 transition-all duration-300 w-full">
        <div className="p-0 sm:p-2 md:p-4 lg:p-6 xl:p-8">
          {/* Header - Responsive to 300px */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4">
              <div className="min-w-0 flex-1">
                <h2 className="text-[#efe9d6] text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-1 sm:mb-2">User Management</h2>
                <p className="text-[#efe9d6]/60 text-xs sm:text-sm">Manage registered users and their roles</p>
              </div>
              {isEditMode && (
                <button
                  type="button"
                  onClick={cancelEdit}
                  className="flex items-center gap-1.5 sm:gap-2 px-3 py-1.5 sm:px-4 sm:py-2 bg-red-500/20 border border-red-500/30 rounded-lg sm:rounded-xl text-red-300 hover:bg-red-500/30 transition-all w-fit text-xs sm:text-sm"
                >
                  <X className="w-3 h-3 sm:w-4 sm:h-4" />
                  <span className="whitespace-nowrap">Cancel Edit</span>
                </button>
              )}
            </div>
          </div>

          {/* Search & Add Button - Responsive to 300px */}
          <div className="mb-4 sm:mb-6 md:mb-8">
            <div className='flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 md:gap-4'>
              <div className="relative flex-1 min-w-0">
                <Search className="absolute left-2 sm:left-3 md:left-4 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-[#c9a227]" />
                <input
                  type="text"
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-[#232323]/60 border border-[#c9a227]/20 rounded-lg sm:rounded-xl pl-8 sm:pl-10 md:pl-12 pr-3 sm:pr-4 py-2 sm:py-2.5 md:py-3 text-sm sm:text-base text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                />
              </div>
              {/* Add User Button */}
              <div className="flex w-full sm:w-auto">
                <GradientButton
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="w-full sm:w-auto text-xs sm:text-sm"
                  size="sm"
                >
                  <div className='flex gap-1.5 sm:gap-2 items-center'>
                    <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Add User</span>
                  </div>
                </GradientButton>
              </div>
            </div>
          </div>


          {/* Edit User Modal - Responsive to 300px */}
          {isEditMode && editingUserId && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 md:p-6">
              <div className="relative bg-[#232323] backdrop-blur-xl border border-[#c9a227]/20 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(201,162,39,0.3)]">
                <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6 gap-2">
                  <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 rounded-full bg-[#c9a227]/20 flex items-center justify-center flex-shrink-0">
                      <Edit2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#c9a227]" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-[#efe9d6] text-lg sm:text-xl md:text-2xl truncate">Edit User</h3>
                      <p className="text-[#efe9d6]/60 text-xs sm:text-sm truncate">User ID: {editingUserId.substring(0, 8)}...</p>
                    </div>
                  </div>
                  <button
                    onClick={cancelEdit}
                    className="text-[#efe9d6]/60 hover:text-[#c9a227] transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <form onSubmit={handleUpdateUser} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <label className="flex gap-1.5 sm:gap-2 text-[#efe9d6] text-xs sm:text-sm mb-1.5 sm:mb-2">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={editUserData.name}
                      onChange={(e) => setEditUserData({ ...editUserData, name: e.target.value })}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="flex gap-2 text-[#efe9d6] text-sm mb-2">
                      <Mail className="w-4 h-4" />
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={editUserData.email}
                      onChange={(e) => setEditUserData({ ...editUserData, email: e.target.value })}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                      placeholder="email@example.com"
                    />
                  </div>

                  <div>
                    <label className="flex gap-2 text-[#efe9d6] text-sm mb-2">
                      <Lock className="w-4 h-4" />
                      New Password (Leave empty to keep current)
                    </label>
                    <input
                      type="password"
                      value={editUserData.password}
                      onChange={(e) => setEditUserData({ ...editUserData, password: e.target.value })}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                      placeholder="Enter new password (optional)"
                      minLength={6}
                    />
                    <p className="text-[#efe9d6]/40 text-xs mt-2">
                      Leave blank if you don't want to change the password
                    </p>
                  </div>

                  <div>
                    <label className="flex gap-2 text-[#efe9d6] text-sm mb-2">
                      <Shield className="w-4 h-4" />
                      Role *
                    </label>
                    <div className="relative w-full">
                      <select
                        value={editUserData.role}
                        onChange={(e) => setEditUserData({ ...editUserData, role: e.target.value as 'Admin' | 'User' })}
                        className="w-full appearance-none bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 pr-10 text-[#efe9d6] focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 cursor-pointer"
                      >
                        <option value="User">User</option>
                        <option value="Admin">Admin</option>
                      </select>
                      <ChevronDown className="absolute right-0 top-1/2 -translate-y-1/2 w-5 h-5 text-[#efe9d6]/60 pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={cancelEdit}
                      className="flex-1 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-[#efe9d6]/5 border border-[#efe9d6]/20 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base text-[#efe9d6] hover:bg-[#efe9d6]/10 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <GradientButton type="submit" className="flex-1 sm:flex-none" size="sm">
                      <div className='flex gap-1.5 sm:gap-2 items-center'>
                        <Save className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Update User</span>
                      </div>
                    </GradientButton>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Add User Modal - Responsive to 300px */}
          {isAddUserModalOpen && (
            <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-3 sm:p-4 md:p-6">
              <div className="relative bg-[#232323] backdrop-blur-xl border border-[#c9a227]/20 rounded-xl sm:rounded-2xl md:rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_20px_60px_rgba(201,162,39,0.3)]">
                <div className="flex justify-between items-center mb-4 sm:mb-5 md:mb-6 gap-2">
                  <h3 className="text-[#efe9d6] text-lg sm:text-xl md:text-2xl">Add New User</h3>
                  <button
                    onClick={() => setIsAddUserModalOpen(false)}
                    className="text-[#efe9d6]/60 hover:text-[#c9a227] transition-colors flex-shrink-0"
                  >
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                <form onSubmit={handleAddUser} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div>
                    <label className="flex gap-1.5 sm:gap-2 text-[#efe9d6] text-xs sm:text-sm mb-1.5 sm:mb-2">
                      <Users className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                      <span>Full Name *</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={newUser.name}
                      onChange={(e) => setNewUser({ ...newUser, name: e.target.value })}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                      placeholder="Enter full name"
                    />
                  </div>

                  <div>
                    <label className="flex gap-2 text-[#efe9d6] text-sm mb-2">
                      <Mail className="w-4 h-4" />
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
                      <Lock className="w-4 h-4" />
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
                      <Shield className="w-4 h-4" />
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

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 md:gap-4 pt-3 sm:pt-4">
                    <button
                      type="button"
                      onClick={() => setIsAddUserModalOpen(false)}
                      className="flex-1 px-4 py-2 sm:px-5 sm:py-2.5 md:px-6 md:py-3 bg-[#efe9d6]/5 border border-[#efe9d6]/20 rounded-lg sm:rounded-xl text-xs sm:text-sm md:text-base text-[#efe9d6] hover:bg-[#efe9d6]/10 transition-all duration-300"
                    >
                      Cancel
                    </button>
                    <GradientButton type="submit" className="flex-1 sm:flex-none" size="sm">
                      <div className='flex gap-1.5 sm:gap-2 items-center'>
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Create User</span>
                      </div>
                    </GradientButton>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Users Table - Responsive to 300px */}
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-xl sm:rounded-2xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-max w-full">
                <thead>
                  <tr className="border-b border-[#c9a227]/10">
                    <th className="text-left px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-[#efe9d6] text-xs sm:text-sm font-medium">User Name</th>
                    <th className="text-left px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-[#efe9d6] text-xs sm:text-sm font-medium hidden sm:table-cell">Email</th>
                    <th className="text-left px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-[#efe9d6] text-xs sm:text-sm font-medium hidden md:table-cell">Registered</th>
                    <th className="text-left px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-[#efe9d6] text-xs sm:text-sm font-medium">Role</th>
                    <th className="text-left px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-[#efe9d6] text-xs sm:text-sm font-medium hidden lg:table-cell">Change Role</th>
                    <th className="text-left px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-[#efe9d6] text-xs sm:text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredUsers.map((user) => (
                    <tr
                      key={user._id || user.id}
                      className="border-b border-[#c9a227]/5 hover:bg-[#c9a227]/5 transition-colors group"
                    >
                      <td className="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4">
                        <div className="text-[#efe9d6] font-medium text-xs sm:text-sm">{user.name}</div>
                        <div className="text-[#efe9d6]/40 text-[10px] sm:text-xs">ID: {(user._id || user.id || '').substring(0, 8)}...</div>
                        <div className="text-[#efe9d6]/80 text-xs sm:text-sm mt-1 sm:hidden">{user.email}</div>
                      </td>
                      <td className="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-[#efe9d6]/80 text-xs sm:text-sm hidden sm:table-cell">{user.email}</td>
                      <td className="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 text-[#efe9d6]/70 text-xs sm:text-sm hidden md:table-cell">
                        {new Date(user.registeredDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric'
                        })}
                      </td>
                      <td className="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4">
                        <span
                          className={`inline-flex px-2 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-medium ${user.role === 'Admin'
                            ? 'bg-[#c9a227]/20 text-[#c9a227] border border-[#c9a227]/30'
                            : 'bg-[#efe9d6]/10 text-[#efe9d6]/70 border border-[#efe9d6]/20'
                            }`}
                        >
                          {user.role}
                        </span>
                      </td>
                      <td className="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4 hidden lg:table-cell">
                        <div className="relative">
                          <select
                            value={user.role}
                            onChange={(e) => handleRoleChange(user._id || user.id || '', e.target.value as 'Admin' | 'User')}
                            className="appearance-none bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-lg px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 pr-8 sm:pr-10 text-[#efe9d6] text-xs sm:text-sm focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 cursor-pointer w-24 sm:w-28 md:w-32"
                            disabled={user.email === 'admin@raynova.com'}
                          >
                            <option value="User">User</option>
                            <option value="Admin">Admin</option>
                          </select>
                          <ChevronDown className="absolute right-2 sm:right-3 top-1/2 -translate-y-1/2 w-3 h-3 sm:w-4 sm:h-4 text-[#efe9d6]/60 pointer-events-none" />
                        </div>
                      </td>
                      <td className="px-2 sm:px-3 md:px-4 lg:px-6 py-2 sm:py-3 md:py-4">
                        <div className="flex gap-1 sm:gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="p-1.5 sm:p-2 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-lg text-[#c9a227] hover:bg-[#c9a227]/30 transition-all"
                            title="Edit User"
                            disabled={user.email === 'admin@raynova.com'}
                          >
                            <Edit2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                          <button
                            onClick={() => setDeleteId(user._id || user.id || '')}
                            className="p-1.5 sm:p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
                            title="Delete User"
                            disabled={user.email === 'admin@raynova.com'}
                          >
                            <Trash2 className="w-3 h-3 sm:w-4 sm:h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {filteredUsers.length === 0 && (
              <div className="text-center py-8 sm:py-10 md:py-12 text-[#efe9d6]/60">
                <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 mx-auto mb-3 sm:mb-4 rounded-full bg-[#c9a227]/10 flex items-center justify-center">
                  <Users className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8 text-[#c9a227]/40" />
                </div>
                <p className="text-xs sm:text-sm md:text-base">No users found matching your search.</p>
              </div>
            )}
          </div>


        </div>
      </div>
    <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-[#232323] border border-[#c9a227]/20 text-[#efe9d6]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#efe9d6]/60">
              This action cannot be undone. This will permanently delete the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-[#efe9d6]/20 text-[#efe9d6] hover:bg-[#efe9d6]/10 hover:text-[#efe9d6]">Cancel</AlertDialogCancel>
            <AlertDialogAction 
                onClick={(e) => {
                    e.preventDefault();
                    confirmDelete();
                }}
                className="bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-[#232323] border border-[#c9a227]/20 text-[#efe9d6]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#efe9d6]/60">
              This action cannot be undone. This will permanently delete the user.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel className="bg-transparent border border-[#efe9d6]/20 text-[#efe9d6] hover:bg-[#efe9d6]/10 hover:text-[#efe9d6]">Cancel</AlertDialogCancel>
            <AlertDialogAction 
                onClick={(e) => {
                    e.preventDefault();
                    confirmDelete();
                }}
                className="bg-red-500/20 border border-red-500/30 text-red-400 hover:bg-red-500/30"
            >
              {isDeleting ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminLayout>
  );
}