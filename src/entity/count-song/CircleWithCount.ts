import { 
  Entity, Column, PrimaryGeneratedColumn, 
  ManyToMany, JoinTable,
  VirtualColumn
} from "typeorm/browser";
import { SongRelation } from "./SongRelation";

@Entity("Circles")
export class CircleWithCount {
  @PrimaryGeneratedColumn()
  id: number

  @Column({ type: "varchar", name: "original_name" })
  origName: string

  @Column({ type: "varchar", name: "localized_name" })
  loclName: string

  @ManyToMany(() => SongRelation)
  @JoinTable({
    name: "TranslationCircles",
    joinColumn: {
      name: "circle_id",
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