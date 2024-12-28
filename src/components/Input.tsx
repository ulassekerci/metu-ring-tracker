import { cn } from '@/utils/cn'
import { ComponentProps, forwardRef } from 'react'

export const Input = forwardRef<HTMLInputElement, ComponentProps<'input'>>(({ className, type, ...props }, ref) => {
  return (
    <input type={type} className={cn(`border border-slate-300 h-10 rounded-lg p-2`, className)} ref={ref} {...props} />
  )
})
