import { IUseCase } from '../../common/UseCase';
import { SuperMarketEntity } from '../entities/SuperMarket';

export type TCreateSuperMarketPort = {
  name: string;
  main_image: Blob;
  additional_images: Array<Blob>;
  short_description: string;
  phone: string;
  street: string;
  number: string;
  district: string;
  zip: string;
  country: string;
  city: string;
  state: string;
};

export type TCreateSuperMarketUseCase = IUseCase<
  TCreateSuperMarketPort,
  SuperMarketEntity
>;
