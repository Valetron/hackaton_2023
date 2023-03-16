import { RouteObject } from 'react-router-dom'
import { CAMERAS_ROUTE, HOME_ROUTE } from './utils/consts'
import CamerasList from '../Cameras/CamerasList';
import HeaderList from '../Header/HeaderList';
import NavHeader from '../Header/NavHeader';

export const NavbarRoutes: RouteObject[] = [
  {
    path: HOME_ROUTE,
    element: <HeaderList />
  },
  {
    path: CAMERAS_ROUTE,
    element: <CamerasList />
  }
]

export const NavHeaderRoutes = [
  {
    path: HOME_ROUTE,
    title: ""
  },
  {
    path: CAMERAS_ROUTE,
    title: "Камеры" 
  }
]
