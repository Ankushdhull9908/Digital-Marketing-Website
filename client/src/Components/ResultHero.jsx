import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { get } from '../Pages/admin/shared/adminApi';
import { Link, useNavigate } from 'react-router-dom';
import {
  CheckCircle,
  HelpCircle,
  ChevronDown,
  Play,
  Clock,
  User,
  X,
  Quote,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../context/Context';
import BlogSection from './BlogSection';

const ResultHero = () => {
  const navigate = useNavigate();
  const { Testimonials = [], blogs = [], faqs = [], packages = [] } = useAuth() || {};

  const [activeTab, setActiveTab] = useState('Monthly');
  const [allClients, setAllClients] = useState([]);
  const displayBlogs = blogs.filter((b) => b?.isActive).slice(0, 3);

  useEffect(() => {
    const loadClients = async () => {
      try {
        const data = await get('/homepage');
        const clients = data?.clientVideos?.videos || [];

        setAllClients(
          clients
            .filter((client) => client?.isActive)
            .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0))
        );
      } catch (error) {
        console.error('Failed to load client testimonials:', error);
      }
    };

    loadClients();
  }, []);

  const formatDate = (dateStr) =>
    new Date(dateStr).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });

  const results = [
    'Higher Google Rankings',
    'More Website Traffic',
    'Better Lead Generation',
    'Increased Sales',
    'Strong Online Presence',
  ];

  const durations = [
    { id: 'Monthly', label: 'Monthly', sub: '(1 month)' },
    { id: 'Quarterly', label: 'Quarterly', sub: '(3 months)' },
    { id: 'HalfYearly', label: 'Half Yearly', sub: '(6 months)' },
    { id: 'Yearly', label: 'Yearly', sub: '(12 months)' },
  ];

  const activePackages = packages
    .filter((p) => p?.isActive)
    .sort((a, b) => (a?.order ?? 0) - (b?.order ?? 0));

  // Helper: format price number with commas (Indian style)
  const formatPrice = (num) => {
    if (!num && num !== 0) return '0';
    return Number(num).toLocaleString('en-IN');
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState('');

  const handleOpenModal = (packageTitle) => {
    setSelectedPackage(packageTitle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedPackage('');
  };

  // Isolated sub-component with collapse/expand state
const TestimonialCard = ({ testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="relative p-10 rounded-[2rem] bg-[#F8FAFB] border border-slate-100 flex flex-col justify-between">
      <div>
        <p
          className={`italic text-lg text-slate-600 relative z-10 leading-relaxed transition-all duration-300 ${
            !isExpanded ? 'line-clamp-3' : ''
          }`}
        >
          "{testimonial.text}"
        </p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-2 text-sm font-bold text-[#3D7E8C] hover:text-[#F39221] transition-colors inline-flex items-center gap-1 cursor-pointer focus:outline-none mb-6"
        >
          {isExpanded ? 'Show Less ▲' : 'Show More ▼'}
        </button>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-[#3D7E8C] flex items-center justify-center text-white font-bold">
          {testimonial.name?.charAt(0)}
        </div>

        <div>
          <p className="font-black text-sm text-slate-900 leading-none">
            {testimonial.name}
          </p>

          <p className="text-xs text-slate-400 mt-1">
            {testimonial.role}
          </p>
        </div>
      </div>
    </div>
  );
};

  return (
    <div className="font-montserrat text-base-content overflow-hidden w-full">
      {/* --- SECTION 1: EXPECTED RESULTS --- */}
      <section className="py-20 px-6 bg-base-200 transition-colors duration-300">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black mb-4 text-base-content">
              Results You Can Expect
            </h2>
            <p className="text-base-content/70 font-medium">
              Data-backed growth for your digital footprint.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((res, i) => (
              <div
                key={i}
                className="flex items-center gap-4 p-6 bg-base-100 text-base-content rounded-2xl shadow-sm border-b-4 border-[#3D7E8C]"
              >
                <CheckCircle className="text-[#3D7E8C]" size={24} />
                <span className="font-bold text-lg">{res}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

     {/* --- SECTION 2: TESTIMONIALS --- */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-5xl mx-auto">
          
          <div className="flex items-center gap-4 mb-12 justify-center">
            <h2 className="text-3xl md:text-5xl font-black text-center tracking-tight">
              Client <span className="text-[#3D7E8C]">Testi</span><span className="text-[#F39221]">monials</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Testimonials.map((testimonial, i) => (
              <TestimonialCard key={testimonial._id || i} testimonial={testimonial} />
            ))}
          </div>

        </div>
      </section>

      {/* --- SECTION 2: VIDEO MARQUEE --- */}
      <style
        dangerouslySetInnerHTML={{
          __html: `
        @keyframes marquee-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee-infinite {
          display: flex;
          width: max-content;
          animation: marquee-infinite 40s linear infinite;
        }
        .animate-marquee-infinite:hover {
          animation-play-state: paused;
        }
      `,
        }}
      />

      <section className="py-24 bg-base-100 overflow-hidden w-full px-0">
        <div className="max-w-7xl mx-auto px-6 mb-16 text-center">
          <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
            What our <span className="text-[#F39221]">Clients</span> say{' '}
            <span className="text-base-content">About us</span>
          </h2>

          <p className="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">
            Success Stories in Motion
          </p>
        </div>

        {/* Client Testimonials Marquee */}
        <div className="relative w-full bg-[#27717e] overflow-hidden">
          {allClients.length > 0 ? (
            <div className="animate-marquee-infinite flex">
              {[...allClients, ...allClients].map((client, index) => (
                <div
                  key={`${client._id}-${index}`}
                  className="w-[300px] md:w-[450px] bg-[#27717e] border-r border-slate-600 flex flex-col group transition-all duration-500 rounded-none"
                >
                  {/* Video */}
                  <div className="relative aspect-video bg-[#27717e] overflow-hidden rounded-none">
                    {client.videoUrl?.includes('youtube.com/embed/') ? (
                      <iframe
                        src={`${client.videoUrl}?autoplay=1&mute=1`}
                        className="w-full h-full object-cover"
                        allow="autoplay; encrypted-media; picture-in-picture"
                        allowFullScreen
                        frameBorder="0"
                        title={`${client.clientName} testimonial`}
                      />
                    ) : (
                      <video
                        src={client.videoUrl}
                        autoPlay
                        loop
                        muted
                        playsInline
                        poster={client.thumbnail || undefined}
                        className="w-full h-full object-cover"
                      />
                    )}

                    <div className="absolute top-4 right-4">
                      <div className="bg-white/10 backdrop-blur-xl p-2 rounded-full border border-white/20">
                        <Play
                          size={12}
                          className="text-slate-300 fill-slate-300"
                        />
                      </div>
                    </div>

                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
                  </div>

                  {/* Text Content */}
                  <div className="p-8 flex flex-col flex-grow rounded-none">
                    <p className="text-slate-300 font-medium text-base italic mb-6 leading-relaxed flex-grow">
                      "
                      {client.company
                        ? `${client.clientName} from ${client.company}`
                        : client.clientName}
                      "
                    </p>

                    {/* Client Info */}
                    <div className="flex items-center gap-4 pt-6 border-t border-white/5">
                      <div className="w-10 h-10 rounded-md bg-gradient-to-br from-[#3D7E8C] to-[#F39221] flex items-center justify-center text-white text-base font-black">
                        {client.clientName?.charAt(0)}
                      </div>

                      <div>
                        <h4 className="font-black text-xs text-white tracking-tight">
                          {client.clientName}
                        </h4>

                        <p className="text-[9px] text-[#F39221] font-black uppercase tracking-widest">
                          {client.clientRole}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="py-20 text-center text-white">
              No client testimonials available.
            </div>
          )}

          {/* Side Fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-slate-950/40 to-transparent z-10" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-slate-950/40 to-transparent z-10" />
        </div>
      </section>

      {/* --- SECTION 3: PRICING --- */}
      <section className="py-24 px-6 bg-base-200">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-black mb-4 tracking-tight">
              Our <span className="text-[#F39221]">Packages</span>
            </h2>
            <div className="w-24 h-2 bg-[#3D7E8C] mx-auto rounded-full"></div>
          </div>

          {/* Duration Toggle */}
          <div className="flex justify-center mb-20 px-6">
            <div className="flex flex-wrap md:flex-nowrap justify-center gap-4 w-full max-w-7xl">
              {durations.map((d) => (
                <button
                  key={d.id}
                  onClick={() => setActiveTab(d.id)}
                  className={`flex flex-col items-center justify-center flex-1 min-w-[180px] py-8 rounded-[2.5rem] transition-all duration-300 border-2 ${
                    activeTab === d.id
                      ? 'bg-[#F39221] border-slate-900 text-slate-900 shadow-2xl scale-105 z-10'
                      : 'bg-white border-slate-100 text-slate-400 hover:border-[#3D7E8C]/50'
                  }`}
                >
                  <span className="text-base font-black uppercase tracking-[0.2em]">
                    {d.label}
                  </span>
                  <span
                    className={`text-[10px] font-bold mt-1 uppercase tracking-widest ${
                      activeTab === d.id ? 'text-[#3D7E8C]' : 'text-slate-400'
                    }`}
                  >
                    {d.sub}
                  </span>
                  {activeTab === d.id && (
                    <motion.div
                      layoutId="activeUnderline"
                      className="w-12 h-1.5 bg-[#3D7E8C] mt-4 rounded-full"
                    />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {activePackages.length === 0 ? (
              <div className="col-span-4 text-center text-slate-400 py-16">
                No packages available.
              </div>
            ) : (
              activePackages.map((pkg) => (
                <motion.div
                  key={pkg._id}
                  whileHover={{ y: -10 }}
                  className={`relative p-10 rounded-[3rem] border-2 flex flex-col transition-all duration-500 overflow-hidden text-white ${
                    pkg.featured
                      ? 'bg-[#16676e] border-[#F39221] shadow-2xl scale-105 z-10'
                      : 'bg-[#27717e] border-white/5'
                  }`}
                >
                  {pkg.featured && (
                    <div className="absolute top-6 right-8 bg-[#F39221] text-black text-[10px] font-black px-3 py-1 rounded-full uppercase">
                      Most Popular
                    </div>
                  )}
                  {pkg.badge && !pkg.featured && (
                    <div className="absolute top-6 right-8 bg-red-500 text-white text-[10px] font-black px-3 py-1 rounded-full uppercase">
                      {pkg.badge}
                    </div>
                  )}

                  <div className="relative z-10">
                    <h3 className="text-2xl font-black mb-3 tracking-tight">
                      {pkg.title}
                    </h3>
                    <p className="text-white text-sm font-medium mb-8 leading-relaxed h-12">
                      {pkg.description}
                    </p>
                  </div>

                  <div className="mb-10 relative z-10">
                    <div className="flex items-baseline gap-1">
                      <span className="text-4xl font-black">
                        ₹{formatPrice(pkg.prices?.[activeTab] ?? pkg.price ?? 0)}
                      </span>
                      <span className="text-white text-lg font-bold">/-</span>
                    </div>
                  </div>

                  <div className="space-y-5 flex-grow mb-12 relative z-10">
                    {(pkg.features || []).map((f, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-4 text-xs font-bold text-white"
                      >
                        <CheckCircle
                          size={14}
                          className="text-[#F39221] mt-0.5 flex-shrink-0"
                        />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleOpenModal(pkg.title)}
                    className="relative z-10 w-full py-5 rounded-2xl text-sm font-black uppercase tracking-widest transition-all bg-[#F39221] text-black hover:bg-[#ED9A3B]"
                  >
                    Get Started Now
                  </button>
                </motion.div>
              ))
            )}
          </div>

          {/* Centered Modal Pop-up Form */}
          <AnimatePresence>
            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                {/* Backdrop Blur Overlap */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={handleCloseModal}
                  className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                />

                {/* Form Container */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 20 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 20 }}
                  className="relative w-full max-w-md bg-[#16676e] border border-[#3D7E8C] p-8 rounded-[2.5rem] shadow-2xl z-10 text-white"
                >
                  {/* Close Button */}
                  <button
                    onClick={handleCloseModal}
                    className="absolute top-6 right-6 text-slate-300 hover:text-[#F39221] transition-colors"
                  >
                    <X size={24} />
                  </button>

                  {/* Form Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-black tracking-tight mb-1">
                      Get Started
                    </h3>
                    <p className="text-slate-300 text-xs font-semibold uppercase tracking-wider">
                      Package:{' '}
                      <span className="text-[#F39221]">
                        {selectedPackage}
                      </span>
                    </p>
                  </div>

                  {/* Input Fields */}
                  <form
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-4"
                  >
                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Name
                      </label>
                      <input
                        type="text"
                        placeholder="John Doe"
                        className="w-full px-4 py-3 bg-[#27717e] border border-white/10 rounded-xl focus:outline-none focus:border-[#F39221] text-white font-medium text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="john@example.com"
                        className="w-full px-4 py-3 bg-[#27717e] border border-white/10 rounded-xl focus:outline-none focus:border-[#F39221] text-white font-medium text-sm transition-all"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold uppercase tracking-wider text-slate-300 mb-2">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="+91 98765 43210"
                        className="w-full px-4 py-3 bg-[#27717e] border border-white/10 rounded-xl focus:outline-none focus:border-[#F39221] text-white font-medium text-sm transition-all"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-6 py-4 rounded-xl text-sm font-black uppercase tracking-widest transition-all bg-[#f39121] text-black hover:bg-[#ed9a3b] shadow-lg shadow-[#f39121]/20"
                    >
                      Submit Request
                    </button>
                  </form>
                </motion.div>
              </div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* --- SECTION 4: FAQ --- */}
      <section className="py-24 px-6 bg-base-200">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-black mb-12 text-center">
            {' '}
            <span className="text-[#3D7E8C]">FAQ </span>
            <span className="text-[#F39221]">Section</span>
          </h2>
          <div className="space-y-4">
            {faqs &&
              faqs.map((faq, i) => (
                <details
                  key={i}
                  className="group p-6 rounded-2xl bg-base-100 shadow-sm cursor-pointer"
                >
                  <summary className="flex items-center justify-between font-black text-base-content list-none">
                    <div className="flex items-center gap-3">
                      <HelpCircle className="text-[#3D7E8C]" size={20} />
                      {faq.question}
                    </div>
                    <ChevronDown
                      className="group-open:rotate-180 transition-transform"
                      size={20}
                    />
                  </summary>
                  <p className="mt-4 text-base-content font-medium pl-8 border-l-2 border-[#3D7E8C]">
                    {faq.answer}
                  </p>
                </details>
              ))}
          </div>
        </div>
      </section>

      {/* --- SECTION 5: BLOG --- */}
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
                    backgroundImage: blog.image ? `url(${blog.image})` : 'none',
                    backgroundColor: blog.image ? 'transparent' : '#1e293b',
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
                      <p className="text-sm font-bold text-slate-800">
                        WebTech Digital
                      </p>
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
    </div>
  );
};

export default ResultHero;