import { IUseCase } from '../../common/UseCase';

export type TDeleteSuperMarketPort = {
  id: string;
};

export type TDeleteSuperMarketUseCase = IUseCase<TDeleteSuperMarketPort, void>;
