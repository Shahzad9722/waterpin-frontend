import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainerAlt, WizardRightHandContainer, WizardHeader} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { useListcreationSlice } from "../slice";
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";
import { DefaultInput } from '../../../../components/input';

interface Props{
  setIndex:any;
  activeIndex:number;
}

export function Cancelation(props:Props) {
  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();
  const creationState = useSelector(selectListcreation)

  const handleCancellationClick = (name, currentValue) => {
    //console.log(event)
    if (currentValue === 0) {
      setTimeout(() => dispatch(actions.setCancelationDetails({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setCancelationDetails({name:name, value:0})), 0);
    }
  };

  const handleCancellationInput = (event) => {
    //console.log(event)
    const { name, value } = event.target;

    setTimeout(() => dispatch(actions.setCancelationDetails({name:name, value:value})), 0);

  };


  return (
    <>
      <Helmet>
        <title>Location</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <WizardContainer style={{border:"0px", background:"transparent"}}>
          <WizardLeftHandContainerAlt style={{justifyContent:"space-between"}}>
            <Box display={'flex'} flexDirection={'column'} height={"100%"} justifyContent={'center'}>
            <h1 style={{color:"white", marginBottom:0}}>Cancellation Policy</h1>
            <CancelationSubText>Select how you want to handle trip cancellations.</CancelationSubText>
            </Box>
            <Box>
            <CancelationSubText><b>Learn more</b> about cancellation options.</CancelationSubText>
            </Box>
          </WizardLeftHandContainerAlt>
          <WizardRightHandContainer >
            <Box flex={1} pr={2} width={'100%'}>
              <PolicyOption
                isActive={creationState.cancelation_policy.flexible === 1 ? true:false}
                key={0}
                onClick={(e) => {
                  handleCancellationClick('flexible',creationState.cancelation_policy.flexible);
                }}
              >

                <Box width={"35%"} pr={2} style={{borderRight:"1px solid #E0E0E0"}}>
                  <h4>Flexbile</h4>
                </Box>
                <Box pl={2}>
                  <p>Owner receives the full payment for cancellations made within 48 hours of trip start. <span style={{color:"#27AE60"}}>(Recommended)</span></p>
                </Box>
              </PolicyOption>
            </Box>
            <Box flex={1} pr={2} width={'100%'}>
              <PolicyOption
                isActive={creationState.cancelation_policy.moderate === 1 ? true:false}
                key={0}
                onClick={(e) => {
                  handleCancellationClick('moderate',creationState.cancelation_policy.moderate);
                }}
              >
                <Box width={"35%"} pr={2} style={{borderRight:"1px solid #E0E0E0"}}>
                  <h4>Moderate</h4>
                </Box>
                <Box pl={2}>
                  <p>Owner receives the full payment for cancellations made within 5 days of trip start date.</p>
                </Box>
              </PolicyOption>
            </Box>
            <Box flex={1} pr={2} width={'100%'}>
              <PolicyOption
                isActive={creationState.cancelation_policy.strict === 1 ? true:false}
                key={0}
                onClick={(e) => {
                  handleCancellationClick('strict',creationState.cancelation_policy.strict);
                }}
              >
                <Box width={"35%"} pr={2} style={{borderRight:"1px solid #E0E0E0"}}>
                  <h4>Strict</h4>
                </Box>
                <Box pl={2}>
                  <p>Owner receives the full funds for cancellations made within 7 days of the trip start date.</p>
                </Box>
              </PolicyOption>
            </Box>
            <Box flex={1} pr={2} width={'100%'}>
              <PolicyOption
                isActive={creationState.cancelation_policy.use_your_own !== '' ? true:false}
              >
                <Box width={"35%"} pr={2} style={{borderRight:"1px solid #E0E0E0"}}>
                  <h4>Use Your Own</h4>
                </Box>
                <Box pl={2}>
                  <DefaultInput name="use_your_own" type={"text"} onChange={handleCancellationInput} value={creationState.cancelation_policy.use_your_own} placeholder="Enter custom policy..." label=""/>
                </Box>
              </PolicyOption>
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

export const GetingStartedHeader = styled.h1`
  color:white;
`;

export const CancelationSubText = styled.p`
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

export const PolicyOption = styled.div<{isActive:boolean}>`
  display:flex;
  flex-direction:row;
  align-items:center;
  background: #ffffff;
  color: #333333;
  font-family: GilroyBold;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 15px;
  cursor: pointer;
  transition: 0.3s;
  text-align: left;
  padding: 1.363vw 1rem;
  transition: 0.2s;
  max-height: 100px;

  ${({ isActive }) => isActive && `
    border: 3px solid #333333;
   `}
`;
