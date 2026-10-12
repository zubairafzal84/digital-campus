import { type HTMLAttributes } from 'react'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  hover?: boolean
}

export function Card({ hover, children, className = '', ...rest }: CardProps) {
  return (
    <div
      className={`rounded-[14px] border-[1.5px] border-[--border] bg-white p-6 ${hover ? 'transition-all hover:border-[--purple] hover:shadow-md hover:-translate-y-0.5' : ''} ${className}`}
      {...rest}
    >
      {children}
    </div>
  )
}
