import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Form, useForm } from '../../../../hooks';
import { createReview } from '../../../../store/reviews';
import { getRoomById, updateRoom } from '../../../../store/rooms';
import Button from '../../../common/Button/Button';
import { RatingField, TextAreaField } from '../../../common/Fields';
import validatorConfig from './validatorConfig';

const ReviewsForm = () => {
  const { roomId } = useParams();
  const dispatch = useDispatch();
  const initialData = { content: '', likes: [], rating: 5 };
  const currentRoomData = useSelector(getRoomById(roomId));
  const { data, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, true, validatorConfig);

  const handleSubmit = e => {
    e.preventDefault();
    if (validate(data)) {
      const payload = {
        ...data,
        roomId,
      };
      const updateRoomPayload = {
        roomId: currentRoomData._id,
        countReviews: currentRoomData.countReviews + 1,
        rate: Number(currentRoomData.rate) + Number(data.rating),
      };

      dispatch(createReview(payload));
      dispatch(updateRoom(updateRoomPayload));
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
