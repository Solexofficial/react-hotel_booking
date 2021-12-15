import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useAuth } from '../../../hooks/useAuth';
import reviewsService from '../../../services/reviews.service';
import declOfNum from '../../../utils/declOfNum';
import ReviewsForm from '../forms/reviewsForm/reviewsForm';
import ReviewsList from './reviewsList';

const Reviews = () => {
  const { roomId } = useParams();
  const [reviews, setReviews] = useState([]);

  const { currentUser } = useAuth();

  const getReviews = async roomId => {
    try {
      const reviews = await reviewsService.getByRoomId(roomId);
      setReviews(reviews);
    } catch (error) {
      console.log(error);
    }
  };

  const createReview = async payload => {
    try {
      const { content } = await reviewsService.create(payload);
      setReviews(prevState => [...prevState, content]);
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
    getReviews(roomId);
  }, [roomId]);

  const handleRemoveReview = id => {
    removeReview(id);
  };

  const handleSubmit = data => {
    const payload = {
      ...data,
      roomId,
      userId: currentUser._id,
    };
    createReview(payload);
  };

  const sortedReviews = reviews.sort((a, b) => b.created_at - a.created_at);
  const totalReviewsCount = sortedReviews.length;

  return (
    <>
      {reviews.length > 0 && (
        <section className='reviews'>
          <div className='reviews-title'>
            <h2 className='room-info__card-title'>Отзывы посетителей номера</h2>
            <span>{`${totalReviewsCount} ${declOfNum(totalReviewsCount, ['отзыв', 'отзыва', 'отзывов'])}`}</span>
          </div>
          {totalReviewsCount > 0 && <ReviewsList reviews={sortedReviews} onRemove={handleRemoveReview} />}
        </section>
      )}
      {currentUser && (
        <section className='reviews-form'>
          <h2>Оставить отзыв</h2>
          <ReviewsForm onSubmit={handleSubmit} />
        </section>
      )}
    </>
  );
};

export default Reviews;
