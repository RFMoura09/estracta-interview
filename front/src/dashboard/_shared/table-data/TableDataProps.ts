export interface TableDataProps {
  headers: string[]
  onHeaderClick: (index: number) => void;
  totalPages: number;
  onPageChange: (page: number) => void;
  data: object[];
}