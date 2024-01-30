import React from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {
  return (
    <div className='cards'>
        <h1>Check Out The Latest News:</h1>
        <div className="cards__container">
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    <CardItem 
                    src="images/img-9.jpg" 
                    text="Explore the hidden waterfall deep inside the Amazon Jungle" 
                    label="Adventure"
                    path="/services"/>
                    <CardItem 
                    src="images/img-2.jpg" 
                    text="Travel to Bali" 
                    label="Luxury"
                    path="/services"/>
                </ul>
                <ul className='cards__items'>
                    <CardItem 
                    src="images/img-4.jpg" 
                    text="Explore the hidden waterfall deep inside the Amazon Jungle" 
                    label="Adventure"
                    path="/sign-up"/>
                    <CardItem 
                    src="images/img-6.jpg" 
                    text="Travel to Bali" 
                    label="Luxury"
                    path="/services"/>
                    <CardItem 
                    src="images/img-5.jpg" 
                    text="Desert Oasis" 
                    label="Come enjoy the scenery"
                    path="/products"/>
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards