import { useRef, useEffect, useState } from 'react'

const CanvasSelection = () => {
  const [activeSelect, setActiveSelect] = useState<boolean>(false)

  const [successAdd, setSuccessAdd] = useState<boolean>(false)

  const [posted, setPosted] = useState<boolean>(false)

  const [shapesList, setShapesList] = useState<Array<any>>([])

  const canvasRef = useRef<HTMLCanvasElement>(null)
  const ctxRef = useRef(canvasRef.current?.getContext('2d'))

  let currentPoints: any = []
  let clicked = false
  let moved = false
  let startX: number;
  let startY: number;
  let numOfClicks: number = 0
  let mouseX: number;
  let mouseY: number;

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

  const mouseDown = function(event: MouseEvent) {
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
      ctxRef.current.fillStyle = "red"
      console.log('cl')
      ctxRef.current.fillRect(
        startX - 4,
        startY - 4,
        8,
        8,
      )
    }
    else if (currentPoints.length !== 0 && currentPoints.length !== 4) {
      startX = parseInt((event.clientX - canvBounds.left).toString());
      startY = parseInt((event.clientY - canvBounds.top).toString());
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
      currentPoints.push({
        x: startX, y: startY,
        dist: Math.sqrt(Math.pow((currentPoints[0].x - startX), 2) + Math.pow((currentPoints[0].y - startY), 2))
      })

      ctxRef.current.fillStyle = "red"
      ctxRef.current.fillRect(
        startX - 4,
        startY - 4,
        8,
        8,
      )
      if (currentPoints.length === 4) {
        setShapesList((prev) => [...prev, currentPoints])
      }
    }
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

    ctxRef.current.beginPath()
    ctxRef.current.strokeStyle = 'red'
    ctxRef.current.lineWidth = 5
    ctxRef.current.moveTo(currentPoints[currentPoints.length - 1].x, currentPoints[currentPoints.length - 1].y)
    ctxRef.current.lineTo(mouseX, mouseY)
    //  ctxRef.current.stroke()
    //!!  сюда дописать линию, чтобы после точки тянулась до новой, придумать потом как чистить канвас и рисовать новый ыыыыы
  }

  const draw_shapes = (ctx: any) => {
    if (canvasRef.current == null) return
    if (ctxRef.current == null) return
    ctxRef.current.strokeStyle = 'green'
    ctxRef.current.lineWidth = 7
    ctx.strokeRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    ctx.beginPath()
    for (let i = 0; i < shapesList.length; ++i) {
      for (let j = 0; j < shapesList[i].length; j++) {
        ctx.strokeStyle = 'red';
        ctx.lineWidth = 5
        ctxRef.current.moveTo(shapesList[i][j].x, shapesList[i][j].y)
        if (j === shapesList[i].length - 1)
          ctxRef.current.lineTo(shapesList[i][0].x, shapesList[i][0].y)
        else
          ctxRef.current.lineTo(shapesList[i][j + 1].x, shapesList[i][j + 1].y)

      }
      ctxRef.current.stroke()
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
    draw_shapes(ctxRef.current)
  }, [shapesList])

  // add zone callback
  /*
  const addZone = (title: string, isRest: boolean) => {
    const newArea =
    {
    }
    fetch('http://localhost:8080/Zones', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newArea)
    })
    setPosted(true)
    moved = false
    clicked = false
    currentPoints = []
    setSuccessAdd(false)
  }

  */

  return (
    <>
      <canvas ref={canvasRef} id="canvas" width={clientWidthRef.current * 0.55} height={600} className={`h-[600px] z-[2020] fixed top-[50%] translate-y-[-50%]`} />
    </>
  )
}

export default CanvasSelection
