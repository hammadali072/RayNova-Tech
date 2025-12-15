
import { ArrowRight } from 'lucide-react';
import { GradientButton } from './GradientButton';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function Blog() {
  const navigate = useNavigate();
  const [blogPosts, setBlogPosts] = useState([]);
  const API_URL = 'http://localhost:5000/api/blogs';

  // Try to pick a sensible preview paragraph for each blog card
  const getFirstParagraph = (item: any) => {
    if (item?.firstParagraph) return item.firstParagraph;
    if (item?.description) return item.description;

    const contentBlocks = Array.isArray(item?.contentBlocks)
      ? item.contentBlocks
      : item?.contentBlocks && typeof item.contentBlocks === 'object'
        ? Object.values(item.contentBlocks)
        : [];

    const paragraphFromBlocks = (contentBlocks as any[]).find((block) => block?.type === 'paragraph')?.content;
    if (paragraphFromBlocks) return paragraphFromBlocks;

    const contentArray = Array.isArray(item?.content) ? item.content : [];
    const paragraphFromContent = (contentArray as any[]).find((block) => block?.type === 'paragraph')?.content;
    if (paragraphFromContent) return paragraphFromContent;

    return '';
  };

  useEffect(() => {
    const fetchBlogs = async () => {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            if (data) {
                 const arr = data.map((item: any) => {
                  let imageUrl = item.imageUrl || item.image || item.featuredImage;
        
                  // Extract image from contentBlocks if it exists
                  if (!imageUrl && item.contentBlocks && Array.isArray(item.contentBlocks)) {
                    const imageBlock = item.contentBlocks.find((block: any) => block?.type === 'image');
                    if (imageBlock) {
                      imageUrl = (imageBlock as any).content;
                    }
                  }
        
                  return { ...item, imageUrl, firstParagraph: getFirstParagraph(item) };
                });
                setBlogPosts(arr);
            }
        } catch (error) {
            console.error("Error fetching blogs:", error);
        }
    };
    fetchBlogs();
  }, []);

  return (
    <section id="blog" className="py-12 sm:py-16 md:py-20 lg:py-24 px-4 sm:px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow" />
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }} />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/20 shadow-[0_0_20px_rgba(201,162,39,0.15)]">Our Blog</span>
          </div>
          <h2 className="text-[#efe9d6] mb-4">Latest Insights & Articles</h2>
          <p className="text-[#efe9d6]/70 text-sm sm:text-base md:text-lg max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in AI and web development
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {blogPosts.length === 0 ? (
            <div className="col-span-3 text-center text-[#efe9d6]/70">Loading blogs...</div>
          ) : (
            blogPosts.map((post) => (
              <div key={post.id} className="group relative">
                {/* Glow effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 md:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

                <div className="relative bg-[#232323]/60 backdrop-blur-xl md:rounded-3xl rounded-xl overflow-hidden border border-[#c9a227]/10 group-hover:border-[#c9a227]/30 group-hover:shadow-[0_20px_60px_rgba(201,162,39,0.25)] transition-all duration-500 h-full flex flex-col">
                  <div className="relative h-56 overflow-hidden">
                    {post.imageUrl ? (
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 flex items-center justify-center">
                        <span className="text-[#efe9d6]/50">No Image</span>
                      </div>
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-[#232323] via-[#232323]/50 to-transparent opacity-60" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gradient-to-r from-[#c9a227] via-[#d4b13f] to-[#0e3b2c] text-[#efe9d6] px-4 py-1.5 rounded-full text-xs backdrop-blur-sm shadow-lg">
                        {post.category}
                      </span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-grow flex flex-col">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 flex-wrap text-[#efe9d6]/60 text-sm">
                        <span>{typeof post.author === 'string' ? post.author : (post.author?.name ?? '')}</span>
                        <span>•</span>
                        <span>{post.publishDate ?? (post.createdAt ? new Date(post.createdAt).toLocaleDateString() : (post.date ?? ''))}</span>
                      </div>
                      <h3 className="text-[#efe9d6] group-hover:text-[#c9a227] transition-colors duration-300">
                        {post.title}
                      </h3>
                      <p className="text-[#efe9d6]/70 line-clamp-3 leading-relaxed">
                        {post.firstParagraph || 'No description available yet.'}
                      </p>
                      <button
                        onClick={() => navigate(`/blog/${post.id}`)}
                        className="flex items-center gap-2 text-[#c9a227] hover:gap-3 transition-all duration-300 group/btn cursor-pointer"
                      >
                        <span className='text-sm md:text-base'>Read More</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="text-center mt-12">
          <GradientButton size="lg" onClick={() => { navigate("/blog") }}>View All Articles</GradientButton>
        </div>
      </div>
    </section>
  );
}