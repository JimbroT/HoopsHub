import React, { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Register from './components/pages/register';
import Login from './components/pages/Login';
import Profile from './components/pages/profile';

function App() {
  const [token, setToken] = useState('');

  console.log('Token in App component:', token); // Log token

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home token={token} />} /> {/* Pass token to Home */}
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login setToken={setToken} />} />
        <Route path='/profile' element={<Profile token={token} />} />
      </Routes>
    </>
  );
}

export default App;
