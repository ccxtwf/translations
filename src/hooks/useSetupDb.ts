import "reflect-metadata";

import { useState, useEffect } from "react";

// import initSqlJs from "sql.js";
import sqliteUrl from "../assets/sql-wasm.wasm?url";
import dbUrl from "../assets/tl.db?url";

import { DataSource } from "typeorm/browser";

import * as wSQL from "sql.js/dist/sql-wasm";
(window as any).SQL = wSQL;

import { 
  CircleWithCount, ProducerWithCount, SynthWithCount, SongRelation,
  Song, Sub,
  SongToSinger, SongToProducer, SongToCircle,
  _Synth, _Producer
} from "../entity";

export default function useSetupDb() {

  // const [db, setDb] = useState(null);
  const [error, setError] = useState<any>(null);
  const [dataSource, setDataSource] = useState<DataSource | null>(null);

  useEffect(() => {
    (async () => {
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

        // Database Regex Function
        // @ts-ignore
        ds.driver.databaseConnection.create_function("MATCHES", (t: string, pattern: string) => {
          t = t || '';
          t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
          pattern = pattern.replace(/([\\\.\+\*\?\^\$\(\)\[\]\{\}\|\/])/g, '\\$1');
          const re = new RegExp("\\b" + pattern, 'i');
          return (t.match(re) !== null);
        });

        setDataSource(ds);
        console.log("Successfully setup DB connection");

        // Debug: Check connection
        // const SQL = await initSqlJs({
        //   locateFile: () => sqliteUrl
        // });
        // setDb(new SQL.Database(dbRaw));

      } catch (err) {
        console.error(err);
        setError(err);
      }
    })()
  }, []);

  return { dataSource, error }

}