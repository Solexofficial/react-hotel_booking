import React, { useMemo } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../../../hooks/useAuth';
import { Form, useForm } from '../../../../hooks';
import { DatePickerField, InputField, RadioGroup } from '../../../common/Fields';
import withPassword from '../../../common/Fields/HOC/withPassword';
import Switch from '../../../common/Switch';
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
  avatarPhoto: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1).toString(36).substring(7)}.svg`,
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

  const history = useHistory();
  const { signUp } = useAuth();

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate(data)) {
      console.log(data);
      try {
        await signUp(data);
        handleResetForm(e);
        history.push('./signIn');
      } catch (error) {
        setErrors(error);
      }
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
        minDate={new Date('1950-01-01')}
      />
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
