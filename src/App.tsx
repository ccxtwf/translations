import "reflect-metadata";

import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from "react-redux";
import { useAppDataSource } from "./components/DatabaseProvider";
import { 
  fetchSynths, fetchVocalists, fetchProducers, fetchCircles, fetchSongs, searchSongs
} from "./store/actions/fetchActions";
import { ThunkActionDispatch } from "redux-thunk";
import { FilterSongOptions } from "./components/types";

import HeaderComponent from './components/HeaderComponent';
import FilterMenu from "./components/FilterMenu/FilterMenu";
import ListTranslations from "./components/ListTranslations/ListTranslations";

function App() {

  const dispatch = useDispatch<ThunkActionDispatch<any>>();
  const dataSource = useAppDataSource();

  const [ filterOptions, setFilterOptions ] = useState<FilterSongOptions>({
    lang: null,
    ids: null,
    synths: null,
    producers: null,
    vocalists: null,
    circles: null,
    page: 1,
    sort: {
      field: "song_translated_date",
      order: "DESC"
    }
  });
  const [ showEnglish, setShowEnglish ] = useState<boolean>(true);
  const [ showSubs, setShowSubs ] = useState<boolean>(false);

  useEffect(() => {
    if (dataSource !== null) {
      dispatch(fetchSynths(dataSource, filterOptions));
      dispatch(fetchVocalists(dataSource, filterOptions));
      dispatch(fetchProducers(dataSource, filterOptions));
      dispatch(fetchCircles(dataSource, filterOptions));
      dispatch(fetchSongs(dataSource, filterOptions));
    }
  }, [dataSource, filterOptions]);

  const { synths } = useSelector((state: any) => state.synths);
  const { vocalists } = useSelector((state: any) => state.vocalists);
  const { producers } = useSelector((state: any) => state.producers);
  const { circles } = useSelector((state: any) => state.circles);
  const { songs, count } = useSelector((state: any) => state.songs); 
  const dispatchSearchSongs = (query: string) => dispatch(searchSongs(dataSource, query));

  return (
    <>
    <header>
      <HeaderComponent />
    </header>

    <main>

      <article id='filter-article'>
        <FilterMenu 
          synths={synths}
          vocalists={vocalists}
          producers={producers}
          circles={circles}
          stateFilterOptions={[filterOptions, setFilterOptions]}
          stateShowEnglish={[showEnglish, setShowEnglish]}
          stateShowSubs={[showSubs, setShowSubs]}
          dispatchSearchSongs={dispatchSearchSongs}
        />
      </article>

      <article id='main-article'>
        <ListTranslations 
          songs={songs}
          totalCount={count}
          stateFilterOptions={[filterOptions, setFilterOptions]}
          showEnglish={showEnglish}
          showSubs={showSubs}
        />
      </article>

    </main>
    
    <footer>
      This is a footer.
    </footer>
    </>
  )
}

export default App;
