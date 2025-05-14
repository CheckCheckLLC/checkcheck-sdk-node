import * as fs from 'fs';
import * as os from 'os';
import * as path from 'path';
import { Readable } from 'stream';

/**
 * Options for generating mock images
 */
export type MockImageOptions = {
  /** The type of mock image to generate */
  type: 'buffer' | 'readstream';
  /** The filename to use (required for ReadStream) */
  filename?: string;
  /** The image format to generate (default: 'png') */
  format?: 'png' | 'jpg';
  /** Whether to create a temporary file for ReadStream (default: true) */
  createTempFile?: boolean;
};

/**
 * Generates a mock image as either a Buffer or ReadStream for testing
 * @param options Configuration options
 * @returns Buffer or ReadStream based on options
 */
export const generateMockImage = (
  options: MockImageOptions,
): Buffer | fs.ReadStream => {
  // Default options
  const format = options.format || 'png';
  const filename = options.filename || `mock-image.${format}`;
  const createTempFile = options.createTempFile !== false;

  // Generate minimal test image in the specified format
  let imageBase64: string;

  if (format === 'png') {
    // 1x1 transparent PNG
    imageBase64 =
      'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  } else {
    // 1x1 white JPG (minimal JPG)
    imageBase64 =
      '/9j/4AAQSkZJRgABAQEAYABgAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2NjIpLCBxdWFsaXR5ID0gOTAK/9sAQwADAgIDAgIDAwMDBAMDBAUIBQUEBAUKBwcGCAwKDAwLCgsLDQ4SEA0OEQ4LCxAWEBETFBUVFQwPFxgWFBgSFBUU/9sAQwEDBAQFBAUJBQUJFA0LDRQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQU/8AAEQgAAQABAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A/Kj/AIJtf8G9P/BQn9h7/gpN+yt+0v8AEj/hWP8AwiX7OXxs8H/ET+wv+Eh1L+0NR/szVLe7+y23+jwp5k3leWm6RFzjcyjmv9Reiiiv5/P+C7X/AAVZ+LX/AAUC/ai17w/o2tapon7PPhTUpNN8M6VaXDww6tLEcLqF0FIEjSMC0SsD5cRGRmQvX9uXwd+Mfhr47/C/QPGvhHVrbXPCviixj1HSdRt8+VdQuMq2CAQRyCrAFWUggggGuH/Zb/YB+BH7DGl6pa/BP4ReE/hpb6xMtxqEmi2QSW/lRdqtcTMS88gXhTI7MFyFJAr4I/4KV/8ABv8A+y9/wUY8Z3XjzVrfWPhp8TrxVF74p8Mqkcep7FAU31q4MM7hQFEgZJSoClmAFfhL/wAFZf8Ag3e/aJ/4JVaFc/FSG6HxL+B8MwWLxLYWrRS6QzttSHUbYkhMnhZUZ4WJA3Rsc1/ORX9wP/BAr/gsp4Z/4Kq/s8jRPETWujftGeCrZE8WeH0YRjUoRhReWQPJgckBkJJicE8qzJX9Q9FFFf/Z';
  }

  // Convert the Base64 to a Buffer
  const imageBuffer = Buffer.from(imageBase64, 'base64');

  // Return according to the requested type
  if (options.type === 'buffer') {
    return imageBuffer;
  } else {
    // For ReadStream, we need to either create a temp file or use a memory stream
    if (createTempFile) {
      // Create a temp file and return a ReadStream from it
      const tempDir = os.tmpdir();
      const tempFilePath = path.join(tempDir, filename);

      // Write the buffer to the temp file
      fs.writeFileSync(tempFilePath, imageBuffer);

      // Return a ReadStream that points to the temp file
      return fs.createReadStream(tempFilePath);
    } else {
      // Create an in-memory stream without writing to disk
      const stream = new Readable();
      stream.push(imageBuffer);
      stream.push(null); // Signal end of stream

      // Attach a path property to mimic a file ReadStream
      // This allows size validation to work
      Object.defineProperty(stream, 'path', {
        value: filename,
        writable: false,
      });

      return stream as unknown as fs.ReadStream;
    }
  }
};
