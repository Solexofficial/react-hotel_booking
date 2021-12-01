import React from 'react';
import Review from './review';

const ReviewsList = ({ reviews }) => {
  return (
    <div>
      <h2>Отзывы посетителей</h2>
      {reviews.map(review => (
        <Review key={review.id} review={review} />
      ))}
    </div>
  );
};

export default ReviewsList;
