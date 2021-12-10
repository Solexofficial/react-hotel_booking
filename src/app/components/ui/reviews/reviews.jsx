import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import api from '../../../api';
import { useAuth } from '../../../hooks/useAuth';
import ReviewsForm from './reviewsForm';
import ReviewsList from './reviewsList';

const Reviews = () => {
  const { roomId } = useParams();
  const [reviews, setReviews] = useState([]);

  const { currentUser } = useAuth();

  useEffect(() => {
    api.reviews.fetchReviewsForRoom(roomId).then(data => setReviews(data));
  }, [roomId]);

  const handleRemoveReview = id => {
    api.reviews.remove(id).then(data => setReviews(prevState => prevState.filter(comment => comment._id !== data)));
  };

  const handleSubmit = data => {
    api.reviews.add({ ...data, pageId: roomId }).then(data => setReviews(prevState => [data, ...prevState]));
  };

  const sortedReviews = reviews.sort((a, b) => b.created_at - a.created_at);

  return (
    <>
      <section className='reviews'>
        {sortedReviews.length > 0 && <ReviewsList reviews={sortedReviews} onRemove={handleRemoveReview} />}
      </section>
      {currentUser && (
        <section className='reviews-form'>
          <h2>Оставить отзыв</h2>
          <ReviewsForm roomId={roomId} onSubmit={handleSubmit} />
        </section>
      )}
    </>
  );
};

export default Reviews;
