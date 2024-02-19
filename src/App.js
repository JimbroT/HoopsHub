import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';
import News from './components/pages/News';

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/news' element={<News />} />
        <Route path='/products' element={<Products />} />
        <Route path='/sign-up' element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
