import { Route, Routes } from "react-router-dom";
import { CameraSettingsRoutes } from "./routes";

export default function CameraSettingsRouter() {

  return (
    <Routes>
      {CameraSettingsRoutes.map((item: any, index: number) => (
        <Route key={index} path={item.path} element={item.element} />
      ))}
    </Routes>
  )
}
