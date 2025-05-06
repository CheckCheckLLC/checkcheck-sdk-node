import * as yup from 'yup';
import {
  generatePaginationResponseSchema,
  PaginationParams,
  translatableFieldSchema,
} from '../schemas';
import { cast } from '../utils';
import { Resource } from './base';

export const categoryResponseSchema = yup.object({
  id: yup.number().integer().required(),
  name: translatableFieldSchema.nullable(),
  sort_order: yup.number().integer(),
  image_url: yup.string().nullable(),
});

export const paginatedCategoriesResponseSchema =
  generatePaginationResponseSchema(categoryResponseSchema);

export type PaginatedCategoriesResponseSchema = yup.InferType<
  typeof paginatedCategoriesResponseSchema
>;

export class Categories extends Resource {
  async list(
    params?: PaginationParams,
  ): Promise<PaginatedCategoriesResponseSchema> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: '/categories',
        params,
      }),
      paginatedCategoriesResponseSchema,
    );
  }
}
