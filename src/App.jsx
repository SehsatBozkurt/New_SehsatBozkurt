import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BlogProvider } from './contexts/BlogContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Features from './components/Features';
import Blog from './components/Blog';
import BlogPost from './components/BlogPost';
import BlogGrid from './components/blog/BlogGrid';
import BlogArchive from './components/blog/BlogArchive';
import Imprint from './components/Imprint';
import Footer from './components/Footer';
import AdminLayout from './components/admin/AdminLayout';
import Dashboard from './components/admin/Dashboard';
import BlogPostList from './components/admin/blog/BlogPostList';
import BlogPostEditor from './components/admin/blog/BlogPostEditor';
import CategoryManager from './components/admin/blog/CategoryManager';
import TagManager from './components/admin/blog/TagManager';
import CommentManager from './components/admin/blog/CommentManager';
import WebsiteGenerator from './components/generator/WebsiteGenerator';

function App() {
  return (
    <BlogProvider>
      <Router>
        <Routes>
          <Route path="/admin/*" element={
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/blog" element={<BlogPostList />} />
                <Route path="/blog/new" element={<BlogPostEditor />} />
                <Route path="/blog/:slug/edit" element={<BlogPostEditor mode="edit" />} />
                <Route path="/blog/categories" element={<CategoryManager />} />
                <Route path="/blog/tags" element={<TagManager />} />
                <Route path="/blog/comments" element={<CommentManager />} />
                <Route path="/generator" element={<WebsiteGenerator />} />
              </Routes>
            </AdminLayout>
          } />
          <Route path="/*" element={
            <div className="min-h-screen bg-background-dark text-gray-100">
              <Navbar />
              <Routes>
                <Route path="/" element={
                  <>
                    <Hero />
                    <Services />
                    <Features />
                    <Blog />
                  </>
                } />
                <Route path="/blog" element={<BlogGrid />} />
                <Route path="/blog/archive" element={<BlogArchive />} />
                <Route path="/blog/:slug" element={<BlogPost />} />
                <Route path="/imprint" element={<Imprint />} />
              </Routes>
              <Footer />
            </div>
          } />
        </Routes>
      </Router>
    </BlogProvider>
  );
}

export default App;