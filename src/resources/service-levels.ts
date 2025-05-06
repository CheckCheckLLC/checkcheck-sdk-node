import * as yup from 'yup';
import { generatePaginationResponseSchema, PaginationParams } from '../schemas';
import { cast } from '../utils';
import { Resource } from './base';

export type ServiceLevelsListParams = PaginationParams & {
  category_id: number;
};

export const serviceLevelResponseSchema = yup.object({
  id: yup.number().required(),
  title: yup.string().nullable(),
  minute: yup.number().nullable(),
  credit: yup.number().integer().required(),
  category_id: yup.number().nullable(),
});

export type ServiceLevelResponse = yup.InferType<
  typeof serviceLevelResponseSchema
>;

export const paginatedServiceLevelsResponseSchema =
  generatePaginationResponseSchema(serviceLevelResponseSchema);

export type PaginatedServiceLevelsResponse = yup.InferType<
  typeof paginatedServiceLevelsResponseSchema
>;

export class ServiceLevels extends Resource {
  async list(
    params: ServiceLevelsListParams,
  ): Promise<PaginatedServiceLevelsResponse> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: '/service-levels',
        params,
      }),
      paginatedServiceLevelsResponseSchema,
    );
  }
}
