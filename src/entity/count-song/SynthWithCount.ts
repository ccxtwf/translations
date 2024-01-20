import { 
  Entity, Column, PrimaryGeneratedColumn, 
  ManyToMany, JoinTable,
  VirtualColumn
} from "typeorm/browser";
import { SongRelation } from "./SongRelation";
  
@Entity("Synths")
export class SynthWithCount {
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

  @ManyToMany(() => SongRelation)
  @JoinTable({
    name: "TranslationSingers",
    joinColumn: {
      name: "synth_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "translation_id",
      referencedColumnName: "id"
    }
  })
  __songs: SongRelation[]

  @VirtualColumn({ 
    type: "int", 
    query: () => `COUNT("song"."id")` 
  })
  numSongs: number
}