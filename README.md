# 抖音电商素材工作台

一个基于 React + TypeScript + Vite 构建的深色暗夜风抖音电商素材工作台单页应用，集成火山引擎方舟大模型 API，支持商品图片识别、文案生成和 AI 图片生成功能。

## 项目概述

本项目是一个电商素材智能生成工作台，帮助电商运营人员快速生成商品宣传素材。主要功能包括：

- **商品图片识别**：上传商品图片后，AI 自动识别商品名称、类目、品牌、材质等信息
- **智能文案生成**：根据商品信息生成抖音/淘宝/小红书等平台风格的商品文案
- **AI 图片生成**：基于商品信息和参考图片生成高质量的电商宣传图
- **多平台支持**：支持抖音、淘宝/天猫、京东、拼多多、小红书等主流电商平台
<img width="1918" height="1614" alt="image" src="https://github.com/user-attachments/assets/57a64432-2342-4e44-b2e7-876b9b77621f" />
<img width="1918" height="1539" alt="image" src="https://github.com/user-attachments/assets/0357af51-0175-4752-bebc-646ea2e60613" />
<img width="1918" height="1336" alt="image" src="https://github.com/user-attachments/assets/7b3cb974-c57a-4e4c-8d1b-f2030886c2b8" />
<img width="1918" height="1234" alt="image" src="https://github.com/user-attachments/assets/67138a33-e5ca-41e9-b9cc-0a127d892235" />
<img width="1918" height="1158" alt="image" src="https://github.com/user-attachments/assets/e1daf39d-caa1-4a15-8a98-0306c99fdae0" />



## 技术栈

| 技术 | 版本 | 说明 |
|------|------|------|
| React | ^18.2.0 | UI 框架 |
| TypeScript | ^5.3.3 | 类型安全 |
| Vite | ^5.0.10 | 构建工具 |
| Tailwind CSS | ^3.4.0 | CSS 框架 |
| Zustand | ^4.4.7 | 状态管理 |
| Lucide React | ^0.294.0 | 图标库 |
| 火山引擎方舟 API | - | 大模型服务 |

## 项目结构

```
douyin-ecommerce-workbench/
├── src/
│   ├── components/           # 通用 UI 组件
│   │   ├── Button.tsx        # 按钮组件
│   │   ├── Checkbox.tsx      # 复选框组件
│   │   ├── Header.tsx        # 顶部导航栏
│   │   ├── Input.tsx         # 输入框组件
│   │   ├── Modal.tsx         # 弹窗组件
│   │   ├── Select.tsx        # 下拉选择组件
│   │   ├── StatCard.tsx      # 统计卡片组件
│   │   └── Switch.tsx        # 开关组件
│   ├── pages/                # 页面组件
│   │   ├── HomePage.tsx      # 工作台首页
│   │   ├── TasksPage.tsx     # 商品任务页（核心功能页）
│   │   ├── ResultsPage.tsx   # AI 生成结果页
│   │   ├── TemplatesPage.tsx # 模板库页
│   │   └── SettingsPage.tsx  # 设置页
│   ├── services/             # API 服务层
│   │   └── api.ts            # 火山引擎 API 调用封装
│   ├── store/                # 状态管理
│   │   └── appStore.ts       # Zustand 全局状态
│   ├── App.tsx               # 主应用组件
│   ├── main.tsx              # 应用入口
│   └── index.css             # 全局样式（Tailwind）
├── index.html                # HTML 入口
├── package.json              # 项目依赖配置
├── vite.config.ts            # Vite 构建配置
├── tailwind.config.js        # Tailwind CSS 配置
├── postcss.config.js         # PostCSS 配置
├── tsconfig.json             # TypeScript 配置
├── 一键启动.bat               # Windows 快捷启动脚本
└── 启动网页.bat               # Windows 启动脚本
```

## 模块功能说明

### 1. 核心页面

#### [HomePage.tsx](src/pages/HomePage.tsx) - 工作台首页
- 展示今日生成统计数据
- 快捷入口导航到各功能页
- 效率指标展示

#### [TasksPage.tsx](src/pages/TasksPage.tsx) - 商品任务页（核心）
- **图片上传**：支持拖拽和点击上传商品图片
- **自动识别**：上传图片后自动调用视觉模型识别商品信息
- **商品信息编辑**：手动编辑或确认商品名称、类目、品牌、材质
- **平台选择**：选择目标电商平台（抖音、淘宝、京东、拼多多、小红书）
- **风格选择**：选择文案生成风格（种草风、爆款风、笔记风、实惠风）
- **一键生成**：调用 AI 生成文案和宣传图

#### [ResultsPage.tsx](src/pages/ResultsPage.tsx) - AI 生成结果页
- 展示生成的商品标题
- 展示多条种草文案
- 展示 AI 生成的宣传图片
- 支持图片下载和文案复制

#### [TemplatesPage.tsx](src/pages/TemplatesPage.tsx) - 模板库页
- 展示预设的商品模板
- 支持快速应用模板

#### [SettingsPage.tsx](src/pages/SettingsPage.tsx) - 设置页
- **API 配置**：配置火山引擎 API Key、API 地址
- **模型选择**：
  - 文案生成模型
  - 图片识别模型
  - 图片生成模型
- **默认设置**：默认平台、风格选择
- **关于信息**：项目版本和说明

### 2. API 服务层

#### [api.ts](src/services/api.ts) - 火山引擎 API 服务

**主要函数：**

| 函数 | 功能 | 模型类型 |
|------|------|----------|
| `generateText()` | 调用文本生成模型生成内容 | 文本模型 |
| `generateImage()` | 调用图片生成模型生成图片 | 图片模型 |
| `analyzeImageWithText()` | 调用视觉模型识别图片内容 | 视觉模型 |
| `generateContent()` | 一站式生成文案和图片 | 综合 |
| `recognizeProductFromImage()` | 商品图片识别接口 | 视觉模型 |
| `fileToBase64()` | 文件转 Base64 编码 | 工具函数 |

**支持的模型：**

**文案生成模型：**
- `deepseek-v4-pro-260425` - DeepSeek V4 Pro（默认）
- `deepseek-v3-250115` - DeepSeek V3
- `doubao-1-5-pro-32k-250115` - 豆包 1.5 Pro 32K
- `doubao-1-5-pro-250115` - 豆包 1.5 Pro
- `doubao-seed-1-6-flash-250828` - 豆包 1.6 Flash
- `doubao-seed-1-6-251015` - 豆包 1.6

**图片生成模型：**
- `doubao-seedream-4-5-251128` - Seedream 4.5（默认，支持图生图）
- `doubao-seedream-4-0-250828` - Seedream 4.0
- `doubao-seedream-3-0-t2i` - Seedream 3.0
- `Doubao-Seedream-5.0-lite` - Seedream 5.0 Lite
- `seedream-5-0-260128` - Seedream 5.0

**视觉识别模型：**
- `doubao-seed-1-6-flash-250828` - 豆包 1.6 Flash（默认）
- `doubao-seed-1-6-251015` - 豆包 1.6
- `doubao-seed-1-6-vision-250815` - 豆包 1.6 Vision

### 3. 状态管理

#### [appStore.ts](src/store/appStore.ts) - Zustand 全局状态

**管理的状态：**
- 当前页面路由
- API 配置（Key、URL、模型选择）
- 用户设置（默认平台、风格）
- 生成结果数据
- 加载状态和错误信息

**持久化存储：**
- API 配置自动保存到 localStorage
- 页面刷新后配置不丢失

## 本地部署教程

### 环境要求

| 依赖 | 最低版本 | 说明 |
|------|---------|------|
| Node.js | >= 18.0.0 | JavaScript 运行时 |
| npm | >= 9.0.0 | 包管理器 |
| Git | >= 2.0.0 | 版本控制 |

### 快速开始

#### 方法一：使用快捷脚本（Windows）

1. **双击运行** `一键启动.bat`
2. 脚本会自动启动开发服务器并打开浏览器

#### 方法二：使用 npm 命令

1. **克隆项目**
   ```bash
   git clone https://github.com/manxingkongdexiwang/ecom-image-helper.git
   cd ecom-image-helper
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

   > 如果遇到网络问题，可以使用国内镜像：
   > ```bash
   > npm config set registry https://registry.npmmirror.com
   > npm install
   > ```

3. **启动开发服务器**
   ```bash
   npm run dev
   ```

4. **在浏览器中打开**
   - 默认地址：`http://localhost:5173/`
   - 如端口被占用，Vite 会自动使用其他端口

### API 配置

#### 1. 获取火山引擎 API Key

1. 打开 [火山引擎方舟平台](https://console.volcengine.com/ark/)
2. 进入 **模型广场**，开通需要的模型：
   - 文案生成：推荐开通 `deepseek-v4-pro-260425` 或 `doubao-seed-1-6-flash-250828`
   - 图片识别：推荐开通 `doubao-seed-1-6-flash-250828`（支持视觉）
   - 图片生成：推荐开通 `doubao-seedream-4-5-251128`（支持图生图）
3. 创建 **推理接入点（Endpoint）**
4. 复制 API Key

#### 2. 在应用中配置 API

1. 启动应用后，进入 **设置** → **API 配置**
2. 输入您的 API Key
3. 选择已开通的模型
4. 点击 **保存配置**

### 生产构建

```bash
# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

构建产物将生成在 `dist/` 目录。

## 使用流程

### 1. 配置 API

首次使用需要在 **设置页** 配置火山引擎 API Key 和模型选择。

### 2. 创建商品任务

1. 进入 **商品任务** 页
2. 上传商品图片（支持拖拽或点击上传）
3. 等待 AI 自动识别商品信息，或手动填写
4. 选择目标平台和文案风格
5. 点击 **一键生成**

### 3. 查看生成结果

- 生成完成后自动跳转到 **结果页**
- 可以复制文案、下载图片

## 文件功能详解

| 文件 | 功能说明 |
|------|----------|
| `main.tsx` | React 应用入口，渲染根组件 |
| `App.tsx` | 主应用组件，包含路由逻辑和配置校验 |
| `index.css` | 全局样式，定义 Tailwind 主题和自定义类 |
| `api.ts` | 所有 API 调用的封装，包含错误处理 |
| `appStore.ts` | 全局状态管理，使用 Zustand + persist 中间件 |
| `Header.tsx` | 顶部导航栏，包含页面切换 |
| `HomePage.tsx` | 首页，展示统计数据和快捷入口 |
| `TasksPage.tsx` | 核心功能页，商品上传和生成 |
| `ResultsPage.tsx` | 结果展示页，展示生成内容 |
| `SettingsPage.tsx` | 设置页，API 配置和模型选择 |
| `vite.config.ts` | Vite 配置，React 插件配置 |
| `tailwind.config.js` | Tailwind 主题配置，包含暗夜主题色板 |

## 常见问题

### Q: 提示 "模型不存在或无权访问"

**A:** 请确认：
1. 已在火山引擎方舟平台开通对应模型
2. 已为该模型创建推理接入点（Endpoint）
3. API Key 正确无误

### Q: 图片生成失败

**A:** 可能原因：
1. 未开通图片生成模型（Seedream 系列）
2. 图片大小超限（建议 < 10MB）
3. API 余额不足

### Q: npm install 失败

**A:** 尝试使用国内镜像：
```bash
npm config set registry https://registry.npmmirror.com
npm install
```

### Q: 如何查看 API 调用日志

**A:** 
1. 按 `F12` 打开浏览器开发者工具
2. 切换到 **Network**（网络）选项卡
3. 筛选 `Fetch/XHR` 类型请求
4. 查看请求和响应详情

## 许可证

本项目为课程作业项目，仅供学习和参考使用。

## 项目信息

- **仓库地址**: https://github.com/manxingkongdexiwang/ecom-image-helper
- **技术栈**: React 18 + TypeScript + Vite + Tailwind CSS
- **AI 服务**: 火山引擎方舟大模型 API
