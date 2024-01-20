import { 
  Entity, Column, PrimaryGeneratedColumn, RelationId,
  ManyToOne, JoinColumn
} from "typeorm/browser";
import { Song } from "./Song";
import { _Synth } from "./_Synth";
import { _Producer } from "./_Producer";

@Entity("TranslationSingers")
export class SongToSinger {
  @PrimaryGeneratedColumn({ name: "id" })
  __jnId: number

  @RelationId((jn: SongToSinger) => jn.__song)
  __songId: number
  @RelationId((jn: SongToSinger) => jn.__synthProps)
  __synthId: number
  
  @ManyToOne(() => Song, (song: Song) => song.singers)
  @JoinColumn({
    name: "translation_id"
  })
  __song: Song

  @ManyToOne(() => _Synth, (synth: _Synth) => synth.__songToSynths)
  @JoinColumn({
    name: "synth_id"
  })
  __synthProps: _Synth | null

  @ManyToOne(() => _Producer, (producer: _Producer) => producer.__songToVocalists)
  @JoinColumn({
    name: "vocalist_id"
  })
  __vocalistProps: _Producer | null

  @Column({ type: "int", name: "ver" })
  ver: number | null
}