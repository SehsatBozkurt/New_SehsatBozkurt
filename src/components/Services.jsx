import React from 'react';
import { motion } from 'framer-motion';
import { FiBook, FiTarget, FiTrendingUp, FiUsers, FiAward, FiBriefcase } from 'react-icons/fi';

const Services = () => {
  const services = [
    {
      icon: <FiBook size={32} />,
      title: "Book Insights",
      description: "Curated summaries and key takeaways from influential business literature"
    },
    {
      icon: <FiTarget size={32} />,
      title: "Action Plans",
      description: "Practical implementation strategies derived from proven methodologies"
    },
    {
      icon: <FiTrendingUp size={32} />,
      title: "Growth Strategies",
      description: "Data-driven approaches to sustainable business development"
    },
    {
      icon: <FiUsers size={32} />,
      title: "Leadership Wisdom",
      description: "Essential leadership principles from renowned business thinkers"
    },
    {
      icon: <FiAward size={32} />,
      title: "Best Practices",
      description: "Industry-tested methods for operational excellence"
    },
    {
      icon: <FiBriefcase size={32} />,
      title: "Case Studies",
      description: "Real-world applications and success stories"
    }
  ];

  return (
    <section className="py-24 bg-[#010000]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Knowledge Areas
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Expert insights and practical solutions for business excellence
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-[#5A1818] via-[#380808] to-[#1E0000] p-8 h-full border border-[#5A1818]/20 hover:border-[#5A1818]/50 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-black/0 via-black/0 to-black/20 z-0" />
                <div className="relative z-10">
                  <div className="mb-6 inline-block p-4 bg-[#5A1818] rounded-xl text-white group-hover:scale-110 transition-transform duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-200 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;