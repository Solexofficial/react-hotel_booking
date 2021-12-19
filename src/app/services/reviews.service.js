import httpService from './http.service';

const reviewsEndPoint = 'reviews/';

const reviewsService = {
  getAll: async () => {
    const { data } = await httpService.get(reviewsEndPoint);
    return data;
  },
  getByRoomId: async roomId => {
    const { data } = await httpService.get(reviewsEndPoint);
    const { content } = data;
    return content.filter(review => review.roomId === roomId);
  },
  getById: async reviewId => {
    const { data } = await httpService.get(reviewsEndPoint + reviewId);
    return data;
  },
  getByReviewsIds: async reviewsIds => {
    const { data } = await httpService.get(reviewsEndPoint);
    const { content } = data;
    return content.filter(el => reviewsIds.includes(el._id));
  },
  create: async payload => {
    const newReview = {
      _id: Math.random().toString(36).substring(2, 9),
      created_at: Date.now(),
      ...payload,
    };
    const { data } = await httpService.put(reviewsEndPoint + newReview._id, newReview);
    return data;
  },
  remove: async id => {
    await httpService.delete(reviewsEndPoint + id);
    return id;
  },
};

export default reviewsService;
