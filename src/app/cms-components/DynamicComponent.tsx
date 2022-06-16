import SbEditable from 'storyblok-react'
// import Grid from './Grid'
// import Feature from './Feature'
import Page from './Page'
import Row from './Row'
import Column from './Column'
import HeroContainer from './HeroContainer'
// import HeroContainer from './HeroContainer'
import Image from './Image'
import Header from './Header'
import Icon from './Icon'
import TextComponent from './Text'
// import {RichTextField} from './Text'
import ButtonComponent from './Button'
import Section from './Section'
// import Link from './Link.js'
import Container from './Container'
import Footer from './Footer'

// import Post from './Post'
// import BlogList from './BlogList'


// resolve Storyblok components to Next.js components
const Components = {
  // 'grid': Grid,
  // 'feature': Feature,
  'page': Page,
  //'post': Post,
  // 'post_list': BlogList,
  'row': Row,
  'container': Container,
  'column':Column,
  'heading': Header,
  // 'richtext': RichTextField,
  'text': TextComponent,
  'button': ButtonComponent,
  'image': Image,
  'icon': Icon,
  'section': Section,
  // 'hero_container': HeroContainer,
  'hero_container': HeroContainer,
  'footer': Footer,
  // 'footer':Footer,
  // 'link': Link,
}

const DynamicComponent: React.FC<{blok:any}> = ({blok}) => {
  // check if component is defined above
  if (typeof Components[blok.component] !== 'undefined') {
    const Component = Components[blok.component]
    // wrap with SbEditable for visual editing
    return (<SbEditable content={blok}><Component blok={blok} /></SbEditable>)
  }

  // fallback if the component doesn't exist
  return (<p>The component <strong>{blok.component}</strong> has not been created yet.</p>)
}

export default DynamicComponent
