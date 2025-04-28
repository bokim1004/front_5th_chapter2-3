import { HTMLAttributes } from "react"

interface CardHeaderProps extends HTMLAttributes<HTMLDivElement> {
  className?: string
}

export const CardHeader = ({ className, ...props }: CardHeaderProps) => {
  return <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props} />
}
