import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css';
import { FaHeart } from 'react-icons/fa';

const CommentSection = ({ articleUrl, token }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    console.log('Rendering CommentSection for article:', articleUrl); // Log component render
    const fetchComments = async () => {
      try {
        const encodedUrl = encodeURIComponent(articleUrl);
        console.log('Encoded URL for fetching comments:', encodedUrl); // Log encoded URL
        const res = await axios.get(`http://localhost:5001/api/comments/${encodedUrl}`);
        console.log('Fetched comments response:', res.data); // Log the response
        setComments(res.data);
      } catch (err) {
        console.error('Error fetching comments:', err);
      }
    };
    if (articleUrl) {
      fetchComments();
    }
  }, [articleUrl]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    console.log('Submitting comment:', newComment); // Log before submission
    console.log('Article URL:', articleUrl); // Log articleUrl
    console.log('Token:', token); // Log token
    try {
      const res = await axios.post(
        `http://localhost:5001/api/comments`,
        { articleUrl, content: newComment }, // Ensure correct request body
        { headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' } } // Ensure headers are set
      );
      console.log('Comment submitted:', res.data); // Log successful submission
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error('Error submitting comment:', err.response ? err.response.data : err.message); // Log error
    }
  };

  const likeComment = async (commentId) => {
    try {
      const res = await axios.put(
        `http://localhost:5001/api/comments/like/${commentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Comment liked:', res.data); // Log successful like
      setComments(comments.map(comment =>
        comment._id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      ));
    } catch (err) {
      console.error('Error liking comment:', err.response ? err.response.data : err.message); // Log error
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment._id} className="comment">
          <p className="comment-user">{comment.user.username}</p>
          <p>{comment.content}</p>
          <div className="comment-actions">
            <button onClick={() => likeComment(comment._id)}>
              <FaHeart /> {comment.likes.length}
            </button>
          </div>
        </div>
      ))}
      <form className="comment-form" onSubmit={handleCommentSubmit}>
        <textarea
          value={newComment}
          onChange={handleCommentChange}
          placeholder="Write a comment..."
        ></textarea>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CommentSection;
