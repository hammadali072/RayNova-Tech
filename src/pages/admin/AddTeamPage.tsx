import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Upload, User } from 'lucide-react';
import { GradientButton } from '../../components/GradientButton';

export function AddTeamPage() {
  const [formData, setFormData] = useState({
    memberName: '',
    designation: '',
    email: '',
    phone: '',
    linkedin: '',
    twitter: '',
    bio: ''
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      ...formData,
      photo: photo?.name
    });
    // Reset form
    setFormData({
      memberName: '',
      designation: '',
      email: '',
      phone: '',
      linkedin: '',
      twitter: '',
      bio: ''
    });
    setPhoto(null);
    setPhotoPreview('');
    alert('Team member added successfully!');
  };

  return (
    <AdminLayout activePage="team">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-[#efe9d6] mb-2">Add Team Member</h2>
          <p className="text-[#efe9d6]/60">Add a new team member to your leadership section</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-3 gap-8">
            {/* Photo Upload - Left Side */}
            <div className="md:col-span-1">
              <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-6 sticky top-8">
                <h3 className="text-[#efe9d6] mb-4 text-sm">Member Photo *</h3>
                
                <div className="space-y-4">
                  {/* Preview */}
                  <div className="aspect-square rounded-2xl overflow-hidden bg-[#0f0f0f]/60 border border-[#c9a227]/20 flex items-center justify-center">
                    {photoPreview ? (
                      <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <User className="w-20 h-20 text-[#efe9d6]/20" />
                    )}
                  </div>

                  {/* Upload Button */}
                  <input
                    type="file"
                    id="photo"
                    onChange={handlePhotoChange}
                    accept="image/*"
                    className="hidden"
                    required={!photoPreview}
                  />
                  <label
                    htmlFor="photo"
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl text-[#c9a227] cursor-pointer hover:bg-[#c9a227]/10 hover:border-[#c9a227]/40 transition-all text-sm"
                  >
                    <Upload className="w-4 h-4" />
                    {photoPreview ? 'Change Photo' : 'Upload Photo'}
                  </label>

                  <p className="text-[#efe9d6]/40 text-xs text-center">
                    Recommended: Square image, min 400x400px
                  </p>
                </div>
              </div>
            </div>

            {/* Form Fields - Right Side */}
            <div className="md:col-span-2">
              <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-8">
                <h3 className="text-[#efe9d6] mb-6">Member Information</h3>

                <div className="space-y-6">
                  {/* Member Name */}
                  <div className="space-y-2">
                    <label htmlFor="memberName" className="text-[#efe9d6] text-sm block">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      id="memberName"
                      name="memberName"
                      value={formData.memberName}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Designation */}
                  <div className="space-y-2">
                    <label htmlFor="designation" className="text-[#efe9d6] text-sm block">
                      Designation / Role *
                    </label>
                    <input
                      type="text"
                      id="designation"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      required
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                      placeholder="Chief Technology Officer"
                    />
                  </div>

                  {/* Contact Information */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[#efe9d6] text-sm block">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="john@raynova.tech"
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="phone" className="text-[#efe9d6] text-sm block">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="+1 (555) 000-0000"
                      />
                    </div>
                  </div>

                  {/* Social Media */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="linkedin" className="text-[#efe9d6] text-sm block">
                        LinkedIn Profile
                      </label>
                      <input
                        type="url"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin}
                        onChange={handleChange}
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="https://linkedin.com/in/..."
                      />
                    </div>

                    <div className="space-y-2">
                      <label htmlFor="twitter" className="text-[#efe9d6] text-sm block">
                        Twitter / X Profile
                      </label>
                      <input
                        type="url"
                        id="twitter"
                        name="twitter"
                        value={formData.twitter}
                        onChange={handleChange}
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="https://twitter.com/..."
                      />
                    </div>
                  </div>

                  {/* Bio */}
                  <div className="space-y-2">
                    <label htmlFor="bio" className="text-[#efe9d6] text-sm block">
                      Short Bio *
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 resize-none"
                      placeholder="Brief professional bio highlighting expertise and achievements..."
                    />
                  </div>
                </div>
              </div>

              {/* Submit */}
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  className="px-8 py-3 border border-[#c9a227]/40 text-[#efe9d6] rounded-xl hover:bg-[#c9a227]/10 transition-all"
                >
                  Cancel
                </button>
                <GradientButton size="lg">
                  Add Team Member
                </GradientButton>
              </div>
            </div>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
