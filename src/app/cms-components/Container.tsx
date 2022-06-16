import React from 'react'
import DynamicComponent from '../cms-components/DynamicComponent'
import {Container as UIContainer} from '@mui/material';

const Container = ({ blok }) => {
  return (
    <UIContainer maxWidth={blok.size}>
    {blok.content.map((blok) =>
      (<DynamicComponent blok={blok} key={blok._uid}/>
      )
    )}
    </UIContainer>
  )
}

export default Container
