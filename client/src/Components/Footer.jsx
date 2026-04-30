import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaFacebookF, 
  FaTwitter, 
  FaLinkedinIn, 
  FaInstagram, 
  FaGithub 
} from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    quickLinks: [
      { name: 'Home', href: '/' },
      { name: 'About', href: '/about' },
      { name: 'Contact', href: '/contact' },
      { name: 'Our Service', href: '/OurServices' },
    ],
    importantLinks: [
      { name: 'Privacy Policy', href: '#' },
      { name: 'Terms & Conditions', href: '#' },
      { name: 'Career', href: '#' },
      { name: 'Why SEO', href: '/WhySEO' },
    ],
    contactInfo: {
      phone: '+91 99999-99999',
      email: 'info@company.com',
      address: 'New Delhi, Delhi, India',
    }
  };

  const socialLinks = [
    { icon: <FaFacebookF />, href: '#' },
    { icon: <FaTwitter />, href: '#' },
    { icon: <FaLinkedinIn />, href: '#' },
    { icon: <FaInstagram />, href: '#' },
    { icon: <FaGithub />, href: '#' },
  ];

  return (
    <footer className="relative bg-white pt-16 pb-8 overflow-hidden border-t border-blue-100">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-blue-50 rounded-full blur-3xl opacity-50" />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          
          {/* Column 1: Brand/Logo */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xl"><img src='/logos/logo.png'/></span>
              </div>
              <span className="text-2xl font-bold text-gray-900 tracking-tight">
                WEB<span className="text-blue-600">Techie</span>
              </span>
            </div>
            <p className="text-gray-500 leading-relaxed max-w-xs">
              Providing premium digital solutions with a focus on UI/UX excellence and cutting-edge technology.
            </p>
          </motion.div>

          {/* Column 2: Quick Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h4 className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-6">Quick Links</h4>
            <ul className="space-y-4">
              {footerLinks.quickLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Important Links */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h4 className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-6">Important Links</h4>
            <ul className="space-y-4">
              {footerLinks.importantLinks.map((link) => (
                <li key={link.name}>
                  <a href={link.href} className="text-gray-600 hover:text-blue-600 transition-colors duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 4: Contact Us */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h4 className="text-blue-600 font-bold text-sm uppercase tracking-widest mb-6">Contact Us</h4>
            <div className="space-y-4 text-gray-600">
              <p className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Phone</span>
                <span className="text-gray-900 font-medium">{footerLinks.contactInfo.phone}</span>
              </p>
              <p className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Email</span>
                <span className="text-gray-900 font-medium">{footerLinks.contactInfo.email}</span>
              </p>
              <p className="flex flex-col">
                <span className="text-gray-400 text-xs uppercase font-semibold">Address</span>
                <span className="text-gray-900 font-medium">{footerLinks.contactInfo.address}</span>
              </p>
            </div>
          </motion.div>
        </div>

        <hr className="border-gray-100 mb-8" />

        {/* Social and Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
          <p className="text-gray-500 text-sm">
            © {currentYear} Webtech Services. All rights reserved.
          </p>
          
          <div className="flex space-x-4">
            {socialLinks.map((social, index) => (
              <motion.a
                key={index}
                href={social.href}
                whileHover={{ scale: 1.1, backgroundColor: '#2563eb', color: '#ffffff' }}
                className="w-10 h-10 flex items-center justify-center rounded-full bg-blue-50 text-blue-600 transition-all duration-300 shadow-sm"
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
