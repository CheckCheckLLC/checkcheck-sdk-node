import { BaseResource, Id, PaginationOptions } from './BaseResource';

export class Categories extends BaseResource {
  async list(paginationOptions?: PaginationOptions) {
    return this.request('GET', '/categories', paginationOptions);
  }

  async retrieve(id: Id) {
    return this.request('GET', `/categories/${id}`);
  }
}
