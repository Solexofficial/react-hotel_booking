import React, { useEffect, useState } from 'react';
import api from '../../../api';
import Avatar from './../../common/avatar';
import formatDate from '../../../utils/formatDate';
import Loader from '../../common/loader';
import LikeButton from '../buttons/likeButton';
import Rating from '../../common/rating';

const Review = ({ review, onRemove }) => {
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);

  const fakeUserId = '67rdca3eeb7f6fgeed471815';

  useEffect(() => {
    api.users.getById(review.userId).then(data => setUser(data));
    api.likes.getByReviewId(review._id).then(data => setLikes(data));
  }, [review]);

  const toggleLike = () => {
    if (likes.some(el => el.userId === fakeUserId)) {
      api.likes.remove(fakeUserId).then(data => setLikes(prevState => prevState.filter(el => el.userId !== data)));
    } else {
      api.likes.add(fakeUserId, review._id).then(data => setLikes(prevState => [...prevState, data]));
    }
  };

  if (user) {
    return (
      <li className='reviews-list__item'>
        <div className='review'>
          <div className='review__avatar'>
            <div className='avatar'>
              <Avatar alt='пользователя' src={user.avatarPhoto} className='avatar__img' />
            </div>
            <LikeButton likes={likes} onToggle={toggleLike} />
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
