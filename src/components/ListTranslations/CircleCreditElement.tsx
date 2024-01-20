import { Popup } from 'semantic-ui-react';

import { CircleCreditElementProps } from '../types';

function CircleCreditElement({ circle, showEnglish }: CircleCreditElementProps) {
  const { origName, loclName } = circle;  
  let parent; let strAlias;
  if (showEnglish) {
    parent = (<span className='circle-element'>{loclName || origName}</span>);
    strAlias = loclName ? origName : '';
  } else {
    parent = (<span className='circle-element'>{origName}</span>);
    strAlias = loclName || '';
  }
  if (strAlias === '') return parent;
  return (
    <Popup
      trigger={parent}
      content={<div>{strAlias}</div>}
      position='bottom left'
      size='mini'
    />
  );
}
    
export default CircleCreditElement;