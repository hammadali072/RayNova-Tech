import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Calendar, Clock, User, Share2, Facebook, Twitter, Linkedin, Link as LinkIcon, ChevronRight, MessageCircle } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { GradientButton } from '../components/GradientButton';

// Mock blog data - In production, this would come from an API/database
const getBlogById = (id: string) => {
  const blogs: any = {
    '1': {
      id: '1',
      title: 'The Future of AI-Powered Web Development',
      category: 'AI Technology',
      author: {
        name: 'Sarah Johnson',
        role: 'Chief AI Architect',
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
        bio: 'Sarah is a leading AI expert with over 10 years of experience in machine learning and web development. She specializes in creating intelligent systems that transform user experiences.'
      },
      publishDate: 'November 28, 2024',
      readingTime: '8 min read',
      featuredImage: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200',
      tags: ['AI', 'Web Development', 'Technology', 'Innovation'],
      content: [
        { type: 'paragraph', content: 'Artificial Intelligence is revolutionizing the way we build and interact with websites. From personalized user experiences to intelligent automation, AI is becoming an integral part of modern web development.' },
        { type: 'h2', content: 'The Rise of Intelligent Websites' },
        { type: 'paragraph', content: 'Traditional websites are evolving into intelligent platforms that can learn from user behavior, adapt to preferences, and provide personalized experiences in real-time. This transformation is powered by advanced AI algorithms and machine learning models.' },
        { type: 'h3', content: 'Key Benefits of AI Integration' },
        { type: 'paragraph', content: 'Integrating AI into web development offers numerous advantages:' },
        { type: 'list', items: ['Enhanced user personalization and engagement', 'Automated content recommendations', 'Intelligent chatbots for 24/7 customer support', 'Predictive analytics for better decision making', 'Improved security through anomaly detection'] },
        { type: 'h2', content: 'Practical Applications' },
        { type: 'paragraph', content: 'AI-powered websites are already transforming industries. E-commerce platforms use recommendation engines to suggest products, media sites curate personalized content feeds, and businesses deploy chatbots to handle customer inquiries efficiently.' },
        { type: 'image', content: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', alt: 'AI Analytics Dashboard' },
        { type: 'h3', content: 'The Technical Stack' },
        { type: 'paragraph', content: 'Building AI-powered websites requires a modern tech stack. Popular frameworks include TensorFlow.js for in-browser machine learning, natural language processing libraries for chatbots, and cloud-based AI services from providers like OpenAI, Google, and AWS.' },
        { type: 'quote', content: 'AI is not just a feature—it\'s becoming the foundation of next-generation web experiences.' },
        { type: 'h2', content: 'Looking Ahead' },
        { type: 'paragraph', content: 'The future of web development is intelligent, adaptive, and deeply personalized. As AI technologies continue to advance, we can expect even more sophisticated applications that blur the line between human and machine interaction.' }
      ],
      relatedPosts: [
        { id: '2', title: 'Building Conversational AI Chatbots', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400', category: 'Chatbots' },
        { id: '4', title: 'Machine Learning in Production', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400', category: 'Industry Insights' }
      ]
    },
    '2': {
      id: '2',
      title: 'Building Conversational AI Chatbots',
      category: 'Chatbots',
      author: {
        name: 'Michael Chen',
        role: 'Head of AI Solutions',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200',
        bio: 'Michael is a chatbot specialist with expertise in natural language processing and conversational AI. He has deployed chatbot solutions for Fortune 500 companies worldwide.'
      },
      publishDate: 'November 18, 2025',
      readingTime: '10 min read',
      featuredImage: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=1200',
      tags: ['Chatbots', 'AI', 'Customer Service', 'NLP'],
      content: [
        { type: 'paragraph', content: 'Chatbots have transformed from simple rule-based systems to sophisticated AI-powered assistants capable of understanding context, emotion, and intent. This comprehensive guide will walk you through the process of building a custom chatbot from scratch.' },
        { type: 'h2', content: 'Understanding Chatbot Architecture' },
        { type: 'paragraph', content: 'A modern chatbot consists of several key components: Natural Language Understanding (NLU) for interpreting user input, Dialog Management for maintaining conversation flow, and Natural Language Generation (NLG) for creating human-like responses.' },
        { type: 'h3', content: 'Types of Chatbots' },
        { type: 'paragraph', content: 'Before building your chatbot, it\'s essential to understand the different types available:' },
        { type: 'list', items: ['Rule-based chatbots: Follow predefined conversation paths', 'AI-powered chatbots: Use machine learning to understand context', 'Hybrid chatbots: Combine rules with AI capabilities', 'Voice-enabled chatbots: Support spoken conversations', 'Transactional chatbots: Handle specific tasks like bookings or payments'] },
        { type: 'h2', content: 'Planning Your Chatbot' },
        { type: 'paragraph', content: 'Success starts with proper planning. Define your chatbot\'s purpose, target audience, and key use cases. Will it handle customer support, generate leads, or provide information? Each goal requires different design considerations and technical approaches.' },
        { type: 'image', content: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800', alt: 'Chatbot Interface Design' },
        { type: 'h3', content: 'Essential Features to Include' },
        { type: 'paragraph', content: 'Every effective chatbot should include fallback responses for unrecognized queries, context awareness to remember previous messages, personality that matches your brand, and seamless handoff to human agents when necessary.' },
        { type: 'quote', content: 'The best chatbots don\'t just answer questions—they understand intent and provide value at every interaction.' },
        { type: 'h2', content: 'Technical Implementation' },
        { type: 'paragraph', content: 'Choose a development approach that fits your needs. Options include platforms like Dialogflow or Rasa for quick deployment, custom development using Python and TensorFlow for full control, or hybrid solutions that combine pre-built tools with custom code.' },
        { type: 'h3', content: 'Training Your Chatbot' },
        { type: 'paragraph', content: 'Training is crucial for chatbot success. Collect diverse conversation examples, label intents and entities accurately, test extensively with real users, and continuously refine based on feedback and analytics.' },
        { type: 'h2', content: 'Deployment and Optimization' },
        { type: 'paragraph', content: 'Once built, deploy your chatbot across relevant channels—website, mobile app, messaging platforms, or voice assistants. Monitor performance metrics like conversation completion rate, user satisfaction, and response accuracy to guide ongoing improvements.' }
      ],
      relatedPosts: [
        { id: '1', title: 'The Future of AI-Powered Web Development', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400', category: 'AI Technology' },
        { id: '4', title: 'Machine Learning in Production', image: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=400', category: 'Industry Insights' }
      ]
    },
    '3': {
      id: '3',
      title: 'Top AI Automation Tools for 2025',
      category: 'AI Automation',
      author: {
        name: 'Emily Rodriguez',
        role: 'AI Automation Strategist',
        avatar: 'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?w=200',
        bio: 'Emily specializes in AI-driven automation solutions that help businesses scale faster. With 8+ years of experience, she has consulted for global enterprises on workflow automation, AI agents, and optimization strategies.'
      },
      publishDate: 'November 15, 2025',
      readingTime: '9 min read',
      featuredImage: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200',
      tags: ['Automation', 'AI Tools', 'Productivity', 'AI Agents', 'Business'],
      content: [
        {
          type: 'paragraph',
          content:
            'The surge of AI automation tools in 2025 has reshaped how businesses operate. From AI agents that manage entire workflows to advanced automation platforms that eliminate repetitive tasks, companies are rapidly adopting AI to reduce costs and boost productivity.'
        },
        { type: 'h2', content: 'Why AI Automation Matters in 2025' },
        {
          type: 'paragraph',
          content:
            'Automation is no longer optional. With increasing competition and rising operational costs, businesses are turning to AI systems that can handle scheduling, customer support, data processing, and decision-making—often with higher accuracy than humans.'
        },
        {
          type: 'h3',
          content: 'Key Benefits of AI Automation'
        },
        {
          type: 'list',
          items: [
            'Eliminates repetitive manual tasks',
            'Reduces operational costs significantly',
            'Boosts accuracy and reduces human error',
            'Enables 24/7 automated workflows',
            'Empowers teams to focus on high-value activities'
          ]
        },
        { type: 'h2', content: 'Top AI Automation Tools Dominating 2025' },
        {
          type: 'paragraph',
          content:
            'Below are the most powerful AI automation tools that are leading the industry this year. These platforms combine AI agents, workflow automation, natural language processing, and integrations to streamline complex tasks.'
        },
        {
          type: 'h3',
          content: '1. OpenFlow AI Agents'
        },
        {
          type: 'paragraph',
          content:
            'OpenFlow allows businesses to deploy autonomous AI agents capable of handling multi-step tasks such as lead qualification, onboarding, customer support, and data analysis. The agents learn from user behavior and improve over time.'
        },
        {
          type: 'image',
          content:
            'https://images.unsplash.com/photo-1535223289827-42f1e9919769?w=800',
          alt: 'AI Agent Workflow Dashboard'
        },
        {
          type: 'h3',
          content: '2. Zapier AI+',
        },
        {
          type: 'paragraph',
          content:
            'Zapier AI+ integrates deep AI reasoning into workflows, automatically generating automation sequences based on natural language instructions. Users can build entire workflows without touching a single line of code.'
        },
        {
          type: 'h3',
          content: '3. Notion AI Workflows'
        },
        {
          type: 'paragraph',
          content:
            'Notion AI expanded its ecosystem in 2025 with advanced workflow automation. Users can automate content creation, project updates, reminders, and database syncing—making it a powerful productivity suite.'
        },
        {
          type: 'h3',
          content: '4. Microsoft Copilot Automation Hub'
        },
        {
          type: 'paragraph',
          content:
            'Microsoft’s Copilot ecosystem now includes a dedicated automation hub that connects Office, Teams, Azure, and Dynamics. AI agents can schedule meetings, summarize documents, automate reports, and manage CRM tasks.'
        },
        {
          type: 'h3',
          content: '5. UiPath Autopilot'
        },
        {
          type: 'paragraph',
          content:
            'UiPath continues to dominate enterprise-grade automation. In 2025, their new Autopilot system combines generative AI with robotic process automation (RPA), enabling faster and smarter automation pipelines across business operations.'
        },
        {
          type: 'quote',
          content:
            'AI automation is no longer about saving time—it’s about transforming how teams operate at the core.'
        },
        { type: 'h2', content: 'Choosing the Right Automation Tool' },
        {
          type: 'paragraph',
          content:
            'The best tool depends on your business needs. Start by identifying bottlenecks, repetitive workflows, customer support demands, or data-heavy processes. Once identified, choose a platform with integrations that match your existing stack.'
        },
        { type: 'h3', content: 'Key Factors to Consider' },
        {
          type: 'list',
          items: [
            'Integration capabilities',
            'AI agent flexibility',
            'Security and compliance',
            'Ease of use',
            'Scalability for future needs'
          ]
        },
        { type: 'h2', content: 'The Future of AI Automation' },
        {
          type: 'paragraph',
          content:
            'By 2026, experts predict that AI agents will handle up to 40% of routine tasks in most digital businesses. As automation becomes smarter and more autonomous, companies that adopt early will see major competitive advantages.'
        }
      ],
      relatedPosts: [
        {
          id: '1',
          title: 'The Future of AI-Powered Web Development',
          image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400',
          category: 'AI Technology'
        },
        {
          id: '2',
          title: 'Building Conversational AI Chatbots',
          image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400',
          category: 'Chatbots'
        }
      ]
    },
    '4': {
      id: '4',
      title: 'Machine Learning in Production',
      category: 'Industry Insights',
      author: {
        name: 'David Park',
        role: 'ML Engineering Lead',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200',
        bio: 'David specializes in deploying and scaling machine learning models in production environments. With experience at major tech companies, he focuses on ML operations and infrastructure.'
      },
      publishDate: 'November 10, 2025',
      readingTime: '12 min read',
      featuredImage: 'https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?w=1200',
      tags: ['Machine Learning', 'MLOps', 'Production', 'DevOps', 'AI'],
      content: [
        { type: 'paragraph', content: 'Deploying machine learning models to production is vastly different from training them in a notebook. This comprehensive guide explores the challenges, best practices, and tools needed to successfully run ML systems at scale in real-world environments.' },
        { type: 'h2', content: 'The Production ML Lifecycle' },
        { type: 'paragraph', content: 'Unlike traditional software, ML systems require continuous monitoring, retraining, and validation. The production lifecycle includes data collection, feature engineering, model training, deployment, monitoring, and iteration—all of which must work seamlessly together.' },
        { type: 'h3', content: 'Key Challenges in Production ML' },
        { type: 'paragraph', content: 'Organizations face several critical challenges when moving ML to production:' },
        { type: 'list', items: ['Model drift: Performance degradation over time as data patterns change', 'Scalability: Handling millions of predictions per second', 'Latency requirements: Real-time inference under strict time constraints', 'Data quality: Ensuring training data reflects production reality', 'Version control: Managing multiple model versions simultaneously', 'Reproducibility: Ensuring consistent results across environments'] },
        { type: 'h2', content: 'MLOps: DevOps for Machine Learning' },
        { type: 'paragraph', content: 'MLOps brings DevOps principles to machine learning, enabling reliable and efficient deployment of ML models. It encompasses automated testing, continuous integration/deployment, monitoring, and governance of ML systems.' },
        { type: 'image', content: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800', alt: 'ML Pipeline Architecture' },
        { type: 'h3', content: 'Essential MLOps Components' },
        { type: 'list', items: ['Experiment tracking: Tools like MLflow or Weights & Biases', 'Feature stores: Centralized repositories for ML features', 'Model registry: Versioned storage for trained models', 'Automated pipelines: Orchestration with Airflow or Kubeflow', 'Monitoring systems: Track model performance and data drift', 'A/B testing frameworks: Safely deploy and validate new models'] },
        { type: 'h2', content: 'Infrastructure Considerations' },
        { type: 'paragraph', content: 'Production ML requires robust infrastructure. Cloud platforms offer managed services for model deployment, but many organizations build custom solutions using Kubernetes, Docker, and specialized ML serving frameworks like TensorFlow Serving or TorchServe.' },
        { type: 'quote', content: 'In production ML, the model is just 5% of the system. The other 95% is infrastructure, monitoring, and data pipelines.' },
        { type: 'h3', content: 'Deployment Strategies' },
        { type: 'paragraph', content: 'Choose the right deployment pattern for your use case. Batch inference processes large volumes offline, real-time inference serves individual predictions on-demand, and edge deployment runs models on local devices for ultra-low latency.' },
        { type: 'h2', content: 'Monitoring and Maintenance' },
        { type: 'paragraph', content: 'Continuous monitoring is critical. Track business metrics, model performance metrics, data quality metrics, and infrastructure metrics. Set up alerts for anomalies and establish clear processes for model retraining and updates.' },
        { type: 'h3', content: 'Handling Model Drift' },
        { type: 'paragraph', content: 'Model drift occurs when the statistical properties of the target variable change over time. Implement automated retraining pipelines, maintain diverse training datasets, and use shadow deployments to validate new models before full rollout.' },
        { type: 'h2', content: 'Best Practices' },
        { type: 'paragraph', content: 'Start simple with the minimum viable ML product, automate everything possible, maintain comprehensive documentation, implement robust testing at every stage, and build in observability from day one. Remember that simpler models often perform better in production than complex ones that are harder to maintain and debug.' },
        { type: 'h3', content: 'Team Structure' },
        { type: 'paragraph', content: 'Successful production ML requires collaboration between data scientists, ML engineers, DevOps engineers, and software engineers. Clear handoff processes and shared responsibilities ensure smooth operation of ML systems at scale.' }
      ],
      relatedPosts: [
        { id: '1', title: 'The Future of AI-Powered Web Development', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400', category: 'AI Technology' },
        { id: '2', title: 'Building Conversational AI Chatbots', image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=400', category: 'Chatbots' }
      ]
    }
  };
  return blogs[id];
};

export function BlogDetailPage() {
  const { id } = useParams();
  const blog = getBlogById(id || '1');
  const [comment, setComment] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-[#efe9d6]">Blog post not found</div>
      </div>
    );
  }

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({ name, email, comment });
    setName('');
    setEmail('');
    setComment('');
    alert('Comment submitted successfully!');
  };

  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';

  return (
    <div className="min-h-screen bg-[#0f0f0f]">
      <Header />

      {/* Hero Section with Featured Image */}
      <section className="relative pt-20 overflow-hidden">
        {/* Featured Image */}
        <div className="relative h-[60vh] md:h-[70vh]">
          <ImageWithFallback
            src={blog.featuredImage}
            alt={blog.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f0f0f] via-[#0f0f0f]/60 to-transparent"></div>

          {/* Content Overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12">
            <div className="max-w-4xl mx-auto">
              {/* Category Badge */}
              <div className="inline-block mb-4">
                <span className="text-[#c9a227] bg-gradient-to-r from-[#c9a227]/20 to-[#0e3b2c]/20 px-4 py-2 rounded-full text-sm border border-[#c9a227]/30 shadow-[0_0_20px_rgba(201,162,39,0.15)]">
                  {blog.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-[#efe9d6] mb-6 leading-tight">
                {blog.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-[#efe9d6]/70">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4 text-[#c9a227]" />
                  <span className="text-sm">{blog.author.name}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-[#c9a227]" />
                  <span className="text-sm">{blog.publishDate}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#c9a227]" />
                  <span className="text-sm">{blog.readingTime}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 md:py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            {/* Main Article Content */}
            <article className="lg:col-span-8">
              <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-8 md:p-12">
                {/* Blog Content */}
                <div className="prose prose-invert prose-lg max-w-none">
                  {blog.content.map((block: any, index: number) => {
                    switch (block.type) {
                      case 'h2':
                        return (
                          <h2 key={index} className="text-[#efe9d6] mt-12 mb-6 first:mt-0">
                            {block.content}
                          </h2>
                        );
                      case 'h3':
                        return (
                          <h3 key={index} className="text-[#efe9d6] mt-8 mb-4">
                            {block.content}
                          </h3>
                        );
                      case 'paragraph':
                        return (
                          <p key={index} className="text-[#efe9d6]/80 leading-relaxed mb-6">
                            {block.content}
                          </p>
                        );
                      case 'list':
                        return (
                          <ul key={index} className="space-y-3 mb-6">
                            {block.items.map((item: string, i: number) => (
                              <li key={i} className="flex items-start gap-3 text-[#efe9d6]/80">
                                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-[#c9a227] to-[#0e3b2c] mt-2 flex-shrink-0"></div>
                                <span>{item}</span>
                              </li>
                            ))}
                          </ul>
                        );
                      case 'image':
                        return (
                          <div key={index} className="my-8 rounded-2xl overflow-hidden border border-[#c9a227]/10">
                            <ImageWithFallback
                              src={block.content}
                              alt={block.alt || 'Blog image'}
                              className="w-full h-auto"
                            />
                          </div>
                        );
                      case 'quote':
                        return (
                          <blockquote key={index} className="border-l-4 border-[#c9a227] pl-6 py-4 my-8 bg-[#c9a227]/5 rounded-r-xl">
                            <p className="text-[#efe9d6] italic text-xl leading-relaxed">
                              {block.content}
                            </p>
                          </blockquote>
                        );
                      default:
                        return null;
                    }
                  })}
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-[#c9a227]/10">
                  <div className="flex flex-wrap gap-3">
                    {blog.tags.map((tag: string, index: number) => (
                      <span
                        key={index}
                        className="px-4 py-2 bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-full text-[#efe9d6]/70 text-sm hover:bg-[#c9a227]/10 hover:border-[#c9a227]/40 transition-all cursor-pointer"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Share Buttons */}
                <div className="mt-8 pt-8 border-t border-[#c9a227]/10">
                  <div className="flex items-center justify-between flex-wrap gap-4">
                    <h4 className="text-[#efe9d6]">Share this article</h4>
                    <div className="flex gap-3">
                      <button className="w-11 h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group">
                        <Facebook className="w-5 h-5 text-[#efe9d6]" />
                      </button>
                      <button className="w-11 h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group">
                        <Twitter className="w-5 h-5 text-[#efe9d6]" />
                      </button>
                      <button className="w-11 h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group">
                        <Linkedin className="w-5 h-5 text-[#efe9d6]" />
                      </button>
                      <button className="w-11 h-11 bg-[#0f0f0f]/60 backdrop-blur-xl rounded-xl flex items-center justify-center border border-[#c9a227]/20 hover:bg-gradient-to-br hover:from-[#c9a227] hover:to-[#0e3b2c] hover:border-transparent transition-all duration-300 group">
                        <LinkIcon className="w-5 h-5 text-[#efe9d6]" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Author Bio Section */}
              <div className="mt-8 bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-8">
                <h3 className="text-[#efe9d6] mb-6">About the Author</h3>
                <div className="flex gap-6 items-start">
                  <div className="w-20 h-20 rounded-2xl overflow-hidden flex-shrink-0 border-2 border-[#c9a227]/30">
                    <ImageWithFallback
                      src={blog.author.avatar}
                      alt={blog.author.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="text-[#efe9d6] mb-1">{blog.author.name}</h4>
                    <p className="text-[#c9a227] text-sm mb-3">{blog.author.role}</p>
                    <p className="text-[#efe9d6]/70 leading-relaxed">
                      {blog.author.bio}
                    </p>
                  </div>
                </div>
              </div>

              {/* Comments Section */}
              <div className="mt-8 bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-8">
                <h3 className="text-[#efe9d6] mb-6 flex items-center gap-2">
                  <MessageCircle className="w-6 h-6 text-[#c9a227]" />
                  Leave a Comment
                </h3>

                <form onSubmit={handleCommentSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label htmlFor="name" className="text-[#efe9d6] text-sm block">
                        Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="email" className="text-[#efe9d6] text-sm block">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="comment" className="text-[#efe9d6] text-sm block">
                      Comment *
                    </label>
                    <textarea
                      id="comment"
                      value={comment}
                      onChange={(e) => setComment(e.target.value)}
                      required
                      rows={5}
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300 resize-none"
                      placeholder="Share your thoughts..."
                    />
                  </div>

                  <GradientButton size="lg">
                    Post Comment
                  </GradientButton>
                </form>
              </div>
            </article>

            {/* Sidebar */}
            <aside className="lg:col-span-4">
              <div className="sticky top-24 space-y-8">
                {/* Related Posts */}
                <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-6">
                  <h3 className="text-[#efe9d6] mb-6">Related Articles</h3>
                  <div className="space-y-4">
                    {blog.relatedPosts.map((post: any) => (
                      <a
                        key={post.id}
                        href={`/blog/${post.id}`}
                        className="group block"
                      >
                        <div className="flex gap-4 p-3 rounded-xl hover:bg-[#c9a227]/5 transition-all">
                          <div className="w-20 h-20 rounded-xl overflow-hidden flex-shrink-0 border border-[#c9a227]/10">
                            <ImageWithFallback
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[#c9a227] text-xs mb-1">{post.category}</div>
                            <h4 className="text-[#efe9d6] text-sm leading-tight group-hover:text-[#c9a227] transition-colors line-clamp-2">
                              {post.title}
                            </h4>
                          </div>
                          <ChevronRight className="w-4 h-4 text-[#efe9d6]/40 group-hover:text-[#c9a227] transition-colors flex-shrink-0 mt-1" />
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Newsletter Signup */}
                {/* <div className="bg-gradient-to-br from-[#c9a227]/10 to-[#0e3b2c]/10 backdrop-blur-xl border border-[#c9a227]/20 rounded-3xl p-6">
                  <h3 className="text-[#efe9d6] mb-3">Subscribe to Our Newsletter</h3>
                  <p className="text-[#efe9d6]/70 text-sm mb-4">
                    Get the latest insights on AI and web development delivered to your inbox.
                  </p>
                  <form className="space-y-3">
                    <input
                      type="email"
                      placeholder="your@email.com"
                      className="w-full bg-[#0f0f0f]/60 border border-[#c9a227]/20 rounded-xl px-4 py-3 text-[#efe9d6] placeholder-[#efe9d6]/40 focus:outline-none focus:border-[#c9a227]/60 focus:ring-2 focus:ring-[#c9a227]/20 transition-all duration-300"
                    />
                    <GradientButton size="sm" className="w-full">
                      Subscribe
                    </GradientButton>
                  </form>
                </div> */}

                {/* Categories */}
                <div className="bg-[#232323]/40 backdrop-blur-xl border border-[#c9a227]/10 rounded-3xl p-6">
                  <h3 className="text-[#efe9d6] mb-4">Categories</h3>
                  <div className="space-y-2">
                    {['AI Technology', 'Web Development', 'Chatbots', 'Industry Insights', 'Case Studies'].map((category) => (
                      <a
                        key={category}
                        href={`/blog?category=${category}`}
                        className="flex items-center justify-between p-3 rounded-xl hover:bg-[#c9a227]/10 transition-all group"
                      >
                        <span className="text-[#efe9d6]/70 group-hover:text-[#c9a227] transition-colors text-sm">
                          {category}
                        </span>
                        <ChevronRight className="w-4 h-4 text-[#efe9d6]/40 group-hover:text-[#c9a227] transition-colors" />
                      </a>
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