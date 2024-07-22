import React from 'react';
import '../../App.css';
import HeroSection from '../HeroSection';
import Cards from '../Cards';
import Footer from '../Footer';

function Home({ token }) { // Accept token as a prop
  console.log('Token in Home component:', token); // Log token

  return (
    <>
      <HeroSection />
      <Cards token={token} /> {/* Pass token to Cards */}
      <Footer />
    </>
  );
}

export default Home;
