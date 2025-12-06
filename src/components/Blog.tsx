import { ImageWithFallback } from './figma/ImageWithFallback';
import { ArrowRight, Calendar, User, Clock } from 'lucide-react';
import { GradientButton } from './GradientButton';

export function Blog() {
  const blogPosts = [
    {
      id: '1',
      image: 'https://images.unsplash.com/photo-1762330463863-a6a399beb5ba?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0ZWNobm9sb2d5JTIwYmxvZyUyMGFydGljbGV8ZW58MXx8fHwxNzY0MTUwMjg0fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'The Future of AI in Web Development',
      excerpt: 'Explore how artificial intelligence is revolutionizing the way we build and interact with websites, bringing unprecedented capabilities to modern web applications.',
      date: 'Nov 20, 2025',
      author: 'Sarah Johnson',
      readTime: '5 min read',
      category: 'AI Technology'
    },
    {
      id: '2',
      image: 'https://images.unsplash.com/photo-1757310998437-b2e8a7bd2e97?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGF0Ym90JTIwaW50ZXJmYWNlfGVufDF8fHx8MTc2NDE0MTgxN3ww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Building Custom Chatbots: A Complete Guide',
      excerpt: 'Learn the essential steps and best practices for creating intelligent chatbots that transform customer engagement and revolutionize business support systems.',
      date: 'Nov 18, 2025',
      author: 'Michael Chen',
      readTime: '8 min read',
      category: 'Chatbots'
    },
    {
      id: '3',
      image: 'https://images.unsplash.com/photo-1557324232-b8917d3c3dcb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3ZWIlMjBkZXZlbG9wbWVudCUyMGNvZGluZ3xlbnwxfHx8fDE3NjQwNzg5MDd8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral',
      title: 'Top AI Automation Tools for 2025',
      excerpt: 'Discover the latest AI automation tools that can streamline your business operations and boost productivity to unprecedented heights in the digital age.',
      date: 'Nov 15, 2025',
      author: 'Emily Rodriguez',
      readTime: '6 min read',
      category: 'Automation'
    },
    {
      id: '4',
      image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1080',
      title: 'Machine Learning in Production',
      excerpt: 'Learn the essential practices and challenges of deploying machine learning models at scale in real-world production environments.',
      date: 'Nov 10, 2025',
      author: 'David Park',
      readTime: '12 min read',
      category: 'Industry Insights'
    }
  ];

  return (
    <section id="blog" className="py-24 px-6 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-20 right-0 w-[500px] h-[500px] bg-gradient-to-l from-[#c9a227]/10 to-transparent rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 left-0 w-[600px] h-[600px] bg-gradient-to-r from-[#0e3b2c]/15 to-transparent rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1.5s' }}></div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/10 to-[#0e3b2c]/10 px-5 py-2.5 rounded-full text-sm border border-[#c9a227]/20 shadow-[0_0_20px_rgba(201,162,39,0.15)]">Our Blog</span>
          </div>
          <h2 className="text-[#efe9d6] mb-4">Latest Insights & Articles</h2>
          <p className="text-[#efe9d6]/70 max-w-2xl mx-auto">
            Stay updated with the latest insights, trends, and best practices in AI and web development
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <div
              key={index}
              className="group relative"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#c9a227]/20 to-[#0e3b2c]/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>

              <div className="relative bg-[#232323]/60 backdrop-blur-xl rounded-3xl overflow-hidden border border-[#c9a227]/10 group-hover:border-[#c9a227]/30 group-hover:shadow-[0_20px_60px_rgba(201,162,39,0.25)] transition-all duration-500 h-full flex flex-col">
                <div className="relative h-56 overflow-hidden">
                  <ImageWithFallback
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#232323] via-[#232323]/50 to-transparent opacity-60"></div>

                  {/* Category badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-gradient-to-r from-[#c9a227] via-[#d4b13f] to-[#0e3b2c] text-[#efe9d6] px-4 py-1.5 rounded-full text-xs backdrop-blur-sm shadow-lg">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-4 flex-grow flex flex-col">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3 text-[#efe9d6]/60 text-sm">
                      <span>{post.author}</span>
                      <span>•</span>
                      <span>{post.date}</span>
                    </div>
                    <h3 className="text-[#efe9d6] group-hover:text-[#c9a227] transition-colors duration-300">
                      {post.title}
                    </h3>
                    <p className="text-[#efe9d6]/70 leading-relaxed">
                      {post.excerpt}
                    </p>
                    <a href={`/blog/${post.id}`}>
                      <button className="flex items-center gap-2 text-[#c9a227] hover:gap-3 transition-all duration-300 group/btn cursor-pointer">
                        <span>Read More</span>
                        <ArrowRight className="w-5 h-5 group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <GradientButton size="lg">View All Articles</GradientButton>
        </div>
      </div>
    </section>
  );
}