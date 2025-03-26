export interface APIResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  count?: number;
  pagination?: {
    page: number;
    limit: number;
    totalPages: number;
    totalDocuments: number;
  };
}
