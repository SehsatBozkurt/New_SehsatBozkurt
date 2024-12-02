import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiMessageSquare } from 'react-icons/fi';

const CommentSection = ({ postId, comments = [] }) => {
  const [newComment, setNewComment] = useState({ author: '', email: '', content: '' });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // Submit comment logic here
      setNewComment({ author: '', email: '', content: '' });
    } catch (error) {
      console.error('Error submitting comment:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <h3 className="text-2xl font-semibold text-white flex items-center">
        <FiMessageSquare className="mr-2" />
        Comments ({comments.length})
      </h3>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <input
            type="text"
            value={newComment.author}
            onChange={(e) => setNewComment({ ...newComment, author: e.target.value })}
            placeholder="Your Name"
            className="bg-gray-800 rounded-lg px-4 py-2"
            required
          />
          <input
            type="email"
            value={newComment.email}
            onChange={(e) => setNewComment({ ...newComment, email: e.target.value })}
            placeholder="Your Email"
            className="bg-gray-800 rounded-lg px-4 py-2"
            required
          />
        </div>
        <textarea
          value={newComment.content}
          onChange={(e) => setNewComment({ ...newComment, content: e.target.value })}
          placeholder="Your Comment"
          className="w-full bg-gray-800 rounded-lg px-4 py-2 h-32"
          required
        />
        <button
          type="submit"
          disabled={submitting}
          className="px-6 py-2 bg-[#5A1818] hover:bg-[#380808] text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Post Comment'}
        </button>
      </form>

      <div className="space-y-6">
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-medium text-white">{comment.author}</h4>
                <p className="text-sm text-gray-400">
                  {format(new Date(comment.date), 'MMMM dd, yyyy')}
                </p>
              </div>
            </div>
            <p className="text-gray-300">{comment.content}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default CommentSection;