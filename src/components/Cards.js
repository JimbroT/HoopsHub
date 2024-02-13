import React, { useState, useEffect} from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {

    const [articles, setArticles] = useState([]);

    useEffect(() => {
        fetch("https://nba-stories.onrender.com/articles")
        .then((response) => response.json())
        .then(data => {
            setArticles(data);
        })
      }, []);


    return (
    <div className='cards'>
        <h1>Check Out The Latest News:</h1>
        <div className="cards__container">
            <div className='cards__wrapper'>
                <ul className='cards__items'>
                    {articles.map((article, index) => (   
                    <CardItem
                    key={index}
                    src={article.image || "images/img-9.jpg"}
                    text={article.title}
                    label={article.category || "News"}
                    path={article.url}/>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards