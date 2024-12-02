import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import logo from '../components/type=white.png';

const Logo = ({ className = "" }) => {
  return (
    <Link to="/">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className={`flex items-center ${className}`}
      >
        <img 
          src={logo} 
          alt="Sehsat Bozkurt Logo"
          className="h-12 w-auto"
        />
      </motion.div>
    </Link>
  );
};

export default Logo;