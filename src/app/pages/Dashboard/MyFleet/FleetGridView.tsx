import React from 'react';
import './fleet.scss';
import styled from 'styled-components/macro';
import { Carousels } from '../../../components/Carousels';
import { Grid, Button, Skeleton, Box} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { handleListingEditRedirect } from '../../../components/utils';



interface Props{
  listings:any;
}

function isEmpty(obj) {
    return Object.keys(obj).length === 0;
}

export const FleetGridView = (props:Props) => {
  const history = useHistory();

  return (
    <Grid container spacing={3}>
      {props.listings.length > 0
        ? (
          <>
            {props.listings.map(listing => {

              let listing_images:any = [];

              if(listing !== undefined && listing !== null){
                if (listing.images) {
                  if (isEmpty(listing.images) === false) {
                    const images:any = [...listing.images];
                    listing_images = images
                  }
                }
              }

              return(
              <Grid item xs={12} className='fleet-card'>
                <Grid xs={4}>
                  {
                    listing_images && listing_images.length > 0? (
                        <Carousels>
                          {listing_images.map((element:any) => (
                            <ListingCardImageWrapper>
                              <img src={element.location || process.env.PUBLIC_URL + `/blank-fleet-img.svg`}/>
                            </ListingCardImageWrapper>
                          ))}
                        </Carousels>
                    ) : (
                      <ListingCardImageWrapper>
                        <img src={process.env.PUBLIC_URL + `/blank-fleet-img.svg`}/>
                      </ListingCardImageWrapper>
                    )
                  }
                </Grid>
                <Grid xs={8} className='fleet-card-details'>
                  <Grid xs={12}>
                    <div className='fleet-detail-section'>
                      <div className='location-mark'>
                        <span>{listing.street_address}, {listing.city}, {listing.country}</span>
                      </div>
                      <div className='fleet-card-title'>
                        <span>{listing.list_details_name}</span>
                      </div>
                    </div>
                  </Grid>
                  <Grid xs={12} className='flex-details'>
                    <Grid xs={6} className='flex-details'>
                      <Grid xs={6}>
                        <div className='fleet-detail-labels'>
                          <span>Status:</span>
                        </div>
                        <div className='fleet-detail-labels'>
                          <span>Insurance Status:</span>
                        </div>
                        <div className='fleet-detail-labels'>
                          <span>Location:</span>
                        </div>
                        <div className='fleet-detail-labels'>
                          <span>Completed Booking:</span>
                        </div>
                      </Grid>
                      <Grid xs={7}>
                        <div className='fleet-detail-value'>
                          <span>{listing.status.listing_status}</span>
                        </div>
                        <div className='fleet-detail-value'>
                          {listing.insurance && listing.insurance.own_insurance === true
                            ? <span>{`Use Own Insurance`}</span>
                            : listing.insurance && listing.insurance.waterpins_insurance === true
                            ? <span>{`Waterpin's Insurance`}</span>
                            : <span>----</span>
                          }
                        </div>
                        <div className='fleet-detail-value'>
                          <span>{listing.city}, {listing.country}</span>
                        </div>
                        <div className='fleet-detail-value'>
                          <span>{listing && listing.bookings ? listing.bookings.length: `----`}</span>
                        </div>
                      </Grid>
                    </Grid>
                    <Grid xs={1}></Grid>
                    <Grid xs={5} className='flex-details'>
                      <Grid xs={7}>
                        <div className='fleet-detail-labels'>
                          <span>Type:</span>
                        </div>
                        <div className='fleet-detail-labels'>
                          <span>Cancellation Policy:</span>
                        </div>
                        <div className='fleet-detail-labels'>
                          <span>Reviews:</span>
                        </div>
                        <div className='fleet-detail-labels'>
                          <span>Capacity:</span>
                        </div>
                      </Grid>
                      <Grid xs={5}>
                        <div className='fleet-detail-value'>
                          <span>{listing.listing_type_id === 1 ? 'Boat' : listing.listing_type_id === 2 ? "Yacht": listing.listing_type_id === 3 ? "Water Activity" : "----" }</span>
                        </div>
                        <div className='fleet-detail-value'>
                          {listing.cancelation_policy && listing.cancelation_policy.flexible === 1
                            ? <span>{`Flexible`}</span>
                            : listing.cancelation_policy && listing.cancelation_policy.moderate === 1
                            ? <span>{`Moderate`}</span>
                            : listing.cancelation_policy && listing.cancelation_policy.strict === 1
                            ? <span>{`Strict`}</span>
                            : listing.cancelation_policy && listing.cancelation_policy.use_your_own !== ""
                            ? <span>{listing.cancelation_policy.use_your_own}</span>
                            : <span>----</span>
                          }

                        </div>
                        <div className='fleet-detail-value'>
                          {listing && listing.reviews ? listing.reviews.length: `----`}
                        </div>
                        <div className='fleet-detail-value'>
                          {listing.day_trips === 1 && listing.overnight_stays === 0
                            ? <span>{listing.day_trip_related && listing.day_trip_related.guest_capacity}</span>
                            : listing.overnight_stays === 1 && listing.day_trips === 0
                            ? <span>{listing.overnights_related &&  listing.overnights_related.guest_capacity}</span>
                            :<span>{listing.day_trip_related && listing.day_trip_related.guest_capacity} / {listing.overnights_related && listing.overnights_related.guest_capacity} </span>
                          }
                        </div>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid
                  xs={2}
                  container
                  flexDirection='row'
                  justifyContent='flex-end'
                  alignItems='flex-start'
                >
                  <Button className='fleet-card-editBtn' variant='outlined' onClick={()=>handleListingEditRedirect(listing, history)}>
                    Edit
                  </Button>
                </Grid>
              </Grid>)
            })}
          </>
        )
        : (
          <Box width={"100%"} textAlign={'left'} p={"1rem 2rem"}>
          <h3>No listings were found...</h3>
          </Box>
        )
      }


    </Grid>
  );
};

const ListingCardImageWrapper = styled.div`
  height:235px;
  img{
    border-radius: 20px;
    width:100%;
    height:100%;
  }
`;

export default FleetGridView;
