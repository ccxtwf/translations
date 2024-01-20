import {
  FETCH_SONGS_WITH_COUNT_SUCCESS,
  FETCH_SONGS_WITH_COUNT_FAILURE,
  FETCH_SONGS_WITH_COUNT_LOADING
} from "../actions/actionTypes";
import { Song } from "../../entity";
import { UnknownAction } from "redux";

interface state {
  songs: Song[]
  count: number
  isLoading: boolean
}

const initialState: state = {
  songs: [],
  count: 0,
  isLoading: false
}

interface payloadFetched {
  songs: Song[]
  count: number
}

export default function songsReducer(state:state=initialState, action: UnknownAction): state {
  switch (action.type) {
    case FETCH_SONGS_WITH_COUNT_SUCCESS:
      return { 
        ...state, 
        songs: ((action.payload as payloadFetched).songs as Song[]), 
        count: ((action.payload as payloadFetched).count as number) 
      }
    case FETCH_SONGS_WITH_COUNT_FAILURE:
      return { ...state, songs: [] }
    case FETCH_SONGS_WITH_COUNT_LOADING:
      return { ...state, isLoading: action.payload as boolean}
  }
  return state;
}