import { useEffect, useRef, useState } from "react"
import { pureStreamUrl, NNStreamUrl } from "../../server-info"
import '../CanvasSelection/CanvasSelection.scss'


export default function Video() {
  const [src, setSrc] = useState<string>('')
  const [counter, setCounter] = useState<number>(0)
  const [NNStream, setNNStream] = useState<boolean>()

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef(canvasRef.current?.getContext('2d'))

  /*
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
  */

  return (
    <>
      <button style={{
        position: 'absolute',
        top: '2rem',
        right: '2rem'
      }}
        onClick={() => {setNNStream((prev) => !prev)}}
      >{NNStream ? "Включить обычный поток" : "Включить обработанный поток"}</button>
      <img src={NNStream ? NNStreamUrl : pureStreamUrl} id="video"/>
    </>
  )
}
