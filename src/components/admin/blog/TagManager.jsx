import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiEdit2, FiTrash2, FiX } from 'react-icons/fi';
import { useBlog } from '../../../contexts/BlogContext';

const TagManager = () => {
  const { tags, setTags } = useBlog();
  const [newTag, setNewTag] = useState('');
  const [editingId, setEditingId] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newTag.trim()) return;

    if (editingId) {
      setTags(tags.map(tag =>
        tag.id === editingId ? { ...tag, name: newTag } : tag
      ));
      setEditingId(null);
    } else {
      setTags([...tags, {
        id: Date.now().toString(),
        name: newTag,
        slug: newTag.toLowerCase().replace(/\s+/g, '-')
      }]);
    }
    setNewTag('');
  };

  const handleEdit = (tag) => {
    setNewTag(tag.name);
    setEditingId(tag.id);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      setTags(tags.filter(tag => tag.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Tags</h3>

      <form onSubmit={handleSubmit} className="flex gap-4">
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          placeholder="Tag Name"
          className="flex-1 bg-gray-800 rounded-lg px-4 py-2"
          required
        />
        <button
          type="submit"
          className="px-6 py-2 bg-[#5A1818] hover:bg-[#380808] text-white rounded-lg transition-colors"
        >
          {editingId ? 'Update' : 'Add'} Tag
        </button>
      </form>

      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <motion.div
            key={tag.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center bg-gray-800 rounded-full px-4 py-2"
          >
            <span className="text-white mr-2">{tag.name}</span>
            <div className="flex space-x-1">
              <button
                onClick={() => handleEdit(tag)}
                className="p-1 text-gray-400 hover:text-white transition-colors"
              >
                <FiEdit2 size={14} />
              </button>
              <button
                onClick={() => handleDelete(tag.id)}
                className="p-1 text-gray-400 hover:text-red-500 transition-colors"
              >
                <FiX size={14} />
              </button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default TagManager;