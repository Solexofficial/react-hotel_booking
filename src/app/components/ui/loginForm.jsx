import React from 'react';
import { useForm, Form } from '../../hooks/useForm';
import { InputField } from '../common/form/fields';
import Button from '../ui/buttons/Button';

const initialData = {
  name: '',
  email: '',
};

const LoginForm = () => {
  const validate = (fieldValues = data) => {
    let temp = { ...errors };
    if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'Поле "Имя" обязательно для заполнения';
    if ('email' in fieldValues)
      temp.email = /^\S+@\S+\.\S+$/g.test(fieldValues.email) ? '' : 'Электронная почта некорректна';
    setErrors({
      ...temp,
    });

    if (fieldValues === data) return Object.values(temp).every(x => x === '');
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
        <InputField name='name' label='Имя' value={data.name} onChange={handleInputChange} error={errors.name} />
        <InputField name='email' label='Email' value={data.email} onChange={handleInputChange} error={errors.email} />
        <Button onClick={handleSubmit} fullWidth>
          Войти
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
