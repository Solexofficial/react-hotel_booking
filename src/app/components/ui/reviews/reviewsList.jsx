import React from 'react';
import Review from './review';

const ReviewsList = ({ reviews, onRemove }) => {
  return (
    <>
      {reviews.map(review => (
        <Review key={review._id} review={review} onRemove={onRemove} />
      ))}
    </>
  );
};

export default ReviewsList;
