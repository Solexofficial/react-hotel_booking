import ClearIcon from '@mui/icons-material/Clear';
import EditIcon from '@mui/icons-material/Edit';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLike, getLikesByReviewId, getLikesLoadingStatus, removeLike } from '../../../../store/likes';
import { removeReview } from '../../../../store/reviews';
import { getCurrentUserData, getCurrentUserId, getUserById } from '../../../../store/users';
import formatDate from '../../../../utils/formatDate';
import Avatar from '../../../common/Avatar';
import Button from '../../../common/Button';
import ButtonLike from '../../../common/ButtonLike';
import { TextAreaField } from '../../../common/Fields';
import Loader from '../../../common/Loader';
import Rating from '../../../common/Rating';
import Tooltip from '../../../common/Tooltip';

const Review = ({ review }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const user = useSelector(getUserById(review.userId));
  const likes = useSelector(getLikesByReviewId(review._id));
  const likesStatusLoading = useSelector(getLikesLoadingStatus());
  const currentUser = useSelector(getCurrentUserData());
  const currentUserId = useSelector(getCurrentUserId());

  const isAdmin = currentUser.role === 'admin';
  const isAuthor = review.userId === currentUser._id;
  const showDeleteBtn = isAdmin || isAuthor;

  useEffect(() => {
    setContent(review.content);
  }, [review]);

  const toggleLike = () => {
    if (likes.some(el => el.userId === currentUserId)) {
      dispatch(removeLike(currentUserId, review._id));
    } else {
      dispatch(createLike(currentUserId, review._id));
    }
  };

  const handleChange = e => {
    setContent(e.target.value);
  };

  if (user && !likesStatusLoading) {
    return (
      <li className='reviews-list__item'>
        <div className='review'>
          <div className='review__avatar'>
            <div className='avatar'>
              <Avatar alt='пользователя' src={user.avatarPhoto} className='avatar__img' />
            </div>
            <ButtonLike likes={likes} onToggle={toggleLike} />
          </div>
          <div className='review__content'>
            <div className='review__user-name'>
              {`${user.firstName} ${user.secondName}`}
              {isAuthor && (
                <div className='review__edit-btn'>
                  <Tooltip title='Редактировать'>
                    <IconButton onClick={() => setEditMode(true)}>
                      <EditIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              {showDeleteBtn && (
                <div className='review__delete-btn'>
                  <Tooltip title='Удалить отзыв'>
                    <IconButton onClick={() => dispatch(removeReview(review._id))}>
                      <ClearIcon fontSize='small' />
                    </IconButton>
                  </Tooltip>
                </div>
              )}
              <div className='review__rating'>
                <Rating value={review.rating} readOnly />
              </div>
            </div>
            <p className='review__date'>{formatDate(review.created_at)}</p>
            {/* !TODO: Сделать форму обновления контента комментария */}
            {editMode ? (
              <>
                <TextAreaField value={content} onChange={handleChange} rows={3} />
                <Button variant='outlined' size='small' style={{ marginTop: '5px' }} onClick={() => setEditMode(false)}>
                  Применить
                </Button>
              </>
            ) : (
              <p className='review__message'>{content}</p>
            )}
          </div>
        </div>
      </li>
    );
  }
  return <Loader />;
};

export default Review;
