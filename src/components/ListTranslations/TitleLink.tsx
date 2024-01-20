import {
  Header
} from "semantic-ui-react";

import { TitleLinkProps } from "../types";

function TitleLink({ pageUrl, orgTitle, romTitle, engTitle, showEnglish }: TitleLinkProps) {
  if (showEnglish) {
    return (
      <>
      <Header as='h3'>
        <a href={pageUrl || ''} target='_blank'>
          {engTitle || orgTitle}
        </a>
      </Header>
      {
        engTitle ? 
        <div>
        {
          romTitle ?
          <>{orgTitle}<span>{` (${romTitle})`}</span></> :
          <>{orgTitle}</>
        }
        </div> :
        null
      }
      </>
    )
  } else {
    return (
      <>
      <Header as='h3'>
        <a href={pageUrl || ''} target='_blank'>
          {orgTitle}
        </a>
      </Header>
      {
        !engTitle && !romTitle ?
        null :
        <div>
          {engTitle}{' '}
          {
            romTitle ?
            <span>{`(${romTitle})`}</span> :
            null
          }
        </div>
      }
      </>
    )
  }
}
    
export default TitleLink;