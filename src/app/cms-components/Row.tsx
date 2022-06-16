import React from 'react'
import { Box } from '@mui/material';
import DynamicComponent from '../cms-components/DynamicComponent'

const Row = ({ blok }) => {
  return (
    <Box display={'flex'} width={'100%'} alignItems={blok.align} flexDirection={blok.direction} flexGrow={blok.grow} justifyContent={blok.justify} flexShrink={blok.shrink} flexWrap={blok.wrap}  mt={blok.margin_top} ml={blok.margin_left} mr={blok.margin_top} mb={blok.margin_bottom}>
      {blok.columns.map((blok) =>
        (<DynamicComponent blok={blok} key={blok._uid}/>
        )
      )}
    </Box>
  )
}

export default Row
