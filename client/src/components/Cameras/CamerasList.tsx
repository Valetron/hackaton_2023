import { useState, useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CameraItem from "./CameraItem"
import { addCameraAction, CamerasObjectArray } from '../../store/cameraReducer'
import './Cameras.scss'
import { openAddCameraModalAction } from "../../store/cameraAddReducer"
import { updateSelectedCamera } from "../../store/cameraSelectionReducer"



export default function CamerasList() {

  const [cameraName, setCameraName] = useState<string>()

  const cameraArray = useAppSelector(state => state.cameraArray.cameraArray)
  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)
  const dispatch = useAppDispatch()

  const addCameraOpen = () => {
    dispatch(openAddCameraModalAction({ opened: true }))
  }

  const selectCameraHandler = (item: CamerasObjectArray) => {
    dispatch(updateSelectedCamera({ ...item }))
    console.log(selectedCamera)
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
              onPress={() => selectCameraHandler(item)}
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
