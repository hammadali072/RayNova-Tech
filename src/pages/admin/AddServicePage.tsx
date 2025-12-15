import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Trash2, Edit2, X, Plus, Loader2 } from 'lucide-react';
import { GradientButton } from '../../components/GradientButton';
import { useAuth } from '../../contexts/AuthContext';
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

export function AddServicePage() {
  const { currentUser } = useAuth();
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [features, setFeatures] = useState<string[]>([]);
  const [currentFeature, setCurrentFeature] = useState('');
  const [services, setServices] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const API_URL = 'http://localhost:5000/api/services';

  const fetchServices = async () => {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setServices(data);
    } catch(err) {
        console.error("Failed to fetch services", err);
        toast.error('Failed to fetch services');
    }
  };

  useEffect(() => {
    fetchServices();
  }, []);

  const handleAddFeature = () => {
    if (currentFeature.trim()) {
      setFeatures([...features, currentFeature.trim()]);
      setCurrentFeature('');
    }
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const resetForm = () => {
    setServiceName('');
    setServiceDescription('');
    setFeatures([]);
    setCurrentFeature('');
    setIsEditMode(false);
    setEditingId(null);
  };

  const handleEdit = (service: any) => {
    setIsEditMode(true);
    setEditingId(service.id);
    setServiceName(service.serviceName);
    setServiceDescription(service.serviceDescription);
    setFeatures(service.features || []);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const confirmDelete = async () => {
    if (!deleteId) return;

    setIsDeleting(true);
    try {
        const token = currentUser?.token;
        const response = await fetch(`${API_URL}/${deleteId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if(!response.ok) throw new Error('Failed to delete');
        
        toast.success('Service deleted successfully');
        fetchServices();
    } catch(err: any) {
        console.error('Failed to delete service', err);
        toast.error('Failed to delete: ' + err.message);
    } finally {
        setIsDeleting(false);
        setDeleteId(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        serviceName,
        serviceDescription,
        features
      };

      const token = currentUser?.token;

      if (isEditMode && editingId) {
        const response = await fetch(`${API_URL}/${editingId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok) throw new Error('Failed to update');
        toast.success('Service updated successfully');
      } else {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });
        if(!response.ok) throw new Error('Failed to add');
        toast.success('Service added successfully');
      }
      resetForm();
      fetchServices();
    } catch (err: any) {
      console.error('Failed to save service', err);
      toast.error('Error: ' + err.message);
    }
  };

  return (
    <AdminLayout activePage="services">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-[#efe9d6] mb-2">
              {isEditMode ? 'Edit Service' : 'Add New Service'}
            </h2>
            <p className="text-[#efe9d6]/60">Manage your service offerings</p>
          </div>
          {isEditMode && (
            <button
              onClick={resetForm}
              className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all"
            >
              <X className="w-4 h-4" />
              Cancel Edit
            </button>
          )}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-6 lg:p-8 h-fit">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label className="text-[#efe9d6] text-sm block">Service Name *</label>
                <input
                  required
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none transition-all"
                  placeholder="e.g. AI Consulting"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#efe9d6] text-sm block">Description *</label>
                <textarea
                  required
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  rows={4}
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none transition-all resize-none"
                  placeholder="Service description..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#efe9d6] text-sm block">Features</label>
                <div className="flex gap-2">
                  <input
                    value={currentFeature}
                    onChange={(e) => setCurrentFeature(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddFeature())}
                    className="flex-1 bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none transition-all"
                    placeholder="Add a feature..."
                  />
                  <button
                    type="button"
                    onClick={handleAddFeature}
                    className="px-4 py-2 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-xl text-[#c9a227] hover:bg-[#c9a227]/30 transition-all"
                  >
                    <Plus className="w-5 h-5" />
                  </button>
                </div>
                
                {features.length > 0 && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {features.map((feature, index) => (
                      <span key={index} className="flex items-center gap-2 px-3 py-1 bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-lg text-[#efe9d6] text-sm">
                        {feature}
                        <button type="button" onClick={() => removeFeature(index)} className="text-[#efe9d6]/40 hover:text-red-400">
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-4">
                <GradientButton className="w-full justify-center">
                  {isEditMode ? 'Update Service' : 'Add Service'}
                </GradientButton>
              </div>
            </form>
          </div>

          {/* List */}
          <div className="space-y-4">
            <h3 className="text-[#efe9d6] mb-4">Current Services ({services.length})</h3>
            <div className="grid gap-4">
              {services.map((service) => (
                <div key={service.id} className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-xl p-5 group hover:border-[#c9a227]/30 transition-all">
                  <div className="flex justify-between items-start mb-2">
                    <h4 className="text-[#efe9d6] font-medium text-lg">{service.serviceName}</h4>
                    <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleEdit(service)}
                        className="p-2 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-lg text-[#c9a227] hover:bg-[#c9a227]/30 transition-all"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setDeleteId(service.id)}
                        className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <p className="text-[#efe9d6]/70 text-sm mb-3 line-clamp-2">{service.serviceDescription}</p>
                  {service.features && service.features.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {service.features.slice(0, 3).map((f: string, i: number) => (
                            <span key={i} className="text-xs px-2 py-1 bg-[#0f0f0f]/40 rounded text-[#efe9d6]/50">{f}</span>
                        ))}
                    </div>
                  )}
                </div>
              ))}
              {services.length === 0 && (
                <div className="text-[#efe9d6]/40 text-center py-8">No services added yet.</div>
              )}
            </div>
          </div>
        </div>
      </div>

      <AlertDialog open={!!deleteId} onOpenChange={(open) => !open && setDeleteId(null)}>
        <AlertDialogContent className="bg-[#232323] border border-[#c9a227]/20 text-[#efe9d6]">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription className="text-[#efe9d6]/60">
              This action cannot be undone. This will permanently delete the service.
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