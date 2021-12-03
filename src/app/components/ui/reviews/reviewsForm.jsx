import React, { useEffect, useState } from 'react';
import api from '../../../api';
import Button from '../buttons/button';
import { useForm, Form } from '../../../hooks/useForm';
import { SelectField, TextAreaField, RatingField } from '../../common/form/fields';

const initialData = { content: '', userId: '', likes: [], rating: 5 };

const validatorConfig = {
  userId: {
    isRequired: { message: 'Обязательно выберите пользователя' },
  },
  content: {
    isRequired: { message: 'Поле "Сообщение" не должно быть пустым' },
  },
};

const ReviewsForm = ({ onSubmit }) => {
  const [users, setUsers] = useState({});
  const { data, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, true, validatorConfig);

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
  }, []);

  const handleSubmit = e => {
    console.log('before submit', data);
    e.preventDefault();
    if (validate(data)) {
      console.log(data);
      onSubmit(data);
      handleResetForm(e);
    }
  };

  return (
    <Form data={data} errors={errors} handleChange={handleInputChange}>
      <SelectField name='userId' options={users} label={'Выберите пользователя'} />
      <TextAreaField label='Оставить отзыв' name='content' />
      <RatingField name='rating' label='Ваша оценка:' size='large' />
      <Button onClick={handleSubmit} type='submit'>
        Опубликовать
      </Button>
    </Form>
  );
};

export default ReviewsForm;
