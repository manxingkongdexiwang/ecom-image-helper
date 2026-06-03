import { useState, useEffect } from 'react'
import { Settings2, Code, Bell, Database, Info, AlertTriangle, Download, Upload, Trash2, RotateCcw, Package, Layers, Rocket, Sparkles, CheckCircle2, Eye } from 'lucide-react'
import { NativeSelect } from '../components/Select'
import { Input } from '../components/Input'
import { Switch } from '../components/Switch'
import { Button } from '../components/Button'
import { useAppStore } from '../store/appStore'

const navItems = [
  { id: 'default' as const, label: '默认参数', icon: Settings2 },
  { id: 'api' as const, label: 'API配置', icon: Code },
  { id: 'notification' as const, label: '通知设置', icon: Bell },
  { id: 'data' as const, label: '数据管理', icon: Database },
  { id: 'about' as const, label: '关于系统', icon: Info },
]

const platforms = [
  { value: '淘宝/天猫', label: '淘宝/天猫' },
  { value: '京东', label: '京东' },
  { value: '拼多多', label: '拼多多' },
  { value: '抖音', label: '抖音' },
  { value: '小红书', label: '小红书' },
]

const categories = [
  { value: '服装', label: '服装' },
  { value: '运动户外', label: '运动户外' },
  { value: '数码电器', label: '数码电器' },
  { value: '美妆护肤', label: '美妆护肤' },
  { value: '食品饮料', label: '食品饮料' },
]

const styles = [
  { value: '淘宝爆款风', label: '淘宝爆款风' },
  { value: '抖音种草风', label: '抖音种草风' },
  { value: '小红书笔记风', label: '小红书笔记风' },
  { value: '拼多多实惠风', label: '拼多多实惠风' },
]

const textModels = [
  { value: 'deepseek-v4-pro-260425', label: 'DeepSeek V4 Pro (默认 - 最新最强)' },
  { value: 'deepseek-v3-250115', label: 'DeepSeek V3 (免费额度)' },
  { value: 'doubao-1-5-pro-32k-250115', label: '豆包 1.5 Pro 32K (高性价比)' },
  { value: 'doubao-1-5-pro-250115', label: '豆包 1.5 Pro (标准)' },
  { value: 'doubao-seed-1-6-flash-250828', label: '豆包 1.6 Flash (极速响应)' },
  { value: 'doubao-seed-1-6-251015', label: '豆包 1.6 (最新标准版)' },
]

const imageModels = [
  { value: 'doubao-seedream-4-5-251128', label: 'Seedream 4.5 (默认 - 最新增强版 - 支持图生图)' },
  { value: 'doubao-seedream-4-0-250828', label: 'Seedream 4.0 (性价比之选 - 0.2元/张)' },
  { value: 'doubao-seedream-3-0-t2i', label: 'Seedream 3.0 (基础版 - 仅文生图)' },
  { value: 'Doubao-Seedream-5.0-lite', label: 'Seedream 5.0 Lite (高级版 - 支持联网搜索)' },
  { value: 'seedream-5-0-260128', label: 'Seedream 5.0 (完整版 - 最高质量)' },
]

const visionModels = [
  { value: 'doubao-seed-1-6-flash-250828', label: '豆包 1.6 Flash (推荐 - 支持视觉理解)' },
  { value: 'doubao-seed-1-6-251015', label: '豆包 1.6 (最新版 - 支持视觉理解)' },
  { value: 'doubao-seed-1-6-vision-250815', label: '豆包 1.6 Vision (纯视觉模型)' },
]

export function SettingsPage() {
  const { 
    activeSettingsTab, 
    setActiveSettingsTab,
    apiKey,
    setApiKey,
    textApiUrl,
    setTextApiUrl,
    imageApiUrl,
    setImageApiUrl,
    textModel,
    setTextModel,
    imageModel,
    setImageModel,
    visionModel,
    setVisionModel,
    requestTimeout,
    setRequestTimeout,
    autoSaveDraft,
    setAutoSaveDraft,
    selectedPlatform,
    setSelectedPlatform,
    selectedStyle,
    setSelectedStyle,
  } = useAppStore()
  
  const [localTextApiUrl, setLocalTextApiUrl] = useState(textApiUrl)
  const [localImageApiUrl, setLocalImageApiUrl] = useState(imageApiUrl)
  const [localTextModel, setLocalTextModel] = useState(textModel)
  const [localImageModel, setLocalImageModel] = useState(imageModel)
  const [localVisionModel, setLocalVisionModel] = useState(visionModel)
  const [localTimeout, setLocalTimeout] = useState(String(requestTimeout))
  const [localApiKey, setLocalApiKey] = useState(apiKey)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [localAutoSave, setLocalAutoSave] = useState(autoSaveDraft)

  useEffect(() => {
    setLocalTextApiUrl(textApiUrl)
    setLocalImageApiUrl(imageApiUrl)
    setLocalTextModel(textModel)
    setLocalImageModel(imageModel)
    setLocalVisionModel(visionModel)
    setLocalTimeout(String(requestTimeout))
    setLocalApiKey(apiKey)
    setLocalAutoSave(autoSaveDraft)
  }, [activeSettingsTab])

  const handleSave = () => {
    setTextApiUrl(localTextApiUrl)
    setImageApiUrl(localImageApiUrl)
    setTextModel(localTextModel)
    setImageModel(localImageModel)
    setVisionModel(localVisionModel)
    setRequestTimeout(parseInt(localTimeout) || 30000)
    setApiKey(localApiKey)
    setAutoSaveDraft(localAutoSave)
    setSaveSuccess(true)
    setTimeout(() => setSaveSuccess(false), 2000)
  }

  const renderContent = () => {
    switch (activeSettingsTab) {
      case 'default':
        return (
          <div className="bg-bg-card border border-border-color rounded-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Sparkles className="text-purple-400" size={18} />
              <h2 className="text-lg font-semibold text-text-primary">默认参数设置</h2>
            </div>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">默认目标平台</label>
                  <span className="text-xs text-text-secondary">新建任务时默认选择的电商平台</span>
                </div>
                <NativeSelect
                  value={selectedPlatform}
                  options={platforms}
                  onChange={setSelectedPlatform}
                  className="w-48"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">默认商品类目</label>
                  <span className="text-xs text-text-secondary">新建任务时默认选择的商品类目</span>
                </div>
                <NativeSelect
                  value="服装"
                  options={categories}
                  onChange={() => {}}
                  className="w-48"
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">默认生成风格</label>
                  <span className="text-xs text-text-secondary">新建任务时默认选择的文案风格</span>
                </div>
                <NativeSelect
                  value={selectedStyle}
                  options={styles}
                  onChange={setSelectedStyle}
                  className="w-48"
                />
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-color">
                <div>
                  <label className="block text-sm text-text-secondary mb-1">自动保存草稿</label>
                  <span className="text-xs text-text-secondary">生成内容后自动保存到草稿列表</span>
                </div>
                <Switch checked={localAutoSave} onChange={setLocalAutoSave} />
              </div>
            </div>
          </div>
        )

      case 'api':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Code className="text-accent-blue" size={18} />
              <h2 className="text-lg font-semibold text-text-primary">API配置</h2>
            </div>
            
            <div className="bg-gradient-to-r from-accent-blue/20 to-btn-gradient-end/20 border border-accent-blue/30 rounded-card p-4">
              <p className="text-sm text-accent-blue">以下配置用于对接真实的AI接口服务，请确保API服务可用</p>
            </div>

            <div className="bg-bg-card border border-border-color rounded-card p-6 space-y-4">
              <div>
                <label className="block text-sm text-text-secondary mb-2">API密钥</label>
                <Input
                  value={localApiKey}
                  onChange={(e) => setLocalApiKey(e.target.value)}
                  placeholder="请输入火山引擎API Key (格式: ark-xxxx)"
                />
                <p className="mt-1 text-xs text-text-secondary">在火山引擎方舟平台创建API Key，格式为 ark-xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx</p>
              </div>
              
              <div className="border-t border-border-color pt-4">
                <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center gap-2">
                  <Sparkles size={14} className="text-purple-400" />
                  文案生成配置
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">文案生成API地址</label>
                    <Input
                      value={localTextApiUrl}
                      onChange={(e) => setLocalTextApiUrl(e.target.value)}
                      placeholder="https://ark.cn-beijing.volces.com/api/v3/chat/completions"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">文案生成模型</label>
                    <NativeSelect
                      value={localTextModel}
                      options={textModels}
                      onChange={setLocalTextModel}
                    />
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border-color pt-4">
                <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center gap-2">
                  <Eye size={14} className="text-green-400" />
                  图片识别配置
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">图片识别模型</label>
                    <NativeSelect
                      value={localVisionModel}
                      options={visionModels}
                      onChange={setLocalVisionModel}
                    />
                    <p className="mt-1 text-xs text-text-secondary">用于上传图片后自动识别商品信息</p>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border-color pt-4">
                <h3 className="text-sm font-medium text-text-primary mb-3 flex items-center gap-2">
                  <Layers size={14} className="text-blue-400" />
                  图片生成配置
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">图片生成API地址</label>
                    <Input
                      value={localImageApiUrl}
                      onChange={(e) => setLocalImageApiUrl(e.target.value)}
                      placeholder="https://ark.cn-beijing.volces.com/api/v3/images/generations"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">图片生成模型</label>
                    <NativeSelect
                      value={localImageModel}
                      options={imageModels}
                      onChange={setLocalImageModel}
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm text-text-secondary mb-2">请求超时(毫秒)</label>
                    <Input
                      value={localTimeout}
                      onChange={(e) => setLocalTimeout(e.target.value)}
                      placeholder="30000"
                    />
                  </div>
                </div>
              </div>
              
              <div className="pt-2">
                <Button onClick={handleSave} className="w-full">
                  {saveSuccess ? (
                    <>
                      <CheckCircle2 size={18} />
                      配置已保存
                    </>
                  ) : (
                    <>
                      保存配置
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )

      case 'notification':
        return (
          <div className="bg-bg-card border border-border-color rounded-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Bell className="text-yellow-400" size={18} />
              <h2 className="text-lg font-semibold text-text-primary">通知设置</h2>
            </div>
            <div className="flex flex-col items-center justify-center py-16">
              <Bell className="text-text-secondary mb-4" size={48} />
              <p className="text-text-primary text-lg">通知设置</p>
              <p className="text-text-secondary text-sm mt-2">配置应用通知相关的偏好设置</p>
            </div>
          </div>
        )

      case 'data':
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-2 mb-6">
              <Database className="text-green-400" size={18} />
              <h2 className="text-lg font-semibold text-text-primary">数据管理</h2>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-bg-card border border-border-color rounded-card p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-blue/20 to-btn-gradient-end/20 flex items-center justify-center">
                  <Package className="text-accent-blue" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">0</div>
                  <div className="text-sm text-text-secondary">草稿数量</div>
                </div>
              </div>
              <div className="bg-bg-card border border-border-color rounded-card p-4 flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-purple-500/20 to-purple-500/10 flex items-center justify-center">
                  <Layers className="text-purple-400" size={24} />
                </div>
                <div>
                  <div className="text-2xl font-bold text-text-primary">0</div>
                  <div className="text-sm text-text-secondary">模板数量</div>
                </div>
              </div>
            </div>

            <div className="bg-bg-card border border-border-color rounded-card p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-text-primary font-medium">导出数据</div>
                  <div className="text-xs text-text-secondary">导出所有草稿和模板数据</div>
                </div>
                <Button variant="secondary" size="sm">
                  <Download size={14} />
                  导出
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-color">
                <div>
                  <div className="text-text-primary font-medium">导入数据</div>
                  <div className="text-xs text-text-secondary">从备份文件导入数据</div>
                </div>
                <Button variant="secondary" size="sm">
                  <Upload size={14} />
                  导入
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-color">
                <div>
                  <div className="text-text-primary font-medium">清空草稿</div>
                  <div className="text-xs text-text-secondary">删除所有草稿数据，此操作不可恢复</div>
                </div>
                <Button variant="danger" size="sm">
                  <Trash2 size={14} />
                  清空
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-color">
                <div>
                  <div className="text-text-primary font-medium">清空模板</div>
                  <div className="text-xs text-text-secondary">删除所有模板数据，此操作不可恢复</div>
                </div>
                <Button variant="danger" size="sm">
                  <Trash2 size={14} />
                  清空
                </Button>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-border-color">
                <div className="flex items-center gap-3">
                  <AlertTriangle className="text-yellow-400 flex-shrink-0" size={20} />
                  <div>
                    <div className="text-text-primary font-medium">重置所有数据</div>
                    <div className="text-xs text-text-secondary">删除所有数据并恢复默认设置</div>
                  </div>
                </div>
                <Button variant="danger" size="sm">
                  <RotateCcw size={14} />
                  重置
                </Button>
              </div>
            </div>
          </div>
        )

      case 'about':
        return (
          <div className="bg-bg-card border border-border-color rounded-card p-6">
            <div className="flex items-center gap-2 mb-6">
              <Info className="text-text-secondary" size={18} />
              <h2 className="text-lg font-semibold text-text-primary">关于系统</h2>
            </div>
            <div className="flex flex-col items-center justify-center py-16">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent-blue/20 to-btn-gradient-end/20 flex items-center justify-center mb-4">
                <Rocket className="text-accent-blue" size={32} />
              </div>
              <p className="text-text-primary text-lg">抖音电商素材工作台</p>
              <p className="text-text-secondary text-sm mt-2">版本 1.0.0</p>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">系统设置</h1>
        <p className="text-text-secondary">配置您的默认参数和偏好设置</p>
      </div>
      
      <div className="flex gap-6">
        <div className="w-56 flex-shrink-0">
          <div className="bg-bg-card border border-border-color rounded-card p-2">
            <div className="px-3 py-2 mb-2">
              <span className="text-xs font-medium text-text-secondary">设置分类</span>
            </div>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = activeSettingsTab === item.id
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveSettingsTab(item.id)}
                      className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-gradient-to-r from-btn-gradient-start to-btn-gradient-end text-white'
                          : 'text-text-secondary hover:text-text-primary hover:bg-bg-input'
                      }`}
                    >
                      <Icon size={16} />
                      <span className="text-sm">{item.label}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
        <main className="flex-1">{renderContent()}</main>
      </div>
    </div>
  )
}