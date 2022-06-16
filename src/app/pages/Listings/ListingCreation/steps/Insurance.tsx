import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer, WizardHeader} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { DefaultToolTip } from '../../../../components/tooltips';

import { useListcreationSlice } from "../slice";
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";
interface Props{
  setIndex:any;
  activeIndex:number;
}

export function Insurance(props:Props) {

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const history = useHistory();

  const creationState = useSelector(selectListcreation)

  const handleInsuranceClick = (name, currentValue) => {
    //console.log(event)
    //const { name, value } = event.target;
    if (currentValue === false) {
      setTimeout(() => dispatch(actions.setInsuranceDetails({name:name, value:true})), 0);
    }else{
      setTimeout(() => dispatch(actions.setInsuranceDetails({name:name, value:false})), 0);
    }
  };



  return (
    <>
      <Helmet>
        <title>Location</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <WizardContainer>
          <Box display={'flex'} alignItems={'center'} justifyContent={'center'} width={"100%"} flexDirection={'column'}>
            <WizardHeader>Select an Insurance Option</WizardHeader>
            <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>

            </Box>
            <WizardButtonFlex>
              <InsuranceBtn selected={creationState.insurance.waterpins_insurance} onClick={(e)=>handleInsuranceClick('waterpins_insurance', creationState.insurance.waterpins_insurance)}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                  <DefaultToolTip title="Use one of Waterpin's premier insurance plans to cover liability.">
                    <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                  </DefaultToolTip>
                </Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <h4>Use Waterpins Insurance</h4>
                </Box>
              </InsuranceBtn>
              <InsuranceBtn selected={creationState.insurance.own_insurance} onClick={(e)=>handleInsuranceClick('own_insurance', creationState.insurance.own_insurance)}>
                <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                  <DefaultToolTip title="Use your own insurance plan to cover liability.">
                    <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                  </DefaultToolTip>
                </Box>
                <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                  <h4>I have my own Insurance</h4>
                </Box>
              </InsuranceBtn>
            </WizardButtonFlex>
          </Box>
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

export const HelpIcon = styled.img`
  width: 25px;
  height: 25px;
`;

export const InsuranceIcon = styled.img`
  width: 150px;
  height: 150px;
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

export const InsuranceBtn = styled.div<{selected:boolean}>`
  display:flex;
  flex-direction:column;
  align-items:stretch;
  justify-content:center;
  align-content:center;
  text-align:center;
  width: 345px;
  height: 200px;
  box-sizing: border-box;
  cursor:pointer;
  padding:10px;
  background: #FFFFFF;
  box-shadow: 0px 0px 10px rgba(179, 179, 179, 0.25);
  border-radius: 10px;
  transition: all ease-in .15s;
  border: 3px solid transparent;

  &&:hover{
    color: #4285F4;
    background:white;
    border: 3px solid #4285F4;
  }

  ${({ selected }) => selected && `
    color: #4285F4;
    background:white;
    border: 3px solid #4285F4;
   `}

`;

export const InsuranceContainer = styled.div`
  display:flex;
  flex-direction:column;
  align-items:center;
  justify-content:center;
  align-content:center;
  text-align:center;
  width: 795px;
  height: 440px;
  background: #FFFFFF;
  margin:auto;
  margin-top:75px;
  padding:25px;
`;
