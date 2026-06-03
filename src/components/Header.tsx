import { LayoutDashboard, Package, Library, Settings } from 'lucide-react'
import { useAppStore } from '../store/appStore'

const navItems = [
  { id: 'home' as const, label: '首页', icon: LayoutDashboard },
  { id: 'tasks' as const, label: '商品任务', icon: Package },
  { id: 'templates' as const, label: '模板库', icon: Library },
  { id: 'settings' as const, label: '设置', icon: Settings },
]

export function Header() {
  const { currentPage, setCurrentPage } = useAppStore()

  return (
    <header className="fixed top-0 left-0 right-0 h-14 bg-bg-card border-b border-border-color z-50">
      <div className="flex items-center justify-between h-full px-6 max-w-[1920px] mx-auto">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-blue to-btn-gradient-end flex items-center justify-center">
            <span className="text-white font-bold text-sm">D</span>
          </div>
          <span className="text-lg font-semibold text-accent-blue">抖音电商素材工作台</span>
        </div>
        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = currentPage === item.id
            return (
              <button
                key={item.id}
                onClick={() => setCurrentPage(item.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-gradient-to-r from-btn-gradient-start to-btn-gradient-end text-white'
                    : 'text-text-secondary hover:text-text-primary hover:bg-btn-secondary'
                }`}
              >
                <Icon size={16} />
                <span className="text-sm font-medium">{item.label}</span>
                {isActive && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-accent-blue rounded-full" />
                )}
              </button>
            )
          })}
        </nav>
      </div>
    </header>
  )
}