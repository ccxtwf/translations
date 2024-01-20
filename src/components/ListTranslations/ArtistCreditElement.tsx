import { Popup } from 'semantic-ui-react';
import { ArtistCreditElementProps } from '../types';

function ArtistCreditElement({ artist, showEnglish }: ArtistCreditElementProps) {
  const { __synthProps, __vocalistProps } = artist;
  let origName; let loclName; let aliases; let engine = null;
  if (__synthProps.id) {
    origName = __synthProps.origName;
    loclName = __synthProps.loclName;
    aliases = __synthProps.aliases;
    engine = __synthProps.engine;
  } else {
    origName = __vocalistProps.origName;
    loclName = __vocalistProps.loclName;
    aliases = __vocalistProps.aliases;
  }
  let parent; let lAlias; let rAlias; let strAlias; let title;
  if (showEnglish) {
    parent = (<span>{loclName || origName}</span>);
    lAlias = loclName ? origName : '';
  } else {
    parent = (<span>{origName}</span>);
    lAlias = loclName || '';
  }
  rAlias = aliases.join(', ');
  strAlias = `${lAlias}${(lAlias === '' || rAlias === '') ? '' : ', '}${rAlias}`;
  if (strAlias === '' && !engine) return parent;
  title = strAlias === '' ? null : <>{`AKA: ${strAlias}`}</>;
  if (engine) {
    title = (<div>{title ? <>{title}<hr /></> : null}{engine} synth</div>);
  }
  return (
    <Popup
      trigger={parent}
      content={title}
      position='bottom left'
      size='mini'
    />
  )
}
    
export default ArtistCreditElement;