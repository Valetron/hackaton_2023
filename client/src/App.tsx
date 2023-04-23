import { useAppSelector } from './app/hooks'
import { Header } from './components'
import './styles/main.scss'
import CanvasSelection from './components/CanvasSelection/CanvasSelection'
import { BrowserRouter } from 'react-router-dom'
import CameraAdd from './components/Cameras/CameraAdd'
import CameraSettingsRouter from './components/AppRouter/CameraSettingsRouter'

function App() {

  const { openedAddCamera } = useAppSelector(state => state.addCameraModal)

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {openedAddCamera &&
          <CameraAdd />
        }
        <main className="content">
        </main>
        <footer>
          <CameraSettingsRouter />
        </footer>
      </BrowserRouter>
    </div >
  )
}

export default App
