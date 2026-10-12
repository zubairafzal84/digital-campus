import { type ButtonHTMLAttributes, forwardRef } from 'react'

type Variant = 'primary' | 'outline' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  size?: Size
  loading?: boolean
}

const BASE =
  'inline-flex items-center justify-center font-semibold rounded-[10px] transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none'

const VARIANTS: Record<Variant, string> = {
  primary: 'bg-[--purple] text-white hover:bg-[--purple-hov] focus-visible:outline-[--purple]',
  outline: 'border-[1.5px] border-[--border] text-[--fg] hover:border-[--purple] hover:text-[--purple]',
  ghost: 'text-[--fg] hover:bg-[--bg]',
}

const SIZES: Record<Size, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-10 px-4 text-sm',
  lg: 'h-12 px-6 text-base',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', loading, children, className = '', ...rest }, ref) => (
    <button
      ref={ref}
      className={`${BASE} ${VARIANTS[variant]} ${SIZES[size]} ${className}`}
      aria-busy={loading}
      {...rest}
    >
      {loading ? <span aria-hidden="true">…</span> : children}
    </button>
  ),
)

Button.displayName = 'Button'
