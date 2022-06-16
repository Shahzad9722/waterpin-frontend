import * as React from 'react';
import { Container, Stack, Divider, Box, Button, IconButton, InputBase} from '@mui/material';
import styled from 'styled-components/macro';

export const WizardSelect = styled.select`
  width: 100%;
  height: 60px;
  padding:10px;
  background: #FFFFFF;
  border-radius: 10px;
`;

export const WizardSelectOption = styled.option`
  width: 100%;
  max-height: 240px;
  overflow-y: scroll;
  padding: 15px 20px;
  border-bottom-right-radius: 7px;
  border-bottom-left-radius: 7px;
  position: absolute;
  background: white;
  z-index: 10;
  font-family: GilroyBold;
  font-size: 20px;
  line-height: 23px;
  box-shadow: 0px 4px 20px rgba(179, 179, 179, 0.25);
  border-top: 2px solid #e6e6e6;
`;

export const WizardField = styled(InputBase)`
  outline: none;
  border: none;
  border-radius: 8px;
  background: #ececec;
  padding: 5px 10px;
  width: 100%;
`;

export const FieldLabel = styled.p`
  font-weight: 900;
  font-size: 0.9rem;
`;

export const WizardButton = styled.div<{isActive:boolean}>`
  background: #ffffff;
  color: #333333;
  font-family: GilroyBold;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  font-size: 0.8vw;
  padding: 0.8vw 0px;
  transition: 0.2s;

  ${({ isActive }) => isActive && `
    border: 3px solid #333333;
   `}
`;
