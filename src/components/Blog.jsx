import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiArrowRight } from 'react-icons/fi';
import { useBlog } from '../contexts/BlogContext';

const Blog = () => {
  const { posts, loading } = useBlog();
  const recentPosts = posts.slice(0, 3);

  return (
    <section className="py-24 bg-background-dark">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
            Latest Blog Posts
          </h2>
          <p className="text-xl text-gray-200 max-w-2xl mx-auto">
            Insights and updates from our team
          </p>
        </motion.div>

        {loading ? (
          <div className="text-center text-gray-400">Loading posts...</div>
        ) : (
          <>
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {recentPosts.map((post) => (
                <motion.article
                  key={post.slug}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-gradient-to-br from-[#1E0000] to-black rounded-2xl overflow-hidden border border-[#380808] hover:border-[#5A1818]/30 transition-all duration-300"
                >
                  {post.featuredImage && (
                    <img
                      src={post.featuredImage}
                      alt={post.title}
                      className="w-full h-48 object-cover"
                    />
                  )}
                  <div className="p-6">
                    <p className="text-sm text-gray-400 mb-2">
                      {format(new Date(post.publishDate), 'MMMM dd, yyyy')}
                    </p>
                    <h3 className="text-xl font-semibold text-white mb-3">
                      {post.title}
                    </h3>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {post.excerpt}
                    </p>
                    <motion.div
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Link
                        to={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-2 px-6 py-2 bg-[#5A1818] hover:bg-[#380808] text-white rounded-full text-sm font-semibold transition-colors"
                      >
                        Read More
                        <FiArrowRight />
                      </Link>
                    </motion.div>
                  </div>
                </motion.article>
              ))}
            </div>

            <div className="text-center">
              <Link
                to="/blog"
                className="inline-flex items-center gap-2 px-8 py-3 bg-[#5A1818] hover:bg-[#380808] text-white rounded-full text-lg font-semibold transition-colors"
              >
                View All Posts
                <FiArrowRight />
              </Link>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Blog;