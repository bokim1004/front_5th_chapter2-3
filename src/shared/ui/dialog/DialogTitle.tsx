import * as DialogPrimitive from "@radix-ui/react-dialog"
import { ComponentPropsWithoutRef } from "react"

interface DialogTitleProps extends ComponentPropsWithoutRef<typeof DialogPrimitive.Title> {
  className?: string
}

export const DialogTitle = ({ className, ...props }: DialogTitleProps) => {
  return (
    <DialogPrimitive.Title className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props} />
  )
}
