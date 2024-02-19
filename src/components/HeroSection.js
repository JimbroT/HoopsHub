import React from 'react'
import '../App.css';
import { Button } from './Button';
import './HeroSection.css'

function HeroSection() {
  return (
    <div className='hero-container'>
        <video src={`${process.env.PUBLIC_URL}/videos/nba.mp4`} autoPlay loop muted />
        <h1>ALL YOUR BASKETBALL NEWS HERE</h1>
        <p>What are you waiting for?</p>
        <div className='hero-btns'>
            <Button className='btns' buttonStyle='btn--outline'
            buttonSize='btn--large'>GET STARTED</Button>
            <Button className='btns' buttonStyle='btn--primary'
            buttonSize='btn--large'>WATCH TRAILER <i className='farfa-play-circle'/></Button>
        </div>
    </div>
  )
}

export default HeroSection