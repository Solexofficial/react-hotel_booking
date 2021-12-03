import React, { useEffect, useState } from 'react';
import api from '../../../api';
import Avatar from './../../common/avatar';
import formatDate from '../../../utils/formatDate';
import Loader from '../../common/loader';
import LikeButton from '../buttons/likeButton';
import Rating from '../../common/rating';

const Review = ({ review, onRemove }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    api.users.getById(review.userId).then(data => setUser(data));
  }, [review]);

  console.log(review);

  if (user) {
    return (
      <li className='reviews-list__item'>
        <div className='review'>
          <div className='review__avatar'>
            <div className='avatar'>
              <Avatar alt='пользователя' src={user.avatarPhoto} className='avatar__img' />
            </div>
            <LikeButton review={review} />
          </div>
          <div className='review__content'>
            <p className='review__user-name'>
              {user.name}
              <Rating value={review.rating} readOnly />
            </p>
            <p className='review__date'>{formatDate(review.created_at)}</p>
            <p className='review__message'>{review.content}</p>
          </div>
        </div>
      </li>
    );
  }
  return <Loader />;
};

export default Review;
