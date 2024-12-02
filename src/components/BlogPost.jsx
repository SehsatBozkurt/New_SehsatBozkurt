import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import axios from 'axios';
import { marked } from 'marked';
import { WORDPRESS_URL } from '../config';

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${WORDPRESS_URL}/posts`, {
          params: {
            slug,
            _embed: true
          }
        });
        setPost(response.data[0]);
      } catch (error) {
        console.error('Error fetching post:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  const getFeaturedImage = (post) => {
    if (post._embedded && 
        post._embedded['wp:featuredmedia'] && 
        post._embedded['wp:featuredmedia'][0].source_url) {
      return post._embedded['wp:featuredmedia'][0].source_url;
    }
    return null;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Post not found</div>
      </div>
    );
  }

  const renderedContent = marked(post.content.rendered);

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-24 bg-background-dark"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {getFeaturedImage(post) && (
          <img
            src={getFeaturedImage(post)}
            alt={post.title.rendered}
            className="w-full h-64 object-cover rounded-2xl mb-8"
          />
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
          {post.title.rendered}
        </h1>
        
        <p className="text-gray-400 mb-8">
          {format(new Date(post.date), 'MMMM dd, yyyy')}
        </p>
        
        <div 
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: renderedContent }}
        />
      </div>
    </motion.article>
  );
};

export default BlogPost;