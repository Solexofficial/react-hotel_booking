import React from 'react';
import Review from './review';

const ReviewsList = ({ reviews, onRemove }) => {
  return (
    <ul className='reviews-list'>
      {reviews.map(review => (
        <Review key={review._id} review={review} onRemove={onRemove} />
      ))}
    </ul>
  );
};

export default ReviewsList;
