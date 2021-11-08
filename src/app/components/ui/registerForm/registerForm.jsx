import React, { useMemo } from 'react';
import { Form, useForm } from '../../../hooks/useForm';
import { DatePickerField, InputField, RadioGroup, Switch } from '../../common/form/fields';
import withPassword from '../../common/form/withPassword';
import Button from '.././buttons/button';
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

const LoginForm = () => {
  const { data, errors, handleInputChange, handleKeyDown, validate, resetForm } = useForm(
    initialData,
    true,
    validatorConfig
  );

  const handleSubmit = e => {
    e.preventDefault();
    if (validate(data)) {
      console.log(data);
      resetForm();
    }
  };

  const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);

  return (
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
        inputProps={{ placeholder: 'ДД.ММ.ГГГГ' }}
      />
      <InputField name='email' label='Почта' />
      <InputFieldWithPassword name='password' label='Пароль' type='password' inputProps={{ type: 'password' }} />
      <Switch name='subscribe' label='Получать спецпредложения' />
      <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default LoginForm;
