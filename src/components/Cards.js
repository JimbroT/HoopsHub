import React, { useState, useEffect} from 'react'
import CardItem from './CardItem'
import './Cards.css'

function Cards() {

    const [articles, setArticles] = useState([]);

    const fetchImageForArticle =async (title) => {
        const apiKey = 'AIzaSyA74WhWf-LTi4YILRGa0J7LRTzl1Z7JoEY'; 
        const searchEngineId = 'a0a587dc99fa840d5';
        const query = title;
        const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&searchType=image&q=${encodeURIComponent(query)}`;
    
        try {
            const response = await fetch(url);
            const data = await response.json();
            return data.items[0].link; // Taking the first image result
          } catch (error) {
            console.error('Error fetching image:', error);
            return 'images/img-fallback.jpeg'; // Fallback image in case of an error
          }
        };

    useEffect(() => {
        fetch("https://nba-stories.onrender.com/articles")
        .then((response) => response.json())
        .then(async (data) => {
            // fetch images for each article in parallel 
            const articleWithImages = await Promise.all(data.map(async (article) => {
                const imageUrl = await fetchImageForArticle(article.title);
                return { ...article, imageUrl }; //Append the imageUrl to the article object
        }));
        setArticles(articleWithImages); 
        });
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
                    src={article.imageUrl || 'images/img-fallback.jpeg'} // Use fetched image or fallback
                    text={article.title}
                    label={article.source}
                    path={article.url}/>
                    ))}
                </ul>
            </div>
        </div>
    </div>
  )
}

export default Cards