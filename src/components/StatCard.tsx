import type { ReactNode } from 'react'

interface StatCardProps {
  icon: ReactNode
  value: string | number
  label: string
  remark: string
}

export function StatCard({ icon, value, label, remark }: StatCardProps) {
  return (
    <div className="bg-bg-card border border-border-color rounded-card p-5 hover:border-accent-blue/30 transition-colors">
      <div className="flex items-start justify-between mb-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue/20 to-btn-gradient-end/20 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-2xl font-bold text-text-primary mb-1">{value}</div>
      <div className="text-sm text-text-secondary mb-1">{label}</div>
      <div className="text-xs text-text-secondary">{remark}</div>
    </div>
  )
}