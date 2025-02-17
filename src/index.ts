import { Client } from './Client';
import { Environment, environmentBaseURLs } from './config';
import { Categories } from './resources/Categories';

class CheckCheck {
  private readonly client: Client;
  public categories: Categories;

  constructor(apiKey: string, env: Environment = 'sandbox') {
    this.client = new Client({
      apiKey,
      baseURL: environmentBaseURLs[env],
    });

    // Initialize all resources
    this.categories = new Categories(this.client);
  }
}

export default CheckCheck;
