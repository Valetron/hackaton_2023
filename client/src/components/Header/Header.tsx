import { useState } from 'react'
import './Header.scss'
import HeaderRouter from '../AppRouter/HeaderRouter'
import NavHeaderRouter from '../AppRouter/NavHeaderRouter'

export default function Header() {

  const [ menu, setMenu ] = useState<boolean>(false)
  const [clicked, setClicked] = useState<boolean>(false)

  const showMenu = () => {
    if (menu) 
      setClicked(true)
    else
      setClicked(false)
    setMenu((prev) => !prev)
  }
  

  return (
    <header>
        <nav className={`nav ${menu ? 'closed' : 'opened'} ${clicked ? 'animate' : ''}`}>
           <NavHeaderRouter showMenu={showMenu}/>
           <div className={`nav__content ${menu ? 'hide-items' : 'show-items'}`}>
              <HeaderRouter />
              <div className="nav__version">ver 0.1</div>
           </div>
        </nav>
    </header>
  )
}

/*
*/
