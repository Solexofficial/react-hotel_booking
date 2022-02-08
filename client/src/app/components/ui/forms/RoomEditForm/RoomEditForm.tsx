import React from 'react';
import { useDispatch } from 'react-redux';
import { Form, useForm } from '../../../../hooks';
import { RoomType } from '../../../../types/types';
import Button from '../../../common/Button';
import { Checkbox, CheckBoxList, InputField, RadioGroup, SelectField } from '../../../common/Fields';
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
  const initialData: RoomType = {
    roomNumber: roomData.roomNumber || '',
    type: roomData.type || 'Стандарт',
    price: roomData.price || 0,
    comforts: roomData.comforts || [],
    canPets: roomData.canPets || false,
    canSmoke: roomData.canSmoke || false,
    canInvite: roomData.canInvite || false,
    hasWideCorridor: roomData.hasWideCorridor || false,
    hasDisabledAssistant: roomData.hasDisabledAssistant || false,
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
        <CheckBoxList>
          <Checkbox label='Можно c питомцами' name='canPets' />
          <Checkbox label='Можно курить' name='canSmoke' />
          <Checkbox label='Можно пригласить гостей (до 10 человек)' name='canInvite' />
        </CheckBoxList>
        <CheckBoxList>
          <Checkbox
            label='Широкий коридор'
            name='hasWideCorridor'
            labelDetails='Ширина коридоров в номере не менее 91см'
          />
          <Checkbox
            label='Помощник для инвалидов'
            name='hasDisabledAssistant'
            labelDetails='На 1 этаже вас встретит специалист и проводит до номера'
          />
        </CheckBoxList>

        <Button type='submit' onClick={handleSubmit} fullWidth disabled={Object.keys(errors).length !== 0}>
          Обновить
        </Button>
      </Form>
      {/* {error && <p className='form__enter-error'>{error}</p>} */}
    </>
  );
};

export default RoomEditForm;
