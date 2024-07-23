// To display a comprehensive user profile, including personal details (username and email) and lists of liked and bookmarked articles.

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CardItem from '../CardItem'; // Ensure the correct path to CardItem
import './profile.css';

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');
  const [likedArticles, setLikedArticles] = useState([]);
  const [bookmarkedArticles, setBookmarkedArticles] = useState([]);
  const [showBookmarked, setShowBookmarked] = useState(false);
  const [showLiked, setShowLiked] = useState(false);

  const toggleShowBookmarked = async () => {
    if (!showBookmarked) {
      await fetchBookmarkedArticles();
    }
    setShowBookmarked(!showBookmarked);
  };

  const toggleShowLiked = async () => {
    if (!showLiked) {
      await fetchLikedArticles();
    }
    setShowLiked(!showLiked);
  };

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

    if (token) {
      fetchProfile();
    }
  }, [token]);

  const fetchBookmarkedArticles = async () => {
    try {
      console.log('Fetching bookmarked articles...');
      const res = await axios.get('http://localhost:5001/api/articles/bookmarked', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Bookmarked articles fetched:', res.data);
      setBookmarkedArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchLikedArticles = async () => {
    try {
      console.log('Fetching liked articles...');
      const res = await axios.get('http://localhost:5001/api/articles/liked', {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log('Liked articles fetched:', res.data);
      setLikedArticles(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
          <button className="profile-btn" onClick={toggleShowLiked}>
            {showLiked ? 'Hide Liked Articles' : 'Show Liked Articles'}
          </button>
          <button className="profile-btn" onClick={toggleShowBookmarked}>
            {showBookmarked ? 'Hide Bookmarked Articles' : 'Show Bookmarked Articles'}
          </button>
          {showLiked && (
            <div>
              <h3>Liked Articles</h3>
              <ul className="cards__items">
                {likedArticles.map((article) => (
                  <CardItem
                    key={article._id}
                    id={article._id}
                    src={article.imageUrl || `${process.env.PUBLIC_URL}/images/img-fallback.jpeg`}
                    text={article.title}
                    label={article.source}
                    path={article.url}
                    articleUrl={article.url}
                    token={token}
                  />
                ))}
              </ul>
            </div>
          )}
          {showBookmarked && (
            <div>
              <h3>Bookmarked Articles</h3>
              <ul className="cards__items">
                {bookmarkedArticles.map((article) => (
                  <CardItem
                    key={article._id}
                    id={article._id}
                    src={article.imageUrl || `${process.env.PUBLIC_URL}/images/img-fallback.jpeg`}
                    text={article.title}
                    label={article.source}
                    path={article.url}
                    articleUrl={article.url}
                    token={token}
                  />
                ))}
              </ul>
            </div>
          )}
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default Profile;
