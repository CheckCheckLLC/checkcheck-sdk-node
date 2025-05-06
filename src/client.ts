import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';
import { defaultClientOptions } from './config';
import { handleRequestError } from './errors';

export interface ClientConfig {
  apiKey?: string;
  baseURL?: string;
  apiVersion?: string;
  timeout?: number;
  headers?: Record<string, string>;
}

export class Client {
  private readonly axios: AxiosInstance;
  private readonly config: ClientConfig;

  constructor(config: ClientConfig) {
    this.config = {
      ...defaultClientOptions,
      ...config,
    };

    const baseURL = `${this.config.baseURL}/${this.config.apiVersion}`;

    this.axios = axios.create({
      baseURL,
      timeout: this.config.timeout,
      headers: {
        'api-key': `${this.config.apiKey}`,
        'Content-Type': 'application/json',
        ...this.config.headers,
      },
    });

    this.axios.interceptors.response.use(
      (response) => response,
      (error) => handleRequestError(error),
    );
  }

  async request(config: AxiosRequestConfig): Promise<any> {
    try {
      const response = await this.axios.request(config);
      return response.data;
    } catch (error) {
      throw handleRequestError(error);
    }
  }
}
