import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Plus, Trash2 } from 'lucide-react';
import { GradientButton } from '../../components/GradientButton';

export function AddServicePage() {
  const [serviceName, setServiceName] = useState('');
  const [serviceDescription, setServiceDescription] = useState('');
  const [features, setFeatures] = useState<string[]>(['']);

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
    console.log({
      serviceName,
      serviceDescription,
      features: validFeatures
    });
    // Reset form
    setServiceName('');
    setServiceDescription('');
    setFeatures(['']);
    alert('Service added successfully!');
  };

  return (
    <AdminLayout activePage="services">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-[#efe9d6] mb-2">Add New Service</h2>
          <p className="text-[#efe9d6]/60">Create a new service offering for your website</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-8">
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

          {/* Submit */}
          <div className="flex justify-end gap-4 mt-8">
            <button
              type="button"
              className="px-8 py-3 border border-[#c9a227]/40 text-[#efe9d6] rounded-xl hover:bg-[#c9a227]/10 transition-all"
            >
              Cancel
            </button>
            <GradientButton size="lg">
              Add Service
            </GradientButton>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
