
import { useParams, useNavigate } from 'react-router-dom'; 
import { useEffect, useState } from 'react';
import { ArrowLeft, User, Calendar, Tag } from 'lucide-react';
import { GradientButton } from '../components/GradientButton';

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      if (!id) return;
      try {
        const response = await fetch(`http://localhost:5000/api/blogs/${id}`);
        if(response.ok) {
            const data = await response.json();
            setBlog(data);
        } else {
            console.error('Blog not found');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#c9a227]"></div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col items-center justify-center p-4">
        <h2 className="text-[#efe9d6] text-2xl mb-4">Blog Post Not Found</h2>
        <GradientButton onClick={() => navigate('/blog')}>Back to Blog</GradientButton>
      </div>
    );
  }

  const renderContentBlock = (block: any) => {
    switch (block.type) {
      case 'h1':
        return <h1 className="text-3xl sm:text-4xl font-bold text-[#efe9d6] mt-8 mb-4">{block.content}</h1>;
      case 'h2':
        return <h2 className="text-2xl sm:text-3xl font-semibold text-[#efe9d6] mt-8 mb-4">{block.content}</h2>;
      case 'h3':
        return <h3 className="text-xl sm:text-2xl font-semibold text-[#efe9d6] mt-6 mb-3">{block.content}</h3>;
      case 'paragraph':
        return <p className="text-[#efe9d6]/80 text-lg leading-relaxed mb-6">{block.content}</p>;
      case 'image':
        return (
          <div className="my-8 rounded-2xl overflow-hidden border border-[#c9a227]/10 bg-[#232323]">
            <img src={block.content} alt={block.alt || 'Blog content'} className="w-full h-auto" />
            {block.caption && <p className="text-[#efe9d6]/50 text-sm text-center mt-2 p-2">{block.caption}</p>}
          </div>
        );
      case 'list':
        return (
          <ul className="list-disc list-inside space-y-2 mb-6 text-[#efe9d6]/80 text-lg ml-4">
            {block.items?.map((item: string, idx: number) => (
              <li key={idx}>{item}</li>
            ))}
          </ul>
        );
      case 'quote':
        return (
          <blockquote className="border-l-4 border-[#c9a227] pl-6 py-2 my-8 italic text-xl text-[#efe9d6]/90 bg-[#c9a227]/5 rounded-r-xl">
            "{block.content}"
          </blockquote>
        );
      default:
        return null;
    }
  };

  return (
    <article className="min-h-screen py-24 sm:py-32 px-4 sm:px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[#c9a227]/5 to-transparent rounded-full blur-3xl" />
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#0e3b2c]/10 to-transparent rounded-full blur-3xl" />

      <div className="max-w-4xl mx-auto relative z-10">
        <button 
          onClick={() => navigate('/blog')}
          className="group flex items-center gap-2 text-[#c9a227] mb-8 hover:text-[#efe9d6] transition-colors"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          Back to Articles
        </button>

        {/* Header */}
        <header className="mb-12">
          {blog.category && (
            <span className="inline-block px-4 py-1 rounded-full bg-[#c9a227]/10 text-[#c9a227] text-sm font-medium mb-6 border border-[#c9a227]/20">
              {blog.category}
            </span>
          )}
          
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#efe9d6] leading-tight mb-8">
            {blog.title}
          </h1>

          <div className="flex flex-wrap items-center gap-6 text-[#efe9d6]/60 border-y border-[#c9a227]/10 py-6">
            <div className="flex items-center gap-2">
              <User className="w-5 h-5 text-[#c9a227]" />
              <span>{typeof blog.author === 'string' ? blog.author : (blog.author?.name || 'Admin')}</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-[#c9a227]" />
              <span>{blog.publishDate || (blog.createdAt ? new Date(blog.createdAt).toLocaleDateString() : 'Unknown Date')}</span>
            </div>
            {blog.tags && blog.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <Tag className="w-5 h-5 text-[#c9a227]" />
                <div className="flex gap-2">
                  {blog.tags.map((tag: string, idx: number) => (
                    <span key={idx} className="bg-[#232323] px-2 py-0.5 rounded text-sm">#{tag}</span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {blog.featuredImage && (
          <div className="rounded-2xl overflow-hidden mb-12 border border-[#c9a227]/10 shadow-2xl">
            <img 
              src={blog.featuredImage} 
              alt={blog.title} 
              className="w-full h-auto object-cover max-h-[600px]"
            />
          </div>
        )}

        {/* Content */}
        <div className="prose prose-invert prose-lg max-w-none">
          {blog.contentBlocks && Array.isArray(blog.contentBlocks) ? (
            blog.contentBlocks.map((block: any) => (
              <div key={block.id}>
                {renderContentBlock(block)}
              </div>
            ))
          ) : (
             <p className="text-[#efe9d6]/60 italic">No content details available.</p>
          )}
        </div>

        {/* Author Box */}
        {blog.author && typeof blog.author === 'object' && (
            <div className="mt-16 p-8 rounded-2xl bg-[#232323]/40 border border-[#c9a227]/10 flex flex-col sm:flex-row items-center sm:items-start gap-6">
                <div className="w-20 h-20 rounded-full overflow-hidden border-2 border-[#c9a227]/20 flex-shrink-0">
                    <img src={blog.author.avatar || 'https://via.placeholder.com/150'} alt={blog.author.name} className="w-full h-full object-cover" />
                </div>
                <div className="text-center sm:text-left">
                    <h3 className="text-[#efe9d6] font-bold text-lg mb-1">{blog.author.name}</h3>
                    <p className="text-[#c9a227] text-sm mb-3">{blog.author.role}</p>
                    <p className="text-[#efe9d6]/70 leading-relaxed">{blog.author.bio}</p>
                </div>
            </div>
        )}
      </div>
    </article>
  );
}