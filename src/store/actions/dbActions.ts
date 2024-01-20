import {
  SETUP_DATABASE_SUCCESS,
  SETUP_DATABASE_FAILURE,
  SETUP_DATABASE_LOADING
} from "./actionTypes";

import sqliteUrl from "../../assets/sql-wasm.wasm?url";
import dbUrl from "../../assets/tl.db?url";

import { DataSource } from "typeorm/browser";
import { Action, ActionCreator, Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as wSQL from "sql.js/dist/sql-wasm";
(window as any).SQL = wSQL;

import { 
  CircleWithCount, ProducerWithCount, SynthWithCount, SongRelation,
  Song, Sub,
  SongToSinger, SongToProducer, SongToCircle,
  _Synth, _Producer
} from "../../entity";

interface stateInterface {
  datasource: {
    datasource: DataSource | null
    isLoading: boolean
  }
}

const setupDatabaseSuccess: ActionCreator<Action> = (data: DataSource) => {
  return {
    type: SETUP_DATABASE_SUCCESS,
    payload: data
  }
}
const setupDatabaseFailure: ActionCreator<Action> = () => {
  return {
    type: SETUP_DATABASE_FAILURE
  }
}
const setupDatabaseLoading: ActionCreator<Action> = (isLoading: boolean) => {
  return {
    type: SETUP_DATABASE_LOADING,
    payload: isLoading
  }
}
export const setupDatabase: ActionCreator<ThunkAction<void, stateInterface, void, any>> = () => {
  return async (dispatch: Dispatch<Action>) => {
    dispatch(setupDatabaseLoading(true));
    try {
      // console.log(dbUrl);
      const buf = await fetch(dbUrl).then(res => res.arrayBuffer());
      const dbRaw = new Uint8Array(buf);
      // console.log(dbRaw);
      const ds = new DataSource({
        type: 'sqljs',
        database: dbRaw,
        sqlJsConfig: { locateFile: () => sqliteUrl },
        entities: [
          CircleWithCount, ProducerWithCount, SynthWithCount, SongRelation,
          Song, Sub,
          SongToSinger, SongToProducer, SongToCircle,
          _Synth, _Producer
        ],
        autoSave: false,
        cache: true
      });
      await ds.initialize();
      dispatch(setupDatabaseSuccess(ds));
    } catch(err) {
      dispatch(setupDatabaseFailure());
      console.error(err);
    } finally {
      dispatch(setupDatabaseLoading(false));
    }
  }
}