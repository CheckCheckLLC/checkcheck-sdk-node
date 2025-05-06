import * as yup from 'yup';
import {
  generatePaginationResponseSchema,
  PaginationParams,
  translatableFieldSchema,
} from '../schemas';
import { cast } from '../utils';
import { Resource } from './base';

export const brandResponseSchema = yup.object({
  id: yup.number().integer().required(),
  name: translatableFieldSchema.nullable(),
  sort_order: yup.number().integer(),
  image_url: yup.string().nullable(),
});

export const paginatedBrandsResponseSchema =
  generatePaginationResponseSchema(brandResponseSchema);

export type PaginatedBrandsResponseSchema = yup.InferType<
  typeof paginatedBrandsResponseSchema
>;

export type BrandsListParams = PaginationParams & {
  category_id?: number;
};

export class Brands extends Resource {
  async list(params: BrandsListParams): Promise<PaginatedBrandsResponseSchema> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: '/brands',
        params,
      }),
      paginatedBrandsResponseSchema,
    );
  }
}
