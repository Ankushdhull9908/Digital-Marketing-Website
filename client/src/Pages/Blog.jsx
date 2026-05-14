import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Calendar,
  Clock,
  Share2,
  User,
  Tag,
  ChevronRight,
  CheckCircle2,
} from "lucide-react";
import { motion } from "framer-motion";

const Blog = () => {
  const { id } = useParams();

  // Blog data matching your BlogSection cards
  const blogs = {
    1: {
      title: "Creating Valuable Resources: A Guide to Linkable Assets",
      category: "SEO Strategy",
      date: "May 12, 2026",
      readTime: "7 min read",
      author: "Web Tech",
      role: "SEO Content Strategist",
      image:
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1600&q=80",
      theme: "bg-[#059669]",
      accent: "#059669",
      intro:
        "Linkable assets are high-value pieces of content that naturally attract backlinks from other websites. They are one of the most effective ways to improve domain authority and organic rankings.",
    },
    2: {
      title: "Decoding Online Advertising Costs: A Marketer's Guide",
      category: "PPC / Google Ads",
      date: "May 10, 2026",
      readTime: "6 min read",
      author: "Web Tech",
      role: "Performance Marketing Specialist",
      image:
        "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
      theme: "bg-[#0284c7]",
      accent: "#0284c7",
      intro:
        "Understanding advertising costs is essential for building profitable campaigns. This guide explains CPC, CPA, ROAS, and how to optimize your budget effectively.",
    },
    3: {
      title: "Decoding the Timeline: How Long Does Link Building Take?",
      category: "Digital Marketing",
      date: "May 08, 2026",
      readTime: "8 min read",
      author: "Web Tech",
      role: "Digital Marketing Consultant",
      image:
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=1600&q=80",
      theme: "bg-[#7c3aed]",
      accent: "#7c3aed",
      intro:
        "Link building is a long-term SEO strategy that strengthens authority and improves search rankings. Here is what to expect and how to build links consistently.",
    },
  };

  const blog = blogs[id] || blogs[1];

  const toc = [
    "Introduction",
    "Why This Matters",
    "Key Strategies",
    "Best Practices",
    "Common Mistakes",
    "Final Thoughts",
  ];

  const tips = [
    "Focus on quality over quantity",
    "Create content people genuinely want to share",
    "Track performance using analytics",
    "Stay consistent for long-term results",
  ];

  const relatedPosts = [
    "10 Proven SEO Strategies for 2026",
    "How to Increase Website Traffic Organically",
    "Complete Digital Marketing Checklist",
  ];

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-20 px-4 sm:px-6">
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-slate-700 hover:text-slate-900 font-medium mb-6"
        >
          <ArrowLeft size={18} /> Back to Blogs
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Article */}
          <motion.article
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-8 bg-white rounded-[2rem] shadow-xl overflow-hidden"
          >
            {/* Hero Section styled like your blog cards */}
            <div className={`relative min-h-[420px] ${blog.theme} p-8 md:p-14 flex flex-col justify-end text-white overflow-hidden`}>
              {/* Brand */}
              <div className="absolute top-6 left-6 flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center shadow-lg">
                  <span className="text-xs font-black tracking-wide">BeBran</span>
                </div>
              </div>

              {/* Decorative Shapes */}
              <div className="absolute -bottom-10 -right-10 w-72 h-72 bg-white/10 rounded-full" />
              <div className="absolute top-20 right-16 w-24 h-24 bg-white/10 rounded-3xl rotate-12" />

              {/* Meta */}
              <div className="flex flex-wrap gap-3 mb-6 relative z-10">
                <span className="px-4 py-2 rounded-full bg-white/20 backdrop-blur-md text-xs font-bold uppercase tracking-widest">
                  {blog.category}
                </span>
                <span className="flex items-center gap-2 text-sm text-white/90 font-medium">
                  <Calendar size={14} /> {blog.date}
                </span>
                <span className="flex items-center gap-2 text-sm text-white/90 font-medium">
                  <Clock size={14} /> {blog.readTime}
                </span>
              </div>

              {/* Title */}
              <h1 className="relative z-10 text-3xl md:text-6xl font-black uppercase leading-tight tracking-tight max-w-5xl">
                {blog.title}
              </h1>

              <p className="relative z-10 mt-6 text-base md:text-xl text-white/90 leading-relaxed max-w-3xl font-medium">
                {blog.intro}
              </p>

              <p className="relative z-10 mt-6 text-sm font-semibold tracking-widest uppercase text-white/80">
                bebran.com
              </p>
            </div>

            {/* Content */}
            <div className="p-6 md:p-12">
              {/* Author */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-6 bg-slate-50 rounded-3xl border border-slate-200 mb-10">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-[#3D7E8C] flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    AD
                  </div>
                  <div>
                    <p className="text-lg font-bold text-slate-900">{blog.author}</p>
                    <p className="text-sm font-medium text-slate-600">{blog.role}</p>
                  </div>
                </div>

                <button className="inline-flex items-center justify-center gap-2 px-4 py-3 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl transition-colors">
                  <Share2 size={16} /> Share Article
                </button>
              </div>

              {/* Featured Image */}
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-[240px] md:h-[420px] object-cover rounded-3xl shadow-lg mb-10"
              />

              {/* Article Text with high-contrast colors */}
              <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-headings:font-extrabold prose-p:text-slate-700 prose-p:leading-8 prose-p:font-medium prose-strong:text-slate-900 prose-li:text-slate-700 prose-li:font-medium">
                <p>
                  In today's competitive digital landscape, businesses need a
                  structured strategy to improve visibility and attract
                  high-quality traffic. Success does not happen overnight, but
                  consistent efforts can deliver exceptional long-term results.
                </p>

                <h2>Why This Matters</h2>
                <p>
                  Whether you are investing in SEO, link building, or paid
                  advertising, understanding the timeline and expected outcomes
                  helps you set realistic goals and measure return on investment.
                </p>

                <blockquote className="border-l-4 pl-6 py-3 rounded-r-2xl bg-slate-50 text-slate-800 font-semibold not-italic">
                  Great marketing is about building systems that continue to
                  generate leads and revenue over time.
                </blockquote>

                <h2>Key Strategies</h2>
                <ul>
                  <li>Perform in-depth competitor research</li>
                  <li>Create valuable and shareable content</li>
                  <li>Optimize technical website performance</li>
                  <li>Build authority through backlinks</li>
                  <li>Monitor and refine continuously</li>
                </ul>

                <h2>Best Practices</h2>
                <p>
                  Focus on creating helpful content, improving user experience,
                  and maintaining a consistent publishing schedule. Over time,
                  these efforts compound and produce stronger rankings and more
                  qualified leads.
                </p>

                <h2>Common Mistakes</h2>
                <ul>
                  <li>Expecting instant results</li>
                  <li>Prioritizing quantity over quality</li>
                  <li>Ignoring analytics and reporting</li>
                  <li>Using outdated tactics</li>
                </ul>

                <h2>Final Thoughts</h2>
                <p>
                  Sustainable digital growth comes from strategic planning,
                  patience, and execution. Businesses that stay consistent and
                  focus on value creation achieve the strongest long-term
                  results.
                </p>
              </div>

              {/* Tips Grid */}
              <div className="grid md:grid-cols-2 gap-4 my-10">
                {tips.map((tip) => (
                  <div
                    key={tip}
                    className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-200"
                  >
                    <CheckCircle2
                      size={20}
                      style={{ color: blog.accent }}
                      className="mt-0.5"
                    />
                    <span className="text-slate-800 font-semibold">{tip}</span>
                  </div>
                ))}
              </div>

              {/* Tags */}
              <div className="pt-8 border-t border-slate-200">
                <div className="flex items-center gap-3 flex-wrap">
                  <Tag size={18} className="text-slate-500" />
                  {[blog.category, "Marketing", "Growth", "Strategy"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="px-4 py-2 bg-slate-100 text-slate-700 font-semibold text-sm rounded-full"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </motion.article>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6">
            {/* Table of Contents */}
            <div className="bg-white rounded-[2rem] shadow-lg p-6 sticky top-28">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Table of Contents
              </h3>
              <div className="space-y-3">
                {toc.map((item, index) => (
                  <a
                    key={item}
                    href="#"
                    className="flex items-start gap-3 text-slate-700 hover:text-slate-900 font-medium transition-colors"
                  >
                    <span className="text-xs font-bold text-slate-400 mt-1">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span>{item}</span>
                  </a>
                ))}
              </div>
            </div>

            {/* Related Articles */}
            <div className="bg-white rounded-[2rem] shadow-lg p-6">
              <h3 className="text-xl font-bold text-slate-900 mb-4">
                Related Articles
              </h3>
              <div className="space-y-4">
                {relatedPosts.map((post) => (
                  <div
                    key={post}
                    className="p-4 rounded-2xl hover:bg-slate-50 transition-colors cursor-pointer border border-transparent hover:border-slate-200"
                  >
                    <h4 className="font-semibold text-slate-800 leading-6">
                      {post}
                    </h4>
                    <div className="mt-2 inline-flex items-center gap-2 text-sm font-medium text-slate-600">
                      Read More <ArrowRight size={14} />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="bg-[#002D62] rounded-[2rem] p-8 text-white shadow-xl">
              <h3 className="text-2xl font-black uppercase leading-tight">
                Want to Grow Your Business?
              </h3>
              <p className="mt-4 text-white/85 leading-relaxed font-medium">
                Get a custom digital marketing strategy tailored to your goals.
              </p>
              <button className="mt-6 w-full py-4 bg-[#F39221] hover:bg-orange-500 rounded-xl font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-colors">
                Get Free Consultation
                <ChevronRight size={18} />
              </button>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Blog;
