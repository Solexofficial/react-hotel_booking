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
    const { data } = await httpService.post(reviewsEndPoint, payload);
    return data;
  },
  remove: async id => {
    await httpService.delete(reviewsEndPoint + id);
    return id;
  },
};

export default reviewsService;
