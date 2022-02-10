import { ReviewType } from '../../../../types/types';
import { ValidatorConfigType } from '../../../../utils/validator';

type ConfigType = {
  [Property in keyof ReviewType]?: ValidatorConfigType[Property];
};

const validatorConfig: ConfigType = {
  content: {
    isRequired: { message: 'Поле "Сообщение" не должно быть пустым' },
  },
};

export default validatorConfig;
