import { FormEvent, useState, useEffect } from 'react'
import { Input } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import './CameraSettings.scss'
import { updateCameraAction } from '../../store/cameraReducer'
import { updateSelectedCamera } from '../../store/cameraSelectionReducer'
import { useLocation } from 'react-router-dom'
import ZonesList from './ZonesList'

export default function CameraSettings() {

  const [cameraName, setCameraName] = useState<string>('')
  const [cameraLink, setCameraLink] = useState<string>('')
  const [onError, setOnError] = useState<boolean>(false)

  const itemID = useLocation().pathname.replace(/\D/g, "")

  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)
  const cameraArray = useAppSelector(state => state.cameraArray.cameraArray)

  const dispatch = useAppDispatch()

  const updateCameraInfo = (e: FormEvent,name: string, link: string) => {
    e.preventDefault()

    if (cameraName === '') {
      setOnError(true)
      return
    }

    if ((cameraName === selectedCamera.name) && (cameraLink === selectedCamera.link)) {
      setOnError(true)
      return
    }

    const newCameraObject = {
      id: selectedCamera.id,
      name: name,
      link: link
    }
    
    console.log(newCameraObject)
    
    dispatch(updateCameraAction(newCameraObject))
    dispatch(updateSelectedCamera(newCameraObject))
  }

  const isCurrentCamera = () => {
    if (selectedCamera.id === undefined || selectedCamera.id !== itemID) {
      dispatch(updateSelectedCamera(cameraArray.find((item: any) => {
        if (item.id === Number(itemID)) {
          setCameraName(item.name)
          setCameraLink(item.link)
          return item.id === Number(itemID)         
        }
      })))
    }
  }

  const blinkingPlacholder = () => {
    let blink: any

    if (onError) {
       blink = setInterval(() => {
        setOnError(false)
      }, 200)
    }

    return () => {
      clearInterval(blink)
    }

  }

  useEffect(() => {
    isCurrentCamera()
  }, [selectedCamera.name, selectedCamera.link])

  useEffect(() => {
    blinkingPlacholder()
  }, [onError])

  return selectedCamera.id !== undefined ? (
    <div className="camera-settings__container">
      <div className="camera-settings__title">{selectedCamera.name}</div>
      <div className="camera-settings__content">
        <form className="camera-settings__form">
          <div>
            <div>Имя</div>
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
        <div className="camera-settings__buttons">
          <button 
            type="submit"
            onClick={(e: FormEvent) => updateCameraInfo(e, cameraName, cameraLink)}
          >
              Сохранить
          </button>
        </div>
        </form>
        <div className="camera-settings__underline"></div>

        <ZonesList />

      </div>
    </div>
  )
  :
  (
    <div className="camera-settings__container">
      <div className="camera-settings__title">Камеры не существует.</div>
    </div>
  )
}
