import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FiHome, FiFileText, FiUsers, FiSettings, FiBox, FiMessageSquare, FiTag, FiFolder } from 'react-icons/fi';

const AdminSidebar = () => {
  const location = useLocation();

  const menuItems = [
    { icon: FiHome, label: 'Dashboard', path: '/admin' },
    {
      icon: FiFileText,
      label: 'Posts',
      path: '/admin/blog',
      subItems: [
        { label: 'All Posts', path: '/admin/blog' },
        { label: 'Add New', path: '/admin/blog/new' },
        { label: 'Categories', path: '/admin/blog/categories' },
        { label: 'Tags', path: '/admin/blog/tags' },
        { label: 'Comments', path: '/admin/blog/comments' }
      ]
    },
    { icon: FiUsers, label: 'Users', path: '/admin/users' },
    { icon: FiBox, label: 'Media', path: '/admin/media' },
    { icon: FiSettings, label: 'Settings', path: '/admin/settings' },
  ];

  return (
    <aside className="w-64 min-h-screen bg-black/30 backdrop-blur-lg border-r border-white/10">
      <nav className="p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname.startsWith(item.path);
            
            return (
              <li key={item.path}>
                {item.subItems ? (
                  <div className="mb-2">
                    <div className={`flex items-center space-x-3 px-4 py-3 rounded-lg ${
                      isActive ? 'bg-[#5A1818] text-white' : 'text-gray-400'
                    }`}>
                      <Icon size={20} />
                      <span>{item.label}</span>
                    </div>
                    <ul className="ml-8 mt-2 space-y-1">
                      {item.subItems.map((subItem) => (
                        <li key={subItem.path}>
                          <Link
                            to={subItem.path}
                            className={`block px-4 py-2 rounded-lg text-sm ${
                              location.pathname === subItem.path
                                ? 'bg-[#380808] text-white'
                                : 'text-gray-400 hover:bg-[#1E0000] hover:text-white'
                            }`}
                          >
                            {subItem.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <Link
                    to={item.path}
                    className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-[#5A1818] text-white'
                        : 'text-gray-400 hover:bg-[#1E0000] hover:text-white'
                    }`}
                  >
                    <Icon size={20} />
                    <span>{item.label}</span>
                  </Link>
                )}
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default AdminSidebar;