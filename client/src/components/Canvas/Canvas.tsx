import { useEffect, useRef, useState } from 'react'
import { Stage, Layer, Rect, Shape, Line } from 'react-konva'
import Anchor from './Anchor'
import './Canvas.scss'

interface DimensionObject {
  width: number
  height: number
}

interface ShapeObject {
  name: string
  points: Array<ShapePoint>
  type: string
}

export interface ShapePoint {
  x: any
  y: any
}

export default function Canvas() {

  // start config
  const defaultWidth: number = 100
  const defaultHeight: number = 100


  const defaultShape =  
    {
      name: "Zone1",
      points:
      [
        {
          x: 10,
          y: 10,
        },
        {
          x: 100,
          y: 10,
        },
        {
          x: 10,
          y: 100
        },
        {
          x: 100,
          y: 100
        }
      ],
      type: "Restricted"
    }
    
  
  // end config

  const parentRef = useRef(null) as any
  const [dimensions, setDimensions] = useState<DimensionObject>({
    width: 0,
    height: 0
  })
  const [shapes, setShapes] = useState<Array<ShapeObject>>([defaultShape])

  const updateLine = () => {


  }

  useEffect(() => {
    if (parentRef.current?.offsetHeight && parentRef.current?.offsetWidth) {
      setDimensions({
        width: parentRef.current.offsetWidth,
        height: parentRef.current.offsetHeight
      })
    }
  },[])

  return (
    <div ref={parentRef} className="canvas__wrapper">
      <Stage width={dimensions.width} height={dimensions.height}>
        <Layer>
          {
            shapes.map((item: ShapeObject) => 
            item.points.map((point: ShapePoint) => (
            <Anchor x={point.x} y={point.y}/>
            )))
          }
          {
            shapes.map((item: ShapeObject) => 
              <Line />
            )
          }
        </Layer>
      </Stage>
    </div>
  )

}
