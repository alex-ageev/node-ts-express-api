class ApiError extends Error {
  status: number;
  errors: any[];

  constructor(status: number, message: string, errors: any[] = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static BadRequest(message: string, errors: any[] = []): ApiError {
    return new ApiError(400, message, errors);
  }
  static UnauthorizedError(message: string, errors: any[] = []): ApiError {
    return new ApiError(401, message, errors);
  }
}

export default ApiError;
