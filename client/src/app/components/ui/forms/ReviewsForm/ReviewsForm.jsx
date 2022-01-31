import React from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import { Form, useForm } from '../../../../hooks';
import { createReview } from '../../../../store/reviews';
import Button from '../../../common/Button/Button';
import { RatingField, TextAreaField } from '../../../common/Fields';
import validatorConfig from './validatorConfig';

const ReviewsForm = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const initialData = { content: '', likes: [], rating: 5 };
  const { data, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, true, validatorConfig);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate(data)) {
      const payload = {
        ...data,
        roomId,
      };
      dispatch(createReview(payload));
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
