import { Song, SynthWithCount, ProducerWithCount, CircleWithCount } from "../entity";

export interface FilterSongOptions {
  lang: "CN" | "JP" | null
  ids: number[] | null
  synths: number[] | null
  producers: number[] | null
  vocalists: number[] | null
  circles: number[] | null
  page: number | null
  sort: {
    field: "song_id" | "song_released_date" | "song_translated_date" | "song_romanized_title" | "song_english_title" | null
    order: "ASC" | "DESC" | null
  } | null
}

export interface ListTranslationsProps {
  songs: Song[]
  totalCount: number
  stateFilterOptions: [FilterSongOptions, CallableFunction]
  showEnglish: boolean
  showSubs: boolean
}

export interface PaginationMenuProps {
  totalPages: number
  filterOptions: FilterSongOptions
  setFilterOptions: CallableFunction
}

export interface SingerEntity {
  ver: number | null
  __synthProps: {
    id: number
    origName: string
    loclName: string | null
    engine: string
    aliases: string[]
  }
  __vocalistProps: {
    id: number
    origName: string
    loclName: string | null
    aliases: string[]
  }
}

export interface ProducerEntity {
  role: string
  __props: {
    id: number
    origName: string
    loclName: string | null
    aliases: string[]
  }
}

export interface CircleEntity {
  id: number
  origName: string
  loclName: string | null
}

export interface ArtistCreditElementProps {
  artist: SingerEntity
  showEnglish: boolean
}

export interface ProducerCreditElementProps {
  producer: ProducerEntity
  showEnglish: boolean
}

export interface CircleCreditElementProps {
  circle: CircleEntity
  showEnglish: boolean
}

export interface TitleLinkProps {
  pageUrl: string | null
  orgTitle: string | null
  romTitle: string | null
  engTitle: string | null
  showEnglish: boolean
}

export interface FilterIconProps {
  field: string
  label: string
  filterOptions: FilterSongOptions
  setFilterOptions: CallableFunction
}

export interface FilterDropdownProps {
  value: number[] | null
  field: "synths" | "producers" | "vocalists" | "circles"
  options: SynthWithCount[] | ProducerWithCount[] | CircleWithCount[]
  placeholder: string
  stateFilterOptions: [FilterSongOptions, CallableFunction]
  showEnglish: boolean
}

export interface SearchSongProps {
  showEnglish: boolean
  dispatchSearchSongs: CallableFunction
  stateFilterOptions: [FilterSongOptions, CallableFunction]
}

export interface FilterMenuProps {
  synths: SynthWithCount[] 
  producers: ProducerWithCount[] 
  vocalists: ProducerWithCount[]
  circles: CircleWithCount[]
  stateFilterOptions: [FilterSongOptions, CallableFunction]
  stateShowEnglish: [boolean, CallableFunction]
  stateShowSubs: [boolean, CallableFunction]
  dispatchSearchSongs: CallableFunction
}