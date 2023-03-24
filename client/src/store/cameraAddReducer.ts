const initialState = {
  opened: false
}

const OPEN_MODAL = "OPEN_MODAL"

export const addCameraModal = (state = initialState, action: any) => {
  switch (action.type) {
    case OPEN_MODAL:
      return { ...state, opened: action.payload }
    default:
      return state
  }
}

export const openAddCameraModalAction = (payload: Object) => ({ type: OPEN_MODAL, payload })
