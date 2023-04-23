import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface ICanvasSlice {
  cameraId: number | null
  activeAdding: boolean
}

const initialState = {
  cameraId: null,
  activeAdding: false
} as ICanvasSlice

const canvasSlice = createSlice({
  name: "canvasActiveSelection",
  initialState,
  reducers: {
    startAddingToCamera(state, action: PayloadAction<number | null>) {
      state.cameraId = action.payload
      state.activeAdding = true
    },
    stopAddingToCamera(state) {
      state.cameraId = initialState.cameraId
      state.activeAdding = false
    }
  },
})

export const { startAddingToCamera, stopAddingToCamera } = canvasSlice.actions
export default canvasSlice.reducer

