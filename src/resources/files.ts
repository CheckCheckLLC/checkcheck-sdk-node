import FormData from 'form-data';
import * as fs from 'fs';
import * as path from 'path';
import * as yup from 'yup';
import { cast, validate } from '../utils';
import { Resource } from './base';

// Constants
const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png'];

// Type definition
export type ImageFile =
  | Buffer // Raw image data
  | fs.ReadStream; // File stream

// Parameter interface
export type ImageUploadParams = {
  file: ImageFile;
  filename: string;
  customer_id: number;
};

// Response schema
export const imageUploadResponseSchema = yup.object({
  url: yup.string().required(),
  format: yup.string().nullable(),
  height: yup.number().nullable(),
  width: yup.number().nullable(),
});

export type ImageUploadResponse = yup.InferType<
  typeof imageUploadResponseSchema
>;

// Parameter validation schema
export const imageUploadParamsSchema = yup.object({
  file: yup
    .mixed()
    .required()
    .test(
      'is-valid-image-type',
      'File must be a Buffer or ReadStream',
      (value) => Buffer.isBuffer(value) || value instanceof fs.ReadStream,
    ),
  customer_id: yup.number().required().positive().integer(),
  filename: yup
    .string()
    .required('Filename is required for all uploads')
    .test(
      'is-valid-image-filename',
      `Filename must end with ${ALLOWED_EXTENSIONS.join(', ')}`,
      (value) =>
        value
          ? ALLOWED_EXTENSIONS.includes(path.extname(value).toLowerCase())
          : false,
    ),
});

export class Files extends Resource {
  /**
   * Upload an image file to the API
   * @param params Upload parameters containing file, filename, and customer ID
   * @returns Promise with the upload response
   */
  async uploadImage(params: ImageUploadParams): Promise<ImageUploadResponse> {
    // Validate parameters
    await validate(params, imageUploadParamsSchema);

    // Create FormData instance
    const formData = new FormData();

    // Validate the filename
    this.validateImageFilename(params.filename);

    // Type guard functions for better type narrowing
    const isBuffer = (file: ImageFile): file is Buffer => Buffer.isBuffer(file);

    // Process the file based on its type
    if (isBuffer(params.file)) {
      // It's a Buffer
      this.validateFileSize(params.file.length);
      formData.append('file', params.file, params.filename);
    } else {
      // It's a ReadStream (TypeScript knows this now)
      const streamPath = params.file.path?.toString();

      // If the stream has a path, validate its size
      if (streamPath) {
        const stats = fs.statSync(streamPath);
        this.validateFileSize(stats.size);
      }

      formData.append('file', params.file, params.filename);
    }

    // Add customer_id
    formData.append('customer_id', params.customer_id.toString());

    // Make the request
    const response = await this.client.request({
      method: 'POST',
      url: '/upload',
      data: formData,
      headers: {
        ...formData.getHeaders(),
      },
    });

    return cast(response, imageUploadResponseSchema);
  }

  /**
   * Validate file size
   */
  private validateFileSize(size: number): void {
    if (size === 0) {
      throw new Error('File is empty');
    }

    if (size > MAX_FILE_SIZE) {
      throw new Error(
        `File too large: ${(size / 1024 / 1024).toFixed(2)}MB. Maximum size is ${MAX_FILE_SIZE / 1024 / 1024}MB.`,
      );
    }
  }

  /**
   * Validate image filename extension
   */
  private validateImageFilename(filename: string): void {
    const ext = path.extname(filename).toLowerCase();

    if (!ALLOWED_EXTENSIONS.includes(ext)) {
      throw new Error(
        `Invalid file type: ${ext}. Only JPG, JPEG, and PNG files are allowed.`,
      );
    }
  }

  /**
   * Get MIME type from filename
   */
  private getMimeType(filename: string): string {
    const ext = path.extname(filename).toLowerCase();

    if (ext === '.jpg' || ext === '.jpeg') {
      return 'image/jpeg';
    } else if (ext === '.png') {
      return 'image/png';
    }

    return 'application/octet-stream';
  }
}
