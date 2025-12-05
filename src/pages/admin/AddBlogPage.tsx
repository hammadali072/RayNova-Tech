import { useState } from 'react';
import { AdminLayout } from '../../components/admin/AdminLayout';
import { Type, Image, Trash2, Plus } from 'lucide-react';
import { GradientButton } from '../../components/GradientButton';

type ContentBlock = {
  id: string;
  type: 'h1' | 'h2' | 'h3' | 'paragraph' | 'image';
  content: string;
};

export function AddBlogPage() {
  const [blogTitle, setBlogTitle] = useState('');
  const [category, setCategory] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);

  const addBlock = (type: ContentBlock['type']) => {
    const newBlock: ContentBlock = {
      id: Date.now().toString(),
      type,
      content: ''
    };
    setContentBlocks([...contentBlocks, newBlock]);
  };

  const updateBlock = (id: string, content: string) => {
    setContentBlocks(
      contentBlocks.map(block =>
        block.id === id ? { ...block, content } : block
      )
    );
  };

  const removeBlock = (id: string) => {
    setContentBlocks(contentBlocks.filter(block => block.id !== id));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      blogTitle,
      category,
      shortDescription,
      contentBlocks
    });
    // Reset form
    setBlogTitle('');
    setCategory('');
    setShortDescription('');
    setContentBlocks([]);
    alert('Blog post created successfully!');
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
            <input
              type="text"
              value={block.content}
              onChange={(e) => updateBlock(block.id, e.target.value)}
              placeholder="Enter image URL or upload..."
              className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
            />
            {block.content && (
              <div className="rounded-xl overflow-hidden border border-[#c9a227]/10">
                <img src={block.content} alt="Preview" className="w-full h-auto" />
              </div>
            )}
          </div>
        );
    }
  };

  return (
    <AdminLayout activePage="blog">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-[#efe9d6] mb-2">Add New Blog Post</h2>
          <p className="text-[#efe9d6]/60">Create and publish new content for your blog</p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="bg-[#232323]/60 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl p-8 mb-6">
            <h3 className="text-[#efe9d6] mb-6">Basic Information</h3>

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

              {/* Short Description */}
              <div className="space-y-2">
                <label htmlFor="shortDescription" className="text-[#efe9d6] text-sm block">
                  Short Description *
                </label>
                <textarea
                  id="shortDescription"
                  value={shortDescription}
                  onChange={(e) => setShortDescription(e.target.value)}
                  required
                  rows={3}
                  className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 resize-none"
                  placeholder="Brief description for preview..."
                />
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
                <Image className="w-4 h-4" />
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

          {/* Submit */}
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="px-8 py-3 border border-[#c9a227]/40 text-[#efe9d6] rounded-xl hover:bg-[#c9a227]/10 transition-all"
            >
              Save as Draft
            </button>
            <GradientButton size="lg">
              Publish Blog Post
            </GradientButton>
          </div>
        </form>
      </div>
    </AdminLayout>
  );
}
