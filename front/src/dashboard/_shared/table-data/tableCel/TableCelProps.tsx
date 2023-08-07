export interface TableCelProps {
  cels?: number
  header?: boolean
  isEven?: boolean
  label: string
  onHeaderClick?: React.MouseEventHandler
  headerClicked?: boolean
}