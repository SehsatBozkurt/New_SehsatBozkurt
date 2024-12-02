import React from 'react';
import { motion } from 'framer-motion';
import { FiGithub, FiTwitter, FiLinkedin, FiMail, FiLock } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Footer = () => {
  return (
    <footer className="bg-black text-gray-400">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Logo />
            <p className="mt-4 text-gray-400 max-w-xs">
              Pushing the boundaries of digital experiences with cutting-edge technology.
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-4"
          >
            <h3 className="text-lg font-semibold text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="hover:text-red-500 transition-colors">Home</Link></li>
              <li><Link to="/#features" className="hover:text-red-500 transition-colors">Features</Link></li>
              <li><Link to="/#about" className="hover:text-red-500 transition-colors">About</Link></li>
              <li><Link to="/#contact" className="hover:text-red-500 transition-colors">Contact</Link></li>
              <li><Link to="/imprint" className="hover:text-red-500 transition-colors">Impressum</Link></li>
              <li>
                <Link 
                  to="/admin" 
                  className="flex items-center gap-2 hover:text-red-500 transition-colors"
                >
                  <FiLock size={14} />
                  <span>Admin Panel</span>
                </Link>
              </li>
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold text-white mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <SocialLink href="#" icon={<FiGithub size={20} />} />
              <SocialLink href="#" icon={<FiTwitter size={20} />} />
              <SocialLink href="#" icon={<FiLinkedin size={20} />} />
              <SocialLink href="#" icon={<FiMail size={20} />} />
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-12 pt-8 border-t border-gray-800 text-center"
        >
          <p>&copy; 2023 Sehsat Bozkurt. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

const SocialLink = ({ href, icon }) => (
  <motion.a
    whileHover={{ scale: 1.1, y: -2 }}
    whileTap={{ scale: 0.95 }}
    href={href}
    className="p-3 bg-gray-900 rounded-full text-gray-400 hover:text-red-500 hover:bg-gray-800 transition-colors"
  >
    {icon}
  </motion.a>
);

export default Footer;