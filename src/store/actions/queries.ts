import { NUMBER_OF_SONGS_PER_PAGE } from "../../config";

import { DataSource } from "typeorm/browser";
import * as entity from "../../entity";
import { FilterSongOptions } from "../../components/types";
import { SelectQueryBuilder } from "typeorm/browser";

function filterSongsWithSelectedOptions(qb: SelectQueryBuilder<any>, options: FilterSongOptions): void {
  if (options.synths && options.synths.length > 0) {
    qb.andWhere(
      `"song"."id" IN (
        SELECT "translation_id" FROM "TranslationSingers" 
        WHERE "synth_id" IN (${options.synths.join(',')})
        GROUP BY "translation_id"
        HAVING COUNT("synth_id") = ${options.synths.length}
      )`
    );
  }
  if (options.producers && options.producers.length > 0) {
    qb.andWhere(
      `"song"."id" IN (
        SELECT "translation_id" FROM "TranslationProducers" 
        WHERE "producer_id" IN (${options.producers.join(',')})
        GROUP BY "translation_id"
        HAVING COUNT("producer_id") = ${options.producers.length}
      )`
    );
  }
  if (options.vocalists && options.vocalists.length > 0) {
    qb.andWhere(
      `"song"."id" IN (
        SELECT "translation_id" FROM "TranslationSingers" 
        WHERE "vocalist_id" IN (${options.vocalists.join(',')})
        GROUP BY "translation_id"
        HAVING COUNT("vocalist_id") = ${options.vocalists.length}
      )`
    );
  }
  if (options.circles && options.circles.length > 0) {
    qb.andWhere(
      `"song"."id" IN (
        SELECT "translation_id" FROM "TranslationCircles" 
        WHERE "circle_id" IN (${options.circles.join(',')})
        GROUP BY "translation_id"
        HAVING COUNT("circle_id") = ${options.circles.length}
      )`
    );
  }
}

export function querySynths(dataSource: DataSource, options: FilterSongOptions): Promise<entity.SynthWithCount[]> {
  const qbSynths = dataSource
    .getRepository(entity.SynthWithCount)
    .createQueryBuilder('synth')
    .innerJoin(
      "synth.__songs", "song", 
      options.lang ? `song.lang = '${options.lang}'` : undefined
    );
  filterSongsWithSelectedOptions(qbSynths, options);
  qbSynths
    .groupBy("synth_id")
    .orderBy("synth_numSongs", "DESC")
    .addOrderBy("LOWER(synth_localized_name)", "ASC");
    // .limit(100);
  // console.log(qbSynths.getSql());
  return qbSynths.getMany();
}

export function queryProducers(dataSource: DataSource, options: FilterSongOptions): Promise<entity.ProducerWithCount[]> {
  const qbProducers = dataSource
    .getRepository(entity.ProducerWithCount)
    .createQueryBuilder('producer')
    .innerJoin(
      "producer.__songsMade", "song", 
      options.lang ? `song.lang = '${options.lang}'` : undefined
    );
  filterSongsWithSelectedOptions(qbProducers, options);
  qbProducers
    .groupBy("producer_id")
    .orderBy("producer_numSongs", "DESC")
    .addOrderBy("LOWER(producer_localized_name)", "ASC");
    // .limit(100);
  // console.log(qbProducers.getSql());
  return qbProducers.getMany();
}

export function queryVocalists(dataSource: DataSource, options: FilterSongOptions): Promise<entity.ProducerWithCount[]> {
  const qbVocalists = dataSource
    .getRepository(entity.ProducerWithCount)
    .createQueryBuilder('producer')
    .innerJoin(
      "producer.__songsSung", "song", 
      options.lang ? `song.lang = '${options.lang}'` : undefined
    );
  filterSongsWithSelectedOptions(qbVocalists, options);
  qbVocalists
    .groupBy("producer_id")
    .orderBy("producer_numSongs", "DESC")
    .addOrderBy("LOWER(producer_localized_name)", "ASC");
    // .limit(100);
  // console.log(qbVocalists.getSql());
  return qbVocalists.getMany();
}

export function queryCircles(dataSource: DataSource, options: FilterSongOptions): Promise<entity.CircleWithCount[]> {
  const qbCircles = dataSource
    .getRepository(entity.CircleWithCount)
    .createQueryBuilder('circle')
    .innerJoin(
      "circle.__songs", "song", 
      options.lang ? `lang = '${options.lang}'` : undefined
    );
  filterSongsWithSelectedOptions(qbCircles, options);
  qbCircles
    .groupBy("circle_id")
    .orderBy("circle_numSongs", "DESC")
    .addOrderBy("LOWER(circle_localized_name)", "ASC");
    // .limit(100);
  // console.log(qbCircles.getSql());
  return qbCircles.getMany();
}

export function querySongs(dataSource: DataSource, options: FilterSongOptions): Promise<[entity.Song[], any]> {
  const qbSongs = dataSource
    .getRepository(entity.Song)
    .createQueryBuilder('song')
    .leftJoinAndSelect('song.singers', 'singer')
    .leftJoinAndSelect('singer.__synthProps', 'jnSynth')
    .leftJoinAndSelect('singer.__vocalistProps', 'jnVocalist')
    .leftJoinAndSelect('song.producers', 'producer')
    .leftJoinAndSelect('producer.__props', 'jnProducer')
    .leftJoinAndSelect('song.circles', 'circle')
    .leftJoinAndSelect('song.subs', 'sub')
    // initialize filtering
    .where(options.lang ? `song.lang=:lang` : 'TRUE', { lang: options.lang });

  if (options.ids) {
    qbSongs.andWhere(`"song"."id" IN (${options.ids})`);
  } else {
    filterSongsWithSelectedOptions(qbSongs, options);
  }
    
  let sortByField = options.sort?.field || null;
  switch (sortByField) {
    case 'song_id':
      break;
    case 'song_romanized_title':
      (sortByField as string) = `LOWER("${sortByField}")`;
      break;
    case 'song_english_title':
      (sortByField as string) = `LOWER(COALESCE("${sortByField}", "song_original_title"))`;
      break;
    case 'song_released_date':
      (sortByField as string) = 'DATE("song_released_date")';
      break;
    case 'song_translated_date':
    default:
      (sortByField as string) = 'DATE("song_translated_date")';
  }
  let sortOrder = sortByField ? (options.sort?.order || 'ASC') : 'DESC';

  qbSongs
    // .orderBy('song.id', sortOrder)
    .orderBy((sortByField as string), sortOrder)
    .take(NUMBER_OF_SONGS_PER_PAGE)
    .skip(((options.page || 1) - 1) * NUMBER_OF_SONGS_PER_PAGE);

  // console.log(qbSongs.getSql());
  return qbSongs.getManyAndCount();
  
}

export function querySearchSongs(dataSource: DataSource, query: string): Promise<entity.Song[]> {
  const qbSongs = dataSource
    .getRepository(entity.Song)
    .createQueryBuilder('song')
    .select([
      'song.id', 'song.orgTitle', 'song.romTitle', 'song.engTitle'
    ])
    .where(`MATCHES(song_original_title, :query)`)
    .orWhere(`MATCHES(song_romanized_title, :query)`)
    .orWhere(`MATCHES(song_english_title, :query)`)
    .setParameter('query', query);
  // console.log(qbSongs.getSql());
  return qbSongs.getMany();
}