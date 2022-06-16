import React from 'react'
import DynamicComponent from '../cms-components/DynamicComponent'
import { Grid as UIGrid } from '@mui/material'

export const Grid = ({ blok }) => {
  return (
    <UIGrid container spacing={2}>
      {blok.columns.map((blok) =>
        (<DynamicComponent blok={blok} key={blok._uid}/>
        )
      )}
    </UIGrid>
  )
}

export const GridItem = ({ blok }) => {
  return (
    <UIGrid item xs={blok.xs} sm={blok.sm} md={blok.md}>
      {blok.columns.map((blok) =>
        (<DynamicComponent blok={blok} key={blok._uid}/>
        )
      )}
    </UIGrid>
  )
}
