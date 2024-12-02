import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiTarget, FiAward, FiTrendingUp, FiUsers, FiRefreshCw } from 'react-icons/fi';

const Features = () => {
  const features = [
    {
      icon: <FiBookOpen size={24} />,
      title: "Expert Analysis",
      description: "In-depth analysis of business literature and methodologies"
    },
    {
      icon: <FiTarget size={24} />,
      title: "Actionable Insights",
      description: "Practical steps and implementation strategies"
    },
    {
      icon: <FiAward size={24} />,
      title: "Proven Methods",
      description: "Time-tested approaches to business success"
    },
    {
      icon: <FiTrendingUp size={24} />,
      title: "Growth Focus",
      description: "Strategies for sustainable business development"
    },
    {
      icon: <FiUsers size={24} />,
      title: "Leadership Guidance",
      description: "Essential principles for effective leadership"
    },
    {
      icon: <FiRefreshCw size={24} />,
      title: "Regular Updates",
      description: "Fresh insights from latest business literature"
    }
  ];

  return (
    <section className="py-32 bg-gradient-to-b from-black via-[#1E0000] to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold text-white mb-6 tracking-tight">
            Our Approach
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Transforming business knowledge into practical success strategies
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="p-8 bg-gradient-to-br from-[#1E0000] to-black rounded-2xl border border-[#380808] hover:border-[#5A1818]/30 transition-colors"
            >
              <div className="inline-block p-3 bg-gradient-to-br from-[#5A1818] to-[#380808] rounded-xl text-white mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-semibold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-300 leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;