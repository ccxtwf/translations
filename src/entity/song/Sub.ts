import { 
  Entity, Column, PrimaryGeneratedColumn,
  RelationId, 
  ManyToOne, JoinColumn 
} from "typeorm/browser";
import { Song } from "./Song";

@Entity("TranslationSubs")
export class Sub {
  @PrimaryGeneratedColumn()
  id: number

  @RelationId((sub: Sub) => sub.__song)
  __translation_id: number

  @ManyToOne(() => Song, (song: Song) => song.subs)
  @JoinColumn({
    name: "translation_id"
  })
  __song: Song

  @Column({ type: "varchar", name: "sub_url" })
  subUrl: string

  @Column({ type: "varchar", name: "description" })
  description: string
}