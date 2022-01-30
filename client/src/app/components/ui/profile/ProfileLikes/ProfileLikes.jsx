import React from 'react';
import { useSelector } from 'react-redux';
import { getLikesByUserId } from '../../../../store/likes';
import { getReviewsByIds } from '../../../../store/reviews';
import { getCurrentUserId } from '../../../../store/users';
import ReviewsList from '../../reviews/ReviewsList';

const ProfileLikes = () => {
  console.log('render');
  const currentUserId = useSelector(getCurrentUserId());
  const likes = useSelector(getLikesByUserId(currentUserId));
  const reviewsIds = likes.map(el => el.reviewId);
  const reviews = useSelector(getReviewsByIds(reviewsIds));


  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '20px' }}>Вам понравились отзывы:</h1>
      <ReviewsList reviews={reviews} />
    </div>
  );
};

export default ProfileLikes;