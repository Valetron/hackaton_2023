import { createSlice, PayloadAction } from "@reduxjs/toolkit"

const initialState = {
  opened: false
}

const addCameraModal = createSlice({
  name: "cameraOpenModal",
  initialState,
  reducers: {
    openAddCameraModal(state, action: PayloadAction<boolean>) {
      state.opened = action.payload
    }
  }
})

export const { openAddCameraModal } = addCameraModal.actions
export default addCameraModal.reducer
