import React from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, Mail, MapPin, Clock, Send, 
  MessageSquare, ChevronRight, Globe 
} from 'lucide-react';

const Contact = () => {
  // Brand Colors: Teal: #3D7E8C | Orange: #F3922

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
  };

  return (
    <div className="font-montserrat text-slate-800 bg-white overflow-hidden">
      
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

                {/* Working Hours */}
                <div className="flex items-start gap-5 p-6 rounded-3xl bg-slate-800 text-white shadow-xl">
                  <div className="bg-white/10 p-3 rounded-2xl text-[#F39221]">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-black text-lg text-white">Working Hours</h3>
                    <p className="text-slate-300 text-sm">Mon – Sat: 10:00 AM – 7:00 PM</p>
                    <p className="text-[#F39221] text-sm font-bold">Sunday: Closed</p>
                  </div>
                </div>
              </div>

              {/* Tagline Box */}
              <div className="p-8 rounded-[2.5rem] bg-[#3D7E8C]/10 border-2 border-dashed border-[#3D7E8C]/30">
                <h3 className="text-xl font-black mb-3 flex items-center gap-2">
                  <Globe className="text-[#3D7E8C]" /> Let’s Build Together
                </h3>
                <p className="text-sm font-medium text-slate-600 leading-relaxed">
                  Looking for website design, SEO, or app development? We’re just one message away! 
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

              <form className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label font-bold text-slate-700">Full Name</label>
                    <input type="text" placeholder="John Doe" className="input input-bordered rounded-2xl bg-slate-50 focus:border-[#3D7E8C]" />
                  </div>
                  <div className="form-control">
                    <label className="label font-bold text-slate-700">Email Address</label>
                    <input type="email" placeholder="name@company.com" className="input input-bordered rounded-2xl bg-slate-50 focus:border-[#3D7E8C]" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="form-control">
                    <label className="label font-bold text-slate-700">Phone Number</label>
                    <input type="text" placeholder="+91 00000 00000" className="input input-bordered rounded-2xl bg-slate-50 focus:border-[#3D7E8C]" />
                  </div>
                  <div className="form-control">
                    <label className="label font-bold text-slate-700">Subject</label>
                    <select className="select select-bordered rounded-2xl bg-slate-50 focus:border-[#3D7E8C]">
                      <option disabled selected>Pick a service</option>
                      <option>Website Design</option>
                      <option>SEO Services</option>
                      <option>Social Media</option>
                      <option>App Development</option>
                    </select>
                  </div>
                </div>

                <div className="form-control">
                  <label className="label font-bold text-slate-700 p-2">Your Message</label>
                  <textarea className="p-2 textarea textarea-bordered h-32 rounded-2xl bg-slate-50 focus:border-[#3D7E8C]" placeholder="Tell us about your project goals..."></textarea>
                </div>

                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn btn-block h-16 bg-[#F39221] hover:bg-orange-600 border-none text-white text-lg font-black rounded-2xl mt-4"
                >
                  <Send size={20} /> Send Message
                </motion.button>
                
                <p className="text-center text-xs font-bold text-slate-400 mt-4 uppercase tracking-widest">
                  Secure & Confidential Communication
                </p>
              </form>
            </motion.div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
