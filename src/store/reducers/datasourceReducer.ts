import {
  SETUP_DATABASE_SUCCESS,
  SETUP_DATABASE_FAILURE,
  SETUP_DATABASE_LOADING
} from "../actions/actionTypes";
import { DataSource } from "typeorm/browser";
import { UnknownAction } from "redux";

interface state {
  datasource: DataSource | null
  isLoading: boolean
}

const initialState: state = {
  datasource: null,
  isLoading: false
}

export default function datasourceReducer(state:state=initialState, action: UnknownAction): state {
  switch (action.type) {
    case SETUP_DATABASE_SUCCESS:
      return { ...state, datasource: action.payload as DataSource }
    case SETUP_DATABASE_FAILURE:
      return { ...state, datasource: null }
    case SETUP_DATABASE_LOADING:
      return { ...state, isLoading: action.payload as boolean}
  }
  return state;
}