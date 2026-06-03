import { useState, useRef } from 'react'
import { FileImage, Rocket, Loader2, AlertCircle, Upload, X, Scan } from 'lucide-react'
import { Button } from '../components/Button'
import { Input } from '../components/Input'
import { NativeSelect } from '../components/Select'
import { Checkbox } from '../components/Checkbox'
import { Textarea } from '../components/Input'
import { useAppStore } from '../store/appStore'
import { generateContent, recognizeProductFromImage, fileToBase64 } from '../services/api'

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
  { value: '抖音种草风 - 口语化，种草安利', label: '抖音种草风 - 口语化，种草安利' },
  { value: '淘宝爆款风 - 夸张卖点，促销导向', label: '淘宝爆款风 - 夸张卖点，促销导向' },
  { value: '小红书笔记风 - 精致分享，体验式', label: '小红书笔记风 - 精致分享，体验式' },
  { value: '拼多多实惠风 - 低价亲民，性价比', label: '拼多多实惠风 - 低价亲民，性价比' },
]

export function TasksPage() {
  const { 
    selectedPlatform, 
    setSelectedPlatform, 
    selectedStyle, 
    setSelectedStyle, 
    setCurrentPage,
    apiKey,
    textApiUrl,
    imageApiUrl,
    textModel,
    imageModel,
    visionModel,
    setGeneratedResult,
    setIsGenerating,
    isGenerating,
    error,
    setError,
    uploadedImage,
    setUploadedImage,
  } = useAppStore()
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [productName, setProductName] = useState('鞋子')
  const [category, setCategory] = useState('服装')
  const [brand, setBrand] = useState('')
  const [material, setMaterial] = useState('皮革')
  const [autoRecognizeEnabled, setAutoRecognizeEnabled] = useState(true)
  const [saveAsTemplate, setSaveAsTemplate] = useState(false)
  const [extraRequirements, setExtraRequirements] = useState('')
  const [isRecognizing, setIsRecognizing] = useState(false)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.type.startsWith('image/')) {
      setError('请选择图片文件（JPG、PNG等格式）')
      return
    }

    if (file.size > 10 * 1024 * 1024) {
      setError('图片大小不能超过10MB')
      return
    }

    try {
      const base64 = await fileToBase64(file)
      setUploadedImage(base64)
      setError(null)

      if (autoRecognizeEnabled && apiKey) {
        setIsRecognizing(true)
        try {
          const recognized = await recognizeProductFromImage(base64, apiKey, visionModel, textApiUrl)
          if (recognized.name) setProductName(recognized.name)
          if (recognized.category) {
            const matchedCategory = categories.find(c => 
              c.value.includes(recognized.category!) || 
              recognized.category?.includes(c.value)
            )
            if (matchedCategory) setCategory(matchedCategory.value)
          }
          if (recognized.brand) setBrand(recognized.brand)
          if (recognized.material) setMaterial(recognized.material)
        } catch (e) {
          console.error('自动识别失败:', e)
          const errorMessage = e instanceof Error ? e.message : '未知错误'
          setError(`图片识别失败: ${errorMessage}，请手动填写商品信息`)
        } finally {
          setIsRecognizing(false)
        }
      }
    } catch (e) {
      setError('图片读取失败，请重试')
      console.error(e)
    }
  }

  const handleRemoveImage = () => {
    setUploadedImage(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleGenerate = async () => {
    if (!productName.trim()) {
      setError('请输入商品名称')
      return
    }

    if (!apiKey) {
      setError('请先在设置页面配置API密钥')
      return
    }

    setIsGenerating(true)
    setError(null)

    try {
      const result = await generateContent(
        {
          productName,
          category,
          brand,
          material,
          platform: selectedPlatform,
          style: selectedStyle,
          extraRequirements,
          referenceImage: uploadedImage || undefined
        },
        apiKey,
        textModel,
        imageModel,
        textApiUrl,
        imageApiUrl
      )
      
      setGeneratedResult(result)
      setCurrentPage('results')
    } catch (e) {
      setError(e instanceof Error ? e.message : '生成失败，请重试')
      console.error('生成失败:', e)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    
    const file = e.dataTransfer.files?.[0]
    if (!file) return

    const fakeEvent = { target: { files: [file] } } as React.ChangeEvent<HTMLInputElement>
    handleFileChange(fakeEvent)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className="animate-fadeIn">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary mb-2">商品任务</h1>
        <p className="text-text-secondary">上传商品信息，AI将为您生成专业的电商素材</p>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-danger-color/20 border border-danger-color/50 rounded-card flex items-center gap-3">
          <AlertCircle className="text-danger-color flex-shrink-0" size={20} />
          <span className="text-text-primary">{error}</span>
        </div>
      )}

      {!apiKey && (
        <div className="mb-6 p-4 bg-yellow-500/20 border border-yellow-500/50 rounded-card flex items-center gap-3">
          <AlertCircle className="text-yellow-400 flex-shrink-0" size={20} />
          <span className="text-text-primary">
            请先在 <button 
              onClick={() => setCurrentPage('settings')} 
              className="text-accent-blue underline hover:no-underline"
            >设置页面</button> 配置火山引擎API密钥
          </span>
        </div>
      )}

      <div className="grid grid-cols-2 gap-6">
        <div className="bg-bg-card border border-border-color rounded-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <FileImage className="text-accent-blue" size={18} />
            <h2 className="text-lg font-semibold text-text-primary">商品信息</h2>
          </div>

          <div className="mb-6">
            <label className="block text-sm text-text-secondary mb-2">商品图片上传</label>
            
            {!uploadedImage ? (
              <div 
                className="border-2 border-dashed border-border-color rounded-card p-8 text-center hover:border-accent-blue/50 transition-colors cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
              >
                <Upload className="text-text-secondary mx-auto mb-3" size={32} />
                <p className="text-text-secondary text-sm">点击或拖拽上传商品图片 支持JPG、PNG格式，建议白底图效果更佳</p>
              </div>
            ) : (
              <div className="relative">
                <img
                  src={uploadedImage}
                  alt="已上传的商品图片"
                  className="w-full max-h-64 object-contain rounded-card"
                />
                <button
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1 bg-bg-card/80 rounded-full hover:bg-danger-color transition-colors"
                >
                  <X className="text-text-primary" size={16} />
                </button>
                {isRecognizing && (
                  <div className="absolute inset-0 bg-black/50 rounded-card flex items-center justify-center">
                    <div className="flex items-center gap-2 text-white">
                      <Loader2 className="animate-spin" size={20} />
                      <span>正在识别商品信息...</span>
                    </div>
                  </div>
                )}
              </div>
            )}
            
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

            {uploadedImage && (
              <div className="mt-3 flex items-center gap-2 px-3 py-2 bg-bg-input rounded-lg">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-sm text-text-primary">已上传 1 张图片</span>
              </div>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <Input
              label="商品名称"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="请输入商品名称"
            />
            <NativeSelect
              label="商品类目"
              value={category}
              options={categories}
              onChange={setCategory}
            />
            <Input
              label="品牌"
              placeholder="请输入品牌名称"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <Input
              label="材质"
              value={material}
              onChange={(e) => setMaterial(e.target.value)}
              placeholder="请输入材质"
            />
            <Input
              label="尺寸"
              placeholder="请输入尺寸"
            />
            <Input
              label="颜色"
              placeholder="请输入颜色"
            />
          </div>
        </div>

        <div className="bg-bg-card border border-border-color rounded-card p-6">
          <div className="flex items-center gap-2 mb-6">
            <Rocket className="text-purple-400" size={18} />
            <h2 className="text-lg font-semibold text-text-primary">生成设置</h2>
          </div>

          <div className="space-y-6">
            <NativeSelect
              label="目标平台"
              value={selectedPlatform}
              options={platforms}
              onChange={setSelectedPlatform}
            />

            <NativeSelect
              label="生成风格"
              value={selectedStyle}
              options={styles}
              onChange={setSelectedStyle}
            />

            <Textarea
              label="额外要求"
              placeholder="请输入额外的生成要求，例如：突出商品材质、强调性价比、针对特定人群等"
              rows={4}
              value={extraRequirements}
              onChange={(e) => setExtraRequirements(e.target.value)}
            />

            <div className="space-y-3">
              <Checkbox
                checked={autoRecognizeEnabled}
                onChange={setAutoRecognizeEnabled}
                label="上传图片后自动识别商品信息"
              />
              <Checkbox
                checked={saveAsTemplate}
                onChange={setSaveAsTemplate}
                label="生成后保存为模板，方便下次使用"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6">
        <Button 
          onClick={handleGenerate} 
          size="lg" 
          className="w-full"
          disabled={isGenerating || isRecognizing}
        >
          {isGenerating ? (
            <>
              <Loader2 className="animate-spin" size={18} />
              正在生成中，请稍候...
            </>
          ) : (
            <>
              <Rocket size={18} />
              开始生成
            </>
          )}
        </Button>
      </div>
    </div>
  )
}