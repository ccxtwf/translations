import {
  Header,
  BreadcrumbSection,
  BreadcrumbDivider,
  Breadcrumb,
} from 'semantic-ui-react';

function HeaderComponent() {
  return (
    <>
    <Header size='large'>
      CoolMikeHatsune22 - List of Translations
    </Header>
    <Breadcrumb>
      <BreadcrumbSection href='https://coolmikehatsune22.wordpress.com/' title='Back to Wordpress'>Home</BreadcrumbSection>
      <BreadcrumbDivider icon='right chevron' />
      <BreadcrumbSection link active>List of Translations</BreadcrumbSection>
    </Breadcrumb>
    <hr />
    </>
  )
}

export default HeaderComponent;