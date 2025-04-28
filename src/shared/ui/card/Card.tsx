import { HTMLAttributes } from "react";


interface CardProps extends HTMLAttributes<HTMLDivElement> {
  className?: string;
}

export const Card = ({ className, ...props }:CardProps) => {
  return     (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
  </div>)
};
