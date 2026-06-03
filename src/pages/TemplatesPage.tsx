import { useState } from 'react'
import { Search, Plus, FileText, X, Sparkles } from 'lucide-react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { NativeSelect } from '../components/Select'
import { Textarea } from '../components/Input'
import { useAppStore } from '../store/appStore'

const platforms = [
  { value: '淘宝/天猫', label: '淘宝/天猫' },
  { value: '京东', label: '京东' },
  { value: '拼多多', label: '拼多多' },
  { value: '抖音', label: '抖音' },
  { value: '小红书', label: '小红书' },
]

const platformTags = ['全部平台', '淘宝', '抖音', '拼多多', '京东', '小红书']

export function TemplatesPage() {
  const { isModalOpen, setIsModalOpen } = useAppStore()
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTag, setSelectedTag] = useState('全部平台')
  const [templateName, setTemplateName] = useState('')
  const [templatePlatform, setTemplatePlatform] = useState('淘宝/天猫')
  const [tags, setTags] = useState('')
  const [description, setDescription] = useState('')
  const [titleTemplate, setTitleTemplate] = useState('商品名称 {name} {color} 爆款')
  const [copyTemplate, setCopyTemplate] = useState('【{feature1}】{material},穿着舒适\n【限时特惠】品质保障，售后无忧')

  const handleOpenModal = () => setIsModalOpen(true)
  const handleCloseModal = () => setIsModalOpen(false)

  const handleSubmit = () => {
    handleCloseModal()
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">模板库</h1>
        <p className="text-text-secondary">管理和使用您的素材模板，快速生成商品内容</p>
      </div>

      <div className="bg-bg-card border border-border-color rounded-card p-6 mb-6">
        <div className="flex items-center gap-2 mb-4">
          <Search className="text-text-secondary" size={18} />
          <h2 className="text-lg font-semibold text-text-primary">搜索筛选</h2>
        </div>
        <Input
          placeholder="搜索模板名称、标签或描述..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <div className="flex items-center justify-between mt-4">
          <div className="flex gap-2">
            {platformTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedTag === tag
                    ? 'bg-accent-blue text-white'
                    : 'bg-bg-input text-text-secondary hover:text-text-primary'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
          <Button onClick={handleOpenModal}>
            <Plus size={16} />
            新建模板
          </Button>
        </div>
      </div>

      <div className="bg-bg-card border border-border-color rounded-card p-6">
        <div className="flex flex-col items-center justify-center py-16">
          <div className="w-24 h-24 rounded-xl bg-bg-input flex items-center justify-center mb-4">
            <FileText className="text-text-secondary" size={48} />
          </div>
          <p className="text-text-primary text-lg mb-2">暂无模板</p>
          <p className="text-text-secondary text-sm text-center mb-6">
            在商品任务中生成内容后，可以保存为模板方便下次使用
          </p>
          <Button onClick={() => useAppStore.getState().setCurrentPage('tasks')}>去创建</Button>
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={handleCloseModal} />
          <div className="relative bg-bg-card border border-border-color rounded-card w-full max-w-xl mx-4 animate-slideIn max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-border-color sticky top-0 bg-bg-card">
              <div className="flex items-center gap-2">
                <Sparkles className="text-purple-400" size={18} />
                <h3 className="text-lg font-semibold text-text-primary">新建模板</h3>
              </div>
              <button onClick={handleCloseModal} className="p-1 text-text-secondary hover:text-text-primary hover:bg-btn-secondary rounded-lg transition-colors">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-1">模板名称 *</label>
                <Input
                  placeholder="请输入模板名称"
                  value={templateName}
                  onChange={(e) => setTemplateName(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-1">目标平台</label>
                <NativeSelect
                  value={templatePlatform}
                  options={platforms}
                  onChange={setTemplatePlatform}
                />
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-1">标签（用逗号分隔）</label>
                <Input
                  placeholder="例如：服装,爆款,夏季"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-1">模板描述</label>
                <Textarea
                  placeholder="请输入模板描述"
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-1">标题模板</label>
                <Input
                  value={titleTemplate}
                  onChange={(e) => setTitleTemplate(e.target.value)}
                />
              </div>
              
              <div>
                <label className="block text-sm text-text-secondary mb-1">文案模板（每行一条）</label>
                <Textarea
                  rows={4}
                  value={copyTemplate}
                  onChange={(e) => setCopyTemplate(e.target.value)}
                />
              </div>
              
              <div className="flex justify-end gap-3 pt-4 border-t border-border-color">
                <Button variant="secondary" onClick={handleCloseModal}>取消</Button>
                <Button onClick={handleSubmit}>保存模板</Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}