import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../hooks/useAuth';
import likesService from '../../../services/likes.service';
import userService from '../../../services/user.service';
import formatDate from '../../../utils/formatDate';
import Loader from '../../common/loader';
import Rating from '../../common/rating';
import Tooltip from '../../common/tooltip';
import LikeButton from '../buttons/likeButton';
import Avatar from './../../common/avatar';

const Review = ({ review, onRemove }) => {
  const [user, setUser] = useState(null);
  const [likes, setLikes] = useState([]);

  const { currentUser } = useAuth();

  const isAdmin = currentUser?.role === 'admin';
  const isAuthor = review.userId === currentUser._id;
  const showEditBtns = isAdmin || isAuthor;

  const getUser = async id => {
    const { content } = await userService.getById(id);
    setUser(content);
  };

  const getLikes = async reviewId => {
    try {
      const likes = await likesService.getByReviewId(reviewId);
      setLikes(likes);
    } catch (error) {
      console.log(error);
    }
  };

  const removeLike = async user => {
    try {
      const userLike = likes.find(like => like.userId === user._id);
      const likeId = await likesService.remove(userLike._id);
      setLikes(prevState => prevState.filter(like => like._id !== likeId));
      console.log(likes);
    } catch (error) {
      console.log(error);
    }
  };

  const addLike = async user => {
    try {
      const { content } = await likesService.create(user._id, review._id);
      setLikes(prevState => [...prevState, content]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser(review.userId);
    getLikes(review._id);
  }, [review]);

  const toggleLike = () => {
    if (likes.some(el => el.userId === currentUser._id)) {
      removeLike(currentUser);
    } else {
      addLike(currentUser);
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
              {showEditBtns && (
                <>
                  <div className='review__edit-btn'>
                    <Tooltip title='Редактировать'>
                      <IconButton onClick={() => console.log('edit review')}>
                        <EditIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </div>
                  <div className='review__delete-btn'>
                    <Tooltip title='Удалить отзыв'>
                      <IconButton onClick={() => onRemove(review._id)}>
                        <ClearIcon fontSize='small' />
                      </IconButton>
                    </Tooltip>
                  </div>
                </>
              )}
              <div className='review__rating'>
                <Rating value={review.rating} readOnly />
              </div>
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
