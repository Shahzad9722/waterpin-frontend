import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton,CircularProgress } from '@mui/material';
import { Nav } from '../../components/Nav';
import { Search } from '../../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import { useTripsSlice } from './slice';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { TripCard } from './TripCard';
import { TripsDetail } from './TripsDetail';

import {
  selectAllTrips,
  selectLoading
} from './slice/selectors';

export function Trips() {

  const { actions } = useTripsSlice();
  const dispatch = useDispatch();
  const loading = useSelector(selectLoading);
  const allTrips = useSelector(selectAllTrips);

  const [trips, set_trips] = React.useState<any>(null);
  const [activeBar, set_activeBar] = React.useState(0);
  const [tripDetailActive, set_tripDetailActive] = React.useState(false);
  const [tripDetail, set_tripDetail] = React.useState(null);
  const [tripLoading, set_tripLoading] = React.useState(false);


  React.useEffect(() => {
    set_tripLoading(true)
    setTimeout(() => dispatch(actions.getAllTrips()), 0);
  },[])

  React.useEffect(() => {

    if (allTrips !== undefined && allTrips !== null) {

      let filteredItems:any = []

      switch (activeBar !== -1) {
        case activeBar === 0:
          filteredItems =  allTrips.filter((trip:any) => (trip.status === "Pending" || trip.status === "Confirmed"))
          break;
        case activeBar === 1:
          filteredItems =  allTrips.filter((trip:any) => trip.status === "Completed")
          break;
        case activeBar === 2:
          filteredItems =  allTrips.filter((trip:any) => trip.status === "Cancelled")
          break;
        default:
          filteredItems = allTrips
          break;
      }

      set_trips(filteredItems)
      set_tripLoading(false)
    }
  },[allTrips, activeBar])


  const toggleTripDetailModal = (activeTrip?:any) => {
    if (activeTrip) {
      set_tripDetail(activeTrip)
    }else{
      set_tripDetail(null)
    }
    set_tripDetailActive(!tripDetailActive)
  };


  return (
    <>
      <Helmet>
        <title>My Trips</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Nav/>
      <TripsDetail trip={tripDetail} open={tripDetailActive} onClose={toggleTripDetailModal}/>
      <Container>
        <TopHeader>
        <h1>MY TRIPS</h1>
        </TopHeader>
        <ToggleTabs>
            <ToggleTab onClick={()=> set_activeBar(0)} selected={activeBar=== 0 ? true: false}>
                {activeBar === 0 &&
                  <ActiveIndicator/>
                }
                <TabName>Upcoming</TabName>
            </ToggleTab>
            <ToggleTab onClick={()=> set_activeBar(1)} selected={activeBar=== 1 ? true: false}>
                {activeBar === 1 &&
                  <ActiveIndicator/>
                }
                <TabName>Completed</TabName>
            </ToggleTab>
            <ToggleTab onClick={()=> set_activeBar(2)} selected={activeBar=== 2 ? true: false}>
                {activeBar === 2 &&
                  <ActiveIndicator/>
                }
                <TabName>Canceled</TabName>
            </ToggleTab>
            <ToggleTab onClick={()=> set_activeBar(3)} selected={activeBar=== 3 ? true: false}>
                {activeBar === 3 &&
                  <ActiveIndicator/>
                }
                <TabName>All</TabName>
            </ToggleTab>
        </ToggleTabs>
        <>
          {(tripLoading === true || trips === null)
          ? (<Box mt={5} display={'flex'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'}>
            <CircularProgress sx={{color:"#00C2CB"}} size="120px"/>
            </Box>
          )
          : (
            <Box mt={5} display={'flex'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'space-between'}>
              {trips.length > 0
                ? (
                  <>
                    {trips.map((item,index)=>(
                            <TripCard trip={item} index={index} clk={toggleTripDetailModal}/>
                     ))
                    }
                  </>
                )
                :(
                  <h2>No trips found.</h2>
                )
              }


            </Box>
          )
          }
        </>
      </Container>
    </>
  );
}

const ActiveIndicator = styled.div`
  width:10px;
  height:10px;
  border-radius:20px;
  background-color:#00C2CB;
  position:absolute;
  top:15%;
  left: 15px;
`;

const CenterBox = styled.div`
  display:flex;
  width:100%;
  justify-content:space-between;
  margin-top: 10px;
  padding-bottom: 30px;
`;


const TopHeader = styled.div`
  display:flex;
  width:100%;
  justify-content:space-between;
  margin-top: 45px;
  padding-bottom: 30px;
`;

const ToggleTabs = styled.div`
  margin: auto;
  height: 125px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 25px;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
`;


const ToggleTab = styled.div<{selected:boolean}>`
  background: #ffffff;
  position: relative;
  cursor: pointer;
  ${({ selected }) => selected && `
      background: #ffffff;
      box-shadow: 0px 4px 20px rgba(179, 179, 179, 0.25);
      border-radius: 20px;
      width: 233px;
      height: 100px;
      display: flex;
      justify-content: center;
      align-items: center;
   `}
`;


const TabName = styled.span`
  font-family: GilroyMedium;
  font-size: 24px;
  line-height: 28px;
  color: #333333;
`;
