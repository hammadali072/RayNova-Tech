import { useState, useEffect } from 'react';
import { getDatabase, ref, onValue, update, remove } from 'firebase/database';
import { Search, Mail, Eye, CheckCircle, XCircle, User, Building, Phone, Calendar, Trash2, RefreshCw, MailOpen, ExternalLink } from 'lucide-react';
import { AdminLayout } from '../../components/admin/AdminLayout';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  message: string;
  status: 'new' | 'read' | 'responded' | 'archived';
  createdAt: string;
  userAgent: string;
  source: string;
}

export function AdminMessages() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [deletingIds, setDeletingIds] = useState<string[]>([]);
  const [updatingIds, setUpdatingIds] = useState<string[]>([]);

  // Fetch messages from Firebase
  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = () => {
    setLoading(true);
    const db = getDatabase();
    const messagesRef = ref(db, 'contacts');

    const unsubscribe = onValue(messagesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array and sort by date (newest first)
        const messagesList = Object.entries(data).map(([id, msg]: [string, any]) => ({
          id,
          ...msg
        })).sort((a, b) =>
          new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );

        setMessages(messagesList);
      } else {
        setMessages([]);
      }
      setLoading(false);
      setRefreshing(false);
    });

    return () => unsubscribe();
  };

  // Refresh messages
  const handleRefresh = () => {
    setRefreshing(true);
    fetchMessages();
  };

  // Update message status
  const updateStatus = async (messageId: string, newStatus: ContactMessage['status']) => {
    setUpdatingIds(prev => [...prev, messageId]);
    try {
      const db = getDatabase();
      const messageRef = ref(db, `contacts/${messageId}`);
      await update(messageRef, {
        status: newStatus,
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error updating message status:', error);
    } finally {
      setUpdatingIds(prev => prev.filter(id => id !== messageId));
    }
  };

  // Delete message permanently
  const deleteMessagePermanently = async (messageId: string, messageName: string) => {
    if (window.confirm(`Are you sure you want to PERMANENTLY delete message from "${messageName}"? This action cannot be undone and the message will be permanently removed from the database.`)) {
      setDeletingIds(prev => [...prev, messageId]);
      try {
        const db = getDatabase();
        const messageRef = ref(db, `contacts/${messageId}`);
        await remove(messageRef);

        // Close modal if open
        if (selected?.id === messageId) {
          setSelected(null);
        }
      } catch (error) {
        console.error('Error deleting message:', error);
        alert('Failed to delete message. Please try again.');
      } finally {
        setDeletingIds(prev => prev.filter(id => id !== messageId));
      }
    }
  };

  // Archive message (soft delete)
  const archiveMessage = async (messageId: string) => {
    setUpdatingIds(prev => [...prev, messageId]);
    try {
      const db = getDatabase();
      const messageRef = ref(db, `contacts/${messageId}`);
      await update(messageRef, {
        status: 'archived',
        updatedAt: new Date().toISOString()
      });
    } catch (error) {
      console.error('Error archiving message:', error);
    } finally {
      setUpdatingIds(prev => prev.filter(id => id !== messageId));
    }
  };

  // Filter messages
  const filteredMessages = messages.filter(msg => {
    // Apply status filter
    if (filter !== 'all' && msg.status !== filter) {
      return false;
    }

    // Apply search filter
    const searchLower = search.toLowerCase();
    return (
      msg.name?.toLowerCase().includes(searchLower) ||
      msg.email?.toLowerCase().includes(searchLower) ||
      msg.company?.toLowerCase().includes(searchLower) ||
      msg.message?.toLowerCase().includes(searchLower) ||
      msg.service?.toLowerCase().includes(searchLower)
    );
  });

  // Stats counters
  const stats = {
    total: messages.length,
    new: messages.filter(m => m.status === 'new').length,
    read: messages.filter(m => m.status === 'read').length,
    responded: messages.filter(m => m.status === 'responded').length,
    archived: messages.filter(m => m.status === 'archived').length,
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'new': return 'bg-green-500/20 text-green-300 border-green-500/30';
      case 'read': return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
      case 'responded': return 'bg-[#c9a227]/20 text-[#c9a227] border-[#c9a227]/30';
      case 'archived': return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'new': return <Mail className="w-4 h-4" />;
      case 'read': return <Eye className="w-4 h-4" />;
      case 'responded': return <CheckCircle className="w-4 h-4" />;
      case 'archived': return <XCircle className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  // Table row loading skeleton
  const TableRowSkeleton = () => (
    <tr>
      <td colSpan={6} className="px-6 py-4">
        <div className="flex items-center space-x-4 animate-pulse">
          <div className="h-8 bg-[#232323]/40 rounded w-24"></div>
          <div className="h-8 bg-[#232323]/40 rounded w-32"></div>
          <div className="h-8 bg-[#232323]/40 rounded w-48"></div>
          <div className="h-8 bg-[#232323]/40 rounded w-20"></div>
          <div className="h-8 bg-[#232323]/40 rounded w-32"></div>
          <div className="h-8 bg-[#232323]/40 rounded w-24"></div>
        </div>
      </td>
    </tr>
  );

  return (
    <AdminLayout activePage="messages">
      <div className="max-w-7xl mx-auto p-6">
        {/* Header with Refresh Button */}
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-[#efe9d6] mb-2">Contact Messages</h1>
            <p className="text-[#efe9d6]/60">Manage and respond to contact form submissions</p>
          </div>
          <button
            onClick={handleRefresh}
            disabled={refreshing}
            className="flex items-center gap-2 px-4 py-2 bg-[#232323]/40 border border-[#c9a227]/20 rounded-xl text-[#c9a227] hover:bg-[#c9a227]/10 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <RefreshCw className={`w-5 h-5 ${refreshing ? 'animate-spin' : ''}`} />
            {refreshing ? 'Refreshing...' : 'Refresh'}
          </button>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Total Messages</div>
            <div className="text-2xl font-bold text-[#c9a227]">{stats.total}</div>
          </div>
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">New</div>
            <div className="text-2xl font-bold text-green-400">{stats.new}</div>
          </div>
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Read</div>
            <div className="text-2xl font-bold text-blue-400">{stats.read}</div>
          </div>
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Responded</div>
            <div className="text-2xl font-bold text-[#c9a227]">{stats.responded}</div>
          </div>
          <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-4">
            <div className="text-[#efe9d6]/60 text-sm mb-1">Archived</div>
            <div className="text-2xl font-bold text-gray-400">{stats.archived}</div>
          </div>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#c9a227]" />
            <input
              type="text"
              placeholder="Search messages by name, email, company or message..."
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
            <option value="all">All Messages</option>
            <option value="new">New Only</option>
            <option value="read">Read Only</option>
            <option value="responded">Responded</option>
            <option value="archived">Archived</option>
          </select>
        </div>

        {/* Messages Table */}
        <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-[#c9a227]/10">
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Status</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Name</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Email</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Service</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Date</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {[1, 2, 3].map((i) => (
                    <TableRowSkeleton key={i} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : filteredMessages.length === 0 ? (
            <div className="text-center py-12 text-[#efe9d6]/60">
              <Mail className="w-12 h-12 mx-auto mb-4 text-[#c9a227]/40" />
              <p>No messages found</p>
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
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Name</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Email</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Service</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Date</th>
                    <th className="text-left px-6 py-4 text-[#efe9d6] text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredMessages.map(msg => (
                    <tr
                      key={msg.id}
                      className={`border-b border-[#c9a227]/5 hover:bg-[#232323]/60 transition-colors cursor-pointer ${deletingIds.includes(msg.id) ? 'opacity-50' : ''}`}
                      onClick={() => !deletingIds.includes(msg.id) && setSelected(msg)}
                    >
                      <td className="px-6 py-4">
                        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs border ${getStatusColor(msg.status)}`}>
                          {getStatusIcon(msg.status)}
                          <span>{msg.status.charAt(0).toUpperCase() + msg.status.slice(1)}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <User className="w-4 h-4 text-[#c9a227]" />
                          <span className="text-[#efe9d6]">{msg.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[#efe9d6]/80">{msg.email}</td>
                      <td className="px-6 py-4">
                        <span className="text-[#efe9d6]/70 text-sm">{msg.service}</span>
                      </td>
                      <td className="px-6 py-4 text-[#efe9d6]/60 text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          {formatDate(msg.createdAt)}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex gap-2">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              updateStatus(msg.id, 'read');
                            }}
                            disabled={updatingIds.includes(msg.id) || deletingIds.includes(msg.id)}
                            className="p-2 bg-blue-500/20 border border-blue-500/30 rounded-lg text-blue-300 hover:bg-blue-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Mark as Read"
                          >
                            {updatingIds.includes(msg.id) && msg.status !== 'read' ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Eye className="w-4 h-4" />
                            )}
                          </button>
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              deleteMessagePermanently(msg.id, msg.name);
                            }}
                            disabled={deletingIds.includes(msg.id)}
                            className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                            title="Delete Permanently"
                          >
                            {deletingIds.includes(msg.id) ? (
                              <RefreshCw className="w-4 h-4 animate-spin" />
                            ) : (
                              <Trash2 className="w-4 h-4" />
                            )}
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

        {/* Message Count */}
        {!loading && (
          <div className="mt-4 text-sm text-[#efe9d6]/40">
            Showing {filteredMessages.length} of {messages.length} messages
          </div>
        )}

        {/* Message Detail Modal */}
        {selected && (
          <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-6">
            <div className="bg-[#232323] backdrop-blur-xl border border-[#c9a227]/20 rounded-3xl p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-[#efe9d6] mb-2">Message Details</h2>
                  <div className="flex items-center gap-2">
                    <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm border ${getStatusColor(selected.status)}`}>
                      {getStatusIcon(selected.status)}
                      <span>{selected.status.charAt(0).toUpperCase() + selected.status.slice(1)}</span>
                    </div>
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
                {/* Sender Info */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[#efe9d6]/60 text-sm">Name</label>
                    <div className="flex items-center gap-2 p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                      <User className="w-5 h-5 text-[#c9a227]" />
                      <span className="text-[#efe9d6]">{selected.name}</span>
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

                {/* Service */}
                <div className="space-y-2">
                  <label className="text-[#efe9d6]/60 text-sm">Service Interested In</label>
                  <div className="p-3 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                    <span className="text-[#c9a227] font-medium">{selected.service}</span>
                  </div>
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <label className="text-[#efe9d6]/60 text-sm">Message</label>
                  <div className="p-4 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                    <p className="text-[#efe9d6] leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                </div>

                {/* Metadata */}
                <div className="space-y-2">
                  <label className="text-[#efe9d6]/60 text-sm">Metadata</label>
                  <div className="p-4 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
                    <div className="text-[#efe9d6]/70 text-sm space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium">Message ID:</span>
                        <code className="bg-[#232323]/60 px-2 py-1 rounded text-xs">{selected.id}</code>
                      </div>
                      <div><span className="font-medium">Source:</span> {selected.source}</div>
                      <div className="truncate">
                        <span className="font-medium">User Agent:</span> {selected.userAgent?.substring(0, 80)}...
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-[#c9a227]/10">
                  <a
                    href={`mailto:${selected.email}?subject=Re: Your inquiry to Raynova&body=Dear ${selected.name},%0D%0A%0D%0AThank you for contacting us regarding "${selected.service}".%0D%0A%0D%0A`}
                    className="flex-1 bg-gradient-to-r from-[#c9a227] to-[#d4b13f] text-[#0f0f0f] font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-all text-center flex items-center justify-center gap-2"
                  >
                    <MailOpen className="w-5 h-5" />
                    Reply via Email
                  </a>
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateStatus(selected.id, 'responded')}
                      disabled={updatingIds.includes(selected.id) || deletingIds.includes(selected.id)}
                      className="flex-1 bg-gradient-to-r from-[#0e3b2c] to-[#1a5c46] text-[#efe9d6] font-semibold py-3 px-6 rounded-xl hover:opacity-90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {updatingIds.includes(selected.id) ? (
                        <RefreshCw className="w-5 h-5 animate-spin" />
                      ) : (
                        <CheckCircle className="w-5 h-5" />
                      )}
                      Mark as Responded
                    </button>
                    <button
                      onClick={() => {
                        archiveMessage(selected.id);
                        setSelected(null);
                      }}
                      disabled={updatingIds.includes(selected.id) || deletingIds.includes(selected.id)}
                      className="flex-1 bg-gradient-to-r from-yellow-500/20 to-yellow-600/20 text-yellow-300 border border-yellow-500/30 font-semibold py-3 px-6 rounded-xl hover:bg-yellow-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      <XCircle className="w-5 h-5" />
                      Archive
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      deleteMessagePermanently(selected.id, selected.name);
                    }}
                    disabled={deletingIds.includes(selected.id)}
                    className="flex-1 bg-gradient-to-r from-red-500/20 to-red-600/20 text-red-300 border border-red-500/30 font-semibold py-3 px-6 rounded-xl hover:bg-red-500/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {deletingIds.includes(selected.id) ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <Trash2 className="w-5 h-5" />
                    )}
                    Delete Permanently
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}