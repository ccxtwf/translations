import { 
  Grid, GridRow, GridColumn, Dropdown,
  Checkbox, Header,
  Accordion, AccordionTitle, AccordionContent,
} from 'semantic-ui-react';
import { FunctionComponent, PropsWithChildren, useState } from 'react';
import SearchSong from './SearchSong';
import FilterDropdown from "./FilterDropdown";
import { FilterMenuProps } from "../types";

const AccordionWrapper: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <Accordion styled fluid>
      <AccordionTitle 
        index={0} active={isOpen} 
        onClick={() => setIsOpen(!isOpen)}
        key='acc-title-0'
      >
        <Header as='h2' icon='filter' content='Filter' subheader='Show advanced filters' />
      </AccordionTitle>
      <AccordionContent active={isOpen} key='acc-content-0'>
        {children}
      </AccordionContent>
    </Accordion>
  )
};

function FilterMenu({ 
  synths, producers, vocalists, circles, 
  stateFilterOptions, stateShowEnglish, stateShowSubs, dispatchSearchSongs 
}: FilterMenuProps) {

  const [filterOptions, setFilterOptions] = stateFilterOptions;
  const [showEnglish, setShowEnglish] = stateShowEnglish;
  const [showSubs, setShowSubs] = stateShowSubs;

  return (
    <AccordionWrapper>
      <Grid stretched stackable verticalAlign='middle'>
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

        <GridRow>
          <GridColumn width={3}>
            Filter by language:
          </GridColumn>
          <GridColumn width={13}>
            <Dropdown
              className='lang-dropdown'
              placeholder='Language'
              selection button
              value={filterOptions.lang || 0}
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
          </GridColumn>
        </GridRow>

        <GridRow>
          <GridColumn width={3}>
            Filter by synths:
          </GridColumn>
          <GridColumn width={13}>
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

        <GridRow>
          <GridColumn width={3}>
            Filter by vocalists:
          </GridColumn>
          <GridColumn width={13}>
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

        <GridRow>
          <GridColumn width={3}>
            Filter by producers:
          </GridColumn>
          <GridColumn width={13}>
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

        <GridRow>
          <GridColumn width={3}>
            Filter by circles/groups:
          </GridColumn>
          <GridColumn width={13}>
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

        <GridRow>
          <GridColumn width={8}>
            <Checkbox 
              toggle 
              checked={!showEnglish}
              onChange={(_, data) => setShowEnglish(!data.checked)} 
              label='Show titles in original language'
            />
          </GridColumn>
          <GridColumn width={8}>
            <Checkbox 
              toggle 
              checked={showSubs}
              onChange={(_, data) => setShowSubs(data.checked)}
              label='Show sub links'
            />
          </GridColumn>
        </GridRow>
      </Grid>
    </AccordionWrapper>
  )
}
  
export default FilterMenu;