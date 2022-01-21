export type HttpClientArgs = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: Record<string, any>;
  headers?: Record<string, any>;
  query?: Record<string, any>;
};

export interface HttpClient {
  request<T = any>(args: HttpClientArgs): Promise<T>;
}
