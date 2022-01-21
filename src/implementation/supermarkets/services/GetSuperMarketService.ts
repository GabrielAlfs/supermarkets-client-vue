import {
  TGetSuperMarketPort,
  TGetSuperMarketUseCase,
} from '@/domain/supermarkets/usecases/GetSuperMarket';
import { HttpClient } from '@/implementation/common/HttpClient';
import { SuperMarketEntityDto } from '../common/ComicDto';

export class GetSuperMarketService implements TGetSuperMarketUseCase {
  constructor(
    private readonly resource: string,
    private readonly httpClient: HttpClient,
  ) {}

  async execute({ id }: TGetSuperMarketPort): Promise<SuperMarketEntityDto> {
    const superMarket = await this.httpClient.request<SuperMarketEntityDto>({
      method: 'GET',
      url: `${this.resource}/${id}`,
    });

    return superMarket;
  }
}
