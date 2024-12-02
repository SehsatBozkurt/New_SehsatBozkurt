import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiEdit2, FiTrash2 } from 'react-icons/fi';
import { fetchPosts, deletePost } from '../../utils/cms';

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    try {
      const fetchedPosts = await fetchPosts();
      setPosts(fetchedPosts);
    } catch (error) {
      console.error('Error loading posts:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (slug) => {
    if (window.confirm('Are you sure you want to delete this post?')) {
      try {
        await deletePost(slug);
        await loadPosts();
      } catch (error) {
        console.error('Error deleting post:', error);
      }
    }
  };

  if (loading) {
    return <div className="text-center">Loading posts...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Blog Posts</h2>
        <Link
          to="/admin/posts/new"
          className="px-6 py-2 bg-[#5A1818] text-white rounded-full hover:bg-[#380808] transition-colors"
        >
          Create New Post
        </Link>
      </div>

      <div className="bg-gradient-to-br from-[#1E0000] to-black rounded-xl overflow-hidden border border-[#380808]">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-black/30">
                <th className="px-6 py-3 text-left text-sm font-semibold">Title</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Date</th>
                <th className="px-6 py-3 text-left text-sm font-semibold">Tags</th>
                <th className="px-6 py-3 text-right text-sm font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#380808]">
              {posts.map((post) => (
                <motion.tr
                  key={post.slug}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="hover:bg-black/20"
                >
                  <td className="px-6 py-4">
                    <Link
                      to={`/blog/${post.slug}`}
                      className="text-white hover:text-[#5A1818] transition-colors"
                    >
                      {post.title}
                    </Link>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {format(new Date(post.date), 'MMM dd, yyyy')}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 text-xs bg-[#5A1818] text-white rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right space-x-2">
                    <Link
                      to={`/admin/posts/${post.slug}/edit`}
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
      </div>
    </div>
  );
};

export default PostList;