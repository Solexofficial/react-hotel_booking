import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import reviewsService from '../../../../services/reviews.service';
import { getCurrentUserId } from '../../../../store/users';
import declOfNum from '../../../../utils/declOfNum';
import { ReviewsForm } from '../../forms';
import ReviewsList from '../ReviewsList';

const Reviews = () => {
  const { roomId } = useParams();
  const [reviews, setReviews] = useState([]);
  const currentUserId = useSelector(getCurrentUserId());

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

  const handleSubmit = data => {
    const payload = {
      ...data,
      roomId,
      userId: currentUserId,
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
          {totalReviewsCount > 0 && <ReviewsList reviews={sortedReviews} handleRemove={removeReview} />}
        </section>
      )}
      {currentUserId && (
        <section className='reviews-form'>
          <h2>Оставить отзыв</h2>
          <ReviewsForm onSubmit={handleSubmit} />
        </section>
      )}
    </>
  );
};

export default Reviews;
