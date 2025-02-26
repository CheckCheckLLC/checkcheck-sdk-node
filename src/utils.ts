import * as yup from 'yup';
import { ClientValidationError } from './errors';

export function cast<T>(data: any, schema: yup.Schema<T>): T {
  return schema.cast(data, {
    stripUnknown: true,
    assert: false,
  });
}

export function castArray<T>(data: any[], schema: yup.Schema<T>): T[] {
  return yup.array().of(schema).cast(data, {
    stripUnknown: true,
    assert: false,
  }) as T[];
}

export async function validate<T>(
  data: any,
  schema: yup.Schema<T>,
  options?: yup.ValidateOptions,
): Promise<T> {
  try {
    return await schema.validate(data, options);
  } catch (error) {
    if (error instanceof yup.ValidationError) {
      throw new ClientValidationError(error.message || 'Validation failed', {
        originalError: error,
      });
    }

    // Re-throw non-validation errors
    throw error;
  }
}
export async function validateArray<T>(
  data: any[],
  schema: yup.Schema<T>,
): Promise<T[]> {
  return (await yup
    .array()
    .of(schema)
    .validate(data, { abortEarly: false })) as T[];
}
