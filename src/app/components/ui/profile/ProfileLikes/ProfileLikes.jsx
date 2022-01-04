import React, { useEffect, useState } from 'react';
import { useAuth } from '../../../../hooks';
import likesService from '../../../../services/likes.service';
import reviewsService from '../../../../services/reviews.service';
import ReviewsList from '../../reviews/ReviewsList';

const ProfileLikes = () => {
  console.log('render');
  const [likes, setLikes] = useState();
  const [reviews, setReviews] = useState([]);
  const { currentUser } = useAuth();

  const getLikes = async userId => {
    try {
      const likes = await likesService.getByUserId(userId);
      setLikes(likes);
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
    getLikes(currentUser._id);
  }, [currentUser._id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '20px' }}>Вам понравились отзывы:</h1>
      <ReviewsList reviews={reviews} handleRemove={removeReview} />
    </div>
  );
};

export default ProfileLikes;
