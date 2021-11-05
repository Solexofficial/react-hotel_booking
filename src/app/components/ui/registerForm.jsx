import React from 'react';
import { useForm, Form } from '../../hooks/useForm';
import Fields from '../common/form/fields';
import Button from './buttons/Button';

const initialData = {
  name: '',
  email: '',
};

const LoginForm = () => {
  const validate = (fieldValues = data) => {
    let errorsList = { ...errors };
    if ('name' in fieldValues) errorsList.name = fieldValues.name ? '' : 'Поле "Имя" обязательно для заполнения';
    if ('email' in fieldValues)
      errorsList.email = /^\S+@\S+\.\S+$/g.test(fieldValues.email) ? '' : 'Электронная почта некорректна';
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
        <Fields.InputField name='name' label='Имя' value={data.name} onChange={handleInputChange} error={errors.name} />
        <Fields.InputField
          name='email'
          label='Email'
          value={data.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <Button onClick={handleSubmit} fullWidth disabled={!Object.values(errors).every(x => x === '')}>
          Зарегистрироваться
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
