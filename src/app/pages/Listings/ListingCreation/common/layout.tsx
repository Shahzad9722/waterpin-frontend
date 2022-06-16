import * as React from 'react';
import { Container, Stack, Divider, Box, Button, IconButton } from '@mui/material';
import styled from 'styled-components/macro';

export const ListingCreateButton = styled.div<{isActive:boolean}>`
  background: #ffffff;
  color: #333333;
  font-family: GilroyBold;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s;
  text-align: center;
  font-size: 1.042vw;
  padding: 1.563vw 0px;
  transition: 0.2s;

  ${({ isActive }) => isActive && `
    border: 3px solid #333333;
   `}
`;


export const WizardFooter = styled.div`
  background: #FFFFFF;
  display: flex;
  align-items: center;
  width: 100%;
  height:100px;
  justify-content:space-around;
  bottom:0;
`;


export const WizardLinkCancel = styled.a`
  font-family: GilroyBold;
  font-size: 20px;
  line-height: 23px;
  align-items: center;
  text-align: center;
  color: #BDBDBD;
  margin-right:60px;
  cursor:pointer;
  transition: all ease-in-out .2s;
  &&:hover{
    color: red;
  }
`;

export const WizardLinkSave = styled.a`
  font-family: GilroyBold;
  font-size: 20px;
  line-height: 23px;
  align-items: center;
  text-align: center;
  color: #4285F4;
  cursor:pointer;
  transition: all ease-in-out .2s;
  &&:hover{
    color: #0060ff;
  }
`;


export const WizardHeaderIcon = styled.img`
  width:50px;
  height:50px;
  margin-right:20px;
`;


export const WizardHeaderContainer = styled.div`
  background: #FFFFFF;
  box-shadow: 0px 4px 20px rgba(179, 179, 179, 0.25);
  display: flex;
  margin-right: -1rem;
  align-items: center;
  width: 100%;
  height:100px;
  justify-content:space-around;
`;

export const WizardLeftHandContainerAlt = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:flex-start;
  flex-basis: 100%;
  flex: 1;
  padding:10px 30px;
  border-radius: 20px;
  background: linear-gradient(0deg, #4285F4, #4285F4);

`;


export const WizardLeftHandContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:center;
  align-items:flex-start;
  flex-basis: 100%;
  flex: 1;
  padding:10px 30px;
`;

export const WizardRightHandContainer = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  align-items:flex-start;
  align-content:flex-start;
  background:#fff;
  flex-basis: 100%;
  flex: 1;
  border-radius: 0px 18px 18px 0px;
  padding:35px;
`;

export const WizardContainer = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:flex-start;
  flex-wrap:wrap;
  min-height:560px;
  width:100%;
  background: linear-gradient(0deg, #4285F4, #4285F4);
  border-radius: 20px;
  margin-top:45px;
  border: 2px solid #4285F4;
`;

export const WizardButtonFlex = styled.div`
  display:flex;
  flex-direction:row;
  justify-content:space-between;
  margin-top:45px;
  margin-bottom:20px;
`;


export const WizardNextBtn = styled(Button)`
  && {
    width: 16vw;
    max-width:200px;
    height: 60px;
    color: #fff;
    font-family: GilroyBold;
    font-size: 20px;
    line-height: 28px;
    text-transform: capitalize;
    padding:.5vw 0;

    background: linear-gradient(0deg, #4285F4, #4285F4);
    border-radius: 10px;

    &&:hover{

    }

    &&:disabled{
      background: #f3f3f3;
      cursor: not-allowed;
      pointer-events:auto;
    }


  }
`;

export const WizardSecondaryBtn = styled(Button)`
  && {
    width: 16vw;
    max-width:200px;
    color: #fff;
    font-family: GilroyBold;
    font-size: 20px;
    line-height: 28px;
    text-transform: capitalize;
    background: #e0e0e0;
    border-radius: 15px;
    color: #3C4848;
    padding:.5vw 0;

    &&:hover{
      background: #e0e0e0;
    }

    &&:disabled{
      background: #f3f3f3;
      cursor: not-allowed;
      pointer-events:auto;
    }


  }
`;

export const WizardFormLabel = styled.p`
  font-family: GilroyMedium;
  font-size: 16px;
  line-height: 19px;
  color: #333333;
`;


export const WizardFormBox = styled.div`
  display:flex;
  flex-direction:row;
  align-items:center;
  justify-content:space-between;
  flex:1;
  height: 50px;
  padding:15px;
  min-width:150px;
  background: #FFFFFF;
  border: 2px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 10px;
`;

export const WizardCardContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 20px;
  margin-top:60px;
`;

export const WizardCardHeader = styled.h1`
  padding: 20px 0px;
  text-align: center;
  font-family: GilroyBold;
  font-size: 24px;
  color: #333333;
  border-bottom: 1px solid #e0e0e0;
`;

export const WizardCardBody = styled.div`
  padding: 40px 2.604vw;
`;

export const WizardHeader = styled.h2`
  color:white;
`;

export const ButtonFlex = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items:center;
  flex-direction:row;
  flex-wrap:wrap;
  width:100%;
`;
