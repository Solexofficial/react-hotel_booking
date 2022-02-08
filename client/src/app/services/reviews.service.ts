import { ReviewType } from '../types/types';
import httpService from './http.service';

const reviewsEndPoint = 'review/';

const reviewsService = {
  getAll: async () => {
    const { data } = await httpService.get(reviewsEndPoint);
    return data;
  },
  getById: async (reviewId: string) => {
    const { data } = await httpService.get(reviewsEndPoint + reviewId);
    return data;
  },
  create: async (payload: ReviewType) => {
    const { data } = await httpService.post(reviewsEndPoint, payload);
    return data;
  },
  remove: async (id: string) => {
    await httpService.delete(reviewsEndPoint + id);
    return id;
  },
  update: async (payload: ReviewType) => {
    const { data } = await httpService.patch(reviewsEndPoint + payload._id, payload);
    return data;
  },
};

export default reviewsService;
