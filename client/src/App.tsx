import { useAppDispatch, useAppSelector } from './app/hooks'
import { addCameraAction } from './store/cameraReducer'
import { Header } from './components'
import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom'
import CameraAdd from './components/Cameras/CameraAdd'

function App() {

  const addCameraModal = useAppSelector(state => state.addCameraModal.opened)
  const dispatch = useAppDispatch()

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {addCameraModal &&
          <CameraAdd />
        }
      </BrowserRouter>
    </div >
  )
}

export default App
