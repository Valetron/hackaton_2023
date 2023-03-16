import { configureStore } from "@reduxjs/toolkit";
import { cameraReducer } from "./cameraReducer";

export const store = configureStore({
  reducer: {
    cameraArray: cameraReducer
  }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
