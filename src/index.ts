import { Client } from './client';
import { Environment, environmentBaseURLs } from './config';
import { Brands } from './resources/brands';
import { Categories } from './resources/categories';
import { CheckRequests } from './resources/check-requests';
import { Customers } from './resources/customers';
import { Files } from './resources/files';
import { PlanOrders } from './resources/planOrders';
import { Plans } from './resources/plans';
import { ServiceLevels } from './resources/service-levels';
import { Styles } from './resources/styles';
import { Webhooks } from './resources/webhooks';

export interface CheckCheckOptions {
  env?: Environment;
  baseURL?: string;
}

class CheckCheck {
  private readonly client: Client;
  public categories: Categories;
  public customers: Customers;
  public brands: Brands;
  public styles: Styles;
  public serviceLevels: ServiceLevels;
  public plans: Plans;
  public planOrders: PlanOrders;
  public webhooks: Webhooks;
  public files: Files;
  public checkRequests: CheckRequests;

  constructor(
    apiKey: string,
    options: CheckCheckOptions = {
      env: 'sandbox',
    },
  ) {
    this.client = new Client({
      apiKey,
      baseURL:
        options?.baseURL || (options.env && environmentBaseURLs[options.env]),
    });
    // Initialize all resources
    this.categories = new Categories(this.client);
    this.customers = new Customers(this.client);
    this.brands = new Brands(this.client);
    this.styles = new Styles(this.client);
    this.serviceLevels = new ServiceLevels(this.client);
    this.plans = new Plans(this.client);
    this.planOrders = new PlanOrders(this.client);
    this.webhooks = new Webhooks(this.client);
    this.files = new Files(this.client);
    this.checkRequests = new CheckRequests(this.client);
  }
}

export default CheckCheck;
