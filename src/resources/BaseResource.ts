import { Method } from 'axios';
import { Client } from '../Client';

export interface PaginationOptions {
  page?: number;
  limit?: number;
}

export type Id = number | string;

export class BaseResource {
  protected client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  // If later on, you want to add shared logic (e.g., logging, automatic retries, request validation), you only need to modify here
  protected request<T>(
    method: Method,
    url: string = '',
    params?: Record<string, any>,
    data?: Record<string, any>,
  ): Promise<T> {
    return this.client.request<T>({
      method,
      url,
      params,
      data,
    });
  }
}
