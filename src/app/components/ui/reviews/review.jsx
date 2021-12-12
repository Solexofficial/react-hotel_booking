import React, { useEffect, useState } from 'react';
import api from '../../../api';
import Avatar from './../../common/avatar';
import formatDate from '../../../utils/formatDate';
import Loader from '../../common/loader';
import LikeButton from '../buttons/likeButton';
import Rating from '../../common/rating';
import { useAuth } from '../../../hooks/useAuth';
import userService from '../../../services/user.service';
import Button from '../buttons/button';
import ClearIcon from '@mui/icons-material/Clear';
import { IconButton } from '@mui/material';
import Tooltip from '../../common/tooltip';

const Review = ({ review, onRemove }) => {
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);

  const { currentUser } = useAuth();

  const isAdmin = currentUser?.role === 'admin';

  const getUser = async id => {
    const { content } = await userService.getById(id);
    setUser(content);
  };

  useEffect(() => {
    getUser(review.userId);
    api.likes.getByReviewId(review._id).then(data => setLikes(data));
  }, [review]);

  const toggleLike = () => {
    if (likes.some(el => el.userId === currentUser._id)) {
      api.likes.remove(currentUser._id).then(data => setLikes(prevState => prevState.filter(el => el.userId !== data)));
    } else {
      api.likes.add(currentUser._id, review._id).then(data => setLikes(prevState => [...prevState, data]));
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
              {`${user.firstName} ${user.secondName}`}
              <div className='review__rating'>
                <Rating value={review.rating} readOnly />
              </div>
              {isAdmin && (
                <div className='review__delete-btn'>
                  <Tooltip title='Удалить отзыв'>
                    <IconButton>
                      <ClearIcon />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
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
