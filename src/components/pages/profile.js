import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './profile.css';

const Profile = ({ token }) => {
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState('');

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

  return (
    <div className="profile-container">
      <h2>Profile</h2>
      {user ? (
        <div>
          <p>Username: {user.username}</p>
          <p>Email: {user.email}</p>
        </div>
      ) : (
        <p>{message}</p>
      )}
    </div>
  );
};

export default Profile;
