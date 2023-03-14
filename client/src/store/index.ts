import { combineReducers, createStore } from "redux";

const globalReducer = combineReducers({
  //cameraArray: cameraReducer
})

export const store = createStore(globalReducer)
