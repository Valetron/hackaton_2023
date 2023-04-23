import { useAppDispatch, useAppSelector } from './app/hooks'
import { Header } from './components'
import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom'
import CameraAdd from './components/Cameras/CameraAdd'
import CameraSettingsRouter from './components/AppRouter/CameraSettingsRouter'

function App() {

<<<<<<< HEAD
  const addCameraModal = useAppSelector(state => state.addCameraModal.opened)
=======
  const { openedAddCamera } = useAppSelector(state => state.addCameraModal)
  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)
>>>>>>> c05aadf... finished canvas + added server post new area

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {addCameraModal &&
          <CameraAdd />
        }
        <main className="content">
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
