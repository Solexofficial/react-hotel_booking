import React, { useEffect, useState } from 'react';
import api from '../../../api';
import { useAuth } from '../../../hooks/useAuth';
import { Form, useForm } from '../../../hooks/useForm';
import { RatingField, TextAreaField } from '../../common/form/fields';
import Button from '../buttons/button';

const validatorConfig = {
  content: {
    isRequired: { message: 'Поле "Сообщение" не должно быть пустым' },
  },
};

const ReviewsForm = ({ onSubmit }) => {
  const { currentUser } = useAuth();
  const initialData = { content: '', userId: currentUser._id, likes: [], rating: 5 };
  const { data, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, true, validatorConfig);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate(data)) {
      onSubmit(data);
      handleResetForm(e);
    }
  };

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange}>
        <TextAreaField label='Оставить отзыв' name='content' />
        <RatingField name='rating' label='Ваша оценка:' size='large' />
        <Button onClick={handleSubmit} type='submit'>
          Опубликовать
        </Button>
      </Form>
    </>
  );
};

export default ReviewsForm;
