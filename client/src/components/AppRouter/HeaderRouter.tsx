import { Routes, Route } from 'react-router-dom'
import { NavbarRoutes } from './routes'


export default function HeaderRouter() {
  return (
    <Routes>
      {NavbarRoutes.map((item: any, index: number) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Routes>
  )
}
