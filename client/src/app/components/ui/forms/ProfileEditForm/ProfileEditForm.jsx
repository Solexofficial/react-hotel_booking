import React from 'react';
import { useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import Button from '../../../common/Button';
import { DatePickerField, InputField, RadioGroup } from '../../../common/Fields';
import withPassword from '../../../common/Fields/HOC/withPassword';
import validatorConfig from './validatorConfig';

const genderItems = [
  { id: 'male', title: 'Мужчина' },
  { id: 'female', title: 'Женщина' },
];

const initialData = {
  firstName: '',
  secondName: '',
  gender: 'male',
  birthYear: Date.now(),
  email: '',
  password: '',
  subscribe: false,
};

const ProfileEditForm = () => {
  const { data, errors, handleInputChange, handleKeyDown, validate } = useForm(initialData, true, validatorConfig);

  const dispatch = useDispatch();

  const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate(data)) {
      console.log(data);
    }
  };

  return (
    <>
      <Form
        onSubmit={handleSubmit}
        data={data}
        errors={errors}
        handleChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      >
        <InputField autoFocus name='firstName' label='Имя' />
        <InputField name='secondName' label='Фамилия' />
        <RadioGroup name='gender' items={genderItems} />
        <DatePickerField
          openTo='year'
          mask='__.__.____'
          label='Дата Рождения'
          name='birthYear'
          minDate={new Date('1950-01-01')}
        />
        <InputField name='email' label='Почта' />
        <InputFieldWithPassword name='password' label='Пароль' type='password' />
        <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
          Обновить
        </Button>
      </Form>
      {/* {error && <p className='form__enter-error'>{error}</p>} */}
    </>
  );
};

export default ProfileEditForm;
