export interface IPagedRequest {
  query: string;
  market?: string;
  pageIndex?: number;
  pageSize?: number;
}
