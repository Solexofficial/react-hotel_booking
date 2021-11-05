import React from 'react';
import { useForm, Form } from '../../hooks/useForm';
import Fields from '../common/form/fields';
import Button from './buttons/Button';

const genderItems = [
  { id: 'male', title: 'Мужчина' },
  { id: 'female', title: 'Женщина' },
];

const initialData = {
  firstName: '',
  secondName: '',
  gender: 'male',
  birthYear: Date.now(),
  email: "",
  password: ""
};

const LoginForm = () => {
  const validate = (fieldValues = data) => {
    let errorsList = { ...errors };
    if ('firstName' in fieldValues)
      errorsList.firstName = fieldValues.firstName.length > 0 ? '' : 'Поле "Имя" обязательно для заполнения';
    if ('secondName' in fieldValues)
      errorsList.secondName = fieldValues.secondName.length > 0 ? '' : 'Поле "Фамилия" обязательно для заполнения';
    if ('email' in fieldValues)
      errorsList.email = fieldValues.email.length > 0 ? '' : 'Поле "Почта" обязательно для заполнения';
    if ('password' in fieldValues)
      errorsList.password = fieldValues.password.length > 0 ? '' : 'Поле "Пароль" обязательно для заполнения';
    setErrors({
      ...errorsList,
    });

    if (fieldValues === data) return Object.values(errorsList).every(x => x === '');
  };

  const { data, setData, errors, setErrors, handleInputChange, resetForm } = useForm(initialData, true, validate);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate()) {
      console.log(data);
      resetForm();
    }
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <Fields.InputField
          autoFocus
          name='firstName'
          label='Имя'
          value={data.firstName}
          onChange={handleInputChange}
          error={errors.firstName}
        />
        <Fields.InputField
          name='secondName'
          label='Фамилия'
          value={data.secondName}
          onChange={handleInputChange}
          error={errors.secondName}
        />
        <Fields.RadioGroup name='gender' value={data.gender} onChange={handleInputChange} items={genderItems} />
        <Fields.DatePickerField
          openTo='year'
          mask='__.__.____'
          label='Дата Рождения'
          name='birthYear'
          onChange={handleInputChange}
          value={data.birthYear}
          inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
        />
        <Fields.InputField
          name='email'
          label='Почта'
          value={data.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Fields.InputField
          name='password'
          label='Пароль'
          type='password'
          value={data.password}
          onChange={handleInputChange}
          error={errors.password}
          inputProps={{ type: 'password' }}
        />
        <Button onClick={handleSubmit} fullWidth disabled={!Object.values(errors).every(x => x === '')}>
          Зарегистрироваться
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
