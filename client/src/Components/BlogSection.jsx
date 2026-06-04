import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, User } from "lucide-react";
import { useAuth } from "../context/Context";

const BlogSection = () => {
  const navigate = useNavigate();
  const { blogs } = useAuth();

  // Show latest 3 active blogs
  const displayBlogs = blogs.filter(b => b.isActive).slice(0, 3);

  // Format date nicely
  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString("en-IN", {
      day: "numeric", month: "long", year: "numeric",
    });

  if (displayBlogs.length === 0) return null;

  return (
    <section className="py-24 px-6 bg-base-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black tracking-tighter text-base-content uppercase"
          >
            FROM THE <span className="text-[#F39221]">BLOG</span>
          </motion.h2>
          <div className="w-20 h-1.5 bg-[#3D7E8C] mx-auto mt-4 rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {displayBlogs.map((blog) => (
            <motion.div
              key={blog._id}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/blog/${blog._id}`)}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 cursor-pointer group"
            >
              {/* Image Header */}
              <div
                style={{
                  backgroundImage: blog.image ? `url(${blog.image})` : "none",
                  backgroundColor: blog.image ? "transparent" : "#1e293b",
                }}
                className="relative h-64 bg-cover bg-center p-8 flex flex-col justify-center"
              >
                <div className="absolute inset-0 bg-black/40 backdrop-blur-[3px] z-0" />

                {/* Category badge */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 bg-[#F39221] text-black text-[10px] font-black uppercase rounded-full tracking-wider">
                    {blog.category}
                  </span>
                </div>

                {/* Featured badge */}
                {blog.isFeatured && (
                  <div className="absolute top-4 right-4 z-10">
                    <span className="px-3 py-1 bg-[#3D7E8C] text-white text-[10px] font-black uppercase rounded-full tracking-wider">
                      Featured
                    </span>
                  </div>
                )}

                <h3 className="text-xl font-black uppercase leading-tight mt-8 group-hover:scale-105 transition-transform duration-500 z-10 text-white">
                  {blog.title}
                </h3>
              </div>

              {/* Card Body */}
              <div className="p-8">
                {/* Excerpt */}
                {blog.excerpt && (
                  <p className="text-sm text-slate-500 mb-4 line-clamp-2 leading-relaxed">
                    {blog.excerpt}
                  </p>
                )}

                <div className="flex items-center justify-between mb-6 pb-4 border-b border-dashed border-slate-200">
                  <div>
                    <p className="text-sm font-bold text-slate-800">WebTech Digital</p>
                    <p className="text-xs text-slate-500 font-medium">
                      {blog.author} · {formatDate(blog.publishedAt)}
                    </p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#3D7E8C]/10 flex items-center justify-center">
                    <User size={20} className="text-[#3D7E8C]" />
                  </div>
                </div>

                {/* Tags */}
                {blog.tags?.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {blog.tags.slice(0, 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-slate-100 text-slate-500 text-[10px] font-semibold rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}

                <button className="w-full py-4 bg-[#002D62] text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-[#F39221] transition-colors duration-300 flex items-center justify-center gap-2">
                  READ MORE <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="flex justify-center items-center w-full">
          <Link
            to="/blog"
            className="w-full max-w-xs p-6 m-auto mt-10 bg-[#3D7E8C] text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-[#F39221] transition-colors duration-300 flex items-center justify-center gap-2"
          >
            VIEW ALL BLOGS <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;