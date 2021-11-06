import React, { useMemo } from 'react';
import { useForm, Form } from '../../hooks/useForm';
import { InputField } from '../common/form/fields';
import withPassword from '../common/form/withPassword';
import Button from '../ui/buttons/Button';

const initialData = {
  email: '',
  password: '',
};

const LoginForm = () => {
  const validate = (fieldValues = data) => {
    let temp = { ...errors };
    if ('password' in fieldValues)
      temp.password = fieldValues.password.length > 0 ? '' : 'Поле "Пароль" обязательно для заполнения';
    if ('email' in fieldValues)
      temp.email = /^\S+@\S+\.\S+$/g.test(fieldValues.email) ? '' : 'Электронная почта некорректна';
    console.log(temp);
    setErrors({
      ...temp,
    });

    if (fieldValues === data) return Object.values(temp).every(x => x === '');
  };

  const { data, setData, errors, setErrors, handleInputChange, resetForm } = useForm(initialData, true, validate);

  const handleSubmit = e => {
    e.preventDefault();
    console.log(validate());
    if (validate()) {
      console.log(data);
      resetForm();
    }
  };

  const InputFieldWithPassword = useMemo(() => withPassword(InputField), []);

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <InputField name='email' label='Email' value={data.email} onChange={handleInputChange} error={errors.email} />
        <InputFieldWithPassword
          name='password'
          label='Пароль'
          value={data.password}
          onChange={handleInputChange}
          error={errors.password}
          type='password'
        />
        <Button onClick={handleSubmit} fullWidth type='submit'>
          Войти
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
