/**
 *
 * Listings
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Helmet } from 'react-helmet-async';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Nav } from '../../components/Nav';
import { Footer } from '../../components/Footer';
import { Maps } from '../../components/Maps';
import { Search } from '../../components/Search';
import { Carousels } from '../../components/Carousels';
import { SaveButton, FilterButton } from '../../components/Listings';
import '../../components/Layout/layout.scss';


import { Container, Stack, Divider, Box, Grid, Button, IconButton, Skeleton, Menu, MenuItem, Slider, Popper, TextField, Link, FormControlLabel, Checkbox, FormGroup, Pagination, CircularProgress } from '@mui/material';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useHistory, useParams, RouteComponentProps, withRouter, useLocation} from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useListingSlice } from './slice';
import {
  selectLoading,
  selectPayload,
  selectError,
  selectResults,
  selectSuccess,
  selectPageNum,
  selectNumOfPages,
  selectSearchTotal,
  selectLocation,
  selectDuration,
  selectStartCharter,
  selectEndCharter,
  selectFilterMaxSize,
  selectFilterMinSize,
  selectFilterPriceMin,
  selectFilterPriceMax,
  selectFilterWaterToys,
  selectFilterMore,
  selectMapData,
  selectListing,
  selectListType
} from './slice/selectors';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}


interface Props {}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export const ListingCard: React.FC<{listing:any, user_favorites:any[]}> = ({listing, user_favorites}) => {
  const { actions } = useListingSlice();
  const dispatch = useDispatch();

  const loading = useSelector(selectLoading)
  const errors = useSelector(selectError)
  const success = useSelector(selectSuccess)
  const payload = useSelector(selectPayload)

  const [toggleHeart, setToggleHeart] = React.useState(false);
  const [listing_reviews, set_listing_reviews] = React.useState([]); //total reviews list
  const [listing_reviews_avg, set_listing_reviews_avg] = React.useState(0.00); //avarage rating of listing
  const [listing_images, set_listing_images] = React.useState<any>([]);

  const calculateReview = list => {
    let totalReviewListing = 0;
    list.forEach(element => {
      let a = element.rating_communication + element.rating_kindness + element.rating_service;
      totalReviewListing += a / 3;
    });
    let avgReviews = totalReviewListing / list.length;
    let finalReviews = avgReviews.toFixed(2);
    set_listing_reviews_avg(parseFloat(finalReviews));
  };


  const handleFavoriteLisiting = (event: React.ChangeEvent<unknown>, listing_id: number) => {
  };


  const favoriteListing = () => {
        if (!toggleHeart) {
          console.log(user_favorites)
          setTimeout(() => dispatch(actions.favoriteListing({listing_id:listing.listing_id})), 0);
        }else {
          //dispatch unfovorite API
          console.log(user_favorites)
          setTimeout(() => dispatch(actions.unfavoriteListing({listing_id:listing.listing_id})), 0);
        }
        setToggleHeart(!toggleHeart);
  };

  React.useEffect(() => {
    if(listing !== undefined && listing !== null && user_favorites !==null ){
      set_listing_reviews(listing.reviews)
      if (listing.images) {
        if (isEmpty(listing.images) === false) {
          const images:any = [...listing.images];
          set_listing_images(images)
        }
      }
      //calculateReview(listing.reviews)
    }

    if(user_favorites !== undefined && user_favorites !== null ){
      let isFavored = user_favorites.find((item:any)=>item.listing_id === listing.listing_id)
      if (isFavored) {
        setToggleHeart(true)
      }
    }


  },[listing, user_favorites])


  return (
    <ListingCardContainer>
      <Grid container>
        <Grid xs={12} sm={4}>
          {
            listing.images && listing_images.length > 0? (
                <Carousels>
                  {listing_images.map(element => (
                    <ListingCardImageWrapper>
                      <img src={element.location}/>
                    </ListingCardImageWrapper>
                  ))}
                </Carousels>
            ) : (
              <Skeleton variant="rectangular" width={335} height={205} style={{borderRadius:20}} />
            )
          }
        </Grid>
        <Grid xs={12} sm={8}>
            <Box flexGrow={1} pl={5} pr={5}>
              <ListingCardSubHeaderWrapper>
              <Box>
              {listing.city}, {listing.country}
              </Box>
              <Box onClick={favoriteListing}>

                {toggleHeart
                  ? (<FaHeart color="#27ccd3"/>)
                  : (<FaRegHeart/>)
                }
              </Box>
              </ListingCardSubHeaderWrapper>
              <ListingTitle href={`/listings/detail/`+listing.listing_id}>{listing.listing_name}</ListingTitle>
              <div className="horizontal-line"/>
              <ListingCardDetailsWrapper>
                <Box>
                  <FaRegHeart/>
                  {listing.length}
                </Box>
                <Box>
                  <FaRegHeart/>
                </Box>
                <Box>
                  <FaRegHeart/>
                  {listing.amenities_interior && listing.amenities_interior.bedrooms} Cabins
                </Box>
                <Box>
                  <FaRegHeart/>
                  {listing.amenities_interior &&  listing.amenities_interior.bathrooms}
                </Box>
              </ListingCardDetailsWrapper>
              <div className="horizontal-line"/>

            </Box>
        </Grid>
      </Grid>

    </ListingCardContainer>
  );
}

export function Listings(props: Props) {
  const { actions } = useListingSlice();
  const dispatch = useDispatch();

  const listingState = useSelector(selectListing)

  const history = useHistory();

  const loading = useSelector(selectLoading)
  const errors = useSelector(selectError)
  const success = useSelector(selectSuccess)
  const resultsLoaded = useSelector(selectResults)
  const page = useSelector(selectPageNum)
  const number_of_pages = useSelector(selectNumOfPages)
  const search_total = useSelector(selectSearchTotal)

  const list_type = useSelector(selectListType)


  const location = useSelector(selectLocation)
  const duration = useSelector(selectDuration)
  const start_charter = useSelector(selectStartCharter)
  const end_charter = useSelector(selectEndCharter)
  const filter_size_max = useSelector(selectFilterMaxSize)
  const filter_size_min = useSelector(selectFilterMinSize)
  const filter_price_min = useSelector(selectFilterPriceMin)
  const filter_price_max = useSelector(selectFilterPriceMax)
  const filter_water_toys = useSelector(selectFilterWaterToys)
  const filter_more_filter = useSelector(selectFilterMore)
  const mapData = useSelector(selectMapData)

  const [userFavs, set_userFavs] = React.useState([]);


  const { t, i18n } = useTranslation();
  const [listing_type, set_listing_type] = React.useState('Overnight Stays');
  const [city, set_city] = React.useState('');
  const [results, set_results] = React.useState([]);
  const [page_num, set_page_num] = React.useState(1);
  const [pages, set_pages] = React.useState(1);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorPrice, setAnchorPrice] = React.useState(null);
  const [anchorWaterToys, setAnchorWaterToys] = React.useState(null);
  const [anchorMore, setAnchorMore] = React.useState(null);

  const open = Boolean(anchorEl);
  const priceOpen = Boolean(anchorPrice);
  const toysOpen = Boolean(anchorWaterToys);
  const moreOpen = Boolean(anchorMore);

  const [value, setValue] = React.useState(30);

  const query = useQuery();
  const location_query = query.get('location')
  const start_charter_query = query.get('start_charter')
  const end_charter_query = query.get('end_charter')
  const duration_query = query.get('duration')
  const price_max_query = query.get('price_max')
  const price_min_query = query.get('price_min')
  const size_max_query = query.get('size_max')
  const size_min_query = query.get('size_min')

  const water_toys_query = query.get('water_toys')
  const more_query = query.get('more')

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  React.useEffect(() => {
    if(location_query !== undefined && location_query !== null){
      setTimeout(() => dispatch(actions.search({location:location_query, list_type:list_type,duration:duration, start_charter:start_charter, end_charter:end_charter, filter_size_max:filter_size_max, filter_size_min:filter_size_min,filter_price_min:filter_price_min, filter_price_max:filter_price_max, filter_water_toys:filter_water_toys, filter_more_filter:filter_more_filter, page_num:page_num})), 100);
    }
  },[location_query])

  React.useEffect(() => {
    if (window.location.href.includes('overnights')) {
      set_listing_type('overnights')
      setTimeout(() => dispatch(actions.search({location:location, list_type:'overnights',duration:duration, start_charter:start_charter, end_charter:end_charter, filter_size_max:filter_size_max, filter_size_min:filter_size_min, filter_price_min:filter_price_min, filter_price_max:filter_price_max, filter_water_toys:filter_water_toys, filter_more_filter:filter_more_filter, page_num:page_num})), 100);
    }else if (window.location.href.includes('day-trips')) {
      set_listing_type('day-trips')
      setTimeout(() => dispatch(actions.search({location:location, list_type:'day-trips', duration:duration, start_charter:start_charter, end_charter:end_charter, filter_size_max:filter_size_max, filter_size_min:filter_size_min, filter_price_min:filter_price_min, filter_price_max:filter_price_max, filter_water_toys:filter_water_toys, filter_more_filter:filter_more_filter, page_num:page_num})), 100);
    }
  },[])



    React.useEffect(() => {
      const userCookie = localStorage.getItem('user');
      console.log(userCookie)

      if (userCookie) {
        const parsedUser = JSON.parse(userCookie);
        console.log(parsedUser)
        set_userFavs(parsedUser.favorites)
      }
    }, []);

  const handlePriceClick = (event:any) => {
    if (priceOpen) {
      setAnchorPrice(null);
    }else{
      setAnchorPrice(event.currentTarget);
      setAnchorEl(null);
      setAnchorWaterToys(null);
      setAnchorMore(null);

    }
  };

  const handleToysClick = (event:any) => {
    if (toysOpen) {
      setAnchorWaterToys(null);
    }else{
      setAnchorWaterToys(event.currentTarget);
      setAnchorEl(null);
      setAnchorPrice(null);
      setAnchorMore(null);
    }
  };

  const handleMoreClick = (event:any) => {
    if (moreOpen) {
      setAnchorMore(null);
    }else{
      setAnchorMore(event.currentTarget);
      setAnchorWaterToys(null);
      setAnchorEl(null);
      setAnchorPrice(null);
    }
  };

  const handleClick = (event:any) => {
    if (open) {
      setAnchorEl(null);
    }else{
      setAnchorEl(event.currentTarget);
      setAnchorWaterToys(null);
      setAnchorMore(null);
      setAnchorPrice(null);
    }
  };
  const handleClose = () => {
    setAnchorEl(null);

  };

  const handleListingCardClick = () => {
    setAnchorEl(null);

  };


  // React.useEffect(() => {
  //   if(props !== null && props !== undefined){
  //     if (props.type === "overnights") {
  //       set_listing_type("Overnight Stays");
  //     }else {
  //       set_listing_type("Day Trips");
  //     }
  //   }
  // },[props])

  // function handleLogout(e:any) {
  //   setTimeout(() => dispatch(actions.logout()), 100);
  // }

  React.useEffect(() => {
  if(resultsLoaded !== undefined && resultsLoaded !== null){
      set_results(resultsLoaded)
    }
  },[resultsLoaded])

  React.useEffect(() => {
    if(page !== undefined && page !== null){
      set_page_num(page)
    }
  },[page])

  React.useEffect(() => {
    if(number_of_pages !== undefined && number_of_pages !== null){
      set_pages(number_of_pages)
    }
  },[number_of_pages])


  function handleSearch(e:any) {
    setTimeout(() => dispatch(actions.search({location:location, page_num:page_num, duration:duration, start_charter:start_charter, end_charter:end_charter, filter_size_max:filter_size_max, filter_size_min:filter_size_min, filter_price_min:filter_price_min, filter_price_max:filter_price_max, filter_water_toys:filter_water_toys, filter_more_filter:filter_more_filter})), 100);
  }

  function renderLisitings(listings:any[], map_data:any, user_favorites:any[]) {
    let renderList:any = []

    //console.log(user_favorites)

    listings.forEach(listing => {
      renderList.push(<ListingCard listing={listing} user_favorites={user_favorites}/>)
    });

    let activeCenter = {lat:0.00, lng:0.00}

    if (map_data !== null && map_data.length > 0) {
      activeCenter = {lat:map_data[0].latitude, lng:map_data[0].longitude}
    }


    return(<ListingWrapper>

      <Box width={"100%"}>
        {loading
          ? (
            <CircularProgress />
          )
          : (<>
            {renderList.length !== 0
              ? (
                <>{renderList}</>
              )
              : <Box justifyContent={'center'}><h3>No listings found that matched your criteria, please adjust your search.</h3></Box>

            }
            </>
          )

        }

      </Box>
      <Box width={"80%"}>
        <Maps listings={results} center={activeCenter}/>
      </Box>
    </ListingWrapper>
    )
  }

  function changeURLParams(name:string, value:string) {
    let url = new URL(window.location.href);
    let params = new URLSearchParams(url.search);
    let queryParams = window.location.href.split('?')[1]
    if (!queryParams) {
      history.push({
        search: '?'+`${name}=`+value
      })
    }else if (queryParams.includes(name)) {
      let existingParam = params.get(name)
      params.set(name, value)
      history.replace({
        search: params.toString()
      })
    }else{
      history.push({
        search: window.location.href.split('?')[1]+'&&'+`${name}=`+value
      })
    }
  }

  function handlePriceFilterSave(e:any) {

    changeURLParams('price_max', filter_price_max.toString())
    changeURLParams('price_min', filter_price_min.toString())

    setTimeout(() => dispatch(actions.search({location:location, page_num:page_num, duration:duration, start_charter:start_charter, end_charter:end_charter, filter_size_max:filter_size_max, filter_size_min:filter_size_min, filter_price_min:filter_price_min, filter_price_max:filter_price_max, filter_water_toys:filter_water_toys, filter_more_filter:filter_more_filter})), 100);
  }

  function handleSizeFilterSave(e:any) {

    changeURLParams('size_max', filter_size_max.toString())
    changeURLParams('size_min', filter_size_min.toString())

    setTimeout(() => dispatch(actions.search({location:location, page_num:page_num, duration:duration, start_charter:start_charter, end_charter:end_charter, filter_size_max:filter_size_max, filter_size_min:filter_size_min, filter_price_min:filter_price_min, filter_price_max:filter_price_max, filter_water_toys:filter_water_toys, filter_more_filter:filter_more_filter})), 100);
  }

  function handleWaterToyFilterSave(e:any) {
    setTimeout(() => dispatch(actions.search({location:location, page_num:page_num, duration:duration, start_charter:start_charter, end_charter:end_charter, filter_size_max:filter_size_max, filter_size_min:filter_size_min, filter_price_min:filter_price_min, filter_price_max:filter_price_max, filter_water_toys:filter_water_toys, filter_more_filter:filter_more_filter})), 100);
  }

  function handleMoreFilterSave(e:any) {
    setTimeout(() => dispatch(actions.search({location:location, page_num:page_num, duration:duration, start_charter:start_charter, end_charter:end_charter, filter_size_max:filter_size_max, filter_size_min:filter_size_min, filter_price_min:filter_price_min, filter_price_max:filter_price_max, filter_water_toys:filter_water_toys, filter_more_filter:filter_more_filter})), 100);
  }

  const handlePageChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setTimeout(() => dispatch(actions.setPage({page_num:value})), 100);

    setTimeout(() => dispatch(actions.search({location:location, page_num:value, duration:duration, start_charter:start_charter, end_charter:end_charter, filter_size_max:filter_size_max, filter_size_min:filter_size_min, filter_price_min:filter_price_min, filter_price_max:filter_price_max, filter_water_toys:filter_water_toys, filter_more_filter:filter_more_filter})), 100);

  };

  const handleFilterOnChange = (event:any, type:string, fieldName?:string) => {
    const { name, value } = event.target;

    if (!name) {
      return null
    }

    switch (true) {
      case type === "number":
        setTimeout(() => dispatch(actions.setListingFilter({name:name, value:parseInt(value)})), 0);
        break;
      case type === "text":
        setTimeout(() => dispatch(actions.setListingFilter({name:name, value:value})), 0);
        break;
      default:
        break;
    }
  };


  return (
  <>
    <Helmet>
      <title>Home</title>
      <meta name="description" content="The water platform for everyone" />
    </Helmet>
    <Nav/>
    <Container maxWidth={false}>
      <SearchFlex>
        <Search/>
      </SearchFlex>
      <ListingFilterHeader>
        <ListingFilterTitle>
          {listing_type === "overnights" ? 'Overnight Stays':'Day Trips'} in {location}
          <FilterButton
             aria-controls="basic-menu"
             aria-haspopup="true"
             aria-expanded={open ? 'true' : undefined}
             onClick={handleClick}
           >
             Size
           </FilterButton>
           <FilterButton
              aria-controls="basic-menu"
              aria-haspopup="true"
              aria-expanded={priceOpen ? 'true' : undefined}
              onClick={handlePriceClick}
            >
              Price
            </FilterButton>
            <FilterButton
               aria-controls="basic-menu"
               aria-haspopup="true"
               aria-expanded={toysOpen ? 'true' : undefined}
               onClick={handleToysClick}
             >
               Water Toys
             </FilterButton>
             <FilterButton
                aria-controls="basic-menu"
                aria-haspopup="true"
                aria-expanded={moreOpen ? 'true' : undefined}
                onClick={handleMoreClick}
              >
                More Filters
              </FilterButton>
           <Popper open={open} anchorEl={anchorEl} style={{zIndex:99}}>
             <Box sx={{ p: 3, bgcolor: 'background.paper', width:300, borderRadius:5,boxShadow: "0px 0px 20px rgba(179, 179, 179, 0.25)"}}>
               <h3>Size</h3>
               <Slider aria-label="Volume" value={value} onChange={handleChange} />
               <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                 <TextField name="filter_size_min" type="number" label="Min Size" onChange={(e) => handleFilterOnChange(e, 'number')}/>
                 <TextField name="filter_size_max" type="number" label="Max Size" onChange={(e) => handleFilterOnChange(e, 'number')}/>
               </Box>
               <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                 <Link>Clear</Link>
                 <SaveButton
                    onClick={handleSizeFilterSave}
                  >
                    Save
                  </SaveButton>
               </Box>
             </Box>
           </Popper>
           <Popper open={priceOpen} anchorEl={anchorPrice} style={{zIndex:99}}>
             <Box sx={{ p: 3, bgcolor: 'background.paper', width:300, borderRadius:5,boxShadow: "0px 0px 20px rgba(179, 179, 179, 0.25)"}}>
               <h3>Price</h3>
               <Slider aria-label="Volume" value={value} onChange={handleChange} />
               <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                 <TextField name="filter_price_min" type="number" label="Min Price" onChange={(e) => handleFilterOnChange(e, 'number')}/>
                 <TextField name="filter_price_max" type="number" label="Max Price" onChange={(e) => handleFilterOnChange(e, 'number')}/>
               </Box>
               <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                 <Link>Clear</Link>
                 <SaveButton
                    onClick={handlePriceFilterSave}
                  >
                    Save
                  </SaveButton>
               </Box>
             </Box>
           </Popper>
           <Popper open={toysOpen} anchorEl={anchorWaterToys} style={{zIndex:99}}>
             <Box sx={{ p: 3, bgcolor: 'background.paper', width:300, borderRadius:5,boxShadow: "0px 0px 20px rgba(179, 179, 179, 0.25)"}}>
               <h3>Size</h3>
               <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                 <Box>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_water_toys')}/>} label="Jet Ski" />
                      <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_water_toys')}/>} label="Water Slide" />
                      <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_water_toys')}/>} label="Jacuzzi" />
                      <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_water_toys')}/>} label="Paddle Boards" />
                      <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_water_toys')}/>} label="Kayaks" />
                    </FormGroup>
                 </Box>
                 <Box>
                   <FormGroup>
                     <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_water_toys')}/>} label="Snorkeling Gear" />
                     <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_water_toys')}/>} label="Seabob" />
                     <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_water_toys')}/>} label="Water Jetpack" />
                     <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_water_toys')}/>} label="Pool" />
                     <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_water_toys')}/>} label="Tender" />
                   </FormGroup>
                 </Box>
               </Box>
               <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                 <Link>Clear</Link>
                 <SaveButton
                    onClick={handleWaterToyFilterSave}
                  >
                    Save
                  </SaveButton>
               </Box>
             </Box>
           </Popper>
           <Popper open={moreOpen} anchorEl={anchorMore} style={{zIndex:99}}>
             <Box sx={{ p: 3, bgcolor: 'background.paper', width:300, borderRadius:5,boxShadow: "0px 0px 20px rgba(179, 179, 179, 0.25)"}}>
               <h3>Size</h3>
               <Slider aria-label="Volume" value={value} onChange={handleChange} />
               <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                 <Box>
                    <FormGroup>
                      <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_more_filter')}/>} label="Jet Ski" />
                      <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_more_filter')}/>} label="Water Slide" />
                      <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_more_filter')}/>} label="Jacuzzi" />
                      <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_more_filter')}/>} label="Paddle Boards" />
                      <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_more_filter')}/>} label="Kayaks" />
                    </FormGroup>
                 </Box>
                 <Box>
                   <FormGroup>
                     <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_more_filter')}/>} label="Snorkeling Gear" />
                     <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_more_filter')}/>} label="Seabob" />
                     <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_more_filter')}/>} label="Water Jetpack" />
                     <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_more_filter')}/>} label="Pool" />
                     <FormControlLabel control={<Checkbox onChange={(e) => handleFilterOnChange(e, 'checkbox','filter_more_filter')}/>} label="Tender" />
                   </FormGroup>
                 </Box>
               </Box>
               <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
                 <Link>Clear</Link>
                 <SaveButton
                    onClick={handleClick}
                  >
                    Save
                  </SaveButton>
               </Box>
             </Box>
           </Popper>
        </ListingFilterTitle>
      </ListingFilterHeader>
      {renderLisitings(results, mapData, userFavs)}
      <PaginationFlex>
        <Pagination shape="rounded" count={number_of_pages} page={page_num} onChange={handlePageChange} />
      </PaginationFlex>
    </Container>
    <Footer/>
  </>
  );
}

const ListingTitle = styled.a`
  font-family: "GilroyBold";
  font-size: 2em;
  margin: 0.67em 0;
  color:black;
  text-decoration: none;
  margin-top:1rem;
  margin-bottom:1rem;

`;


const PaginationFlex = styled.div`
  display:flex;
  width:100%;
  justify-content:center;
  margin-top: 10px;
  padding-bottom: 60px;
`;


const ListingWrapper = styled.div`
  display:flex;
  justify-content:space-between;
  min-height:700px;
`;

const ListingCardDetailsWrapper = styled.div`
  display:flex;
  justify-content:space-between;
`;

const ListingCardSubHeaderWrapper = styled.div`
  display:flex;
  justify-content:space-between;
`;

const ListingCardImageWrapper = styled.div`
  height:235px;
  img{
    border-radius: 20px;
    width:100%;
    height:100%;
  }
`;

const ListingCardContainer = styled.div`
  display:flex;
  margin-bottom:5px;
  margin-right:5px;
  transition:all ease-in-out 0.2s;
  padding:10px;
  &:hover{
    transform: scale(1.020);
    border-radius:20px;
    background:#f5f5f5;

  }
`;

const SearchFlex = styled.div`
  display:flex;
  justify-content:center;
  margin-top: 45px;
  margin-bottom:10px;
`;

const ListingFilterHeader = styled.div`
  display:flex;
  justify-content:flex-start;
`;

const ListingFilterTitle = styled.h1`
  font-family: GilroyBold;
  font-size: 42px;
  line-height: 49px;
`;
