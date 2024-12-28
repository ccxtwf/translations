import { NUMBER_OF_SONGS_PER_PAGE } from "../../config";

import { useRef } from 'react';
import {
  TableRow, TableHeaderCell, TableHeader,
  TableFooter, TableCell, TableBody, Table, 
  Pagination
} from 'semantic-ui-react';
import TitleLink from './TitleLink';
import ArtistCreditElement from './ArtistCreditElement';
import ProducerCreditElement from './ProducerCreditElement';
import CircleCreditElement from "./CircleCreditElement";
import SubLink from "./SubLink";
import FilterableTableHeader from "./FilterableTableHeader";

import { ListTranslationsProps, SingerEntity, ProducerEntity, CircleEntity } from "../types";

const splitSingers = (list: any[]): any[][] => {
  const hmap: any = {};
  for (let item of list) {
    const ver = item.ver;
    if (hmap[ver] === undefined) hmap[ver] = [];
    hmap[ver].push(item);
  }  
  return Object.values(hmap);
}

const renderCommaListForSingers = (list: SingerEntity[], showEnglish: boolean) => {
  const n = list.length;
  if (n === 1) {
    return (
      <ArtistCreditElement artist={list[0]} showEnglish={showEnglish} />
    )
  } else if (n === 2) {
    return (
      <>
        <ArtistCreditElement artist={list[0]} showEnglish={showEnglish} />
        {" and "}
        <ArtistCreditElement artist={list[1]} showEnglish={showEnglish} />
      </>
    )
  } else {
    return (
      <>
      {
        list.map((el: SingerEntity, idx: number) => (
          idx === n-1 ? null :
          <>
          <ArtistCreditElement artist={el} showEnglish={showEnglish} />{", "}
          </>
        ))
      }
      {"and "}
      <ArtistCreditElement artist={list[n-1]} showEnglish={showEnglish} />
      </>
    ) 
  }
}

const renderCommaListForProducers = (list: ProducerEntity[], showEnglish: boolean) => {
  const n = list.length;
  if (n === 1) {
    return (
      <ProducerCreditElement producer={list[0]} showEnglish={showEnglish} />
    )
  } else if (n === 2) {
    return (
      <>
        <ProducerCreditElement producer={list[0]} showEnglish={showEnglish} />
        {" and "}
        <ProducerCreditElement producer={list[1]} showEnglish={showEnglish} />
      </>
    )
  } else {
    return (
      <>
      {
        list.map((el: ProducerEntity, idx: number) => (
          idx === n-1 ? null :
          <>
          <ProducerCreditElement producer={el} showEnglish={showEnglish} />{", "}
          </>
        ))
      }
      {"and "}
      <ProducerCreditElement producer={list[n-1]} showEnglish={showEnglish} />
      </>
    ) 
  }
}

const renderCommaListForCircles = (list: CircleEntity[], showEnglish: boolean) => {
  const n = list.length;
  if (n === 1) {
    return (
      <CircleCreditElement circle={list[0]} showEnglish={showEnglish} />
    )
  } else if (n === 2) {
    return (
      <>
        <CircleCreditElement circle={list[0]} showEnglish={showEnglish} />
        {" and "}
        <CircleCreditElement circle={list[1]} showEnglish={showEnglish} />
      </>
    )
  } else {
    return (
      <>
      {
        list.map((el: CircleEntity, idx: number) => (
          idx === n-1 ? null :
          <>
          <CircleCreditElement circle={el} showEnglish={showEnglish} />{", "}
          </>
        ))
      }
      {"and "}
      <CircleCreditElement circle={list[n-1]} showEnglish={showEnglish} />
      </>
    ) 
  }
}

function ListTranslations(
  { songs = [], totalCount = 1, stateFilterOptions, showEnglish, showSubs }: ListTranslationsProps
) {
  
  const ref = useRef<HTMLSpanElement>(null);
  const [filterOptions, setFilterOptions] = stateFilterOptions;

  return (
  <>
  <span ref={ref}></span>
  <Table celled striped color='teal' compact className="list-tl">
    <TableHeader>
      <TableRow>
        <TableHeaderCell collapsing width={1}>
          <FilterableTableHeader 
            label="No"
            field='song_translated_date' 
            filterOptions={filterOptions} 
            setFilterOptions={setFilterOptions} 
          />
        </TableHeaderCell>
        <TableHeaderCell width={showSubs ? 5 : 7}>
          <FilterableTableHeader 
            label="Title"
            field={showEnglish ? 'song_english_title' : 'song_romanized_title'}
            filterOptions={filterOptions} 
            setFilterOptions={setFilterOptions} 
          />
        </TableHeaderCell>
        <TableHeaderCell width={3}>
          Vocals
        </TableHeaderCell>
        <TableHeaderCell width={3}>
          Producers
        </TableHeaderCell>
        <TableHeaderCell width={1} className="lang-cell">
          Language
        </TableHeaderCell>
        <TableHeaderCell width={1} className="release-year-cell">
          <FilterableTableHeader 
            label="Song Release Year"
            field='song_released_date' 
            filterOptions={filterOptions} 
            setFilterOptions={setFilterOptions} 
          />
        </TableHeaderCell>

        {
          showSubs &&
          <TableHeaderCell width={2}>
            Available Subs
          </TableHeaderCell>
        }

      </TableRow>
    </TableHeader>

    <TableBody>
      {
        songs.map((song, idx) => (
          <TableRow key={song.id}>

            <TableCell textAlign="center">
              {
                ((filterOptions.page || 1) - 1) * NUMBER_OF_SONGS_PER_PAGE + idx + 1
              }
            </TableCell>

            <TableCell>
              <TitleLink 
                pageUrl={song.pageUrl}
                orgTitle={song.orgTitle}
                romTitle={song.romTitle}
                engTitle={song.engTitle}
                showEnglish={showEnglish}
              />
            </TableCell>

            <TableCell>
              {
                splitSingers(song.singers).map((arr: SingerEntity[]) => (
                  <>
                  {renderCommaListForSingers(arr, showEnglish)}
                  <br />
                  </>
                ))
              }
            </TableCell>

            <TableCell>
              {
                song.circles.length === 0 ? null :
                <div>
                {
                  renderCommaListForCircles(song.circles, showEnglish)
                }{":"}
                </div>
              }
              {
                renderCommaListForProducers(song.producers, showEnglish)
              }
            </TableCell>

            <TableCell textAlign="center" className="lang-cell">
              <div className="lang-tag">
                {song.lang}
              </div>
            </TableCell>

            <TableCell textAlign="center" className="release-year-cell">
              {(new Date(song.releasedDate).getFullYear())}
            </TableCell>

            {
              showSubs && 
              <TableCell>
                {song.subs.map(el => <SubLink sub={el} />)}
              </TableCell>
            }

          </TableRow>
        ))
      }
      
    </TableBody>

    <TableFooter>
      <TableRow>
        <TableHeaderCell colSpan={showSubs ? 7 : 6}>
          <div className="table-footer">
            <div className="table-footer-info-songs">
              <div>
                Showing {songs.length} entries out of {totalCount}
              </div>
            </div>
            <Pagination 
              totalPages={Math.ceil(totalCount / NUMBER_OF_SONGS_PER_PAGE)}
              activePage={filterOptions.page || 1}
              boundaryRange={0}
              siblingRange={1}
              ellipsisItem={null}
              onPageChange={(_, data) => {
                setFilterOptions({
                  ...filterOptions,
                  page: data.activePage
                });
                ref?.current?.scrollIntoView({
                  behavior: "smooth",
                  block: "start"
                })
              }}
            />
          </div>
        </TableHeaderCell>
      </TableRow>
    </TableFooter>
  </Table>
  </>
  )
}

export default ListTranslations;