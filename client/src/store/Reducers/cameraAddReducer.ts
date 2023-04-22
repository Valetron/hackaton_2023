import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  openedAddArea: false,
  openedAddCamera: false
}

const addCameraModal = createSlice({
  name: "cameraOpenModal",
  initialState,
  reducers: {
    openAddCameraModal(state, action: PayloadAction<boolean>) {
      state.openedAddCamera = action.payload
    },
    openAddAreaModal(state, action: PayloadAction<boolean>) {
      state.openedAddArea = action.payload
    }
  }
})

export const { openAddCameraModal, openAddAreaModal } = addCameraModal.actions
export default addCameraModal.reducer
