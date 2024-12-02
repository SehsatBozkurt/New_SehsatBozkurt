// WordPress configuration
export const WORDPRESS_URL = import.meta.env.VITE_WORDPRESS_URL 
  ? `${import.meta.env.VITE_WORDPRESS_URL}/wp-json/wp/v2`
  : 'http://localhost/wordpress/wp-json/wp/v2';

export const WORDPRESS_ADMIN_URL = import.meta.env.VITE_WORDPRESS_URL 
  ? `${import.meta.env.VITE_WORDPRESS_URL}/wp-admin`
  : 'http://localhost/wordpress/wp-admin';

export const POSTS_PER_PAGE = 9;

// WordPress REST API endpoints
export const API_ENDPOINTS = {
  POSTS: '/posts',
  PAGES: '/pages',
  MEDIA: '/media',
  CATEGORIES: '/categories',
  TAGS: '/tags'
};