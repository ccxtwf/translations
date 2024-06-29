import { Icon } from "semantic-ui-react";

import { FilterIconProps } from "../types";

function FilterableTableHeader({ field, label, filterOptions, setFilterOptions }: FilterIconProps) {
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
    <div 
      className="filterable-column"
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
    >
      <span>
        {label}
      </span>
      <Icon 
        // @ts-ignore
        name={drawIcon}
        className={isActive ? 'active-filter' : ''}
      />
    </div>
  )
}
  
export default FilterableTableHeader;