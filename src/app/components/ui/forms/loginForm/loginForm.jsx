import React, { useMemo } from 'react';
import { useHistory } from 'react-router';
import { useAuth } from '../../../../hooks/useAuth';
import { Form, useForm } from '../../../../hooks/useForm';
import { InputField } from '../../../common/form/fields';
import withPassword from '../../../common/form/withPassword';
import Button from '../../buttons/button';
import validatorConfig from './validatorConfig';

const initialData = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const { data, errors, setErrors, enterError, setEnterError, handleInputChange, validate, handleResetForm } = useForm(
    initialData,
    false,
    validatorConfig
  );

  const { signIn } = useAuth();
  const history = useHistory();

  const handleSubmit = async e => {
    e.preventDefault();
    if (validate(data)) {
      try {
        await signIn(data);
        history.push('/');
      } catch (error) {
        setErrors(error);
        setEnterError(error.message);
        handleResetForm(e);
      }
    }
  };

  const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);

  return (
    <>
      <Form onSubmit={handleSubmit} data={data} errors={errors} handleChange={handleInputChange}>
        <InputField name='email' label='Email' autoFocus />
        <InputFieldWithPassword name='password' label='Пароль' type='password' />
        <Button onClick={handleSubmit} fullWidth type='submit' disabled={enterError ? true : false}>
          Войти
        </Button>
      </Form>
      {enterError && <p className='form__enter-error'>{enterError}</p>}
    </>
  );
};

export default LoginForm;
