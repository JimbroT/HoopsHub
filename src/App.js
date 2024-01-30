import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import { Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import SignUp from './components/pages/SignUp';

function App() {
  return (
    <>
    <Navbar/>
      <Routes>
        <Route path='/' exact Component={Home}></Route>
        <Route path='/services' Component={Services}></Route>
        <Route path='/products' Component={Products}></Route>
        <Route path='/sign-up' Component={SignUp}></Route>
      </Routes>
    </>
  );
}

export default App;
