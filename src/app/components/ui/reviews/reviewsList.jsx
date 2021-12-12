import React from 'react';
import declOfNum from '../../../utils/declOfNum';
import Review from './review';

const ReviewsList = ({ reviews, onRemove }) => {
  const totalReviewsCount = reviews.length;

  return (
    <>
      <div className='reviews-title'>
        <h2 className='room-info__card-title'>Отзывы посетителей номера</h2>
        <span>{`${totalReviewsCount} ${declOfNum(totalReviewsCount, ['отзыв', 'отзыва', 'отзывов'])}`}</span>
      </div>
      <ul className='reviews-list'>
        {reviews.map(review => (
          <Review key={review._id} review={review} onRemove={onRemove} />
        ))}
      </ul>
    </>
  );
};

export default ReviewsList;
