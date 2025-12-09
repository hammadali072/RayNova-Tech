import { useState, useEffect } from 'react';
import { db } from '../../firebase';
import { ref, push, onValue, remove, update } from 'firebase/database';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Plus, Trash2, Edit2, X, Save } from 'lucide-react';
import { GradientButton } from '../../components/GradientButton';

export function AddServicePage() {
  const [services, setServices] = useState<any[]>([]);
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);
  const [serviceAltText, setServiceAltText] = useState('');

  // Edit state
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  // Fetch all services on mount and listen for changes
  useEffect(() => {
    const servicesRef = ref(db, 'services');
    const unsubscribe = onValue(servicesRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Convert object to array with id
        const servicesArray = Object.entries(data).map(([id, value]) => ({ id, ...(value as Record<string, any>) }));
        setServices(servicesArray);
      } else {
        setServices([]);
      }
    });
    return () => unsubscribe();
  }, []);

  const addFeature = () => {
    setFeatures([...features, '']);
  };

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features];
    newFeatures[index] = value;
    setFeatures(newFeatures);
  };

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const validFeatures = features.filter(f => f.trim() !== '');

    if (isEditMode && editingServiceId) {
      // Update existing service
      const updatedService = {
        serviceName,
        serviceDescription,
        serviceAltText,
        features: validFeatures,
        updatedAt: new Date().toISOString()
      };


      const serviceRef = ref(db, `services/${editingServiceId}`);
      update(serviceRef, updatedService)
        .then(() => {
          alert('Service updated successfully!');
          resetForm();
        })
        .catch((error) => {
          alert('Error updating service: ' + error.message);
        });
    } else {
      // Add new service
      const newService = {
        serviceName,
        serviceDescription,
        serviceAltText,
        features: validFeatures,
        createdAt: new Date().toISOString()
      };

      push(ref(db, 'services'), newService)
        .then(() => {
          alert('Service added successfully!');
          resetForm();
        })
        .catch((error) => {
          alert('Error adding service: ' + error.message);
        });
    }
  };

  const handleEditService = (service: any) => {
    setEditingServiceId(service.id);
    setIsEditMode(true);

    // Populate form with service data
    setServiceName(service.serviceName || '');
    setServiceDescription(service.serviceDescription || '');
    setServiceAltText(service.serviceAltText || '');

    if (service.features && service.features.length > 0) {
      setFeatures(service.features);
    } else {
      setFeatures(['']);
    }

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteService = (serviceId: string, serviceName: string) => {
    if (window.confirm(`Are you sure you want to delete "${serviceName}"? This action cannot be undone.`)) {
      const serviceRef = ref(db, `services/${serviceId}`);
      remove(serviceRef)
        .then(() => {
          alert('Service deleted successfully!');
        })
        .catch((error) => {
          alert('Error deleting service: ' + error.message);
        });
    }
  };

  const cancelEdit = () => {
    setIsEditMode(false);
    setEditingServiceId(null);
    resetForm();
  };

  const resetForm = () => {
    setServiceName('');
    setServiceDescription('');
    setServiceAltText('');
    setFeatures(['']);
  };

  return (
    <AdminLayout activePage="services">
      <div className="max-w-5xl mx-auto">
        {/* Header with edit mode indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-[#efe9d6] mb-2">
                {isEditMode ? 'Edit Service' : 'Add New Service'}
              </h2>
              <p className="text-[#efe9d6]/60">
                {isEditMode ? 'Edit existing service details' : 'Create a new service offering for your website'}
              </p>
            </div>
            {isEditMode && (
              <button
                type="button"
                onClick={cancelEdit}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-300 hover:bg-red-500/30 transition-all"
              >
                <X className="w-4 h-4" />
                Cancel Edit
              </button>
            )}
          </div>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#efe9d6]">Service Details</h3>
              {isEditMode && (
                <div className="flex items-center gap-2 px-3 py-1 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-lg text-[#efe9d6] text-sm">
                  <Edit2 className="w-3 h-3" />
                  Editing Mode
                </div>
              )}
            </div>

            <div className="space-y-8">
              {/* Service Name */}
              <div className="space-y-2">
                <label htmlFor="serviceName" className="text-[#efe9d6] text-sm block">
                  Service Name *
                </label>
                <input
                  type="text"
                  id="serviceName"
                  value={serviceName}
                  onChange={(e) => setServiceName(e.target.value)}
                  required
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                  placeholder="E.g., AI-Powered Website Development"
                />
              </div>

              {/* Service Description */}
              <div className="space-y-2">
                <label htmlFor="serviceDescription" className="text-[#efe9d6] text-sm block">
                  Service Description *
                </label>
                <textarea
                  id="serviceDescription"
                  value={serviceDescription}
                  onChange={(e) => setServiceDescription(e.target.value)}
                  required
                  rows={5}
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 resize-none"
                  placeholder="Describe the service in detail..."
                />
              </div>

              {/* Service Alt Text */}
              <div className="space-y-2">
                <label htmlFor="serviceAltText" className="text-[#efe9d6] text-sm block">
                  Service Image Alt Text *
                </label>
                <input
                  type="text"
                  id="serviceAltText"
                  value={serviceAltText}
                  onChange={(e) => setServiceAltText(e.target.value)}
                  required
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                  placeholder="Describe the service image (for SEO & accessibility)"
                />
              </div>


              {/* Features Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <label className="text-[#efe9d6] text-sm">
                    Features (Bullet Points) *
                  </label>
                  <button
                    type="button"
                    onClick={addFeature}
                    className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-[#c9a227]/20 to-[#0e3b2c]/20 border border-[#c9a227]/30 rounded-lg text-[#c9a227] hover:bg-[#c9a227]/30 transition-all text-sm"
                  >
                    <Plus className="w-4 h-4" />
                    Add Feature
                  </button>
                </div>

                <div className="space-y-3">
                  {features.map((feature, index) => (
                    <div key={index} className="flex items-center gap-3">
                      <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-[#c9a227]/20 flex items-center justify-center text-[#c9a227] text-sm">
                        {index + 1}
                      </div>
                      <input
                        type="text"
                        value={feature}
                        onChange={(e) => updateFeature(index, e.target.value)}
                        placeholder="Enter feature..."
                        className="flex-1 bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                      />
                      {features.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFeature(index)}
                          className="flex-shrink-0 w-10 h-10 rounded-lg border border-[#c9a227]/20 flex items-center justify-center text-[#efe9d6]/60 hover:text-red-400 hover:border-red-400/40 transition-all"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {features.length === 0 && (
                  <div className="text-center py-8 text-[#efe9d6]/40 border border-dashed border-[#c9a227]/20 rounded-xl">
                    Click "Add Feature" to add service features
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex justify-end gap-4 mt-8">
            {isEditMode && (
              <button
                type="button"
                onClick={cancelEdit}
                className="px-8 py-3 border border-red-500/40 text-red-300 rounded-xl hover:bg-red-500/10 transition-all"
              >
                Cancel Edit
              </button>
            )}
            <button
              type="button"
              onClick={resetForm}
              className="px-8 py-3 border border-[#c9a227]/40 text-[#efe9d6] rounded-xl hover:bg-[#c9a227]/10 transition-all"
            >
              Reset Form
            </button>
            <GradientButton size="lg" type="submit">
              {isEditMode ? (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Update Service
                </>
              ) : (
                'Add Service'
              )}
            </GradientButton>
          </div>
        </form>

        {/* List of Added Services */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#efe9d6] text-lg">All Services</h3>
            <div className="text-sm text-[#efe9d6]/60">{services.length} services</div>
          </div>

          {services.length === 0 ? (
            <div className="text-center py-12 text-[#efe9d6]/40 border-2 border-dashed border-[#c9a227]/20 rounded-xl">
              No services added yet. Add your first service above!
            </div>
          ) : (
            <div className="space-y-6">
              {services.map(service => {
                const date = service.createdAt ? new Date(service.createdAt) : new Date();
                const formattedDate = date.toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                });

                return (
                  <div key={service.id} className="group bg-[#232323]/40 border border-[#c9a227]/10 rounded-xl p-6 hover:border-[#c9a227]/30 transition-all">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="text-[#c9a227] text-xl font-semibold mb-1">{service.serviceName}</h4>
                        <div className="text-xs text-[#efe9d6]/40">
                          Added: {formattedDate}
                          {service.updatedAt && (
                            <span className="ml-3">
                              Updated: {new Date(service.updatedAt).toLocaleDateString('en-US', {
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditService(service)}
                          className="p-2 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-lg text-[#c9a227] hover:bg-[#c9a227]/30 transition-all"
                          title="Edit Service"
                        >
                          <Edit2 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleDeleteService(service.id, service.serviceName)}
                          className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
                          title="Delete Service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    <p className="text-[#efe9d6]/80 mb-4">{service.serviceDescription}</p>

                    {service.features && service.features.length > 0 && (
                      <div>
                        <div className="text-sm text-[#efe9d6]/60 mb-2">Features:</div>
                        <ul className="space-y-2">
                          {service.features.map((feature: string, idx: number) => (
                            <li key={idx} className="flex items-start gap-2">
                              <span className="text-[#c9a227] mt-1">•</span>
                              <span className="text-[#efe9d6]/70">{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Feature Count */}
                    <div className="mt-4 pt-4 border-t border-[#c9a227]/10">
                      <div className="text-xs text-[#efe9d6]/40">
                        {service.features?.length || 0} features • ID: {service.id.substring(0, 8)}...
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </AdminLayout>
  );
}