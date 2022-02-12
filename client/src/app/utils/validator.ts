import { isValid } from 'date-fns/esm';

export type ConfigFieldNameType = {
  message: string;
  value?: number | number[];
};

export type ValidatorConfigType = {
  [key: string]: {
    [key: string]: any;
    isRequired?: ConfigFieldNameType;
    isEmail?: ConfigFieldNameType;
    isCapitalSymbol?: ConfigFieldNameType;
    isContainDigit?: ConfigFieldNameType;
    min?: ConfigFieldNameType;
    isValidInterval?: ConfigFieldNameType;
    isValidDate?: ConfigFieldNameType;
  };
};

export function validator(data: { [key: string]: any }, validatorConfig: ValidatorConfigType) {
  const errors: { [key: string]: string } = {};

  function validate(validateMethod: string, fieldData: string, config: ConfigFieldNameType) {
    let statusValidate;
    switch (validateMethod) {
      case 'isRequired': {
        if (typeof fieldData === 'boolean') {
          statusValidate = !fieldData;
        } else {
          statusValidate = String(fieldData).trim() === '';
        }
        break;
      }
      case 'isEmail': {
        const emailRegExp = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegExp.test(fieldData);
        break;
      }
      case 'isCapitalSymbol': {
        const capitalRegExp = /[A-Z]+/g;
        statusValidate = !capitalRegExp.test(fieldData);
        break;
      }
      case 'isContainDigit': {
        const digitRegExp = /\d+/g;
        statusValidate = !digitRegExp.test(fieldData);
        break;
      }
      case 'min': {
        if (config.value) {
          statusValidate = fieldData.length < config.value;
        }
        break;
      }
      case 'isValidInterval': {
        if (Array.isArray(config.value)) {
          statusValidate = !(Number(fieldData) >= config.value[0] && Number(fieldData) <= config.value[1]);
        }
        break;
      }
      case 'isValidDate': {
        statusValidate = !isValid(fieldData);
        break;
      }
      default:
        break;
    }
    if (statusValidate) return config.message;
  }

  for (const fieldName in data) {
    for (const validateMethod in validatorConfig[fieldName]) {
      const error = validate(validateMethod, data[fieldName], validatorConfig[fieldName][validateMethod]);
      if (error && !errors[fieldName]) {
        errors[fieldName] = error;
      }
    }
  }
  return errors;
}
