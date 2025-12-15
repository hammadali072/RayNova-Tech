
import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Mail, Phone, Calendar, Search, Filter, Trash2, CheckCircle, MessageSquare, X, User, Building, MapPin, Clock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'sonner';

export function AdminMessages() {
  const { currentUser } = useAuth();
  const [messages, setMessages] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);

  const API_URL = 'http://localhost:5000/api/contacts';

  const fetchMessages = async () => {
    try {
        const token = currentUser?.token;
        const response = await fetch(API_URL, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const data = await response.json();
        setMessages(data);
    } catch(err) {
        console.error("Failed to fetch messages", err);
        toast.error("Failed to fetch messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Filter messages
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.company?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      msg.message?.toLowerCase().includes(searchTerm.toLowerCase());
    
    let matchesStatus = true;
    if (statusFilter === 'unread') {
        matchesStatus = msg.status === 'new';
    } else if (statusFilter === 'read') {
        matchesStatus = msg.status === 'read' || msg.status === 'responded';
    }

    return matchesSearch && matchesStatus;
  });

  const markAsRead = async (id: string, currentStatus: string) => {
      if (currentStatus !== 'new') return;

      try {
        const token = currentUser?.token;
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status: 'read' })
        });

        if (response.ok) {
            setMessages(prev => prev.map(msg => 
                msg.id === id ? { ...msg, status: 'read' } : msg
            ));
        }
      } catch (error) {
          console.error("Failed to mark as read", error);
      }
  };

  const handleMessageClick = (msg: any) => {
      setSelectedMessage(msg);
      // Removed auto-mark as read
  };

  return (
    <AdminLayout activePage="messages">
      <div className="max-w-7xl mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="mb-6 flex flex-col md:flex-row justify-between md:items-center gap-4">
          <div>
            <h2 className="text-[#efe9d6] mb-1">Messages & Inquiries</h2>
            <p className="text-[#efe9d6]/60 text-sm">Manage contact form submissions</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#efe9d6]/40" />
              <input
                type="text"
                placeholder="Search messages..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="bg-[#232323]/60 border border-[#c9a227]/20 rounded-lg pl-10 pr-4 py-2 text-sm text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none w-full sm:w-64"
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#efe9d6]/40" />
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="bg-[#232323]/60 border border-[#c9a227]/20 rounded-lg pl-10 pr-8 py-2 text-sm text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none appearance-none cursor-pointer"
              >
                <option value="all">All Status</option>
                <option value="unread">Unread</option>
                <option value="read">Read</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-hidden bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl flex flex-col">
          {filteredMessages.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-[#efe9d6]/40 p-12">
              <MessageSquare className="w-12 h-12 mb-4 opacity-50" />
              <p>No messages found matching your criteria</p>
            </div>
          ) : (
            <div className="overflow-y-auto flex-1 p-4 space-y-4">
              {filteredMessages.map((msg) => (
                <div 
                    key={msg.id} 
                    onClick={() => handleMessageClick(msg)}
                    className={`bg-[#232323]/60 border rounded-xl p-5 transition-all group cursor-pointer
                        ${msg.status === 'new' 
                            ? 'border-[#c9a227]/40 shadow-[0_0_15px_rgba(201,162,39,0.1)]' 
                            : 'border-[#c9a227]/10 hover:border-[#c9a227]/30'}
                    `}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold
                          ${msg.status === 'new' 
                              ? 'bg-[#c9a227] text-[#0f0f0f]' 
                              : 'bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 text-[#c9a227]'}
                      `}>
                        {msg.name?.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <h4 className={`font-medium ${msg.status === 'new' ? 'text-[#c9a227]' : 'text-[#efe9d6]'}`}>
                            {msg.name}
                        </h4>
                        <div className="flex items-center gap-2 text-xs text-[#efe9d6]/60">
                          {msg.company && <span>{msg.company} •</span>}
                          <span>{new Date(msg.createdAt).toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                    
                    <span className={`px-2 py-1 rounded text-xs border ${
                      msg.status === 'new' ? 'bg-[#c9a227]/20 border-[#c9a227] text-[#c9a227] font-semibold' :
                      msg.status === 'read' ? 'bg-[#232323] border-[#efe9d6]/20 text-[#efe9d6]/60' :
                      'bg-green-500/10 border-green-500/20 text-green-300'
                    }`}>
                      {msg.status === 'new' ? 'UNREAD' : msg.status?.toUpperCase()}
                    </span>
                  </div>

                  <div className="pl-13 mb-4">
                    <p className={`text-sm whitespace-pre-wrap line-clamp-2 ${msg.status === 'new' ? 'text-[#efe9d6]' : 'text-[#efe9d6]/70'}`}>
                        {msg.message}
                    </p>
                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-[#efe9d6]/50">
                      <div className="flex items-center gap-1.5">
                        <Mail className="w-3 h-3" />
                        {msg.email}
                      </div>
                      {msg.phone && (
                        <div className="flex items-center gap-1.5">
                          <Phone className="w-3 h-3" />
                          {msg.phone}
                        </div>
                      )}
                      {msg.service && (
                        <div className="flex items-center gap-1.5">
                          <div className={`w-1.5 h-1.5 rounded-full ${msg.status === 'new' ? 'bg-[#c9a227]' : 'bg-[#efe9d6]/30'}`} />
                          Interested in: {msg.service}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div 
                className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                onClick={() => setSelectedMessage(null)}
            />
            <div className="relative bg-[#232323] border border-[#c9a227]/20 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col">
                {/* Modal Header */}
                <div className="flex items-center justify-between p-6 border-b border-[#c9a227]/10 bg-[#232323]">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-[#c9a227] text-[#0f0f0f] flex items-center justify-center text-xl font-bold">
                            {selectedMessage.name?.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-[#efe9d6]">{selectedMessage.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-[#efe9d6]/60">
                                <Clock className="w-3.5 h-3.5" />
                                {new Date(selectedMessage.createdAt).toLocaleString()}
                            </div>
                        </div>
                    </div>
                    <button 
                        onClick={() => setSelectedMessage(null)}
                        className="p-2 hover:bg-[#c9a227]/10 rounded-full text-[#efe9d6]/60 hover:text-[#c9a227] transition-colors"
                    >
                        <X className="w-6 h-6" />
                    </button>
                </div>

                {/* Modal Content */}
                <div className="p-6 space-y-6 overflow-y-auto">
                    {/* Contact Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="p-3 bg-[#0f0f0f]/30 rounded-lg border border-[#c9a227]/5">
                            <div className="text-[#efe9d6]/40 text-xs uppercase tracking-wider mb-1">Email</div>
                            <div className="text-[#efe9d6] flex items-center gap-2">
                                <Mail className="w-4 h-4 text-[#c9a227]" />
                                <a href={`mailto:${selectedMessage.email}`} className="hover:text-[#c9a227] transition-colors">
                                    {selectedMessage.email}
                                </a>
                            </div>
                        </div>
                        
                        {selectedMessage.phone && (
                            <div className="p-3 bg-[#0f0f0f]/30 rounded-lg border border-[#c9a227]/5">
                                <div className="text-[#efe9d6]/40 text-xs uppercase tracking-wider mb-1">Phone</div>
                                <div className="text-[#efe9d6] flex items-center gap-2">
                                    <Phone className="w-4 h-4 text-[#c9a227]" />
                                    <a href={`tel:${selectedMessage.phone}`} className="hover:text-[#c9a227] transition-colors">
                                        {selectedMessage.phone}
                                    </a>
                                </div>
                            </div>
                        )}

                        {selectedMessage.company && (
                            <div className="p-3 bg-[#0f0f0f]/30 rounded-lg border border-[#c9a227]/5">
                                <div className="text-[#efe9d6]/40 text-xs uppercase tracking-wider mb-1">Company</div>
                                <div className="text-[#efe9d6] flex items-center gap-2">
                                    <Building className="w-4 h-4 text-[#c9a227]" />
                                    {selectedMessage.company}
                                </div>
                            </div>
                        )}

                        {selectedMessage.service && (
                            <div className="p-3 bg-[#0f0f0f]/30 rounded-lg border border-[#c9a227]/5">
                                <div className="text-[#efe9d6]/40 text-xs uppercase tracking-wider mb-1">Service Interest</div>
                                <div className="text-[#efe9d6] flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-[#c9a227]" />
                                    {selectedMessage.service}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Message Body */}
                    <div className="bg-[#0f0f0f]/50 rounded-xl p-6 border border-[#c9a227]/10">
                        <div className="text-[#efe9d6]/40 text-xs uppercase tracking-wider mb-3 flex items-center gap-2">
                            <MessageSquare className="w-3 h-3" />
                            Message Content
                        </div>
                        <p className="text-[#efe9d6] whitespace-pre-wrap leading-relaxed">
                            {selectedMessage.message}
                        </p>
                    </div>


                </div>

                {/* Modal Footer */}
                <div className="p-6 border-t border-[#c9a227]/10 bg-[#232323] flex justify-end gap-3 rounded-b-2xl">
                    <button
                        onClick={() => setSelectedMessage(null)}
                        className="px-6 py-2.5 rounded-lg border border-[#efe9d6]/10 text-[#efe9d6] hover:bg-[#efe9d6]/5 transition-all text-sm font-medium"
                    >
                        Close
                    </button>
                    {selectedMessage.status === 'new' && (
                        <button
                            onClick={() => {
                                markAsRead(selectedMessage.id, selectedMessage.status);
                                setSelectedMessage(null);
                                toast.success("Marked as read");
                            }}
                            className="px-6 py-2.5 rounded-lg border border-[#c9a227] text-[#c9a227] hover:bg-[#c9a227]/10 transition-all text-sm font-bold flex items-center gap-2"
                        >
                            <CheckCircle className="w-4 h-4" />
                            Mark as Read
                        </button>
                    )}
                    <a
                        href={`mailto:${selectedMessage.email}`}
                        className="px-6 py-2.5 rounded-lg bg-[#c9a227] text-[#0f0f0f] hover:bg-[#d4b13f] transition-all text-sm font-bold flex items-center gap-2 shadow-[0_4px_12px_rgba(201,162,39,0.2)]"
                    >
                        <Mail className="w-4 h-4" />
                        Reply via Email
                    </a>
                </div>
            </div>
        </div>
      )}
    </AdminLayout>
  );
}