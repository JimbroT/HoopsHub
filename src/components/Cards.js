import React, { useState, useEffect } from 'react';
import CardItem from './CardItem';
import './Cards.css';

function Cards({ token }) {
  const [articles, setArticles] = useState([]);

  const fetchImageForArticle = async (title) => {
    const apiKey = 'AIzaSyA74WhWf-LTi4YILRGa0J7LRTzl1Z7JoEY';
    const searchEngineId = 'a0a587dc99fa840d5';
    const query = title;
    const url = `https://www.googleapis.com/customsearch/v1?key=${apiKey}&cx=${searchEngineId}&searchType=image&q=${encodeURIComponent(query)}`;

    try {
      const response = await fetch(url);
      const data = await response.json();
      return data.items[0].link;
    } catch (error) {
      console.error('Error fetching image:', error);
      return `${process.env.PUBLIC_URL}/images/img-fallback.jpeg`;
    }
  };

  useEffect(() => {
    fetch('https://nba-stories.onrender.com/articles')
      .then((response) => response.json())
      .then(async (data) => {
        const articleWithImages = await Promise.all(data.map(async (article) => {
          const imageUrl = await fetchImageForArticle(article.title);
          console.log('Article URL:', article.url); // Log article.url to verify it
          return { ...article, imageUrl };
        }));
        setArticles(articleWithImages);
      });
  }, []);

  console.log('Token in Cards component:', token); // Log token

  return (
    <div className='cards'>
      <h1>Check Out The Latest News:</h1>
      <div className="cards__container">
        <div className='cards__wrapper'>
          <ul className='cards__items'>
            {articles.map((article, index) => (
              <CardItem
                key={index}
                id={article._id} // Assuming each article has an _id property
                src={article.imageUrl || `${process.env.PUBLIC_URL}/images/img-fallback.jpeg`}
                text={article.title}
                label={article.source}
                path={article.url} // This is used as props.url in CardItem
                token={token} // Pass the token for authentication
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Cards;
