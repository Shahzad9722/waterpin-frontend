import React from 'react'
import { Box } from '@mui/material';
import styled from 'styled-components';

import DynamicComponent from '../cms-components/DynamicComponent'

const HeroContainer = ({ blok }) => {

  const Hero = styled.div`
    display:${blok.display || 'flex'};
    justify-content: ${blok.justify};
    align-items:center;
    flex-direction:column;
    padding:${blok.padding};
    margin-bottom:5px;
    width:${blok.width || "100%"};
    height: ${blok.height || "auto"};
    max-width: ${blok.max_width};
    max_height: ${blok.max_height};
    border-radius:${blok.borderRadius};
    flex:1;
    background-color: ${blok.bg_color};
    transition:  transform 250ms;
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center center;
    background-image: url(${blok.bgImage.filename});
  `;

  return(
<>
    <Hero>
      {blok.content.map((blok) =>
        (<DynamicComponent blok={blok} key={blok._uid}/>
        )
      )}
    </Hero>
  </>
  )

}

export default HeroContainer
