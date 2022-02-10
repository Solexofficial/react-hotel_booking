import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import { getAuthErrors, signIn } from '../../../../store/users';
import { SignInDataType } from '../../../../types/types';
import history from '../../../../utils/history';
import Button from '../../../common/Button/Button';
import { InputField } from '../../../common/Fields';
import withPassword from '../../../common/Fields/HOC/withPassword';
import validatorConfig from './validatorConfig';

const initialData: SignInDataType = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const { data, errors, enterError, handleInputChange, validate, handleResetForm } = useForm(
    initialData,
    false,
    validatorConfig
  );
  const loginError = useSelector(getAuthErrors());
  const dispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      const redirect = history.location.state ? history.location.state.from.pathname : '/';
      dispatch(signIn({ payload: data, redirect }));
      handleResetForm(e);
    }
  };

  const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange}>
        <InputField name='email' label='Email' autoFocus />
        <InputFieldWithPassword name='password' label='Пароль' type='password' />
        <Button onClick={handleSubmit} fullWidth type='submit' disabled={enterError ? true : false}>
          Войти
        </Button>
      </Form>
      {loginError && <p className='form__enter-error'>{loginError}</p>}
    </>
  );
};

export default LoginForm;
