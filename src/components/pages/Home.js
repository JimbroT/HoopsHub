import React from 'react';
import '../../App.css'
import HeroSection from '../HeroSection'
import Cards from '../Cards';
import Footer from '../Footer';

function Home () {
    return (
        <>
        <HeroSection/>
        <Cards></Cards>
        <Footer></Footer>
        </>
    )
}

export default Home;