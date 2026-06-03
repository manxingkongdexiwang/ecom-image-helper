import type { ReactNode, ButtonHTMLAttributes } from 'react'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: 'primary' | 'secondary' | 'danger'
  size?: 'sm' | 'md' | 'lg'
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'inline-flex items-center justify-center gap-2 font-medium rounded-card transition-all duration-200'
  
  const variants = {
    primary: 'bg-gradient-to-r from-btn-gradient-start to-btn-gradient-end text-white hover:shadow-lg hover:shadow-btn-gradient-end/30',
    secondary: 'bg-btn-secondary text-text-primary hover:bg-[#2a324a]',
    danger: 'bg-danger-color text-white hover:bg-[#a12e3c]',
  }
  
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-sm',
    lg: 'px-6 py-3 text-base',
  }

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}