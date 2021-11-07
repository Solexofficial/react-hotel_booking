import React, { useMemo } from 'react';
import { useForm, Form } from '../../../hooks/useForm';
import { InputField } from '../../common/form/fields';
import withPassword from '../../common/form/withPassword';
import Button from '../buttons/button';
import validatorConfig from './validatorConfig';

const initialData = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const { data, errors, handleInputChange, handleKeyDown, validate, resetForm } = useForm(
    initialData,
    false,
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
    <>
      <Form
        onSubmit={handleSubmit}
        data={data}
        errors={errors}
        handleChange={handleInputChange}
        handleKeyDown={handleKeyDown}
      >
        <InputField name='email' label='Email' autoFocus />
        <InputFieldWithPassword name='password' label='Пароль' type='password' />
        <Button onClick={handleSubmit} fullWidth type='submit'>
          Войти
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
