import { v4 as uuidv4 } from 'uuid';

const STORAGE_KEYS = {
  POSTS: 'blog_posts',
  CATEGORIES: 'blog_categories',
  TAGS: 'blog_tags',
  COMMENTS: 'blog_comments'
};

// Initialize storage with sample data if empty
const initializeStorage = () => {
  if (!localStorage.getItem(STORAGE_KEYS.POSTS)) {
    localStorage.setItem(STORAGE_KEYS.POSTS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.CATEGORIES)) {
    localStorage.setItem(STORAGE_KEYS.CATEGORIES, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.TAGS)) {
    localStorage.setItem(STORAGE_KEYS.TAGS, JSON.stringify([]));
  }
  if (!localStorage.getItem(STORAGE_KEYS.COMMENTS)) {
    localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify([]));
  }
};

initializeStorage();

// Generic storage operations
const getStorageItem = (key) => {
  try {
    return JSON.parse(localStorage.getItem(key)) || [];
  } catch (error) {
    console.error(`Error reading from storage (${key}):`, error);
    return [];
  }
};

const setStorageItem = (key, data) => {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error writing to storage (${key}):`, error);
  }
};

// Blog posts
export const getPosts = () => getStorageItem(STORAGE_KEYS.POSTS);

export const createPost = (postData) => {
  const posts = getPosts();
  const newPost = {
    id: uuidv4(),
    ...postData,
    slug: generateSlug(postData.title),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  posts.push(newPost);
  setStorageItem(STORAGE_KEYS.POSTS, posts);
  return newPost;
};

export const updatePost = (slug, postData) => {
  const posts = getPosts();
  const index = posts.findIndex(post => post.slug === slug);
  if (index !== -1) {
    posts[index] = {
      ...posts[index],
      ...postData,
      updatedAt: new Date().toISOString()
    };
    setStorageItem(STORAGE_KEYS.POSTS, posts);
    return posts[index];
  }
  return null;
};

export const deletePost = (slug) => {
  const posts = getPosts();
  const filteredPosts = posts.filter(post => post.slug !== slug);
  setStorageItem(STORAGE_KEYS.POSTS, filteredPosts);
};

// Categories
export const getCategories = () => getStorageItem(STORAGE_KEYS.CATEGORIES);

export const createCategory = (categoryData) => {
  const categories = getCategories();
  const newCategory = {
    id: uuidv4(),
    ...categoryData,
    slug: generateSlug(categoryData.name)
  };
  categories.push(newCategory);
  setStorageItem(STORAGE_KEYS.CATEGORIES, categories);
  return newCategory;
};

// Tags
export const getTags = () => getStorageItem(STORAGE_KEYS.TAGS);

export const createTag = (tagData) => {
  const tags = getTags();
  const newTag = {
    id: uuidv4(),
    ...tagData,
    slug: generateSlug(tagData.name)
  };
  tags.push(newTag);
  setStorageItem(STORAGE_KEYS.TAGS, tags);
  return newTag;
};

// Comments
export const getComments = (postId) => {
  const comments = getStorageItem(STORAGE_KEYS.COMMENTS);
  return comments.filter(comment => comment.postId === postId);
};

export const createComment = (commentData) => {
  const comments = getStorageItem(STORAGE_KEYS.COMMENTS);
  const newComment = {
    id: uuidv4(),
    ...commentData,
    createdAt: new Date().toISOString(),
    status: 'pending'
  };
  comments.push(newComment);
  setStorageItem(STORAGE_KEYS.COMMENTS, comments);
  return newComment;
};

export const updateCommentStatus = (commentId, status) => {
  const comments = getStorageItem(STORAGE_KEYS.COMMENTS);
  const index = comments.findIndex(comment => comment.id === commentId);
  if (index !== -1) {
    comments[index].status = status;
    setStorageItem(STORAGE_KEYS.COMMENTS, comments);
    return comments[index];
  }
  return null;
};

// Utility functions
const generateSlug = (text) => {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};

// Image handling (using base64 for demo purposes)
export const uploadImage = async (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ url: reader.result });
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};