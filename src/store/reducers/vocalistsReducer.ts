import {
  FETCH_VOCALISTS_WITH_COUNT_SUCCESS,
  FETCH_VOCALISTS_WITH_COUNT_FAILURE,
  FETCH_VOCALISTS_WITH_COUNT_LOADING,
} from "../actions/actionTypes";
import { ProducerWithCount } from "../../entity";
import { UnknownAction } from "redux";

interface state {
  vocalists: ProducerWithCount[]
  isLoading: boolean
}

const initialState: state = {
  vocalists: [],
  isLoading: false
}

export default function vocalistsReducer(state:state=initialState, action: UnknownAction): state {
  switch (action.type) {
    case FETCH_VOCALISTS_WITH_COUNT_SUCCESS:
      return { ...state, vocalists: action.payload as ProducerWithCount[] }
    case FETCH_VOCALISTS_WITH_COUNT_FAILURE:
      return { ...state, vocalists: [] }
    case FETCH_VOCALISTS_WITH_COUNT_LOADING:
      return { ...state, isLoading: action.payload as boolean }
  }
  return state;
}