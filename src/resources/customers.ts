import * as yup from 'yup';
import { Resource } from '../resource';
import { baseResourceSchema } from '../schemas';
import { cast, castArray, validate } from '../utils';

export const customerSchema = baseResourceSchema.shape({
  name: yup.string().required(),
  email: yup.string().required().email(),
  seller_category: yup.array().of(yup.string()).required(),
  check_balance: yup.number().min(0).required(),
  check_count: yup.number().min(0).required(),
});

export type Customer = yup.InferType<typeof customerSchema>;

export const createCustomerSchema = yup.object({
  name: yup.string().required(),
  email: yup.string().required().email(),
  seller_category: yup.array().of(yup.string()).required(),
});

export type CreateCustomer = yup.InferType<typeof createCustomerSchema>;

export class Customers extends Resource {
  async list(): Promise<Customer[]> {
    return castArray(
      await this.client.request({
        method: 'GET',
        url: '/customers',
      }),
      customerSchema,
    );
  }

  async get(id: number): Promise<Customer> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: `/customers/${id}`,
      }),
      customerSchema,
    );
  }

  async create(data: CreateCustomer): Promise<Customer> {
    await validate(data, createCustomerSchema);
    return cast(
      await this.client.request({
        method: 'POST',
        url: '/customers',
        data,
      }),
      customerSchema,
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
