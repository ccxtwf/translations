import { 
  Entity, Column, PrimaryGeneratedColumn, 
  ManyToMany, JoinTable,
  VirtualColumn
} from "typeorm/browser";
import { SongRelation } from "./SongRelation";

@Entity("Producers")
export class ProducerWithCount {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", name: "original_name" })
  origName: string

  @Column({ type: "varchar", name: "localized_name" })
  loclName: string

  @VirtualColumn({ 
    type: "json", 
    query: (alias) => `SELECT IIF(alias IS NULL, NULL, JSON_GROUP_ARRAY(alias)) FROM "ProducerAlias" WHERE "producer_id" = ${alias}.id` 
  })
  aliases: string[]

  @ManyToMany(() => SongRelation)
  @JoinTable({
    name: "TranslationProducers",
    joinColumn: {
      name: "producer_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "translation_id",
      referencedColumnName: "id"
    }
  })
  __songsMade: SongRelation[]

  @ManyToMany(() => SongRelation)
  @JoinTable({
    name: "TranslationSingers",
    joinColumn: {
      name: "vocalist_id",
      referencedColumnName: "id"
    },
    inverseJoinColumn: {
      name: "translation_id",
      referencedColumnName: "id"
    }
  })
  __songsSung: SongRelation[]

  @VirtualColumn({ 
    type: "int", 
    query: () => `COUNT("song"."id")`
  })
  numSongs: number
}