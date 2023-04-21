import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { removeCamera, updateCamera } from "../../store/Reducers/cameraReducer"
import { removeSelectedCamera } from "../../store/Reducers/cameraSelectionReducer"



export default function CameraSettingsButtons() {

  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  /*
  const addNewAreaHandler = () => {

    const newArea = {

    }

    const newCamera = {
      ...selectedCamera,
      areas: [
        ...selectedCamera.areas,

      ]
    }

    // dispatch(updateCamera({
    //   ...selectedCamera
    // }))
  }
  */

  const deleteCameraHandler = () => {
    dispatch(removeCamera(selectedCamera.id))
    
    dispatch(removeSelectedCamera())
    navigate('/cameras')
  }

  return (
    <div className="cameras-settings__buttons">
      <button className="cameras-settings__button-item">Добавить зону</button>
      {selectedCamera.areas.length !== 0 &&
        <button className="cameras-settings__button-item">Скрыть зоны</button>
      }
      <button className="cameras-settings__button-item remove-button" onClick={deleteCameraHandler}>Удалить камеру</button>
    </div>
  )
}
