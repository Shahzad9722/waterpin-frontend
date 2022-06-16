import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { WizardSelect, WizardSelectOption, WizardField, FieldLabel, WizardButton} from '../common/input';
import { ListingCreateButton} from '../common/layout';
import { useListcreationSlice } from "../slice";
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";

interface Props{
  setIndex:any;
  activeIndex:number;
}

export function Details(props:Props) {

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const creationState = useSelector(selectListcreation)


  const [type, setType] = React.useState(null);
  const [operator, setOperator] = React.useState('');
  const [name, setName] = React.useState('');
  const [make, setMake] = React.useState('');
  const [model, setModel] = React.useState('');
  const [year, setYear] = React.useState('');
  const [length, setLength] = React.useState('');

  React.useEffect(() => {
    if(creationState.listing !== undefined && creationState.listing !== null){
      setOperator(creationState.listing.list_details_operator)
      setName(creationState.listing.list_details_name)
      setMake(creationState.listing.list_details_make)
      setModel(creationState.listing.model)
      setYear(creationState.listing.year)
      setLength(creationState.listing.length)
      //calculateReview(listing.reviews)
    }
  },[creationState.listing])

  const history = useHistory();

  const handleInputChange = event => {
    event.preventDefault()
    const { name, value } = event.target;
    console.log(value)
    setTimeout(() => dispatch(actions.setListingDetails({name:name, value:value})), 0);
  };

  const handleOperatorChange = value => {
    setTimeout(() => dispatch(actions.setListingDetails({name:'list_details_operator', value:value})), 0);
  };


  const detailOptions:any = [
    { title: 'Motor Boat' },
    { title: 'Sail Boat' },
    { title: 'Catamaran' },
    { title: 'Other' },
  ];

  const formList:any = [
    {
      name:'list_details_name',
      label: 'Yacht Name',
      placeholder: "What's your Yacht name?",
      value: name,
      setValue: handleInputChange,
    },
    {
      name:'list_details_make',
      label: 'Yacht Make',
      placeholder: 'Yacht Make by',
      value: make,
      setValue: handleInputChange,
    },
    {
      name:'model',
      label: 'Model',
      placeholder: 'Model',
      value: model,
      setValue: handleInputChange,
    },

    {
      name:'year',
      label: 'Year',
      placeholder: 'When was your Yacht made?',
      value: year,
      setValue: handleInputChange,
    },
    {
      name:'length',
      label: 'Length',
      placeholder: 'Feet',
      value: length,
      setValue: handleInputChange,
    }
  ];

  return (
    <>
      <Helmet>
        <title>Details</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <WizardContainer>
          <WizardLeftHandContainer>
            <GetingStartedHeader>What are your {creationState.listingType || ''} Details?</GetingStartedHeader>
            <WizardSelect name="list_details_type" value={creationState.listing.list_details_type} onChange={(e)=>handleInputChange(e)}>
              <WizardSelectOption key={""} value={"Boat Type"}>Boat Type</WizardSelectOption>
              {detailOptions.map(opt => (
                <WizardSelectOption key={opt.title} value={opt.title}>{opt.title}</WizardSelectOption>
              ))}
            </WizardSelect>
          </WizardLeftHandContainer>
          <WizardRightHandContainer>

          <div className='header-text'>Who Operates Your Yacht?</div>
          <Box display={'flex'} alignItems={'center'} width={"100%"} justifyContent={"space-between"}>
            <Box flex={1}>
              <WizardButton isActive={operator == 'Certified Captain' ? true : false } onClick={()=>(handleOperatorChange("Certified Captain"))}>Certified Captain</WizardButton>
            </Box>
            <Box flex={1} pl={1} pr={1}>
              <WizardButton isActive={operator == 'Renter' ? true: false } onClick={()=>(handleOperatorChange("Renter"))}>Renter</WizardButton>
            </Box>
            <Box flex={1}>
              <WizardButton isActive={operator == 'Both' ? true : false } onClick={()=>(handleOperatorChange("Both"))}>Both</WizardButton>
            </Box>
          </Box>
          <Box alignItems={'center'} justifyContent={'flex-start'} width={"100%"}>
            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} width={"100%"} mb={2}>
              <Box width={"25%"}>
                <FieldLabel>{formList[0].label}</FieldLabel>
              </Box>
              <Box flex={1}>
              <WizardField
                  name={formList[0].name}
                  sx={{ ml: 1, flex:1}}
                  placeholder={formList[0].placeholder}
                  value={formList[0].value}
                  inputProps={{ 'aria-label': formList[0].label }}
                  onChange={(e)=>formList[0].setValue(e)}
                />
              </Box>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} width={"100%"} mb={2}>
              <Box width={"25%"}>
                <FieldLabel>{formList[1].label}</FieldLabel>
              </Box>
              <Box flex={1}>
              <WizardField
                  name={formList[1].name}
                  sx={{ ml: 1, flex:1}}
                  placeholder={formList[1].placeholder}
                  value={formList[1].value}
                  inputProps={{ 'aria-label': formList[1].label }}
                  onChange={(e)=>formList[1].setValue(e)}
                />
              </Box>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} width={"100%"} mb={2}>
              <Box width={"25%"}>
                <FieldLabel>{formList[2].label}</FieldLabel>
              </Box>
              <Box flex={1}>
              <WizardField
                  name={formList[2].name}
                  sx={{ ml: 1, flex:1}}
                  value={formList[2].value}
                  placeholder={formList[2].placeholder}
                  inputProps={{ 'aria-label': formList[2].label }}
                  onChange={(e)=>formList[2].setValue(e)}
                />
              </Box>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} width={"100%"} mb={2}>
              <Box width={"25%"}>
                <FieldLabel>{formList[3].label}</FieldLabel>
              </Box>
              <Box flex={1}>
              <WizardField
                  name={formList[3].name}
                  sx={{ ml: 1, flex:1}}
                  value={formList[3].value}
                  placeholder={formList[3].placeholder}
                  inputProps={{ 'aria-label': formList[3].label }}
                  onChange={(e)=>formList[3].setValue(e)}
                />
              </Box>
            </Box>
            <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} width={"100%"} mb={2}>
              <Box width={"25%"}>
                <FieldLabel>{formList[4].label}</FieldLabel>
              </Box>
              <Box flex={1}>
              <WizardField
                  name={formList[4].name}
                  sx={{ ml: 1, flex:1}}
                  value={formList[4].value}
                  placeholder={formList[4].placeholder}
                  inputProps={{ 'aria-label': formList[4].label }}
                  onChange={(e)=>formList[4].setValue(e)}
                />
              </Box>
            </Box>

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
              disabled={false}
              onClick={()=>props.setIndex(props.activeIndex+1)}
              type="submit"
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
