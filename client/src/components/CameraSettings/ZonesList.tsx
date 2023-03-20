import { useAppSelector } from "../../app/hooks"
import { CamerasAreas, AreasPoints } from '../../store/cameraReducer'
import ZonesItem from "./ZonesItem"


export default function ZonesList() {

  const areas = useAppSelector(state => state.currentCamera.selectedCamera.areas) 

  return (
    <ul className="zone__list">
      {areas.map((areaObj: Array<CamerasAreas>) => areaObj.map((area: CamerasAreas) => ( 
        <ZonesItem name={area.name} onPress={() => {}}/>
      )))
      }
    </ul>
  )
    // доделать чтобы если зон нет ул вообще не рисовался, чтобы было смещение по флекс гроу, если появились зоны ( у кнопок)
}
