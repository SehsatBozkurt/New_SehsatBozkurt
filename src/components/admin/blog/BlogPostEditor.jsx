import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import MDEditor from '@uiw/react-md-editor';
import DatePicker from 'react-datepicker';
import Select from 'react-select';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { createBlogPost, updateBlogPost, uploadImage } from '../../../utils/blogService';
import { useBlog } from '../../../contexts/BlogContext';

const BlogPostEditor = ({ post, mode = 'create' }) => {
  const navigate = useNavigate();
  const { categories, tags } = useBlog();
  const [formData, setFormData] = useState({
    title: post?.title || '',
    content: post?.content || '',
    excerpt: post?.excerpt || '',
    featuredImage: post?.featuredImage || '',
    publishDate: post?.publishDate ? new Date(post.publishDate) : new Date(),
    status: post?.status || 'draft',
    categories: post?.categories || [],
    tags: post?.tags || [],
    seo: post?.seo || { title: '', description: '', keywords: [] }
  });

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      const file = acceptedFiles[0];
      const result = await uploadImage(file);
      setFormData(prev => ({ ...prev, featuredImage: result.url }));
    } catch (error) {
      console.error('Error uploading image:', error);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (mode === 'create') {
        await createBlogPost(formData);
      } else {
        await updateBlogPost(post.slug, formData);
      }
      navigate('/admin/blog');
    } catch (error) {
      console.error('Error saving post:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-8"
    >
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {mode === 'create' ? 'Create New Post' : 'Edit Post'}
        </h2>
        <div className="space-x-4">
          <button
            onClick={() => setFormData(prev => ({ ...prev, status: 'draft' }))}
            className="px-4 py-2 bg-gray-800 rounded-lg"
          >
            Save Draft
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 bg-[#5A1818] rounded-lg"
          >
            Publish
          </button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-2 space-y-6">
          <input
            type="text"
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Post Title"
            className="w-full bg-gray-800 rounded-lg px-4 py-2"
          />

          <MDEditor
            value={formData.content}
            onChange={(value) => setFormData(prev => ({ ...prev, content: value || '' }))}
            preview="edit"
            height={400}
          />

          <textarea
            value={formData.excerpt}
            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
            placeholder="Post Excerpt"
            className="w-full bg-gray-800 rounded-lg px-4 py-2 h-32"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Post Settings</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Publish Date</label>
                <DatePicker
                  selected={formData.publishDate}
                  onChange={(date) => setFormData(prev => ({ ...prev, publishDate: date }))}
                  className="w-full bg-gray-700 rounded-lg px-4 py-2"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Categories</label>
                <Select
                  isMulti
                  options={categories.map(cat => ({ value: cat.id, label: cat.name }))}
                  value={formData.categories.map(cat => ({ value: cat, label: cat }))}
                  onChange={(selected) => setFormData(prev => ({
                    ...prev,
                    categories: selected.map(option => option.value)
                  }))}
                  className="react-select"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Tags</label>
                <Select
                  isMulti
                  options={tags.map(tag => ({ value: tag.id, label: tag.name }))}
                  value={formData.tags.map(tag => ({ value: tag, label: tag }))}
                  onChange={(selected) => setFormData(prev => ({
                    ...prev,
                    tags: selected.map(option => option.value)
                  }))}
                  className="react-select"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Featured Image</label>
                <div
                  {...getRootProps()}
                  className={`border-2 border-dashed rounded-lg p-4 text-center cursor-pointer
                    ${isDragActive ? 'border-[#5A1818]' : 'border-gray-600'}`}
                >
                  <input {...getInputProps()} />
                  {formData.featuredImage ? (
                    <img
                      src={formData.featuredImage}
                      alt="Featured"
                      className="w-full h-32 object-cover rounded-lg"
                    />
                  ) : (
                    <p>Drag & drop an image here, or click to select one</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gray-800 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">SEO Settings</h3>
            <div className="space-y-4">
              <input
                type="text"
                value={formData.seo.title}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  seo: { ...prev.seo, title: e.target.value }
                }))}
                placeholder="SEO Title"
                className="w-full bg-gray-700 rounded-lg px-4 py-2"
              />
              <textarea
                value={formData.seo.description}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  seo: { ...prev.seo, description: e.target.value }
                }))}
                placeholder="SEO Description"
                className="w-full bg-gray-700 rounded-lg px-4 py-2 h-24"
              />
              <input
                type="text"
                value={formData.seo.keywords.join(', ')}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  seo: { ...prev.seo, keywords: e.target.value.split(',').map(k => k.trim()) }
                }))}
                placeholder="SEO Keywords (comma-separated)"
                className="w-full bg-gray-700 rounded-lg px-4 py-2"
              />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogPostEditor;