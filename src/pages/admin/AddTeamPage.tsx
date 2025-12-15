import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Trash2, Edit2, X, Plus, Linkedin, Twitter, Mail, Loader2 } from 'lucide-react';
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

export function AddTeamPage() {
  const { currentUser } = useAuth();
  const [memberName, setMemberName] = useState('');
  const [designation, setDesignation] = useState('');
  const [bio, setBio] = useState('');
  const [photoURL, setPhotoURL] = useState('');
  const [photoPreview, setPhotoPreview] = useState('');
  const [isPhotoUrlValid, setIsPhotoUrlValid] = useState(false);
  const [socials, setSocials] = useState({
    linkedin: '',
    twitter: '',
    email: ''
  });

  const [teamMembers, setTeamMembers] = useState<any[]>([]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const API_URL = 'http://127.0.0.1:5000/api/team';

  const fetchTeam = async () => {
      try {
          const response = await fetch(API_URL);
          const data = await response.json();
          setTeamMembers(data);
      } catch (err) {
          console.error("Failed to fetch team", err);
          toast.error("Failed to fetch team members");
      }
  };

  useEffect(() => {
    fetchTeam();
  }, []);

  const handlePhotoFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPhotoPreview(base64String);
      setPhotoURL(base64String);
      setIsPhotoUrlValid(true);
    };
    reader.onerror = () => {
        toast.error('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const handlePhotoUrlChange = (url: string) => {
    setPhotoURL(url);
    try {
        new URL(url);
        setIsPhotoUrlValid(true);
        setPhotoPreview(url);
    } catch {
        setIsPhotoUrlValid(false);
        setPhotoPreview('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const memberData = {
        memberName,
        designation,
        bio,
        photoURL,
        linkedin: socials.linkedin,
        twitter: socials.twitter,
        email: socials.email
      };

      const token = currentUser?.token;

      if (isEditMode && editingMemberId) {
        const response = await fetch(`${API_URL}/${editingMemberId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(memberData)
        });
        if(!response.ok) throw new Error('Failed to update member');

        toast.success('Team member updated successfully!');
      } else {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(memberData)
        });
        if(!response.ok) throw new Error('Failed to add member');

        toast.success('Team member added successfully!');
      }

      resetForm();
      fetchTeam();
    } catch (err: any) {
      console.error('Failed to save team member', err);
      toast.error('Failed to save: ' + err.message);
    }
  };

  const resetForm = () => {
    setMemberName('');
    setDesignation('');
    setBio('');
    setPhotoURL('');
    setPhotoPreview('');
    setIsPhotoUrlValid(false);
    setSocials({ linkedin: '', twitter: '', email: '' });
    setIsEditMode(false);
    setEditingMemberId(null);
  };

  const handleEdit = (member: any) => {
    setEditingMemberId(member.id);
    setIsEditMode(true);
    setMemberName(member.memberName);
    setDesignation(member.designation);
    setBio(member.bio || '');
    setPhotoURL(member.photoURL || '');
    setPhotoPreview(member.photoURL || '');
    setIsPhotoUrlValid(!!member.photoURL);
    setSocials({
      linkedin: member.linkedin || '',
      twitter: member.twitter || '',
      email: member.email || ''
    });
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
        if(!response.ok) throw new Error('Failed to delete member');
        
        toast.success('Member removed successfully');
        fetchTeam();
    } catch (err: any) {
        console.error('Failed to delete member', err);
        toast.error('Failed to delete: ' + err.message);
    } finally {
        setIsDeleting(false);
        setDeleteId(null);
    }
  };

  return (
    <AdminLayout activePage="team">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8 flex justify-between items-center">
          <div>
            <h2 className="text-[#efe9d6] mb-2">
              {isEditMode ? 'Edit Team Member' : 'Add Team Member'}
            </h2>
            <p className="text-[#efe9d6]/60">Manage your leadership team members</p>
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
                <label className="text-[#efe9d6] text-sm block">Full Name *</label>
                <input
                  required
                  value={memberName}
                  onChange={(e) => setMemberName(e.target.value)}
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none transition-all"
                  placeholder="e.g. John Doe"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#efe9d6] text-sm block">Designation *</label>
                <input
                  required
                  value={designation}
                  onChange={(e) => setDesignation(e.target.value)}
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none transition-all"
                  placeholder="e.g. CEO & Founder"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#efe9d6] text-sm block">Bio</label>
                <textarea
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  rows={3}
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none transition-all resize-none"
                  placeholder="Short bio..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[#efe9d6] text-sm block">Photo</label>
                <div className="flex flex-col gap-3">
                    <input
                        value={photoURL.startsWith('data:') ? '' : photoURL}
                        onChange={(e) => handlePhotoUrlChange(e.target.value)}
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none transition-all"
                        placeholder="Image URL..."
                    />
                    <div className="flex items-center gap-3">
                         <span className="text-[#efe9d6]/40 text-sm">OR</span>
                        <label className="px-4 py-2 bg-[#232323] border border-[#c9a227]/20 rounded-lg text-[#efe9d6] text-sm cursor-pointer hover:bg-[#232323]/80 transition-all flex items-center gap-2">
                             <Plus className="w-4 h-4" />
                            Upload Image
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files?.[0];
                                    if(file) handlePhotoFileChange(file);
                                }}
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
                 {photoPreview && (
                    <div className="mt-3 w-32 h-32 rounded-xl overflow-hidden border border-[#c9a227]/10">
                        <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                    </div>
                 )}
              </div>

              <div className="pt-4 border-t border-[#c9a227]/10 space-y-4">
                <h4 className="text-[#efe9d6] text-sm font-medium">Social Links</h4>
                <div className="grid gap-4">
                  <div className="relative">
                    <Linkedin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#efe9d6]/40" />
                    <input
                      value={socials.linkedin}
                      onChange={(e) => setSocials({ ...socials, linkedin: e.target.value })}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl pl-10 pr-4 py-3 text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none transition-all"
                      placeholder="LinkedIn Profile URL"
                    />
                  </div>
                  <div className="relative">
                    <Twitter className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#efe9d6]/40" />
                    <input
                      value={socials.twitter}
                      onChange={(e) => setSocials({ ...socials, twitter: e.target.value })}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl pl-10 pr-4 py-3 text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none transition-all"
                      placeholder="Twitter Profile URL"
                    />
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#efe9d6]/40" />
                    <input
                      value={socials.email}
                      onChange={(e) => setSocials({ ...socials, email: e.target.value })}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl pl-10 pr-4 py-3 text-[#efe9d6] focus:border-[#c9a227]/60 focus:outline-none transition-all"
                      placeholder="Email Address"
                    />
                  </div>
                </div>
              </div>

              <div className="pt-4">
                <GradientButton className="w-full justify-center">
                  {isEditMode ? 'Update Member' : 'Add Member'}
                </GradientButton>
              </div>
            </form>
          </div>

          {/* List */}
          <div className="space-y-4">
            <h3 className="text-[#efe9d6] mb-4">Current Team ({teamMembers.length})</h3>
            <div className="grid gap-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-xl p-4 flex items-center gap-4 group hover:border-[#c9a227]/30 transition-all">
                  <div className="w-16 h-16 rounded-lg overflow-hidden border border-[#c9a227]/10 flex-shrink-0">
                    <img src={member.photoURL || 'https://via.placeholder.com/100'} alt={member.memberName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-[#efe9d6] font-medium truncate">{member.memberName}</h4>
                    <p className="text-[#c9a227] text-sm truncate">{member.designation}</p>
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={() => handleEdit(member)}
                      className="p-2 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-lg text-[#c9a227] hover:bg-[#c9a227]/30 transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteId(member.id)}
                      className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
              {teamMembers.length === 0 && (
                <div className="text-[#efe9d6]/40 text-center py-8">No team members added yet.</div>
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
              This action cannot be undone. This will permanently delete the team member.
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