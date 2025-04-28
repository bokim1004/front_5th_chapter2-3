import { HTMLAttributes } from "react"

interface TableRowProps extends HTMLAttributes<HTMLTableRowElement> {
  className?: string
}

export const TableRow = ({ className, ...props }: TableRowProps) => {
  return (
    <tr
      className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted h-14 ${className}`}
      {...props}
    />
  )
}
