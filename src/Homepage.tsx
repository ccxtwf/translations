// import { useState } from 'react';

import { 
  Header, 
  BreadcrumbSection,
  BreadcrumbDivider,
  Breadcrumb,
  Icon,
  Segment
} from 'semantic-ui-react';

interface HomepageProps {
  error: any
}

function Homepage({ error }: HomepageProps) {
  return (
    <>
    <main>

      <header>
        <Header as="h1">List of Translations</Header>
        <Breadcrumb size='tiny'>
          <BreadcrumbSection link>
            <Icon name='home' size='small' />Home
          </BreadcrumbSection>
          <BreadcrumbDivider icon='right chevron' />
          <BreadcrumbSection link>
            <Icon name='list alternate' size='small' />List of Translations
          </BreadcrumbSection>
        </Breadcrumb>
      </header>

      <section>
        <Segment>Lorem ipsum dolor sit amet</Segment>
      </section>

      <section>
        {error 
          ? 
          (<div>Error: cannot query data</div>) 
          : 
          ()
        }
      </section>

    </main>
    </>
  )
}

export default Homepage;