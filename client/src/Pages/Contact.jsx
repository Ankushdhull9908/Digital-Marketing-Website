import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Send, 
  MessageSquare, Globe, CheckCircle, AlertCircle ,Target, Users, Award, Eye, Rocket
} from 'lucide-react';

const Contact= () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(null); // null | true | false

  var API = "https://digital-marketing-temp.onrender.com/api/contact"
  ? "https://digital-marketing-temp.onrender.com/api/contact"
  : "http://localhost:5000/api/contact";

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setFormData({ fullName: "", email: "", phone: "", subject: "", message: "" });
      } else {
        setSuccess(false);
        console.error(data.message);
      }
    } catch (err) {
      setSuccess(false);
      console.error("Network error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="font-montserrat text-slate-800 bg-white overflow-hidden">
     {/* -- CONTACT US HERO SECTION --- */}
      <section className="relative pt-24 pb-32 px-6 bg-[#0f172a] overflow-hidden text-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?auto=format&fit=crop&q=80" 
            alt="Contact background" 
            className="w-full h-full object-cover opacity-25"
          />
          {/* Gradient overlay to transition smoothly to the next section */}
          <div className="absolute inset-0 " />
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 max-w-4xl mx-auto"
        >
          <span className="text-[#F39221] font-black uppercase text-xs tracking-[0.3em] mb-4 block">
            Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white tracking-tighter mb-6">
            Contact <span className="text-[#3D7E8C]">Us</span>
          </h1>
          {/* Theme Underline */}
          <div className="w-24 h-2 bg-[#F39221] mx-auto rounded-full mb-8"></div>
          
          <p className="text-slate-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Have a project in mind or just want to say hello? Our team is ready 
            to help you architect your next big digital move.
          </p>
        </motion.div>
      </section>
      {/* --- HERO HEADER --- */}
      <section className="pt-20 pb-12 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto text-center">
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl font-black mb-6"
          >
            Get in <span className="text-[#3D7E8C]">Touch</span>
          </motion.h1>
          <p className="text-slate-500 font-medium max-w-2xl mx-auto text-lg">
            Have questions or want to discuss your project? Connect with us through the details below.
          </p>
        </div>
      </section>

      <section className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* --- COLUMN 1: CONTACT INFO --- */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-5 space-y-8"
            >
              <div className="space-y-6">
                {/* Phone */}
                <div className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#3D7E8C]/30 transition-all">
                  <div className="bg-[#3D7E8C] p-3 rounded-2xl text-white">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">Phone</h3>
                    <p className="text-slate-600 font-bold">+91 85271 31997</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#3D7E8C]/30 transition-all">
                  <div className="bg-[#F39221] p-3 rounded-2xl text-white">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">Email</h3>
                    <p className="text-slate-600 font-medium">info@webtechieservice.com</p>
                    <p className="text-slate-600 font-medium">sales@webtechieservice.com</p>
                  </div>
                </div>

                {/* Address */}
                <div className="flex items-start gap-5 p-6 rounded-3xl bg-slate-50 border border-slate-100 hover:border-[#3D7E8C]/30 transition-all">
                  <div className="bg-[#3D7E8C] p-3 rounded-2xl text-white">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg">Address</h3>
                    <p className="text-slate-600 font-medium">Delhi, India</p>
                  </div>
                </div>

               
              </div>

              {/* Tagline Box */}
              <div className="p-8 rounded-[2.5rem] bg-[#3D7E8C]/10 border-2 border-dashed border-[#3D7E8C]/30">
                <h3 className="text-xl font-black mb-3 flex items-center gap-2">
                  <Globe className="text-[#3D7E8C]" /> Let's Build Together
                </h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Looking for website design, SEO, or app development? We're just one message away! 
                  Take the first step toward growing your business online.
                </p>
              </div>
            </motion.div>

            {/* --- COLUMN 2: CONTACT FORM --- */}
            <motion.div 
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              className="lg:col-span-7 bg-white rounded-[3rem] shadow-2xl border border-slate-100 p-8 md:p-12"
            >
              <div className="mb-8">
                <h2 className="text-2xl md:text-3xl font-black mb-2 flex items-center gap-3">
                  <MessageSquare className="text-[#F39221]" /> Send Us a Message
                </h2>
                <p className="text-slate-500 font-medium">We usually respond within 24 hours.</p>
              </div>

              {/* Success / Error Banner */}
              {success === true && (
                <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-700">
                  <CheckCircle size={20} />
                  <p className="font-bold text-sm">Message sent! We'll get back to you within 24 hours.</p>
                </div>
              )}
              {success === false && (
                <div className="flex items-center gap-3 mb-6 p-4 rounded-2xl bg-red-50 border border-red-200 text-red-600">
                  <AlertCircle size={20} />
                  <p className="font-bold text-sm">Something went wrong. Please try again.</p>
                </div>
              )}

              <form className="space-y-5" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label font-bold text-slate-700">Full Name</label>
                    <input
                      type="text"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder="John Doe"
                      required
                      className="input input-bordered rounded-2xl bg-slate-50 focus:border-[#3D7E8C]"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label font-bold text-slate-700">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.com"
                      required
                      className="input input-bordered rounded-2xl bg-slate-50 focus:border-[#3D7E8C]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label font-bold text-slate-700">Phone Number</label>
                    <input
                      type="text"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+91 00000 00000"
                      className="input input-bordered rounded-2xl bg-slate-50 focus:border-[#3D7E8C]"
                    />
                  </div>
                  <div className="form-control">
                    <label className="label font-bold text-slate-700">Subject</label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="select select-bordered rounded-2xl bg-slate-50 focus:border-[#3D7E8C]"
                    >
                      <option value="">Pick a service</option>
                      <option>Website Design</option>
                      <option>SEO Services</option>
                      <option>Social Media</option>
                      <option>App Development</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-slate-700 p-2">Your Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="p-2 textarea textarea-bordered h-32 rounded-2xl bg-slate-50 focus:border-[#3D7E8C]"
                    placeholder="Tell us about your project goals..."
                  ></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  disabled={loading}
                  className="btn btn-block h-16 bg-[#F39221] hover:bg-orange-600 border-none text-white text-lg font-black rounded-2xl mt-4 disabled:opacity-60"
                >
                  {loading ? (
                    <span className="loading loading-spinner loading-md"></span>
                  ) : (
                    <><Send size={20} /> Send Message</>
                  )}
                </motion.button>
                
                <p className="text-center text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">
                  Secure & Confidential Communication
                </p>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    {/* --- MAP & ADDRESS SECTION --- */}
<section className="py-24 px-6 bg-slate-50/50 relative overflow-hidden">
  {/* Decorative Background Blob for the Map section */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#3D7E8C]/5 rounded-full blur-[120px] pointer-events-none" />

  <div className="max-w-5xl mx-auto relative z-10">
    <div className="text-center mb-12">
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl md:text-4xl font-black mb-4">Visit Our <span className="text-[#3D7E8C]">Office</span></h2>
        <p className="text-slate-500 font-medium italic">"Where creativity meets technology."</p>
      </motion.div>
    </div>

    {/* Centered Styled Map Container */}
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative mx-auto w-full max-w-4xl group"
    >
      {/* Decorative Border/Glow Effect */}
      <div className="absolute -inset-4 bg-gradient-to-r from-[#3D7E8C]/20 to-[#F39221]/20 rounded-[4rem] blur-xl opacity-50 group-hover:opacity-100 transition duration-1000"></div>
      
      {/* Main Map Frame */}
      <div className="relative h-[450px] md:h-[550px] rounded-[3.5rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.1)] border-[6px] border-white">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d224345.8392319277!2d77.0688975472!3d28.527280343!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cfd5b34766357%3A0xd8341144df389270!2sDelhi!5e0!3m2!1sen!2sin!4v1715000000000!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0 }} 
          allowFullScreen="" 
          loading="lazy" 
          referrerPolicy="no-referrer-when-downgrade"
          className="grayscale contrast-125 brightness-105 group-hover:grayscale-0 transition-all duration-1000 ease-in-out scale-105 group-hover:scale-100"
        />
        
        {/* Floating Glassmorphic Badge */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-md border border-white/20 px-8 py-4 rounded-2xl shadow-2xl z-10 flex items-center gap-4 min-w-[280px]">
          <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shrink-0 shadow-lg">
            <MapPin size={18} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black text-[#3D7E8C] uppercase tracking-[0.2em]">Our Headquarters</p>
            <p className="text-sm font-bold text-slate-900">New Delhi, India</p>
          </div>
        </div>
      </div>
    </motion.div>
    
    <div className="mt-12 text-center">
       <p className="text-slate-400 text-xs font-bold uppercase tracking-[0.4em]">Global Operations • Local Expertise</p>
    </div>
  </div>
</section>
    </div>
  );
};

export default Contact;
