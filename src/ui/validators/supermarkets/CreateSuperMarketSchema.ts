import { object, string, mixed, array } from 'yup';

export const createSuperMarketSchema = object().shape({
  name: string()
    .min(3, 'A quantidade mínima de caracteres é 3')
    .max(20, 'A quantidade máxima de caracteres é 20')
    .required('O nome do supermercado é obrigatório'),
  main_image: mixed().required('A imagem principal é obrigatória'), // File
  additional_images: array().of(mixed()),
  short_description: string().max(
    120,
    'A quantidade máxima de caracteres é 120',
  ),
  phone: string()
    .matches(/^\(?[1-9]{2}\)? ?(?:[2-8]|9[1-9])[0-9]{3}-?[0-9]{4}$/, {
      message: 'Esse telefone não é válido',
    })
    .required('O telefone é obrigatório'),
  number: string().max(20, 'A quantidade máxima de caracteres é 20'),
  street: string()
    .max(200, 'A quantidade máxima de caracteres é 200')
    .required('O nome da rua é obrigatório'),
  zip: string()
    .matches(/^\d{5}-\d{3}$/, { message: 'Esse CEP não é válido' })
    .required('O CEP é obrigatório'),
  district: string().required('O nome do bairro é obrigatório'),
  country: string()
    .max(100, 'A quantidade máxima de caracteres é 100')
    .required('O nome do país é obrigatório'),
  city: string()
    .max(100, 'A quantidade máxima de caracteres é 100')
    .required('O nome da cidade é obrigatório'),
  state: string()
    .max(40, 'A quantidade máxima de caracteres é 40')
    .required('O nome do estado é obrigatório'),
});
