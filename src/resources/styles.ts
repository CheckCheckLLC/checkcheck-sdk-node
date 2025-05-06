import * as yup from 'yup';
import {
  generatePaginationResponseSchema,
  PaginationParams,
  translatableFieldSchema,
} from '../schemas';
import { cast } from '../utils';
import { Resource } from './base';

export const styleResponseSchema = yup.object({
  id: yup.number().integer().required(),
  name: translatableFieldSchema.nullable(),
  sort_order: yup.number().integer(),
  image_url: yup.string().nullable(),
  style_photos: yup
    .array()
    .of(
      yup.object({
        name: translatableFieldSchema.nullable(),
        image_url: yup.string().nullable(),
        line_art_url: yup.string().nullable(),
        instructions: yup.string().nullable(),
        required: yup.boolean(),
        sort_order: yup.number().integer(),
      }),
    )
    .nullable(),
});

export const paginatedStylesResponseSchema =
  generatePaginationResponseSchema(styleResponseSchema);

export type PaginatedStylesResponseSchema = yup.InferType<
  typeof paginatedStylesResponseSchema
>;

export type StylesListParams = PaginationParams & {
  brand_id?: number;
};

export class Styles extends Resource {
  async list(params: StylesListParams): Promise<PaginatedStylesResponseSchema> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: '/styles',
        params,
      }),
      paginatedStylesResponseSchema,
    );
  }
}
