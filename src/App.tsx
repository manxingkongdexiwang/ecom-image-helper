import { useEffect } from 'react'
import { Header } from './components/Header'
import { HomePage } from './pages/HomePage'
import { TasksPage } from './pages/TasksPage'
import { ResultsPage } from './pages/ResultsPage'
import { TemplatesPage } from './pages/TemplatesPage'
import { SettingsPage } from './pages/SettingsPage'
import { useAppStore } from './store/appStore'

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

const DEFAULT_TEXT_MODEL = 'deepseek-v4-pro-260425';
const DEFAULT_IMAGE_MODEL = 'doubao-seedream-4-5-251128';
const DEFAULT_VISION_MODEL = 'doubao-seed-1-6-flash-250828';

function App() {
  const { currentPage, setTextModel, setImageModel, setVisionModel } = useAppStore()

  useEffect(() => {
    try {
      const storageData = localStorage.getItem('douyin-workbench-storage');
      if (storageData) {
        const data = JSON.parse(storageData);
        const state = data.state || data;
        
        let needUpdate = false;
        const oldTextModel = state.textModel;
        const oldImageModel = state.imageModel;
        const oldVisionModel = state.visionModel;
        
        if (state.textModel && !VALID_TEXT_MODELS.includes(state.textModel)) {
          state.textModel = DEFAULT_TEXT_MODEL;
          needUpdate = true;
        }
        if (state.imageModel && !VALID_IMAGE_MODELS.includes(state.imageModel)) {
          state.imageModel = DEFAULT_IMAGE_MODEL;
          needUpdate = true;
        }
        if (state.visionModel && !VALID_VISION_MODELS.includes(state.visionModel)) {
          state.visionModel = DEFAULT_VISION_MODEL;
          needUpdate = true;
        }
        
        if (state.textModel !== DEFAULT_TEXT_MODEL) {
          state.textModel = DEFAULT_TEXT_MODEL;
          needUpdate = true;
        }
        if (state.imageModel !== DEFAULT_IMAGE_MODEL) {
          state.imageModel = DEFAULT_IMAGE_MODEL;
          needUpdate = true;
        }
        
        if (needUpdate) {
          localStorage.setItem('douyin-workbench-storage', JSON.stringify({ state }));
          console.log('已重置模型配置为默认值');
          console.log('旧配置:', { textModel: oldTextModel, imageModel: oldImageModel, visionModel: oldVisionModel });
          console.log('新配置:', { textModel: state.textModel, imageModel: state.imageModel, visionModel: state.visionModel });
        }
      }
    } catch (e) {
      console.warn('检查配置时出错:', e);
    }
  }, []);

  useEffect(() => {
    setTextModel(DEFAULT_TEXT_MODEL);
    setImageModel(DEFAULT_IMAGE_MODEL);
    setVisionModel(DEFAULT_VISION_MODEL);
  }, [setTextModel, setImageModel, setVisionModel]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />
      case 'tasks':
        return <TasksPage />
      case 'results':
        return <ResultsPage />
      case 'templates':
        return <TemplatesPage />
      case 'settings':
        return <SettingsPage />
      default:
        return <HomePage />
    }
  }

  return (
    <div className="min-h-screen bg-bg-primary">
      <Header />
      <main className="pt-20 px-6 pb-12 max-w-[1920px] mx-auto">
        {renderPage()}
      </main>
    </div>
  )
}

export default App