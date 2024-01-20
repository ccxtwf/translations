import { 
  Entity, Column, PrimaryGeneratedColumn, 
  ManyToMany, JoinTable
} from "typeorm/browser";
import { Song } from "./Song";

@Entity("Circles")
export class SongToCircle {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", name: "original_name" })
  origName: string

  @Column({ type: "varchar", name: "localized_name" })
  loclName: string

  @ManyToMany(() => Song)
  @JoinTable({
    name: "TranslationCircles",
    joinColumn: {
      name: "circle_id"
    },
    inverseJoinColumn: {
      name: "translation_id"
    }
  })
  __songs: Song[]
}