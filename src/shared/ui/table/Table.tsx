import { HTMLAttributes } from "react"

interface TableProps extends HTMLAttributes<HTMLTableElement> {
  className?: string
}

export const Table = ({ className, ...props }: TableProps) => {
  return (
    <div className="w-full overflow-auto">
      <table className={`table-fixed w-full caption-bottom text-sm ${className}`} {...props} />
    </div>
  )
}
