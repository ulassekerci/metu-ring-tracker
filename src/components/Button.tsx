import { cn } from '@/utils/cn'
import { ComponentProps, forwardRef } from 'react'

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'primary' | 'secondary' | 'outline'
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(({ className, variant = 'primary', ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'px-4 py-2 rounded-lg transition-colors font-medium disabled:opacity-50',
        variant === 'primary' && 'bg-primary text-white hover:bg-primary-dark',
        variant === 'secondary' && 'bg-slate-200 text-slate-800 hover:bg-slate-300',
        variant === 'outline' && 'border border-slate-300 bg-transparent hover:bg-slate-100',
        className
      )}
      {...props}
    />
  )
})

export default Button
