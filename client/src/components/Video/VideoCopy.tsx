import { useEffect, useRef, useState } from "react"
import '../CanvasSelection/CanvasSelection.scss'


export default function Video() {
  const [src, setSrc] = useState<string>('')
  const [counter, setCounter] = useState<number>(0)

  useEffect(() => {
     const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 125);
    setSrc(`../../public/exp/labels/vidos_${counter}.png`)

    return () => {
      clearInterval(interval);
    };
  }, [src,counter])

  return (
    <>
      <img src={src} id="canvas"/>
    </>
  )
}
