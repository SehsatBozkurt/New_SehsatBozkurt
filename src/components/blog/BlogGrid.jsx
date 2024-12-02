import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiCalendar, FiTag, FiMessageSquare } from 'react-icons/fi';
import { useBlog } from '../../contexts/BlogContext';

const BlogGrid = () => {
  const { posts, categories, tags } = useBlog();
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.categories.includes(selectedCategory);
    const matchesTag = !selectedTag || post.tags.includes(selectedTag);
    return matchesSearch && matchesCategory && matchesTag;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <section className="py-24 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Blog</h1>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Explore our latest insights, tutorials, and updates
          </p>
        </div>

        <div className="mb-12">
          <div className="flex flex-wrap gap-4 justify-center mb-8">
            <input
              type="text"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-auto flex-1 md:flex-none bg-gray-800 rounded-lg px-4 py-2"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-gray-800 rounded-lg px-4 py-2"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
            <select
              value={selectedTag}
              onChange={(e) => setSelectedTag(e.target.value)}
              className="bg-gray-800 rounded-lg px-4 py-2"
            >
              <option value="">All Tags</option>
              {tags.map((tag) => (
                <option key={tag.id} value={tag.id}>
                  {tag.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentPosts.map((post) => (
            <motion.article
              key={post.slug}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-gradient-to-br from-[#1E0000] to-black rounded-2xl overflow-hidden border border-[#380808] hover:border-[#5A1818]/30 transition-all duration-300"
            >
              {post.featuredImage && (
                <Link to={`/blog/${post.slug}`}>
                  <img
                    src={post.featuredImage}
                    alt={post.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              )}
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-4">
                  <FiCalendar className="mr-2" />
                  <span>{format(new Date(post.publishDate), 'MMMM dd, yyyy')}</span>
                </div>
                <Link to={`/blog/${post.slug}`}>
                  <h2 className="text-xl font-semibold text-white mb-3 hover:text-[#5A1818] transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-gray-300 mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center text-sm text-gray-400">
                    <FiMessageSquare className="mr-2" />
                    <span>{post.comments?.length || 0} comments</span>
                  </div>
                  <div className="flex items-center text-sm">
                    <FiTag className="mr-2 text-gray-400" />
                    <div className="flex gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-[#5A1818]/20 text-[#5A1818] rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center mt-12 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  currentPage === i + 1
                    ? 'bg-[#5A1818] text-white'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogGrid;