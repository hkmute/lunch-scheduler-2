export type AppSuccessResponse<T> = {
  success: true;
  data?: T;
};

export type AppErrorResponse<T = string> = {
  success: false;
  error?: T;
};

export type AppResponse<T> = AppSuccessResponse<T> | AppErrorResponse<T>;
