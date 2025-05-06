import * as yup from 'yup';
import { generatePaginationResponseSchema, PaginationParams } from '../schemas';
import { cast, validate } from '../utils';
import { Resource } from './base';

// Webhook response schema
export const webhookResponseSchema = yup.object({
  id: yup.number().required(),
  endpoint_url: yup.string().url().required(),
  enabled: yup.boolean().required(),
  created_at: yup.string(),
  updated_at: yup.string(),
});

export type WebhookResponse = yup.InferType<typeof webhookResponseSchema>;

// Paginated response schema
export const paginatedWebhooksResponseSchema = generatePaginationResponseSchema(
  webhookResponseSchema,
);

export type PaginatedWebhooksResponse = yup.InferType<
  typeof paginatedWebhooksResponseSchema
>;

// Create webhook schema
export const createWebhookBodySchema = yup.object({
  endpoint_url: yup.string().url().required(),
  enabled: yup.boolean(),
});

export type CreateWebhookBody = yup.InferType<typeof createWebhookBodySchema>;

// Update webhook schema
export const updateWebhookBodySchema = yup.object({
  endpoint_url: yup.string().url(),
  enabled: yup.boolean(),
});

export type UpdateWebhookBody = yup.InferType<typeof updateWebhookBodySchema>;

export class Webhooks extends Resource {
  async list(params: PaginationParams): Promise<PaginatedWebhooksResponse> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: '/webhooks',
        params,
      }),
      paginatedWebhooksResponseSchema,
    );
  }

  async get(id: number): Promise<WebhookResponse> {
    return cast(
      await this.client.request({
        method: 'GET',
        url: `/webhooks/${id}`,
      }),
      webhookResponseSchema,
    );
  }

  async create(data: CreateWebhookBody): Promise<WebhookResponse> {
    await validate(data, createWebhookBodySchema);
    return cast(
      await this.client.request({
        method: 'POST',
        url: '/webhooks',
        data,
      }),
      webhookResponseSchema,
    );
  }

  async update(id: number, data: UpdateWebhookBody): Promise<WebhookResponse> {
    await validate(data, updateWebhookBodySchema);
    return cast(
      await this.client.request({
        method: 'PATCH',
        url: `/webhooks/${id}`,
        data,
      }),
      webhookResponseSchema,
    );
  }

  async delete(id: number): Promise<boolean> {
    await this.client.request({
      method: 'DELETE',
      url: `/webhooks/${id}`,
    });
    return true;
  }
}
