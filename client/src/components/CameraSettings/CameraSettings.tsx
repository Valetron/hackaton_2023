import { FormEvent, useState, useEffect } from 'react'
import { Input } from '@chakra-ui/react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { ICamera } from '../../models/ICamera'
import { updateCamera } from '../../store/Reducers/cameraReducer'
import { updateSelectedCamera } from '../../store/Reducers/cameraSelectionReducer'
import { useLocation, useNavigate } from 'react-router-dom'
import ZonesList from './ZonesList'
import CameraSettingsButtons from './Buttons'
import './CameraSettings.scss'
import axios from 'axios'
import { serverUrl } from '../../server-info'

export default function CameraSettings() {

  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)
  const cameraArray = useAppSelector(state => state.cameraArray)

  const [cameraName, setCameraName] = useState<string>('')
  const [cameraLink, setCameraLink] = useState<string>('')
  const [period, setPeriod] = useState<number | null>(null)
  const [onError, setOnError] = useState<boolean>(false)
  const [isLoading, setLoading] = useState<boolean>(false)

  const navigate = useNavigate()

  const itemID = useLocation().pathname.replace(/\D/g, "")


  const dispatch = useAppDispatch()

  const updateCameraInfo = (e: FormEvent, name: string, link: string) => {
    e.preventDefault()

    if (cameraName === '') {
      setOnError(true)
      return
    }


    if ((cameraName === selectedCamera?.name) && (cameraLink === selectedCamera?.link) && (period === selectedCamera?.processDelay)) {
      setOnError(true)
      return
    }

    const newCameraObject = {
      ...selectedCamera,
      name: name,
      link: link,
      processDelay: period
    }

    axios.post(`${serverUrl}/post/modify/camera`, JSON.stringify({
      id: selectedCamera.id,
      name: name,
      link: link,
      processDelay: period
    }))

    dispatch(updateCamera(newCameraObject))
    dispatch(updateSelectedCamera(newCameraObject))
  }

  const isCurrentCamera = () => {

    if (selectedCamera !== undefined) {
      console.log('123')
      setCameraName(selectedCamera.name)
      setCameraLink(selectedCamera.link)
      setPeriod(selectedCamera.processDelay)

    }

    if (selectedCamera?.id === undefined || selectedCamera?.id === null || selectedCamera?.id !== Number(itemID)) {


      const updatedCamera = cameraArray.cameraArray.find((item: any) => {
        if (item.id === Number(itemID)) {
          setCameraName(item.name)
          setCameraLink(item.link)
          setPeriod(item.processDelay)
          return item.id === Number(itemID)
        }
      }) as ICamera

      dispatch(updateSelectedCamera(updatedCamera))
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
    if (cameraArray.isLoading) {
      navigate('/cameras')
    }
  }, [selectedCamera, cameraArray.isLoading, isLoading])

  useEffect(() => {
    blinkingPlacholder()
  }, [onError])

  return selectedCamera?.id !== undefined ? (
    <div className="camera-settings__container">
      <div className="camera-settings__title">{selectedCamera.name}</div>
      <div className="camera-settings__content">
        <form className="camera-settings__form">
          <div>
            <div>Имя</div>
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
            <div>Период обработки</div>
            <input type="numeric" value={Number(period)} onChange={(e) => setPeriod(Number(e.target.value))} />
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

        {selectedCamera.areas.length !== 0 &&
          <>
            <ZonesList />
            <div className="camera-settings__underline"></div>
          </>
        }

        <CameraSettingsButtons />


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
