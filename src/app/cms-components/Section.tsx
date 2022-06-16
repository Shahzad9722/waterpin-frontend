import React from 'react'
import DynamicComponent from '../cms-components/DynamicComponent'

const Section = ({ blok }) => {
  return (
    <section id={blok.sectionID} style={{backgroundColor:blok.bg_color}}>
      {blok.content.map((blok) =>
        (<DynamicComponent blok={blok} key={blok._uid}/>
        )
      )}
    </section>

  )
}

export default Section
