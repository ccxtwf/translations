import {
    SEARCH_SONGS_WITH_COUNT_SUCCESS,
    SEARCH_SONGS_WITH_COUNT_FAILURE,
    SEARCH_SONGS_WITH_COUNT_LOADING
  } from "../actions/actionTypes";
  import { Song } from "../../entity";
  import { UnknownAction } from "redux";
  
  interface state {
    songs: Song[]
    isLoading: boolean
  }
  
  const initialState: state = {
    songs: [],
    isLoading: false
  }
  
  export default function songsReducer(state:state=initialState, action: UnknownAction): state {
    switch (action.type) {
      case SEARCH_SONGS_WITH_COUNT_SUCCESS:
        return { 
          ...state, 
          songs: (action.payload as Song[])
        }
      case SEARCH_SONGS_WITH_COUNT_FAILURE:
        return { ...state, songs: [] }
      case SEARCH_SONGS_WITH_COUNT_LOADING:
        return { ...state, isLoading: action.payload as boolean}
    }
    return state;
  }