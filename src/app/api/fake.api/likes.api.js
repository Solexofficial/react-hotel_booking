const likes = [
  {
    _id: '67456878693fghg',
    reviewId: '67rdca3eeb7f6fg',
    userId: '67rdca3eeb7f6fgeed471815',
  },

  {
    _id: '67456878693fghg',
    reviewId: '67rdca3eeb7f6fg',
    userId: '67rdca3eeb7f6fgeed471816',
  },

  {
    _id: '6745687869124asjg',
    reviewId: '67rdca3eeb7f6fgdasd',
    userId: '67rdca3eeb7f6fgeed471816',
  },
  {
    _id: '67rdca3eeb7f6fgdasd',
    reviewId: '67rdca3eeb7f6fgdaasd',
    userId: '67rdca3eeb7f6fgeed471815',
  },
];

if (!localStorage.getItem('likes')) {
  localStorage.setItem('likes', JSON.stringify(likes));
}

const fetchAll = () =>
  new Promise(resolve => {
    window.setTimeout(function () {
      resolve(likes);
    }, 200);
  });

const getByReviewId = reviewId =>
  new Promise(resolve => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem('likes')).filter(el => el.reviewId === reviewId));
    }, 200);
  });

const add = (userId, reviewId) =>
  new Promise(resolve => {
    window.setTimeout(function () {
      const likes = JSON.parse(localStorage.getItem('likes'));
      const newLike = {
        userId,
        reviewId,
        _id: Math.random().toString(36).substr(2, 9),
      };
      likes.push(newLike);
      localStorage.setItem('likes', JSON.stringify(likes));
      resolve(newLike);
    }, 200);
  });

const remove = userId =>
  new Promise(resolve => {
    window.setTimeout(function () {
      const likes = JSON.parse(localStorage.getItem('likes'));
      const newLikes = likes.filter(x => x.userId !== userId);
      localStorage.setItem('likes', JSON.stringify(newLikes));
      resolve(userId);
    }, 200);
  });

export default {
  fetchAll,
  getByReviewId,
  add,
  remove,
};
