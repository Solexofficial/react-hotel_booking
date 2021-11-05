import React from 'react';
import { useForm, Form } from '../../hooks/useForm';
import Fields from '../common/form/fields';

const initialData = {
  name: '',
  email: '',
};

const LoginForm = () => {
  const validate = (fieldValues = data) => {
    let temp = { ...errors };
    if ('name' in fieldValues) temp.name = fieldValues.name ? '' : 'Поле "Имя" обязательно для заполнения';
    if ('email' in fieldValues)
      temp.email = /$^|.+@.+..+/.test(fieldValues.email) ? '' : 'Электронная почта некорректна';
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
      <h1>Login Form 123</h1>
      <Form onSubmit={handleSubmit}>
        <Fields.InputField name='name' label='Имя' value={data.name} onChange={handleInputChange} error={errors.name} />
        <Fields.InputField
          name='email'
          label='Email'
          value={data.email}
          onChange={handleInputChange}
          error={errors.email}
        />
        <button onClick={handleSubmit}>Submit</button>
      </Form>
    </>
  );
};

export default LoginForm;
