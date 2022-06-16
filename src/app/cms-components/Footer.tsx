import React from 'react'
import DynamicComponent from '../cms-components/DynamicComponent'
import { Item } from '../components/Nav'

import styled, { keyframes }from 'styled-components/macro';
import * as BootrapIcons from "react-icons/bs";

const Footer = ({blok}) => {

  //const [isMobile] = useMediaQuery("(max-width: 425px)")

  return (
    <FooterContainer>

    </FooterContainer>
  )
}

export const FooterLink = styled.a`
  color:#fff;
  &:hover {
    opacity: 0.8;
    color: #994AA4;
  }
`;

export const FooterIcon = styled.img`
  width:15rem;
`;

export const FooterHeading = styled.h2`
  font-style: normal;
  font-weight: 500;
  font-size: 2.0rem;
  line-height: 44px;
  color: #994AA4;
  margin-bottom:1rem;
`;

export const FooterContainer = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items:center;
  flex-direction:column;
  padding:2rem 5rem;
  margin-bottom:5px;
  width: 100%;
  background: #000;
  transition:  transform 250ms;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;
  background-image: url(${process.env.PUBLIC_URL + '/nav-bg.svg'});
  border-top: 1rem solid #994AA4;

`;

export default Footer
