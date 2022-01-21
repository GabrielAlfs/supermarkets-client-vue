import {
  TUpdateSuperMarketPort,
  TUpdateSuperMarketUseCase,
} from '@/domain/supermarkets/usecases/UpdateSuperMarket';
import { toFormData } from '@/implementation/common/FormDataConversor';
import { HttpClient } from '@/implementation/common/HttpClient';
import { SuperMarketEntityDto } from '../common/ComicDto';

export class UpdateSuperMarketService implements TUpdateSuperMarketUseCase {
  constructor(
    private readonly resource: string,
    private readonly httpClient: HttpClient,
  ) {}

  async execute(data: TUpdateSuperMarketPort): Promise<SuperMarketEntityDto> {
    const { id, ...updatedSuperMarket } = data;

    const superMarket = await this.httpClient.request<SuperMarketEntityDto>({
      method: 'PUT',
      url: `${this.resource}/${id}`,
      body: toFormData(updatedSuperMarket),
    });

    return superMarket;
  }
}
