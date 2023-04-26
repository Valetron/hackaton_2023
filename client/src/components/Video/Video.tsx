import { useEffect, useRef, useState } from "react"
import '../CanvasSelection/CanvasSelection.scss'


export default function Video() {
  const [time, setTime] = useState<any>(Date.now())

  const source = '../../public/exp/labels/vidos.png'

  useEffect(() => {
     const interval = setInterval(() => {
      console.log('rerender')
      setTime(Date.now())
    }, 40);

    return () => {
      clearInterval(interval);
    };
  }, [])

  return (
    <>
      <img src={source} id="canvas"/>
    </>
  )
}
