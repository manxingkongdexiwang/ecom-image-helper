import type { InputHTMLAttributes } from 'react'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string
  helperText?: string
}

export function Input({ label, helperText, className = '', ...props }: InputProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm text-text-secondary">{label}</label>
      )}
      <input
        className={`w-full px-3 py-2 bg-bg-input border border-border-color rounded-card text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors ${className}`}
        {...props}
      />
      {helperText && (
        <span className="block text-xs text-text-secondary">{helperText}</span>
      )}
    </div>
  )
}

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  helperText?: string
}

export function Textarea({ label, helperText, className = '', ...props }: TextareaProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm text-text-secondary">{label}</label>
      )}
      <textarea
        className={`w-full px-3 py-2 bg-bg-input border border-border-color rounded-card text-text-primary placeholder-text-secondary focus:outline-none focus:border-accent-blue transition-colors resize-none ${className}`}
        {...props}
      />
      {helperText && (
        <span className="block text-xs text-text-secondary">{helperText}</span>
      )}
    </div>
  )
}