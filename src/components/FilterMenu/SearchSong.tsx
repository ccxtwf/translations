import { Search } from 'semantic-ui-react';
import { useEffect } from 'react';
import { useSelector } from "react-redux";
import { Song } from "../../entity";
import { SearchSongProps } from "../types";

function SearchSong({ showEnglish, dispatchSearchSongs, stateFilterOptions }: SearchSongProps) {
  const { songs, isLoading } = useSelector((state: any) => state.search); 
  const [filterOptions, setFilterOptions] = stateFilterOptions;

  useEffect(() => {
    if (songs && songs.length === 0) {
      setFilterOptions({
        ...filterOptions,
        ids: null,
        synths: null,
        producers: null,
        vocalists: null,
        circles: null,
        page: 1
      });
    } else {
      setFilterOptions({
        ...filterOptions,
        ids: songs.map((song: Song) => song.id),
        synths: null,
        producers: null,
        vocalists: null,
        circles: null,
        page: 1
      });
    }
  }, [songs]);

  return (
    <Search
      className='search-bar'
      loading={isLoading}
      fluid
      placeholder='Search...'
      onSearchChange={(_, data) => {
        dispatchSearchSongs(data.value);
      }}
      onResultSelect={(_, data) => {
        dispatchSearchSongs(data?.result?.title);
      }}
      results={songs.slice(0, 5).map((song: Song) => {
        let title; let description;
        if (showEnglish) {
          title = song.engTitle || song.orgTitle;
          description = song.engTitle ? `${song.orgTitle}${song.romTitle ? ` (${song.romTitle})` : ''}` : null;
        } else {
          title = song.orgTitle;
          description = song.engTitle ? `${song.engTitle}${song.romTitle ? ` (${song.romTitle})` : ''}` : null;
        }
        return { title, description }
      })}
    />
  )
}

export default SearchSong;