interface CameraItemProps {
  name: string
  onPress: () => void
}


export default function CameraItem({ name, onPress }: CameraItemProps) {
  return (
    <div className="camera__item" onClick={onPress}>
      <div className="camera__title">
        {name}
      </div>
    </div>
  )
}
