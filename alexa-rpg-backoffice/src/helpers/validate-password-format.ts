import { InvalidParamError } from '@src/errors';

export function validatePasswordFormat(password: string): boolean {
  const defaultMessage =
    'Passwords should have at least 8 characters with at least one upper case and one special character and no blank spaces.';

  if (password.length < 8) throw new InvalidParamError(`Password too short. ${defaultMessage}`);

  const regex = /^(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>])[A-Za-z\d!@#$%^&*(),.?":{}|<>]{8,}$/;

  if (!regex.test(password)) throw new InvalidParamError(defaultMessage);

  return true;
}
