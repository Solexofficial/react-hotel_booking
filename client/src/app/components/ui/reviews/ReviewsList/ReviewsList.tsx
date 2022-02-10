import React from 'react';
import { ReviewType } from '../../../../types/types';
import Review from '../Review';

type ReviewsListProps = {
  reviews: ReviewType[];
};

const ReviewsList: React.FC<ReviewsListProps> = ({ reviews }) => {
  return (
    <ul className='reviews-list'>
      {reviews.map(review => (
        <Review key={review._id} review={review} />
      ))}
    </ul>
  );
};

export default ReviewsList;
