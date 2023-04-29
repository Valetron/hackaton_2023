import { configureStore } from "@reduxjs/toolkit";
import cameraSlice from "./Reducers/cameraReducer";
import addCameraModal from './Reducers/cameraAddReducer'
import currentCamera from "./Reducers/cameraSelectionReducer";
import canvasSlice from './Reducers/CanvasReducer'

export const store = configureStore({
  reducer: {
    cameraArray: cameraSlice,
    addCameraModal: addCameraModal,
    currentCamera: currentCamera,
    canvasActiveAdding: canvasSlice
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
