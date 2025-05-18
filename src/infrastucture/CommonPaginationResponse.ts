export default interface CommonPaginationResponse<T> {
  message: string;
  data: T;
  totalItems: number;
}
