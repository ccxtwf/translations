import { Dropdown, Label } from 'semantic-ui-react';

import { FilterDropdownProps } from '../types';

function FilterDropdown({ value, field, options, placeholder, stateFilterOptions, showEnglish }: FilterDropdownProps) {

  const [filterOptions, setFilterOptions] = stateFilterOptions;

  const mapItemsToDropdown = (el: any) => {
    let name = showEnglish ? el.loclName || el.origName : el.origName;
    let lAlias = showEnglish ? (el.loclName ? el.origName : '') : (el.loclName || '');
    let rAlias = el?.aliases?.join(", ") || '';
    let alias = `${lAlias}${lAlias === '' || rAlias === '' ? '' : ', '}${rAlias}`;
    let text = (
      <div>
        {name}<br />
        <span>
          {
            el.engine ? 
            <Label size='mini' color='green' className='engine-label'>
              {el.engine}
            </Label> : 
            null
          }
          
          <small>
            {alias}
          </small>
        </span>
      </div>
    );
    let desc = el.numSongs > 1 ? `(${el.numSongs} songs)` : `(${el.numSongs} song)`
    return {
      content: text, 
      text: name,
      description: desc,
      value: el.id
    }
  }

  const containsSearchQuery = (t: string, pattern: string) => {
    t = t || '';
    t = t.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    pattern = pattern.replace(/([\\\.\+\*\?\^\$\(\)\[\]\{\}\|\/])/g, '\\$1');
    const re = new RegExp("\\b" + pattern, 'i');
    return (t.match(re) !== null);
  }

  return (
    <Dropdown
      placeholder={placeholder}
      fluid multiple selection
      options={options.map(mapItemsToDropdown)}
      value={value || []}
      onChange={(_, data) => {
        let filterIds: number[] | null = (data.value as any[])?.slice() || null; 
        if (filterIds && filterIds.length === 0) filterIds = null;
        console.log(filterIds);
        setFilterOptions({
          ...filterOptions,
          page: 1,
          [field]: filterIds,
          ids: null
        })
      }}
      search={(_, input) => {
        input = input.toLocaleLowerCase();
        const filtered = options.filter((option) => {
          const isInName = (
            containsSearchQuery(option.origName, input) || 
            containsSearchQuery(option.loclName, input)
          );
          if (isInName) return true;
          // @ts-ignore
          if (!option?.aliases) return false;
          // @ts-ignore
          return option.aliases.some(alias => containsSearchQuery(alias, input));
        });
        if (filtered.length === 0) return [];
        return filtered.map(mapItemsToDropdown);
      }}
    />
  )
}

export default FilterDropdown;