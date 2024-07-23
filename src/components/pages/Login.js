import React, { useState } from 'react';
import axios from 'axios';
import './Login.css';

const Login = ({ setToken }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://hoops-hub-backend.onrender.com/api/auth/login', {
        email,
        password,
      });
      setToken(response.data.token);
      setMessage('Login successful!');
    } catch (error) {
      setMessage('Login failed!');
    }
  };

  return (
    <div className="split-screen">
      <div className="left-side">
        <div className="form-container">
          <h2>Login</h2>
          <form onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Login</button>
          </form>
          {message && <p>{message}</p>}
        </div>
      </div>
      <div className="right-side"></div>
    </div>
  );
};

export default Login;
