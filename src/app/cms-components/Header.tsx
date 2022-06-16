import React from 'react'
import Typography from '@mui/material/Typography';

const Header = ({blok}) => {
  return (
    <Typography align={blok.text_align} variant={blok.headerType} color={blok.color} fontSize={blok.size_base}>
      {blok.text}
    </Typography>
  )
}

export default Header
