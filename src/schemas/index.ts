import * as yup from 'yup';
export const translatableFieldSchema = yup.object({
  en: yup.string().required(),
  zh_Hans: yup.string(),
  zh_Hant: yup.string(),
});

export const baseResourceSchema = yup.object({
  id: yup.number().integer().positive(),
  created_at: yup.string(),
  updated_at: yup.string(),
});

export const paginationParamsSchema = yup.object({
  page: yup.number().integer().positive().default(1),
  limit: yup.number().integer().positive().default(10).max(100),
});

export type PaginationParams = yup.InferType<typeof paginationParamsSchema>;
export function generatePaginationResponseSchema<T>(itemSchema: yup.Schema<T>) {
  return yup.object({
    data: yup.array().of(itemSchema).required(),
    meta: yup
      .object({
        page: yup.number().required(),
        limit: yup.number().required(),
        total: yup.number().required(),
      })
      .required(),
  });
}
