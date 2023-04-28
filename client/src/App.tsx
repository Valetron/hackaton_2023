import { useAppSelector } from './app/hooks'
import { Header } from './components'
import './styles/main.scss'
import CanvasSelection from './components/CanvasSelection/CanvasSelection'
import { BrowserRouter } from 'react-router-dom'
import CameraAdd from './components/Cameras/CameraAdd'
import CameraSettingsRouter from './components/AppRouter/CameraSettingsRouter'
import Video from './components/Video/Video'

function App() {

  const { openedAddCamera } = useAppSelector(state => state.addCameraModal)
  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {openedAddCamera &&
          <CameraAdd />
        }
        <main className="content">
          {selectedCamera !== undefined && selectedCamera.id !== null ? <Video /> : null}
          {selectedCamera !== undefined ? selectedCamera.openedCanvas && <CanvasSelection /> : null}
        </main>
        <footer>
          <CameraSettingsRouter />
        </footer>
      </BrowserRouter>
    </div >
  )
}

export default App

