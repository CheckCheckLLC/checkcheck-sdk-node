import { Resource } from '../resource';
import { BaseEntity, TranslatableField } from '../types/common';

export interface Category extends BaseEntity {
  name: TranslatableField;
}

export class Categories extends Resource {
  async get(id: number): Promise<Category> {
    return this.client.request<Category>({
      method: 'GET',
      url: `/categories/${id}`,
    });
  }

  async list(): Promise<Category[]> {
    return this.client.request<Category[]>({
      method: 'GET',
      url: '/categories',
    });
  }
}
