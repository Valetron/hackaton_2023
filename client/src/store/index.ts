import { configureStore } from "@reduxjs/toolkit";
import { cameraReducer } from "./cameraReducer";
import { addCameraModal } from "./cameraAddReducer";
import { currentCamera } from "./cameraSelectionReducer";

export const store = configureStore({
  reducer: {
    cameraArray: cameraReducer,
    addCameraModal: addCameraModal,
    currentCamera: currentCamera
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
