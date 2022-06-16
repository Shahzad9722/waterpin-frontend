import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton, TextareaAutosize } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { DefaultInput } from '../../../../components/input';
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";
import { useListcreationSlice } from "../slice";
import { FieldLabel} from '../common/input';


interface Props{
  setIndex:any;
  activeIndex:number;
}

export function Title(props:Props) {

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();


  const history = useHistory();

  const creationState = useSelector(selectListcreation)

  const handleInputChange = event => {
    //console.log(event)
    const { name, value } = event.target;
    setTimeout(() => dispatch(actions.setListingDetails({name:name, value:value})), 0);
  };

  return (
    <>
      <Helmet>
        <title>Location</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <WizardContainer>
          <WizardLeftHandContainer>
            <GetingStartedHeader>Give Your {creationState.listingType || ''} A Title And Description</GetingStartedHeader>
          </WizardLeftHandContainer>
          <WizardRightHandContainer>
            <Box width={'100%'} height={'100%'}>
            <FieldLabel>Listing Name</FieldLabel>
            <DefaultInput name="listing_name" type={"text"} onChange={handleInputChange} value={creationState.listing.listing_name} placeholder="Ex: Miami’s Newest Boat" label="Listing Name"/>
            <FieldLabel>Describe Your {creationState.listingType || ''}</FieldLabel>
            <TextAreaBox name="list_discription" onChange={handleInputChange} value={creationState.listing.list_discription} placeholder="Write a brief description and give your boat personality. Ex: Below is more information on our 103' Johnson:" aria-label="Describe Your Boat"/>
            </Box>
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

export const TextAreaBox = styled(TextareaAutosize)`
  border-radius: 11px;
  font-family: GilroyRegular;
  font-size:16px;
  line-height: 23px;
  padding: 1.302vh 1.563vw;
  display: flex;
  align-items: center;
  color: #4f4f4f;
  background:#FAFAFA;
  width:100%;
  height:375px !important;
  border: 0px solid black;
`;

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
