import {
  FETCH_SYNTHS_WITH_COUNT_SUCCESS, 
  FETCH_SYNTHS_WITH_COUNT_FAILURE,
  FETCH_SYNTHS_WITH_COUNT_LOADING
} from "../actions/actionTypes";
import { SynthWithCount } from "../../entity";
import { UnknownAction } from "redux";

interface state {
  synths: SynthWithCount[]
  isLoading: boolean
}

const initialState: state = {
  synths: [],
  isLoading: false
}

export default function synthsReducer(state:state=initialState, action: UnknownAction): state {
  switch (action.type) {
    case FETCH_SYNTHS_WITH_COUNT_SUCCESS:
      return { ...state, synths: action.payload as SynthWithCount[] }
    case FETCH_SYNTHS_WITH_COUNT_FAILURE:
      return { ...state, synths: [] }
    case FETCH_SYNTHS_WITH_COUNT_LOADING:
      return { ...state, isLoading: action.payload as boolean }
  }
  return state;
}