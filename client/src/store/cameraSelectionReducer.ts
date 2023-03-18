
const initialState = {
  selectedCamera: {}
}

const UPDATE_SELECTED_CAMERA = 'UPDATE_SELECTED_CAMERA'

export const currentCamera = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_SELECTED_CAMERA:
      return { ...state, selectedCamera: { ...action.payload } }
    default:
      return state
  }
}

export const updateSelectedCamera = (payload: Object) => ({ type: UPDATE_SELECTED_CAMERA, payload })
