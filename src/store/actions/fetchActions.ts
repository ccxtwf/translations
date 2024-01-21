import "reflect-metadata";

import {
  FETCH_SYNTHS_WITH_COUNT_SUCCESS, 
  FETCH_SYNTHS_WITH_COUNT_FAILURE,
  FETCH_SYNTHS_WITH_COUNT_LOADING,
  FETCH_VOCALISTS_WITH_COUNT_SUCCESS,
  FETCH_VOCALISTS_WITH_COUNT_FAILURE,
  FETCH_VOCALISTS_WITH_COUNT_LOADING,
  FETCH_PRODUCERS_WITH_COUNT_SUCCESS,
  FETCH_PRODUCERS_WITH_COUNT_FAILURE,
  FETCH_PRODUCERS_WITH_COUNT_LOADING,
  FETCH_CIRCLES_WITH_COUNT_SUCCESS,
  FETCH_CIRCLES_WITH_COUNT_FAILURE,
  FETCH_CIRCLES_WITH_COUNT_LOADING,
  FETCH_SONGS_WITH_COUNT_SUCCESS,
  FETCH_SONGS_WITH_COUNT_FAILURE,
  FETCH_SONGS_WITH_COUNT_LOADING,
  SEARCH_SONGS_WITH_COUNT_SUCCESS,
  SEARCH_SONGS_WITH_COUNT_FAILURE,
  SEARCH_SONGS_WITH_COUNT_LOADING
} from "./actionTypes";

import { DataSource } from "typeorm/browser";
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';
import * as entity from "../../entity";
import { FilterSongOptions } from "../../components/types";

interface stateInterface {
  datasource: {
    datasource: DataSource | null
    isLoading: boolean
  }
  synths: {
    synths: entity.SynthWithCount[]
    isLoading: boolean
  }
  vocalists: {
    vocalists: entity.ProducerWithCount[]
    isLoading: boolean
  }
  producers: {
    producers: entity.ProducerWithCount[]
    isLoading: boolean
  }
  circles: {
    circles: entity.CircleWithCount[]
    isLoading: boolean
  }
  songs: {
    songs: entity.Song[]
    isLoading: boolean
  }
}

import { 
  querySynths, queryProducers, queryVocalists, queryCircles, querySongs, querySearchSongs 
} from "./queries";

const fetchSynthsSuccess: ActionCreator<Action> = (data: entity.SynthWithCount[]) => {
  return {
    type: FETCH_SYNTHS_WITH_COUNT_SUCCESS,
    payload: data
  }
}
const fetchSynthsFailure: ActionCreator<Action> = () => {
  return {
    type: FETCH_SYNTHS_WITH_COUNT_FAILURE
  }
}
const fetchSynthsLoading: ActionCreator<Action> = (isLoading: boolean) => {
  return {
    type: FETCH_SYNTHS_WITH_COUNT_LOADING,
    payload: isLoading
  }
}
export const fetchSynths: 
  ActionCreator<ThunkAction<void, stateInterface, void, any>> = 
  (dataSource: DataSource, options: FilterSongOptions) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchSynthsLoading(true));
    try {
      const synths = await querySynths(dataSource, options);
      dispatch(fetchSynthsSuccess(synths));
    } catch(err) {
      dispatch(fetchSynthsFailure());
      console.error(err);
    } finally {
      dispatch(fetchSynthsLoading(false));
    }
  }
}

const fetchVocalistsSuccess: ActionCreator<Action> = (data: entity.ProducerWithCount[]) => {
  return {
    type: FETCH_VOCALISTS_WITH_COUNT_SUCCESS,
    payload: data
  }
}
const fetchVocalistsFailure: ActionCreator<Action> = () => {
  return {
    type: FETCH_VOCALISTS_WITH_COUNT_FAILURE
  }
}
const fetchVocalistsLoading: ActionCreator<Action> = (isLoading: boolean) => {
  return {
    type: FETCH_VOCALISTS_WITH_COUNT_LOADING,
    payload: isLoading
  }
}
export const fetchVocalists: 
  ActionCreator<ThunkAction<void, stateInterface, void, any>> = 
  (dataSource: DataSource, options: FilterSongOptions) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchVocalistsLoading(true));
    try {
      const producers = await queryVocalists(dataSource, options);
      dispatch(fetchVocalistsSuccess(producers));
    } catch(err) {
      dispatch(fetchVocalistsFailure());
      console.error(err);
    } finally {
      dispatch(fetchVocalistsLoading(false));
    }
  }
}


const fetchProducersSuccess: ActionCreator<Action> = (data: entity.ProducerWithCount[]) => {
  return {
    type: FETCH_PRODUCERS_WITH_COUNT_SUCCESS,
    payload: data
  }
}
const fetchProducersFailure: ActionCreator<Action> = () => {
  return {
    type: FETCH_PRODUCERS_WITH_COUNT_FAILURE
  }
}
const fetchProducersLoading: ActionCreator<Action> = (isLoading: boolean) => {
  return {
    type: FETCH_PRODUCERS_WITH_COUNT_LOADING,
    payload: isLoading
  }
}
export const fetchProducers: 
  ActionCreator<ThunkAction<void, stateInterface, void, any>> = 
  (dataSource: DataSource, options: FilterSongOptions) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchProducersLoading(true));
    try {
      const producers = await queryProducers(dataSource, options);
      dispatch(fetchProducersSuccess(producers));
    } catch(err) {
      dispatch(fetchProducersFailure());
      console.error(err);
    } finally {
      dispatch(fetchProducersLoading(false));
    }
  }
}


const fetchCirclesSuccess: ActionCreator<Action> = (data: entity.CircleWithCount[]) => {
  return {
    type: FETCH_CIRCLES_WITH_COUNT_SUCCESS,
    payload: data
  }
}
const fetchCirclesFailure: ActionCreator<Action> = () => {
  return {
    type: FETCH_CIRCLES_WITH_COUNT_FAILURE
  }
}
const fetchCirclesLoading: ActionCreator<Action> = (isLoading: boolean) => {
  return {
    type: FETCH_CIRCLES_WITH_COUNT_LOADING,
    payload: isLoading
  }
}
export const fetchCircles: 
  ActionCreator<ThunkAction<void, stateInterface, void, any>> = 
  (dataSource: DataSource, options: FilterSongOptions) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchCirclesLoading(true));
    try {
      const circles = await queryCircles(dataSource, options);
      dispatch(fetchCirclesSuccess(circles));
    } catch(err) {
      dispatch(fetchCirclesFailure());
      console.error(err);
    } finally {
      dispatch(fetchCirclesLoading(false));
    }
  }
}


const fetchSongsSuccess: ActionCreator<Action> = 
(data: { songs: entity.Song[], count: number }) => {
  return {
    type: FETCH_SONGS_WITH_COUNT_SUCCESS,
    payload: data
  }
}
const fetchSongsFailure: ActionCreator<Action> = () => {
  return {
    type: FETCH_SONGS_WITH_COUNT_FAILURE
  }
}
const fetchSongsLoading: ActionCreator<Action> = (isLoading: boolean) => {
  return {
    type: FETCH_SONGS_WITH_COUNT_LOADING,
    payload: isLoading
  }
}
export const fetchSongs: 
  ActionCreator<ThunkAction<void, stateInterface, void, any>> = 
  (dataSource: DataSource, options) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(fetchSongsLoading(true));
    try {
      const [songs, count] = await querySongs(dataSource, options);
      // console.log(songs, count);
      dispatch(fetchSongsSuccess({songs, count}));
    } catch(err) {
      dispatch(fetchSongsFailure());
      console.error(err);
    } finally {
      dispatch(fetchSongsLoading(false));
    }
  }
}


const searchSongsSuccess: ActionCreator<Action> = 
(data: entity.Song[]) => {
  return {
    type: SEARCH_SONGS_WITH_COUNT_SUCCESS,
    payload: data
  }
}
const searchSongsFailure: ActionCreator<Action> = () => {
  return {
    type: SEARCH_SONGS_WITH_COUNT_FAILURE
  }
}
const searchSongsLoading: ActionCreator<Action> = (isLoading: boolean) => {
  return {
    type: SEARCH_SONGS_WITH_COUNT_LOADING,
    payload: isLoading
  }
}
export const searchSongs: 
  ActionCreator<ThunkAction<void, stateInterface, void, any>> = 
  (dataSource: DataSource, query) => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(searchSongsLoading(true));
    try {
      const songs = await querySearchSongs(dataSource, query);
      dispatch(searchSongsSuccess(songs));
    } catch(err) {
      dispatch(searchSongsFailure());
      console.error(err);
    } finally {
      dispatch(searchSongsLoading(false));
    }
  }
}