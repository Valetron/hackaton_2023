import { Routes, Route } from 'react-router-dom'
import NavHeader from '../Header/NavHeader'
import { NavHeaderRoutes } from './routes'

interface NavHeaderRouterProps {
  showMenu: () => void
}

export default function NavHeaderRouter({ showMenu }: NavHeaderRouterProps) {
  return (
    <Routes>
      {NavHeaderRoutes.map((item: any, index: number) => (
        <Route
          key={index}
          path={item.path}
          element={
            <NavHeader
              title={item.title}
              showMenu={showMenu}
            />
          }
        />
      ))}
    </Routes>
  )
}
