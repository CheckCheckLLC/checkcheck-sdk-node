import * as yup from 'yup';
import { cast, validate } from '../utils';
import { Resource } from './base';

// File upload response schema
export const fileUploadResponseSchema = yup.object({
  url: yup.string().required(),
  format: yup.string().nullable(),
  height: yup.number().nullable(),
  width: yup.number().nullable(),
});

export type FileUploadResponse = yup.InferType<typeof fileUploadResponseSchema>;

// Upload request schema
export const fileUploadBodySchema = yup.object({
  file: yup.mixed().required(),
  customer_id: yup.number().required(),
});

export type FileUploadBody = yup.InferType<typeof fileUploadBodySchema> & {
  file: File | Blob;
};

export class Files extends Resource {
  async upload(data: FileUploadBody): Promise<FileUploadResponse> {
    await validate(data, fileUploadBodySchema);

    // Create FormData for multipart upload
    const formData = new FormData();
    formData.append('file', data.file);
    formData.append('customer_id', data.customer_id.toString());

    return cast(
      await this.client.request({
        method: 'POST',
        url: '/upload',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }),
      fileUploadResponseSchema,
    );
  }
}
