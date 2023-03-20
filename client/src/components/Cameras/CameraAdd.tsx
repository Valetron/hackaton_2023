import { useEffect, useState } from 'react'
import { Input } from '@chakra-ui/react'
import { useAppDispatch } from '../../app/hooks'
import { openAddCameraModalAction } from '../../store/cameraAddReducer'
import { addCameraAction } from '../../store/cameraReducer'

export default function CameraAdd() {

  const [cameraName, setCameraName] = useState<string>('')
  const [cameraLink, setCameraLink] = useState<string>('')
  const [onError, setError] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const closeWindow = () => {
    dispatch(openAddCameraModalAction(false))
  }

  const addCameraHandler = (name: string, link: string) => {

    if (name === '') {
      setError(true)
      return
    }

    dispatch(addCameraAction({
      name: name,
      link: link
    }))
    closeWindow()
  }

  const blinkingPlaceholder = () => {
    let blink: any

    if (onError) {
       blink = setInterval(() => {
        setError(false)
      }, 200)
    }

    return () => {
      clearInterval(blink)
    }

  }

  useEffect(() => {
    blinkingPlaceholder()
  }, [onError])


  return (
    <div className="camera-add__container" >
      <div className="camera-add__background">

      </div>
      <div className="camera-add__item">
        <div className="camera-add__item__title">
          Добавить камеру
        </div>
        <form className="camera-add__item__form">
          <div>
            <div >Имя</div>
            <Input 
              maxLength={20}
              placeholder="Название камеры" value={cameraName} onChange={(e) => setCameraName(e.target.value)}
              _placeholder={{ color: `${onError ? 'red' : ''}`}}
              />
          </div>
          <div>
            <div>Ссылка</div>
            <Input placeholder="Ссылка на камеру" value={cameraLink} onChange={(e) => setCameraLink(e.target.value)} />
          </div>
        </form>
        <div className="camera-add__item__buttons">
          <button
            onClick={closeWindow}
          >Отмена</button>
          <button 
            onClick={() => addCameraHandler(cameraName, cameraLink)}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}
