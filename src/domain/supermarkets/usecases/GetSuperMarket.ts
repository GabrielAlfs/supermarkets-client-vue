import { IUseCase } from '../../common/UseCase';
import { SuperMarketEntity } from '../entities/SuperMarket';

export type TGetSuperMarketPort = {
  id: string;
};

export type TGetSuperMarketUseCase = IUseCase<
  TGetSuperMarketPort,
  SuperMarketEntity
>;
