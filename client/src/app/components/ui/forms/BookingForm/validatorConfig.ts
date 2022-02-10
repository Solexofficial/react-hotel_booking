import { ValidatorConfigType } from '../../../../utils/validator';
import { BookingType } from './../../../../types/types';

type ConfigType = {
  [Property in keyof BookingType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  arrivalDate: {
    isValidDate: {
      message: 'Поле "Дата прибытия" не корректна',
    },
  },
  departureDate: {
    isValidDate: {
      message: 'Поле "Дата прибытия" не корректна',
    },
  },
};

export default validatorConfig;
