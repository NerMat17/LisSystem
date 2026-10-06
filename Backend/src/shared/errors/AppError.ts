export class AppError extends Error {
    constructor(public readonly statusCode: number, message: string) {
        super(message);
        this.name = 'AppError';
    }
}

export class NotFoundError extends AppError {
    constructor(message = 'Resource not found') {
        super(404, message);
    }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message);
  }
}