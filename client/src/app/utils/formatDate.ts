import declOfNum from './declOfNum';

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

export function decomposeDate(date: number | Date | string) {
  date = new Date(date).getTime();
  if (typeof date === 'string') {
    date = Number(date);
  }
  const year = new Date(date).getFullYear();
  const month = new Date(date).getMonth();
  const day = new Date(date).getDate();
  const hours = new Date(date).getHours();
  const min = new Date(date).getMinutes();

  return { date, year, month, day, hours, min };
}

export function getDateDDMMYYYY(date: number | Date | string) {
  const { day, month, year } = decomposeDate(date);
  return `${day} ${months[month]} ${year}`;
}

export default function formatDate(value: number | Date | string) {
  value = new Date(value).getTime();
  const { year, month, day, hours, min } = decomposeDate(value);

  const currentDateTime = Date.now();
  const postCreatedTime = Number(value);
  const diffTime = Math.abs(currentDateTime - postCreatedTime);

  const checkLeapYear = (year: number) => {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
  };

  const getValidTime = (hours: number | string, min: number | string) => {
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
