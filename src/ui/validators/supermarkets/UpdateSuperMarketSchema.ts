import { object, string, mixed, array } from 'yup';

export const updateSuperMarketSchema = object().shape({
  name: string()
    .min(3, 'A quantidade mínima de caracteres é 3')
    .max(20, 'A quantidade máxima de caracteres é 20'),
  main_image: mixed(), // File
  additional_images: array().of(mixed()),
  short_description: string().max(
    120,
    'A quantidade máxima de caracteres é 120',
  ),
  phone: string().matches(
    /^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/,
    { message: 'Esse telefone não é válido' },
  ),
  number: string().max(20, 'A quantidade máxima de caracteres é 20'),
  street: string().max(200, 'A quantidade máxima de caracteres é 200'),
  zip: string().matches(/^\d{5}-\d{3}$/, { message: 'Esse CEP não é válido' }),
  district: string(),
  country: string().max(100, 'A quantidade máxima de caracteres é 100'),
  city: string().max(100, 'A quantidade máxima de caracteres é 100'),
  state: string().max(40, 'A quantidade máxima de caracteres é 40'),
  removed_additional_images: array().of(string()),
});
