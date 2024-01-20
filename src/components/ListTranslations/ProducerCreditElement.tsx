import { Popup } from 'semantic-ui-react';

import { ProducerCreditElementProps } from '../types';

function ProducerCreditElement({ producer, showEnglish }: ProducerCreditElementProps) {
  const { role, __props: { origName, loclName, aliases = [] } = {} } = producer;  
  let parent; let lAlias; let rAlias; let strAlias;
  if (showEnglish) {
    parent = <span>{loclName || origName}</span>;
    lAlias = loclName ? origName : '';
  } else {
    parent = <span>{origName}</span>;
    lAlias = loclName || '';
  }
  rAlias = aliases.join(', ');
  strAlias = `${lAlias}${(lAlias === '' || rAlias === '') ? '' : ', '}${rAlias}`;
  return (
    <Popup
      trigger={parent}
      content={(
        <div>
          {strAlias === '' ? null : <>{`AKA: ${strAlias}`}<hr /></>}
          {role}
        </div>
      )}
      position='bottom left'
      size='mini'
    />
  )
}
    
export default ProducerCreditElement;