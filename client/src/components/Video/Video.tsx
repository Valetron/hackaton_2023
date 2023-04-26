import { useEffect, useRef, useState } from "react"
import '../CanvasSelection/CanvasSelection.scss'


export default function Video() {
  const [src, setSrc] = useState<string>('')
  const [counter, setCounter] = useState<number>(0)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef(canvasRef.current?.getContext('2d'))

  const drawImage = () => {
    let image = new Image(1920, 1080)
    image.src = src
    ctxRef.current = canvasRef.current?.getContext('2d')
    setTimeout(() => {
      if (canvasRef.current !== null)
        ctxRef.current?.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height)
    }, 31)
  }

  useEffect(() => {
     const interval = setInterval(() => {
      setCounter((prev) => prev + 1);
    }, 31);
    setSrc(`../../public/${counter}.jpg`)
    drawImage()

    return () => {
      clearInterval(interval);
    };
  }, [src, counter])

  return (
    <>
      <img src={src} id="canvas"/>
    </>
  )
}
