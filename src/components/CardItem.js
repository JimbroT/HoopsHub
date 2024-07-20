import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import CommentSection from './CommentSection';
import './CardItem.css';

function CardItem(props) {
  const [showComments, setShowComments] = useState(false);

  const toggleComments = (e) => {
    e.stopPropagation(); // Prevent the event from bubbling up to the Link
    console.log('Toggle Comments:', !showComments); // Log state change
    setShowComments(!showComments);
  };

  console.log('Rendering CardItem:', props.id); // Log component render

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
        </div>
        {showComments && <CommentSection articleId={props.id} token={props.token} />}
        </div>
      </li>
    </>
  );
}

export default CardItem;
