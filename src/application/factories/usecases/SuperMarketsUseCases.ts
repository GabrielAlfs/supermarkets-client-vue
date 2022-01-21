import { CreateSuperMarketService } from '@/implementation/supermarkets/services/CreateSuperMarketService';
import { DeleteSuperMarketService } from '@/implementation/supermarkets/services/DeleteSuperMarketService';
import { GetSuperMarketListService } from '@/implementation/supermarkets/services/GetSuperMarketListService';
import { GetSuperMarketService } from '@/implementation/supermarkets/services/GetSuperMarketService';
import { UpdateSuperMarketService } from '@/implementation/supermarkets/services/UpdateSuperMarketService';
import { buildAxiosHttpClient } from '../http/AxiosHttpClient';

const axiosHttpClient = buildAxiosHttpClient();

export const buildGetSuperMarketListUseCase = (): GetSuperMarketListService =>
  new GetSuperMarketListService('/supermarkets', axiosHttpClient);

export const buildGetSuperMarketUseCase = (): GetSuperMarketService =>
  new GetSuperMarketService('/supermarkets', axiosHttpClient);

export const buildCreateSuperMarketUseCase = (): CreateSuperMarketService =>
  new CreateSuperMarketService('/supermarkets', axiosHttpClient);

export const buildUpdateSuperMarketUseCase = (): UpdateSuperMarketService =>
  new UpdateSuperMarketService('/supermarkets', axiosHttpClient);

export const buildDeleteSuperMarketUseCase = (): DeleteSuperMarketService =>
  new DeleteSuperMarketService('/supermarkets', axiosHttpClient);
