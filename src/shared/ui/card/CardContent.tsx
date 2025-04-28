import { HTMLAttributes } from "react"

interface CardContentProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}
export const CardContent = ({ className, ...props }: CardContentProps) => {
  return <div className={`p-6 pt-0 ${className}`} {...props} />
}
