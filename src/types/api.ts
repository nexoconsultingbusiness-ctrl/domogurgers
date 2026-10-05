export type ApiSuccess<T> = {
  success: true;
  data: T;
  message: string | null;
};

export type ApiFailure = {
  success: false;
  data: null;
  message: string;
  error: { code: string };
};

export type ApiResponse<T> = ApiSuccess<T> | ApiFailure;
