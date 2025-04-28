import { HTMLAttributes } from "react"

interface TableBodyProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export const TableBody = ({ className = "", ...props }: TableBodyProps) => {
  return <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
}
