import { IUseCase } from '../../common/UseCase';
import { SuperMarketEntity } from '../entities/SuperMarket';

export type TGetSuperMarketListUseCase = IUseCase<
  null,
  Array<SuperMarketEntity>
>;
