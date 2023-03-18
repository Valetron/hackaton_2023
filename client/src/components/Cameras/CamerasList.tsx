import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CameraItem from "./CameraItem"
import { addCameraAction, CamerasObjectArray } from '../../store/cameraReducer'
import './Cameras.scss'
import { openAddCameraModalAction } from "../../store/cameraAddReducer"



export default function CamerasList() {

  const [cameraName, setCameraName] = useState<string>()

  const cameraArray = useAppSelector(state => state.cameraArray.cameraArray)
  const dispatch = useAppDispatch()

  const addCameraHandler = () => {
    dispatch(addCameraAction({
    }))
  }

  const addCameraOpen = () => {
    dispatch(openAddCameraModalAction({opened: true}))
  }

  useEffect(() => {

  }, [])

  return (
    <div className="camera__container">
      <ul className="camera__list">
        {cameraArray.map(
          (item: CamerasObjectArray, index: number) => (
            <CameraItem
              key={index}
              name={item.name}
            />
          ))
        }
      </ul>
      <div className="camera__add-item">
        <button onClick={addCameraOpen}>Добавить камеру</button>
      </div>
    </div>
  )
}
