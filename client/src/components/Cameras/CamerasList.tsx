import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CameraItem from "./CameraItem"
import { CamerasObjectArray } from '../../store/cameraReducer'
import './Cameras.scss'
import { openAddCameraModalAction } from "../../store/cameraAddReducer"
import { updateSelectedCamera } from "../../store/cameraSelectionReducer"
import { useNavigate } from "react-router-dom"



export default function CamerasList() {

  const cameraArray = useAppSelector(state => state.cameraArray.cameraArray)
  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)
  const dispatch = useAppDispatch()


  const navigate = useNavigate()

  const addCameraOpen = () => {
    dispatch(openAddCameraModalAction({ opened: true }))
  }

  const selectCameraHandler = (item: CamerasObjectArray) => {
      dispatch(updateSelectedCamera({ ...item }))
      navigate(`${item.id}`)
  }

  useEffect(() => {
    if (selectedCamera.id !== undefined) {

    }
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
              isSelected={selectedCamera.id === item.id}
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
