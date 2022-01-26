import React from 'react';
import { useSelector } from 'react-redux';
import { useMockData } from '../../../../hooks';
import { getCurrentUserData } from '../../../../store/users';

const UserProfile = () => {
  const currentUser = useSelector(getCurrentUserData());
  const { firstName, secondName } = currentUser;

  const { error, initialize, progress, status } = useMockData();

  const handleClick = () => {
    console.log('clicked');
    initialize();
  };

  return (
    <main className='main-profile__page'>
      <h1 className='visually-hidden'>Профиль пользователя отеля toxin</h1>
      <h2>Приветствуем вас {`${firstName} ${secondName}`}</h2>
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
