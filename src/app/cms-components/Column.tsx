import React from 'react'
import { Box } from '@mui/material';
import DynamicComponent from '../cms-components/DynamicComponent'

const Column = ({ blok }) => {
  return (
    <Box display={blok.display} flexGrow={1} alignItems={'center'}  justifyContent={blok.justify}  height={blok.height || "auto"} padding={blok.padding || "0px"} maxWidth={blok.max_width || '600px'} maxHeight={blok.max_height} color={blok.color} borderRadius={blok.borderRadius} borderColor={blok.borderColor} overflow={blok.overflow}>
      {blok.content.map((blok) =>
        (<DynamicComponent blok={blok} key={blok._uid}/>
        )
      )}
    </Box>
  )
}

export default Column
