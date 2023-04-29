import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { ICamera, ICameraAreas } from "../../models/ICamera"
import { serverUrl } from "../../server-info"

const initialState = {
  cameraArray: [] as ICamera[],
  error: '',
  isLoading: false
}

const cameraSlice = createSlice({
  name: "camera",
  initialState,
  reducers: {
    addCamera(state, action: PayloadAction<any>) {
      state.cameraArray = [...state.cameraArray, action.payload]
    },
    removeCamera(state, action: PayloadAction<number | null>) {
      state.cameraArray = [...state.cameraArray.filter((camera: any) => camera.id !== action.payload)]
    },
    updateCamera(state, action: PayloadAction<any>) {
      state.cameraArray = state.cameraArray.map((item: any) => {
        if (item.id !== action.payload.id) {
          return item
        }


        return {
          ...item,
          ...action.payload
        }
      })
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchCameras.fulfilled.type, (state, action: PayloadAction<any>) => {
      action.payload.forEach((item: any) => {
        item.areas = JSON.parse(item.areas)
      })
      state.cameraArray = [...action.payload]
      state.isLoading = false
      state.error = ''
    }),
      builder.addCase(fetchCameras.pending.type, (state) => {
        state.isLoading = true
        state.error = ''
      })
    builder.addCase(fetchCameras.rejected.type, (state, action: PayloadAction<string>) => {
      state.isLoading = false
      state.error = action.payload
    })
  }
})

export const fetchCameras = createAsyncThunk(
  'cameras/getCameras',
  async (_, thinkAPI) => {
    try {
      const response = await axios.get<ICamera[]>(`${serverUrl}/get/cameras`)
      return response.data
    } catch (error) {
      return thinkAPI.rejectWithValue("Нет подключения к серверу")
    }
  }
)

export const { addCamera, removeCamera, updateCamera } = cameraSlice.actions
export default cameraSlice.reducer

