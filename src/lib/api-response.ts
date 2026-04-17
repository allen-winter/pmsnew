export type ApiResponse<T = any> = {
  success: boolean;
  data?: T;
  error?: string;
};

export function successResponse<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}

export function errorResponse(message: string, status = 400): ApiResponse {
  return { success: false, error: message };
}