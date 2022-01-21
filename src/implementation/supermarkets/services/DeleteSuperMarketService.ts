import {
  TDeleteSuperMarketPort,
  TDeleteSuperMarketUseCase,
} from '@/domain/supermarkets/usecases/DeleteSuperMarket';
import { HttpClient } from '@/implementation/common/HttpClient';

export class DeleteSuperMarketService implements TDeleteSuperMarketUseCase {
  constructor(
    private readonly resource: string,
    private readonly httpClient: HttpClient,
  ) {}

  async execute({ id }: TDeleteSuperMarketPort): Promise<void> {
    await this.httpClient.request<void>({
      method: 'DELETE',
      url: `${this.resource}/${id}`,
    });
  }
}
