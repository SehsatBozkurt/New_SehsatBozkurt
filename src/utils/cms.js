import matter from 'gray-matter';
import { marked } from 'marked';
import axios from 'axios';

const BASE_URL = '/api';

export const fetchPosts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/posts`);
    return response.data.map(post => ({
      ...post,
      content: marked(matter(post.content).content)
    }));
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const fetchPost = async (slug) => {
  try {
    const response = await axios.get(`${BASE_URL}/posts/${slug}`);
    const { content, data } = matter(response.data.content);
    return {
      ...response.data,
      ...data,
      content: marked(content)
    };
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
};

export const createPost = async (postData) => {
  try {
    const response = await axios.post(`${BASE_URL}/posts`, postData);
    return response.data;
  } catch (error) {
    console.error('Error creating post:', error);
    throw error;
  }
};

export const updatePost = async (slug, postData) => {
  try {
    const response = await axios.put(`${BASE_URL}/posts/${slug}`, postData);
    return response.data;
  } catch (error) {
    console.error('Error updating post:', error);
    throw error;
  }
};

export const deletePost = async (slug) => {
  try {
    await axios.delete(`${BASE_URL}/posts/${slug}`);
    return true;
  } catch (error) {
    console.error('Error deleting post:', error);
    throw error;
  }
};