import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton } from '@mui/material';
import { useHistory, useParams, RouteComponentProps, withRouter} from 'react-router-dom';

import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { WizardFooter, WizardLinkCancel, WizardLinkSave, WizardHeaderIcon, WizardHeaderContainer, ButtonFlex} from './common/layout';

import { GettingStarted } from './steps/GettingStarted';
import { Location } from './steps/Location';
import { LocationMap } from './steps/LocationMap';
import { Details } from './steps/Details';
import { Amenities } from './steps/Amenities';
import { Rules } from './steps/Rules';
import { Title } from './steps/Title';
import { Pictures } from './steps/Pictures';
import { Upload } from './steps/Upload';
import { Category } from './steps/Category';
import { KeepGoing } from './steps/KeepGoing';

import { Pricing } from './steps/Pricing';
import { Insurance } from './steps/Insurance';
import { Availability } from './steps/Availability';
import { Review } from './steps/Review';
import { Cancelation } from './steps/Cancelation';
import { WaterActivity } from './steps/WaterActivity';
import { InsuranceCertify } from './steps/InsuranceCertify';
import { useListcreationSlice } from "./slice";
import { useSelector, useDispatch } from 'react-redux';

interface Props extends RouteComponentProps{
  id: string; // parameters will always be a string (even if they are numerical)
}

export function ListBoat() {

  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const history = useHistory();

  const [index, setIndex] = React.useState(0);
  const [firstProgressBar, setFirstProgressBar] = React.useState(0);
  const [secProgressBar, setSecProgressBar] = React.useState(0);
  const [thirdProgressBar, setThirdProgressBar] = React.useState(0);
  const [forthProgressBar, setForthProgressBar] = React.useState(0);
  const [fifthProgressBar, setFifthProgressBar] = React.useState(0);

  const [loadedDetail, set_loadedDetail] = React.useState(false);


  const { id } : any = useParams();


  React.useEffect(() => {
    if (id !== undefined && id !== null) {
      setTimeout(() => dispatch(actions.loadListing({id:id})), 0);

      set_loadedDetail(true)
    }
  },[])

  const [locationData, set_locationData] = React.useState([
      {
        label: 'Marina Name',
        value: "",
      },
      {
        label: 'Pier/Dock',
        value: "",
      },
      {
        label: 'Slip Number',
        value: "",
      },

      {
        label: 'Country',
        value: "",
      },
      {
        label: 'Street Address',
        value: "",
      },
      {
        label: 'City',
        value: "",
      },
      {
        label: 'State / Province',
        value: "",
      },
      {
        label: 'Zip Code',
        value: "",
      },{
        label: 'Location',
        value: "",
      }
  ]);
  const [locationDetail, setlocationDetail] = React.useState([
    {
      label: 'Boat Name',
      value: "",
    },
    {
      label: 'Boat Make',
      value: "",
    },
    {
      label: 'Model',
      value: "",
    },

    {
      label: 'Year',
      value: "",
    },
    {
      label: 'Length',
      value: "",
    },
    {
      label: 'Boat type',
      value: "",
    },
    {
      label: 'Boat Operates',
      value: "",
    }
  ]);
  const [amenitiesOptions, set_amenitiesOptions] = React.useState({
    interiorOptions: [
      {
        label: "Kitchen",
        value: ""
      }, {
        label: "Refrigerator",
        value: ""
      }, {
        label: "Microwave",
        value: ""
      }, {
        label: "Air Conditioning",
        value: ""
      }, {
        label: "TV Stereo",
        value: ""
      }
    ],
    exteriorOptions: [
      {
        label: "Flybridge",
        value: ""
      }, {
        label: "Swim Platform",
        value: ""
      }, {
        label: "Swim ladder",
        value: ""
      }, {
        label: "Anchor",
        value: ""
      }, {
        label: "Shower",
        value: ""
      }, {
        label: "Grill",
        value: ""
      }, {
        label: "Cooler",
        value: ""
      }
    ],
    safetyOptions: [
      {
        label: "Life Jackets",
        value: ""
      }, {
        label: "VHF radio",
        value: ""
      }, {
        label: "Thrusters",
        value: ""
      }, {
        label: "Stabilizer",
        value: ""
      }, {
        label: "GPS",
        value: ""
      }, {
        label: "Sonar",
        value: ""
      }, {
        label: "Radar",
        value: ""
      }, {
        label: "Medical Kit",
        value: ""
      }, {
        label: "Flashlight",
        value: ""
      }
    ],
    waterToyOptions: [
      {
        label: "Jet Ski",
        value: ""
      }, {
        label: "Tender",
        value: ""
      }, {
        label: "Floating Mat",
        value: ""
      }, {
        label: "Snorkeling Gear",
        value: ""
      }, {
        label: "Diving Gear",
        value: ""
      }, {
        label: "Paddle Board",
        value: ""
      }, {
        label: "Paddle Board",
        value: ""
      }, {
        label: "Water Slide",
        value: ""
      }, {
        label: "Jacuzzi",
        value: ""
      }
    ],
    interiorOtherOptions: [],
    exteriorOtherOptions: [],
    safetyOtherOptions: [],
    waterToyOtherOptions: [],
  });

  const [yacht_rules, set_yacht_rules] = React.useState([
    {
      label: "No Shoes",
      value: ""
    }, {
      label: "No Glass Bottles",
      value: ""
    }, {
      label: "No Smoking",
      value: ""
    }, {
      label: "No Fishing",
      value: ""
    }, {
      label: "No Red Wine",
      value: ""
    }, {
      label: "No Alcohol",
      value: ""
    }, {
      label: "No Kids Under 10",
      value: ""
    }, {
      label: "No Kids Under 2",
      value: ""
    }
  ]);
  const [yacht_details, set_yacht_details] = React.useState([
    {
      label: "Listing Name",
      value: ""
    }, {
      label: "Describe Your Yacht",
      value: ""
    }
  ]);

  const [yacht_offer, set_yacht_offer] = React.useState({
    day_trips: [
      {
        label: "price_for_4_hours",
        value: 0
      },{
        label: "price_for_6_hours",
        value: 0
      },{
        label: "price_for_8_hours",
        value: 0
      },{
        label: "guest_capacity",
        value: ""
      },{
        label: "security_deposit",
        value: ""
      },{
        label: "taxest",
        value: ""
      },{
        label: "gratuity",
        value: ""
      },{
        label: "fuel_policy",
        value: ""
      },{
        label: "catering_service",
        value: ""
      },{
        label: "chef",
        value: ""
      },{
        label: "additional_service",
        value: ""
      },{
        label: "extra_water_toys",
        value: ""
      },{
        label: "other",
        value: ""
      }
    ],
    overnight_stays: [
      {
        label: "price_per_day",
        value: 0
      },{
        label: "price_per_week",
        value: 0
      },{
        label: "guest_capacity",
        value: ""
      },{
        label: "security_deposit",
        value: ""
      },{
        label: "taxest",
        value: ""
      },{
        label: "gratuity",
        value: ""
      },{
        label: "apa",
        value: ""
      },{
        label: "catering_service",
        value: ""
      },{
        label: "chef",
        value: ""
      },{
        label: "additional_service",
        value: ""
      },{
        label: "extra_water_toys",
        value: ""
      },{
        label: "other",
        value: ""
      }
    ]
  });

  const [cancelation_policy, set_cancelation_policy] = React.useState({
    flexible: "",
    moderate: "",
    strict: "",
    user_your_own: ""
  });

  const [waterActivityTabs, set_waterActivityTabs] = React.useState([
    {
      label: "Dockside Dining",
      value: false,
      image: ''
    }, {
      label: "Tours",
      value: false,
      image: ''
    }, {
      label: "Boat Hotel",
      value: false,
      image: ''
    }, {
      label: "Captain Lessons",
      value: false,
      image: ''
    }, {
      label: "Photoshoot",
      value: false,
      image: ''
    }, {
      label: "Fishing",
      value: false,
      image: ''
    }
  ]);

  const [insurance, set_insurance] = React.useState({
    waterpins_insurance: false,
    own_insurance: false
  });


  const [indexHeading, setIndexHeading] = React.useState([
    'Getting Started',
    'Location',
    'Pin Location',
    'Boat Details',
    'Boat Amenities',
    'Title & Description',
    'Photos',
    'Photos',
    'KEEP GOING',
    'Trip Category',
    'Trip Category',
    'Water Activity',
    'Availability',
    'KEEP GOING',
    'Cancelation Policy',
    'Insurance Certify',
    'Review',
  ]);

  const editChange = (i) => {
    setIndex(i);
  };

  function renderIndexScreen(activeIndex:number) {
    switch (true) {
      case activeIndex === 0:
        return <GettingStarted activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 1:
        return <Location activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 2:
        return <LocationMap activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 3:
        return <Details activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 4:
        return <Amenities activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 5:
        return <Rules activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 6:
        return <Title activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 7:
        return <Pictures activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 8:
        return <Upload activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 9:
        return <KeepGoing activeIndex={activeIndex} setIndex={setIndex} percent={"60"}/>
        break;
      case activeIndex === 10:
        return <Category activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 11:
        return <Pricing activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 12:
        return <WaterActivity activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 13:
        return <Availability activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 14:
        return <KeepGoing activeIndex={activeIndex} setIndex={setIndex} percent={"90"} />
        break;
      case activeIndex === 15:
        return <Cancelation activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 16:
        return <InsuranceCertify activeIndex={activeIndex} setIndex={setIndex} />
        break;
      case activeIndex === 17:
        return <Review activeIndex={activeIndex} setIndex={setIndex} isEditing={loadedDetail} />
        break;
      default:
        return null;
        break;
    }
  }

  return (
    <>
    <Helmet>
      <title>Create A Boat Listing</title>
      <meta name="description" content="The water platform for everyone" />
    </Helmet>
    <WizardHeaderContainer>
      <Box display={'flex'} alignItems={'center'}>
        <WizardHeaderIcon src={process.env.PUBLIC_URL + '/blue-pin.svg'}/>
        <h3>{indexHeading[index]}</h3>
      </Box>
      <Box display={'flex'} alignItems={'center'}>
        <WizardLinkCancel onClick={()=>history.push('/create-listing')}>Cancel</WizardLinkCancel>
        <WizardLinkSave>Save & Exit</WizardLinkSave>
      </Box>
    </WizardHeaderContainer>
    <Box display={'flex'} alignItems={'center'}>
      {renderIndexScreen(index)}
    </Box>
    <WizardFooter>
    <p>Footer</p>
    </WizardFooter>
    </>
  );
}
