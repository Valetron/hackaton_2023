import { useEffect, useRef } from "react";
import { Circle } from "react-konva";
import { ShapePoint } from "./Canvas";


export default function Anchor({ x, y }: ShapePoint) {

  const circleRef = useRef(null)

  const mouseOut = () => {
    if (circleRef.current !== null) {
      //@ts-ignore
      console.log(circleRef.current.setStrokeWidth(2))
    }
  }

  const mouseOn = () => {
    if (circleRef.current !== null) {
      //@ts-ignore
      console.log(circleRef.current.setStrokeWidth(4))
    }
  }

  const mouseMove = () => {
    console.log(x)
    console.log(y)
  }

  return (
    <Circle
      ref={circleRef}
      x={x} y={y}
      radius={20}
      stroke={'#666'}
      fill={'#ddd'}
      strokeWidth={2}
      draggable={true}
      onMouseMove={mouseMove}
      onMouseOut={mouseOut}
      onMouseOver={mouseOn}
    />
  )
}

// МНЕ НУЖНО СОЗДАТЬ НОВЫЙ МАССИВ ДЛЯ ТОЧЕК ЧТОБЫ ПЕРЕЗАПИСАТЬ СТАРЫЙ ВУХУ
