import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiPlus } from 'react-icons/fi';
import { useBlog } from '../../../contexts/BlogContext';

const CategoryManager = () => {
  const { categories, setCategories } = useBlog();
  const [newCategory, setNewCategory] = useState({ name: '', description: '' });
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      setCategories(categories.map(cat =>
        cat.id === editingId ? { ...cat, ...newCategory } : cat
      ));
      setEditingId(null);
    } else {
      setCategories([...categories, {
        id: Date.now().toString(),
        slug: newCategory.name.toLowerCase().replace(/\s+/g, '-'),
        ...newCategory
      }]);
    }
    setNewCategory({ name: '', description: '' });
  };

  const handleEdit = (category) => {
    setNewCategory({ name: category.name, description: category.description });
    setEditingId(category.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this category?')) {
      setCategories(categories.filter(cat => cat.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Categories</h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
            placeholder="Category Name"
            className="flex-1 bg-gray-800 rounded-lg px-4 py-2"
            required
          />
          <input
            type="text"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
            placeholder="Description (optional)"
            className="flex-1 bg-gray-800 rounded-lg px-4 py-2"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-[#5A1818] hover:bg-[#380808] text-white rounded-lg transition-colors"
          >
            {editingId ? 'Update' : 'Add'} Category
          </button>
        </div>
      </form>

      <div className="grid gap-4">
        {categories.map((category) => (
          <motion.div
            key={category.id}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-between bg-gray-800 rounded-lg p-4"
          >
            <div>
              <h4 className="font-medium text-white">{category.name}</h4>
              {category.description && (
                <p className="text-sm text-gray-400">{category.description}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <button
                onClick={() => handleEdit(category)}
                className="p-2 text-gray-400 hover:text-white transition-colors"
              >
                <FiEdit2 size={18} />
              </button>
              <button
                onClick={() => handleDelete(category.id)}
                className="p-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <FiTrash2 size={18} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CategoryManager;