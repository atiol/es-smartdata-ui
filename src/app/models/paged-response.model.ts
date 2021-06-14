export interface IPagedResponse<T> {
  totalSize: number;
  pageIndex: number;
  pageSize: number;
  items: T[];
}
