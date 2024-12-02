import {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  getCategories,
  createCategory,
  getTags,
  createTag,
  getComments,
  createComment,
  updateCommentStatus,
  uploadImage
} from './storage';

export const getBlogPosts = async () => {
  try {
    return getPosts();
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
};

export const getBlogPost = async (slug) => {
  try {
    const posts = getPosts();
    return posts.find(post => post.slug === slug) || null;
  } catch (error) {
    console.error('Error fetching blog post:', error);
    return null;
  }
};

export const createBlogPost = async (postData) => {
  try {
    return createPost(postData);
  } catch (error) {
    console.error('Error creating blog post:', error);
    throw error;
  }
};

export const updateBlogPost = async (slug, postData) => {
  try {
    return updatePost(slug, postData);
  } catch (error) {
    console.error('Error updating blog post:', error);
    throw error;
  }
};

export const deleteBlogPost = async (slug) => {
  try {
    return deletePost(slug);
  } catch (error) {
    console.error('Error deleting blog post:', error);
    throw error;
  }
};

export { getCategories, createCategory, getTags, createTag, getComments, createComment, updateCommentStatus, uploadImage };