import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { Form, useForm } from '../../../../hooks';
import { createReview } from '../../../../store/reviews';
import { getRoomById, updateRoomData } from '../../../../store/rooms';
import { ReviewType, RoomType } from '../../../../types/types';
import Button from '../../../common/Button/Button';
import { RatingField, TextAreaField } from '../../../common/Fields';
import validatorConfig from './validatorConfig';

const ReviewsForm: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const dispatch = useDispatch();
  const initialData = { content: '' as ReviewType['content'], likes: [], rating: 5 as ReviewType['rating'] };
  const currentRoomData = useSelector(getRoomById(roomId));
  const { data, errors, handleInputChange, validate, handleResetForm } = useForm(initialData, true, validatorConfig);

  const handleSubmit = (e: React.FormEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (validate(data)) {
      const payload = {
        ...data,
        roomId,
      };
      const updateRoomPayload: RoomType = {
        _id: currentRoomData?._id || 'not found',
        price: currentRoomData?.price || 0,
        roomNumber: currentRoomData?.roomNumber || 'not found',
        countReviews: (currentRoomData?.countReviews || 0) + 1,
        rate: Number(currentRoomData?.rate) + Number(data.rating),
      };

      dispatch(createReview(payload));
      dispatch(updateRoomData(updateRoomPayload));
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
