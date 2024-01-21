import { 
  Grid, GridRow, GridColumn, Dropdown,
  Checkbox
} from 'semantic-ui-react';
import SearchSong from './SearchSong';
import FilterDropdown from "./FilterDropdown";
import { FilterMenuProps } from "../types";

function FilterMenu({ 
  synths, producers, vocalists, circles, 
  stateFilterOptions, stateShowEnglish, stateShowSubs, dispatchSearchSongs 
}: FilterMenuProps) {

  const [filterOptions, setFilterOptions] = stateFilterOptions;
  const [showEnglish, setShowEnglish] = stateShowEnglish;
  const [showSubs, setShowSubs] = stateShowSubs;

  const MiscFilterSubMenu = () => (
    <div className='filter-submenu'>
    <div>
      <Dropdown
        className='lang-dropdown'
        placeholder='Language'
        selection button
        value={filterOptions.lang || 0}
        header={"Filter songs by language"}
        options={[
          { key: 0, text: 'Default - All languages', value: 0 },
          { key: 1, text: 'Chinese', value: 'CN' },
          { key: 2, text: 'Japanese', value: 'JP' }
        ]}
        onChange={(_, data) => {
          let val = data.value || null;
          setFilterOptions({
            ...filterOptions,
            page: 1,
            lang: val
          });
        }}
      />
    </div>

    <div className='flex-middle'>
      <Checkbox 
        toggle 
        checked={!showEnglish}
        onChange={(_, data) => setShowEnglish(!data.checked)} 
      />
      <span>Show titles in original language</span>
    </div>
    
    <div className='flex-middle'>
      <Checkbox 
        toggle 
        checked={showSubs}
        onChange={(_, data) => setShowSubs(data.checked)} 
      />
      <span>Show sub links</span>
    </div>
    </div>
  )

  return (
    <Grid stretched relaxed verticalAlign='middle'>

      {/* SEARCH BAR */}
      <GridRow>
      <GridColumn width={3}>
        Search songs
      </GridColumn>
      <GridColumn width={13}>
        <SearchSong 
          showEnglish={showEnglish}
          dispatchSearchSongs={dispatchSearchSongs} 
          stateFilterOptions={stateFilterOptions}
        />
      </GridColumn>
      </GridRow>

      <GridRow only='computer'>
        <GridColumn width={12}>
          <Grid>

            {/* FILTER SYNTHS DROPDOWN MENUS */}
            <GridRow>
              <GridColumn width={4}>
                Filter by synths:
              </GridColumn>
              <GridColumn width={12}>
                <FilterDropdown 
                  field="synths"
                  placeholder="Hatsune Miku" 
                  options={synths} 
                  value={filterOptions.synths}
                  stateFilterOptions={stateFilterOptions}
                  showEnglish={showEnglish}
                />
              </GridColumn>
            </GridRow>

            {/* FILTER VOCALISTS DROPDOWN MENUS */}
            <GridRow>
              <GridColumn width={4}>
                Filter by vocalists:
              </GridColumn>
              <GridColumn width={12}>
                <FilterDropdown 
                  field="vocalists"
                  placeholder="..." 
                  options={vocalists} 
                  value={filterOptions.vocalists}
                  stateFilterOptions={stateFilterOptions}
                  showEnglish={showEnglish}
                />
              </GridColumn>
            </GridRow>

            {/* FILTER PRODUCERS DROPDOWN MENUS */}
            <GridRow>
              <GridColumn width={4}>
                Filter by producers:
              </GridColumn>
              <GridColumn width={12}>
                <FilterDropdown 
                  field="producers"
                  placeholder="..." 
                  options={producers} 
                  value={filterOptions.producers}
                  stateFilterOptions={stateFilterOptions}
                  showEnglish={showEnglish}
                />
              </GridColumn>
            </GridRow>

            {/* FILTER CIRCLES DROPDOWN MENUS */}
            <GridRow>
              <GridColumn width={4}>
                Filter by circles:
              </GridColumn>
              <GridColumn width={12}>
                <FilterDropdown 
                  field="circles"
                  placeholder="..." 
                  options={circles} 
                  value={filterOptions.circles}
                  stateFilterOptions={stateFilterOptions}
                  showEnglish={showEnglish}
                />
              </GridColumn>
            </GridRow>

          </Grid>
        </GridColumn>

        {/* MISC OPTION MENUS */}
        <GridColumn width={4}>
          <MiscFilterSubMenu />
        </GridColumn>
      </GridRow>
      
    </Grid>
  )
}
  
export default FilterMenu;