import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface GeneratedResult {
  imageUrl: string
  title: string
  copywriting: string[]
  platform: string
  generatedAt: string
}

interface AppState {
  currentPage: 'home' | 'tasks' | 'results' | 'templates' | 'settings'
  activeSettingsTab: 'default' | 'api' | 'notification' | 'data' | 'about'
  selectedPlatform: string
  selectedStyle: string
  isModalOpen: boolean
  draftCount: number
  templateCount: number
  todayGenerated: number
  efficiency: number
  apiKey: string
  textApiUrl: string
  imageApiUrl: string
  textModel: string
  imageModel: string
  visionModel: string
  requestTimeout: number
  generatedResult: GeneratedResult | null
  isGenerating: boolean
  error: string | null
  uploadedImage: string | null
  autoSaveDraft: boolean
  setCurrentPage: (page: 'home' | 'tasks' | 'results' | 'templates' | 'settings') => void
  setActiveSettingsTab: (tab: 'default' | 'api' | 'notification' | 'data' | 'about') => void
  setSelectedPlatform: (platform: string) => void
  setSelectedStyle: (style: string) => void
  setIsModalOpen: (open: boolean) => void
  setApiKey: (key: string) => void
  setTextApiUrl: (url: string) => void
  setImageApiUrl: (url: string) => void
  setTextModel: (model: string) => void
  setImageModel: (model: string) => void
  setVisionModel: (model: string) => void
  setRequestTimeout: (timeout: number) => void
  setGeneratedResult: (result: GeneratedResult | null) => void
  setIsGenerating: (loading: boolean) => void
  setError: (error: string | null) => void
  setUploadedImage: (image: string | null) => void
  setAutoSaveDraft: (autoSave: boolean) => void
  saveSettings: () => void
}

const DEFAULT_TEXT_MODEL = 'deepseek-v4-pro-260425';
const DEFAULT_IMAGE_MODEL = 'doubao-seedream-4-5-251128';
const DEFAULT_VISION_MODEL = 'doubao-seed-1-6-flash-250828';

const VALID_TEXT_MODELS = [
  'deepseek-v4-pro-260425',
  'deepseek-v3-250115',
  'doubao-1-5-pro-32k-250115',
  'doubao-1-5-pro-250115',
  'doubao-seed-1-6-flash-250828',
  'doubao-seed-1-6-251015',
];

const VALID_IMAGE_MODELS = [
  'doubao-seedream-4-5-251128',
  'doubao-seedream-4-0-250828',
  'doubao-seedream-3-0-t2i',
  'Doubao-Seedream-5.0-lite',
  'seedream-5-0-260128',
];

const VALID_VISION_MODELS = [
  'doubao-seed-1-6-flash-250828',
  'doubao-seed-1-6-251015',
  'doubao-seed-1-6-vision-250815',
];

function getValidTextModel(model: string | undefined): string {
  if (model && VALID_TEXT_MODELS.includes(model)) {
    return model;
  }
  return DEFAULT_TEXT_MODEL;
}

function getValidImageModel(model: string | undefined): string {
  if (model && VALID_IMAGE_MODELS.includes(model)) {
    return model;
  }
  return DEFAULT_IMAGE_MODEL;
}

function getValidVisionModel(model: string | undefined): string {
  if (model && VALID_VISION_MODELS.includes(model)) {
    return model;
  }
  return DEFAULT_VISION_MODEL;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      currentPage: 'home',
      activeSettingsTab: 'default',
      selectedPlatform: '抖音',
      selectedStyle: '抖音种草风 - 口语化，种草安利',
      isModalOpen: false,
      draftCount: 0,
      templateCount: 0,
      todayGenerated: 0,
      efficiency: 0,
      apiKey: '',
      textApiUrl: 'https://ark.cn-beijing.volces.com/api/v3/chat/completions',
      imageApiUrl: 'https://ark.cn-beijing.volces.com/api/v3/images/generations',
      textModel: DEFAULT_TEXT_MODEL,
      imageModel: DEFAULT_IMAGE_MODEL,
      visionModel: DEFAULT_VISION_MODEL,
      requestTimeout: 30000,
      generatedResult: null,
      isGenerating: false,
      error: null,
      uploadedImage: null,
      autoSaveDraft: true,
      setCurrentPage: (page) => set({ currentPage: page }),
      setActiveSettingsTab: (tab) => set({ activeSettingsTab: tab }),
      setSelectedPlatform: (platform) => set({ selectedPlatform: platform }),
      setSelectedStyle: (style) => set({ selectedStyle: style }),
      setIsModalOpen: (open) => set({ isModalOpen: open }),
      setApiKey: (key) => set({ apiKey: key }),
      setTextApiUrl: (url) => set({ textApiUrl: url }),
      setImageApiUrl: (url) => set({ imageApiUrl: url }),
      setTextModel: (model) => set({ textModel: getValidTextModel(model) }),
      setImageModel: (model) => set({ imageModel: getValidImageModel(model) }),
      setVisionModel: (model) => set({ visionModel: getValidVisionModel(model) }),
      setRequestTimeout: (timeout) => set({ requestTimeout: timeout }),
      setGeneratedResult: (result) => set({ generatedResult: result }),
      setIsGenerating: (loading) => set({ isGenerating: loading }),
      setError: (error) => set({ error }),
      setUploadedImage: (image) => set({ uploadedImage: image }),
      setAutoSaveDraft: (autoSave) => set({ autoSaveDraft: autoSave }),
      saveSettings: () => {
        const state = get()
        set({
          apiKey: state.apiKey,
          textApiUrl: state.textApiUrl,
          imageApiUrl: state.imageApiUrl,
          textModel: getValidTextModel(state.textModel),
          imageModel: getValidImageModel(state.imageModel),
          visionModel: getValidVisionModel(state.visionModel),
          requestTimeout: state.requestTimeout,
          autoSaveDraft: state.autoSaveDraft,
        })
      },
    }),
    {
      name: 'douyin-workbench-storage',
      partialize: (state) => ({
        apiKey: state.apiKey,
        textApiUrl: state.textApiUrl,
        imageApiUrl: state.imageApiUrl,
        textModel: getValidTextModel(state.textModel),
        imageModel: getValidImageModel(state.imageModel),
        visionModel: getValidVisionModel(state.visionModel),
        requestTimeout: state.requestTimeout,
        autoSaveDraft: state.autoSaveDraft,
        selectedPlatform: state.selectedPlatform,
        selectedStyle: state.selectedStyle,
      }),
    }
  )
)