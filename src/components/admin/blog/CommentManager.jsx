import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { FiCheck, FiX, FiTrash2 } from 'react-icons/fi';
import { getComments, updateCommentStatus } from '../../../utils/blogService';

const CommentManager = ({ postId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, pending, approved, rejected

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const fetchedComments = await getComments(postId);
      setComments(fetchedComments);
    } catch (error) {
      console.error('Error loading comments:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (commentId, newStatus) => {
    try {
      await updateCommentStatus(commentId, newStatus);
      setComments(comments.map(comment =>
        comment.id === commentId ? { ...comment, status: newStatus } : comment
      ));
    } catch (error) {
      console.error('Error updating comment status:', error);
    }
  };

  const filteredComments = comments.filter(comment => {
    if (filter === 'all') return true;
    return comment.status === filter;
  });

  if (loading) {
    return <div className="text-center py-8">Loading comments...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h3 className="text-xl font-semibold text-white">Comments</h3>
        <div className="flex gap-2">
          {['all', 'pending', 'approved', 'rejected'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-3 py-1 rounded-md capitalize ${
                filter === status
                  ? 'bg-[#5A1818] text-white'
                  : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
              }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-4">
        {filteredComments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-800 rounded-lg p-4"
          >
            <div className="flex justify-between items-start mb-2">
              <div>
                <p className="font-medium text-white">{comment.author}</p>
                <p className="text-sm text-gray-400">{comment.email}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleStatusUpdate(comment.id, 'approved')}
                  className={`p-1 rounded-full ${
                    comment.status === 'approved'
                      ? 'bg-green-500 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-green-500/20'
                  }`}
                >
                  <FiCheck size={16} />
                </button>
                <button
                  onClick={() => handleStatusUpdate(comment.id, 'rejected')}
                  className={`p-1 rounded-full ${
                    comment.status === 'rejected'
                      ? 'bg-red-500 text-white'
                      : 'bg-gray-700 text-gray-400 hover:bg-red-500/20'
                  }`}
                >
                  <FiX size={16} />
                </button>
                <button
                  onClick={() => handleStatusUpdate(comment.id, 'deleted')}
                  className="p-1 rounded-full bg-gray-700 text-gray-400 hover:bg-red-500/20"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            </div>
            <p className="text-gray-300 mb-2">{comment.content}</p>
            <div className="flex justify-between items-center text-sm text-gray-400">
              <span>{format(new Date(comment.date), 'MMM dd, yyyy HH:mm')}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                comment.status === 'approved' ? 'bg-green-500/20 text-green-400' :
                comment.status === 'rejected' ? 'bg-red-500/20 text-red-400' :
                'bg-yellow-500/20 text-yellow-400'
              }`}>
                {comment.status}
              </span>
            </div>
          </motion.div>
        ))}

        {filteredComments.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            No comments found
          </div>
        )}
      </div>
    </div>
  );
};

export default CommentManager;