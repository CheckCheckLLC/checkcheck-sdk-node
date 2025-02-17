import { Client } from './Client';
import { Environment, environmentBaseURLs } from './config';
import { Categories } from './resources/Categories';

export interface CheckCheckOptions {
  env: Environment;
}

class CheckCheck {
  private readonly client: Client;
  public categories: Categories;

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
  }
}

export default CheckCheck;
