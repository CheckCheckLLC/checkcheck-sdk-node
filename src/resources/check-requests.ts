import * as yup from 'yup';
import { generatePaginationResponseSchema, PaginationParams } from '../schemas';
import { cast, validate } from '../utils';
import { Resource } from './base';
import { brandResponseSchema } from './brands';
import { categoryResponseSchema } from './categories';
import { customerResponseSchema } from './customers';
import { styleResponseSchema } from './styles';

export enum CheckRequestStatus {
  CHECKER_CHECK_PENDING = 'checker_check_pending',
  ADDITIONAL_PHOTO_PENDING = 'additional_photo_pending',
  CHECKER_CHECK_COMPLETED = 'checker_check_completed',
}

export enum CheckRequestResult {
  REAL = 'real',
  FAKE = 'fake',
  INDETERMINABLE = 'indeterminable',
}

export const checkRequestResponseSchema = yup.object({
  id: yup.number().required(),
  uuid: yup.string().required(),
  category_id: yup.number().required(),
  brand_id: yup.number().required(),
  style_id: yup.number().required(),
  customer_id: yup.number().required(),
  product_title: yup.string().nullable(),
  service_level_credit: yup.number().nullable(),
  service_level_minute: yup.number().nullable(),
  request_credit: yup.number().nullable(),
  user_remark: yup.string().nullable(),
  checker_check_summary: yup.string().nullable(),
  status: yup.string().oneOf(Object.values(CheckRequestStatus)).nullable(),
  result: yup.string().oneOf(Object.values(CheckRequestResult)).nullable(),
  cover_image_url: yup.string().nullable(),
  additional_photo_added: yup.boolean().nullable(),
  api_version: yup.string().nullable(),
  certificate_url: yup.string().nullable(),
  check_request_images: yup
    .array()
    .of(
      yup.object({
        image_url: yup.string().required(),
        format: yup.string().nullable(),
        width: yup.number().nullable(),
        height: yup.number().nullable(),
        type: yup.string().nullable(),
      }),
    )
    .nullable(),
  category: categoryResponseSchema.nullable(),
  brand: brandResponseSchema.nullable(),
  style: styleResponseSchema.nullable(),
  customer: customerResponseSchema.nullable(),
});

export type CheckRequestResponse = yup.InferType<
  typeof checkRequestResponseSchema
>;

// Paginated response schema
export const paginatedCheckRequestsResponseSchema =
  generatePaginationResponseSchema(checkRequestResponseSchema);

export type PaginatedCheckRequestsResponse = yup.InferType<
  typeof paginatedCheckRequestsResponseSchema
>;

// Create check request schema
export const createCheckRequestBodySchema = yup.object({
  customer_id: yup.number().required(),
  style_id: yup.number().required(),
  user_remark: yup.string(),
  service_level_id: yup.number().required(),
  images: yup
    .array()
    .of(
      yup.object({
        image_url: yup.string().required(),
        label: yup.string().required(),
      }),
    )
    .required(),
});

export type CreateCheckRequestBody = yup.InferType<
  typeof createCheckRequestBodySchema
>;

// Additional photos schema
export const additionalPhotosBodySchema = yup.object({
  images: yup
    .array()
    .of(
      yup.object({
        image_url: yup.string().required(),
        label: yup.string().required(),
      }),
    )
    .required(),
});

export type AdditionalPhotosBody = yup.InferType<
  typeof additionalPhotosBodySchema
>;

export type CheckRequestsListParams = PaginationParams & {
  category_id?: number;
  brand_id?: number;
  style_id?: number;
  status?: CheckRequestStatus;
  result?: CheckRequestResult;
};

export class CheckRequests extends Resource {
  async list(
    params: CheckRequestsListParams,
  ): Promise<PaginatedCheckRequestsResponse> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: '/check-requests',
        params,
      }),
      paginatedCheckRequestsResponseSchema,
    );
  }

  async get(id: number): Promise<CheckRequestResponse> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: `/check-requests/${id}`,
      }),
      checkRequestResponseSchema,
    );
  }

  async create(data: CreateCheckRequestBody): Promise<CheckRequestResponse> {
    await validate(data, createCheckRequestBodySchema);
    return cast(
      await this.client.request({
        method: 'POST',
        url: '/check-requests',
        data,
      }),
      checkRequestResponseSchema,
    );
  }

  async addAdditionalPhotos(
    id: number,
    data: AdditionalPhotosBody,
  ): Promise<CheckRequestResponse> {
    await validate(data, additionalPhotosBodySchema);
    return cast(
      await this.client.request({
        method: 'POST',
        url: `/check-requests/${id}/additional-photos`,
        data,
      }),
      checkRequestResponseSchema,
    );
  }
}
