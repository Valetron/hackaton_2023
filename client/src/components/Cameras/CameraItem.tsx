interface CameraItemProps {
  name: string
  onPress: () => void
  isSelected?: boolean
}


export default function CameraItem({ name, onPress, isSelected }: CameraItemProps) {
  return (
    <div className={`camera__item ${isSelected ? 'camera__item__selected' : ''}`} onClick={onPress}>
      <div className="camera__title">
        {name}
      </div>
    </div>
  )
}
