import { BookingType } from '../../../../types/types';
import { ValidatorConfigType } from '../../../../utils/validator';

type ConfigType = {
  [Property in keyof BookingType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  arrivalDate: {
    isValidDate: {
      message: 'Дата не корректна',
    },
  },
  departureDate: {
    isValidDate: {
      message: 'Дата не корректна',
    },
  },
  adults: {
    min: {
      message: 'Число взрослых гостей минимум 1 взрослый',
      value: 2,
    },
  },
};

export default validatorConfig;
