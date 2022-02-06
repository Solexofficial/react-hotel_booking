import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import { updateUserData } from '../../../../store/users';
import { RoomType } from '../../../../types/types';
import Button from '../../../common/Button';
import { InputField, RadioGroup } from '../../../common/Fields';
import validatorConfig from './validatorConfig';

type RoomEditFormProps = {
  roomData: RoomType;
};

const genderItems = [
  { id: 'male', title: 'Мужчина' },
  { id: 'female', title: 'Женщина' },
];

const RoomEditForm: React.FC<RoomEditFormProps> = ({ roomData }) => {
  const initialData = {
    roomNumber: roomData.roomNumber || '',
    images: roomData.images || {},
    price: roomData.price || 0,
    type: roomData.type || 'Стандарт',
    comforts: roomData.comforts || [],
  };

  const { data, errors, handleInputChange, handleKeyDown, validate } = useForm(initialData, true, validatorConfig);

  const dispatch = useDispatch();

  const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (validate(data)) {
      dispatch(updateUserData(data));
    }
  };

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>
        <InputField autoFocus name='firstName' label='Имя' />
        <InputField name='secondName' label='Фамилия' />
        <RadioGroup name='gender' items={genderItems} />

        <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
          Обновить
        </Button>
      </Form>
      {/* {error && <p className='form__enter-error'>{error}</p>} */}
    </>
  );
};

export default RoomEditForm;
