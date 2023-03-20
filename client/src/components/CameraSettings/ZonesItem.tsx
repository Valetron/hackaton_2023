interface ZoneProps {
  name: string
  onPress: () => void
  isSelected?: boolean
}

export default function ZonesItem({ name, onPress, isSelected }: ZoneProps) {
  return (
    <div className={`zone__item ${isSelected ? 'zone__item__selected' : ''}`} onClick={onPress}>
      <div className="zone__title">
        {name}
      </div>
      <div className="zone__icons">
        <i className="uil uil-setting"></i>
        <i className="uil uil-trash"></i>
      </div>
    </div>
  )
}
