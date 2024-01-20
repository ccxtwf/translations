import { configureStore } from '@reduxjs/toolkit';

import datasourceReducer from "./reducers/datasourceReducer";
import synthsReducer from "./reducers/synthsReducer";
import vocalistsReducer from "./reducers/vocalistsReducer";
import producersReducer from "./reducers/producersReducer";
import circlesReducer from "./reducers/circlesReducer";
import songsReducer from "./reducers/songsReducer";
import searchReducer from "./reducers/searchReducer";

import {
  FETCH_SYNTHS_WITH_COUNT_SUCCESS,
  FETCH_SYNTHS_WITH_COUNT_FAILURE,
  FETCH_SYNTHS_WITH_COUNT_LOADING,
  FETCH_PRODUCERS_WITH_COUNT_SUCCESS,
  FETCH_PRODUCERS_WITH_COUNT_FAILURE,
  FETCH_PRODUCERS_WITH_COUNT_LOADING,
  FETCH_VOCALISTS_WITH_COUNT_SUCCESS,
  FETCH_VOCALISTS_WITH_COUNT_FAILURE,
  FETCH_VOCALISTS_WITH_COUNT_LOADING,
  FETCH_CIRCLES_WITH_COUNT_SUCCESS,
  FETCH_CIRCLES_WITH_COUNT_FAILURE,
  FETCH_CIRCLES_WITH_COUNT_LOADING,
  FETCH_SONGS_WITH_COUNT_SUCCESS,
  FETCH_SONGS_WITH_COUNT_FAILURE,
  FETCH_SONGS_WITH_COUNT_LOADING,
  SEARCH_SONGS_WITH_COUNT_SUCCESS,
  SEARCH_SONGS_WITH_COUNT_FAILURE,
  SEARCH_SONGS_WITH_COUNT_LOADING
} from "./actions/actionTypes";

const store = configureStore({
  reducer: {
    datasource: datasourceReducer,
    synths: synthsReducer,
    vocalists: vocalistsReducer,
    producers: producersReducer,
    circles: circlesReducer,
    songs: songsReducer,
    search: searchReducer
  },
  middleware: (getDefaultMiddleware) =>
  getDefaultMiddleware({
    serializableCheck: {
      // Ignore these action types
      ignoredActions: [
        FETCH_SYNTHS_WITH_COUNT_SUCCESS,
        FETCH_SYNTHS_WITH_COUNT_FAILURE,
        FETCH_SYNTHS_WITH_COUNT_LOADING,
        FETCH_PRODUCERS_WITH_COUNT_SUCCESS,
        FETCH_PRODUCERS_WITH_COUNT_FAILURE,
        FETCH_PRODUCERS_WITH_COUNT_LOADING,
        FETCH_VOCALISTS_WITH_COUNT_SUCCESS,
        FETCH_VOCALISTS_WITH_COUNT_FAILURE,
        FETCH_VOCALISTS_WITH_COUNT_LOADING,
        FETCH_CIRCLES_WITH_COUNT_SUCCESS,
        FETCH_CIRCLES_WITH_COUNT_FAILURE,
        FETCH_CIRCLES_WITH_COUNT_LOADING,
        FETCH_SONGS_WITH_COUNT_SUCCESS,
        FETCH_SONGS_WITH_COUNT_FAILURE,
        FETCH_SONGS_WITH_COUNT_LOADING,
        SEARCH_SONGS_WITH_COUNT_SUCCESS,
        SEARCH_SONGS_WITH_COUNT_FAILURE,
        SEARCH_SONGS_WITH_COUNT_LOADING
      ],
      ignoredPaths: [
        "synths.synths",
        "vocalists.vocalists",
        "producers.producers",
        "circles.circles",
        "songs.songs",
        "search.songs"
      ]
    },
  }
  )
});

export default store;