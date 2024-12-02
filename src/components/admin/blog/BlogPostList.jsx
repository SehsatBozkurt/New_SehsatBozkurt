import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiEdit2, FiTrash2, FiEye, FiMessageSquare } from 'react-icons/fi';
import { useBlog } from '../../../contexts/BlogContext';
import { deleteBlogPost } from '../../../utils/blogService';

const BlogPostList = () => {
  const { posts, setPosts } = useBlog();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || post.categories.includes(selectedCategory);
    return matchesSearch && matchesCategory;
  });

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deleteBlogPost(slug);
        setPosts(posts.filter(post => post.slug !== slug));
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Blog Posts</h2>
        <Link
          to="/admin/blog/new"
          className="px-6 py-2 bg-[#5A1818] hover:bg-[#380808] text-white rounded-full transition-colors"
        >
          Create New Post
        </Link>
      </div>

      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="flex-1 bg-gray-800 rounded-lg px-4 py-2"
        />
      </div>

      <div className="bg-gradient-to-br from-[#1E0000] to-black rounded-xl overflow-hidden border border-[#380808]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-black/30">
                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Status</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Comments</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#380808]">
              {currentPosts.map((post) => (
                <motion.tr
                  key={post.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-black/20"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      {post.featuredImage && (
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-10 h-10 rounded object-cover mr-3"
                        />
                      )}
                      <div>
                        <p className="font-medium text-white">{post.title}</p>
                        <p className="text-sm text-gray-400 truncate max-w-md">
                          {post.excerpt}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      post.status === 'published' ? 'bg-green-500/20 text-green-400' :
                      post.status === 'draft' ? 'bg-gray-500/20 text-gray-400' :
                      'bg-yellow-500/20 text-yellow-400'
                    }`}>
                      {post.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {format(new Date(post.publishDate), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center text-gray-400">
                      <FiMessageSquare className="mr-2" />
                      <span>{post.comments?.length || 0}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="inline-block p-2 text-gray-400 hover:text-white transition-colors"
                      target="_blank"
                    >
                      <FiEye size={18} />
                    </Link>
                    <Link
                      to={`/admin/blog/${post.slug}/edit`}
                      className="inline-block p-2 text-gray-400 hover:text-white transition-colors"
                    >
                      <FiEdit2 size={18} />
                    </Link>
                    <button
                      onClick={() => handleDelete(post.slug)}
                      className="inline-block p-2 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center items-center space-x-2 p-4 border-t border-[#380808]">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 rounded-md ${
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
    </div>
  );
};

export default BlogPostList;