export class CheckCheckError extends Error {
  readonly type: string;
  constructor(message: string, type: string = 'CheckCheckError') {
    super(message);
    this.type = type;
  }
}

export class CheckCheckClientError extends CheckCheckError {
  constructor(message: string) {
    super(message, 'CheckCheckAPIError');
  }
}
