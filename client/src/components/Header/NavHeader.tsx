import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { useAppDispatch } from "../../app/hooks"
import { updateSelectedCamera } from "../../store/Reducers/cameraSelectionReducer"

interface NavHeaderProps {
  title: string
  showMenu: () => void
}


export default function NavHeader({ title, showMenu }: NavHeaderProps) {

  const [hide, setHide] = useState<boolean>(false)

  const dispatch = useAppDispatch()

  const navigate = useNavigate()

  const goBack = () => {
    dispatch(updateSelectedCamera(
      {
        id: null,
        name: '',
        link: '',
        areas: [],
        processDelay: null,
        openedCanvas: false,
      }
    ))
    navigate('/')
  }

  const hideElements = () => {
    setHide((prev) => !prev)
    showMenu()
  }

  return (
    <div className="nav__header">
      {title !== "" && !hide &&
        <div className="nav__utils">
          <div className="nav__back" onClick={goBack}>
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="40" viewBox="4 6 24 12" fill="none" stroke="#FCA311" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="feather feather-chevron-left"><polyline points="15 18 9 12 15 6"></polyline>

            </svg>
          </div>
          <div className="nav__title">
            {title}
          </div>
        </div>
      }
      <div className="nav__menu" onClick={hideElements}>
        <svg viewBox="0 0 24 24" width="40" height="40" stroke="#FCA311" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" className="css-i6dzq1">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
      </div>
    </div>
  )
}
