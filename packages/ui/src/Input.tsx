import { type InputHTMLAttributes, forwardRef } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  error?: string
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, id, className = '', ...rest }, ref) => (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label htmlFor={id} className="text-sm font-semibold text-[--fg]">
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        className={`h-11 rounded-[10px] border-[1.5px] ${error ? 'border-[--red]' : 'border-[--border]'} bg-[--bg] px-3.5 text-sm text-[--fg] placeholder:text-[--faint] outline-none transition-colors focus:border-[--purple] ${className}`}
        aria-invalid={error ? 'true' : undefined}
        aria-describedby={error ? `${id}-error` : undefined}
        {...rest}
      />
      {error && (
        <p id={`${id}-error`} className="text-xs text-[--red]" role="alert">
          {error}
        </p>
      )}
    </div>
  ),
)

Input.displayName = 'Input'
