interface CamerasZones {
  x: number,
  y: number
}

export interface CamerasObjectArray {
  id: number,
  name: string,
  areas: Array<CamerasZones>,
  link: string
}

const initialState = {
  cameraArray: [
    {
      id: 1,
      name: 'Cam1',
      areas: [],
      link: 'none'
    }
  ]
}

const ADD_CAMERA = "ADD_CAMERA"
const REMOVE_CAMERA = "REMOVE_CAMERA"

export const cameraReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_CAMERA:
      return { ...state, cameraArray: [...state.cameraArray, action.payload] }
    case REMOVE_CAMERA:
      return { ...state, cameraArray: state.cameraArray.filter((camera: CamerasObjectArray) => camera.id !== action.payload) }
    default:
      return state
  }
}

export const addCameraAction = (payload: Object) => ({ type: ADD_CAMERA, payload })
export const removeCameraAction = (payload: Object) => ({ type: REMOVE_CAMERA, payload })
