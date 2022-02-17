import React from 'react';
import Rating from '../../common/Rating';

type RoomReviewsCardProps = {
  countReviews?: number;
  rate?: number;
};

const RoomReviewsCard: React.FC<RoomReviewsCardProps> = ({ countReviews = 0, rate = 0 }) => {
  const ratingValue = +(rate / countReviews).toFixed(2);

  return (
    <div className='room-info__card'>
      <h3 className='room-info__card-title'>Впечатления от номера</h3>
      {countReviews > 0 ? (
        <>
          <p className='room-info__card-rating__title'>
            Общая оценка: <span>{ratingValue} из 5</span>
          </p>
          <Rating value={ratingValue} name='rating' precision={0.1} readOnly size='large' />
        </>
      ) : (
        <>
          <h3>Еще нет отзывов</h3>
        </>
      )}
    </div>
  );
};

export default RoomReviewsCard;
