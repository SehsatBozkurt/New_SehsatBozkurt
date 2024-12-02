import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import ComponentSelector from './ComponentSelector';
import StyleSelector from './StyleSelector';
import Preview from './Preview';
import { useWebsiteContext } from '../../contexts/WebsiteContext';

const WebsiteGenerator = () => {
  return (
    <div className="min-h-screen bg-background-dark p-8">
      <div className="max-w-7xl mx-auto">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl font-bold text-white mb-8"
        >
          Website Generator
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-8">
            <StyleSelector />
            <ComponentSelector />
          </div>
          
          <div className="sticky top-8">
            <Preview />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WebsiteGenerator;