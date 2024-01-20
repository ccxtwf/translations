import {
  FETCH_PRODUCERS_WITH_COUNT_SUCCESS,
  FETCH_PRODUCERS_WITH_COUNT_FAILURE,
  FETCH_PRODUCERS_WITH_COUNT_LOADING,
} from "../actions/actionTypes";
import { ProducerWithCount } from "../../entity";
import { UnknownAction } from "redux";

interface state {
  producers: ProducerWithCount[]
  isLoading: boolean
}

const initialState: state = {
  producers: [],
  isLoading: false
}

export default function producersReducer(state:state=initialState, action: UnknownAction): state {
  switch (action.type) {
    case FETCH_PRODUCERS_WITH_COUNT_SUCCESS:
      return { ...state, producers: action.payload as ProducerWithCount[] }
    case FETCH_PRODUCERS_WITH_COUNT_FAILURE:
      return { ...state, producers: [] }
    case FETCH_PRODUCERS_WITH_COUNT_LOADING:
      return { ...state, isLoading: action.payload as boolean }
  }
  return state;
}