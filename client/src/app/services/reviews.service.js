import httpService from './http.service';

const reviewsEndPoint = 'review/';

const reviewsService = {
  getAll: async () => {
    const { data } = await httpService.get(reviewsEndPoint);
    return data;
  },
  getById: async reviewId => {
    const { data } = await httpService.get(reviewsEndPoint + reviewId);
    return data;
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
