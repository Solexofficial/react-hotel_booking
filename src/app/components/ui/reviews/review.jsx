import React, { useEffect, useState } from 'react';
import api from '../../../api';
import Avatar from './../../common/avatar';
import formatDate from '../../../utils/formatDate';
import { FavoriteBorder } from '@mui/icons-material';
import Loader from '../../common/loader';

const Review = ({ review, onRemove }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    api.users.getById(review.userId).then(data => setUser(data));
  }, []);

  console.log(review);

  if (user) {
    return (
      <li className='comments-list__item'>
        <div className='comment'>
          <div className='comment__column'>
            <div className='comment__avatar'>
              <div className='avatar'>
                <Avatar alt='пользователя' src={user.avatarPhoto} className='avatar__img' />
              </div>
            </div>
            <div className='comment__like-button'>
              <button className='like-button like-button--active' type='button'>
                <span className='like-button__wrapper'>
                  <FavoriteBorder />
                  <span className='visually-hidden'>Количество лайков:</span>
                  {review.likesCount}
                </span>
              </button>
            </div>
          </div>
          <div className='comment__column'>
            <p className='comment__user-name'>{user.name}</p>
            <p className='comment__date'>{formatDate(review.created_at)}</p>
            <p className='comment__message'>{review.content}</p>
          </div>
        </div>
      </li>
    );
  }
  return <Loader />;
};

export default Review;
