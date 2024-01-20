import { Icon } from "semantic-ui-react";

import { FilterIconProps } from "../types";

function FilterIcon({ field, filterOptions, setFilterOptions }: FilterIconProps) {
  const sortedField = filterOptions.sort?.field || null;
  const sortedOrder = filterOptions.sort?.order || null;
  
  let drawIcon = 'caret down';
  let isActive = false;
  if (sortedField === field) {
    isActive = true;
    if (sortedOrder === 'ASC') {
      drawIcon = 'caret up';
    }
  }
  
  return (
    <Icon 
      name={drawIcon}
      className={isActive ? 'active-filter' : ''}
      onClick={() => {
        setFilterOptions({
          ...filterOptions,
          page: 1,
          sort: {
            field,
            order: isActive ? (sortedOrder === 'ASC' ? 'DESC' : 'ASC') : 'ASC'
          }
        })
      }}
    />
  )
}
  
export default FilterIcon;