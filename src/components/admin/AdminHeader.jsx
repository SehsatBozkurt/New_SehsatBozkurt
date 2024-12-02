import React from 'react';
import { FiBell, FiUser, FiSettings } from 'react-icons/fi';
import Logo from '../Logo';

const AdminHeader = () => {
  return (
    <header className="bg-black/30 backdrop-blur-lg border-b border-white/10 px-8 py-4">
      <div className="flex items-center justify-between">
        <Logo />
        <div className="flex items-center space-x-4">
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <FiBell size={20} />
          </button>
          <button className="p-2 text-gray-400 hover:text-white transition-colors">
            <FiSettings size={20} />
          </button>
          <div className="flex items-center space-x-3 px-3 py-2 bg-[#1E0000] rounded-full">
            <FiUser size={20} />
            <span className="text-sm font-medium">Admin</span>
          </div>
        </div>
      </div>
    </header>
  );
}

export default AdminHeader;