import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton, Checkbox } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer,WizardHeader} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { useListcreationSlice } from "../slice";
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";

interface Props{
  setIndex:any;
  activeIndex:number;
}

export function InsuranceCertify(props:Props) {

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();
  const history = useHistory();
  const creationState = useSelector(selectListcreation)

  const handleCheckCertify = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setInsuranceDetails({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setInsuranceDetails({name:name, value:0})), 0);
    }
  };



  return (
    <>
      <Helmet>
        <title>Insurance Certify</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <WizardContainer>
          <WizardLeftHandContainer>
            <WizardHeader>Commercial operators must have their own insurance in order to list on Waterpin</WizardHeader>
          </WizardLeftHandContainer>
          <WizardRightHandContainer>
            <Box display={'flex'} width={"100%"} alignItems={'center'} flexDirection={'column'} justifyContent={'center'} height={'100%'}>
            <h3>You are required to have a current commercial boat policy that insures your boat and passengers.</h3>
            <p>Your policy should provide the minimum liability coverage required by law in your area. Beeyondboats has the right to request a copy of your vessel’s insurance at any time; failure to provide it in a timely fashion can result in cancellation of bookings, removal of your listing from the site, and termination of your account.</p>
            <Box display={'flex'} width={"100%"} alignItems={'center'}>
              <Checkbox
                name="certified"
                checked={creationState.insurance.certified}
                inputProps={{ 'aria-label': 'controlled' }}
                onChange={(e)=>handleCheckCertify(e)}

              />
              <h3 style={{color:"#4285F4"}}>I certify that I have commercial insurance.</h3>
            </Box>
            </Box>
            <p><b>Learn more</b> about insurance options.</p>
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
