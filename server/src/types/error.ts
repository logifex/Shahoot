export type ValidationErrorResponse = { path: string; message: string };

export type ErrorResponse = {
  error: {
    code?: string;
    message?: string;
    errors?: ValidationErrorResponse[];
  };
};
