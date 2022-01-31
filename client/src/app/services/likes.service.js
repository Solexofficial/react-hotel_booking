import httpService from './http.service';

const likesEndPoint = 'like/';

const likesService = {
  getAll: async () => {
    const { data } = await httpService.get(likesEndPoint);
    return data;
  },
  getByReviewId: async reviewId => {
    const { data } = await httpService.get(likesEndPoint, {
      params: {
        orderBy: 'reviewId',
        equalTo: `${reviewId}`,
      },
    });
    return data;
  },
  getByUserId: async userId => {
    const { data } = await httpService.get(likesEndPoint, {
      params: {
        orderBy: 'userId',
        equalTo: `${userId}`,
      },
    });
    return data;
  },
  create: async payload => {
    const { data } = await httpService.post(likesEndPoint, payload);
    return data;
  },
  remove: async id => {
    await httpService.delete(likesEndPoint + id);
    return id;
  },
};

export default likesService;
