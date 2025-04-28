import { HTMLAttributes } from "react"

interface CardTitleProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}
export const CardTitle = ({ className, ...props }: CardTitleProps) => {
  return <h3 className={`text-2xl font-semibold leading-none tracking-tight  ${className}`} {...props} />
}
