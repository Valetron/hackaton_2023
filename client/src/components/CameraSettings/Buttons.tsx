import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { removeCameraAction } from "../../store/cameraReducer"
import { updateSelectedCamera } from "../../store/cameraSelectionReducer"



export default function CameraSettingsButtons() {

  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)

  const dispatch = useAppDispatch()


  const addNewZoneHandler = () => {

  }

  const deleteCameraHandler = () => {
    dispatch(removeCameraAction(selectedCamera.id))
    dispatch(updateSelectedCamera({}))

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