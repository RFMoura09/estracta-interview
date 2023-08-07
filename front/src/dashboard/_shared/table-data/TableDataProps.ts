export interface TableDataProps {
  headers: string[]
  onHeaderClick: (index: number) => void;
  onSearch: (search: string) => void;
  totalPages: number;
  onPageChange: (page: number) => void;
  data: object[];
}