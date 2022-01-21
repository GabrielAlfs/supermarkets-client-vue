import { IUseCase } from '../../common/UseCase';
import { SuperMarketEntity } from '../entities/SuperMarket';
import { TCreateSuperMarketPort } from './CreateSuperMarket';

export type TUpdateSuperMarketPort = {
  id: string;
  removed_additional_images?: Array<string>;
} & Partial<TCreateSuperMarketPort>;

export type TUpdateSuperMarketUseCase = IUseCase<
  TUpdateSuperMarketPort,
  SuperMarketEntity
>;
