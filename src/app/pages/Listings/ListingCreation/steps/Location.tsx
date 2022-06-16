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
import { useSelector, useDispatch } from 'react-redux';
import { selectListcreation } from "../slice/selectors";
import { useListcreationSlice } from "../slice";

interface Props{
  setIndex:any;
  activeIndex:number;
}

export function Location(props:Props) {

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const creationState = useSelector(selectListcreation)


  const [center, set_center] = React.useState({lat:25.761681 , lng:-80.191788});
  const [zoom, set_zoom] = React.useState(11);
  const [markers, set_markers] = React.useState([]);


  const [location_index, set_location_index] = React.useState(0);
  const [location, setLocation] = React.useState(null);
  const [marinaName, setMarinaName] = React.useState(creationState.listing.marina_name);
  const [slipNumber, setSlipNumber] = React.useState(creationState.listing.slip_number);
  const [pierDocker, setPierDocker] = React.useState(creationState.listing.dock);
  const [streetAddress, setStreetAddress] = React.useState(creationState.listing.street_address);
  const [country, setCountry] = React.useState(creationState.listing.country);
  const [city, setCity] = React.useState(creationState.listing.city);
  const [stateProvince, setStateProvince] = React.useState(creationState.listing.province);
  const [zipCode, setZipCode] = React.useState(creationState.listing.zip_code);

  const history = useHistory();

  const handleInputChange = event => {
    //console.log(event)
    const { name, value } = event.target;
    setTimeout(() => dispatch(actions.setListingDetails({name:name, value:value})), 0);
  };

  const handleCountryChange = event => {
    //console.log(event)
    const { value } = event.target;
    setTimeout(() => dispatch(actions.setListingDetails({name:'country', value:value})), 0);
  };

  const handleLocationTypeChange = event => {
    //console.log(event)
    const { value } = event.target;
    setTimeout(() => dispatch(actions.setListingDetails({name:'location', value:value})), 0);
  };


  const detailList1:any = [
    {
      name:"marina_name",
      label: 'Marina Name',
      placeholder: 'What’s the name of the marina?',
      value: marinaName,
      setValue: handleInputChange,
    },
    {
      name:"dock",
      label: 'Pier/Dock',
      placeholder: 'Optional',
      value: pierDocker,
      setValue: handleInputChange,
    },
    {
      name:"slip_number",
      label: 'Slip Number',
      placeholder: 'Optional',
      value: slipNumber,
      setValue: handleInputChange,
    },
  ];

  const detailList2:any = [
    {
      name:"street_address",
      label: 'Street Address',
      placeholder: 'e.g. 300 Alton Road',
      value: streetAddress,
      setValue: handleInputChange,
    },
    {
      name:"city",
      label: 'City',
      placeholder: 'e.g. Miami Beach',
      value: city,
      setValue: handleInputChange,
    },
    {
      name:"province",
      label: 'State / Province',
      placeholder: 'e.g. Florida',
      value: stateProvince,
      setValue: handleInputChange,
    },
    {
      name:"zip_code",
      label: 'Zip Code',
      placeholder: 'e.g. 33039',
      value: zipCode,
      setValue: handleInputChange,
    },
  ];

  const locationOptions:any[] = [
    { title: 'Marina' },
    { title: 'Residence' },
    { title: 'Storage' },
    { title: 'Other' },
  ];


  const countryOptions:any[] = [
  {"name": "Afghanistan", "code": "AF"},
  {"name": "land Islands", "code": "AX"},
  {"name": "Albania", "code": "AL"},
  {"name": "Algeria", "code": "DZ"},
  {"name": "American Samoa", "code": "AS"},
  {"name": "AndorrA", "code": "AD"},
  {"name": "Angola", "code": "AO"},
  {"name": "Anguilla", "code": "AI"},
  {"name": "Antarctica", "code": "AQ"},
  {"name": "Antigua and Barbuda", "code": "AG"},
  {"name": "Argentina", "code": "AR"},
  {"name": "Armenia", "code": "AM"},
  {"name": "Aruba", "code": "AW"},
  {"name": "Australia", "code": "AU"},
  {"name": "Austria", "code": "AT"},
  {"name": "Azerbaijan", "code": "AZ"},
  {"name": "Bahamas", "code": "BS"},
  {"name": "Bahrain", "code": "BH"},
  {"name": "Bangladesh", "code": "BD"},
  {"name": "Barbados", "code": "BB"},
  {"name": "Belarus", "code": "BY"},
  {"name": "Belgium", "code": "BE"},
  {"name": "Belize", "code": "BZ"},
  {"name": "Benin", "code": "BJ"},
  {"name": "Bermuda", "code": "BM"},
  {"name": "Bhutan", "code": "BT"},
  {"name": "Bolivia", "code": "BO"},
  {"name": "Bosnia and Herzegovina", "code": "BA"},
  {"name": "Botswana", "code": "BW"},
  {"name": "Bouvet Island", "code": "BV"},
  {"name": "Brazil", "code": "BR"},
  {"name": "British Indian Ocean Territory", "code": "IO"},
  {"name": "Brunei Darussalam", "code": "BN"},
  {"name": "Bulgaria", "code": "BG"},
  {"name": "Burkina Faso", "code": "BF"},
  {"name": "Burundi", "code": "BI"},
  {"name": "Cambodia", "code": "KH"},
  {"name": "Cameroon", "code": "CM"},
  {"name": "Canada", "code": "CA"},
  {"name": "Cape Verde", "code": "CV"},
  {"name": "Cayman Islands", "code": "KY"},
  {"name": "Central African Republic", "code": "CF"},
  {"name": "Chad", "code": "TD"},
  {"name": "Chile", "code": "CL"},
  {"name": "China", "code": "CN"},
  {"name": "Christmas Island", "code": "CX"},
  {"name": "Cocos (Keeling) Islands", "code": "CC"},
  {"name": "Colombia", "code": "CO"},
  {"name": "Comoros", "code": "KM"},
  {"name": "Congo", "code": "CG"},
  {"name": "Congo, The Democratic Republic of the", "code": "CD"},
  {"name": "Cook Islands", "code": "CK"},
  {"name": "Costa Rica", "code": "CR"},
  {"name": "Cote D\"Ivoire", "code": "CI"},
  {"name": "Croatia", "code": "HR"},
  {"name": "Cuba", "code": "CU"},
  {"name": "Cyprus", "code": "CY"},
  {"name": "Czech Republic", "code": "CZ"},
  {"name": "Denmark", "code": "DK"},
  {"name": "Djibouti", "code": "DJ"},
  {"name": "Dominica", "code": "DM"},
  {"name": "Dominican Republic", "code": "DO"},
  {"name": "Ecuador", "code": "EC"},
  {"name": "Egypt", "code": "EG"},
  {"name": "El Salvador", "code": "SV"},
  {"name": "Equatorial Guinea", "code": "GQ"},
  {"name": "Eritrea", "code": "ER"},
  {"name": "Estonia", "code": "EE"},
  {"name": "Ethiopia", "code": "ET"},
  {"name": "Falkland Islands (Malvinas)", "code": "FK"},
  {"name": "Faroe Islands", "code": "FO"},
  {"name": "Fiji", "code": "FJ"},
  {"name": "Finland", "code": "FI"},
  {"name": "France", "code": "FR"},
  {"name": "French Guiana", "code": "GF"},
  {"name": "French Polynesia", "code": "PF"},
  {"name": "French Southern Territories", "code": "TF"},
  {"name": "Gabon", "code": "GA"},
  {"name": "Gambia", "code": "GM"},
  {"name": "Georgia", "code": "GE"},
  {"name": "Germany", "code": "DE"},
  {"name": "Ghana", "code": "GH"},
  {"name": "Gibraltar", "code": "GI"},
  {"name": "Greece", "code": "GR"},
  {"name": "Greenland", "code": "GL"},
  {"name": "Grenada", "code": "GD"},
  {"name": "Guadeloupe", "code": "GP"},
  {"name": "Guam", "code": "GU"},
  {"name": "Guatemala", "code": "GT"},
  {"name": "Guernsey", "code": "GG"},
  {"name": "Guinea", "code": "GN"},
  {"name": "Guinea-Bissau", "code": "GW"},
  {"name": "Guyana", "code": "GY"},
  {"name": "Haiti", "code": "HT"},
  {"name": "Heard Island and Mcdonald Islands", "code": "HM"},
  {"name": "Holy See (Vatican City State)", "code": "VA"},
  {"name": "Honduras", "code": "HN"},
  {"name": "Hong Kong", "code": "HK"},
  {"name": "Hungary", "code": "HU"},
  {"name": "Iceland", "code": "IS"},
  {"name": "India", "code": "IN"},
  {"name": "Indonesia", "code": "ID"},
  {"name": "Iran, Islamic Republic Of", "code": "IR"},
  {"name": "Iraq", "code": "IQ"},
  {"name": "Ireland", "code": "IE"},
  {"name": "Isle of Man", "code": "IM"},
  {"name": "Israel", "code": "IL"},
  {"name": "Italy", "code": "IT"},
  {"name": "Jamaica", "code": "JM"},
  {"name": "Japan", "code": "JP"},
  {"name": "Jersey", "code": "JE"},
  {"name": "Jordan", "code": "JO"},
  {"name": "Kazakhstan", "code": "KZ"},
  {"name": "Kenya", "code": "KE"},
  {"name": "Kiribati", "code": "KI"},
  {"name": "Korea, Democratic People\"S Republic of", "code": "KP"},
  {"name": "Korea, Republic of", "code": "KR"},
  {"name": "Kuwait", "code": "KW"},
  {"name": "Kyrgyzstan", "code": "KG"},
  {"name": "Lao People\"S Democratic Republic", "code": "LA"},
  {"name": "Latvia", "code": "LV"},
  {"name": "Lebanon", "code": "LB"},
  {"name": "Lesotho", "code": "LS"},
  {"name": "Liberia", "code": "LR"},
  {"name": "Libyan Arab Jamahiriya", "code": "LY"},
  {"name": "Liechtenstein", "code": "LI"},
  {"name": "Lithuania", "code": "LT"},
  {"name": "Luxembourg", "code": "LU"},
  {"name": "Macao", "code": "MO"},
  {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"},
  {"name": "Madagascar", "code": "MG"},
  {"name": "Malawi", "code": "MW"},
  {"name": "Malaysia", "code": "MY"},
  {"name": "Maldives", "code": "MV"},
  {"name": "Mali", "code": "ML"},
  {"name": "Malta", "code": "MT"},
  {"name": "Marshall Islands", "code": "MH"},
  {"name": "Martinique", "code": "MQ"},
  {"name": "Mauritania", "code": "MR"},
  {"name": "Mauritius", "code": "MU"},
  {"name": "Mayotte", "code": "YT"},
  {"name": "Mexico", "code": "MX"},
  {"name": "Micronesia, Federated States of", "code": "FM"},
  {"name": "Moldova, Republic of", "code": "MD"},
  {"name": "Monaco", "code": "MC"},
  {"name": "Mongolia", "code": "MN"},
  {"name": "Montenegro", "code": "ME"},
  {"name": "Montserrat", "code": "MS"},
  {"name": "Morocco", "code": "MA"},
  {"name": "Mozambique", "code": "MZ"},
  {"name": "Myanmar", "code": "MM"},
  {"name": "Namibia", "code": "NA"},
  {"name": "Nauru", "code": "NR"},
  {"name": "Nepal", "code": "NP"},
  {"name": "Netherlands", "code": "NL"},
  {"name": "Netherlands Antilles", "code": "AN"},
  {"name": "New Caledonia", "code": "NC"},
  {"name": "New Zealand", "code": "NZ"},
  {"name": "Nicaragua", "code": "NI"},
  {"name": "Niger", "code": "NE"},
  {"name": "Nigeria", "code": "NG"},
  {"name": "Niue", "code": "NU"},
  {"name": "Norfolk Island", "code": "NF"},
  {"name": "Northern Mariana Islands", "code": "MP"},
  {"name": "Norway", "code": "NO"},
  {"name": "Oman", "code": "OM"},
  {"name": "Pakistan", "code": "PK"},
  {"name": "Palau", "code": "PW"},
  {"name": "Palestinian Territory, Occupied", "code": "PS"},
  {"name": "Panama", "code": "PA"},
  {"name": "Papua New Guinea", "code": "PG"},
  {"name": "Paraguay", "code": "PY"},
  {"name": "Peru", "code": "PE"},
  {"name": "Philippines", "code": "PH"},
  {"name": "Pitcairn", "code": "PN"},
  {"name": "Poland", "code": "PL"},
  {"name": "Portugal", "code": "PT"},
  {"name": "Puerto Rico", "code": "PR"},
  {"name": "Qatar", "code": "QA"},
  {"name": "Reunion", "code": "RE"},
  {"name": "Romania", "code": "RO"},
  {"name": "Russian Federation", "code": "RU"},
  {"name": "RWANDA", "code": "RW"},
  {"name": "Saint Helena", "code": "SH"},
  {"name": "Saint Kitts and Nevis", "code": "KN"},
  {"name": "Saint Lucia", "code": "LC"},
  {"name": "Saint Pierre and Miquelon", "code": "PM"},
  {"name": "Saint Vincent and the Grenadines", "code": "VC"},
  {"name": "Samoa", "code": "WS"},
  {"name": "San Marino", "code": "SM"},
  {"name": "Sao Tome and Principe", "code": "ST"},
  {"name": "Saudi Arabia", "code": "SA"},
  {"name": "Senegal", "code": "SN"},
  {"name": "Serbia", "code": "RS"},
  {"name": "Seychelles", "code": "SC"},
  {"name": "Sierra Leone", "code": "SL"},
  {"name": "Singapore", "code": "SG"},
  {"name": "Slovakia", "code": "SK"},
  {"name": "Slovenia", "code": "SI"},
  {"name": "Solomon Islands", "code": "SB"},
  {"name": "Somalia", "code": "SO"},
  {"name": "South Africa", "code": "ZA"},
  {"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
  {"name": "Spain", "code": "ES"},
  {"name": "Sri Lanka", "code": "LK"},
  {"name": "Sudan", "code": "SD"},
  {"name": "Suriname", "code": "SR"},
  {"name": "Svalbard and Jan Mayen", "code": "SJ"},
  {"name": "Swaziland", "code": "SZ"},
  {"name": "Sweden", "code": "SE"},
  {"name": "Switzerland", "code": "CH"},
  {"name": "Syrian Arab Republic", "code": "SY"},
  {"name": "Taiwan, Province of China", "code": "TW"},
  {"name": "Tajikistan", "code": "TJ"},
  {"name": "Tanzania, United Republic of", "code": "TZ"},
  {"name": "Thailand", "code": "TH"},
  {"name": "Timor-Leste", "code": "TL"},
  {"name": "Togo", "code": "TG"},
  {"name": "Tokelau", "code": "TK"},
  {"name": "Tonga", "code": "TO"},
  {"name": "Trinidad and Tobago", "code": "TT"},
  {"name": "Tunisia", "code": "TN"},
  {"name": "Turkey", "code": "TR"},
  {"name": "Turkmenistan", "code": "TM"},
  {"name": "Turks and Caicos Islands", "code": "TC"},
  {"name": "Tuvalu", "code": "TV"},
  {"name": "Uganda", "code": "UG"},
  {"name": "Ukraine", "code": "UA"},
  {"name": "United Arab Emirates", "code": "AE"},
  {"name": "United Kingdom", "code": "GB"},
  {"name": "United States", "code": "US"},
  {"name": "United States Minor Outlying Islands", "code": "UM"},
  {"name": "Uruguay", "code": "UY"},
  {"name": "Uzbekistan", "code": "UZ"},
  {"name": "Vanuatu", "code": "VU"},
  {"name": "Venezuela", "code": "VE"},
  {"name": "Viet Nam", "code": "VN"},
  {"name": "Virgin Islands, British", "code": "VG"},
  {"name": "Virgin Islands, U.S.", "code": "VI"},
  {"name": "Wallis and Futuna", "code": "WF"},
  {"name": "Western Sahara", "code": "EH"},
  {"name": "Yemen", "code": "YE"},
  {"name": "Zambia", "code": "ZM"},
  {"name": "Zimbabwe", "code": "ZW"}
]



  function handleNextStep(idx:number) {
    let newIdx = idx + 1
    if (idx === 1) {
      props.setIndex(props.activeIndex+1)
    }else{
      set_location_index(newIdx)
    }
  }

  function handlePrevStep(idx:number) {
    let newIdx = idx - 1
    if (idx === 0) {
      props.setIndex(props.activeIndex-1)
    }else{
      set_location_index(newIdx)
    }
  }




  return (
    <>
      <Helmet>
        <title>Location</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Container>
        <WizardContainer>
          <WizardLeftHandContainer>
            {location_index === 0 || location_index === 1
              ? (
                <>
                <GetingStartedHeader>Where's Your {creationState.listingType || ''} Located?</GetingStartedHeader>
                <WizardSelect value={creationState.listing.location} onChange={(e)=>handleLocationTypeChange(e)}>
                <WizardSelectOption key={"empty"} selected disabled>Select a Location Type</WizardSelectOption>
                  {locationOptions.map(opt => (
                    <WizardSelectOption key={opt.title} value={opt.title}>{opt.title}</WizardSelectOption>
                  ))}
                </WizardSelect>
                </>
              )
              : null
            }
          </WizardLeftHandContainer>
          <WizardRightHandContainer>
          {location_index === 1
            ? (
              <>
                {detailList1.map(detail => (
                  <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} width={"100%"}>
                    <Box width={"30%"}>
                      <FieldLabel>{detail.label}</FieldLabel>
                    </Box>
                    <Box flex={1}>
                    <WizardField
                        name={detail.name}
                        sx={{ ml: 1, flex:1}}
                        value={creationState.listing[detail.name]}
                        placeholder={detail.placeholder}
                        inputProps={{ 'aria-label': detail.label }}
                        onChange={(e)=>detail.setValue(e)}
                      />
                    </Box>
                  </Box>
                ))}
                <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} width={"100%"}>
                  <Box width={"30%"}>
                    <FieldLabel>Country</FieldLabel>
                  </Box>
                  <Box flex={1}>
                    <WizardSelect value={creationState.listing.country} onChange={(e)=>handleCountryChange(e)}>
                    {countryOptions.map(country => (
                      <WizardSelectOption key={country.name} value={country.name}>{country.name}</WizardSelectOption>
                    ))}
                    </WizardSelect>
                  </Box>
                </Box>
                {detailList2.map(detail => (
                  <Box display={'flex'} alignItems={'center'} justifyContent={'flex-start'} width={"100%"}>
                    <Box width={"30%"}>
                      <FieldLabel>{detail.label}</FieldLabel>
                    </Box>
                    <Box flex={1}>
                    <WizardField
                        name={detail.name}
                        sx={{ ml: 1, flex:1}}
                        value={creationState.listing[detail.name]}
                        placeholder={detail.placeholder}
                        inputProps={{ 'aria-label': detail.label }}
                        onChange={(e)=>detail.setValue(e)}
                      />
                    </Box>
                  </Box>
                ))}

              </>
            )
            : null
          }
          </WizardRightHandContainer>
        </WizardContainer>
        <WizardButtonFlex>
          <WizardSecondaryBtn
             name={"Back"}
             onClick={()=>handlePrevStep(location_index)}
             disabled={false}
           >
            Back
           </WizardSecondaryBtn>

           <WizardNextBtn
              name={"cancel"}
              onClick={()=>handleNextStep(location_index)}
              disabled={false}
            >
             Next
            </WizardNextBtn>
        </WizardButtonFlex>
      </Container>
    </>
  );
}

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
