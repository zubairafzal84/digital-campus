import { type HTMLAttributes } from 'react'

type Color = 'purple' | 'green' | 'amber' | 'red' | 'blue' | 'navy'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  color?: Color
}

const COLORS: Record<Color, string> = {
  purple: 'bg-[--lav] text-[--purple]',
  green: 'bg-green-100 text-green-800',
  amber: 'bg-amber-100 text-amber-800',
  red: 'bg-red-100 text-red-700',
  blue: 'bg-blue-100 text-blue-800',
  navy: 'bg-[--navy] text-white',
}

export function Badge({ color = 'purple', children, className = '', ...rest }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${COLORS[color]} ${className}`}
      {...rest}
    >
      {children}
    </span>
  )
}
