import { TextField } from '@mui/material';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import { getCurrentUserData, updateUserData } from '../../../../store/users';
import { UserType } from '../../../../types/types';
import Button from '../../../common/Button';
import { DatePickerField, InputField, RadioGroup } from '../../../common/Fields';
import validatorConfig from './validatorConfig';

const genderItems = [
  { id: 'male', title: 'Мужчина' },
  { id: 'female', title: 'Женщина' },
];

const ProfileEditForm = () => {
  const currentUserData = useSelector(getCurrentUserData());

  const initialData: UserType = {
    firstName: currentUserData?.firstName || '',
    secondName: currentUserData?.secondName || '',
    gender: currentUserData?.gender || 'male',
    birthYear: currentUserData?.birthYear || Date.now(),
    role: currentUserData?.role || 'user',
  };

  const { data, errors, handleInputChange, handleKeyDown, validate } = useForm(initialData, true, validatorConfig);

  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      dispatch(updateUserData(data));
    }
  };

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>
        <InputField autoFocus name='firstName' label='Имя' />
        <InputField name='secondName' label='Фамилия' />
        <RadioGroup name='gender' items={genderItems} />
        <DatePickerField
          onChange={handleInputChange}
          value={data.birthYear}
          openTo='year'
          mask='__.__.____'
          label='Дата Рождения'
          name='birthYear'
          minDate={new Date('1950-01-01')}
          renderInput={params => (
            <TextField {...params} {...(errors?.birthYear && { error: true, helperText: errors?.birthYear })} />
          )}
        />
        <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
          Обновить
        </Button>
      </Form>
    </>
  );
};

export default ProfileEditForm;
