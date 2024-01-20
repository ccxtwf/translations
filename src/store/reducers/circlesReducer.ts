import {
  FETCH_CIRCLES_WITH_COUNT_SUCCESS,
  FETCH_CIRCLES_WITH_COUNT_FAILURE,
  FETCH_CIRCLES_WITH_COUNT_LOADING,
} from "../actions/actionTypes";
import { CircleWithCount } from "../../entity";
import { UnknownAction } from "redux";

interface state {
  circles: CircleWithCount[]
  isLoading: boolean
}

const initialState: state = {
  circles: [],
  isLoading: false
}

export default function circlesReducer(state:state=initialState, action: UnknownAction): state {
  switch (action.type) {
    case FETCH_CIRCLES_WITH_COUNT_SUCCESS:
      return { ...state, circles: action.payload as CircleWithCount[] }
    case FETCH_CIRCLES_WITH_COUNT_FAILURE:
      return { ...state, circles: [] }
    case FETCH_CIRCLES_WITH_COUNT_LOADING:
      return { ...state, isLoading: action.payload as boolean}
  }
  return state;
}