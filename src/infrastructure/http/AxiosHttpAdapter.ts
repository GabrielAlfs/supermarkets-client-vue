import { AxiosInstance } from 'axios';
import { HttpClient, HttpClientArgs } from '@/implementation/common/HttpClient';

export class AxiosHttpAdapter implements HttpClient {
  constructor(private readonly axiosClient: AxiosInstance) {}

  async request<T = any>({
    method,
    url,
    body,
    headers,
    query,
  }: HttpClientArgs): Promise<T> {
    const { data } = (await this.axiosClient.request({
      method,
      url,
      data: body,
      headers,
      params: { ...query },
    })) as { data: T };

    return data;
  }
}
