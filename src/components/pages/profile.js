//To display a comprehensive user profile, including personal details (username and email) and lists of liked and bookmarked articles.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [likedArticles, setLikedArticles] = useState([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get('http://localhost:5001/api/auth/profile', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
      } catch (error) {
        setMessage('Failed to fetch profile!');
      }
    };

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

    if (token) {
      fetchProfile();
      fetchLikedArticles();
      fetchBookmarkedArticles();
    }
  }, [token]);

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <h3>Liked Articles</h3>
          <ul>
            {likedArticles.map((article) => (
              <li key={article._id}>{article.title}</li>
            ))}
          </ul>
          <h3>Bookmarked Articles</h3>
          <ul>
            {bookmarkedArticles.map((article) => (
              <li key={article._id}>{article.title}</li>
            ))}
          </ul>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default Profile;
