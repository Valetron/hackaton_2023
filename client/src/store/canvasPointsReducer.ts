const initialState = {
  currentPoints: [] as any
}

const UPDATE_CANVAS_POINTS = 'UPDATE_CANVAS_POINTS'

export const canvasPoints = (state = initialState, action: any) => {
  switch (action.type) {
    case UPDATE_CANVAS_POINTS:
      return { ...state, currentPoints: [...state.currentPoints, action.payload] }
    default:
      return state
  }
}

export const addNewPoint = (payload: Object) => ({ type: UPDATE_CANVAS_POINTS, payload })
