import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createLike, getLikesByReviewId, getLikesLoadingStatus, removeLike } from '../../../../store/likes';
import { getCurrentUserId } from '../../../../store/users';
import ButtonLike from '../../../common/ButtonLike';

const ReviewLikes = ({ reviewId }) => {
  const [status, setStatus] = useState(false);
  const dispatch = useDispatch();
  const currentUserId = useSelector(getCurrentUserId());
  const likes = useSelector(getLikesByReviewId(reviewId));
  const likesStatusLoading = useSelector(getLikesLoadingStatus());

  const isLiked = likes.some(like => like.userId === currentUserId);

  useEffect(() => {
    if (currentUserId) {
      setStatus(isLiked);
    }
  }, [likes, currentUserId]);

  const toggleLike = () => {
    const likeData = { userId: currentUserId, reviewId };
    if (isLiked) {
      dispatch(removeLike(likeData));
    } else {
      dispatch(createLike(likeData));
    }
  };

  return !likesStatusLoading && <ButtonLike displayCount={likes.length} status={status} onToggle={toggleLike} />;
};

export default ReviewLikes;
