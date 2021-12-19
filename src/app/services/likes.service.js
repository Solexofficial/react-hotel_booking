import httpService from './http.service';

const likesEndPoint = 'likes/';

const likesService = {
  getAll: async () => {
    const { data } = await httpService.get(likesEndPoint);
    return data;
  },
  getByReviewId: async reviewId => {
    const { data } = await httpService.get(likesEndPoint);
    const { content } = data;
    return content.filter(like => like.reviewId === reviewId);
  },
  getByUserId: async userId => {
    const { data } = await httpService.get(likesEndPoint);
    const { content } = data;
    return content.filter(like => like.userId === userId);
  },
  create: async (userId, reviewId) => {
    const newLike = {
      _id: Math.random().toString(36).substring(2, 9),
      userId,
      reviewId,
    };
    const { data } = await httpService.put(likesEndPoint + newLike._id, newLike);
    return data;
  },
  remove: async id => {
    await httpService.delete(likesEndPoint + id);
    return id;
  },
};

export default likesService;
