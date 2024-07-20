//To display liked and bookmarked articles within a user's profile.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Profile.css';

const Profile = ({ token }) => {
  const [likedArticles, setLikedArticles] = useState([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  useEffect(() => {
    const fetchLikedArticles = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/articles/liked', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setLikedArticles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    const fetchBookmarkedArticles = async () => {
      try {
        const res = await axios.get('http://localhost:5001/api/articles/bookmarked', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setBookmarkedArticles(res.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchLikedArticles();
    fetchBookmarkedArticles();
  }, [token]);

  return (
    <div className="profile">
      <h2>Liked Articles</h2>
      <ul>
        {likedArticles.map(article => (
          <li key={article._id}>{article.title}</li>
        ))}
      </ul>
      <h2>Bookmarked Articles</h2>
      <ul>
        {bookmarkedArticles.map(article => (
          <li key={article._id}>{article.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
