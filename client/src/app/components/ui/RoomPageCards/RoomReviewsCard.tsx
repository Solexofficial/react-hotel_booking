import React from 'react';
import Rating from '../../common/Rating';

const RoomReviewsCard = () => {
  return (
    <div className='room-info__card'>
      <h3 className='room-info__card-title'>Впечатления от номера</h3>
      Скоро здесь будет статистика по отзывам! Приносим извинения за неудобства.
      <Rating readOnly value={4} name='rating' />
    </div>
  );
};

export default RoomReviewsCard;
