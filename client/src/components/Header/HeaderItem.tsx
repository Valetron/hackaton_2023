import { useEffect } from "react"
import { Link } from "react-router-dom"

interface HeaderItemProps {
  name: string
  iconName: string
  link: string
}

export default function HeaderItem({ name, iconName, link }: HeaderItemProps) {

  /*
useEffect(() => {

      const blinkRed = setInterval(() => {
        console.log('red')
        if (item !== null) {
          item.style.borderColor = 'red'
        }
      }, 500)
  
      const blinkBlue = setInterval(() => {
        console.log('blue')
        if (item !== null) {
          item.style.borderColor = 'blue'
        }
      }, 1000)
  
      return () => {
        clearInterval(blinkRed)
        clearInterval(blinkBlue)
      }
    }, [])
    */

  return (
      <Link className="nav__item" to={link}>
         <div className="nav__item-icon">
           <i className={iconName}></i>
         </div>
         <div className="nav__title">
           {name}
         </div>
      </Link>
  )
}
