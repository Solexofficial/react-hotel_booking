import React from 'react';
import { Form, useForm } from '../../../../hooks';
import { RatingField, TextAreaField } from '../../../common/Fields';
import validatorConfig from './validatorConfig';
import Button from '../../../common/Button/Button';

const ReviewsForm = ({ onSubmit }) => {
  const initialData = { content: '', likes: [], rating: 5 };
  const { data, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, true, validatorConfig);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate(data)) {
      onSubmit(data);
      handleResetForm(e);
    }
  };

  return (
    <Form data={data} errors={errors} handleChange={handleInputChange}>
      <TextAreaField label='Оставить отзыв' name='content' />
      <RatingField name='rating' label='Ваша оценка:' size='large' />
      <Button onClick={handleSubmit} type='submit'>
        Опубликовать
      </Button>
    </Form>
  );
};

export default ReviewsForm;
