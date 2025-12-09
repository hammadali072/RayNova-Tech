import { useState, useEffect } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Type, Image as ImageIcon, Trash2, Plus, Edit2, X, Save } from 'lucide-react';
import { GradientButton } from '../../components/GradientButton';
import { db } from '../../firebase';
import { ref as dbRef, push, set, onValue, remove, update } from 'firebase/database';

// Helper to check if a string is a valid URL
function isValidUrl(url: string) {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

type ContentBlock = {
  id: string;
  type: 'h1' | 'h2' | 'h3' | 'paragraph' | 'image' | 'list' | 'quote';
  content: string;
  items?: string[];
  alt?: string;
};

export function AddBlogPage() {
  const [blogTitle, setBlogTitle] = useState('');
  const [category, setCategory] = useState('');

  const [featuredImage, setFeaturedImage] = useState('');
  const [featuredPreview, setFeaturedPreview] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  // Author details
  const [authorName, setAuthorName] = useState('');
  const [authorRole, setAuthorRole] = useState('');
  const [authorAvatar, setAuthorAvatar] = useState('');
  const [authorAvatarPreview, setAuthorAvatarPreview] = useState('');
  const [authorBio, setAuthorBio] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const [blogs, setBlogs] = useState<any[]>([]);
  const [uploads, setUploads] = useState<Record<string, number>>({});
  const [previews, setPreviews] = useState<Record<string, string>>({});
  const [fileNames, setFileNames] = useState<Record<string, string>>({});

  // Edit state
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);

  const isUploading = Object.values(uploads).some(v => (typeof v === 'number' && v > 0));

  const handlePhotoChange = (file: File, blockId: string) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setPreviews(prev => ({ ...prev, [blockId]: base64String }));
      setFileNames(prev => ({ ...prev, [blockId]: file.name }));
      updateBlock(blockId, base64String);
      setUploads(prev => {
        const copy = { ...prev };
        delete copy[blockId];
        return copy;
      });
    };
    reader.onerror = () => {
      alert('Failed to read file');
    };
    reader.readAsDataURL(file);
  };

  const handleFeaturedImageChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setFeaturedPreview(base64String);
      setFeaturedImage(base64String);
    };
    reader.onerror = () => {
      alert('Failed to read featured image');
    };
    reader.readAsDataURL(file);
  };

  const handleAuthorAvatarChange = (value: string) => {
    setAuthorAvatar(value);
    if (isValidUrl(value)) {
      setAuthorAvatarPreview(value);
    } else {
      setAuthorAvatarPreview('');
    }
  };

  const handleAuthorAvatarFileChange = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      setAuthorAvatarPreview(base64String);
      setAuthorAvatar(base64String);
    };
    reader.onerror = () => {
      alert('Failed to read author avatar');
    };
    reader.readAsDataURL(file);
  };

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: ''
    };
    setContentBlocks(prev => [...prev, newBlock]);
  };

  const updateBlock = (id: string, content: string) => {
    setContentBlocks(prev => prev.map(block => {
      if (block.id === id) {
        if (block.type === 'image') {
          if (content === '' || isValidUrl(content)) {
            return { ...block, content };
          } else {
            return block;
          }
        }
        return { ...block, content };
      }
      return block;
    }));
  }

  const removeBlock = (id: string) => {
    setContentBlocks(prev => prev.filter(block => block.id !== id));
    setUploads(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setFileNames(prev => {
      const copy = { ...prev };
      delete copy[id];
      return copy;
    });
    setPreviews(prev => {
      const copy = { ...prev };
      if (copy[id]) {
        try { URL.revokeObjectURL(copy[id]); } catch { }
        delete copy[id];
      }
      return copy;
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    (async () => {
      try {
        const blogsRef = dbRef(db, 'blogs');

        // If in edit mode, update existing blog
        if (isEditMode && editingBlogId) {
          const blogRef = dbRef(db, `blogs/${editingBlogId}`);
          const createdAt = new Date().toISOString();
          const blogObj = {
            title: blogTitle,
            category,
            featuredImage: featuredImage || null,
            author: {
              name: authorName || null,
              role: authorRole || null,
              avatar: authorAvatar || null,
              bio: authorBio || null,
            },
            publishDate: new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            tags: tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [],
            content: contentBlocks.map(cb => ({ type: cb.type, content: cb.content })),
            contentBlocks,
            updatedAt: createdAt,
          };

          await update(blogRef, blogObj);
          alert('Blog post updated successfully!');

          // Reset edit mode
          cancelEdit();
        }
        // Otherwise, create new blog
        else {
          const newRef = push(blogsRef);
          const createdAt = new Date().toISOString();
          const blogObj = {
            id: newRef.key,
            title: blogTitle,
            category,
            featuredImage: featuredImage || null,
            author: {
              name: authorName || null,
              role: authorRole || null,
              avatar: authorAvatar || null,
              bio: authorBio || null,
            },
            publishDate: new Date(createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
            tags: tagsInput ? tagsInput.split(',').map(t => t.trim()).filter(Boolean) : [],
            content: contentBlocks.map(cb => ({ type: cb.type, content: cb.content })),
            contentBlocks,
            createdAt,
          };

          await set(newRef, blogObj);
          alert('Blog post created successfully!');

          // Reset form
          resetForm();
        }
      } catch (err: any) {
        console.error('Failed to publish blog', err);
        const msg = err?.message || JSON.stringify(err) || 'Unknown error';
        alert('Failed to publish blog: ' + msg);
      }
    })();
  };

  // Edit blog function
  const handleEditBlog = (blog: any) => {
    setEditingBlogId(blog.id);
    setIsEditMode(true);

    // Populate form with blog data
    setBlogTitle(blog.title || '');
    setCategory(blog.category || '');
    setFeaturedImage(blog.featuredImage || '');
    setFeaturedPreview(blog.featuredImage || '');
    setTagsInput(blog.tags ? blog.tags.join(', ') : '');
    setAuthorName(blog.author?.name || '');
    setAuthorRole(blog.author?.role || '');
    setAuthorAvatar(blog.author?.avatar || '');
    setAuthorAvatarPreview(blog.author?.avatar || '');
    setAuthorBio(blog.author?.bio || '');

    // Handle content blocks
    if (blog.contentBlocks && Array.isArray(blog.contentBlocks)) {
      setContentBlocks(blog.contentBlocks.map((block: any, index: number) => ({
        ...block,
        id: block.id || Date.now().toString() + index
      })));
    } else {
      setContentBlocks([]);
    }

    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Delete blog function
  const handleDeleteBlog = async (blogId: string, blogTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${blogTitle}"? This action cannot be undone.`)) {
      try {
        const blogRef = dbRef(db, `blogs/${blogId}`);
        await remove(blogRef);
        alert('Blog deleted successfully!');
      } catch (err: any) {
        console.error('Failed to delete blog', err);
        alert('Failed to delete blog: ' + err.message);
      }
    }
  };

  // Cancel edit mode
  const cancelEdit = () => {
    setIsEditMode(false);
    setEditingBlogId(null);
    resetForm();
  };

  // Reset form
  const resetForm = () => {
    setBlogTitle('');
    setCategory('');
    setFeaturedImage('');
    setFeaturedPreview('');
    setTagsInput('');
    setAuthorName('');
    setAuthorRole('');
    setAuthorAvatar('');
    setAuthorAvatarPreview('');
    setAuthorBio('');
    setContentBlocks([]);
    setPreviews({});
    setFileNames({});
  };

  const renderBlockInput = (block: ContentBlock) => {
    switch (block.type) {
      case 'h1':
        return (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            placeholder="Enter heading 1..."
            className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] text-2xl placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
          />
        );
      case 'h2':
        return (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            placeholder="Enter heading 2..."
            className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] text-xl placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
          />
        );
      case 'h3':
        return (
          <input
            type="text"
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            placeholder="Enter heading 3..."
            className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] text-lg placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
          />
        );
      case 'paragraph':
        return (
          <textarea
            value={block.content}
            onChange={(e) => updateBlock(block.id, e.target.value)}
            placeholder="Enter paragraph text..."
            rows={4}
            className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 resize-none"
          />
        );
      case 'image':
        return (
          <div className="space-y-2">
            <div className="flex flex-col md:flex-row gap-3">
              <div className="flex-1">
                <label className="text-sm text-[#efe9d6] block mb-2">Image URL (optional)</label>
                <input
                  type="text"
                  value={isValidUrl(block.content) ? block.content : ''}
                  onChange={(e) => updateBlock(block.id, e.target.value)}
                  placeholder="https://..."
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-2 text-[#efe9d6]"
                />
              </div>
              <div className="flex-shrink-0">
                <label className="px-3 py-2 bg-[#232323] border border-[#c9a227]/20 rounded-lg text-[#efe9d6] text-sm cursor-pointer hover:bg-[#232323]/80 transition-all">
                  Choose File
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (!file) return;
                      handlePhotoChange(file, block.id);
                    }}
                    className="hidden"
                  />
                </label>
                <div className="text-sm text-[#efe9d6]/60 mt-2">{fileNames[block.id] ? fileNames[block.id] : 'No file chosen'}</div>
              </div>
            </div>

            {(previews[block.id] || (block.content && isValidUrl(block.content))) && (
              <div className="rounded-xl overflow-hidden border border-[#c9a227]/10 mt-3">
                <img src={previews[block.id] ? previews[block.id] : block.content} alt="Preview" className="w-full h-auto" />
              </div>
            )}
          </div>
        );
    }
  };

  useEffect(() => {
    const blogsRef = dbRef(db, 'blogs');
    const unsub = onValue(blogsRef, (snapshot) => {
      const val = snapshot.val();
      if (val) {
        const arr = Object.entries(val).map(([k, v]) => {
          const item: any = { id: k, ...(v as any) };
          if (item.contentBlocks && !Array.isArray(item.contentBlocks)) {
            try {
              item.contentBlocks = Object.values(item.contentBlocks);
            } catch {
              item.contentBlocks = [];
            }
          }
          return item;
        });
        arr.sort((a: any, b: any) => (b.createdAt || '').localeCompare(a.createdAt || ''));
        setBlogs(arr as any);
      } else {
        setBlogs([]);
      }
    });

    return () => unsub();
  }, []);

  return (
    <AdminLayout activePage="blog">
      <div className="max-w-7xl mx-auto">
        {/* Header with edit mode indicator */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-[#efe9d6] mb-2">
                {isEditMode ? 'Edit Blog Post' : 'Add New Blog Post'}
              </h2>
              <p className="text-[#efe9d6]/60">
                {isEditMode ? 'Edit existing blog content' : 'Create and publish new content for your blog'}
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
          {/* Basic Info */}
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-8 mb-6">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-[#efe9d6]">Basic Information</h3>
              {isEditMode && (
                <div className="flex items-center gap-2 px-3 py-1 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-lg text-[#efe9d6] text-sm">
                  <Edit2 className="w-3 h-3" />
                  Editing Mode
                </div>
              )}
            </div>

            <div className="space-y-6">
              {/* Blog Title */}
              <div className="space-y-2">
                <label htmlFor="blogTitle" className="text-[#efe9d6] text-sm block">
                  Blog Title *
                </label>
                <input
                  type="text"
                  id="blogTitle"
                  value={blogTitle}
                  onChange={(e) => setBlogTitle(e.target.value)}
                  required
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                  placeholder="Enter blog title..."
                />
              </div>

              {/* Category */}
              <div className="space-y-2">
                <label htmlFor="category" className="text-[#efe9d6] text-sm block">
                  Blog Category *
                </label>
                <select
                  id="category"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  required
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                >
                  <option value="">Select category...</option>
                  <option value="AI Technology">AI Technology</option>
                  <option value="Web Development">Web Development</option>
                  <option value="Chatbots">Chatbots</option>
                  <option value="Industry Insights">Industry Insights</option>
                  <option value="Case Studies">Case Studies</option>
                </select>
              </div>

              {/* Featured Image (URL or file) */}
              <div className="space-y-2">
                <label className="text-[#efe9d6] text-sm block">Featured Image (thumbnail) - URL or choose file</label>
                <input
                  value={featuredImage && isValidUrl(featuredImage) ? featuredImage : ''}
                  onChange={(e) => {
                    const v = e.target.value;
                    setFeaturedImage(v);
                    if (isValidUrl(v)) setFeaturedPreview(v); else setFeaturedPreview('');
                  }}
                  placeholder="https://... (optional)"
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none"
                />

                <div className="flex items-center gap-3">
                  <label className="px-4 py-2 bg-[#232323] border border-[#c9a227]/20 rounded-lg text-[#efe9d6] text-sm cursor-pointer hover:bg-[#232323]/80 transition-all">
                    Choose Image
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (!file) return;
                        handleFeaturedImageChange(file);
                      }}
                      className="hidden"
                    />
                  </label>
                  <div className="text-sm text-[#efe9d6]/60">{featuredPreview ? 'Preview ready' : 'No file chosen'}</div>
                </div>

                {featuredPreview && (
                  <div className="mt-3 rounded-xl overflow-hidden border border-[#c9a227]/10">
                    <img src={featuredPreview} alt="Featured preview" className="w-full h-auto" />
                  </div>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <label htmlFor="tags" className="text-[#efe9d6] text-sm block">Tags (comma separated)</label>
                <input
                  id="tags"
                  value={tagsInput}
                  onChange={(e) => setTagsInput(e.target.value)}
                  placeholder="e.g. AI, Web Development, Technology"
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                />
              </div>

              {/* Author Details */}
              <div className="mt-4 pt-4 border-t border-[#c9a227]/10 space-y-4">
                <h4 className="text-[#efe9d6] text-sm">Author Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label htmlFor="authorName" className="text-[#efe9d6] text-sm block">Author Name</label>
                    <input id="authorName" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Author name" className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6]" />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="authorRole" className="text-[#efe9d6] text-sm block">Author Role</label>
                    <input id="authorRole" value={authorRole} onChange={(e) => setAuthorRole(e.target.value)} placeholder="e.g. Chief AI Architect" className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 items-start">
                  <div className="space-y-2">
                    <label htmlFor="authorAvatar" className="text-[#efe9d6] text-sm block">Author Avatar URL or choose file</label>
                    <input id="authorAvatar" value={authorAvatar && isValidUrl(authorAvatar) ? authorAvatar : ''} onChange={(e) => handleAuthorAvatarChange(e.target.value)} placeholder="https://... (optional)" className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6]" />
                    <div className="mt-2">
                      <label className="px-3 py-2 bg-[#232323] border border-[#c9a227]/20 rounded-lg text-[#efe9d6] text-sm cursor-pointer hover:bg-[#232323]/80 transition-all">
                        Choose File
                        <input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (!f) return; handleAuthorAvatarFileChange(f); }} className="hidden" />
                      </label>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[#efe9d6] text-sm block">Avatar Preview</label>
                    {authorAvatarPreview ? (
                      <div className="w-24 h-24 rounded-full overflow-hidden border border-[#c9a227]/10">
                        <img src={authorAvatarPreview} alt="Author avatar" className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-24 h-24 rounded-full bg-[#0f0f0f]/40 border border-[#c9a227]/10 flex items-center justify-center text-sm text-[#efe9d6]/40">No Avatar</div>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="authorBio" className="text-[#efe9d6] text-sm block">Author Bio</label>
                  <textarea id="authorBio" value={authorBio} onChange={(e) => setAuthorBio(e.target.value)} rows={3} placeholder="Short bio for the author" className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] resize-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Content Builder */}
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-8 mb-6">
            <h3 className="text-[#efe9d6] mb-6">Blog Content</h3>

            {/* Toolbar */}
            <div className="flex flex-wrap gap-3 mb-8 p-4 bg-[#0f0f0f]/40 rounded-xl border border-[#c9a227]/10">
              <button
                type="button"
                onClick={() => addBlock('h1')}
                className="flex items-center gap-2 px-4 py-2 bg-[#232323] border border-[#c9a227]/20 rounded-lg text-[#efe9d6] hover:bg-[#c9a227]/20 hover:border-[#c9a227]/40 transition-all text-sm"
              >
                <Type className="w-4 h-4" />
                H1
              </button>
              <button
                type="button"
                onClick={() => addBlock('h2')}
                className="flex items-center gap-2 px-4 py-2 bg-[#232323] border border-[#c9a227]/20 rounded-lg text-[#efe9d6] hover:bg-[#c9a227]/20 hover:border-[#c9a227]/40 transition-all text-sm"
              >
                <Type className="w-4 h-4" />
                H2
              </button>
              <button
                type="button"
                onClick={() => addBlock('h3')}
                className="flex items-center gap-2 px-4 py-2 bg-[#232323] border border-[#c9a227]/20 rounded-lg text-[#efe9d6] hover:bg-[#c9a227]/20 hover:border-[#c9a227]/40 transition-all text-sm"
              >
                <Type className="w-4 h-4" />
                H3
              </button>
              <button
                type="button"
                onClick={() => addBlock('paragraph')}
                className="flex items-center gap-2 px-4 py-2 bg-[#232323] border border-[#c9a227]/20 rounded-lg text-[#efe9d6] hover:bg-[#c9a227]/20 hover:border-[#c9a227]/40 transition-all text-sm"
              >
                <Type className="w-4 h-4" />
                Paragraph
              </button>
              <button
                type="button"
                onClick={() => addBlock('image')}
                className="flex items-center gap-2 px-4 py-2 bg-[#232323] border border-[#c9a227]/20 rounded-lg text-[#efe9d6] hover:bg-[#c9a227]/20 hover:border-[#c9a227]/40 transition-all text-sm"
              >
                <ImageIcon className="w-4 h-4" />
                Image
              </button>
            </div>

            {/* Content Blocks */}
            <div className="space-y-4">
              {contentBlocks.length === 0 ? (
                <div className="text-center py-12 text-[#efe9d6]/40 border-2 border-dashed border-[#c9a227]/20 rounded-xl">
                  Click a button above to add content blocks
                </div>
              ) : (
                contentBlocks.map((block, index) => (
                  <div key={block.id} className="relative group">
                    <div className="flex items-start gap-3">
                      <div className="flex-1">
                        <div className="text-[#c9a227] text-xs mb-2 flex items-center gap-2">
                          <span className="bg-[#c9a227]/20 px-2 py-1 rounded">
                            Block {index + 1}: {block.type.toUpperCase()}
                          </span>
                        </div>
                        {renderBlockInput(block)}
                      </div>
                      <button
                        type="button"
                        onClick={() => removeBlock(block.id)}
                        className="p-2 text-[#efe9d6]/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex gap-4 justify-end">
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
              className="px-8 py-3 border border-[#c9a227]/40 text-[#efe9d6] rounded-xl hover:bg-[#c9a227]/10 transition-all"
            >
              Save as Draft
            </button>
            <GradientButton size="lg" type="submit">
              {isEditMode ? (
                <>
                  <Save className="w-5 h-5 mr-2" />
                  Update Blog Post
                </>
              ) : (
                'Publish Blog Post'
              )}
            </GradientButton>
          </div>
        </form>

        {/* Published Blogs List */}
        <div className="mt-12">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-[#efe9d6]">Published Blogs</h3>
            <div className="text-sm text-[#efe9d6]/60">{blogs.length} blogs published</div>
          </div>
          {blogs.length === 0 ? (
            <div className="text-[#efe9d6]/60">No blogs published yet.</div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {blogs.map((b) => {
                const firstImageBlock = (b.contentBlocks || []).find((cb: any) => cb.type === 'image' && cb.content && isValidUrl(cb.content));
                const thumbnail = b.featuredImage ? b.featuredImage : (firstImageBlock ? firstImageBlock.content : null);
                return (
                  <div key={b.id} className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-6 flex gap-6 items-start group hover:border-[#c9a227]/30 transition-all">
                    {thumbnail ? (
                      <div className="w-40 h-28 overflow-hidden rounded-lg flex-shrink-0 border border-[#c9a227]/10">
                        <img src={thumbnail} alt={b.title} className="w-full h-full object-cover" />
                      </div>
                    ) : (
                      <div className="w-40 h-28 bg-[#0f0f0f]/40 rounded-lg flex-shrink-0 border border-[#c9a227]/10 flex items-center justify-center text-sm text-[#efe9d6]/40">
                        No Image
                      </div>
                    )}

                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <div className="min-w-0">
                          <div className="text-[#efe9d6] text-lg font-semibold truncate">{b.title}</div>
                          <div className="text-[#efe9d6]/60 text-sm mb-2">
                            {b.category} • {new Date(b.createdAt).toLocaleDateString('en-US', {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric'
                            })}
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditBlog(b)}
                            className="p-2 bg-[#c9a227]/20 border border-[#c9a227]/30 rounded-lg text-[#c9a227] hover:bg-[#c9a227]/30 transition-all"
                            title="Edit Blog"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlog(b.id, b.title)}
                            className="p-2 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 hover:bg-red-500/30 transition-all"
                            title="Delete Blog"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      {/* Tags */}
                      {b.tags && b.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mt-2">
                          {b.tags.slice(0, 3).map((tag: string, index: number) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[#0f0f0f]/60 border border-[#c9a227]/10 rounded text-xs text-[#efe9d6]/60"
                            >
                              {tag}
                            </span>
                          ))}
                          {b.tags.length > 3 && (
                            <span className="px-2 py-1 bg-[#0f0f0f]/60 border border-[#c9a227]/10 rounded text-xs text-[#efe9d6]/40">
                              +{b.tags.length - 3} more
                            </span>
                          )}
                        </div>
                      )}
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