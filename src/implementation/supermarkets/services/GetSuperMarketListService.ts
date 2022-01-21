import { TGetSuperMarketListUseCase } from '@/domain/supermarkets/usecases/GetSuperMarketList';
import { HttpClient } from '@/implementation/common/HttpClient';
import { SuperMarketEntityDto } from '../common/ComicDto';

export class GetSuperMarketListService implements TGetSuperMarketListUseCase {
  constructor(
    private readonly resource: string,
    private readonly httpClient: HttpClient,
  ) {}

  async execute(): Promise<Array<SuperMarketEntityDto>> {
    const superMarkets = await this.httpClient.request<
      Array<SuperMarketEntityDto>
    >({
      method: 'GET',
      url: this.resource,
    });

    return superMarkets;
  }
}
