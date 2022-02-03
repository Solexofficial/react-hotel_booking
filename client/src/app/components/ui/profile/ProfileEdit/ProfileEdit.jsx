import { Paper } from '@mui/material';
import React from 'react';
import ProfileEditForm from '../../forms/ProfileEditForm/ProfileEditForm';

const ProfileEdit = () => {
  return (
    <main className='profile-edit'>
      <Paper elevation={3} className='form-card profileEdit-form'>
        <h2>Редактирование профиля</h2>
        <ProfileEditForm />
      </Paper>
    </main>
  );
};

export default ProfileEdit;
