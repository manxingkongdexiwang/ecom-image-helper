import { CheckCircle2 } from 'lucide-react'
import { useAppStore } from '../store/appStore'

export function ResultsPage() {
  const { generatedResult } = useAppStore()

  const defaultImage = "https://neeko-copilot.bytedance.net/api/text_to_image?prompt=Salomon%20gray%20outdoor%20hiking%20shoes%20on%20mossy%20rocks%20natural%20forest%20background%20professional%20product%20photography&image_size=landscape_16_9"
  
  const defaultTitle = "绝了！这Salomon户外徒步鞋也太好穿了吧✨登山徒步必备神器"
  
  const defaultCopywriting = [
    '姐妹们！今天给你们分享一双我最近超爱的户外徒步鞋！',
    'Salomon家的这款徒步鞋真的绝了，灰色百搭，网面材质超级透气！',
    '橡胶底防滑耐磨，爬山徒步完全不打滑，脚感超级舒服～',
    '不管是日常穿搭还是户外探险，这双鞋都能hold住！',
    '喜欢户外活动的宝子们一定要入手，真的太香了！',
    '点击左下角链接 get 同款，一起去征服大自然吧～',
  ]

  const imageUrl = generatedResult?.imageUrl || defaultImage
  const title = generatedResult?.title || defaultTitle
  const copywriting = generatedResult?.copywriting || defaultCopywriting
  const platform = generatedResult?.platform || '抖音'
  const generatedAt = generatedResult?.generatedAt || '2026/4/24 15:24:06'

  return (
    <div className="animate-fadeIn">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold text-text-primary mb-2">AI生成结果</h1>
        </div>
        <span className="text-text-secondary text-sm">生成时间：{generatedAt}</span>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="relative">
          <div className="absolute top-4 left-4 z-10">
            <span className="px-3 py-1 bg-accent-blue/90 text-white text-xs font-medium rounded-full">
              AI生成
            </span>
          </div>
          <img
            src={imageUrl}
            alt="AI生成效果图"
            className="w-full rounded-card object-cover"
          />
        </div>

        <div className="space-y-6">
          <div className="bg-bg-card border border-border-color rounded-card p-6">
            <h3 className="text-xl font-semibold text-text-primary mb-2">
              {title}
            </h3>
            <span className="text-sm text-accent-blue">{platform}平台</span>
          </div>

          <div className="bg-bg-card border border-border-color rounded-card p-6">
            <h4 className="text-lg font-semibold text-purple-400 mb-4">种草文案</h4>
            <ul className="space-y-3">
              {copywriting.map((item, index) => (
                <li key={index} className="flex items-start gap-2 text-text-primary">
                  <CheckCircle2 className="text-purple-400 flex-shrink-0 mt-0.5" size={16} />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}