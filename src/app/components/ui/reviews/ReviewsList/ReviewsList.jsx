import React from 'react';
import Review from '../Review';

const ReviewsList = ({ reviews, handleRemove }) => {
  return (
    <ul className='reviews-list'>
      {reviews.map(review => (
        <Review key={review._id} review={review} onRemove={handleRemove} />
      ))}
    </ul>
  );
};

export default ReviewsList;
