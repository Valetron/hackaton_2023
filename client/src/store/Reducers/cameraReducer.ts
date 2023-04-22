import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios"
import { ICamera } from "../../models/ICamera"
import { serverUrl } from "../../server-info"

const initialState = {
  cameraArray: [
    {
      id: 1,
      name: 'Cam1',
      areas: [
        {
          name: "Area1",
          points: [
            { x: 100, y: 100 },
            { x: 200, y: 200 },
            { x: 300, y: 300 },
            { x: 400, y: 400 }
          ]
        },
      ],
      link: 'none',
      processDelay: 5,
      openedCanvas: true
    },
    {
      id: 2,
      name: 'Cam2',
      areas: [],
      link: 'none',
      processDelay: 5,
      openedCanvas: false
    }
  ],
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
      state.cameraArray = state.cameraArray.map((item) => {
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
      state.cameraArray = [...state.cameraArray, ...action.payload]
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

