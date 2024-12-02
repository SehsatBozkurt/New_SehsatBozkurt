import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, parseISO } from 'date-fns';
import { FiCalendar, FiFolder } from 'react-icons/fi';
import { useBlog } from '../../contexts/BlogContext';

const BlogArchive = () => {
  const { posts, categories } = useBlog();

  const archives = useMemo(() => {
    const grouped = posts.reduce((acc, post) => {
      const date = parseISO(post.publishDate);
      const yearMonth = format(date, 'yyyy-MM');
      if (!acc[yearMonth]) {
        acc[yearMonth] = [];
      }
      acc[yearMonth].push(post);
      return acc;
    }, {});

    return Object.entries(grouped)
      .sort(([a], [b]) => b.localeCompare(a))
      .map(([yearMonth, posts]) => ({
        date: yearMonth,
        posts: posts.sort((a, b) => 
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        )
      }));
  }, [posts]);

  const categoryPosts = useMemo(() => {
    return categories.map(category => ({
      ...category,
      posts: posts.filter(post => post.categories.includes(category.id))
    }));
  }, [categories, posts]);

  return (
    <section className="py-24 bg-background-dark">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">Blog Archive</h1>
          <p className="text-xl text-gray-200">Browse our articles by date or category</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Archive by Date */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <FiCalendar className="mr-3" />
              By Date
            </h2>
            {archives.map(({ date, posts }) => (
              <motion.div
                key={date}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h3 className="text-lg font-medium text-white mb-4">
                  {format(parseISO(date), 'MMMM yyyy')}
                </h3>
                <ul className="space-y-4">
                  {posts.map(post => (
                    <li key={post.slug}>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="block bg-gradient-to-br from-[#1E0000] to-black p-4 rounded-lg border border-[#380808] hover:border-[#5A1818]/30 transition-all"
                      >
                        <h4 className="text-white font-medium mb-2">{post.title}</h4>
                        <p className="text-sm text-gray-400">
                          {format(new Date(post.publishDate), 'MMMM dd, yyyy')}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          {/* Archive by Category */}
          <div>
            <h2 className="text-2xl font-semibold text-white mb-8 flex items-center">
              <FiFolder className="mr-3" />
              By Category
            </h2>
            {categoryPosts.map(category => (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8"
              >
                <h3 className="text-lg font-medium text-white mb-4">
                  {category.name}
                  <span className="text-sm text-gray-400 ml-2">
                    ({category.posts.length})
                  </span>
                </h3>
                <ul className="space-y-4">
                  {category.posts.map(post => (
                    <li key={post.slug}>
                      <Link
                        to={`/blog/${post.slug}`}
                        className="block bg-gradient-to-br from-[#1E0000] to-black p-4 rounded-lg border border-[#380808] hover:border-[#5A1818]/30 transition-all"
                      >
                        <h4 className="text-white font-medium mb-2">{post.title}</h4>
                        <p className="text-sm text-gray-400">
                          {format(new Date(post.publishDate), 'MMMM dd, yyyy')}
                        </p>
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogArchive;