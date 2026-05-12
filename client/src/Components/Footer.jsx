import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaGithub,
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
  const currentYear= new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', to: '/' },
      { name: 'About', to: '/about' },
      { name: 'Contact', to: '/contact' },
      { name: 'Our Service', to: '/OurServices' },
    ],
    importantLinks: [
      { name: 'Privacy Policy', to: '/privacy-policy' },
      { name: 'Terms & Conditions', to: '/terms-and-conditions' },
      { name: 'Career', to: '/career' },
      { name: 'Why SEO', to: '/WhySEO' },
    ],
    contactInfo: {
      phone: '+91 85271 31997',
      email: 'info@webtechieservice.com',
      address: 'New Delhi, Delhi, India',
    }
  };

  const socialLinks = [
    { icon: <FaFacebookF />, href: 'https://facebook.com' },
    { icon: <FaTwitter />, href: 'https://twitter.com' },
    { icon: <FaLinkedinIn />, href: 'https://linkedin.com' },
    { icon: <FaInstagram />, href: 'https://instagram.com' },
    { icon: <FaGithub />, href: 'https://github.com' },
  ];

  return (
    <footer className="relative bg-[#FDFDFD] pt-20 pb-10 overflow-hidden font-montserrat">
      {/* Brand Aesthetic Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px]  rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px]  rounded-full blur-[100px] translate-x-1/3 translate-y-1/3" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Column 1: Brand/Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <Link to="/" className="flex items-center group">
              <div className="w-12 h-12  rounded-2xl flex items-center justify-center transition-transform duration-500 group-hover:rotate-12 shadow-lg overflow-hidden">
                <img src='/logos/logo.png' alt="Logo" className="w-24 h-36 object-contain" />
              </div>
              <span className="ml-4 text-2xl font-black text-slate-900 tracking-tighter">
                WEB<span className="text-[#3D7E8C]">Tech</span>
              </span>
            </Link>
            <p className="text-slate-500 text-sm leading-relaxed font-medium">
              Transforming businesses through premium digital solutions. We blend 
              <span className="text-[#F39221]"> UI/UX excellence </span> with modern engineering.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.2em] mb-8 relative inline-block">
              Quick Links
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#F39221] rounded-full" />
            </h4>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-slate-500 hover:text-[#3D7E8C] font-semibold text-sm transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[2px] bg-[#3D7E8C] mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Important Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.2em] mb-8 relative inline-block">
              Information
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-[#3D7E8C] rounded-full" />
            </h4>
            <ul className="space-y-4">
              {footerLinks.importantLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.to}
                    className="text-slate-500 hover:text-[#3D7E8C] font-semibold text-sm transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-4 h-[2px] bg-[#3D7E8C] mr-0 group-hover:mr-2 transition-all duration-300" />
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Us */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-slate-900 font-black text-xs uppercase tracking-[0.2em] mb-8 relative inline-block">
              Contact
              <span className="absolute -bottom-2 left-0 w-8 h-1 bg-slate-900 rounded-full" />
            </h4>
            <div className="space-y-6">
              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#3D7E8C] shadow-sm group-hover:bg-[#3D7E8C] group-hover:text-white transition-all duration-300">
                  <FaPhoneAlt size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Call Us</p>
                  <p className="text-sm font-bold text-slate-900">{footerLinks.contactInfo.phone}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-[#F39221] shadow-sm group-hover:bg-[#F39221] group-hover:text-white transition-all duration-300">
                  <FaEnvelope size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Email Us</p>
                  <p className="text-sm font-bold text-slate-900">{footerLinks.contactInfo.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-4 group">
                <div className="w-10 h-10 rounded-xl bg-white border border-slate-100 flex items-center justify-center text-slate-900 shadow-sm group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                  <FaMapMarkerAlt size={14} />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Location</p>
                  <p className="text-sm font-bold text-slate-900">{footerLinks.contactInfo.address}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-slate-200/60 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">
            © {currentYear} Webtech Services. <span className="hidden md:inline">Built with precision.</span>
          </p>
          
          <div className="flex gap-3">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5 }}
                className="w-10 h-10 flex items-center justify-center rounded-xl bg-white border border-slate-200 text-slate-600 hover:text-white hover:bg-slate-900 hover:border-slate-900 transition-all duration-300 shadow-sm"
              >
                {social.icon}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
