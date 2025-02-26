import { Client } from './client';
import { Environment, environmentBaseURLs } from './config';
import { Categories, Customers } from './resources';

export interface CheckCheckOptions {
  env: Environment;
}

class CheckCheck {
  private readonly client: Client;
  public categories: Categories;
  public customers: Customers;

  constructor(
    apiKey: string,
    options: CheckCheckOptions = {
      env: 'sandbox',
    },
  ) {
    this.client = new Client({
      apiKey,
      baseURL: environmentBaseURLs[options.env],
    });

    // Initialize all resources
    this.categories = new Categories(this.client);
    this.customers = new Customers(this.client);
  }
}

export default CheckCheck;
