import { FileText, Layers, Sparkles, Zap, Rocket, Upload, Library, Wand2, Lightbulb, ShoppingCart, Music, BookOpen, Tag } from 'lucide-react'
import { Button } from '../components/Button'
import { StatCard } from '../components/StatCard'
import { useAppStore } from '../store/appStore'

const tips = [
  {
    title: '批量操作',
    description: '使用批量导入功能，一次性处理多个商品，大幅提升工作效率！',
    color: 'from-accent-blue/20 to-accent-blue/10',
    icon: <Upload className="text-accent-blue" size={16} />,
  },
  {
    title: '模板复用',
    description: '将常用的生成结果收藏为模板，下次使用时直接套用，省时省力！',
    color: 'from-btn-gradient-end/20 to-btn-gradient-end/10',
    icon: <Library className="text-btn-gradient-end" size={16} />,
  },
  {
    title: '精准匹配',
    description: '上传参考链接，系统会自动分析爆款风格，生成更符合市场需求的文案！',
    color: 'from-pink-500/20 to-pink-500/10',
    icon: <Zap className="text-pink-400" size={16} />,
  },
]

const quickActions = [
  { label: '淘宝爆款风格', icon: ShoppingCart },
  { label: '抖音种草风格', icon: Music },
  { label: '小红书笔记风格', icon: BookOpen },
  { label: '拼多多实惠风格', icon: Tag },
]

export function HomePage() {
  const { setCurrentPage } = useAppStore()

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">工作台首页</h1>
        <p className="text-text-secondary">欢迎回来！今天需要生成多少素材呢？</p>
      </div>

      <div className="grid grid-cols-4 gap-4 mb-6">
        <StatCard
          icon={<FileText className="text-accent-blue" size={20} />}
          value="0"
          label="草稿总数"
          remark="↑今天新增0"
        />
        <StatCard
          icon={<Layers className="text-purple-400" size={20} />}
          value="0"
          label="模板总数"
          remark="↑本周新增0"
        />
        <StatCard
          icon={<Sparkles className="text-yellow-400" size={20} />}
          value="0"
          label="今日生成"
          remark="和昨天持平"
        />
        <StatCard
          icon={<Zap className="text-green-400" size={20} />}
          value="0%"
          label="使用效率"
          remark="持续优化中"
        />
      </div>

      <div className="flex gap-3 mb-6">
        <Button onClick={() => setCurrentPage('tasks')} size="lg">
          <Rocket size={18} />
          新建商品任务
        </Button>
        <Button variant="secondary" size="lg">
          <Upload size={18} />
          批量导入
        </Button>
        <Button variant="secondary" size="lg">
          <Library size={18} />
          浏览模板
        </Button>
        <Button variant="secondary" size="lg">
          <Wand2 size={18} />
          创建模板
        </Button>
      </div>

      <div className="bg-bg-card border border-border-color rounded-card p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2">
            <FileText className="text-accent-blue" size={18} />
            <h2 className="text-lg font-semibold text-text-primary">最近草稿</h2>
          </div>
          <button className="text-sm text-accent-blue hover:text-accent-blue/80 transition-colors">
            查看全部
          </button>
        </div>
        <div className="flex flex-col items-center justify-center py-12">
          <div className="w-20 h-20 rounded-xl bg-bg-input flex items-center justify-center mb-4">
            <FileText className="text-text-secondary" size={40} />
          </div>
          <p className="text-text-primary text-center mb-1">暂无草稿</p>
          <p className="text-text-secondary text-sm text-center mb-4">开始创建您的第一个商品素材吧！</p>
          <Button onClick={() => setCurrentPage('tasks')}>立即创建</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-bg-card border border-border-color rounded-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Lightbulb className="text-yellow-400" size={18} />
            <h2 className="text-lg font-semibold text-text-primary">使用技巧</h2>
          </div>
          <div className="space-y-4">
            {tips.map((tip) => (
              <div key={tip.title} className={`rounded-lg p-4 bg-gradient-to-r ${tip.color}`}>
                <div className="flex items-center gap-2 mb-2">
                  {tip.icon}
                  <span className="text-sm font-medium text-text-primary">{tip.title}</span>
                </div>
                <p className="text-sm text-text-secondary ml-6">{tip.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-bg-card border border-border-color rounded-card p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="text-purple-400" size={18} />
            <h2 className="text-lg font-semibold text-text-primary">快捷操作</h2>
          </div>
          <div className="space-y-3">
            {quickActions.map((action) => {
              const Icon = action.icon
              return (
                <button
                  key={action.label}
                  onClick={() => setCurrentPage('tasks')}
                  className="w-full flex items-center gap-3 px-4 py-3 bg-bg-input rounded-lg hover:bg-btn-secondary transition-colors group"
                >
                  <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-accent-blue/20 to-btn-gradient-end/20 flex items-center justify-center group-hover:from-accent-blue/30 group-hover:to-btn-gradient-end/30 transition-colors">
                    <Icon className="text-accent-blue" size={18} />
                  </div>
                  <span className="text-text-primary">{action.label}</span>
                </button>
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}