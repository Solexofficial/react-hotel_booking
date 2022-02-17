import { Paper } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useMockData } from '../../../../hooks';
import { getUserById } from '../../../../store/users';
import { getDateDDMMYYYY } from '../../../../utils/formatDate';
import config from '../../../../config.json';

const UserProfile = ({ userId }: { userId: string }) => {
  const currentUser = useSelector(getUserById(userId));

  const { error, initialize, progress, status } = useMockData();

  const isFireBase = currentUser?.role === 'admin' && config.isFireBase;

  const handleClick = () => {
    initialize();
  };
  if (currentUser) {
    return (
      <main className='main-profile__page'>
        <h1 className='visually-hidden'>Профиль пользователя отеля toxin</h1>
        <h2>Страница пользователя {`${currentUser?.firstName} ${currentUser?.secondName}`}</h2>
        <div className='user-card'>
          <div>
            <img className='user-card__avatarPhoto' src={currentUser?.avatarPhoto} alt='avatarPhoto' />
          </div>
          <Paper className='user-card__content'>
            <p>Имя: {currentUser?.firstName}</p>
            <p>Фамилия: {currentUser?.secondName}</p>
            <p>Пол: {currentUser?.gender === 'male' ? 'Мужской' : 'Женский'}</p>
            <p>Статус: {currentUser?.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
            <p>Дата рождения: {getDateDDMMYYYY(currentUser?.birthYear || Date.now())}</p>
          </Paper>
        </div>

        {isFireBase && (
          <>
            <h3>Инициализация данных в FireBase</h3>
            <ul>
              <li>Status: {status}</li>
              <li>Progress: {progress}%</li>
              {error && <li>error: {error}</li>}
            </ul>
            <button className='btn btn-primary' onClick={handleClick}>
              Инициализировать
            </button>
          </>
        )}
      </main>
    );
  }
  return (
    <main className='main-profile__page'>
      <h1 className='visually-hidden'>Профиль пользователя отеля toxin</h1>
      <h2>Страница пользователя не найдена</h2>
    </main>
  );
};

export default UserProfile;
