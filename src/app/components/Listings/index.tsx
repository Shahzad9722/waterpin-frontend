/**
 *
 * ListView
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Carousels } from '../../components/Carousels';
import { Container, Stack, Divider, Box, Grid, Button, IconButton, Skeleton, Menu, MenuItem, Slider, Popper, TextField, Link, FormControlLabel, Checkbox, FormGroup, Pagination, CircularProgress } from '@mui/material';
import { FaRegHeart, FaHeart } from 'react-icons/fa';
import { useListingSlice } from '../../pages/Listings/slice';
import { useSelector, useDispatch } from 'react-redux';

interface Props {}


export function Listings(props: Props) {
  return <Div></Div>;
}

const Div = styled.div``;

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export const ListingCard: React.FC<{listing:any, user_favorites:any[]}> = ({listing, user_favorites}) => {
  const { actions } = useListingSlice();
  const dispatch = useDispatch();

  // const loading = useSelector(selectLoading)
  // const errors = useSelector(selectError)
  // const success = useSelector(selectSuccess)
  // const payload = useSelector(selectPayload)

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
    <div className="listing-card-container">
      <Grid container>
        <Grid xs={12} sm={4}>
          {
            listing.images && listing_images.length > 0? (
                <Carousels>
                  {listing_images.map(element => (
                    <div className="listing-card-image-wrapper">
                      <img src={element.location}/>
                    </div>
                  ))}
                </Carousels>
            ) : (
              <Skeleton variant="rectangular" width={335} height={205} style={{borderRadius:20}} />
            )
          }
        </Grid>
        <Grid xs={12} sm={8}>
            <Box flexGrow={1} pl={5} pr={5}>
              <div className="listing-card-details-wrapper">
              <Box>
              {listing.city}, {listing.country}
              </Box>
              <Box onClick={favoriteListing}>

                {toggleHeart
                  ? (<FaHeart color="#27ccd3"/>)
                  : (<FaRegHeart/>)
                }
              </Box>
              </div>
              <a className="listing-tile" href={`/listings/detail/`+listing.listing_id}>{listing.listing_name}</a>
              <div className="horizontal-line"/>
              <div className="listing-card-details-wrapper">
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
              </div>
              <div className="horizontal-line"/>

            </Box>
        </Grid>
      </Grid>

    </div>
  );
}


export const SaveButton = styled(Button)`
  && {
    width: 80px;
    height: 40px;
    color: #000;
    background: #FFFFFF;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 8px;
  }
`;


export const FilterButton = styled(Button)`
  && {
    color: #000;
    background: #FFFFFF;
    border: 1px solid #BDBDBD;
    box-sizing: border-box;
    border-radius: 20px;
    margin-right:10px;
  }
`;
