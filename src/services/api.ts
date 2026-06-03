const DEFAULT_TEXT_API_URL = "https://ark.cn-beijing.volces.com/api/v3/chat/completions";
const DEFAULT_IMAGE_API_URL = "https://ark.cn-beijing.volces.com/api/v3/images/generations";

export interface GenerateParams {
  productName: string;
  category: string;
  brand: string;
  material: string;
  platform: string;
  style: string;
  extraRequirements?: string;
  referenceImage?: string;
}

export interface GeneratedResult {
  imageUrl: string;
  title: string;
  copywriting: string[];
  platform: string;
  generatedAt: string;
}

export interface RecognizedProduct {
  name?: string;
  category?: string;
  brand?: string;
  material?: string;
  description?: string;
}

async function generateText(
  prompt: string,
  apiKey: string,
  model: string,
  apiUrl: string = DEFAULT_TEXT_API_URL
): Promise<string> {
  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          "role": "user",
          "content": prompt
        }
      ],
      stream: false
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`API请求失败: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  
  if (!result.choices || !result.choices[0]?.message?.content) {
    throw new Error("API响应格式错误，缺少choices或message.content");
  }
  
  return result.choices[0].message.content;
}

async function generateImage(
  prompt: string,
  apiKey: string,
  model: string,
  apiUrl: string = DEFAULT_IMAGE_API_URL,
  referenceImage?: string
): Promise<string> {
  const isSeedream4Or5 = model.toLowerCase().includes('seedream-4') || 
                        model.toLowerCase().includes('seedream-5') ||
                        model.includes('4-0') || 
                        model.includes('4-5');
  
  const body: Record<string, unknown> = {
    model: model,
    prompt: prompt,
    size: "2K",
    watermark: true,
    response_format: "url",
    sequential_image_generation: "disabled",
    stream: false
  };
  
  if (referenceImage && isSeedream4Or5) {
    body.image = referenceImage;
  }

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(body)
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`图片生成API请求失败: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  
  if (!result.data || !result.data[0]?.url) {
    throw new Error("图片生成API响应格式错误，缺少data或url");
  }
  
  return result.data[0].url;
}

async function analyzeImageWithText(
  imageBase64: string,
  apiKey: string,
  model: string,
  apiUrl: string = DEFAULT_TEXT_API_URL
): Promise<RecognizedProduct> {
  const prompt = `请分析这张商品图片，识别以下信息并按JSON格式输出：
1. 商品名称（name）
2. 商品类目（category，如服装、运动户外、数码电器等）
3. 品牌（brand，如果能识别）
4. 材质（material，如果能识别）
5. 商品描述（description，简要描述商品特点）

只输出JSON，不要其他文字。
示例格式：
{"name": "户外徒步鞋", "category": "运动户外", "brand": "Salomon", "material": "网面+橡胶底", "description": "适合户外徒步的专业运动鞋"}`;

  const response = await fetch(apiUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: model,
      messages: [
        {
          "role": "user",
          "content": [
            {
              "type": "text",
              "text": prompt
            },
            {
              "type": "image_url",
              "image_url": {
                "url": imageBase64
              }
            }
          ]
        }
      ],
      stream: false
    })
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`图片识别API请求失败: ${response.status} - ${errorText}`);
  }

  const result = await response.json();
  
  if (!result.choices || !result.choices[0]?.message?.content) {
    throw new Error("图片识别API响应格式错误，缺少choices或message.content");
  }
  
  const content = result.choices[0].message.content;
  
  try {
    const jsonMatch = content.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      return JSON.parse(jsonMatch[0]);
    }
  } catch (e) {
    console.log("解析JSON失败，使用文本提取");
  }
  
  return {
    description: content
  };
}

function getStylePrompt(style: string): string {
  const stylePrompts: Record<string, string> = {
    "抖音种草风 - 口语化，种草安利": "使用口语化、亲切的种草风格，像朋友推荐一样，带有✨😍等表情符号，简短有力，有感染力",
    "淘宝爆款风 - 夸张卖点，促销导向": "使用夸张、促销导向的风格，强调卖点，使用感叹号，有紧迫感",
    "小红书笔记风 - 精致分享，体验式": "使用精致的分享风格，像写笔记一样，个人体验分享，带有emoji",
    "拼多多实惠风 - 低价亲民，性价比": "使用实惠、亲民的风格，强调性价比和低价，接地气"
  };
  return stylePrompts[style] || "使用电商通用文案风格";
}

function getPlatformPrompt(platform: string): string {
  const platformPrompts: Record<string, string> = {
    "淘宝/天猫": "淘宝/天猫电商平台，风格偏向促销爆款",
    "京东": "京东电商平台，风格偏向品质保证",
    "拼多多": "拼多多电商平台，风格偏向实惠低价",
    "抖音": "抖音电商平台，风格偏向种草安利",
    "小红书": "小红书平台，风格偏向笔记分享"
  };
  return platformPrompts[platform] || "电商平台";
}

export async function generateContent(
  params: GenerateParams,
  apiKey: string,
  textModel: string,
  imageModel: string,
  textApiUrl?: string,
  imageApiUrl?: string
): Promise<GeneratedResult> {
  if (!apiKey) {
    throw new Error("请先在设置页面配置API密钥");
  }

  const stylePrompt = getStylePrompt(params.style);
  const platformPrompt = getPlatformPrompt(params.platform);
  
  const textPrompt = `你是一个专业的电商文案写手。请为以下商品生成吸引人的电商文案：

商品信息：
- 商品名称：${params.productName}
- 商品类目：${params.category}
- 品牌：${params.brand || "未提供"}
- 材质：${params.material || "未提供"}
- 平台：${platformPrompt}
- 风格要求：${stylePrompt}
${params.extraRequirements ? `- 额外要求：${params.extraRequirements}` : ""}

请按以下格式输出：
【标题】
生成一个吸引眼球的商品标题，20-40字，包含关键词

【文案】
生成6-8条种草文案，每条一行，使用◆开头，适合${params.platform}平台风格，口语化，有感染力，带适当emoji`;

  const textResult = await generateText(textPrompt, apiKey, textModel, textApiUrl);
  
  let title = `绝了！这${params.productName}也太好穿了吧✨`;
  let copywriting: string[] = [
    `姐妹们！今天给你们分享一双我最近超爱的${params.productName}！`,
    `${params.brand ? params.brand : "这款"}的${params.productName}真的绝了，百搭好看！`,
    `${params.material ? params.material : "优质"}材质，穿着超级舒服～`,
    `${params.style.includes("抖音") ? "抖音爆款推荐！" : "电商平台热销款！"}`,
    "喜欢的宝子们一定要入手，真的太香了！",
    "点击链接 get 同款吧～"
  ];
  
  try {
    const titleMatch = textResult.match(/【标题】\s*([\s\S]*?)(?=【文案】|$)/);
    if (titleMatch) {
      title = titleMatch[1].trim().split('\n')[0] || title;
    }
    
    const copyMatch = textResult.match(/【文案】\s*([\s\S]*)$/);
    if (copyMatch) {
      const lines = copyMatch[1].trim().split('\n').filter(line => line.trim());
      if (lines.length > 0) {
        copywriting = lines.map(line => 
          line.replace(/^◆\s*/, '').replace(/^-\s*/, '').trim()
        ).filter(line => line.length > 0);
      }
    }
  } catch (e) {
    console.log("解析文案失败，使用默认文案");
  }

  const imagePrompt = `专业电商商品摄影图，${params.productName}，${params.category}类目${params.brand ? `，品牌：${params.brand}` : ''}${params.material ? `，材质：${params.material}` : ''}，高品质，清晰，商业摄影风格，专业打光，白色背景或自然场景，高端大气上档次`;
  
  let imageUrl = "";
  try {
    imageUrl = await generateImage(imagePrompt, apiKey, imageModel, imageApiUrl, params.referenceImage);
  } catch (e) {
    console.log("图片生成失败:", e);
    const errorMessage = e instanceof Error ? e.message : '未知错误';
    throw new Error(`图片生成失败: ${errorMessage}\n\n💡 提示：请确保已在火山引擎方舟平台开通图片生成模型（如 Seedream 4.0/4.5/5.0）`);
  }

  return {
    imageUrl,
    title,
    copywriting,
    platform: params.platform,
    generatedAt: new Date().toLocaleString('zh-CN')
  };
}

export async function recognizeProductFromImage(
  imageBase64: string,
  apiKey: string,
  visionModel: string,
  textApiUrl?: string
): Promise<RecognizedProduct> {
  if (!apiKey) {
    throw new Error("请先在设置页面配置API密钥");
  }

  try {
    return await analyzeImageWithText(imageBase64, apiKey, visionModel, textApiUrl);
  } catch (e) {
    console.error("图片识别失败:", e);
    throw e;
  }
}

export function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
}