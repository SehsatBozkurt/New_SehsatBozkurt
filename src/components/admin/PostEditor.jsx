import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { createPost, updatePost } from '../../utils/cms';

const PostEditor = ({ post, mode = 'create' }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    description: post?.description || '',
    thumbnail: post?.thumbnail || '',
    tags: post?.tags?.join(', ') || ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const postData = {
        ...formData,
        tags: formData.tags.split(',').map(tag => tag.trim())
      };

      if (mode === 'create') {
        await createPost(postData);
      } else {
        await updatePost(post.slug, postData);
      }

      navigate('/admin/posts');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#1E0000] to-black rounded-xl p-6 border border-[#380808]"
    >
      <h2 className="text-2xl font-bold mb-6">
        {mode === 'create' ? 'Create New Post' : 'Edit Post'}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            className="w-full bg-black/30 border border-[#380808] rounded-lg px-4 py-2 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            className="w-full bg-black/30 border border-[#380808] rounded-lg px-4 py-2 text-white h-24"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Content (Markdown)</label>
          <textarea
            value={formData.content}
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
            className="w-full bg-black/30 border border-[#380808] rounded-lg px-4 py-2 text-white h-64 font-mono"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Thumbnail URL</label>
          <input
            type="url"
            value={formData.thumbnail}
            onChange={(e) => setFormData({ ...formData, thumbnail: e.target.value })}
            className="w-full bg-black/30 border border-[#380808] rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags (comma-separated)</label>
          <input
            type="text"
            value={formData.tags}
            onChange={(e) => setFormData({ ...formData, tags: e.target.value })}
            className="w-full bg-black/30 border border-[#380808] rounded-lg px-4 py-2 text-white"
          />
        </div>

        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate('/admin/posts')}
            className="px-6 py-2 bg-black/30 text-white rounded-full hover:bg-[#1E0000] transition-colors"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-2 bg-[#5A1818] text-white rounded-full hover:bg-[#380808] transition-colors"
          >
            {mode === 'create' ? 'Create Post' : 'Update Post'}
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default PostEditor;