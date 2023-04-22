import { Input } from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { useAppDispatch } from "../../app/hooks"
import { openAddAreaModal } from "../../store/Reducers/cameraAddReducer"
import './CanvasSelection.scss'

interface AreaAddProps {
  onPress: (title: string) => void
}

export default function AreaAdd({ onPress }: AreaAddProps) {

  const [areaName, setAreaName] = useState<string>('')
  const [onError, setError] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const closeWindow = () => {
    dispatch(openAddAreaModal(false))
  }

  const blinkingPlaceholder = () => {
    let blink: any

    if (onError) {
      blink = setInterval(() => {
        setError(false)
      }, 200)
    }

    return () => {
      clearInterval(blink)
    }
  }

  const submitAdding = (title: string) => {
    if (areaName === '') {
      setError(true)
      return
    }

    onPress(title)
  }

  useEffect(() => {
    blinkingPlaceholder()
  }, [onError])


  return (
    <div className="canvas-add__container" >
      <div className="canvas-add__background">

      </div>
      <div className="canvas-add__item">
        <div className="canvas-add__item__title">
          Добавить зону
        </div>
        <form className="canvas-add__item__form">
          <div>
            <div>Имя</div>
            <Input
              maxLength={20}
              placeholder="Название зоны" value={areaName} onChange={(e) => setAreaName(e.target.value)}
              _placeholder={{ color: `${onError ? 'red' : ''}` }}
            />
          </div>
        </form>
        <div className="canvas-add__item__buttons">
          <button
            onClick={closeWindow}
          >Отмена</button>
          <button
            onClick={() => submitAdding(areaName)}
          >
            Добавить
          </button>
        </div>
      </div>
    </div>
  )
}

