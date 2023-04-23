import { configureStore } from "@reduxjs/toolkit";
<<<<<<< HEAD
import { cameraReducer } from "./cameraReducer";
import { addCameraModal } from "./cameraAddReducer";
import { currentCamera } from "./cameraSelectionReducer";
=======
import cameraSlice from "./Reducers/cameraReducer";
import addCameraModal from './Reducers/cameraAddReducer'
import currentCamera from "./Reducers/cameraSelectionReducer";
import canvasSlice from './Reducers/CanvasReducer'
>>>>>>> c05aadf... finished canvas + added server post new area

export const store = configureStore({
  reducer: {
    cameraArray: cameraReducer,
    addCameraModal: addCameraModal,
<<<<<<< HEAD
    currentCamera: currentCamera
=======
    currentCamera: currentCamera,
    canvasActiveAdding: canvasSlice
>>>>>>> c05aadf... finished canvas + added server post new area
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
