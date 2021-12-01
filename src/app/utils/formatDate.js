import declOfNum from './declOfNum';

export default function formatDate(value) {
  if (typeof value === 'string') {
    value = Number(value);
  }
  const currentDateTime = Date.now();
  const postCreatedTime = Number(value);
  const diffTime = Math.abs(currentDateTime - postCreatedTime);

  const year = new Date(value).getFullYear();
  const month = new Date(value).getMonth();
  const day = new Date(value).getDate();
  const hours = new Date(value).getHours();
  const min = new Date(value).getMinutes();

  const months = [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря',
  ];

  const checkLeapYear = year => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getValidTime = (hours, min) => {
    hours = hours < 10 ? `0${hours}` : hours;
    min = min < 10 ? `0${min}` : min;
    return `${hours}:${min}`;
  };

  const oneMinutesAgo = 60000;
  const thirtyMinutesAgo = oneMinutesAgo * 30;
  const lessOneDay = oneMinutesAgo * 60 * 24;
  const lessCurrentYear = lessOneDay * (checkLeapYear(year) ? 366 : 365);

  if (diffTime <= oneMinutesAgo) {
    return 'только что';
  } else if (diffTime <= thirtyMinutesAgo) {
    const minutes = Math.floor(diffTime / 60000);
    return `${minutes} ${declOfNum(minutes, ['минута', 'минуты', 'минут'])} назад`;
  } else if (diffTime > thirtyMinutesAgo && diffTime <= lessOneDay) {
    return `сегодня в ${getValidTime(hours, min)}`;
  } else if (diffTime > lessOneDay && diffTime <= lessCurrentYear) {
    return `${day} ${months[month]} в ${getValidTime(hours, min)}`;
  } else if (diffTime > lessCurrentYear) {
    return `${day} ${months[month]} ${year} года в ${getValidTime(hours, min)}`;
  } else {
    return `Этот комментарий оставило НЛО из будущего ¯\\_(ツ)_/¯`;
  }
}
