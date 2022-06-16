import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton, Grid } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { useListcreationSlice } from "../slice";
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation, selectSuccess, selectLoading, selectPayload} from "../slice/selectors";

interface Props{
  setIndex:any;
  activeIndex:number;
  isEditing:boolean;
}

export function Review(props:Props) {
  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const history = useHistory();
  const [locationTab, setLocationTab] = React.useState(true);
  const [detailsTab, setDetailsTab] = React.useState(false);
  const [photosTab, setPhotosTab] = React.useState(false);
  const [pricingTab, setPricingTab] = React.useState(false);
  const [policiesTab, setPoliciesTab] = React.useState(false);
  const creationState = useSelector(selectListcreation)
  const success = useSelector(selectSuccess)
  const loading = useSelector(selectLoading)
  const payload = useSelector(selectPayload)

  const [interiorOptions, set_interiorOptions] = React.useState<any>([]);
  const [exteriorOptions, set_exteriorOptions] = React.useState<any>([]);
  const [safetyOptions, set_safetyOptions] = React.useState<any>([]);
  const [waterToyOptions, set_waterToyOptions] = React.useState<any>([]);
  const [rules, set_rules] = React.useState<any>([]);


  React.useEffect(() => {
    if(success !== undefined && success!== null && success === true){
      setTimeout(() => history.push('/listings/detail/'+payload.listing_id), 0);
    }
  },[success])


  React.useEffect(() => {
    if(creationState.exterior !== undefined && creationState.exterior!== null){
        let exOptionsArr = [
          {
            name: "Flybridge",
            value: creationState.exterior.flybridge
          }, {
            name: "Swim Platform",
            value: creationState.exterior.swim_platform
          }, {
            name: "Swim ladder",
            value: creationState.exterior.swim_ladder
          }, {
            name: "Anchor",
            value: creationState.exterior.anchor
          }, {
            name: "Shower",
            value: creationState.exterior.shower
          }, {
            name: "Grill",
            value: creationState.exterior.grill
          }, {
            name: "Cooler",
            value: creationState.exterior.cooler
          }
        ]

        var filteredOptions:any = exOptionsArr.filter(opt => opt.value !== 0)
        set_exteriorOptions(filteredOptions)
    }


    if(creationState.interior !== undefined && creationState.interior!== null){
        let interiorArr = [
          {
            name: "Kitchen",
            value: creationState.interior.kitchen
          }, {
            name: "Refrigerator",
            value: creationState.interior.refrigerator
          }, {
            name: "Microwave",
            value: creationState.interior.microwave
          }, {
            name: "Air Conditioning",
            value: creationState.interior.airconditioning
          }, {
            name: "TV Stereo",
            value: creationState.interior.tv_stereo
          }
        ]

      var filteredOptions:any = interiorArr.filter(opt => opt.value !== 0)
      set_interiorOptions(filteredOptions)
    }


    if(creationState.safety !== undefined && creationState.safety!== null){
        let safetyArr = [
          {
            name: "Life Jackets",
            value: creationState.safety.life_jacket
          }, {
            name: "VHF radio",
            value: creationState.safety.vhf_radio
          }, {
            name: "Thrusters",
            value: creationState.safety.thrusters
          }, {
            name: "Stabilizer",
            value: creationState.safety.stabilizers
          }, {
            name: "GPS",
            value: creationState.safety.gps
          }, {
            name: "Sonar",
            value: creationState.safety.sonar
          }, {
            name: "Radar",
            value: creationState.safety.radar
          }, {
            name: "Medical Kit",
            value: creationState.safety.medical_kit
          }, {
            name: "Flashlight",
            value: creationState.safety.flashlight
          }
        ]
        var filteredOptions:any = safetyArr.filter(opt => opt.value !== 0)
        set_safetyOptions(filteredOptions)
    }

    if(creationState.water_toys !== undefined && creationState.water_toys!== null){
        let wtArr = [
          {
            name: "Jet Ski",
            value: creationState.water_toys.jet_ski
          }, {
            name: "Tender",
            value: creationState.water_toys.tender
          }, {
            name: "Floating Mat",
            value: creationState.water_toys.floatine_mate
          }, {
            name: "Snorkeling Gear",
            value: creationState.water_toys.snorkeling_gear
          }, {
            name: "Diving Gear",
            value: creationState.water_toys.diving_gear
          }, {
            name: "Paddle Board",
            value: creationState.water_toys.paddle_board
          }, {
            name: "Jet Pack",
            value: creationState.water_toys.water_jetpack
          }, {
            name: "Water Slide",
            value: creationState.water_toys.water_jetslide
          }, {
            name: "Jacuzzi",
            value: creationState.water_toys.jacuzzi
          }
        ]
        var filteredOptions:any = wtArr.filter(opt => opt.value !== 0)
        set_waterToyOptions(filteredOptions)
    }


    if(creationState.listing.rules !== undefined && creationState.listing.rules!== null){
        var filteredOptions:any = creationState.listing.rules.filter(opt => opt.value !== 0)
        set_rules(filteredOptions)
    }




  },[creationState.exterior, creationState.interior, creationState.water_toys, creationState.safety])


  function handleListCreate() {
    let payloadSubmit:any = Object.assign({}, creationState)
    delete payloadSubmit.payload
    delete payloadSubmit.success
    delete payloadSubmit.loading
    delete payloadSubmit.error

    let newInsurance:any = Object.assign({}, creationState.insurance)
    delete newInsurance.certified

    payloadSubmit.insurance = newInsurance

    console.log(payloadSubmit)
    setTimeout(() => dispatch(actions.createListing(payloadSubmit)), 0);
  }

  function renderLabels(keyname:any) {
    let label = ''
    if (keyname.includes('_')) {
      label = keyname.replace('_',' ')
    }else{
      label = keyname
    }
    return label
  }

  return (
    <>
      <Helmet>
        <title>Review</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <ReviewSectionTitle style={{marginTop:80}}>
          <Box>
          <h2>Location</h2>
          </Box>
          <Box>
            <div onClick={()=>setLocationTab(!locationTab)}>
            {locationTab === true
              ? <AccordionIcon src={process.env.PUBLIC_URL+'/arrow-down.svg'}/>
              : <AccordionIcon src={process.env.PUBLIC_URL+'/arrow-up.svg'}/>
            }
            </div>
          </Box>
        </ReviewSectionTitle>
        {locationTab === true
          ? (
            <ReviewSectionBody style={{marginTop:10}}>
            <Box display={'flex'}>
            <Box flex={1}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ReviewSectionHeader>{creationState.listing.list_details_type !== ''? creationState.listing.list_details_type : "Location" }</ReviewSectionHeader>
                  <p>{creationState.listing.street_address}, {creationState.listing.city},{creationState.listing.province} {creationState.listing.zip_code}, {creationState.listing.country}</p>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <EditIcon onClick={()=>props.setIndex(1)}>
                <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
              </EditIcon>
            </Box>
            </Box>
            </ReviewSectionBody>
          )
          : null
        }

        <ReviewSectionTitle style={{marginTop:20}}>
          <Box>
          <h2>Details</h2>
          </Box>
          <Box>
            <div onClick={()=>setDetailsTab(!detailsTab)}>
            {detailsTab === true
              ? <AccordionIcon src={process.env.PUBLIC_URL+'/arrow-down.svg'}/>
              : <AccordionIcon src={process.env.PUBLIC_URL+'/arrow-up.svg'}/>
            }
            </div>
          </Box>
        </ReviewSectionTitle>
        {detailsTab === true
          ? (
            <ReviewSectionBody style={{marginTop:10}}>
            <Box display={'flex'}>
              <Box flex={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ReviewSectionHeader>General Details</ReviewSectionHeader>
                  </Grid>
                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Boat Type</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText>{creationState.listing.list_details_type}</ReviewDetailText>
                  </Grid>

                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Operator</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText>{creationState.listing.list_details_operator}</ReviewDetailText>
                  </Grid>

                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Name</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText>{creationState.listing.list_details_name}</ReviewDetailText>
                  </Grid>

                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Make</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText>{creationState.listing.list_details_make}</ReviewDetailText>
                  </Grid>

                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Year</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText>{creationState.listing.year}</ReviewDetailText>
                  </Grid>

                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Length</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText>{creationState.listing.length} ft.</ReviewDetailText>
                  </Grid>

                </Grid>
              </Box>
              <Box>
                <EditIcon onClick={()=>props.setIndex(3)}>
                  <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
                </EditIcon>
              </Box>
            </Box>
            <Box display={'flex'} mt={2}>
              <Box flex={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ReviewSectionHeader>Amenities</ReviewSectionHeader>
                  </Grid>
                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Interior</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText style={{lineHeight:"1.5em", textTransform:"capitalize"}} >
                    {interiorOptions && interiorOptions.map((element, index, array) => {
                      if (element.value === 0){return}
                      return <span>{element.name}{array[index+1] !== undefined ? "," : null} </span>
                    })}

                    {creationState.interior.other_amenities.map((element,index) => (
                      <span>{element.name}, </span>
                    ))}
                    </ReviewDetailText>
                  </Grid>

                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Exterior</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText style={{lineHeight:"1.5em", textTransform:"capitalize"}} >
                    {exteriorOptions && exteriorOptions.map((element, index, array) => {
                      if (element.value === 0){return}
                      return <span>{element.name}{array[index+1] !== undefined ? "," : null} </span>
                    })}

                    {creationState.exterior.other_exterior_amenities.map((element,index) => (
                      <span>{element.name}, </span>
                    ))}
                    </ReviewDetailText>
                  </Grid>

                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Safety</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText>{creationState.listing.list_details_name}</ReviewDetailText>
                  </Grid>

                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Water Toys</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText>{creationState.listing.list_details_name}</ReviewDetailText>
                  </Grid>


                </Grid>
              </Box>
              <Box>
                <EditIcon onClick={()=>props.setIndex(4)}>
                  <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
                </EditIcon>
              </Box>
            </Box>
            <Box display={'flex'} mt={2}>
              <Box flex={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ReviewSectionHeader>Rules</ReviewSectionHeader>
                    <ReviewDetailText style={{lineHeight:"1.5em"}}>
                    {rules.map((element, index, array) => (
                      <span>{element.name}{array[index+1] !== undefined ? ", " : null}</span>
                    ))}
                    </ReviewDetailText>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <EditIcon onClick={()=>props.setIndex(5)}>
                  <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
                </EditIcon>
              </Box>
            </Box>
            <Box display={'flex'} mt={2}>
              <Box flex={1}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <ReviewSectionHeader>Title & Description</ReviewSectionHeader>
                  </Grid>
                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Title</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText>{creationState.listing.listing_name}</ReviewDetailText>
                  </Grid>

                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewDetailLabel>Description</ReviewDetailLabel>
                  </Grid>
                  <Grid item xs={9} style={{paddingTop:0}}>
                    <ReviewDetailText>{creationState.listing.list_discription}</ReviewDetailText>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <EditIcon onClick={()=>props.setIndex(6)}>
                  <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
                </EditIcon>
              </Box>
            </Box>
            </ReviewSectionBody>
          )
          : null
        }

        <ReviewSectionTitle style={{marginTop:20}}>
          <Box>
          <h2>Photos</h2>
          </Box>
          <Box>
            <div onClick={()=>setPhotosTab(!photosTab)}>
            {photosTab === true
              ? <AccordionIcon src={process.env.PUBLIC_URL+'/arrow-down.svg'}/>
              : <AccordionIcon src={process.env.PUBLIC_URL+'/arrow-up.svg'}/>
            }
            </div>
          </Box>
        </ReviewSectionTitle>
        {photosTab === true
          ? (
            <ReviewSectionBody style={{marginTop:10}}>
            <Box display={'flex'}>
            <Box flex={1}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <ReviewDetailText>{(creationState.listing.images && creationState.listing.images.length >  0) ? creationState.listing.images.length : "0" } Photos Uploaded</ReviewDetailText>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <EditIcon onClick={()=>props.setIndex(8)}>
                <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
              </EditIcon>
            </Box>
            </Box>
            </ReviewSectionBody>
          )
          : null
        }

        <ReviewSectionTitle style={{marginTop:20}}>
          <Box>
          <h2>Pricing & Availability</h2>
          </Box>
          <Box>
            <div onClick={()=>setPricingTab(!pricingTab)}>
            {pricingTab === true
              ? <AccordionIcon src={process.env.PUBLIC_URL+'/arrow-down.svg'}/>
              : <AccordionIcon src={process.env.PUBLIC_URL+'/arrow-up.svg'}/>
            }
            </div>
          </Box>
        </ReviewSectionTitle>
        {pricingTab === true
          ? (
            <ReviewSectionBody style={{marginTop:10}}>
            <Box display={'flex'}>
            <Box flex={1}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <ReviewSectionHeader>Day Trips</ReviewSectionHeader>
                </Grid>
                <Grid item xs={3} style={{paddingTop:0}}>
                  <p>Guests Capacity</p>
                </Grid>
                <Grid item xs={9} style={{paddingTop:0}}>
                  <ReviewDetailText>{creationState.day_trips.guest_capacity}</ReviewDetailText>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <EditIcon onClick={()=>props.setIndex(11)}>
                <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
              </EditIcon>
            </Box>
            </Box>
            <Box display={'flex'}>
            <Box flex={1}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <ReviewSectionHeader>Overnight Stays</ReviewSectionHeader>
                </Grid>
                <Grid item xs={3} style={{paddingTop:0}}>
                  <p>Guests Capacity</p>
                </Grid>
                <Grid item xs={9} style={{paddingTop:0}}>
                  <ReviewDetailText>{creationState.overnight_stays.guest_capacity}</ReviewDetailText>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <EditIcon onClick={()=>props.setIndex(11)}>
                <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
              </EditIcon>
            </Box>
            </Box>
            <Box display={'flex'}>
            <Box flex={1}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <ReviewSectionHeader>Water Toys</ReviewSectionHeader>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <EditIcon onClick={()=>props.setIndex(11)}>
                <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
              </EditIcon>
            </Box>
            </Box>
            <Box display={'flex'}>
            <Box flex={1}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={12}>
                  <ReviewSectionHeader>Calendar</ReviewSectionHeader>
                </Grid>
              </Grid>
            </Box>
            <Box>
              <EditIcon onClick={()=>props.setIndex(13)}>
                <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
              </EditIcon>
            </Box>
            </Box>
            </ReviewSectionBody>
          )
          : null
        }

        <ReviewSectionTitle style={{marginTop:20}}>
          <Box>
          <h2>Policies</h2>
          </Box>
          <Box>
            <div onClick={()=>setPoliciesTab(!policiesTab)}>
            {policiesTab === true
              ? <AccordionIcon src={process.env.PUBLIC_URL+'/arrow-down.svg'}/>
              : <AccordionIcon src={process.env.PUBLIC_URL+'/arrow-up.svg'}/>
            }
            </div>
          </Box>
        </ReviewSectionTitle>
        {policiesTab === true
          ? (
            <ReviewSectionBody style={{marginTop:10}}>
            <Box display={'flex'}>
              <Box flex={1}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewSectionHeader>Cancelation Policy</ReviewSectionHeader>
                  </Grid>
                  <Grid item xs={9}>
                    <ReviewDetailText>{creationState.cancelation_policy && creationState.cancelation_policy.flexible === 1 ? 'Flexible': creationState.cancelation_policy.moderate === 1 ? 'Moderate': creationState.cancelation_policy.strict === 1 ? 'Strict': creationState.cancelation_policy.use_your_own !== '' ? creationState.cancelation_policy.use_your_own : 'None'  }</ReviewDetailText>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <EditIcon onClick={()=>props.setIndex(15)}>
                  <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
                </EditIcon>
              </Box>
            </Box>
            <Box display={'flex'}>
              <Box flex={1}>
                <Grid container spacing={2} alignItems="center">
                  <Grid item xs={3} style={{paddingTop:0}}>
                    <ReviewSectionHeader>Insurance</ReviewSectionHeader>
                  </Grid>
                  <Grid item xs={9}>
                    <ReviewDetailText>{creationState.insurance && creationState.insurance.waterpins_insurance === true ? 'Use Waterpins Insurance':'Use Own Insurance' }</ReviewDetailText>
                  </Grid>
                </Grid>
              </Box>
              <Box>
                <EditIcon onClick={()=>props.setIndex(16)}>
                  <img src={process.env.PUBLIC_URL+'/edit-icon.svg'}/>
                </EditIcon>
              </Box>
            </Box>

            </ReviewSectionBody>
          )
          : null
        }
        <WizardButtonFlex>
          <WizardSecondaryBtn
             name={"Back"}
             onClick={()=>props.setIndex(props.activeIndex-1)}
             disabled={false}
           >
            Back
           </WizardSecondaryBtn>

           {props.isEditing === false
           ? (
             <WizardNextBtn
                name={"publish"}
                onClick={(e)=>handleListCreate()}
                disabled={false}
              >
               Publish
              </WizardNextBtn>
           )
           : (
             <WizardNextBtn
                name={"publish"}
                onClick={(e)=>handleListCreate()}
                disabled={false}
              >
               Save & Publish
              </WizardNextBtn>
           )
          }


        </WizardButtonFlex>
      </Container>
    </>
  );
}

export const ReviewSectionHeader = styled.h1`
  font-family: GilroyBold;
  font-size: 1.042vw;
  color: #4285f4;
  margin-bottom: 2px;
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

export const ReviewDetailText = styled.p`
  margin-bottom: 2px;
  margin-top: 2px;
  font-family: GilroyMedium;
  color: #828282;
  font-size: .938vw;
`;

export const ReviewDetailLabel = styled.h4`
  margin-bottom: 2px;
  margin-top: 2px;
`;

export const EditIcon = styled.div`
  width:25px;
  height:25px;
  cursor:pointer;
  img{
    width:50px;
    height:50px;
  }
`;


export const AccordionIcon = styled.img`
  width:25px;
  height:25px;
  cursor:pointer;
`;

export const ReviewSectionTitle = styled.div`
  display:flex;
  align-items:center;
  justify-content:space-between;
  padding:10px 75px;
  min-height:65px;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 15px 15px 0px 0px;
`;

export const ReviewSectionBody = styled.div`
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  padding:10px 75px;
  height:auto;
  width:100%;
  background: #FFFFFF;
  padding: 1vw 3.281vw 1.198vw 8.594vw;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 0px 0px 15px 15px;
`;
