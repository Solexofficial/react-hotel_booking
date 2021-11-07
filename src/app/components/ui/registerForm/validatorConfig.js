const validatorConfig = {
  email: {
    isRequired: {
      message: 'Электронная почта обязательна для заполнения',
    },
    isEmail: {
      message: 'Поле "Email" введено не корректно',
    },
  },
  password: {
    isRequired: {
      message: 'Поле "Пароль" обязательно для заполнения',
    },
    isCapitalSymbol: {
      message: 'Пароль должен содержать хотя бы 1 заглавную букву',
    },
    isContainDigit: {
      message: 'Пароль должен содержать хотя бы 1 цифру',
    },

    min: {
      value: 8,
      message: 'Пароль должен содержать минимум 8 символов',
    },
  },
};

export default validatorConfig;
