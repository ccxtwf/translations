import { 
  Entity, PrimaryGeneratedColumn, 
  ManyToMany, JoinTable 
} from "typeorm/browser";
import { SynthWithCount } from "./SynthWithCount";
import { CircleWithCount } from "./CircleWithCount";
import { ProducerWithCount } from "./ProducerWithCount";

@Entity("Translations")
export class SongRelation {
  @PrimaryGeneratedColumn()
  id: number
  
  @ManyToMany(() => SynthWithCount)
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
  synths: SynthWithCount[]
  
  @ManyToMany(() => ProducerWithCount)
  @JoinTable({
    name: "TranslationSingers",
    joinColumn: {
      name: "translation_id"
    },
    inverseJoinColumn: {
      name: "vocalist_id"
    }
  })
  vocalists: ProducerWithCount[]
  
  @ManyToMany(() => ProducerWithCount)
  @JoinTable({
    name: "TranslationProducers",
    joinColumn: {
      name: "translation_id"
    },
    inverseJoinColumn: {
      name: "producer_id"
    }
  })
  producers: ProducerWithCount[]

  @ManyToMany(() => CircleWithCount)
  @JoinTable({
    name: "TranslationCircles",
    joinColumn: {
      name: "translation_id"
    },
    inverseJoinColumn: {
      name: "circle_id"
    }
  })
  circles: CircleWithCount[]
}