interface CameraItemProps {
  name: string
}


export default function CameraItem({ name }: CameraItemProps) {
  return (
    <div className="camera__item">
      <div className="camera__title">
        {name}
      </div>
      <div className="camera__item-icon">
        <i className="uil uil-setting"></i>
      </div>
    </div>
  )
}
