import { ValidationError } from 'yup';

export const extractErrors = (
  error: ValidationError,
): Record<string, string> => {
  return error.inner.reduce((acc, { path, message }) => {
    return { ...acc, [path as string]: message };
  }, {});
};
