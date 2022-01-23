import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import reviewsService from '../../../../services/reviews.service';
import { getLikesByUserId } from '../../../../store/likes';
import { getCurrentUserId } from '../../../../store/users';
import ReviewsList from '../../reviews/ReviewsList';

const ProfileLikes = () => {
  console.log('render');
  const [reviews, setReviews] = useState([]);
  const currentUserId = useSelector(getCurrentUserId());
  const likes = useSelector(getLikesByUserId(currentUserId));

  const getReviews = async () => {
    try {
      const reviewIds = likes.map(el => el.reviewId);
      const reviews = await reviewsService.getByReviewsIds(reviewIds);
      setReviews(reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const removeReview = async id => {
    try {
      const reviewId = await reviewsService.remove(id);
      setReviews(prevState => prevState.filter(review => review._id !== reviewId));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getReviews();
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '20px' }}>Вам понравились отзывы:</h1>
      <ReviewsList reviews={reviews} handleRemove={removeReview} />
    </div>
  );
};

export default ProfileLikes;
