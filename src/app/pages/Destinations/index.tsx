/**
 *
 * Destinations
 *
 */
import * as React from 'react';
import axios from 'axios';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { PlaceCard } from '../../components/PlaceCard';
import { CityCard } from '../../components/CityCard';
import { MapsNoMarkers } from '../../components/Maps';

import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { SubFooter } from '../../components/SubFooter';
import {
  Container,
  Grid,
  Pagination,
  CircularProgress,
  Box,
  InputLabel,
  MenuItem,
  FormControl,
  Select,
} from '@mui/material';

import { useDestinationsSlice } from './slice/index';

import img1 from './images/Group.png';
import img2 from './images/Group (1).png';
import img3 from './images/Group (2).png';
import img4 from './images/Group (3).png';
import img5 from './images/Group (4).png';
import img6 from './images/Group (5).png';
import Polygon from './images/Polygon 1.png';
import NorthAmerica from './images/North America.png';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import img7 from './images/dest.jpg';

interface Props {}

export function Destinations(props: Props) {
  const { actions } = useDestinationsSlice();
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  let [showPolygone, setShowPolygone]: any = useState(0);
  const [mapData, setMapData]: any = useState([]);
  const [pages, setPages] = useState(1);
  const [page_num, set_page_num] = useState(1);
  const [countries, setCountries]: any = useState([]);
  const [states, setStates]: any = useState([]);
  const [country, setCountry]: any = useState('United States');
  const [state, setState]: any = useState('Alabama');
  const [region, setRegion]: any = useState('America');
  const [search, setSearch]: any = useState('');
  const [stateLoading, setStateLoading]: any = useState(false);
  const [countryLoading, setCountryLoading]: any = useState(false);

  let [activeMapCenter, set_activeMapCenter]: any = useState({
    lat: 0.0,
    lng: 0.0,
  });
  let [activeMapZoom, set_activeMapZoom]: any = useState(3);
  React.useEffect(() => {
    setCountryLoading(true);
    axios
      .get(`https://restcountries.com/v3.1/region/America`)
      .then(response => {
        let allCountries = response.data.map(country => {
          return { country: country.name.common };
        });
        setCountries(allCountries);
        setCountryLoading(false);
      });
  }, []);

  const loader = useSelector((state: any) => state.destinations.loading);
  console.log('dest-> ', loader);

  const num_of_pages = useSelector(
    (state: any) => state.destinations.num_of_pages,
  );
  console.log('dest-> ', num_of_pages);

  const destinations = useSelector(
    (state: any) => state.destinations.destinations,
  );

  const location_data = useSelector(
    (state: any) => state.destinations.location_data,
  );
  console.log('locationdata-> ', location_data);

  let [cities, setCities] = useState([
    { img: img1, title: 'North America', value: 'America' },
    { img: img2, title: 'Latin America', value: 'South America' },
    { img: img3, title: 'Europe', value: 'Europe' },
    { img: img4, title: 'Africa', value: 'Africa' },
    { img: img5, title: 'Asia', value: 'Asia' },
    { img: img6, title: 'Oceania', value: 'Oceania' },
  ]);

  React.useEffect(() => {
    if (num_of_pages !== undefined && num_of_pages !== null) {
      setPages(num_of_pages);
    }
  }, [num_of_pages]);

  React.useEffect(() => {
    if (location_data !== undefined && location_data !== null) {
      set_activeMapCenter({
        lat: location_data[0].latitude,
        lng: location_data[0].longitude,
      });
      set_activeMapZoom(7);
    }
  }, [location_data]);

  //Pagination Api
  React.useEffect(() => {
    dispatch(actions.getDestinations({ page_num, state }));
  }, [page_num, state]);

  //Get All States
  const getAllStates = (country, latitude, longitude) => {
    setStateLoading(true);
    setCountry(country);
    set_activeMapCenter({ lat: latitude, lng: longitude });
    set_activeMapZoom(5);

    axios
      .get('https://www.universal-tutorial.com/api/getaccesstoken', {
        headers: {
          Accept: 'application/json',
          'api-token':
            'o9TlJFCH10PFYeSzH93oDkiPpVGWHoRZJ9DwgsoUxNwnB8xdho4KKtah1zCK6BS_0cE',
          'user-email': 'ghulam_mustafa@nextpak.org',
        },
      })
      .then(response => {
        axios
          .get(`https://www.universal-tutorial.com/api/states/${country}`, {
            headers: {
              Authorization: `Bearer ${response.data.auth_token}`,
              Accept: 'application/json',
            },
          })
          .then(response => {
            setStates(response.data);
            setStateLoading(false);
          });
      });
  };

  //Get All Countries
  const getAllCountries = async (region, showRegion, idxx) => {
    if (showPolygone == idxx) {
      setShowPolygone(null);
      setRegion('All');
    } else {
      setShowPolygone(idxx);
      setCountry('Select Country');
      setState('Select State');
    }
    setCountryLoading(true);
    setRegion(showRegion);
    await axios
      .get(`https://restcountries.com/v3.1/region/${region}`)
      .then(response => {
        let allCountries = response.data.map(country => {
          return {
            country: country.name.common,
            latitude: country.latlng[0],
            longitude: country.latlng[1],
          };
        });
        setCountries(allCountries);
        setCountryLoading(false);
      });
  };

  //Get All State
  const getState = async state => {
    setState(state);
  };

  return (
    <>
      <Nav searchValue={search} handleSearch={setSearch} />

      <Div>
        {t('')}
        <DestinationTitle> Where do you want to go?</DestinationTitle>
      </Div>
      <Div>
        <DestinationDescription>
          To get started, click on the country or region in the map (or keep
          scrolling for more options).
        </DestinationDescription>
      </Div>
      <Div>
        <Container>
          <Grid container>
            {cities.map((city, idx) => (
              <Grid key={idx} item xs={12} sm={4} md={3} lg={2}>
                <Div
                  onClick={() => getAllCountries(city.value, city.title, idx)}
                >
                  <CityCard image={city.img} title={city.title} />
                </Div>
                <Div>
                  {showPolygone === idx ? (
                    <Div>
                      <Div>
                        <PolygoneImage src={Polygon} />
                      </Div>
                      <Div>
                        <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                          <InputLabel id="countrySelectLabel">
                            {countryLoading ? (
                              <LoaderDiv>
                                <CircularProgress size="30px" />
                              </LoaderDiv>
                            ) : showPolygone === 0 ? (
                              country
                            ) : (
                              'Select Country'
                            )}
                          </InputLabel>
                          <Select
                            labelId="countrySelectLabel"
                            id="countrySelect"
                            value={countries.country}
                          >
                            {countries.map((country, index, code) => (
                              <MenuItem
                                key={index}
                                value={country.country}
                                onClick={() =>
                                  getAllStates(
                                    country.country,
                                    country.latitude,
                                    country.longitude,
                                  )
                                }
                              >
                                {country.country}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Div>
                      <Div>
                        <FormControl fullWidth sx={{ marginBottom: '10px' }}>
                          <InputLabel id="countrySelectLabel">
                            {stateLoading ? (
                              <LoaderDiv>
                                <CircularProgress size="30px" />
                              </LoaderDiv>
                            ) : showPolygone === 0 ? (
                              state
                            ) : (
                              'Select State'
                            )}
                          </InputLabel>
                          <Select
                            labelId="countrySelectLabel"
                            id="countrySelect"
                            value={states.state_name}
                          >
                            {states.map((country, index) => (
                              <MenuItem
                                key={index}
                                value={country.state_name}
                                onClick={() => getState(country.state_name)}
                              >
                                {country.state_name}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Div>
                    </Div>
                  ) : null}
                </Div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Div>
      <Container>
        <Box height={650}>
          <MapsNoMarkers center={activeMapCenter} zoom={activeMapZoom} />
        </Box>
      </Container>
      <Div>
        <FloridaTitle>
          {region}
          {'/'}
          {country}
          {'/'}
          {state}
        </FloridaTitle>
      </Div>
      <CardDiv>
        <Container>
          <Grid container spacing={4}>
            {loader ? (
              <Grid
                sx={{
                  margin: '20px auto',
                }}
              >
                <CircularProgress />
              </Grid>
            ) : (
              <>
                {destinations.length === 0 ? (
                  <Grid
                    sx={{
                      margin: '20px auto',
                    }}
                  >
                    <NoDataResponse>
                      No data based on your filter query
                    </NoDataResponse>
                  </Grid>
                ) : (
                  destinations
                    .filter(todo => {
                      if (search === '') {
                        return todo;
                      } else if (
                        todo.destination_name
                          .toLowerCase()
                          .includes(search.toLowerCase())
                      ) {
                        return todo;
                      }
                    })
                    .map(place => (
                      <Grid item xs={12} sm={6} md={4}>
                        <PlaceCard
                          image={
                            place.destination_image
                              ? place.destination_image
                              : img7
                          }
                          title={place.destination_name}
                          description={place.city_description}
                        />
                      </Grid>
                    ))
                )}
              </>
            )}
          </Grid>
        </Container>
      </CardDiv>
      <PgDiv>
        {destinations.length === 0 ? null : (
          <Pagination
            count={pages}
            page={page_num}
            variant="outlined"
            onChange={(e, value) => set_page_num(value)}
          />
        )}
      </PgDiv>
      <Footer />
    </>
  );
}

const Div = styled.div``;

const LoaderDiv = styled.div``;

const NoDataResponse = styled.h2`
margin-left:200px
  font-family: GilroyBold;
`;

const PgDiv = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 30px;
`;

const CardDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  text-align: center;
  // @media only screen and (max-width: 600px) {
  //   display: flex;
  //   justify-content: center;
  //   align-items: center;
  //   flex-direction: column;
  //   width: 420px;
  // }
`;

const DestinationTitle = styled.h2`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-family: GilroyBold;
  font-size: 36px;
  line-height: 28px;
  margin-top: 100px;
  text-align: center;
  text-transform: capitalize;
  @media only screen and (max-width: 600px) {
    padding-left: 20px;
    padding-right: 20px;
    line-height: 35px;
  }
`;

const DestinationDescription = styled.p`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  font-family: GilroyMedium;
  font-size: 20px;
  line-height: 24px;
  @media only screen and (max-width: 600px) {
    padding-left: 20px;
    padding-right: 20px;
  }
`;

const DestinationImages = styled.div`
  background: #ffffff;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const PolygoneImage = styled.img`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  margin-left: 80px;
  margin-bottom: 10px;
  @media only screen and (max-width: 600px) {
    margin-left: 135px;
    margin-bottom: 10px;
    margin-top: -10px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  @media only screen and (max-width: 800px) and (min-width: 599.98px) {
    margin-left: 105px;
    margin-bottom: 10px;
    margin-top: -10px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  @media only screen and (max-width: 1050px) and (min-width: 799.98px) {
    margin-left: 110px;
    margin-bottom: 10px;
    margin-top: -10px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const DestinationNorthAmericaImage = styled.img`
  border-radius: 20px;
  width: 1125px;
  @media only screen and (max-width: 600px) {
    overflow: hidden;
    width: 300px;
    height: 245px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  @media only screen and (max-width: 800px) and (min-width: 599.98px) {
    overflow: hidden;
    width: 630px;
    height: 400px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
  @media only screen and (max-width: 1050px) and (min-width: 799.98px) {
    overflow: hidden;
    width: 890px;
    height: 520px;
    justify-content: center;
    align-items: center;
    text-align: center;
  }
`;

const FloridaTitle = styled.h2`
  display: flex;
  align-items: center;
  text-align: center;
  font-family: GilroyBold;
  justify-content: center;
  font-size: 36px;
  line-height: 42px;
  text-transform: capitalize;
  // @media only screen and (max-width: 600px) {
  //   width: 200px;
  //   height: 26px;
  //   margin-bottom: 20px;
  //   margin-top: 20px;
  //   justify-content: center;
  //   align-items: center;
  //   text-align: center;
  // }
`;
