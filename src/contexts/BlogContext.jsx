import React, { createContext, useContext, useState, useEffect } from 'react';
import { getBlogPosts, getCategories, getTags } from '../utils/blogService';

const BlogContext = createContext(null);

export const BlogProvider = ({ children }) => {
  const [posts, setPosts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadBlogData = async () => {
      try {
        const [postsData, categoriesData, tagsData] = await Promise.all([
          getBlogPosts(),
          getCategories(),
          getTags()
        ]);
        setPosts(postsData);
        setCategories(categoriesData);
        setTags(tagsData);
      } catch (error) {
        console.error('Error loading blog data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadBlogData();
  }, []);

  const value = {
    posts,
    setPosts,
    categories,
    setCategories,
    tags,
    setTags,
    loading
  };

  return (
    <BlogContext.Provider value={value}>
      {children}
    </BlogContext.Provider>
  );
};

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error('useBlog must be used within a BlogProvider');
  }
  return context;
};