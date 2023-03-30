import { useAppSelector } from './app/hooks'
import { Canvas, Header } from './components'
import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom'
import CameraAdd from './components/Cameras/CameraAdd'
import CameraSettingsRouter from './components/AppRouter/CameraSettingsRouter'

function App() {

  const addCameraModal = useAppSelector(state => state.addCameraModal.opened)

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        {addCameraModal &&
          <CameraAdd />
        }
        <main className="content">
          <Canvas />
        </main>
        <footer>
          <CameraSettingsRouter />
        </footer>
      </BrowserRouter>
    </div >
  )
}

export default App
