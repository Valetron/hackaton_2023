import { useEffect } from "react"
import { useAppDispatch, useAppSelector } from "../../app/hooks"
import CameraItem from "./CameraItem"
import { CamerasObjectArray } from '../../store/cameraReducer'
import './Cameras.scss'



export default function CamerasList() {

  const cameraArray = useAppSelector(state => state.cameraArray.cameraArray)
  const dispatch = useAppDispatch()

  useEffect(() => {

  },[])

  return(
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
  )
}
