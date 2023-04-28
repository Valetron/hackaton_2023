import axios from 'axios'
import { useRef, useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { serverUrl } from '../../server-info'
import { openAddAreaModal } from '../../store/Reducers/cameraAddReducer'
import { updateCamera } from '../../store/Reducers/cameraReducer'
import { updateSelectedCamera } from '../../store/Reducers/cameraSelectionReducer'
import { stopAddingToCamera } from '../../store/Reducers/CanvasReducer'
import AreaAdd from './AreaAdd'
import './CanvasSelection.scss'

const CanvasSelection = () => {

  const selectedCamera = useAppSelector(state => state.currentCamera.selectedCamera)
  const openedAddArea = useAppSelector(state => state.addCameraModal.openedAddArea)
  const activeSelection = useAppSelector(state => state.canvasActiveAdding)

  const dispatch = useAppDispatch()

  const EXP_RATE = 20

  const [endSelection, setEndSelection] = useState<boolean>(false)
  const [startLoading, setStartLoading] = useState<boolean>(false)

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef(canvasRef.current?.getContext('2d'))

  let shapesList: any = []

  let currentPoints: any = []
  let clicked: boolean = false
  let moved: boolean = false
  let connectWithStart: boolean = false
  let startX: number;
  let startY: number;
  let mouseX: number;
  let mouseY: number;

  const pointsRef = useRef<Array<any>>([...currentPoints])
  const shapesListRef = useRef<Array<any>>(shapesList)

  const mouseDown = function(event: MouseEvent) {
    if (!activeSelection.activeAdding) {
      return
    }

    if (endSelection) {
      return
    }

    const canvBounds: any = canvasRef.current?.getBoundingClientRect();
    if (canvBounds == undefined) return;
    if (ctxRef.current == null) return;
    if (canvasRef.current == null) return;

    clicked = true
    if (currentPoints.length === 0) {
      startX = parseInt((event.clientX - canvBounds.left).toString());
      startY = parseInt((event.clientY - canvBounds.top).toString());
      currentPoints.push({
        x: startX, y: startY,
        dist: 0
      })
    }

    else if (currentPoints.length !== 0) {
      startX = parseInt((event.clientX - canvBounds.left).toString());
      startY = parseInt((event.clientY - canvBounds.top).toString());

      if (connectWithStart) {
        currentPoints.push({
          x: currentPoints[0].x, y: currentPoints[0].y,
          dist: 0
        })
        connectWithStart = false
        setEndSelection(true)
        pointsRef.current = currentPoints
      } else {
        currentPoints.push({
          x: startX, y: startY,
          dist: Math.sqrt(Math.pow((currentPoints[0].x - startX), 2) + Math.pow((currentPoints[0].y - startY), 2))
        })
      }

    }
    shapesListRef.current = [...shapesList, currentPoints]
    event.preventDefault();
  }

  const mouseUp = function(event: MouseEvent) {
    event.preventDefault()
    if (clicked && moved) {
      moved = false
      clicked = false
    }
  }

  const mouseOut = function(event: MouseEvent) {
    event.preventDefault()
    if (clicked) {
      clicked = false
      mouseUp(event)
    }
  }

  const mouseMove = function(event: MouseEvent) {
    event.preventDefault()
    const canvBounds = canvasRef.current?.getBoundingClientRect();
    if (canvBounds == undefined) return
    if (ctxRef.current == null) return
    mouseX = parseInt((event.clientX - canvBounds.left).toString())
    mouseY = parseInt((event.clientY - canvBounds.top).toString())

    if (currentPoints.length > 2) {
      if (Math.abs(mouseX - currentPoints[0].x) < EXP_RATE && Math.abs(mouseY - currentPoints[0].y) < EXP_RATE) {
        ctxRef.current.fillStyle = 'yellow'
        ctxRef.current.fillRect(currentPoints[0].x - 4, currentPoints[0].y - 4, 8, 8)
        ctxRef.current.fill()
        connectWithStart = true
      } else {
        connectWithStart = false
      }
    }

    ctxRef.current.beginPath()
    ctxRef.current.strokeStyle = '#FCA311'
    ctxRef.current.lineWidth = 5
    if (currentPoints.length > 0)
      ctxRef.current.moveTo(currentPoints[currentPoints.length - 1].x, currentPoints[currentPoints.length - 1].y)
    ctxRef.current.lineTo(mouseX, mouseY)
    if (canvasRef.current !== null)
      ctxRef.current.clearRect(1, 1, canvasRef.current.width, canvasRef.current.height)
    ctxRef.current?.stroke()
    draw_shapes(ctxRef.current)
  }

  const draw_shapes = (ctx: any) => {
    if (canvasRef.current == null) return
    if (ctxRef.current == null) return
    ctxRef.current.strokeStyle = 'green'
    ctxRef.current.lineWidth = 7
    ctx.strokeRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.beginPath()

    // Draw all shapes
    for (let i = 0; i < shapesList.length; ++i) {
      for (let j = 0; j < shapesList[i].length; j++) {
        ctx.strokeStyle = '#FCA311';
        ctx.lineWidth = 5
        ctxRef.current.fillStyle = '#FCA311'
        ctxRef.current.moveTo(shapesList[i][j].x, shapesList[i][j].y)
        ctxRef.current.arc(shapesList[i][j].x, shapesList[i][j].y, 5, 0, 2 * Math.PI)
        ctxRef.current.fill()
        if (j === shapesList[i].length - 1)
          ctxRef.current.lineTo(shapesList[i][0].x, shapesList[i][0].y)
        else
          ctxRef.current.lineTo(shapesList[i][j + 1].x, shapesList[i][j + 1].y)
      }
      ctxRef.current.stroke()
    }

    // Draw last shape

    // Draw lines between current points
    if (currentPoints.length > 0) {
      for (let i = 0; i < currentPoints.length - 1; ++i) {
        ctx.strokeStyle = '#FCA311'
        ctx.lineWidth = 5
        ctxRef.current.moveTo(currentPoints[i].x, currentPoints[i].y)
        ctxRef.current.lineTo(currentPoints[i + 1].x, currentPoints[i + 1].y)
        ctxRef.current.stroke()
      }
    }

    // Draw start connection point
    ctxRef.current.fillStyle = 'yellow'
    if (connectWithStart) {
      ctxRef.current.fillRect(
        currentPoints[0].x - 5,
        currentPoints[0].y - 5,
        10,
        10
      )
    }
  }

  const clientWidthRef = useRef(window.innerWidth)

  useEffect(() => {

    if (canvasRef.current == null) return;
    canvasRef.current.onmousedown = mouseDown
    canvasRef.current.onmouseup = mouseUp
    canvasRef.current.onmousemove = mouseMove
    canvasRef.current.onmouseout = mouseOut
    ctxRef.current = canvasRef.current?.getContext('2d')
    if (ctxRef.current == null) return;
    ctxRef.current.clearRect(1, 1, canvasRef.current.width, canvasRef.current.height)
    ctxRef.current.beginPath()


    setStartLoading(true)

    let shapesPoints: any = []
    for (let i = 0; i < selectedCamera.areas.length; ++i) {
      shapesPoints.push(selectedCamera.areas[i].points)
    }

    shapesList = [...shapesPoints, ...shapesListRef.current]
    shapesListRef.current = []
    console.log(selectedCamera.areas)

    draw_shapes(ctxRef.current)

  }, [startLoading, endSelection, activeSelection.activeAdding])

  // add zone callback


  const confirmAdding = () => {
    dispatch(openAddAreaModal(true))
    currentPoints = []
  }

  const onSubmitAdding = async (title: string) => {

    const cameraWithNewArea = {
      ...selectedCamera,
      areas: [
        ...selectedCamera.areas,
        {
          name: title,
          points: pointsRef.current
        }
      ]
    }

    try {
      const newObjectToPost = {
        id: selectedCamera.id,
        areas: JSON.stringify(cameraWithNewArea.areas)
      }

      await axios.post(`${serverUrl}/post/newArea`, JSON.stringify(newObjectToPost))

    } catch (error) {
      console.log(error)
    }

    setEndSelection(false)
    dispatch(updateSelectedCamera(cameraWithNewArea))
    dispatch(updateCamera(cameraWithNewArea))
    dispatch(openAddAreaModal(false))
    dispatch(stopAddingToCamera())
  }

  const cancelAreaAdding = () => {
    shapesList.pop()
    setEndSelection(false)
    dispatch(stopAddingToCamera())
    draw_shapes(ctxRef.current)
  }

  return (
    <>
      {openedAddArea && <AreaAdd onPress={(title) => onSubmitAdding(title)} />}
      <canvas ref={canvasRef} id="canvas" width={1280} height={720}/>
      {endSelection &&
        <div className="canvas__button-div">
          <h2>Добавить зону с текущим рисунком?</h2>
          <button className="canvas__button-item-add" onClick={confirmAdding}>Добавить</button>
          <button className="canvas__button-item-cancel" onClick={cancelAreaAdding}>Отмена</button>
        </div>
      }
    </>
  )
}

export default CanvasSelection

/* EUCLID FOR 4
if (currentPoints.length === 3) {
  let xa = currentPoints[0].x
  let xb = currentPoints[1].x
  let xc = currentPoints[2].x
  let xd = startX
  let ya = currentPoints[0].y
  let yb = currentPoints[1].y
  let yc = currentPoints[2].y
  let yd = startY
  let l = euklidDistance(xc, xb, xa, yc, yb, ya);
  let m = euklidDistance(xd, xb, xa, yd, yb, ya);
  if (l * m < 0) {
    alert('Bad rect')
    return;
  }
  let q, w;
  q = euklidDistance(xa, xc, xb, ya, yc, yb);
  w = euklidDistance(xd, xc, xb, yd, yc, yb);
  if (q * w < 0) {
    alert('Bad rect')
    return;
  }
  let p, r;
  p = euklidDistance(xa, xd, xc, ya, yd, yc);
  r = euklidDistance(xb, xd, xc, yb, yd, yc);
  if (p * r < 0) {
    alert('Bad rect')
    return;
  }
  let j, k;
  j = euklidDistance(xb, xa, xd, yb, ya, yd);
  k = euklidDistance(xc, xa, xd, yc, ya, yd);
  if (j * k < 0) {
    alert('Bad rect')
    return;
  }

}

const isMouseInShape = (x: number, y: number, shape: any) => {
  let shapeLeft = shape.x
  let shapeRigth = shape.x + shape.width
  let shapeTop = shape.y
  let shapeBottom = shape.y + shape.height

  if (x > shapeLeft && x < shapeRigth && y > shapeTop && y < shapeBottom)
    return true

  return false

}

const euklidDistance = (x: number, x0: number, x1: number, y: number, y0: number, y1: number) => {
  return (x - x0) * (y1 - y0) - (y - y0) * (x1 - x0)
}
*/

