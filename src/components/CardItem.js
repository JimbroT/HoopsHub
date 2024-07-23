import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CommentSection from './CommentSection';
import './CardItem.css';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';

function CardItem(props) {
  const [showComments, setShowComments] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);

  useEffect(() => {
    const checkIfBookmarked = async () => {
      const url = `https://hoops-hub-backend.onrender.com/api/articles/bookmarked`;
      const token = props.token;

      try {
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        const result = await response.json();
        const isBookmarked = result.some(article => article.url === props.path);
        setBookmarked(isBookmarked);
      } catch (error) {
        console.error('Error checking if article is bookmarked:', error);
      }
    };

    checkIfBookmarked();
  }, [props.path, props.token]);

  const toggleComments = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the Link
    setShowComments(!showComments);
  };

  const handleBookmark = async (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the Link
    const url = `https://hoops-hub-backend.onrender.com/api/articles/bookmark/${encodeURIComponent(props.path)}`;
    const token = props.token;

    try {
      const response = await fetch(url, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: props.text,
          imageUrl: props.src,
          source: props.label,
        }),
      });

      const result = await response.json();
      console.log('Bookmark response:', result);

      if (response.ok) {
        setBookmarked(!bookmarked);
      }
    } catch (error) {
      console.error('Error bookmarking article:', error);
    }
  };

  return (
    <>
      <li className='cards__item'>
        <div>
          <Link className='cards__item__link' to={props.path}>
            <figure className='cards__item__pic-wrap' data-category={props.label}>
              <img src={props.src} alt='Article Image' className='cards__item__img' />
            </figure>
            <div className='cards__item__info'>
              <h5 className='cards_item__text'>{props.text}</h5>
            </div>
          </Link>
          <div className="card-actions">
            <button onClick={toggleComments} className="toggle-comments">
              {showComments ? 'Hide Comments' : 'Show Comments'}
            </button>
            <button onClick={handleBookmark} className="bookmark-btn">
              {bookmarked ? <FaBookmark /> : <FaRegBookmark />}
            </button>
          </div>
        </div>
        {showComments && <CommentSection articleUrl={props.path} token={props.token} />} {/* Pass articleUrl */}
      </li>
    </>
  );
}

export default CardItem;
