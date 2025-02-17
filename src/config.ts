export type Environment = 'live' | 'sandbox';
export const environmentBaseURLs: Record<Environment, string> = {
  live: 'https://api.checkcheck.com',
  sandbox: 'https://api-dev.checkcheck.com',
};

export const defaultClientOptions = {
  baseURL: environmentBaseURLs.sandbox,
  apiVersion: 'v1',
  timeout: 10000, // Default timeout: 10 seconds
};
