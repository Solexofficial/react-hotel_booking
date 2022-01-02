import React from 'react';
import { useAuth } from '../../../../hooks';

const UserProfile = () => {
  const { currentUser } = useAuth();
  const { firstName, secondName } = currentUser;

  return (
    <main className='main-profile__page'>
      <h1 className='visually-hidden'>Профиль пользователя отеля toxin</h1>
      <h2>Приветствуем вас {`${firstName} ${secondName}`}</h2>
    </main>
  );
};

export default UserProfile;
