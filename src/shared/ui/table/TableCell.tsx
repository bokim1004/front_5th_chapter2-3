import { HTMLAttributes } from "react"

interface TableCellProps extends HTMLAttributes<HTMLTableCellElement> {
  className?: string
}

export const TableCell = ({ className, ...props }: TableCellProps) => {
  return <td className={`p-2 align-middle [&:has([role=checkbox])]:pr-0 ${className}`} {...props} />
}
