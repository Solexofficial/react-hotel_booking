const generateAuthError = (message: string) => {
  switch (message) {
    case 'EMAIL_EXISTS':
      return 'Пользователь с таким email уже существует';
    case 'USER_DISABLED':
      return 'Учетная запись пользователя отключена администратором.';
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
    case 'INVALID_EMAIL':
      return 'Неверный email или пароль';
    default:
      return 'Слишком много попыток входа, попробуйте позже';
  }
};

export default generateAuthError;
