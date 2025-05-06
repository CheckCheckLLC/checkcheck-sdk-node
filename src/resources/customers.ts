import * as yup from 'yup';
import { generatePaginationResponseSchema, PaginationParams } from '../schemas';
import { cast, validate } from '../utils';
import { Resource } from './base';

export const customerResponseSchema = yup.object({
  id: yup.number().required(),
  name: yup.string().nullable(),
  email: yup.string().nullable(),
});

export type CustomerResponse = yup.InferType<typeof customerResponseSchema>;

export const paginatedCustomersResponseSchema =
  generatePaginationResponseSchema(customerResponseSchema);

export type PaginatedCustomersResponse = yup.InferType<
  typeof paginatedCustomersResponseSchema
>;

export const createCustomerBodySchema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

export type CreateCustomerBody = yup.InferType<typeof createCustomerBodySchema>;

export class Customers extends Resource {
  async list(params?: PaginationParams): Promise<PaginatedCustomersResponse> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: '/customers',
        params,
      }),
      paginatedCustomersResponseSchema,
    );
  }

  async get(id: number): Promise<CustomerResponse> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: `/customers/${id}`,
      }),
      customerResponseSchema,
    );
  }

  async create(data: CreateCustomerBody): Promise<CustomerResponse> {
    await validate(data, createCustomerBodySchema);
    return cast(
      await this.client.request({
        method: 'POST',
        url: '/customers',
        data,
      }),
      customerResponseSchema,
    );
  }

  async delete(id: number): Promise<boolean> {
    await this.client.request({
      method: 'DELETE',
      url: `/customers/${id}`,
    });
    return true;
  }
}
