import React from 'react'
import DynamicComponent from '../cms-components/DynamicComponent'
import {Link as UILink} from "@mui/material";

const Link = ({ blok }) => {
  return (
    <UILink href={blok.link}>{blok.text}</UILink>
  )
}

export default Link
