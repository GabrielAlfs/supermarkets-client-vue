import { useAxios } from '@/application/config/axios';
import { AxiosHttpAdapter } from '@/infrastructure/http/AxiosHttpAdapter';

export const buildAxiosHttpClient = (): AxiosHttpAdapter =>
  new AxiosHttpAdapter(useAxios());
