import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, ChevronRight, MessageCircle, ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { GradientButton } from '../components/GradientButton';
import { getDatabase, ref, get, query, orderByChild, limitToLast } from 'firebase/database';

// Blog data type definition
interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  description: string;
  featuredImage: string;
  imageUrl?: string;
  category: string;
  publishDate: string;
  date: string;
  readingTime: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    bio: string;
  };
  content: Array<{
    type: 'h2' | 'h3' | 'paragraph' | 'list' | 'image' | 'quote';
    content: string;
    alt?: string;
    items?: string[];
  }>;
  tags: string[];
  relatedPosts: Array<{
    id: string;
    title: string;
    image: string;
    category: string;
  }>;
}

export function BlogDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<BlogPost | null>(null);
  const [relatedBlogs, setRelatedBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Helper function to extract image from blog data
  const extractImageFromBlogData = (blogData: any): string => {
    // Try featuredImage first
    if (blogData.featuredImage) return blogData.featuredImage;

    // Try imageUrl
    if (blogData.imageUrl) return blogData.imageUrl;

    // Try image
    if (blogData.image) return blogData.image;

    // Extract image from contentBlocks
    if (blogData.contentBlocks && Array.isArray(blogData.contentBlocks)) {
      const imageBlock = blogData.contentBlocks.find((block: any) =>
        block?.type === 'image' && block?.content
      );
      if (imageBlock) {
        return imageBlock.content;
      }
    }

    // Default fallback image
    return 'https://via.placeholder.com/400x300/0f0f0f/c9a227?text=Blog+Image';
  };

  // Fetch blog data from Firebase
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        setBlog(null);
        setRelatedBlogs([]);

        const db = getDatabase();

        if (!id) {
          navigate('/blog');
          return;
        }

        // Fetch specific blog
        const blogRef = ref(db, `blogs/${id}`);
        const blogSnapshot = await get(blogRef);

        if (!blogSnapshot.exists()) {
          console.error('Blog not found:', id);
          navigate('/blog');
          return;
        }

        const blogData = blogSnapshot.val();

        // Format blog data
        const formattedBlog: BlogPost = {
          id: id,
          title: blogData.title || '',
          excerpt: blogData.excerpt || '',
          description: blogData.description || '',
          featuredImage: extractImageFromBlogData(blogData),
          imageUrl: blogData.imageUrl || blogData.image || '',
          category: blogData.category || 'Uncategorized',
          publishDate: blogData.date || blogData.publishDate || new Date().toLocaleDateString(),
          date: blogData.date || '',
          readingTime: blogData.readingTime || '5 min read',
          author: blogData.author && typeof blogData.author === 'object' ? {
            name: blogData.author.name || 'Admin',
            avatar: blogData.author.avatar || 'https://via.placeholder.com/150',
            role: blogData.author.role || 'Content Creator',
            bio: blogData.author.bio || 'Expert in AI and web development with years of experience.'
          } : {
            name: blogData.author || 'Admin',
            avatar: 'https://via.placeholder.com/150',
            role: 'Content Creator',
            bio: 'Expert in AI and web development with years of experience.'
          },
          content: blogData.contentBlocks || blogData.content || [
            {
              type: 'paragraph',
              content: blogData.description || 'No content available.'
            }
          ],
          tags: blogData.tags || ['AI', 'Technology'],
          relatedPosts: []
        };

        setBlog(formattedBlog);

        // Fetch all blogs for related posts
        const blogsRef = ref(db, 'blogs');
        const blogsSnapshot = await get(blogsRef);

        if (blogsSnapshot.exists()) {
          const allBlogs = blogsSnapshot.val();
          const relatedBlogsData = [];

          // Convert to array and filter out current blog
          const allBlogsEntries = Object.entries(allBlogs);
          for (const entry of allBlogsEntries) {
            const blogId = entry[0] as string;
            const data = entry[1] as any;

            if (blogId !== id) {
              // Extract image for each related blog
              const relatedImage = extractImageFromBlogData(data);

              relatedBlogsData.push({
                id: blogId,
                title: data.title || '',
                image: relatedImage,
                imageUrl: relatedImage,
                category: data.category || 'Uncategorized',
                date: data.date || data.createdAt || new Date().toISOString()
              });
            }
          }

          // Sort by date (newest first) and take 3
          const sortedRelated = relatedBlogsData.sort((a: any, b: any) =>
            new Date(b.date).getTime() - new Date(a.date).getTime()
          ).slice(0, 3);

          setRelatedBlogs(sortedRelated);
          setBlog(prev => prev ? {
            ...prev,
            relatedPosts: sortedRelated
          } : null);
        }

        setLoading(false);

      } catch (error) {
        console.error('Error fetching blog:', error);
        setLoading(false);
        navigate('/blog');
      }
    };

    fetchBlog();
  }, [id, navigate]);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, comment });
    setName('');
    setEmail('');
    setComment('');
    alert('Comment submitted successfully!');
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  const handleShare = (platform: string) => {
    const text = `Check out this article: ${blog?.title}`;
    const encodedUrl = encodeURIComponent(shareUrl);
    const encodedText = encodeURIComponent(text);

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(shareUrl);
        alert('Link copied to clipboard!');
        break;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center">
        <div className="text-[#c9a227] animate-pulse">Loading...</div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen bg-[#0f0f0f] flex flex-col">
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center p-6">
          <div className="text-[#efe9d6] text-xl mb-4">Blog post not found</div>
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-2 text-[#c9a227] hover:text-[#d4b13f] transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Header />

      {/* Back button */}
      <div className="pt-12 sm:pt-16 md:pt-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <button
            onClick={() => navigate('/blog')}
            className="flex items-center gap-1 sm:gap-1.5 md:gap-2 text-[#c9a227] hover:text-[#d4b13f] transition-colors mb-2 sm:mb-3 md:mb-4 group text-sm sm:text-base"
          >
            <ArrowLeft className="w-3 h-3 sm:w-4 sm:h-4 group-hover:-translate-x-1 transition-transform" />
            Back to Blog
          </button>
        </div>
      </div>

      {/* Hero Section with Featured Image */}
      <section className="relative overflow-hidden">
        {/* Featured Image */}
        <div className="relative h-[40vh] min-h-[300px] sm:h-[50vh] sm:min-h-[400px] md:h-[60vh] md:min-h-[500px]">
          <ImageWithFallback
            src={blog.featuredImage}
            alt={blog.title}
            fallbackSrc="https://via.placeholder.com/1200x600/0f0f0f/c9a227?text=Blog+Image"
            className="w-full h-full object-cover"
          />
          {/* Enhanced Gradient Overlay - More visible on all screens */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/80 to-[#0f0f0f]/40"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-transparent to-transparent opacity-60"></div>

          {/* Content Overlay - Always visible with proper z-index */}
          <div className="absolute bottom-4 left-0 right-0 z-10 p-4 sm:p-6 md:p-8 lg:p-12">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <div className="inline-block mb-2 sm:mb-3 md:mb-4">
                <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/30 to-[#0e3b2c]/30 backdrop-blur-sm px-3 py-1.5 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm border border-[#c9a227]/40 shadow-[0_0_20px_rgba(201,162,39,0.25)]">
                  {blog.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-[#efe9d6] mb-3 sm:mb-4 md:mb-6 leading-tight text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-3 sm:gap-4 md:gap-6 text-[#efe9d6] drop-shadow-[0_1px_4px_rgba(0,0,0,0.8)]">
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9a227]" />
                  <span className="text-xs sm:text-sm font-medium">{blog.author.name}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Calendar className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9a227]" />
                  <span className="text-xs sm:text-sm font-medium">{blog.publishDate}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2">
                  <Clock className="w-3 h-3 sm:w-4 sm:h-4 text-[#c9a227]" />
                  <span className="text-xs sm:text-sm font-medium">{blog.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 md:py-16 lg:py-20 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-6 sm:gap-8 md:gap-10 lg:gap-12">
            {/* Main Article Content */}
            <article className="lg:col-span-8">
              <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 lg:p-12">
                {/* Blog Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  {blog.content && Array.isArray(blog.content) ? (
                    blog.content.map((block: any, index: number) => {
                      switch (block.type) {
                        case 'h2':
                          return (
                            <h2 key={index} className="text-[#efe9d6] mt-6 sm:mt-8 md:mt-10 lg:mt-12 mb-3 sm:mb-4 md:mb-6 first:mt-0 text-xl sm:text-2xl md:text-3xl">
                              {block.content}
                            </h2>
                          );
                        case 'h3':
                          return (
                            <h3 key={index} className="text-[#efe9d6] mt-5 sm:mt-6 md:mt-8 mb-2 sm:mb-3 md:mb-4 text-lg sm:text-xl md:text-2xl">
                              {block.content}
                            </h3>
                          );
                        case 'paragraph':
                          return (
                            <p key={index} className="text-[#efe9d6]/80 leading-relaxed mb-4 sm:mb-5 md:mb-6 text-sm sm:text-base md:text-lg">
                              {block.content}
                            </p>
                          );
                        case 'list':
                          return (
                            <ul key={index} className="space-y-2 sm:space-y-3 mb-4 sm:mb-5 md:mb-6">
                              {block.items && block.items.map((item: string, i: number) => (
                                <li key={i} className="flex items-start gap-2 sm:gap-3 text-[#efe9d6]/80">
                                  <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] mt-1.5 sm:mt-2 flex-shrink-0"></div>
                                  <span className="text-sm sm:text-base md:text-lg">{item}</span>
                                </li>
                              ))}
                            </ul>
                          );
                        case 'image':
                          return (
                            <div key={index} className="my-4 sm:my-6 md:my-8 rounded-xl sm:rounded-2xl overflow-hidden border border-[#c9a227]/10">
                              <ImageWithFallback
                                src={block.content}
                                alt={block.alt || 'Blog image'}
                                fallbackSrc="https://via.placeholder.com/800x400/0f0f0f/c9a227?text=Image"
                                className="w-full h-auto"
                              />
                            </div>
                          );
                        case 'quote':
                          return (
                            <blockquote key={index} className="border-l-2 sm:border-l-4 border-[#c9a227] pl-3 sm:pl-4 md:pl-6 py-3 sm:py-4 my-4 sm:my-6 md:my-8 bg-[#c9a227]/5 rounded-r-lg sm:rounded-r-xl">
                              <p className="text-[#efe9d6] italic text-base sm:text-lg md:text-xl leading-relaxed">
                                {block.content}
                              </p>
                            </blockquote>
                          );
                        default:
                          return (
                            <p key={index} className="text-[#efe9d6]/80 leading-relaxed mb-6">
                              {typeof block === 'string' ? block : JSON.stringify(block)}
                            </p>
                          );
                      }
                    })
                  ) : (
                    <p className="text-[#efe9d6]/80 leading-relaxed">
                      {blog.description || 'No content available.'}
                    </p>
                  )}
                </div>

                {/* Tags */}
                <div className="mt-6 sm:mt-8 md:mt-10 lg:mt-12 pt-4 sm:pt-6 md:pt-8 border-t border-[#c9a227]/10">
                  <div className="flex flex-wrap gap-2 sm:gap-3">
                    {blog.tags && blog.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-full text-[#efe9d6]/70 text-xs sm:text-sm hover:bg-[#c9a227]/10 hover:border-[#c9a227]/40 transition-all cursor-pointer"
                        onClick={() => navigate(`/blog?tag=${tag}`)}
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 md:pt-8 border-t border-[#c9a227]/10">
                  <div className="flex items-center justify-between flex-wrap gap-3 sm:gap-4">
                    <h4 className="text-[#efe9d6] text-base sm:text-lg font-medium">Share this article</h4>
                    <div className="flex gap-2 sm:gap-3">
                      <button
                        onClick={() => handleShare('facebook')}
                        className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-lg sm:rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group"
                      >
                        <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-[#efe9d6]" />
                      </button>
                      <button
                        onClick={() => handleShare('twitter')}
                        className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-lg sm:rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group"
                      >
                        <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-[#efe9d6]" />
                      </button>
                      <button
                        onClick={() => handleShare('linkedin')}
                        className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-lg sm:rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group"
                      >
                        <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-[#efe9d6]" />
                      </button>
                      <button
                        onClick={() => handleShare('copy')}
                        className="w-9 h-9 sm:w-10 sm:h-10 md:w-11 md:h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-lg sm:rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group"
                      >
                        <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 text-[#efe9d6]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Author Bio Section */}
              <div className="mt-6 sm:mt-8 bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                <h3 className="text-[#efe9d6] mb-4 sm:mb-5 md:mb-6 text-lg sm:text-xl font-medium">About the Author</h3>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 md:gap-6 items-start">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 rounded-xl sm:rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#c9a227]/30">
                    <ImageWithFallback
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      fallbackSrc="https://via.placeholder.com/150/0f0f0f/c9a227?text=Author"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#efe9d6] mb-1 text-base sm:text-lg">{blog.author.name}</h4>
                    <p className="text-[#c9a227] text-xs sm:text-sm mb-2 sm:mb-3">{blog.author.role}</p>
                    <p className="text-[#efe9d6]/70 leading-relaxed text-sm sm:text-base">
                      {blog.author.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-6 sm:mt-8 bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8">
                <h3 className="text-[#efe9d6] mb-4 sm:mb-5 md:mb-6 flex items-center gap-1.5 sm:gap-2 text-lg sm:text-xl font-medium">
                  <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 text-[#c9a227]" />
                  Leave a Comment
                </h3>

                <form onSubmit={handleCommentSubmit} className="space-y-4 sm:space-y-5 md:space-y-6">
                  <div className="grid md:grid-cols-2 gap-4 sm:gap-5 md:gap-6">
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="name" className="text-[#efe9d6] text-xs sm:text-sm block">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-1.5 sm:space-y-2">
                      <label htmlFor="email" className="text-[#efe9d6] text-xs sm:text-sm block">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-1.5 sm:space-y-2">
                    <label htmlFor="comment" className="text-[#efe9d6] text-xs sm:text-sm block">
                      Comment *
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      rows={4}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-lg sm:rounded-xl px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 resize-none"
                      placeholder="Share your thoughts..."
                    />
                  </div>

                  <GradientButton type="submit" size="lg" className="w-full sm:w-auto">
                    Post Comment
                  </GradientButton>
                </form>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-20 sm:top-24 space-y-6 sm:space-y-8">
                {/* Related Posts */}
                <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6">
                  <h3 className="text-[#efe9d6] mb-4 sm:mb-5 md:mb-6 text-base sm:text-lg font-medium">Related Articles</h3>
                  <div className="space-y-3 sm:space-y-4">
                    {relatedBlogs.length > 0 ? (
                      relatedBlogs.map((post: any) => (
                        <a
                          key={post.id}
                          href={`/blog/${post.id}`}
                          className="group block"
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/blog/${post.id}`);
                          }}
                        >
                          <div className="flex gap-2 sm:gap-3 md:gap-4 p-2 sm:p-3 rounded-lg sm:rounded-xl hover:bg-[#c9a227]/5 transition-all">
                            {/* Image Container */}
                            <div className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-lg sm:rounded-xl overflow-hidden flex-shrink-0 border border-[#c9a227]/20">
                              <ImageWithFallback
                                src={post.image || post.imageUrl}
                                alt={post.title}
                                fallbackSrc="https://via.placeholder.com/64/0f0f0f/c9a227?text=Image"
                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                              />
                            </div>

                            <div className="flex-1 min-w-0">
                              <div className="text-[#c9a227] text-[10px] sm:text-xs mb-0.5 sm:mb-1 font-medium">{post.category}</div>
                              <h4 className="text-[#efe9d6] text-xs sm:text-sm leading-tight group-hover:text-[#c9a227] transition-colors line-clamp-2 font-medium">
                                {post.title}
                              </h4>
                            </div>
                            <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#efe9d6]/40 group-hover:text-[#c9a227] transition-colors flex-shrink-0 mt-1" />
                          </div>
                        </a>
                      ))
                    ) : (
                      <p className="text-[#efe9d6]/60 text-xs sm:text-sm">No related articles found.</p>
                    )}
                  </div>
                </div>

                {/* Categories */}
                <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 md:p-6">
                  <h3 className="text-[#efe9d6] mb-3 sm:mb-4 text-base sm:text-lg font-medium">Categories</h3>
                  <div className="space-y-1.5 sm:space-y-2">
                    {['AI Technology', 'Web Development', 'Chatbots', 'Industry Insights', 'Case Studies'].map((category) => (
                      <button
                        key={category}
                        onClick={() => navigate(`/blog?category=${category}`)}
                        className="w-full flex items-center justify-between p-2.5 sm:p-3 rounded-lg sm:rounded-xl hover:bg-[#c9a227]/10 transition-all group"
                      >
                        <span className="text-[#efe9d6]/70 group-hover:text-[#c9a227] transition-colors text-xs sm:text-sm">
                          {category}
                        </span>
                        <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-[#efe9d6]/40 group-hover:text-[#c9a227] transition-colors" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}