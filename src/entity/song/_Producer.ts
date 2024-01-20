import { 
  Entity, Column, PrimaryGeneratedColumn, 
  OneToMany,
  VirtualColumn
} from "typeorm/browser";
import { SongToProducer } from "./SongToProducer";
import { SongToSinger } from "./SongToSinger";

@Entity("Producers")
export class _Producer {
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
  
  @OneToMany(() => SongToSinger, jn => jn.__vocalistProps)
  __songToVocalists: SongToSinger[]
  @OneToMany(() => SongToProducer, jn => jn.__props)
  __songToProducers: SongToProducer[]
}