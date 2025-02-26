import * as yup from 'yup';
import { Resource } from '../resource';
import { baseResourceSchema, translatableFieldSchema } from '../schemas';
import { castArray } from '../utils';

export const categorySchema = baseResourceSchema.shape({
  name: translatableFieldSchema.required(),
  sort_order: yup.number().integer(),
  image_url: yup.string(),
  active: yup.boolean().required(),
});

export type Category = yup.InferType<typeof categorySchema>;

export class Categories extends Resource {
  async list(): Promise<Category[]> {
    return castArray(
      await this.client.request({
        method: 'GET',
        url: '/categories',
      }),
      categorySchema,
    );
  }
}
