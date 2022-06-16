import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { DefaultToolTip } from '../../../../components/tooltips';

import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";
import { useListcreationSlice } from "../slice";

interface Props{
  setIndex:any;
  activeIndex:number;
}

export function Category(props:Props) {

  const history = useHistory();

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const creationState = useSelector(selectListcreation)

  const handleCategoryClick = (name, currentValue) => {
    //console.log(event)
    //const { name, value } = event.target;
    if (currentValue === 0) {
      setTimeout(() => dispatch(actions.setListingDetails({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setListingDetails({name:name, value:0})), 0);
    }
  };


  return (
    <>
      <Helmet>
        <title>Location</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <TripCategoryContainer>
          <h2 style={{marginBottom:"0px"}}>What does Your Boat Offer?</h2>
          <p><b>Owners that offer both Day Trips & Overnight Stays make 40% more on average.</b></p>
          <WizardButtonFlex>
            <Box>
            <TripCategoryBtn selected={creationState.listing.day_trips === 1? true: false} onClick={(e)=>handleCategoryClick('day_trips', creationState.listing.day_trips)}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                <DefaultToolTip title="Allow guests to use your watercraft during the day.">
                  <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                </DefaultToolTip>
              </Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <TripCategoryIcon src={process.env.PUBLIC_URL+'/sun.svg'}/>
              </Box>
            </TripCategoryBtn>
            <h3>Day Trips</h3>
            </Box>
            <Box>
            <TripCategoryBtn style={{marginLeft:10}} selected={creationState.listing.overnight_stays === 1? true: false} onClick={(e)=>handleCategoryClick('overnight_stays', creationState.listing.overnight_stays)}>
              <Box display={'flex'} alignItems={'center'} justifyContent={'flex-end'}>
                <DefaultToolTip title="Allow guests to stay on your watercraft overnight.">
                  <HelpIcon src={process.env.PUBLIC_URL+'/info.svg'}/>
                </DefaultToolTip>
              </Box>
              <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <TripCategoryIcon src={process.env.PUBLIC_URL+'/moon.svg'}/>
              </Box>
            </TripCategoryBtn>
            <h3>Overnight Stays</h3>
            </Box>
          </WizardButtonFlex>
        </TripCategoryContainer>

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

export const HelpIcon = styled.img`
  width: 25px;
  height: 25px;
`;

export const TripCategoryIcon = styled.img`
  width: 150px;
  height: 150px;
`;

export const TripCategoryBtn = styled.div<{selected:boolean}>`
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

export const TripCategoryContainer = styled.div`
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
