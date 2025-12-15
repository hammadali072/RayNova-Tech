import { useState, useEffect } from 'react';
import { Download, ClipboardList, Search, Filter, User, Mail, Phone, Calendar, DollarSign, Clock, Trash2, Edit2, Eye, CheckCircle, XCircle, RefreshCw, ExternalLink, Building, FileText, Link, Loader2 } from 'lucide-react';
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
import { AdminLayout } from '../../components/admin/AdminLayout';
import { useAuth } from '../../contexts/AuthContext';

interface ServiceOrder {
  id: string;
  service: string;
  fullName: string;
  email: string;
  phone: string;
  company: string;
  projectTitle: string;
  projectDescription: string;
  requiredFeatures: string;
  projectLink: string;
  timeline: string;
  budget: number;
  status: 'pending' | 'review' | 'quoted' | 'accepted' | 'in-progress' | 'completed' | 'cancelled' | 'rejected';
  priority: 'low' | 'normal' | 'high' | 'urgent';
  assignedTo: string | null;
  createdAt: string;
  updatedAt: string;
  fileName: string | null;
  fileData: string | null;
  fileSize: number | null;
  fileType: string | null;
  source: string;
}

export function AdminServiceOrders() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<ServiceOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [updatingIds, setUpdatingIds] = useState<string[]>([]);
  const [showStatusDropdown, setShowStatusDropdown] = useState<string | null>(null);
  // Action Modal State (Accept/Reject)
  const [actionModal, setActionModal] = useState<{
    isOpen: boolean;
    type: 'accept' | 'reject';
    orderId: string | null;
    message: string;
  }>({
    isOpen: false,
    type: 'accept',
    orderId: null,
    message: ''
  });

  // Notification State removed in favor of Sonner

  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const { currentUser } = useAuth();
  const API_URL = 'http://localhost:5000/api/orders';

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const token = currentUser?.token;
      if (!token) return;

      const response = await fetch(API_URL, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) throw new Error('Failed to fetch orders');
      
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [currentUser]);

  // Update order status
  const updateStatus = async (orderId: string, newStatus: ServiceOrder['status'], extraData?: any) => {
    setUpdatingIds(prev => [...prev, orderId]);
    try {
      const token = currentUser?.token;
      const response = await fetch(`${API_URL}/${orderId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          status: newStatus,
          updatedAt: new Date().toISOString(),
          ...extraData
        })
      });

      if (!response.ok) throw new Error('Failed to update status');

      // Update local state
      setOrders(prev => prev.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date().toISOString() } 
          : order
      ));
      
      if (selected?.id === orderId) {
        setSelected(prev => prev ? { ...prev, status: newStatus, updatedAt: new Date().toISOString() } : null);
      }

      setShowStatusDropdown(null);
    } catch (error: any) {
      console.error('Error updating order status:', error);
      toast.error(`Failed to update status: ${error.message || 'Unknown error'}`);
    } finally {
      setUpdatingIds(prev => prev.filter(id => id !== orderId));
    }
  };

  // Delete order permanently


  // Archive order (soft delete)
  const archiveOrder = async (orderId: string) => {
    await updateStatus(orderId, 'cancelled');
  };

  // Filter orders
  const filteredOrders = orders.filter(order => {
    // Apply status filter
    if (filter !== 'all' && order.status !== filter) {
      return false;
    }

    // Apply search filter
    const searchLower = search.toLowerCase();
    return (
      order.fullName?.toLowerCase().includes(searchLower) ||
      order.email?.toLowerCase().includes(searchLower) ||
      order.company?.toLowerCase().includes(searchLower) ||
      order.projectTitle?.toLowerCase().includes(searchLower) ||
      order.service?.toLowerCase().includes(searchLower)
    );
  });

  // Stats counters
  const stats = {
    total: orders.length,
    pending: orders.filter(o => o.status === 'pending').length,
    review: orders.filter(o => o.status === 'review').length,
    quoted: orders.filter(o => o.status === 'quoted').length,
    accepted: orders.filter(o => o.status === 'accepted').length,
    inProgress: orders.filter(o => o.status === 'in-progress').length,
    completed: orders.filter(o => o.status === 'completed').length,
    cancelled: orders.filter(o => o.status === 'cancelled').length,
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30';
      case 'review': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'quoted': return 'bg-purple-500/20 text-purple-300 border-purple-500/30';
      case 'accepted': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'in-progress': return 'bg-[#c9a227]/20 text-[#c9a227] border-[#c9a227]/30';
      case 'completed': return 'bg-teal-500/20 text-teal-300 border-teal-500/30';
      case 'cancelled': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock className="w-4 h-4" />;
      case 'review': return <Eye className="w-4 h-4" />;
      case 'quoted': return <DollarSign className="w-4 h-4" />;
      case 'accepted': return <CheckCircle className="w-4 h-4" />;
      case 'in-progress': return <RefreshCw className="w-4 h-4" />;
      case 'completed': return <CheckCircle className="w-4 h-4" />;
      case 'cancelled': return <XCircle className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low': return 'text-gray-400';
      case 'normal': return 'text-blue-400';
      case 'high': return 'text-orange-400';
      case 'urgent': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  // Service name mapping
  const getServiceName = (serviceValue: string) => {
    const services = [
      { value: 'ai-website', label: 'AI-Integrated Website Development' },
      { value: 'text-chatbot', label: 'Text Chatbot Development' },
      { value: 'voice-chatbot', label: 'Voice Chatbot Development' },
      { value: 'ai-integration', label: 'AI Integration Services' },
      { value: 'custom', label: 'Custom AI Solution' }
    ];
    return services.find(s => s.value === serviceValue)?.label || serviceValue;
  };

  // Status options for dropdown
  const statusOptions: Array<{ value: ServiceOrder['status'], label: string }> = [
    { value: 'pending', label: 'Pending' },
    { value: 'review', label: 'Under Review' },
    { value: 'quoted', label: 'Quoted' },
    { value: 'accepted', label: 'Accepted' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' },
  ];


  const getDefaultMessage = (order: ServiceOrder, type: 'accept' | 'reject') => {
    if (type === 'reject') {
      return `Dear ${order.fullName},

Thank you for your interest in RayNova Tech services.

We have reviewed your project request "${order.projectTitle}" and unfortunately, we are unable to accept it at this time.

This could be due to current capacity constraints or because the project requirements fall outside our core service offerings.

We appreciate you considering us and wish you the best with your project.

Sincerely,
The RayNova Tech Team`;
    } else {
      return `Dear ${order.fullName},

We are pleased to inform you that your project request "${order.projectTitle}" has been accepted!

Our team is excited to work with you. We will be in touch shortly with the next steps, including a detailed timeline and onboarding information.

If you have any immediate questions, please don't hesitate to reply to this email.

Sincerely,
The RayNova Tech Team`;
    }
  };

  // Delete Order
  const confirmDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
      const token = currentUser?.token;
      if (!token) return;

      const response = await fetch(`${API_URL}/${deleteId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) throw new Error('Failed to delete order');
      
      setOrders(orders.filter(order => order.id !== deleteId));
      if (selected?.id === deleteId) setSelected(null);
      
      toast.success('Order deleted successfully');
    } catch (error) {
      console.error('Error deleting order:', error);
      toast.error('Failed to delete order');
    } finally {
      setIsDeleting(false);
      setDeleteId(null);
    }
  };

  const openActionModal = (order: ServiceOrder, type: 'accept' | 'reject') => {
    setActionModal({
      isOpen: true,
      type,
      orderId: order.id,
      message: getDefaultMessage(order, type)
    });
  };

  const handleActionConfirm = async () => {
    if (!actionModal.orderId) return;
    
    const status = actionModal.type === 'accept' ? 'accepted' : 'rejected';
    
    await updateStatus(actionModal.orderId, status, { emailMessage: actionModal.message });
    
    setActionModal(prev => ({ ...prev, isOpen: false }));
    toast.success(`Order ${status} and email sent successfully!`);
  };

  if (loading) {
    return (
      <AdminLayout activePage="orders">
        <div className="flex items-center justify-center h-96">
          <div className="text-[#c9a227] animate-pulse">Loading service orders...</div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout activePage="orders">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-[#efe9d6] mb-2">Service Orders</h1>
          <p className="text-[#efe9d6]/60">Manage and track all service requests from customers</p>
        </div>

        {/* Stats Cards */}
        {/* <div className="grid grid-cols-2 md:grid-cols-8 gap-4 mb-8">
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Total Orders</div>
            <div className="text-2xl font-bold text-[#c9a227]">{stats.total}</div>
          </div>
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Pending</div>
            <div className="text-2xl font-bold text-yellow-400">{stats.pending}</div>
          </div>
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Review</div>
            <div className="text-2xl font-bold text-blue-400">{stats.review}</div>
          </div>
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Quoted</div>
            <div className="text-2xl font-bold text-purple-400">{stats.quoted}</div>
          </div>
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Accepted</div>
            <div className="text-2xl font-bold text-green-400">{stats.accepted}</div>
          </div>
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">In Progress</div>
            <div className="text-2xl font-bold text-[#c9a227]">{stats.inProgress}</div>
          </div>
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Completed</div>
            <div className="text-2xl font-bold text-teal-400">{stats.completed}</div>
          </div>
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Cancelled</div>
            <div className="text-2xl font-bold text-gray-400">{stats.cancelled}</div>
          </div>
        </div> */}

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c9a227]" />
            <input
              type="text"
              placeholder="Search orders by name, email, company or project title..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-[#232323]/40 border border-[#c9a227]/20 rounded-xl pl-12 pr-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
            />
          </div>

          <select
            value={filter}
            onChange={e => setFilter(e.target.value)}
            className="bg-[#232323]/40 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
          >
            <option value="all">All Status</option>
            <option value="accepted">Accept</option>
            <option value="rejected">Reject</option>
          </select>
        </div>

        {/* Orders Table */}
        <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl overflow-hidden">
          {filteredOrders.length === 0 ? (
            <div className="text-center py-12 text-[#efe9d6]/60">
              <ClipboardList className="w-12 h-12 mx-auto mb-4 text-[#c9a227]/40" />
              <p>No orders found</p>
              {search && (
                <p className="text-sm mt-2">Try a different search term or clear the search</p>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#c9a227]/10">
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Status</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Service</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Customer</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Project</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Budget</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Date</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map(order => (
                    <tr
                      key={order.id}
                      className={`border-b border-[#c9a227]/5 hover:bg-[#232323]/60 transition-colors cursor-pointer ${deletingIds.includes(order.id) ? 'opacity-50' : ''}`}
                      onClick={() => !deletingIds.includes(order.id) && setSelected(order)}
                    >
                      <td className="px-6 py-4">
                        <div className="flex flex-col gap-1">
                          <div className="relative">
                            <div
                              className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${getStatusColor(order.status)} w-fit cursor-pointer hover:opacity-80 transition-all`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setShowStatusDropdown(showStatusDropdown === order.id ? null : order.id);
                              }}
                            >
                              {getStatusIcon(order.status)}
                              <span>{order.status.replace('-', ' ').toUpperCase()}</span>
                            </div>

                            {showStatusDropdown === order.id && (
                              <div
                                className="absolute top-full left-0 mt-1 bg-[#232323] border border-[#c9a227]/20 rounded-xl shadow-lg z-10 min-w-[180px]"
                                onClick={(e) => e.stopPropagation()}
                              >
                                {statusOptions.map(option => (
                                  <button
                                    key={option.value}
                                    onClick={() => updateStatus(order.id, option.value)}
                                    disabled={updatingIds.includes(order.id)}
                                    className={`w-full text-left px-4 py-2 hover:bg-[#c9a227]/10 transition-colors flex items-center gap-2 ${order.status === option.value ? 'text-[#c9a227]' : 'text-[#efe9d6]'
                                      }`}
                                  >
                                    {getStatusIcon(option.value)}
                                    {option.label}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>
                          <div className={`text-xs ${getPriorityColor(order.priority)}`}>
                            {order.priority.toUpperCase()}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#efe9d6] text-sm">
                          {getServiceName(order.service)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <User className="w-4 h-4 text-[#c9a227]" />
                            <span className="text-[#efe9d6]">{order.fullName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#efe9d6]/70">
                            <Mail className="w-4 h-4" />
                            {order.email}
                          </div>
                          {order.company && (
                            <div className="flex items-center gap-2 text-xs text-[#efe9d6]/60">
                              <Building className="w-4 h-4" />
                              {order.company}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#efe9d6] font-medium text-sm">{order.projectTitle}</div>
                        <div className="text-[#efe9d6]/60 text-xs truncate max-w-[200px]">
                          {order.projectDescription.substring(0, 60)}...
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-green-400" />
                          <span className="text-[#efe9d6] font-medium">{formatCurrency(order.budget)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#efe9d6]/60 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(order.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelected(order);
                            }}
                            disabled={deletingIds.includes(order.id)}
                            className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            title="View Details"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              setDeleteId(order.id);
                            }}
                            className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete Order"
                          >
                             <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Order Count */}
        {!loading && (
          <div className="mt-4 text-sm text-[#efe9d6]/40">
            Showing {filteredOrders.length} of {orders.length} orders
          </div>
        )}

        {/* Order Detail Modal */}
        {selected && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Modal overlay */}
            <div
              className="absolute inset-0 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelected(null)}
            />
            {/* Modal content */}
            <div
              className="relative bg-[#232323] backdrop-blur-xl border border-[#c9a227]/20 rounded-3xl w-full max-w-4xl max-h-[90vh] overflow-y-auto p-8"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#efe9d6] mb-2">Order Details</h2>
                  <div className="flex items-center gap-2 flex-wrap">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${getStatusColor(selected.status)}`}>
                      {getStatusIcon(selected.status)}
                      <span>{selected.status.replace('-', ' ').toUpperCase()}</span>
                    </div>
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selected.priority)} border ${selected.priority === 'urgent' ? 'border-red-500/30' : 'border-gray-500/30'}`}>
                      {selected.priority.toUpperCase()} PRIORITY
                    </span>
                    <span className="text-[#efe9d6]/60 text-sm">
                      {formatDate(selected.createdAt)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="text-[#efe9d6]/60 hover:text-[#c9a227] transition-colors text-2xl"
                  disabled={deletingIds.includes(selected.id)}
                >
                  ×
                </button>
              </div>

              <div className="space-y-6">
                {/* Customer Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#efe9d6]/60 text-sm">Customer</label>
                    <div className="flex items-center gap-2 p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                      <User className="w-5 h-5 text-[#c9a227]" />
                      <span className="text-[#efe9d6]">{selected.fullName}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#efe9d6]/60 text-sm">Email</label>
                    <div className="flex items-center gap-2 p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                      <Mail className="w-5 h-5 text-[#c9a227]" />
                      <a
                        href={`mailto:${selected.email}`}
                        className="text-[#efe9d6] hover:text-[#c9a227] transition-colors flex items-center gap-1"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {selected.email}
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                  {selected.phone && (
                    <div className="space-y-2">
                      <label className="text-[#efe9d6]/60 text-sm">Phone</label>
                      <div className="flex items-center gap-2 p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                        <Phone className="w-5 h-5 text-[#c9a227]" />
                        <a
                          href={`tel:${selected.phone}`}
                          className="text-[#efe9d6] hover:text-[#c9a227] transition-colors"
                        >
                          {selected.phone}
                        </a>
                      </div>
                    </div>
                  )}
                  {selected.company && (
                    <div className="space-y-2">
                      <label className="text-[#efe9d6]/60 text-sm">Company</label>
                      <div className="flex items-center gap-2 p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                        <Building className="w-5 h-5 text-[#c9a227]" />
                        <span className="text-[#efe9d6]">{selected.company}</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#efe9d6]/60 text-sm">Service</label>
                    <div className="p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                      <span className="text-[#c9a227] font-medium">{getServiceName(selected.service)}</span>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#efe9d6]/60 text-sm">Project Title</label>
                    <div className="p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                      <span className="text-[#efe9d6] font-medium">{selected.projectTitle}</span>
                    </div>
                  </div>
                </div>

                {/* Project Link */}
                {selected.projectLink && (
                  <div className="space-y-2">
                    <label className="text-[#efe9d6]/60 text-sm">Project Link</label>
                    <div className="p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                      <a
                        href={selected.projectLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#efe9d6] hover:text-[#c9a227] transition-colors flex items-center gap-2"
                      >
                        <Link className="w-5 h-5" />
                        <span className="truncate">{selected.projectLink}</span>
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                )}

                {/* Budget & Timeline */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#efe9d6]/60 text-sm">Budget</label>
                    <div className="p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-5 h-5 text-green-400" />
                        <span className="text-[#efe9d6] text-xl font-bold">{formatCurrency(selected.budget)}</span>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#efe9d6]/60 text-sm">Timeline</label>
                    <div className="p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                      <div className="flex items-center gap-2">
                        <Clock className="w-5 h-5 text-[#c9a227]" />
                        <span className="text-[#efe9d6]">
                          {selected.timeline === 'asap' && 'As soon as possible'}
                          {selected.timeline === '1-month' && 'Within 1 month'}
                          {selected.timeline === '2-3-months' && '2-3 months'}
                          {selected.timeline === '3-6-months' && '3-6 months'}
                          {selected.timeline === 'flexible' && 'Flexible'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Project Description */}
                <div className="space-y-2">
                  <label className="text-[#efe9d6]/60 text-sm">Project Description</label>
                  <div className="p-4 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                    <p className="text-[#efe9d6] leading-relaxed whitespace-pre-wrap max-h-[200px] overflow-y-auto pr-2">
                      {selected.projectDescription}
                    </p>
                  </div>
                </div>

                {/* Required Features */}
                <div className="space-y-2">
                  <label className="text-[#efe9d6]/60 text-sm">Required Features</label>
                  <div className="p-4 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                    <p className="text-[#efe9d6] leading-relaxed whitespace-pre-wrap max-h-[200px] overflow-y-auto pr-2">
                      {selected.requiredFeatures}
                    </p>
                  </div>
                </div>

                {/* File Info */}
                {selected.fileName && (
                  <div className="space-y-2">
                    <label className="text-[#efe9d6]/60 text-sm">Uploaded File</label>
                    <div className="p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText className="w-5 h-5 text-[#c9a227]" />
                          <div>
                            <div className="text-[#efe9d6]">{selected.fileName}</div>
                            <div className="text-[#efe9d6]/60 text-sm">
                              {selected.fileType} • {(selected.fileSize || 0) > 0 ?
                                `${(selected.fileSize! / 1024 / 1024).toFixed(2)} MB` :
                                'Unknown size'}
                            </div>
                          </div>
                        </div>
                        <button
                          className="flex items-center gap-2 px-4 py-2 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-lg text-[#c9a227] hover:bg-[#c9a227]/30 transition-all"
                          title="Download File"
                          onClick={() => {
                            if (selected.fileData) {
                              const link = document.createElement('a');
                              link.href = selected.fileData;
                              link.download = selected.fileName || 'download';
                              document.body.appendChild(link);
                              link.click();
                              document.body.removeChild(link);
                            } else {
                              toast.error('File data not found');
                            }
                          }}
                        >
                          <Download className="w-4 h-4" />
                          Download
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Metadata */}
                <div className="space-y-2">
                  <label className="text-[#efe9d6]/60 text-sm">Order Information</label>
                  <div className="p-4 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                    <div className="text-[#efe9d6]/70 text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Order ID:</span>
                        <code className="bg-[#232323]/60 px-2 py-1 rounded text-xs">{selected.id}</code>
                      </div>
                      <div><span className="font-medium">Source:</span> {selected.source}</div>
                      <div><span className="font-medium">Created:</span> {formatDate(selected.createdAt)}</div>
                      <div><span className="font-medium">Last Updated:</span> {formatDate(selected.updatedAt)}</div>
                      {selected.assignedTo && (
                        <div><span className="font-medium">Assigned To:</span> {selected.assignedTo}</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 pt-6 border-t border-[#c9a227]/10">
                  <button
                    onClick={() => openActionModal(selected, 'accept')}
                    disabled={updatingIds.includes(selected.id) || selected.status === 'accepted'}
                    className="bg-green-500/20 border border-green-500/30 text-green-300 font-semibold py-3 px-4 rounded-xl hover:bg-green-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                   {updatingIds.includes(selected.id) ? <RefreshCw className="w-5 h-5 animate-spin" /> : <CheckCircle className="w-5 h-5" />}
                    Accept Project
                  </button>

                  <button
                     onClick={() => openActionModal(selected, 'reject')}
                    disabled={updatingIds.includes(selected.id) || selected.status === 'rejected'}
                    className="bg-red-500/20 border border-red-500/30 text-red-300 font-semibold py-3 px-4 rounded-xl hover:bg-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {updatingIds.includes(selected.id) ? <RefreshCw className="w-5 h-5 animate-spin" /> : <XCircle className="w-5 h-5" />}
                    Reject Project
                  </button>

                  <button
                    onClick={() => {
                        if (selected) {
                            setDeleteId(selected.id);
                        }
                    }}
                    disabled={isDeleting && deleteId === selected.id}
                    className="bg-red-500/20 border border-red-500/30 text-red-400 font-semibold py-3 px-4 rounded-xl hover:bg-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {isDeleting && deleteId === selected.id ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* Unified Action Modal (Accept/Reject) */}
        {actionModal.isOpen && (
          <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
              onClick={() => setActionModal(prev => ({ ...prev, isOpen: false }))}
            />
            <div className={`relative bg-[#232323] border ${
              actionModal.type === 'accept' ? 'border-green-500/30' : 'border-red-500/30'
            } rounded-2xl w-full max-w-lg p-6 shadow-2xl`}>
              <h3 className={`text-xl font-bold mb-4 flex items-center gap-2 ${
                actionModal.type === 'accept' ? 'text-green-400' : 'text-red-400'
              }`}>
                {actionModal.type === 'accept' ? <CheckCircle className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
                {actionModal.type === 'accept' ? 'Accept Project & Send Email' : 'Reject Project & Send Email'}
              </h3>
              
              <div className="mb-4">
                <label className="text-[#efe9d6]/60 text-sm mb-2 block">
                  Email Message Body
                </label>
                <textarea
                  value={actionModal.message}
                  onChange={(e) => setActionModal(prev => ({ ...prev, message: e.target.value }))}
                  className={`w-full h-48 bg-[#0f0f0f]/40 border rounded-xl p-4 text-[#efe9d6] focus:outline-none transition-colors resize-none ${
                    actionModal.type === 'accept' 
                      ? 'border-[#c9a227]/20 focus:border-green-500/50' 
                      : 'border-[#c9a227]/20 focus:border-red-500/50'
                  }`}
                />
              </div>

              <div className="flex justify-end gap-3">
                <button
                  onClick={() => setActionModal(prev => ({ ...prev, isOpen: false }))}
                  className="px-4 py-2 text-[#efe9d6]/60 hover:text-[#efe9d6] transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleActionConfirm}
                  disabled={!actionModal.message.trim()}
                  className={`border font-semibold py-2 px-6 rounded-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 ${
                    actionModal.type === 'accept'
                      ? 'bg-green-500/20 border-green-500/30 text-green-300 hover:bg-green-500/30'
                      : 'bg-red-500/20 border-red-500/30 text-red-300 hover:bg-red-500/30'
                  }`}
                >
                  <Mail className="w-4 h-4" />
                  Send & {actionModal.type === 'accept' ? 'Accept' : 'Reject'}
                </button>
              </div>
            </div>
          </div>
        )}

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-[#232323] border border-[#c9a227]/20 text-[#efe9d6]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#efe9d6]/60">
              This action cannot be undone. This will permanently delete this service order.
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
      </div>
    </AdminLayout>
  );
}