import { useState, useRef, useEffect, type ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps {
  label?: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
  className?: string
  helperText?: string
}

export function Select({ label, value, options, onChange, className = '', helperText }: SelectProps) {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const selectedOption = options.find((opt) => opt.value === value)

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm text-text-secondary">{label}</label>
      )}
      <div ref={dropdownRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full px-3 py-2 bg-bg-input border border-border-color rounded-card text-text-primary text-left flex items-center justify-between focus:outline-none focus:border-accent-blue transition-colors ${className}`}
        >
          <span>{selectedOption?.label || value}</span>
          <ChevronDown size={16} className={`text-text-secondary transition-transform ${isOpen ? 'rotate-180' : ''}`} />
        </button>
        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-bg-card border border-border-color rounded-card shadow-lg z-50 animate-slideIn">
            {options.map((option) => (
              <button
                key={option.value}
                onClick={() => {
                  onChange(option.value)
                  setIsOpen(false)
                }}
                className={`w-full px-3 py-2 text-left hover:bg-btn-secondary transition-colors ${
                  option.value === value ? 'bg-btn-secondary text-accent-blue' : 'text-text-primary'
                }`}
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
      {helperText && (
        <span className="block text-xs text-text-secondary">{helperText}</span>
      )}
    </div>
  )
}

interface NativeSelectProps {
  label?: string
  value: string
  options: SelectOption[]
  onChange: (value: string) => void
  className?: string
  helperText?: string
}

export function NativeSelect({ label, value, options, onChange, className = '', helperText }: NativeSelectProps) {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm text-text-secondary">{label}</label>
      )}
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`w-full px-3 py-2 bg-bg-input border border-border-color rounded-card text-text-primary focus:outline-none focus:border-accent-blue transition-colors appearance-none cursor-pointer ${className}`}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {helperText && (
        <span className="block text-xs text-text-secondary">{helperText}</span>
      )}
    </div>
  )
}