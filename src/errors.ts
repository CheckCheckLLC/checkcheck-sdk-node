export class CheckCheckError extends Error {
  readonly name: string = 'CheckCheckError';
  readonly originalError?: Error;

  constructor(
    message: string,
    options?: { originalError?: Error; statusCode?: number },
  ) {
    super(message);
    this.originalError = options?.originalError;
  }
}

export class ClientValidationError extends CheckCheckError {
  readonly name: string = 'ClientValidationError';

  constructor(
    message: string = 'Client validation failed',
    options?: { originalError?: Error },
  ) {
    super(message, options);
  }
}

export class ApiError extends CheckCheckError {
  readonly name: string = 'ApiError';
  readonly data?: any;
  readonly statusCode?: number;

  constructor(
    message: string,
    options?: {
      originalError?: Error;
      statusCode?: number;
      data?: any;
    },
  ) {
    super(message, options);
    this.statusCode = options?.statusCode;
    this.data = options?.data;
  }
}

export class BadRequestError extends ApiError {
  readonly name: string = 'BadRequestError';

  constructor(
    message: string = 'Bad request',
    options?: { originalError?: Error; data?: any },
  ) {
    super(message, { ...options, statusCode: 400 });
  }
}

export class AuthenticationError extends ApiError {
  readonly name: string = 'AuthenticationError';

  constructor(
    message: string = 'Authentication failed',
    options?: { originalError?: Error; data?: any },
  ) {
    super(message, { ...options, statusCode: 401 });
  }
}

export class NotFoundError extends ApiError {
  readonly name: string = 'NotFoundError';

  constructor(
    message: string = 'Resource not found',
    options?: { originalError?: Error; data?: any },
  ) {
    super(message, { ...options, statusCode: 404 });
  }
}

export class RateLimitError extends ApiError {
  readonly name: string = 'RateLimitError';

  constructor(
    message: string = 'Rate limit exceeded',
    options?: { originalError?: Error; data?: any },
  ) {
    super(message, { ...options, statusCode: 429 });
  }
}

export function isCheckCheckError(error: any): error is CheckCheckError {
  return error instanceof CheckCheckError;
}

export function handleRequestError(error: any): never {
  if (error.response) {
    const { status, data } = error.response;

    switch (status) {
      case 400:
        throw new BadRequestError(data.message || 'Invalid request', { data });
      case 401:
        throw new AuthenticationError(data.message, { data });
      case 404:
        throw new NotFoundError(data.message, { data });
      case 429:
        throw new RateLimitError(data.message, { data });
      default:
        throw new ApiError(data.message || 'API request failed', {
          statusCode: status,
          data,
        });
    }
  }

  if (error instanceof CheckCheckError) {
    throw error;
  }

  throw new CheckCheckError('Request failed', { originalError: error });
}
