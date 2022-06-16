import React from 'react'
import {Button} from '@mui/material';


const ButtonComponent = ({blok}) => {
  return (
      <Button
        name={blok && blok.name || ''}
        onClick={blok.onClick}
        color="success"
        >
        {blok.text}
      </Button>
  )
}

export default ButtonComponent
