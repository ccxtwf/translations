import { 
  Entity, Column, PrimaryGeneratedColumn,
  ManyToOne, JoinColumn
} from "typeorm/browser";
import { Song } from "./Song";
import { _Producer } from "./_Producer";

@Entity("TranslationProducers")
export class SongToProducer {
  @PrimaryGeneratedColumn({ name: "id" })
  __jnId: number

  // @Column({ type: "int", name: "translation_id" })
  // __songId: number
  // @Column({ type: "int", name: "producer_id" })
  // __producerId: number
  
  @ManyToOne(() => Song, (song: Song) => song.producers)
  @JoinColumn({
    name: "translation_id"
  })
  __song: Song

  @ManyToOne(() => _Producer, (producer: _Producer) => producer.__songToProducers)
  @JoinColumn({
    name: "producer_id"
  })
  __props: _Producer

  @Column({ type: "varchar", name: "role" })
  role: string
}