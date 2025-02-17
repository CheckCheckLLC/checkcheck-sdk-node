import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { CheckCheckClientError } from './Error';
import { defaultClientOptions } from './config';

export interface ClientOptions {
  apiKey: string;
  baseURL?: string;
  apiVersion?: string;
  timeout?: number;
}

export class Client {
  private readonly apiKey: string;
  private readonly baseURL: string;
  private readonly timeout: number;
  private readonly apiVersion: string;
  private readonly axiosInstance: AxiosInstance;

  constructor(options: ClientOptions) {
    if (!options.apiKey) {
      throw new Error('API key is required to initialize client.');
    }

    this.apiKey = options.apiKey;
    this.baseURL = options.baseURL ?? defaultClientOptions.baseURL;
    this.apiVersion = options.apiVersion ?? defaultClientOptions.apiVersion;
    this.timeout = options.timeout ?? defaultClientOptions.timeout;

    // Ensure there's no double slash in the base URL
    const normalizedBaseURL = this.baseURL.replace(/\/+$/, '');

    this.axiosInstance = axios.create({
      baseURL: `${normalizedBaseURL}/${this.apiVersion}`,
      timeout: this.timeout,
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    });
  }

  async request<T>(config: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> =
        await this.axiosInstance.request(config);
      return response.data;
    } catch (error: any) {
      let errorMessage = 'An unknown error occurred';

      if (error.response) {
        errorMessage =
          error.response.data?.message ||
          `HTTP Error: ${error.response.status}`;
      } else if (error.request) {
        errorMessage = 'No response received from the server';
      } else {
        errorMessage = error.message;
      }

      throw new CheckCheckClientError(errorMessage);
    }
  }
}
