import { configureStore } from "@reduxjs/toolkit";
import { cameraReducer } from "./cameraReducer";
import { addCameraModal } from "./cameraAddReducer";
import { currentCamera } from "./cameraSelectionReducer";
import { canvasPoints } from "./canvasPointsReducer";

export const store = configureStore({
  reducer: {
    cameraArray: cameraReducer,
    addCameraModal: addCameraModal,
    currentCamera: currentCamera,
    canvasPoints: canvasPoints
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
