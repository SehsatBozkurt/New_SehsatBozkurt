import React from 'react';
import { motion } from 'framer-motion';
import { FiUsers, FiFileText, FiMessageSquare, FiEye, FiLayout } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  const stats = [
    { icon: FiFileText, label: 'Total Posts', value: '24' },
    { icon: FiUsers, label: 'Users', value: '142' },
    { icon: FiMessageSquare, label: 'Comments', value: '89' },
    { icon: FiEye, label: 'Page Views', value: '8.2k' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-white">Dashboard</h1>
        <Link
          to="/admin/generator"
          className="px-6 py-3 bg-[#5A1818] hover:bg-[#380808] rounded-full transition-colors text-white flex items-center gap-2"
        >
          <FiLayout size={20} />
          <span>Website Generator</span>
        </Link>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gradient-to-br from-[#1E0000] to-black rounded-xl p-6 border border-[#380808] hover:border-[#5A1818]/30 transition-all"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-[#5A1818] rounded-lg">
                  <Icon size={24} />
                </div>
                <div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-[#1E0000] to-black rounded-xl p-6 border border-[#380808]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Posts</h2>
            <Link 
              to="/admin/posts"
              className="text-sm text-[#5A1818] hover:text-white transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-4 bg-black/30 rounded-lg"
              >
                <div>
                  <h3 className="font-medium">Post Title {index + 1}</h3>
                  <p className="text-sm text-gray-400">Published 2 days ago</p>
                </div>
                <Link 
                  to={`/admin/posts/${index + 1}/edit`}
                  className="px-3 py-1 text-sm bg-[#5A1818] hover:bg-[#380808] rounded-full transition-colors"
                >
                  Edit
                </Link>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-[#1E0000] to-black rounded-xl p-6 border border-[#380808]">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Recent Comments</h2>
            <Link 
              to="/admin/comments"
              className="text-sm text-[#5A1818] hover:text-white transition-colors"
            >
              View All
            </Link>
          </div>
          <div className="space-y-4">
            {[1, 2, 3].map((_, index) => (
              <div
                key={index}
                className="p-4 bg-black/30 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <p className="font-medium">User Name</p>
                  <p className="text-sm text-gray-400">1 day ago</p>
                </div>
                <p className="text-sm text-gray-300">
                  Comment text goes here. This is a sample comment.
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;