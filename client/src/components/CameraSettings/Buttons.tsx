import { useNavigate } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import { removeCamera, updateCamera } from "../../store/Reducers/cameraReducer"
import { removeSelectedCamera, updateSelectedCamera } from "../../store/Reducers/cameraSelectionReducer"
import { startAddingToCamera, stopAddingToCamera } from "../../store/Reducers/CanvasReducer"

export default function CameraSettingsButtons() {

  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)
  const activeAdding = useAppSelector(state => state.canvasActiveAdding.activeAdding)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const openCanvasHandler = () => {

    dispatch(updateSelectedCamera(
      {
        ...selectedCamera,
        openedCanvas: true
      }
    ))

    dispatch(startAddingToCamera(selectedCamera.id))
  }

  const hideOrRevealAreasHandler = () => {

    if (selectedCamera.openedCanvas) {
      dispatch(updateSelectedCamera(
        {
          ...selectedCamera,
          openedCanvas: false
        }
      ))
    } else {
      dispatch(updateSelectedCamera(
        {
          ...selectedCamera,
          openedCanvas: true
        }
      ))
    }

  }

  /*

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
      <button className="cameras-settings__button-item" 
        onClick={openCanvasHandler}
        disabled={activeAdding}
      >
        Добавить зону
      </button>
      {selectedCamera.areas.length !== 0 &&
        <button className="cameras-settings__button-item" onClick={hideOrRevealAreasHandler}>
          { selectedCamera.openedCanvas ? "Скрыть зоны" : "Показать зоны" }
        </button>
      }
      <button className="cameras-settings__button-item remove-button" onClick={deleteCameraHandler}>Удалить камеру</button>
    </div>
  )
}
