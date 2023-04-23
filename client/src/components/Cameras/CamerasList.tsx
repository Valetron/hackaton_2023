import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CameraItem from "./CameraItem"
import { ICamera } from "../../models/ICamera"
import { fetchCameras } from '../../store/Reducers/cameraReducer'
import './Cameras.scss'
import { openAddCameraModal } from "../../store/Reducers/cameraAddReducer"
import { closeCanvas, updateSelectedCamera } from "../../store/Reducers/cameraSelectionReducer"
import { useNavigate } from "react-router-dom"
import { useLocation } from "react-router-dom"



export default function CamerasList() {

  const cameraArray = useAppSelector(state => state.cameraArray.cameraArray)
  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)
  const dispatch = useAppDispatch()


  const navigate = useNavigate()

  const itemID = useLocation().pathname.replace(/\D/g, "")

  const addCameraOpen = () => {
    if (selectedCamera.openedCanvas) {
      dispatch(closeCanvas())
    }
    dispatch(openAddCameraModal(true))
  }

  const selectCameraHandler = (item: ICamera) => {
    dispatch(updateSelectedCamera({ ...item }))
    navigate(`${item.id}`)
  }

  useEffect(() => {
    dispatch(fetchCameras())
  }, [])

  return (
    <div className="camera__container">
      <ul className="camera__list">
        {cameraArray.map(
          (item: ICamera, index: number) => (
            <CameraItem
              key={index}
              name={item.name}
              onPress={() => selectCameraHandler(item)}
              isSelected={selectedCamera?.id === item.id}
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
