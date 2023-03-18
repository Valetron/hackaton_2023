import { useState } from 'react'
import { Input, InputGroup, InputLeftAddon } from '@chakra-ui/react'

export default function CameraAdd() {

  const [cameraName, setCameraName] = useState<string>('')
  const [cameraLink, setCameraLink] = useState<string>('')

  return (
    <div className="camera-add__container">
      <div className="camera-add__item">
        <div className="camera-add__item__title">
          Добавить камеру
        </div>
        <form className="camera-add__item__form">
            <Input placeholder="Название камеры"/>
            <Input placeholder="Ссылка на камеру"/>
        </form>
        <div className="camera-add__item__buttons">
          <label>Отмена</label>
          <label>Добавить</label>
        </div>
      </div>
    </div>
  )
}
