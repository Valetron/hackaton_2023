import { useAppDispatch, useAppSelector } from './app/hooks'
import { addCameraAction } from './store/cameraReducer'
import { Header } from './components'
import './styles/main.scss'
import { BrowserRouter } from 'react-router-dom'

function App() {

  const cameraArray = useAppSelector(state => state.cameraArray.cameraArray)
  const dispatch = useAppDispatch()

  const addCamera = (name: string, link: string) => {
    dispatch(addCameraAction({ name: name, link: link }))
  }

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    </div >
  )
}

export default App
