import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMenu, FiX } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import Logo from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed w-full z-50"
    >
      <div className="backdrop-blur-lg bg-black/30 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            <Logo />
            
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/#features">Features</NavLink>
                <NavLink to="/blog">Blog</NavLink>
                <NavLink to="/#about">About</NavLink>
                <NavLink to="/#contact">Contact</NavLink>
              </div>
            </div>
            
            <div className="md:hidden">
              <button 
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-300 hover:text-white transition-colors"
              >
                {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 backdrop-blur-lg bg-black/30">
              <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
              <MobileNavLink to="/#features" onClick={() => setIsOpen(false)}>Features</MobileNavLink>
              <MobileNavLink to="/blog" onClick={() => setIsOpen(false)}>Blog</MobileNavLink>
              <MobileNavLink to="/#about" onClick={() => setIsOpen(false)}>About</MobileNavLink>
              <MobileNavLink to="/#contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

const NavLink = ({ to, children }) => (
  <Link
    to={to}
    className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium transition-colors relative group"
  >
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
      <motion.div
        className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 group-hover:w-full transition-all duration-300"
      />
    </motion.div>
  </Link>
);

const MobileNavLink = ({ to, children, onClick }) => (
  <Link
    to={to}
    onClick={onClick}
    className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md transition-colors"
  >
    <motion.div
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.div>
  </Link>
);

export default Navbar;