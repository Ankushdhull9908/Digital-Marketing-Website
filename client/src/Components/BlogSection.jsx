import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Clock, User } from "lucide-react";

const BlogSection = () => {
  const navigate = useNavigate();

  const blogs = [
    {
      id: 1,
      title: "Creating Valuable Resources: A Guide to Linkable Assets",
      category: "SEO Strategy",
      author: "Sr. Writer",
      date: "May 12, 2026",
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=500&auto=format&fit=crop",
      color: "bg-[#059669]", // Emerald/Green theme from your image
    },
    {
      id: 2,
      title: "Decoding Online Advertising Costs: A Marketer's Guide",
      category: "PPC / Google Ads",
      author: "Sr. Writer",
      date: "May 10, 2026",
      image: "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=500&auto=format&fit=crop",
      color: "bg-[#0284c7]", // Blue theme
    },
    {
      id: 3,
      title: "Decoding the Timeline: How Long Does Link Building Take?",
      category: "Digital Marketing",
      author: "Sr. Writer",
      date: "May 08, 2026",
      image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=500&auto=format&fit=crop",
      color: "bg-[#7c3aed]", // Purple theme
    },
  ];

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
          {blogs.map((blog) => (
            <motion.div
              key={blog.id}
              whileHover={{ y: -10 }}
              onClick={() => navigate(`/blog/${blog.id}`)}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-slate-100 cursor-pointer group"
            >
              {/* Image Header with Overlay Text */}
              <div className={`relative h-64 ${blog.color} p-8 flex flex-col justify-center text-white`}>
                <div className="absolute top-4 left-4 flex items-center gap-2">
                   <div className="w-8 h-8 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center">
                      <span className="text-[10px] font-bold">WebTech</span>
                   </div>
                </div>
                <h3 className="text-xl font-black uppercase leading-tight mt-4 group-hover:scale-105 transition-transform duration-500">
                  {blog.title}
                </h3>
                <p className="text-xs mt-4 opacity-80 font-medium">bebran.com</p>
                {/* Decorative background shapes */}
                <div className="absolute bottom-0 right-0 opacity-10">
                   <div className="w-32 h-32 bg-white rounded-tl-full" />
                </div>
              </div>

              {/* Author Info Section */}
              <div className="p-8">
                <div className="flex items-center justify-between mb-6 pb-4 border-b border-dashed border-slate-200">
                  <div>
                    <p className="text-sm font-bold text-slate-800">BeBran Digital</p>
                    <p className="text-xs text-slate-500 font-medium">{blog.author}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-[#3D7E8C]/10 flex items-center justify-center">
                    <User size={20} className="text-[#3D7E8C]" />
                  </div>
                </div>

                <button className="w-full py-4 bg-[#002D62] text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-[#F39221] transition-colors duration-300 flex items-center justify-center gap-2">
                  READ MORE <ArrowRight size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;