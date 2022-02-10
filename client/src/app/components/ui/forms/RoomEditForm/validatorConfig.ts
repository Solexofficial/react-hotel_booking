import { RoomType } from './../../../../types/types';
import { ValidatorConfigType } from '../../../../utils/validator';

type ConfigType = {
  [Property in keyof RoomType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  roomNumber: {
    isRequired: {
      message: 'Поле "№ номера" обязательно для заполнения',
    },
  },
  price: {
    isRequired: {
      message: 'Поле "Аренда в сутки" обязательно для заполнения',
    },
    isValidInterval: {
      message: 'Введите цену от 0 до 15000',
      value: [0, 15000],
    },
  },
};

export default validatorConfig;
