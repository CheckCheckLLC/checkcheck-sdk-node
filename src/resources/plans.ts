import * as yup from 'yup';
import { generatePaginationResponseSchema, PaginationParams } from '../schemas';
import { cast } from '../utils';
import { Resource } from './base';

// Plan response schema
export const planResponseSchema = yup.object({
  id: yup.number().required(),
  title: yup.string().nullable(),
  currency: yup.string().required(),
  price: yup.number().required(),
  credit: yup.number().required(),
});

export type PlanResponse = yup.InferType<typeof planResponseSchema>;

// Paginated response schema
export const paginatedPlansResponseSchema =
  generatePaginationResponseSchema(planResponseSchema);

export type PaginatedPlansResponse = yup.InferType<
  typeof paginatedPlansResponseSchema
>;

export class Plans extends Resource {
  async list(params?: PaginationParams): Promise<PaginatedPlansResponse> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: '/plans',
        params,
      }),
      paginatedPlansResponseSchema,
    );
  }
}
