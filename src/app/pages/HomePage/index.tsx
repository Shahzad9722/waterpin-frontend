import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton, Grid, Grow, Fade} from '@mui/material';
import { Nav } from '../../components/Nav';
import { Search } from '../../components/Search';
import { Footer } from '../../components/Footer';

import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';

import { Skeleton } from '../../components/Common/skeleton';
import { Card } from '../../components/Common/card';

import boatsImage from '../../assets/homepage/boats.png'
import waterActivitiesImage from '../../assets/homepage/waterActivities.png'
import yachtsImage from '../../assets/homepage/yachts.png'
import dayTripsImage from '../../assets/homepage/dayTrips.png'
import jetskisImage from '../../assets/homepage/jetskis.png'
import overnightStaysImage from '../../assets/homepage/overnightStays.png'
import paddleBoardingImage from '../../assets/homepage/paddleBoarding.png'
import scubaDivingImage from '../../assets/homepage/scubaDiving.png'
import waterJetpacksImage from '../../assets/homepage/waterJetpacks.png'
import image1 from '../../assets/homepage/1.png'
import image2 from '../../assets/homepage/2.png'
import image3 from '../../assets/homepage/3.png'
import image4 from '../../assets/homepage/4.png'
import jsonData from './data.json'
import './homepage.scss'
import {
  useHistory,
  useParams,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';

export function HomePage() {
  const history = useHistory();


  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Nav/>
      <Fade
         in={true}
       >
        <HeroContainer>
              <HeroTitle>Luxury Boat Rentals & Yacht Charters Worldwide</HeroTitle>
              <Search/>
        </HeroContainer>
      </Fade>
      <Container>
         <Box mt={10} pb={5} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} >

              <h1 style={{marginBottom:'30px'}}>The World on Water</h1>
              <Grow
                 in={true}
                 style={{ transformOrigin: '0 0 0' }}
                 {...(true ? { timeout: 1000 } : {})}
               >
                <Grid container spacing={6} >
                       <Grid item xs={12} sm={4}>

                          <Card link="/listings/overnights" source={boatsImage} heading='Boats' content='15-35ft' alt={false}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Card link="/listings/overnights" source={yachtsImage} heading='Yachts' content='36-100ft +' alt={false}/>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                          <Card link="/listings/water-activities" source={waterActivitiesImage} heading='Water Activities' content="Jetski's, Tiki Bars & more" alt={false}/>
                        </Grid>

                </Grid>
              </Grow>

         </Box>
       </Container>
        <Box mt={10} pt={5} pb={10} style={{backgroundColor:"#F5F5F7"}}>
          <Container>
                <Grid container spacing={2} mt={5}>
                  <Grid item xs={12}>
                    <h1>Explore, Book and Enjoy!</h1>
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <div>Whether you are celebrating an anniversary, wedding, birthday or corporate event: Waterpin has you covered.</div>
                  </Grid>
                  <Grid item xs={12} sm={2}>
                    <div className="view-all-button">
                      <button onClick={()=>history.push('/listings/overnights')}>View All</button>
                    </div>
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt={5}>
                  <Grid item xs={12} sm={'auto'} md={'auto'} lg={6}>
                    <Card link="/listings/overnights" source={overnightStaysImage} heading='Overnight Stays' alt={true}/>
                  </Grid>
                  <Grid item xs={12} sm={'auto'} md={'auto'} lg={3}>
                    <Card link="/listings/water-activities?water_toy=jet_ski"  source={jetskisImage} heading='Jetskis' alt={true}/>
                  </Grid>
                  <Grid item xs={12} sm={'auto'} md={'auto'} lg={3}>
                    <Card link="/listings/water-activities?water_toy=jet_pack"  source={waterJetpacksImage} heading='Water Jetpacks'alt={true}/>
                  </Grid>
                </Grid>
                <Grid container spacing={2} mt={5}>
                  <Grid item xs={12} sm={'auto'} md={'auto'} lg={3}>
                    <Card link="/listings/water-activities?water_toy=scuba_diving" source={scubaDivingImage} heading='Scuba Diving' alt={true}/>
                  </Grid>
                  <Grid item xs={12} sm={'auto'} md={'auto'} lg={6}>
                    <Card link="/listings/day-trips" source={dayTripsImage} heading='Day Trips' alt={true}/>
                  </Grid>
                  <Grid item xs={12} sm={'auto'} md={'auto'} lg={3}>
                    <Card link="/listings/water-activities?water_toy=paddle_board" source={paddleBoardingImage} heading='Paddle Boarding'alt={true}/>
                  </Grid>
                </Grid>
            </Container>
        </Box>
        <Container>
          <Box className="sections" display={'flex'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'} textAlign={'center'} mb={10}>
              <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} style={{alignItems:'center'}}>
                  <h1>What Makes Us Different?</h1>
                  <div>We go beyond your expectations</div>
                  <Grid container spacing={10} mt={0}>
                    <Grid item xs={12} sm={6}>
                          <Skeleton source={image1} heading='We Go The Extra Mile' content={jsonData.mainPage["1p"]}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                          <Skeleton source={image2} heading='Secure & Worry Free' content={jsonData.mainPage["2p"]}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                          <Skeleton source={image3} heading='Experienced Team' content={jsonData.mainPage["3p"]}/>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                          <Skeleton source={image4} heading='Focused on Safety' content={jsonData.mainPage["4p"]}/>
                    </Grid>
                  </Grid>
              </Box>
          </Box>
        </Container>
      <Footer no_margin={true}/>
    </>
  );
}

export const HeroContainer = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items:center;
  flex-direction:column;
  padding:20px;
  margin-bottom:5px;
  width: 100%;
  height: 620px;
  background: #fff;
  transition:  transform 250ms;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center 70%;
  background-image: url(${process.env.PUBLIC_URL + '/home-hero-2.svg'});
`;

export const HeroTitle = styled.h1`
  font-family: GilroyBold;
  font-size: 36px;
  line-height: 42px;
  text-align: center;
  color: #333333;
  margin-top:40px;
  margin-bottom:40px;
`;
