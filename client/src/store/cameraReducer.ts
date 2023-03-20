export interface AreasPoints {
  x: number
  y: number
} 

export interface CamerasAreas {
  name: string
  points: Array<AreasPoints>
}

export interface CamerasObjectArray {
  id: number
  name: string
  areas: Array<CamerasAreas>
  link: string
}

const initialState = {
  cameraArray: [
    {
      id: 1,
      name: 'Cam1',
      areas: [
        [
          {
            name: "Area1",
            points: [
              {x: 1, y:1}, 
              {x: 2, y:2}, 
              {x: 3, y:3}, 
              {x: 4, y:4}
            ]
          },
          {
            name: "Area2",
            points: [
              {x: 1, y:1}, 
              {x: 2, y:2}, 
              {x: 3, y:3}, 
              {x: 4, y:4}
            ]
          }
        ]
      ],
      link: 'none'
    },
    {
      id: 2,
      name: 'Cam2',
      areas: [],
      link: 'none'
    }
  ]
}

const ADD_CAMERA = "ADD_CAMERA"
const REMOVE_CAMERA = "REMOVE_CAMERA"
const UPDATE_CAMERA = "UPDATE_CAMERA"

export const cameraReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_CAMERA:
      return { ...state, cameraArray: [...state.cameraArray, action.payload] }
    case REMOVE_CAMERA:
      //return { ...state, cameraArray: state.cameraArray.filter((camera: CamerasObjectArray) => camera.id !== action.payload) }
    case UPDATE_CAMERA:
      return { ...state, cameraArray: state.cameraArray.map((item) => {
    if (item.id !== action.payload.id) {
      return item
    }

    // Otherwise, this is the one we want - return an updated value
    return {
      ...item,
      ...action.payload
    }
  })
    }
    default:
      return state
  }
}

export const addCameraAction = (payload: Object) => ({ type: ADD_CAMERA, payload })
export const removeCameraAction = (payload: Object) => ({ type: REMOVE_CAMERA, payload })
export const updateCameraAction = (payload: Object) => ({ type: UPDATE_CAMERA, payload })
