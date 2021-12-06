import React, { useMemo } from 'react';
import { useAuth } from '../../../../hooks/useAuth';
import { Form, useForm } from '../../../../hooks/useForm';
import { DatePickerField, InputField, RadioGroup, Switch } from '../../../common/form/fields';
import withPassword from '../../../common/form/withPassword';
import Button from '../../buttons/button';
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

const RegisterForm = () => {
  const { data, errors, setErrors, handleInputChange, handleKeyDown, validate, handleResetForm } = useForm(
    initialData,
    true,
    validatorConfig
  );

  const { signUp } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate(data)) {
      console.log(data);
      try {
        await signUp(data);
      } catch (error) {
        setErrors(error);
      }
      handleResetForm(e);
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
      <DatePickerField openTo='year' mask='__.__.____' label='Дата Рождения' name='birthYear' />
      <InputField name='email' label='Почта' />
      <InputFieldWithPassword name='password' label='Пароль' type='password' />
      <Switch name='subscribe' label='Получать спецпредложения' />
      <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
        Зарегистрироваться
      </Button>
    </Form>
  );
};

export default RegisterForm;
