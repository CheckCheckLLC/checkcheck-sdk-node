export type Environment = 'live' | 'sandbox';
export const environmentBaseURLs: Record<Environment, string> = {
  live: 'https://api-sdk.checkcheck.com',
  sandbox: 'http://api-sdk-dev.getcheckcheck.com',
};

export const defaultClientOptions = {
  baseURL: environmentBaseURLs.sandbox,
  apiVersion: 'v1',
  timeout: 10000, // Default timeout: 10 seconds
};
