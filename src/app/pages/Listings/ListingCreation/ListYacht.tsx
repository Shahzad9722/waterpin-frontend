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

export function ListYacht() {
  const [loadedDetail, set_loadedDetail] = React.useState(false);


  const { actions } = useListcreationSlice();
  const dispatch = useDispatch();

  const { id } : any = useParams();

  const history = useHistory();

  const [index, setIndex] = React.useState(0);
  const [indexHeading, setIndexHeading] = React.useState([
    'Getting Started',
    'Location',
    'Pin Location',
    'Yacht Details',
    'Yacht Amenities',
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

  React.useEffect(() => {
    if (id !== undefined && id !== null) {
      setTimeout(() => dispatch(actions.loadListing({id:id})), 0);
      set_loadedDetail(true)

    }
  },[])

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
        return <Review activeIndex={activeIndex} setIndex={setIndex} isEditing={loadedDetail}/>
        break;
      default:
        return null;
        break;
    }
  }

  return (
    <>
      <Helmet>
        <title>Create A Yacht Listing</title>
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
      <p></p>
      </WizardFooter>
    </>
  );
}
