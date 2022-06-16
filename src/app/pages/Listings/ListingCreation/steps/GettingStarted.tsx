import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";

interface Props{
  setIndex:any;
  activeIndex:number;
}

export function GettingStarted(props:Props) {

  const history = useHistory();
  const creationState = useSelector(selectListcreation)


  return (
    <>
      <Helmet>
        <title>Getting Started</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <WizardContainer>
          <WizardLeftHandContainer>
            <GetingStartedHeader>Micheal made $2500 last month with his yacht.</GetingStartedHeader>
            <GetingStartedImage>
              <img src={process.env.PUBLIC_URL + '/images/michael.jpeg'}/>
            </GetingStartedImage>
            <GetingStartedSubText>Start Earning Income today!</GetingStartedSubText>
          </WizardLeftHandContainer>
          <WizardRightHandContainer style={{background:"transparent", justifyContent:"center"}}>
          <Box>
          <GetingStartedHeader>List Your {creationState.listingType || ''}  in 3 Easy Steps</GetingStartedHeader>
          <GetingStartedSubText>1. Help us Understand More about your {creationState.listingType || ''}</GetingStartedSubText>
          <GetingStartedSubText>2. What Makes Your {creationState.listingType || ''}  Unique.</GetingStartedSubText>
          <GetingStartedSubText>3. Policies</GetingStartedSubText>
          </Box>
          </WizardRightHandContainer>
        </WizardContainer>
        <WizardButtonFlex>
           <Box></Box>
           <WizardNextBtn
              name={"cancel"}
              onClick={()=>props.setIndex(props.activeIndex+1)}
              disabled={false}
            >
             Next
            </WizardNextBtn>
        </WizardButtonFlex>
      </Container>
    </>
  );
}

export const GetingStartedHeader = styled.h1`
  color:white;
`;

export const GetingStartedSubText = styled.p`
  color:white;
`;

export const GetingStartedImage = styled.div`
  width: 100%;
  height: 315px;
  display:flex;
  align-items:center;
  justify-content:center;
  align-content:center;
  img{
    border-radius: 20px;
    width:100%;
    height:100%;
  }
`;
