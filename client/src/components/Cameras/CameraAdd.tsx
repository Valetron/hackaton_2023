import { useEffect, useState } from 'react'
import { Input } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { openAddCameraModal } from '../../store/Reducers/cameraAddReducer'
import { addCamera } from '../../store/Reducers/cameraReducer'
import { serverUrl } from '../../server-info'
import axios from 'axios'
import { openCanvas } from '../../store/Reducers/cameraSelectionReducer'

export default function CameraAdd() {

  const cameras = useAppSelector(state => state.cameraArray.cameraArray)
  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)

  const [cameraName, setCameraName] = useState<string>('')
  const [cameraLink, setCameraLink] = useState<string>('')
  const [cameraProcessDelay, setCameraProcessDelay] = useState<number>(5)
  const [onError, setError] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const closeWindow = () => {
    cameras.map((item: any) => item.id === selectedCamera.id ?
      item.openedCanvas === true ? dispatch(openCanvas()) : null : null
    )
    dispatch(openAddCameraModal(false))
  }

  const addCameraHandler = async (name: string, link: string) => {
    if (name === '') {
      setError(true)
      return
    }

    const newPostCamera = {
      name: name,
      link: link,
      areas: JSON.stringify([]),
      processDelay: cameraProcessDelay,
    }

    try {
      const response = await axios.post(`${serverUrl}/post/camera`, JSON.stringify(newPostCamera))

      const newCameraObject = {
        ...response.data,
        areas: JSON.parse(response.data.areas),
        openedCanvas: false
      }

      console.log(newCameraObject)

      dispatch(addCamera(newCameraObject))
    } catch (err) {
      console.log(err)
    }

    closeWindow()
    cameras.map((item: any) => item.id === selectedCamera.id ?
      item.openedCanvas === true ? dispatch(openCanvas()) : null : null
    )
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
              _placeholder={{ color: `${onError ? 'red' : ''}` }}
            />
          </div>
          <div>
            <div>Ссылка</div>
            <Input placeholder="Ссылка на камеру" value={cameraLink} onChange={(e) => setCameraLink(e.target.value)} />
          </div>
          <div>
            <div>Интервал обработки</div>
            <Input placeholder={`По умолчанию ${cameraProcessDelay}`} value={cameraProcessDelay} onChange={(e) => setCameraProcessDelay(Number(e.target.value))} />
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
