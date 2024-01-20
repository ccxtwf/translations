import { useAsync } from "react-use";
import { DataSource } from "typeorm/browser";

import { 
  CircleWithCount, ProducerWithCount, SynthWithCount, SongRelation,
  Song, Sub,
  SongToSinger, SongToProducer, SongToCircle,
  _Synth, _Producer
} from "../entity";

import initSqlJs from "sql.js";
import { createContext, FunctionComponent, PropsWithChildren, useContext } from "react";

import wasm from "sql.js/dist/sql-wasm.wasm?url";

import dbUrl from "../assets/tl.db?url";

interface DatabaseContextProps {
  AppDataSource: DataSource;
}

const DatabaseContext = createContext<DatabaseContextProps>({
  AppDataSource: {} as DataSource,
});

let AppDataSource: DataSource;
export const DatabaseProvider: FunctionComponent<PropsWithChildren> = ({
  children,
}) => {
  const { value, loading } = useAsync(async () => {
    const buf = await fetch(dbUrl).then(res => res.arrayBuffer());
    const dbRaw = new Uint8Array(buf);
    const SQL = await initSqlJs({
      locateFile: () => wasm,
    });
    AppDataSource = new DataSource({
      type: "sqljs",
      driver: SQL,
      database: dbRaw,
      entities: [
        CircleWithCount, ProducerWithCount, SynthWithCount, SongRelation,
        Song, Sub,
        SongToSinger, SongToProducer, SongToCircle,
        _Synth, _Producer
      ],
      autoSave: false,
      cache: true
    });
    try {
      await AppDataSource.initialize();
      // @ts-ignore
      AppDataSource.driver.databaseConnection.create_function("MATCHES", (t: string, pattern: string) => {
        t = t || '';
        t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        pattern = pattern.replace(/([\\\.\+\*\?\^\$\(\)\[\]\{\}\|\/])/g, '\\$1');
        const re = new RegExp("\\b" + pattern, 'i');
        return (t.match(re) !== null);
      });
    } catch (e) {
      console.error(e);
    }
    console.log("Initialized DB connection");
    return AppDataSource;
  }, []);

  return (
    <DatabaseContext.Provider
      value={{
        AppDataSource: value!,
      }}
    >
      {!loading && children}
    </DatabaseContext.Provider>
  );
};

export const useAppDataSource = () => {
  const { AppDataSource } = useContext(DatabaseContext);
  return AppDataSource;
};

/**
 * Used outside the provider or in functions.
 */
export { AppDataSource };