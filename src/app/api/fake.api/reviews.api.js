/* eslint-disable import/no-anonymous-default-export */
const reviews = [
  {
    _id: '67rdca3eeb7f6fg',
    userId: '67rdca3eeb7f6fgeed471815',
    pageId: '888',
    content:
      'Великолепный матрас на кровати в основной спальне! А пуфик вообще потрясающий. И стены, действительно, шумоподавляющие. Выкрикивал комплименты повару — никто не жаловался из соседей.',
    created_at: '1633576521057',
    rating: 5,
  },
  {
    _id: '67rdca3eeb7f6fgdasd',
    pageId: '888',
    userId: '67rdca3eeb7f6fgeed471816',
    content:
      'Обслуживание на высоте! Всё аккуратно, чисто. Завтраки в номер советую заказать, каждый день новое блюдо и десерт как комплимент',
    created_at: '1633573058520',
    rating: 4,
  },
  {
    _id: '67rdca3eeb7f6fgdaasd',
    pageId: '777',
    userId: '67rdca3eeb7f6fgeed471815',
    content: 'Lorem ipsum dolor and etc',
    created_at: '1633573058520',
    rating: 4,
  },
];

if (!localStorage.getItem('reviews')) {
  localStorage.setItem('reviews', JSON.stringify(reviews));
}

const fetchAll = () =>
  new Promise(resolve => {
    window.setTimeout(function () {
      resolve(reviews);
    }, 200);
  });

const fetchReviewsForRoom = roomId =>
  new Promise(resolve => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem('reviews')).filter(c => c.pageId === roomId));
    }, 200);
  });

const add = data =>
  new Promise(resolve => {
    window.setTimeout(function () {
      const reviews = JSON.parse(localStorage.getItem('reviews'));
      const newReview = {
        ...data,
        created_at: Date.now(),
        _id: Math.random().toString(36).substr(2, 9),
      };
      reviews.push(newReview);
      localStorage.setItem('reviews', JSON.stringify(reviews));
      resolve(newReview);
    }, 200);
  });

const remove = id =>
  new Promise(resolve => {
    window.setTimeout(function () {
      const reviews = JSON.parse(localStorage.getItem('reviews'));
      const newReviews = reviews.filter(x => x._id !== id);
      localStorage.setItem('reviews', JSON.stringify(newReviews));
      resolve(id);
    }, 200);
  });

export default {
  fetchAll,
  fetchReviewsForRoom,
  add,
  remove,
};
