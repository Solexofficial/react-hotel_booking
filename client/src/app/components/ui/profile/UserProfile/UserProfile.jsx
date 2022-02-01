import { Paper } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useMockData } from '../../../../hooks';
import { getUserById } from '../../../../store/users';
import { getDateDDMMYYYY } from '../../../../utils/formatDate';

const UserProfile = ({ userId }) => {
  const currentUser = useSelector(getUserById(userId));
  console.log(currentUser);
  const { firstName, secondName } = currentUser;

  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    console.log('clicked');
    initialize();
  };

  return (
    <main className='main-profile__page' style={{ width: '100%' }}>
      <h1 className='visually-hidden'>Профиль пользователя отеля toxin</h1>
      <h2>Страница пользователя {`${firstName} ${secondName}`}</h2>
      <div style={{ display: 'flex', margin: '30px 0' }}>
        <div>
          <img
            src={currentUser.avatarPhoto}
            alt='avatarPhoto'
            style={{ display: 'block', width: '150px', height: '150px' }}
          />
        </div>
        <Paper style={{ width: '100%', marginLeft: '20px', padding: '10px 20px' }}>
          <p>Имя: {currentUser.firstName}</p>
          <p>Фамилия: {currentUser.secondName}</p>
          <p>Пол: {currentUser.gender === 'male' ? 'Мужской' : 'Женский'}</p>
          <p>Статус: {currentUser.role === 'admin' ? 'Администратор' : 'Пользователь'}</p>
          <p>Дата рождения: {getDateDDMMYYYY(currentUser.birthYear)}</p>
        </Paper>
      </div>

      {currentUser?.role === 'admin' && (
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
};

export default UserProfile;
