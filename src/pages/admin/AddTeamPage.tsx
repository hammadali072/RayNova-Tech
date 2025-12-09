import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Upload, User, Edit, Trash2, X } from 'lucide-react';
import { GradientButton } from '../../components/GradientButton';
import { db } from '../../firebase';
import {
  ref as dbRef,
  push,
  onValue,
  off,
  set,
  query,
  orderByChild,
  remove,
  update
} from 'firebase/database';

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
  const [teams, setTeams] = useState<Array<any>>([]);
  const [submitting, setSubmitting] = useState(false);

  // Edit/Delete Modal States
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState<'edit' | 'delete'>('edit');
  const [selectedMember, setSelectedMember] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    memberName: '',
    designation: '',
    email: '',
    phone: '',
    linkedin: '',
    twitter: '',
    bio: ''
  });
  const [editPhoto, setEditPhoto] = useState<File | null>(null);
  const [editPhotoPreview, setEditPhotoPreview] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  useEffect(() => {
    const teamsQuery = query(dbRef(db, 'teams'), orderByChild('createdAt'));
    const handleValue = (snapshot: any) => {
      const val = snapshot.val();
      if (!val) {
        setTeams([]);
        return;
      }
      const arr: Array<any> = Object.keys(val).map((key) => ({ id: key, ...val[key] }));
      arr.sort((a, b) => (a.createdAt || 0) - (b.createdAt || 0));
      setTeams(arr);
    };

    onValue(teamsQuery, handleValue);

    return () => {
      off(teamsQuery, 'value', handleValue as any);
    };
  }, []);

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
    (async () => {
      try {
        setSubmitting(true);

        // Convert photo to data URL (base64) and store that string in Realtime DB
        let photoURL = '';
        if (photo) {
          const fileToDataUrl = (file: File) =>
            new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onload = () => resolve(reader.result as string);
              reader.onerror = (err) => reject(err);
              reader.readAsDataURL(file);
            });

          photoURL = await fileToDataUrl(photo);
        }

        const teamObj = {
          ...formData,
          photoURL,
          createdAt: Date.now()
        };

        const teamsRef = dbRef(db, 'teams');
        const newRef = push(teamsRef);
        await set(newRef, teamObj);

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
      } catch (err) {
        console.error(err);
        alert('Error adding team member. Check console for details.');
      } finally {
        setSubmitting(false);
      }
    })();
  };

  // Edit Functions
  const handleEditClick = (member: any) => {
    setSelectedMember(member);
    setModalType('edit');
    setEditFormData({
      memberName: member.memberName || '',
      designation: member.designation || '',
      email: member.email || '',
      phone: member.phone || '',
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      bio: member.bio || ''
    });
    setEditPhotoPreview(member.photoURL || '');
    setEditPhoto(null);
    setShowModal(true);
  };

  const handleDeleteClick = (member: any) => {
    setSelectedMember(member);
    setModalType('delete');
    setShowModal(true);
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedMember) return;

    try {
      setSubmitting(true);

      let photoURL = selectedMember.photoURL;
      if (editPhoto) {
        const fileToDataUrl = (file: File) =>
          new Promise<string>((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = (err) => reject(err);
            reader.readAsDataURL(file);
          });

        photoURL = await fileToDataUrl(editPhoto);
      }

      const updatedData = {
        ...editFormData,
        photoURL,
        updatedAt: Date.now()
      };

      const memberRef = dbRef(db, `teams/${selectedMember.id}`);
      await update(memberRef, updatedData);

      alert('Team member updated successfully!');
      setShowModal(false);
      resetEditForm();
    } catch (err) {
      console.error(err);
      alert('Error updating team member. Check console for details.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleDeleteConfirm = async () => {
    if (!selectedMember) return;

    try {
      setSubmitting(true);
      const memberRef = dbRef(db, `teams/${selectedMember.id}`);
      await remove(memberRef);
      alert('Team member deleted successfully!');
      setShowModal(false);
    } catch (err) {
      console.error(err);
      alert('Error deleting team member. Check console for details.');
    } finally {
      setSubmitting(false);
    }
  };

  const handleEditChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditFormData({
      ...editFormData,
      [e.target.name]: e.target.value
    });
  };

  const handleEditPhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setEditPhoto(file);

      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const resetEditForm = () => {
    setEditFormData({
      memberName: '',
      designation: '',
      email: '',
      phone: '',
      linkedin: '',
      twitter: '',
      bio: ''
    });
    setEditPhoto(null);
    setEditPhotoPreview('');
    setSelectedMember(null);
  };

  return (
    <AdminLayout activePage="team">
      <div className="max-w-5xl mx-auto">
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

        {/* Live Team Members List */}
        <div className="mt-12">
          <h3 className="text-[#efe9d6] mb-4">Team Members ({teams.length})</h3>
          {teams.length === 0 ? (
            <p className="text-[#efe9d6]/60">No team members added yet.</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {teams.map((t) => (
                <div key={t.id} className="bg-[#232323]/60 border border-[#c9a227]/10 rounded-2xl p-4 text-left group hover:border-[#c9a227]/30 transition-all duration-300">
                  {/* Edit/Delete Icons */}


                  <div className="flex items-center gap-4">
                    <div className="w-20 h-20 rounded-full overflow-hidden flex-shrink-0">
                      {t.photoURL ? (
                        <img src={t.photoURL} alt={`Photo of ${t.memberName}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full bg-[#0f0f0f]/40 flex items-center justify-center">
                          <User className="w-10 h-10 text-[#efe9d6]/20" />
                        </div>
                      )}
                    </div>

                    <div className="flex-1">
                      <div className="text-[#efe9d6] font-semibold text-lg">{t.memberName || '—'}</div>
                      <div className="text-[#efe9d6]/60 text-sm mb-2">{t.designation || '—'}</div>

                      <div className="text-[#efe9d6]/60 text-sm space-y-1">
                        {t.email && (
                          <div>
                            <span className="font-medium">Email: </span>
                            <a className="text-[#c9a227] hover:underline" href={`mailto:${t.email}`}>{t.email}</a>
                          </div>
                        )}
                        {t.phone && (
                          <div>
                            <span className="font-medium">Phone: </span>
                            <a className="text-[#c9a227] hover:underline" href={`tel:${t.phone}`}>{t.phone}</a>
                          </div>
                        )}
                        {t.linkedin && (
                          <div>
                            <span className="font-medium">LinkedIn: </span>
                            <a className="text-[#c9a227] hover:underline" href={t.linkedin} target="_blank" rel="noreferrer">Profile</a>
                          </div>
                        )}
                        {t.twitter && (
                          <div>
                            <span className="font-medium">Twitter: </span>
                            <a className="text-[#c9a227] hover:underline" href={t.twitter} target="_blank" rel="noreferrer">Profile</a>
                          </div>
                        )}
                      </div>
                      {t.bio && (
                        <p className="text-[#efe9d6]/60 mt-3 text-sm leading-relaxed">{t.bio}</p>
                      )}

                      <div className="mt-3 text-[#efe9d6]/40 text-xs text-right">
                        {t.createdAt ? new Date(t.createdAt).toLocaleString() : ''}
                      </div>
                    </div>
                  </div>

                  <div className="flex gap-2 mb-3">
                    <button
                      onClick={() => handleEditClick(t)}
                      className="p-2 bg-[#c9a227]/10 hover:bg-[#c9a227]/20 border border-[#c9a227]/20 rounded-lg text-[#c9a227] transition-all"
                      title="Edit"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteClick(t)}
                      className="p-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/20 rounded-lg text-red-400 transition-all"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Edit/Delete Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-[#232323]/90 border border-[#c9a227]/20 rounded-2xl p-6 max-w-md w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#efe9d6] text-lg">
                {modalType === 'edit' ? 'Edit Team Member' : 'Delete Team Member'}
              </h3>
              <button
                onClick={() => {
                  setShowModal(false);
                  resetEditForm();
                }}
                className="p-1 hover:bg-[#0f0f0f]/40 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-[#efe9d6]/60" />
              </button>
            </div>

            {/* Modal Content */}
            {modalType === 'edit' ? (
              <form onSubmit={handleEditSubmit}>
                <div className="space-y-6">
                  {/* Photo Upload */}
                  <div className="space-y-4">
                    <label className="text-[#efe9d6] text-sm block">Member Photo</label>
                    <div className="flex flex-col items-center gap-4">
                      <div className="w-32 h-32 rounded-full overflow-hidden bg-[#0f0f0f]/60 border border-[#c9a227]/20">
                        {editPhotoPreview ? (
                          <img src={editPhotoPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <User className="w-12 h-12 text-[#efe9d6]/20" />
                          </div>
                        )}
                      </div>
                      <input
                        type="file"
                        id="editPhoto"
                        onChange={handleEditPhotoChange}
                        accept="image/*"
                        className="hidden"
                      />
                      <label
                        htmlFor="editPhoto"
                        className="px-4 py-2 bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-lg text-[#c9a227] cursor-pointer hover:bg-[#c9a227]/10 hover:border-[#c9a227]/40 transition-all text-sm"
                      >
                        Change Photo
                      </label>
                    </div>
                  </div>

                  {/* Form Fields */}
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <label className="text-[#efe9d6] text-sm block">Full Name *</label>
                      <input
                        type="text"
                        name="memberName"
                        value={editFormData.memberName}
                        onChange={handleEditChange}
                        required
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#efe9d6] text-sm block">Designation *</label>
                      <input
                        type="text"
                        name="designation"
                        value={editFormData.designation}
                        onChange={handleEditChange}
                        required
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#efe9d6] text-sm block">Email *</label>
                      <input
                        type="email"
                        name="email"
                        value={editFormData.email}
                        onChange={handleEditChange}
                        required
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60"
                      />
                    </div>

                    <div className="space-y-2">
                      <label className="text-[#efe9d6] text-sm block">Bio *</label>
                      <textarea
                        name="bio"
                        value={editFormData.bio}
                        onChange={handleEditChange}
                        required
                        rows={3}
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 resize-none"
                      />
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex justify-end gap-3 pt-4 border-t border-[#c9a227]/10">
                    <button
                      type="button"
                      onClick={() => {
                        setShowModal(false);
                        resetEditForm();
                      }}
                      className="px-4 py-2 border border-[#c9a227]/40 text-[#efe9d6] rounded-lg hover:bg-[#c9a227]/10 transition-all"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="px-4 py-2 bg-[#c9a227] text-[#0f0f0f] font-medium rounded-lg hover:bg-[#d4b236] transition-all disabled:opacity-50"
                    >
                      {submitting ? 'Updating...' : 'Update Member'}
                    </button>
                  </div>
                </div>
              </form>
            ) : (
              <div className="space-y-6">
                {/* Delete Confirmation */}
                <div className="text-center">
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                    <Trash2 className="w-10 h-10 text-red-400" />
                  </div>
                  <h4 className="text-[#efe9d6] text-lg mb-2">Delete Team Member?</h4>
                  <p className="text-[#efe9d6]/60 text-sm">
                    Are you sure you want to delete <span className="text-[#c9a227] font-medium">{selectedMember?.memberName}</span>? This action cannot be undone.
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex justify-end gap-3 pt-4 border-t border-[#c9a227]/10">
                  <button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 border border-[#c9a227]/40 text-[#efe9d6] rounded-lg hover:bg-[#c9a227]/10 transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteConfirm}
                    disabled={submitting}
                    className="px-4 py-2 bg-red-500 text-white font-medium rounded-lg hover:bg-red-600 transition-all disabled:opacity-50"
                  >
                    {submitting ? 'Deleting...' : 'Delete Member'}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </AdminLayout>
  );
}