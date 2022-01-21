import {
  TCreateSuperMarketPort,
  TCreateSuperMarketUseCase,
} from '@/domain/supermarkets/usecases/CreateSuperMarket';
import { toFormData } from '@/implementation/common/FormDataConversor';
import { HttpClient } from '@/implementation/common/HttpClient';
import { SuperMarketEntityDto } from '../common/ComicDto';

export class CreateSuperMarketService implements TCreateSuperMarketUseCase {
  constructor(
    private readonly resource: string,
    private readonly httpClient: HttpClient,
  ) {}

  async execute(data: TCreateSuperMarketPort): Promise<SuperMarketEntityDto> {
    const superMarket = await this.httpClient.request<SuperMarketEntityDto>({
      method: 'POST',
      url: this.resource,
      body: toFormData(data),
    });

    return superMarket;
  }
}
