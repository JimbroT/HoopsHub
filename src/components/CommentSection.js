import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CommentSection.css';

const CommentSection = ({ articleId, token }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    console.log('Rendering CommentSection for article:', articleId); // Log component render
    const fetchComments = async () => {
      try {
        const res = await axios.get(`http://localhost:5001/api/articles/${articleId}/comments`);
        setComments(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchComments();
  }, [articleId]);

  const handleCommentChange = (e) => {
    setNewComment(e.target.value);
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `http://localhost:5001/api/articles/${articleId}/comments`,
        { text: newComment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments([...comments, res.data]);
      setNewComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const likeComment = async (commentId) => {
    try {
      await axios.put(
        `http://localhost:5001/api/comments/like/${commentId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setComments(comments.map(comment =>
        comment._id === commentId ? { ...comment, likes: comment.likes + 1 } : comment
      ));
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="comment-section">
      <h3>Comments</h3>
      {comments.map(comment => (
        <div key={comment._id} className="comment">
          <p className="comment-user">{comment.user.username}</p>
          <p>{comment.text}</p>
          <div className="comment-actions">
            <button onClick={() => likeComment(comment._id)}>Like ({comment.likes})</button>
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
