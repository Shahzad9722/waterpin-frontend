import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton,InputBase,Grid, Checkbox, FormControlLabel} from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer, WizardFormLabel, WizardFormBox } from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { BasicModal } from '../../../../components/modals';

import { useListcreationSlice } from "../slice";
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";

interface Props{
  setIndex:any;
  activeIndex:number;
}

export function Rules(props:Props) {

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const history = useHistory();

  const [addOptionActive, set_addOptionActive] = React.useState(false);
  const [addOptionType, set_addOptionType] = React.useState('');
  const [addOptionName, set_addOptionName] = React.useState('');

  const creationState = useSelector(selectListcreation)

  const toggleAddOptionModal = () => {
    set_addOptionActive(!addOptionActive)
  };

  function handleAddOther(type:string) {
    setTimeout(() => dispatch(actions.addBoatRules({value:{name:addOptionName,value:1}})), 0);
    toggleAddOptionModal()
  }

  const handleCheckRules = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setBoatRules({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setBoatRules({name:name, value:0})), 0);
    }
  };


  const handleNoRulesCheck = event => {
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.toggleOffAllRules()), 0);
    }
  };




  function addOther(type:string) {
    set_addOptionType('rules')
    set_addOptionName('')
    toggleAddOptionModal()
  }

  return (
    <>
      <Helmet>
        <title>Location</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <BasicModal onClose={toggleAddOptionModal} open={addOptionActive} title={'Add Option'}>
          <Box flex={1} display={'flex'} width={"100%"}>
          <InputBase
              name={'addOptionName'}
              sx={{ ml: 1, width:"100%"}}
              type={'text'}
              placeholder={`Add a new boat rule.`}
              value={addOptionName}
              onChange={(e)=>set_addOptionName(e.target.value)}
              inputProps={{ 'aria-label': 'AddOnName' }}
            />
          </Box>
          <WizardButtonFlex>
            <Box pr={1}>
              <DefaultButton onClick={()=>set_addOptionActive(!addOptionActive)} text="Cancel" type="secondary"/>
            </Box>
            <Box pl={1}>
              <DefaultButton onClick={()=>handleAddOther(addOptionType)} text="Add" type="primary"/>
            </Box>
          </WizardButtonFlex>

      </BasicModal>
      <Container>
        <WizardContainer>
          <WizardLeftHandContainer>
            <GetingStartedHeader>What Are Your Boat Rules?</GetingStartedHeader>
          </WizardLeftHandContainer>
          <WizardRightHandContainer>
            <Box display={'flex'} justifyContent={'space-between'} width={"100%"} alignItems={'center'}>
              <h3>Rules</h3>
              <Box>
                <FormControlLabel control={<Checkbox
                  name={"no-rules"}
                  inputProps={{ 'aria-label': 'controlled' }} onChange={(e)=>handleNoRulesCheck(e)} />} label="No Specified Rules" />

              </Box>
            </Box>
            <Grid container spacing={2}>

              {creationState.listing.rules !== null && creationState.listing.rules.map((rule:any) => (
                <Grid item xs={6}>
                  <WizardFormBox>
                    <WizardFormLabel>
                      {rule.name}
                    </WizardFormLabel>
                    <Checkbox
                      name={rule.name}
                      checked={rule.value === 1 ? true:false}
                      onChange={(e)=>handleCheckRules(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </WizardFormBox>
                </Grid>
              ))}
              <Grid item xs={'auto'}>
                <WizardFormBox onClick={()=>addOther('exterior')} style={{cursor:"pointer"}}>
                  <WizardFormLabel style={{color:"#4285F4"}}>
                    Add Other
                  </WizardFormLabel>
                  <div>
                    <p style={{color:"#4285F4"}}><b>+</b></p>
                  </div>
                </WizardFormBox>
              </Grid>

            </Grid>
            <div></div>
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
