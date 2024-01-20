import { 
  Entity, Column, PrimaryGeneratedColumn, 
  OneToMany,
  VirtualColumn
} from "typeorm/browser";
import { SongToSinger } from "./SongToSinger";

@Entity("Synths")
export class _Synth {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: "varchar", name: "original_name" })
  origName: string
  
  @Column({ type: "varchar", name: "localized_name" })
  loclName: string
  
  @VirtualColumn({ 
    type: "string", 
    query: (alias) => `SELECT "engine" FROM "SynthEngines" WHERE "id" = ${alias}.engine_id` 
  })
  engine: string
  
  @VirtualColumn({ 
    type: "json", 
    query: (alias) => `SELECT IIF(alias IS NULL, NULL, JSON_GROUP_ARRAY(alias)) FROM "SynthAlias" WHERE "synth_id" = ${alias}.id` 
  })
  aliases: string[]
  
  @OneToMany(() => SongToSinger, jn => jn.__synthProps)
  __songToSynths: SongToSinger[]
}