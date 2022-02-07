import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import { updateUserData } from '../../../../store/users';
import { RoomType } from '../../../../types/types';
import Button from '../../../common/Button';
import { InputField, RadioGroup, SelectField } from '../../../common/Fields';
import validatorConfig from './validatorConfig';

type RoomEditFormProps = {
  roomData: RoomType;
};

const roomType = [
  { id: 'Стандарт', title: 'Стандарт' },
  { id: 'Люкс', title: 'Люкс' },
];
const roomComfortsOptions = [
  { name: 'Wi-Fi', value: 'hasWifi' },
  { name: 'Рабочее место', value: 'hasWorkSpace' },
  { name: 'Кондиционер', value: 'hasConditioner' },
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
      console.log(data);
      // dispatch(updateUserData(data));
    }
  };

  return (
    <>
      <Form data={data} errors={errors} handleChange={handleInputChange} handleKeyDown={handleKeyDown}>
        <InputField name='roomNumber' label='№ номера' />
        <RadioGroup label='Тип номера' name='type' items={roomType} value={roomData.type} />
        <InputField name='price' label='Аренда в сутки(₽)' />
        <SelectField label='Удобства' name='comforts' options={roomComfortsOptions} multiple />

        <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
          Обновить
        </Button>
      </Form>
      {/* {error && <p className='form__enter-error'>{error}</p>} */}
    </>
  );
};

export default RoomEditForm;
