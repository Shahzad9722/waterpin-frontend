import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton, InputBase } from '@mui/material';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useHistory } from 'react-router-dom';
import { WizardContainer, WizardButtonFlex, WizardNextBtn, WizardSecondaryBtn, WizardLeftHandContainer, WizardRightHandContainer} from "../common/layout";
import { DefaultButton } from '../../../../components/buttons';
import { WizardSelect, WizardSelectOption, WizardField, FieldLabel} from '../common/input';
import { InputGroup, InputContainerSingle, InputContainer, InputContainerBottom} from '../../../../components/input';
import GoogleMapReact from 'google-map-react';
import { selectListcreation } from "../slice/selectors";
import { useSelector, useDispatch } from 'react-redux';

interface Props{
  setIndex:any;
  activeIndex:number;
}

export function LocationMap(props:Props) {

  const [center, set_center] = React.useState({lat:25.761681 , lng:-80.191788});
  const [zoom, set_zoom] = React.useState(15);
  const [markers, set_markers] = React.useState<any>([]);
  //const [geocoder, set_geocoder] = React.useState<any>(null);

  const history = useHistory();

  const creationState = useSelector(selectListcreation)

  function initLoadAddress(map:any, maps:any) {

    let address = `${creationState.listing.street_address}, ${creationState.listing.city}, ${creationState.listing.province} ${creationState.listing.zip_code}, ${creationState.listing.country}`
    const geocoder = new maps.Geocoder();
    //set_geocoder(Geocoder)

    geocoder.geocode({ 'address': address }, (res, status) => {
     console.log(res, status)
     if (status == "OK") {
       let lat = res[0].geometry.location.lat()
       let lng = res[0].geometry.location.lng()

       console.log(lat)
       console.log(lng)
       set_center({lat:lat,lng:lng})
       set_markers([
         <Marker
           lat={lat}
           lng={lng}
         >
         <img src={process.env.PUBLIC_URL + '/pin.svg'} />
       </Marker>
       ])
       // return {
       //   latitude: JSON.stringify(res[0].geometry.location.lat()),
       //   longitude: JSON.stringify(res[0].geometry.location.lng())
       // }
     }
   });


  }


  return (
    <>
      <Helmet>
        <title>Location Pin</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <WizardContainer>
          <WizardLeftHandContainer>
            <Box width={'100%'}>
            <GetingStartedHeader>Confirm Pin Location</GetingStartedHeader>
            <PinLocation>
              <p>{creationState.listing.street_address}, {creationState.listing.city}, {creationState.listing.province}</p>
              <p>{creationState.listing.zip_code}, {creationState.listing.country}</p>
            </PinLocation>
            </Box>
          </WizardLeftHandContainer>
          <WizardRightHandContainer style={{padding:"0px", borderRadius:"0px 20px 20px 0px"}}>
            <MapsContainer>
              <GoogleMapReact
                bootstrapURLKeys={{ key: "AIzaSyBs0n09_o7OmadZvIq6-lBhvPXLGhuQuVo", libraries:['places'] }}
                defaultCenter={center}
                defaultZoom={zoom}
                onGoogleApiLoaded={({map, maps}) => initLoadAddress(map, maps)}
                center={center}
                // instead of css hover (which sometimes is bad for map markers) (bad means inability to hover on markers placed under other markers)
                // you can use internal GoogleMap component hover algorithm
                // hover algorithm explained at x_distance_hover example
                yesIWantToUseGoogleMapApiInternals
                hoverDistance={40 / 2}
                 containerElement={<div style={{borderRadius:"0px 20px 20px 0px"}} />}
              >
                {markers}
              </GoogleMapReact>
            </MapsContainer>

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
              name={"Next"}
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

const Marker = styled.div<{lat:any,lng:any}>`
  display:flex;
  align-items:center;
  width:100px;
  height:100px;
`;

const MapsContainer = styled.div`
  display:flex;
  width:100%;
  height:100%;
  background: #F5F5F7;
`;


export const GetingStartedHeader = styled.h1`
  color:white;
`;

export const GetingStartedSubText = styled.p`
  color:white;
`;

export const PinLocation = styled.div`
  padding: 15px 30px;
  background: #ffffff;
  border-radius: 10px;
  width: 100%;

  font-family: GilroyMedium;
  font-size: 18px;
  color: #333333;
`;
