import { useEffect } from "react"
import { useAppSelector } from "../../app/hooks"
import ZonesItem from "./ZonesItem"


export default function ZonesList() {

  const areas = useAppSelector(state => state.currentCamera.selectedCamera.areas)

  useEffect(() => {

  }, [areas])

  return (
    <ul className="zone__list">
      {areas.map((areaObj: any, index: number) => (
        <ZonesItem key={index} name={areaObj.name} onPress={() => { }} />
      ))
      }
    </ul>
  )
  // доделать чтобы если зон нет ул вообще не рисовался, чтобы было смещение по флекс гроу, если появились зоны ( у кнопок)
}
