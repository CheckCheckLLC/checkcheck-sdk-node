import { Client } from '../client';

// Resource is a class that contains shared logic for all resources
export abstract class Resource {
  protected readonly client: Client;

  constructor(client: Client) {
    this.client = client;
  }
}
