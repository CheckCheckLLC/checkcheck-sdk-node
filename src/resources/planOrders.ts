import * as yup from 'yup';
import { cast, validate } from '../utils';
import { Resource } from './base';

// Plan order response schema
export const planOrderResponseSchema = yup.object({
  transaction: yup.object({
    id: yup.number().required(),
    uuid: yup.string().required(),
    plan_id: yup.number().required(),
    currency: yup.string().required(),
    status: yup.string().required(),
    created_at: yup.date().required(),
    updated_at: yup.date().required(),
  }),
  client_secret: yup.string().required(),
});

export type PlanOrderResponse = yup.InferType<typeof planOrderResponseSchema>;

// Create plan order schema
export const createPlanOrderBodySchema = yup.object({
  plan_id: yup.number().required(),
  customer_id: yup.number().required(),
});

export type CreatePlanOrderBody = yup.InferType<
  typeof createPlanOrderBodySchema
>;

export class PlanOrders extends Resource {
  async create(data: CreatePlanOrderBody): Promise<PlanOrderResponse> {
    await validate(data, createPlanOrderBodySchema);
    return cast(
      await this.client.request({
        method: 'POST',
        url: '/plan-orders',
        data,
      }),
      planOrderResponseSchema,
    );
  }
}
