import { useAppDispatch, useAppSelector } from './app/hooks'
import { addCameraAction } from './store/cameraReducer'
import { Header } from './components'
import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom'
import CameraAdd from './components/Cameras/CameraAdd'

function App() {

  const addCameraModal = useAppSelector(state => state.addCameraModal.opened)
  const dispatch = useAppDispatch()

  const currentCamera = useAppSelector(state => state.currentCamera.selectedCamera)

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {addCameraModal &&
          <CameraAdd />
        }
        <main>
          <div>{currentCamera.name}{currentCamera.link}</div>
        </main>
      </BrowserRouter>
    </div >
  )
}

export default App
