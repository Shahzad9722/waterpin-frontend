import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Box, Button, IconButton, Grid, Rating, CircularProgress} from '@mui/material';
import { Nav } from '../../components/Nav';
import { Search } from '../../components/Search';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { FaSearch, FaCheckCircle } from 'react-icons/fa';
import { BsArrowLeftCircle, BsArrowRightCircle } from 'react-icons/bs';
import { Footer } from '../../components/Footer';

import { DefaultInput, DefaultInputLabel } from '../../components/input';
import { BasicModal } from '../../components/modals';
import { CardBase, CardBaseHeaderFlex, CardBaseBodyFlex, Divider} from '../../components/layout';
import { RankingProgress } from '../../components/PointsAndRewards';
import { EditIconComponent, AvatarIcon, RankDisplay, ReviewCard, ActionIcon} from '../../components/user-related';
import { DefaultButton } from '../../components/buttons';
import { Carousels } from '../../components/Carousels';


import moment from 'moment';


import { useProfileSlice } from './slice';
import {
  selectLoading,
  selectError,
  selectUser,
  selectSuccess,
} from './slice/selectors';

import {
  selectActiveViewMode,
} from '../../slice/selectors';
import { useHistory } from 'react-router-dom';

interface Props {}

export function ProfilePage(props: Props) {
  const history = useHistory();
  const { actions } = useProfileSlice();

  const dispatch = useDispatch();

  const profile = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const errors = useSelector(selectError);

  const view_mode = useSelector(selectActiveViewMode);


  const [user, set_user] = React.useState({
    firstName: '',
    lastName: '',
    city: '',
    profileImage: '',
    about_me: '',
    language:'',
    work:''
  });

  const [listings, set_listings] = React.useState<any>([]);
  const [trips, set_trips] = React.useState<any>([]);

  const [profileEditActive, set_profileEditActive] = React.useState(false);
  const [aboutEditActive, set_aboutEditActive] = React.useState(false);

  const [togglePublicView, set_togglePublicView] = React.useState(false);
  const [switchLoading, set_switchLoading] = React.useState(false);
  const [activeListIndex, set_activeListIndex] = React.useState(1);
  const [reviewsIndex, set_reviewsIndex] = React.useState(1);




  const [reviewAvg, set_reviewAvg] = React.useState(0.00);
  const [commRating, set_commRating] = React.useState(0.00);
  const [kindnessRating, set_kindnessRating] = React.useState(0.00);
  const [serviceRating, set_serviceRating] = React.useState(0.00);

  const [verifiedObj, set_verifiedObj] = React.useState<any>({email:false, phone:false});


  React.useEffect(() => {
    setTimeout(() => dispatch(actions.getProfile()), 0);
  }, []);

  React.useEffect(() => {
    if (profile !== null && profile !== undefined) {
      let allReviews = profile.reviews_recieved
      let comRtg = 0.00
      let kindRtg = 0.00
      let serviceRtg = 0.00
      let reviewTotalAvg = 5.00

      if (allReviews.length !== 0) {
        allReviews.forEach(review => {
          comRtg = comRtg + review.rating_communication
          kindRtg = kindRtg + review.rating_kindness
          serviceRtg = serviceRtg + review.rating_service
        })

        comRtg =  comRtg / allReviews?.length
        kindRtg = kindRtg / allReviews?.length
        serviceRtg = serviceRtg / allReviews?.length

        reviewTotalAvg = (comRtg + kindRtg + serviceRtg) / 3
      }

      set_commRating(comRtg)
      set_kindnessRating(kindRtg)
      set_serviceRating(serviceRtg)

      set_reviewAvg(reviewTotalAvg)
      if (profile.verified) {
        let verif = JSON.parse(profile.verified)
        set_verifiedObj(verif)
      }

      set_user(profile)


      const bookingList = profile.bookings.map((booking:any) => {
        let imageParse = []
        let firstListingImg = {location:'/icons/basic.png'}
        if (booking.listing.images !== null && booking.listing.images !== undefined) {
          imageParse = booking.listing.images
          if (imageParse !== null && imageParse.length > 0) {
            firstListingImg = imageParse[0]
          }
        }

        return(
        <Box display={'flex'} flexDirection={'column'} width={'230px'} height={'300px'} sx={{border: "1px solid #E0E0E0",borderRadius: "15px"}}>
            <Box display={'flex'}  flexDirection={'column'} >
              <img style={{borderRadius: "15px 15px 0px 0px"}} src={firstListingImg.location || ''}/>
            </Box>
            <Box display={'flex'} flexDirection={'column'} flexGrow={1} pl={1} pr={1} alignItems={'flex-start'} justifyContent={'center'} p={1}>
              <p style={{marginTop:0}}>{booking.listing.city || ''} {booking.listing.province || ''}</p>
              <p style={{marginTop:0}}>{booking.listing.listing_name || ''}</p>
              <a href={`/listings/detail/${booking.listing.listing_id}`}><b>View</b></a>
            </Box>
        </Box>)
      }).sort().reverse()

      const listRenderList = profile.listings.map((listing:any) => {
        let imageParse = []
        let firstListingImg = {location:'/icons/basic.png'}
        if (listing.images !== null && listing.images !== undefined) {
          imageParse = listing.images
          if (imageParse !== null && imageParse.length > 0) {
            firstListingImg = imageParse[0]
          }
        }

        return(
        <Box display={'flex'} flexDirection={'column'} width={'230px'} height={'300px'} sx={{border: "1px solid #E0E0E0",borderRadius: "15px"}}>
            <Box display={'flex'}  flexDirection={'column'} >
              <img style={{borderRadius: "15px 15px 0px 0px"}} src={firstListingImg.location || ''}/>
            </Box>
            <Box display={'flex'} flexDirection={'column'} flexGrow={1} pl={1} pr={1} alignItems={'flex-start'} justifyContent={'center'} p={1}>
              <p style={{marginTop:0}}>{listing.city || ''} {listing.province || ''}</p>
              <p style={{marginTop:0}}>{listing.listing_name || ''}</p>
              <a href={`/listings/detail/${listing.listing_id}`}><b>View</b></a>
            </Box>
        </Box>)
      }).sort().reverse()

      set_listings(listRenderList)
      set_trips(bookingList)
      
    }

  },[profile])

  const toggleProfileEditModal = () => {
    set_profileEditActive(!profileEditActive)
  };


  const togglePageView = () => {

    set_switchLoading(true)

    set_togglePublicView(!togglePublicView)

    setTimeout(() => set_switchLoading(false), 800);


  };

  function paginate(collection:any[], page:any = 1, numItems:any = 10){
    if( !Array.isArray(collection) ) {
      throw `Expect array and got ${typeof collection}`;
    }
    const currentPage = parseInt(page);
    const perPage = parseInt(numItems);
    const offset = (page - 1) * perPage;
    const paginatedItems = collection.slice(offset, offset + perPage);

    return {
      currentPage,
      perPage,
      total: collection.length,
      totalPages: Math.ceil(collection.length / perPage),
      data: paginatedItems
    };
}

const handlePagePrev = () => {
  if (activeListIndex === 1) {
    return null;
  }
  let newIndex = activeListIndex - 1
  set_activeListIndex(newIndex)
};

const handlePageNext = () => {

  let newIndex = activeListIndex + 1
  set_activeListIndex(newIndex)
};

const handleInputChange = event => {
  const { name, value } = event.target;
  set_user({ ...user, [name]: value });
};



  return (
    <>
      <Helmet>
        <title>Profile Page</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Nav/>
      <BasicModal open={profileEditActive} onClose={toggleProfileEditModal} title="Edit Profile">
        <Grid container>
          <Grid item xs={7}>
            <Grid container>
              <Grid item xs={6}>
                <DefaultInputLabel>First Name</DefaultInputLabel>
                <DefaultInput name="firstName" onChange={handleInputChange} value={user.firstName} placeholder="First Name" label="First Name"/>
              </Grid>
              <Grid item xs={6}>
                <DefaultInputLabel>Last Name</DefaultInputLabel>
                <DefaultInput name="lastName" onChange={handleInputChange} value={user.lastName} placeholder="Last Name" label="Last Name"/>
              </Grid>
            </Grid>
            <DefaultInputLabel>Location</DefaultInputLabel>
            <DefaultInput name="city" onChange={handleInputChange} value={user.city} placeholder="City" label="City"/>

            <DefaultInputLabel>About</DefaultInputLabel>
            <DefaultInput name="about_me" onChange={handleInputChange} value={user.about_me} placeholder="About Me" label="About Me" multiline={true} rows={3}/>

            <DefaultInputLabel>Work</DefaultInputLabel>
            <DefaultInput name="work" onChange={handleInputChange} value={user.work} placeholder="Add your workplace." label="Work"/>

          </Grid>
          <Grid item xs={5}>
            <Box pr={2} pl={2}>
              <DefaultInputLabel>Profile Picture</DefaultInputLabel>
              <ProfilePictureImage bg={user.profileImage}/>
            </Box>
            <DefaultButton type="outline" onClick={()=>togglePageView()} text={'Upload'}/>
          </Grid>
        </Grid>
      </BasicModal>
      <Container>
        <Grid container spacing={2} mt={5}>
          <Grid item xs={12} sm={3}>
            <CardBase>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'flex-end'} alignItems={'center'} width={'100%'} minHeight={'55px'} pr={3} pt={1}>
                  {togglePublicView
                    ? null
                    : (
                      <EditIconComponent onClick={()=>toggleProfileEditModal()}/>
                    )
                  }
                </Box>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'} width={'100%'} pt={2} pb={4}>
                    <AvatarIcon
                      w={'8rem'}
                      h={'8rem'}
                      src={
                        (profile && profile.profileImage) || process.env.PUBLIC_URL + '/logo-notitle-white.svg'
                      }
                    />
                    <h4 style={{margin:"1rem 0rem"}}>{profile && profile.firstName} {profile && profile.lastName}</h4>
                    <RankDisplay rank={profile && profile.rank} points={profile && profile.points}/>
                </Box>
                <Divider/>
                <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'center'} width={'100%'} pr={2} pl={2}>
                  <Box display={'flex'} alignItems={'center'}>
                    <img src={process.env.PUBLIC_URL + '/icons/listing/gold-star.svg'}/>
                    <p style={{marginLeft:10}}><b>{reviewAvg.toFixed(2)}</b> ({profile && profile.reviews_recieved?.length})</p>
                  </Box>
                  <Box>
                    <p>Member Since {profile && moment(profile.createdAt).year()}</p>
                  </Box>
                </Box>
                <Divider/>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'} width={'100%'} pt={3} pb={3} pr={2} pl={4}>
                  <Grid container spacing={1}>
                    <Grid item xs={6} sm={2}>
                      {profile && profile.governmentID === null
                        ? <FaCheckCircle size="1.5rem" color={"#6D6D6D"}/>
                        : <FaCheckCircle size="1.5rem" color={"#27AE60"}/>
                      }
                    </Grid>
                    <Grid item xs={6} sm={10}>
                      <span>Identity</span>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      {verifiedObj.phone === false
                        ? <FaCheckCircle size="1.5rem" color={"#6D6D6D"}/>
                        : <FaCheckCircle size="1.5rem" color={"#27AE60"}/>
                      }
                    </Grid>
                    <Grid item xs={6} sm={10}>
                      <span>Phone Number</span>
                    </Grid>
                    <Grid item xs={6} sm={2}>
                      {verifiedObj.email === false
                        ? <FaCheckCircle size="1.5rem" color={"#6D6D6D"}/>
                        : <FaCheckCircle size="1.5rem" color={"#27AE60"}/>
                      }
                    </Grid>
                    <Grid item xs={6} sm={10}>
                      <span>Email Address</span>
                    </Grid>
                  </Grid>
                </Box>
                <Divider/>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'} width={'100%'} pt={1} pb={1} pr={2} pl={2}>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <p>Location</p>
                      <p><b>{profile && profile.location || 'No location given.'}</b></p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <p>Language</p>
                      <p><b>{profile && profile.language || 'English'}</b></p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <p>Response rate</p>
                      <p><b>{(parseInt(profile && profile.response_rate) * 100) || '0'}%</b></p>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <p>Response time</p>
                      <p><b>{profile && profile.response_time}</b></p>
                    </Grid>
                  </Grid>
                </Box>
                <Divider/>
                <Box display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'flex-start'} width={'100%'} pt={1} pb={1} pr={2} pl={2}>
                  <p><a>Learn More</a> about how verifying your account helps keep the BeeyondBoats community secure.</p>
                </Box>
            </CardBase>
            <Box mt={3}>
              {togglePublicView
              ? <DefaultButton type="outline" onClick={()=>togglePageView()} text={'View Private Profile'}/>
              : <DefaultButton type="outline" onClick={()=>togglePageView()} text={'View Public Profile'}/>
              }
            </Box>
          </Grid>
          <Grid item xs={12} sm={9}>
            {switchLoading === true
              ? (
                <Box height={'100%'} width={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'center'} alignItems={'center'}>
                  <CircularProgress
                    size={100}
                    sx={{
                       color: "#000",
                     }}
                    />
                </Box>
              )
              : (
                <>
                  <Box>
                    <CardBase>
                      <CardBaseBodyFlex>
                        <RankingProgress rank="new"/>
                      </CardBaseBodyFlex>
                    </CardBase>
                  </Box>
                  <Box mt={3}>
                    <CardBase>
                      <CardBaseHeaderFlex>
                        <h3>About Me</h3>
                        {togglePublicView
                          ? null
                          : (
                            <EditIconComponent onClick={()=>toggleProfileEditModal()}/>
                          )
                        }

                      </CardBaseHeaderFlex>
                      <Divider/>
                      <CardBaseBodyFlex>
                        <p>{profile && profile.about_me !==null
                            ? profile.about_me
                            : "No bio added yet..."
                            }</p>
                      </CardBaseBodyFlex>
                    </CardBase>
                  </Box>

                  {view_mode === "owner"
                    ? (<>
                        <Box mt={3}>
                          <CardBase>
                            <CardBaseHeaderFlex>
                              <h3>My Boats / Yachts</h3>
                              {togglePublicView
                                ? null
                                : (
                                  <ActionIcon onClick={()=>history.push('/create-listing/')}>
                                    <img src={process.env.PUBLIC_URL+'/icons/uploadnew.svg'}/>
                                  </ActionIcon>
                                )
                              }
                            </CardBaseHeaderFlex>
                            <Divider/>
                            <CardBaseBodyFlex>

                              {listings.length > 0
                                ? (
                                  <Box display={'flex'} flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} justifyContent={'space-around'} flexGrow={1} width={'100%'} height={'auto'}>
                                    <Box onClick={()=>handlePagePrev()} style={{cursor:"pointer"}}>
                                      <BsArrowLeftCircle size={'2rem'}/>
                                    </Box>
                                    {paginate(listings,activeListIndex, 3).data}
                                    <Box onClick={()=>handlePageNext()} style={{cursor:"pointer"}}>
                                      <BsArrowRightCircle size={'2rem'}/>
                                    </Box>
                                  </Box>
                                )
                                : (<>
                                  {togglePublicView
                                    ? <p>No listings created yet for this owner.</p>
                                    : <p>You haven't created any listings yet. <a href="/create-listing/" style={{color:"blue"}}>Create a new listing.</a></p>
                                  }
                                  </>
                                )
                              }


                            </CardBaseBodyFlex>
                          </CardBase>
                        </Box>
                        <Box mt={3}>
                          <CardBase>
                            <CardBaseHeaderFlex>
                              <h3>My Reviews</h3>
                              <a>View All</a>
                            </CardBaseHeaderFlex>
                            <Divider/>
                            <CardBaseBodyFlex>

                              {profile && profile.reviews_recieved.length > 0
                                ? (
                                  <>
                                    {profile.reviews_recieved.map((review:any) => (
                                          <ReviewCard first_name={review && review.renter.firstName} last_name={review.renter.lastName} avatar={review.renter.profileImage} rank={review.renter.rank} review={review.review_comment} date={moment(review.created_at).fromNow()}/>
                                      )).splice(0,5)}
                                  </>
                                )
                                : <p>No reviews left yet...</p>
                              }
                            </CardBaseBodyFlex>
                          </CardBase>
                        </Box>
                      </>
                    )
                    : (<>
                        {togglePublicView
                          ? null
                          : (
                            <Box mt={3}>
                              <CardBase>
                                <CardBaseHeaderFlex>
                                  <h3>My Trips</h3>

                                </CardBaseHeaderFlex>
                                <Divider/>
                                <CardBaseBodyFlex>
                                  {trips.length > 0
                                    ? (
                                      <Box display={'flex'} flexDirection={'row'} alignItems={'center'} flexWrap={'wrap'} justifyContent={'space-around'} flexGrow={1} width={'100%'} height={'auto'}>
                                        <Box onClick={()=>handlePagePrev()} style={{cursor:"pointer"}}>
                                          <BsArrowLeftCircle size={'2rem'}/>
                                        </Box>
                                        {paginate(trips,activeListIndex, 3).data}
                                        <Box onClick={()=>handlePageNext()} style={{cursor:"pointer"}}>
                                          <BsArrowRightCircle size={'2rem'}/>
                                        </Box>
                                      </Box>
                                    )
                                    : (
                                      <p>You haven't booked any trips yet. Explore new waters by <a href="/listings/overnights" style={{color:"blue"}}>booking a trip.</a></p>
                                    )
                                  }
                                </CardBaseBodyFlex>
                              </CardBase>
                            </Box>
                          )
                        }
                        <Box mt={3}>
                          <CardBase>
                            <CardBaseHeaderFlex>
                              <h3>My Reviews</h3>

                              {togglePublicView
                                ? (
                                  <div>
                                    <a style={{paddingRight:20, fontWeight: reviewsIndex === 1 ? "900": "300"}} onClick={()=>set_reviewsIndex(1)}>All Reviews</a>
                                    <a style={{paddingRight:20, fontWeight: reviewsIndex === 2 ? "900": "300"}} onClick={()=>set_reviewsIndex(2)}>From Owners</a>
                                    <a style={{fontWeight: reviewsIndex === 3 ? "900": "300"}} onClick={()=>set_reviewsIndex(3)}>From Renter</a>
                                  </div>
                                )
                                : (
                                  <>
                                    <a>View All</a>
                                  </>
                                )
                              }
                            </CardBaseHeaderFlex>
                            <Divider/>
                            <CardBaseBodyFlex>
                              {reviewsIndex === 1
                                ? (
                                  <>
                                    {profile && profile.reviews_recieved.length > 0
                                      ? (
                                        <>
                                          {profile.reviews_recieved.map((review:any) => (
                                                <ReviewCard first_name={review && review.renter.firstName} last_name={review.renter.lastName} avatar={review.renter.profileImage} rank={review.renter.rank} review={review.review_comment} date={moment(review.created_at).fromNow()}/>
                                            )).splice(0,5)}
                                        </>
                                      )
                                      : <p>No reviews left yet...</p>
                                    }
                                  </>
                                )
                                : reviewsIndex === 2
                                ? (
                                  <>
                                    {profile && profile.reviews_recieved.length > 0
                                      ? (
                                        <>
                                          {profile.reviews_recieved.map((review:any) => (
                                                <ReviewCard first_name={review && review.renter.firstName} last_name={review.renter.lastName} avatar={review.renter.profileImage} rank={review.renter.rank} review={review.review_comment} date={moment(review.created_at).fromNow()}/>
                                            )).splice(0,5)}
                                        </>
                                      )
                                      : <p>No reviews left yet...</p>
                                    }
                                  </>
                                )
                                :reviewsIndex === 3
                                ? (
                                  <>
                                    {profile && profile.reviews_recieved.length > 0
                                      ? (
                                        <>
                                          {profile.reviews_recieved.map((review:any) => (
                                                <ReviewCard first_name={review && review.renter.firstName} last_name={review.renter.lastName} avatar={review.renter.profileImage} rank={review.renter.rank} review={review.review_comment} date={moment(review.created_at).fromNow()}/>
                                            )).splice(0,5)}
                                        </>
                                      )
                                      : <p>No reviews left yet...</p>
                                    }
                                  </>
                                )
                                :null
                              }
                            </CardBaseBodyFlex>
                          </CardBase>
                        </Box>

                      </>
                    )
                  }

                </>
              )
            }

          </Grid>
        </Grid>
      </Container>
      <Footer/>
    </>
  );
}

const ProfilePictureImage = styled.div<{bg:string}>`
  display:flex;
  justify-content: flex-start;
  align-items:center;
  flex-direction:column;
  margin-bottom:5px;
  width: 100%;
  height: 420px;
  background: #FAFAFA;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center center;

  ${({ bg }) => bg && `
    background-image: url(${bg});
   `}

`;
