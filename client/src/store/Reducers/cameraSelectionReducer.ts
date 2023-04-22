import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  selectedCamera: {
    id: null,
    name: '',
    link: '',
    areas: [] as any,
    processDelay: 0,
    openedCanvas: false
  } 
}

const currentCamera = createSlice({
  name: "currentCamera",
  initialState,
  reducers: {
    updateSelectedCamera(state, action: PayloadAction<any>) {
      state.selectedCamera = action.payload
    },
    removeSelectedCamera(state) {
      state.selectedCamera = initialState.selectedCamera
    },
    closeCanvas(state) {
      state.selectedCamera.openedCanvas = false
    },
    openCanvas(state) {
      state.selectedCamera.openedCanvas = true
    }
  }
})

export const { updateSelectedCamera, removeSelectedCamera, closeCanvas, openCanvas } = currentCamera.actions
export default currentCamera.reducer

