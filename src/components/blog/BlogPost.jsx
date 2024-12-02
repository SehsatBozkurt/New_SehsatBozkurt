import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FiCalendar, FiUser, FiTag, FiShare2 } from 'react-icons/fi';
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon
} from 'react-share';
import { useBlog } from '../../contexts/BlogContext';
import CommentSection from './CommentSection';

const BlogPost = () => {
  const { slug } = useParams();
  const { posts } = useBlog();
  const [post, setPost] = useState(null);

  useEffect(() => {
    const currentPost = posts.find(p => p.slug === slug);
    setPost(currentPost);
  }, [slug, posts]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-400">Post not found</div>
      </div>
    );
  }

  const shareUrl = window.location.href;

  return (
    <motion.article
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="py-24 bg-background-dark"
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {post.featuredImage && (
          <img
            src={post.featuredImage}
            alt={post.title}
            className="w-full h-64 md:h-96 object-cover rounded-2xl mb-8"
          />
        )}
        
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-4 text-gray-400">
            <div className="flex items-center">
              <FiCalendar className="mr-2" />
              {format(new Date(post.publishDate), 'MMMM dd, yyyy')}
            </div>
            <div className="flex items-center">
              <FiUser className="mr-2" />
              {post.author}
            </div>
            {post.tags.length > 0 && (
              <div className="flex items-center gap-2">
                <FiTag />
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-[#5A1818]/20 text-[#5A1818] rounded-full text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="prose prose-invert max-w-none mb-12">
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <SyntaxHighlighter
                    style={vscDarkPlus}
                    language={match[1]}
                    PreTag="div"
                    {...props}
                  >
                    {String(children).replace(/\n$/, '')}
                  </SyntaxHighlighter>
                ) : (
                  <code className={className} {...props}>
                    {children}
                  </code>
                );
              }
            }}
          >
            {post.content}
          </ReactMarkdown>
        </div>

        <div className="border-t border-[#380808] pt-8 mb-12">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Share this post</h3>
            <div className="flex gap-2">
              <FacebookShareButton url={shareUrl} quote={post.title}>
                <FacebookIcon size={32} round />
              </FacebookShareButton>
              <TwitterShareButton url={shareUrl} title={post.title}>
                <TwitterIcon size={32} round />
              </TwitterShareButton>
              <LinkedinShareButton url={shareUrl} title={post.title}>
                <LinkedinIcon size={32} round />
              </LinkedinShareButton>
            </div>
          </div>
        </div>

        <CommentSection postId={post.id} comments={post.comments} />
      </div>
    </motion.article>
  );
};

export default BlogPost;