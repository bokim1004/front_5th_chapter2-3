import { HTMLAttributes } from "react"

interface TableHeaderProps extends HTMLAttributes<HTMLTableSectionElement> {
  className?: string
}

export const TableHeader = ({ className, ...props }: TableHeaderProps) => {
  return <thead className={`[&_tr]:border-b ${className}`} {...props} />
}
