import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';

interface Props{
  setIndex:any;
  activeIndex:number;
}

export function Pictures(props:Props) {

  const history = useHistory();


  return (
    <>
      <Helmet>
        <title>Location</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <WizardContainer>
          <WizardLeftHandContainer>
            <GetingStartedHeader>Pictures are everything!</GetingStartedHeader>
          </WizardLeftHandContainer>
          <WizardRightHandContainer style={{alignItems:"center"}}>
            <PictureAdviceImage>
              <img src={process.env.PUBLIC_URL+'/camera.svg'}/>
            </PictureAdviceImage>
            <PictureAdviceContainer>
              <Box style={{wordBreak:"normal"}} pr={2}>
                <h2>01</h2>
              </Box>
              <Box>
                <p>Boats with high-quality pictures tend to get booked the most.</p>
              </Box>
            </PictureAdviceContainer>
            <PictureAdviceContainer>
              <Box style={{wordBreak:"normal"}} pr={2}>
                <h2>02</h2>
              </Box>
              <Box>
                <p>Make sure you post enough photos to give the renters a true understanding of what they are renting.</p>
              </Box>
            </PictureAdviceContainer>
            <PictureAdviceContainer>
              <Box style={{wordBreak:"normal"}} pr={2}>
                <h2>03</h2>
              </Box>
              <Box>
                <p>Exterior pictures are great, but don't forget the interior!! People want to see the whole boat and why it stands out.</p>
              </Box>
            </PictureAdviceContainer>

          </WizardRightHandContainer>
        </WizardContainer>
        <WizardButtonFlex>
          <WizardSecondaryBtn
             name={"Back"}
             onClick={()=>props.setIndex(props.activeIndex-1)}
             disabled={false}
           >
            Back
           </WizardSecondaryBtn>

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

export const PictureAdviceContainer = styled.div`
  display:flex;
  justify-content:flex-start;
  align-items:center;
  background: #FFFFFF;
  box-shadow: 0px 0px 5px rgba(179, 179, 179, 0.25);
  border-radius: 15px;
  margin-bottom:10px;
  padding:10px;
`;

export const GetingStartedHeader = styled.h1`
  color:white;
`;

export const GetingStartedSubText = styled.p`
  color:white;
`;

export const PictureAdviceImage = styled.div`
  width: 50px;
  height: 50px;
  display:flex;
  align-items:center;
  justify-content:center;
  align-content:center;
  img{
    width:100%;
    height:100%;
  }
`;
