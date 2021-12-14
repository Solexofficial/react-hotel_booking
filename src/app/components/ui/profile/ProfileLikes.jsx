import React, { useEffect, useState } from 'react';
import likesService from '../../../services/likes.service';
import reviewsService from '../../../services/reviews.service';
import ReviewsList from '../reviews/reviewsList';

const ProfileLikes = ({ currentUser }) => {
  console.log('render');
  const [likes, setLikes] = useState();
  const [reviews, setReviews] = useState([]);

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

  useEffect(() => {
    getLikes(currentUser._id);
  }, [currentUser._id]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1 style={{ marginBottom: '20px' }}>Вам понравились отзывы:</h1>
      <ReviewsList reviews={reviews} />
    </div>
  );
};

export default ProfileLikes;
