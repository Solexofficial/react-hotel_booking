import React, { useEffect, useState } from 'react';
import api from '../../../api';
import Button from '../buttons/button';
import { useForm, Form } from '../../../hooks/useForm';
import { SelectField, TextAreaField } from '../../common/form/fields';
import Rating from '../../common/rating';

const initialData = { content: '', userId: '', rating: 5 };

const validatorConfig = {
  reviewContent: {
    isRequired: { message: 'Обязательно выберите пользователя' },
  },
  content: {
    isRequired: { message: 'Поле "Сообщение" не должно быть пустым' },
  },
};

const ReviewsForm = ({ onSubmit }) => {
  const [users, setUsers] = useState({});
  const { data, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, false, validatorConfig);

  useEffect(() => {
    api.users.fetchAll().then(data => setUsers(data));
  }, []);

  const handleSubmit = e => {
    console.log(data);
    e.preventDefault();
    if (validate(data)) {
      console.log(data);
      onSubmit(data);
      handleResetForm();
    }
  };

  return (
    <Form data={data} errors={errors} handleChange={handleInputChange}>
      <SelectField name='userId' options={users} label={'Выберите пользователя'} />
      <TextAreaField label='Оставить отзыв' name='reviewContent' />
      <Rating name='rating' label='Ваша оценка' size='large' />
      <Button onClick={handleSubmit} type='submit'>
        Опубликовать
      </Button>
    </Form>
  );
};

export default ReviewsForm;
