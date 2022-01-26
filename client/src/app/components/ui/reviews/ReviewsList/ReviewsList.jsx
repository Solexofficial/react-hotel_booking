import React from 'react';
import Review from '../Review';

const ReviewsList = ({ reviews }) => {
  return (
    <ul className='reviews-list'>
      {reviews.map(review => (
        <Review key={review._id} review={review} />
      ))}
    </ul>
  );
};

export default ReviewsList;
