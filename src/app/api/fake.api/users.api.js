const users = [
  {
    _id: '67rdca3eeb7f6fgeed471815',
    name: 'Мурад Сарафанов',
    email: 'muradSafranov@vmschool.ru',
    sex: 'male',
    completedMeetings: 36,
    rate: 2.5,
    bookmark: false,
  },
  {
    _id: '67rdca3eeb7f6fgeed471816',
    name: 'Патрисия Стёклышкова',
    email: 'patrisiya@vmschool.ru',
    sex: 'female',
    completedMeetings: 15,
    rate: 2.5,
    bookmark: false,
  },
];

if (!localStorage.getItem('users')) {
  localStorage.setItem('users', JSON.stringify(users));
}

const fetchAll = () =>
  new Promise(resolve => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem('users')));
    }, 2000);
  });

const update = (id, data) =>
  new Promise(resolve => {
    const users = JSON.parse(localStorage.getItem('users'));
    const userIndex = users.findIndex(u => u._id === id);
    users[userIndex] = { ...users[userIndex], ...data };
    localStorage.setItem('users', JSON.stringify(users));
    resolve(users[userIndex]);
  });

const getById = id =>
  new Promise(resolve => {
    window.setTimeout(function () {
      resolve(JSON.parse(localStorage.getItem('users')).find(user => user._id === id));
    }, 1000);
  });

export default {
  fetchAll,
  getById,
  update,
};
