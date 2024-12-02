import React from 'react';
import { motion } from 'framer-motion';
import { useWebsiteContext } from '../../contexts/WebsiteContext';
import { availableComponents } from '../../data/componentBlocks';

const ComponentSelector = () => {
  const { selectedComponents, addComponent, removeComponent } = useWebsiteContext();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1E0000] to-black rounded-xl p-6 border border-[#380808]"
    >
      <h2 className="text-xl font-semibold mb-6">Select Components</h2>
      
      <div className="space-y-4">
        {availableComponents.map((component) => (
          <div
            key={component.id}
            className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
          >
            <div>
              <h3 className="font-medium">{component.name}</h3>
              <p className="text-sm text-gray-400">{component.description}</p>
            </div>
            <button
              onClick={() => selectedComponents.includes(component.id) 
                ? removeComponent(component.id)
                : addComponent(component.id)
              }
              className={`px-4 py-2 rounded-full transition-colors ${
                selectedComponents.includes(component.id)
                  ? 'bg-[#5A1818] text-white'
                  : 'bg-[#1E0000] text-gray-400'
              }`}
            >
              {selectedComponents.includes(component.id) ? 'Remove' : 'Add'}
            </button>
          </div>
        ))}
      </div>
    </motion.div>
  );
};

export default ComponentSelector;