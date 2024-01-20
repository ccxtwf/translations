import { 
  Entity, Column, PrimaryGeneratedColumn, 
  OneToMany, ManyToMany, JoinTable
} from "typeorm/browser";
// import { SongToSynth } from "./SongToSynth";
// import { SongToVocalist } from "./SongToVocalist";
import { SongToSinger } from "./SongToSinger";
import { SongToProducer } from "./SongToProducer";
import { SongToCircle } from "./SongToCircle";
import { Sub } from "./Sub";

@Entity("Translations")
export class Song {
  @PrimaryGeneratedColumn()
  id: number
  
  @Column({ type: "varchar", name: "original_title" })
  orgTitle: string
  
  @Column({ type: "varchar", name: "romanized_title" })
  romTitle: string
  
  @Column({ type: "varchar", name: "english_title" })
  engTitle: string
  
  // public get orgTitle(): string {
  //   return `${this.orgTitle}${this._romTitle ? `(${this._romTitle})` : ''}`;
  // }
  
  @Column({ type: "varchar" })
  lang: string
  
  @Column({ type: "varchar" })
  series: string
  
  @Column({ type: "varchar", name: "pageurl" })
  pageUrl: string
  
  // @OneToMany(() => SongToSynth, jn => jn.__song)
  // synths: SongToSynth[]

  // @OneToMany(() => SongToVocalist, jn => jn.__song)
  // vocalists: SongToVocalist[]

  @OneToMany(() => SongToSinger, jn => jn.__song)
  singers: SongToSinger[]

  @OneToMany(() => SongToProducer, jn => jn.__song)
  producers: SongToProducer[]

  @ManyToMany(() => SongToCircle)
  @JoinTable({
    name: "TranslationCircles",
    joinColumn: {
      name: "translation_id"
    },
    inverseJoinColumn: {
      name: "circle_id"
    }
  })
  circles: SongToCircle[]
  
  @OneToMany(() => Sub, (sub: Sub) => sub.__song)
  subs: Sub[]

  @Column({ type: "text", name: "translated_date" })
  translatedDate: string

  @Column({ type: "text", name: "released_date" })
  releasedDate: string
}