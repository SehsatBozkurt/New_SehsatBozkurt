import React from 'react';
import { motion } from 'framer-motion';
import { useWebsiteContext } from '../../contexts/WebsiteContext';

const StyleSelector = () => {
  const { framework, setFramework, primaryColor, setPrimaryColor, secondaryColor, setSecondaryColor } = useWebsiteContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1E0000] to-black rounded-xl p-6 border border-[#380808]"
    >
      <h2 className="text-xl font-semibold mb-6">Style Settings</h2>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Framework</label>
          <select
            value={framework}
            onChange={(e) => setFramework(e.target.value)}
            className="w-full bg-black/30 border border-[#380808] rounded-lg px-4 py-2 text-white"
          >
            <option value="bootstrap">Bootstrap</option>
            <option value="remix">Remix</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Primary Color</label>
          <input
            type="color"
            value={primaryColor}
            onChange={(e) => setPrimaryColor(e.target.value)}
            className="w-full h-10 bg-black/30 border border-[#380808] rounded-lg cursor-pointer"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Secondary Color</label>
          <input
            type="color"
            value={secondaryColor}
            onChange={(e) => setSecondaryColor(e.target.value)}
            className="w-full h-10 bg-black/30 border border-[#380808] rounded-lg cursor-pointer"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default StyleSelector;