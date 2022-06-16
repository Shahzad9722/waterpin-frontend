import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton, Grid, InputBase, Checkbox} from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { BasicModal } from '../../../../components/modals';

import { useListcreationSlice } from "../slice";
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";

interface Props{
  setIndex:any;
  activeIndex:number;
}

export function Amenities(props:Props) {


  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const [addOptionActive, set_addOptionActive] = React.useState(false);
  const [addOptionType, set_addOptionType] = React.useState('');
  const [addOptionName, set_addOptionName] = React.useState('');

  const history = useHistory();
  const creationState = useSelector(selectListcreation)

  const handleInputChange = event => {
    event.preventDefault()
    const { name, value } = event.target;
    setTimeout(() => dispatch(actions.setAmenitiesInterior({name:name, value:value})), 0);
  };

  const handleCheckChangeInterior = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setAmenitiesInterior({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setAmenitiesInterior({name:name, value:0})), 0);
    }
  };

  const handleCheckChangeInteriorOther = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setAmenitiesInteriorOther({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setAmenitiesInteriorOther({name:name, value:0})), 0);
    }
  };

  const handleCheckChangeExterior = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setAmenitiesExterior({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setAmenitiesExterior({name:name, value:0})), 0);
    }
  };

  const handleCheckChangeExteriorOther = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setAmenitiesExteriorOther({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setAmenitiesExteriorOther({name:name, value:0})), 0);
    }
  };



  const handleCheckChangeSafety = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setAmenitiesSafety({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setAmenitiesSafety({name:name, value:0})), 0);
    }
  };

  const handleCheckChangeSafetyOther = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setAmenitiesSafetyOther({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setAmenitiesSafetyOther({name:name, value:0})), 0);
    }
  };



  const handleCheckChangeWaterToys = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setAmenitiesWaterToys({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setAmenitiesWaterToys({name:name, value:0})), 0);
    }
  };

  const handleCheckChangeWaterToysOther = event => {
    event.preventDefault()
    const { name, value } = event.target;

    if (event.target.checked === true) {
      setTimeout(() => dispatch(actions.setAmenitiesWaterToysOther({name:name, value:1})), 0);
    }else{
      setTimeout(() => dispatch(actions.setAmenitiesWaterToysOther({name:name, value:0})), 0);
    }
  };

  const toggleAddOptionModal = () => {
    set_addOptionActive(!addOptionActive)
  };



  function addOther(type:string) {
    switch (true) {
      case type === "interior":
        set_addOptionType('interior')
        set_addOptionName('')
        toggleAddOptionModal()
        break;
      case type === "exterior":
        set_addOptionType('exterior')
        set_addOptionName('')
        toggleAddOptionModal()
        break;
      case type === "safety":
        set_addOptionType('safety')
        set_addOptionName('')
        toggleAddOptionModal()
        break;
      case type === "water_toys":
        set_addOptionType('water toys')
        set_addOptionName('')
        toggleAddOptionModal()
        break;

      default:
        break;
    }
  }

  function handleAddOther(type:string) {
    switch (true) {
      case type === "interior":
        setTimeout(() => dispatch(actions.addAmenitiesInteriorOther({value:{name:addOptionName,value:1}})), 0);
        break;
      case type === "exterior":
        setTimeout(() => dispatch(actions.addAmenitiesExteriorOther({value:{name:addOptionName,value:1}})), 0);
        break;
      case type === "safety":
        setTimeout(() => dispatch(actions.addAmenitiesSafetyOther({value:{name:addOptionName,value:1}})), 0);
        break;
      case type === "water_toys":
        setTimeout(() => dispatch(actions.addAmenitiesWaterToys({value:{name:addOptionName,value:1}})), 0);
        break;

      default:
        break;
    }

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
              placeholder={`Add a new ${addOptionType} amenity.`}
              value={addOptionName}
              onChange={(e)=>set_addOptionName(e.target.value)}
              inputProps={{ 'aria-label': 'AddOnName' }}
            />
          </Box>
          <ButtonFlex>
            <Box pr={1}>
              <DefaultButton onClick={()=>set_addOptionActive(!addOptionActive)} text="Cancel" type="secondary"/>
            </Box>
            <Box pl={1}>
              <DefaultButton onClick={()=>handleAddOther(addOptionType)} text="Add" type="primary"/>
            </Box>
          </ButtonFlex>

      </BasicModal>
      <Container>

        <YachtAmenitiesContainer>
        <Header>List Your Amenities</Header>
          <YachtAmenitiesBody>
            <YachtAmenitiesSection>
              <SectionHeader>Interior</SectionHeader>
              <Grid container spacing={2}>
                <Grid item xs={5}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Bedrooms
                    </YachtAmenitiesFormLabel>
                    <InputBase
                        name={'bedrooms'}
                        sx={{ ml: 1}}
                        type={'number'}
                        placeholder={"Bedrooms"}
                        value={creationState.interior.bedrooms}
                        onChange={(e)=>handleInputChange(e)}
                        inputProps={{ 'aria-label': 'Bedrooms', min:0 }}
                      />


                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={5}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Bathrooms
                    </YachtAmenitiesFormLabel>
                    <InputBase
                        name={'bathrooms'}
                        sx={{ ml: 1}}
                        type={'number'}
                        placeholder={"Bathrooms"}
                        value={creationState.interior.bathrooms}
                        onChange={(e)=>handleInputChange(e)}
                        inputProps={{ 'aria-label': 'Bathrooms', min:0 }}
                      />

                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Kitchen
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="kitchen"
                      checked={creationState.interior.kitchen === 1?true:false}
                      onChange={(e)=>handleCheckChangeInterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Refrigerator
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="refrigerator"
                      checked={creationState.interior.refrigerator === 1?true:false}
                      onChange={(e)=>handleCheckChangeInterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Microwave
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="microwave"
                      checked={creationState.interior.microwave === 1?true:false}
                      onChange={(e)=>handleCheckChangeInterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Air Conditioning
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="airconditioning"
                      checked={creationState.interior.airconditioning === 1?true:false}
                      onChange={(e)=>handleCheckChangeInterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      TV Stereo
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="tv_stereo"
                      checked={creationState.interior.tv_stereo === 1?true:false}
                      onChange={(e)=>handleCheckChangeInterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                {creationState.interior.other_amenities !== null && creationState.interior.other_amenities.map((amen:any) => (
                  <Grid item xs={'auto'}>
                    <YachtAmenitiesFormBox>
                      <YachtAmenitiesFormLabel>
                        {amen.name}
                      </YachtAmenitiesFormLabel>
                      <Checkbox
                        name={amen.name}
                        checked={amen.value === 1?true:false}
                        onChange={(e)=>handleCheckChangeInteriorOther(e)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </YachtAmenitiesFormBox>
                  </Grid>
                ))}
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox onClick={()=>addOther('interior')} style={{cursor:"pointer"}}>
                    <YachtAmenitiesFormLabel style={{color:"#4285F4"}}>
                      Add Other
                    </YachtAmenitiesFormLabel>
                    <div>
                      <p style={{color:"#4285F4"}}><b>+</b></p>
                    </div>
                  </YachtAmenitiesFormBox>
                </Grid>
              </Grid>
            </YachtAmenitiesSection>
            <YachtAmenitiesSection>
              <SectionHeader>Exterior</SectionHeader>
              <Grid container spacing={2}>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Flybridge
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="flybridge"
                      checked={creationState.exterior.flybridge === 1?true:false}
                      onChange={(e)=>handleCheckChangeExterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                       Swim platform
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="swim_platform"
                      checked={creationState.exterior.swim_platform === 1?true:false}
                      onChange={(e)=>handleCheckChangeExterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Swim Ladder
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="swim_ladder"
                      checked={creationState.exterior.swim_ladder === 1?true:false}
                      onChange={(e)=>handleCheckChangeExterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Anchor
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="anchor"
                      checked={creationState.exterior.anchor === 1?true:false}
                      onChange={(e)=>handleCheckChangeExterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}

                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Shower
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="shower"
                      checked={creationState.exterior.shower === 1?true:false}
                      onChange={(e)=>handleCheckChangeExterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Grill
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="grill"
                      checked={creationState.exterior.grill === 1?true:false}
                      onChange={(e)=>handleCheckChangeExterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Cooler
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="cooler"
                      checked={creationState.exterior.cooler === 1?true:false}
                      onChange={(e)=>handleCheckChangeExterior(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                {creationState.exterior.other_exterior_amenities !== null && creationState.exterior.other_exterior_amenities.map((amen:any) => (
                  <Grid item xs={'auto'}>
                    <YachtAmenitiesFormBox>
                      <YachtAmenitiesFormLabel>
                        {amen.name}
                      </YachtAmenitiesFormLabel>
                      <Checkbox
                        name={amen.name}
                        checked={amen.value === 1?true:false}
                        onChange={(e)=>handleCheckChangeExteriorOther(e)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </YachtAmenitiesFormBox>
                  </Grid>
                ))}
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox onClick={()=>addOther('exterior')} style={{cursor:"pointer"}}>
                    <YachtAmenitiesFormLabel style={{color:"#4285F4"}}>
                      Add Other
                    </YachtAmenitiesFormLabel>
                    <div>
                      <p style={{color:"#4285F4"}}><b>+</b></p>
                    </div>
                  </YachtAmenitiesFormBox>
                </Grid>
              </Grid>
            </YachtAmenitiesSection>
            <YachtAmenitiesSection>
              <SectionHeader>Safety</SectionHeader>
              <Grid container spacing={2}>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Life Jackets
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="life_jacket"
                      checked={creationState.safety.life_jacket === 1?true:false}
                      onChange={(e)=>handleCheckChangeSafety(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                       VHF radio
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="vhf_radio"
                      checked={creationState.safety.vhf_radio === 1?true:false}
                      onChange={(e)=>handleCheckChangeSafety(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Thrusters
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="thrusters"
                      checked={creationState.safety.thrusters === 1?true:false}
                      onChange={(e)=>handleCheckChangeSafety(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Stabilizer
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="stabilizers"
                      checked={creationState.safety.stabilizers === 1?true:false}
                      onChange={(e)=>handleCheckChangeSafety(e)}
                      inputProps={{ 'aria-label': 'controlled' }}

                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      GPS
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="gps"
                      checked={creationState.safety.gps === 1?true:false}
                      onChange={(e)=>handleCheckChangeSafety(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Sonar
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="sonar"
                      checked={creationState.safety.sonar === 1?true:false}
                      onChange={(e)=>handleCheckChangeSafety(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Radar
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="radar"
                      checked={creationState.safety.radar === 1?true:false}
                      onChange={(e)=>handleCheckChangeSafety(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Medical Kit
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="medical_kit"
                      checked={creationState.safety.medical_kit === 1?true:false}
                      onChange={(e)=>handleCheckChangeSafety(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Flashlight
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="flashlight"
                      checked={creationState.safety.flashlight === 1?true:false}
                      onChange={(e)=>handleCheckChangeSafety(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                {creationState.safety.other_safety_amenities !== null && creationState.safety.other_safety_amenities.map((amen:any) => (
                  <Grid item xs={'auto'}>
                    <YachtAmenitiesFormBox>
                      <YachtAmenitiesFormLabel>
                        {amen.name}
                      </YachtAmenitiesFormLabel>
                      <Checkbox
                        name={amen.name}
                        checked={amen.value === 1?true:false}
                        onChange={(e)=>handleCheckChangeSafetyOther(e)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </YachtAmenitiesFormBox>
                  </Grid>
                ))}
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox onClick={()=>addOther('safety')} style={{cursor:"pointer"}}>
                    <YachtAmenitiesFormLabel style={{color:"#4285F4"}}>
                      Add Other
                    </YachtAmenitiesFormLabel>
                    <div>
                      <p style={{color:"#4285F4"}}><b>+</b></p>
                    </div>
                  </YachtAmenitiesFormBox>
                </Grid>
              </Grid>
            </YachtAmenitiesSection>
            <YachtAmenitiesSection>
              <SectionHeader>Water  Toys</SectionHeader>
              <Grid container spacing={2}>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Jet Ski
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="jet_ski"
                      checked={creationState.water_toys.jet_ski === 1?true:false}
                      onChange={(e)=>handleCheckChangeWaterToys(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                       Tender
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="tender"
                      checked={creationState.water_toys.tender === 1?true:false}
                      onChange={(e)=>handleCheckChangeWaterToys(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Floating Mat
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="floatine_mate"
                      checked={creationState.water_toys.floatine_mate === 1?true:false}
                      onChange={(e)=>handleCheckChangeWaterToys(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Snorkeling Gear
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="snorkeling_gear"
                      checked={creationState.water_toys.snorkeling_gear === 1?true:false}
                      onChange={(e)=>handleCheckChangeWaterToys(e)}
                      inputProps={{ 'aria-label': 'controlled' }}

                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Diving Gear
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="diving_gear"
                      checked={creationState.water_toys.diving_gear === 1?true:false}
                      onChange={(e)=>handleCheckChangeWaterToys(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Paddle Board
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="paddle_board"
                      checked={creationState.water_toys.paddle_board === 1?true:false}
                      onChange={(e)=>handleCheckChangeWaterToys(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Water Jetpack
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="water_jetpack"
                      checked={creationState.water_toys.water_jetpack === 1?true:false}
                      onChange={(e)=>handleCheckChangeWaterToys(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Water Slide
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="water_jetslide"
                      checked={creationState.water_toys.water_jetslide === 1?true:false}
                      onChange={(e)=>handleCheckChangeWaterToys(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox>
                    <YachtAmenitiesFormLabel>
                      Jacuzzi
                    </YachtAmenitiesFormLabel>
                    <Checkbox
                      name="jacuzzi"
                      checked={creationState.water_toys.jacuzzi === 1?true:false}
                      onChange={(e)=>handleCheckChangeWaterToys(e)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </YachtAmenitiesFormBox>
                </Grid>
                {creationState.water_toys.other_jacuzzi_amenities !== null && creationState.water_toys.other_jacuzzi_amenities.map((amen:any) => (
                  <Grid item xs={'auto'}>
                    <YachtAmenitiesFormBox>
                      <YachtAmenitiesFormLabel>
                        {amen.name}
                      </YachtAmenitiesFormLabel>
                      <Checkbox
                        name={amen.name}
                        checked={amen.value === 1?true:false}
                        onChange={(e)=>handleCheckChangeWaterToysOther(e)}
                        inputProps={{ 'aria-label': 'controlled' }}
                      />
                    </YachtAmenitiesFormBox>
                  </Grid>
                ))}
                <Grid item xs={'auto'}>
                  <YachtAmenitiesFormBox onClick={()=>addOther('water_toys')} style={{cursor:"pointer"}}>
                    <YachtAmenitiesFormLabel style={{color:"#4285F4"}}>
                      Add Other
                    </YachtAmenitiesFormLabel>
                    <div>
                      <p style={{color:"#4285F4"}}><b>+</b></p>
                    </div>
                  </YachtAmenitiesFormBox>
                </Grid>
              </Grid>
            </YachtAmenitiesSection>
          </YachtAmenitiesBody>
        </YachtAmenitiesContainer>

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

const ButtonFlex = styled.div`
  display:flex;
  width:100%;
  justify-content:flex-end;
  margin-top:15px;
`;

export const YachtAmenitiesFormLabel = styled.p`
  font-family: GilroyMedium;
  font-size: 16px;
  line-height: 19px;
  color: #333333;
`;


export const YachtAmenitiesFormBox = styled.div`
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

export const YachtAmenitiesSection = styled.div`
  margin-bottom: 30px;
`;

export const YachtAmenitiesBody = styled.div`
  padding: 40px 2.604vw;
`;

export const YachtAmenitiesContainer = styled.div`
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 20px;
  margin-top:60px;
`;

export const Header = styled.h1`
  padding: 20px 0px;
  text-align: center;
  font-family: GilroyBold;
  font-size: 24px;
  color: #333333;
  border-bottom: 1px solid #e0e0e0;
`;

export const SectionHeader = styled.h1`
  padding: 20px 0px;
  text-align: left;
  font-family: GilroyBold;
  font-size: 24px;
  color: #333333;
  margin-bottom:0px;
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
