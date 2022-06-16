import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Container, Stack, Divider, Box, Button, IconButton, Grid, Skeleton, Checkbox, Rating, CircularProgress, LinearProgress, InputBase, Popper, TextField, Link} from '@mui/material';
import { Nav } from '../../components/Nav';
import { Search } from '../../components/Search';
import { BasicModal } from '../../components/modals';
import { AvatarCardWithReviews, ReviewCard } from '../../components/user-related';
import { DefaultButton } from '../../components/buttons';
import { DefaultSelectBase } from '../../components/input';

import { Carousels } from '../../components/Carousels';

import { useHistory, useParams, RouteComponentProps, withRouter} from 'react-router-dom';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { useListingSlice } from './slice';
import {
  selectLoading,
  selectError,
  selectActiveListingDetail,
  selectActiveListingPricing
} from './slice/selectors';
import moment from 'moment';

interface Props extends RouteComponentProps{
  id: string; // parameters will always be a string (even if they are numerical)
}
export function ListingDetail() {

  const { actions } = useListingSlice();
  const dispatch = useDispatch();
  const history = useHistory();

  const { id } : any = useParams();

  const loading = useSelector(selectLoading)
  const errors = useSelector(selectError)
  const activeListingDetail = useSelector(selectActiveListingDetail)
  const activeListingPricing = useSelector(selectActiveListingPricing)



  const [detailActive, set_detailActive] = React.useState(false);

  const [guestArray, setGuestArray] = React.useState([]);
  const [totalDurationEstimate, setTotalDurationEstimate] = React.useState(0);
  const [totalTaxesAndfee, setTotalTaxesAndfee] = React.useState(0);
  const [totalTaxesAndfeeOAO, setTotalTaxesAndfeeOAO] = React.useState(0);
  const [totalBookingEstimate, setTotalBookingEstimate] = React.useState(0);
  const [popupModal, setPopupModal] = React.useState(false);
  const [guests, setGuests] = React.useState(false);
  const [times, setTimes] = React.useState(false);
  const [taxesFees, setTaxesFees] = React.useState(0);
  const [addOns, setAddOns] = React.useState(false);
  const [select, setSelect] = React.useState(true);
  //const { RangePicker } = DatePicker;
  const dateFormat = "YY/MM/DD";
  const [duration, setDuration] = React.useState({
    weeks: "",
    days: "",
    hours: "",
    minutes: "",
  });

  const [time_slots, set_time_slots] = React.useState([
    {id:0, slot:'8:00AM'},
    {id:0, slot:'9:00AM'},
    {id:0, slot:'10:00AM'},
    {id:0, slot:'11:00AM'},
    {id:0, slot:'12:00PM'},
    {id:0, slot:'1:00PM'},
    {id:0, slot:'2:00PM'},
    {id:0, slot:'3:00PM'},
    {id:0, slot:'4:00PM'},
    {id:0, slot:'5:00PM'},
    {id:0, slot:'6:00PM'},
    {id:0, slot:'7:00PM'},
    {id:0, slot:'8:00PM'},
    {id:0, slot:'9:00PM'},
    {id:0, slot:'10:00PM'}
  ]);

  const [child, setChild] = React.useState(0);
  const [adults, setAdults] = React.useState(1);
  const [type, setType] = React.useState("select option");
  const [startTime, setStartTime] = React.useState("");
  const [endTime, setEndTime] = React.useState("");
  const [time, setTime] = React.useState("01:30");
  const [date, setDate] = React.useState([]);
  const [startDate, setStartDate] = React.useState("");
  const [endDate, setEndDate] = React.useState("");
  const [toggleHeart, setToggleHeart] = React.useState(null);
  const [active_tab_index, set_active_tab_index] = React.useState(0);
  const [active_policy_index, set_active_policy_index] = React.useState(0);

  const [reviewAvg, set_reviewAvg] = React.useState(0.00);
  const [commRating, set_commRating] = React.useState(0.00);
  const [kindnessRating, set_kindnessRating] = React.useState(0.00);
  const [serviceRating, set_serviceRating] = React.useState(0.00);


  const [anchorDuration, setAnchorDuration] = React.useState(null);
  const [anchorGuests, setAnchorGuests] = React.useState(null);
  const [anchorDates, setAnchorDates] = React.useState(null);
  const [anchorTimes, setAnchorTimes] = React.useState(null);
  const [pricingData, setPricingData] = React.useState<any>(null);


  const durationOpen = Boolean(anchorDuration);
  const guestsOpen = Boolean(anchorGuests);
  const datesOpen = Boolean(anchorDates);
  const timesOpen = Boolean(anchorTimes);

  const toggleDetailActiveModal = () => {
    set_detailActive(!detailActive)
  };


  const handleDurationClick = (event:any) => {
    if (durationOpen) {
      setAnchorDuration(null);

      setTimeout(() => dispatch(actions.getListingPricing({id:id, start_date:'', end_date:'', start_time:startTime, end_time:endTime, guest_capacity: parseInt(calculateGuests(adults, child)) ,duration:duration})), 0);

    }else{
      setAnchorDuration(event.currentTarget);
      setAnchorGuests(null);
      setAnchorDates(null);
      setAnchorTimes(null);

    }
  };

  const handleGuestsClick = (event:any) => {
    if (guestsOpen) {
      setAnchorGuests(null);

      setTimeout(() => dispatch(actions.getListingPricing({id:id, start_date:'', end_date:'', start_time:startTime, end_time:endTime, guest_capacity: parseInt(calculateGuests(adults, child)) ,duration:duration})), 0);

    }else{
      setAnchorGuests(event.currentTarget);
      setAnchorDates(null);
      setAnchorTimes(null);
      setAnchorDuration(null);
    }
  };

  const handleTimesClick = (event:any) => {
    if (timesOpen) {
      setAnchorTimes(null);
    }else{
      setAnchorTimes(event.currentTarget);
      setAnchorDates(null);
      setAnchorGuests(null);
      setAnchorDuration(null);
    }
  };

  const handleDatesClick = (event:any) => {
    if (datesOpen) {
      setAnchorDates(null);

    }else{
      setAnchorDates(event.currentTarget);
      setAnchorGuests(null);
      setAnchorDuration(null);
      setAnchorTimes(null);
    }
  };

  const calculateGuests = (adultsCount:number, kidCount:number) => {
    let sum = adultsCount + kidCount
    return `${sum}`
  };

  React.useEffect(() => {
    setTimeout(() => dispatch(actions.loadListingDetail({id:id})), 0);
  },[])

  React.useEffect(() => {
    if (activeListingDetail !== null && activeListingDetail !== undefined) {
      let allReviews = activeListingDetail.reviews
      let comRtg = 0.00
      let kindRtg = 0.00
      let serviceRtg = 0.00
      let reviewTotalAvg = 0.00

      allReviews.forEach(review => {
        comRtg = comRtg + review.rating_communication
        kindRtg = kindRtg + review.rating_kindness
        serviceRtg = serviceRtg + review.rating_service
      })

      comRtg =  comRtg / allReviews?.length
      kindRtg = kindRtg / allReviews?.length
      serviceRtg = serviceRtg / allReviews?.length

      reviewTotalAvg = (comRtg + kindRtg + serviceRtg) / 3
      set_commRating(comRtg)
      set_kindnessRating(kindRtg)
      set_serviceRating(serviceRtg)

      set_reviewAvg(reviewTotalAvg)
    }

  },[activeListingDetail])


  React.useEffect(() => {
    if (activeListingPricing !== null && activeListingPricing !== undefined) {
      setPricingData(activeListingPricing)
    }

  },[activeListingPricing])




  function renderRules(rules:any) {

    let parsedRules:any = null;

    if (rules === undefined || rules === null) {
      return null
    }

    parsedRules = JSON.parse(rules)

    return(<Grid container spacing={2}>
      {parsedRules && parsedRules.map((element:any) => (
        <Grid item xs={12} sm={6} md={3}>
          <RulesSpan><p>{element.name}</p></RulesSpan>
        </Grid>
      ))}
      </Grid>
    )

  }


  function renderDetailView(active_index:number) {
    switch (true) {
      case active_index === 0:
        return(
          <>
          <Box mb={5}>
            <ListDetailItem top={true}>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing/brand.svg'}/>
                <p>Brand</p>
              </Box>
              <Box display={'flex'} alignItems={'center'}>
              <h3>{activeListingDetail && activeListingDetail.model}</h3>
              </Box>
            </ListDetailItem>
            <ListDetailItem>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing?.length.svg'}/>
                <p>Length</p>
              </Box>
              <Box display={'flex'} alignItems={'center'}>
              <h3>{activeListingDetail && activeListingDetail?.length} ft</h3>
              </Box>
            </ListDetailItem>
            <ListDetailItem>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing/guests.svg'}/>
                <p>Guests</p>
              </Box>
              <Box display={'flex'} alignItems={'center'}>
              {/*
              <h3>{activeListingDetail !== null && activeListingDetail.overnights_related !== null && activeListingDetail.day_trip_related !== null  && activeListingDetail.overnight_stays === 1 ? activeListingDetail.overnights_related.guest_capacity : activeListingDetail.day_trip_related !== null  ? activeListingDetail.day_trip_related.guest_capacity : null}</h3>
              */}
              </Box>
            </ListDetailItem>
            <ListDetailItem>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing/bed.svg'}/>
                <p>Cabins</p>
              </Box>
              <Box display={'flex'} alignItems={'center'}>
              <h3>{activeListingDetail && activeListingDetail.amenities_interior.bedrooms}</h3>
              </Box>
            </ListDetailItem>
            <ListDetailItem>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing/shower.svg'}/>
                <p>Bathrooms</p>
              </Box>
              <Box display={'flex'} alignItems={'center'}>
              <h3>{activeListingDetail && activeListingDetail.amenities_interior.bathrooms}</h3>
              </Box>
            </ListDetailItem>
            <ListDetailItem bottom={true}>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing/location.svg'}/>
                <p>Location</p>
              </Box>
              <Box display={'flex'} alignItems={'center'}>
              <h3>{activeListingDetail && activeListingDetail.city}, {activeListingDetail && activeListingDetail.country}</h3>
              </Box>
            </ListDetailItem>
          </Box>
          <ListingMoreDetailsContainer>
            <h3>Description</h3>
            <p>{activeListingDetail && activeListingDetail.list_discription}</p>
          </ListingMoreDetailsContainer>
          </>
        )
        break;
      case active_index === 1:
        return(
          <>
          <Box mb={5}>
            <ListDetailItem top={true}>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing/paddleboard.svg'}/>
                <p>Paddle Boards</p>
              </Box>
              <Box>
              {activeListingDetail &&
                <Checkbox
                  checked={activeListingDetail.paddle_board === 1 ? true:false}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }

              </Box>
            </ListDetailItem>
            <ListDetailItem>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing/kayak.svg'}/>
                <p>Kayaks</p>
              </Box>
              <Box>
              {activeListingDetail &&
                <Checkbox
                  checked={activeListingDetail.tender === 1 ? true:false}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              </Box>
            </ListDetailItem>
            <ListDetailItem>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing/waterjetpack.svg'}/>
                <p>Water Jetpack</p>
              </Box>
              <Box>
              {activeListingDetail &&
                <Checkbox
                  checked={activeListingDetail.water_jetpack === 1 ? true:false}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              </Box>
            </ListDetailItem>
            <ListDetailItem>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing/jacuzzi.svg'}/>
                <p>Jacuzzi</p>
              </Box>
              <Box>
              {activeListingDetail &&
                <Checkbox
                  checked={activeListingDetail.jacuzzi === 1 ? true:false}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              </Box>
            </ListDetailItem>
            <ListDetailItem>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing/kite.svg'}/>
                <p>Kite Surfing</p>
              </Box>
              <Box>
              {activeListingDetail &&
                <Checkbox
                  checked={activeListingDetail.floatine_mate === 1 ? true:false}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }

              </Box>
            </ListDetailItem>
            <ListDetailItem bottom={true}>
              <Box display={'flex'} alignItems={'center'}>
                <ListDetailImage src={process.env.PUBLIC_URL+'/icons/listing/jetski.svg'}/>
                <p>Jet Ski</p>
              </Box>
              <Box>
              {activeListingDetail &&
                <Checkbox
                  checked={activeListingDetail.jet_ski === 1 ? true:false}
                  inputProps={{ 'aria-label': 'controlled' }}
                />
              }
              </Box>
            </ListDetailItem>
          </Box>
          <ListingMoreDetailsContainer>
            <h3>Description</h3>
            <p>{activeListingDetail && activeListingDetail.list_discription}</p>
          </ListingMoreDetailsContainer>
          </>
        )
        break;
      case active_index === 2:
        return(
          <Box display={'flex'}>
            <Box width={'30%'}>
              <ListDetailSectionButton onClick={()=>set_active_policy_index(0)} selected={active_policy_index === 0?true:false}>
              <p>Rules</p>
              </ListDetailSectionButton>
              <ListDetailSectionButton onClick={()=>set_active_policy_index(1)} selected={active_policy_index === 1?true:false}>
              <p>Security Deposit & Fees</p>
              </ListDetailSectionButton>
              <ListDetailSectionButton onClick={()=>set_active_policy_index(2)} selected={active_policy_index === 2?true:false}>
              <p>Cancellation Policy</p>
              </ListDetailSectionButton>
            </Box>
            <Box flex={1}>
              <ListingMoreDetailsContainer style={{height:"100%"}}>
                {active_policy_index === 0
                  ? (
                    <>
                      {activeListingDetail && renderRules(activeListingDetail.rules)}
                    </>
                  )
                  : active_policy_index === 1
                  ? (
                    <>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6} md={6}>
                          <h3>Day Trips</h3>
                          <p>Deposit Amount for Day Trips: <b>${activeListingDetail && activeListingDetail.day_trip_related.security_deposit}</b></p>
                          <p>Gratuity: <b>${activeListingDetail && activeListingDetail.day_trip_related.gratuity}</b></p>
                          <p>Tax Percentage: <b>{activeListingDetail && activeListingDetail.day_trip_related.taxes} %</b></p>
                          <p>Fuel Policy: <b>{activeListingDetail && activeListingDetail.day_trip_related.fuel_policy}</b></p>
                        </Grid>
                        <Grid item xs={12} sm={6} md={6}>
                          <h3>Overnight Stays</h3>
                          <p>Deposit Amount for Overnight Stays: <b>${activeListingDetail && activeListingDetail.overnights_related.security_deposit}</b></p>
                          <p>Gratuity: <b>${activeListingDetail && activeListingDetail.overnights_related.gratuity}</b></p>
                          <p>Tax Percentage: <b>{activeListingDetail && activeListingDetail.overnights_related.taxes} %</b></p>
                          <p>APA: <b>{activeListingDetail && activeListingDetail.overnights_related.apa} %</b></p>

                        </Grid>
                      </Grid>

                    </>
                  )
                  : active_policy_index === 2
                  ? (
                    <Box height={"100%"} alignItems={"flex-start"} justifyContent={'center'} display={'flex'} pl={2} flexDirection={'column'}>
                      <h2>{activeListingDetail !== null && activeListingDetail.cancelation_policy && activeListingDetail.cancelation_policy.flexible === 1 ? 'Flexible': activeListingDetail.cancelation_policy.moderate === 1 ? 'Moderate': activeListingDetail.cancelation_policy.strict === 1 ? 'Strict': activeListingDetail.cancelation_policy.use_your_own !== 'Owner Policty' ? activeListingDetail.cancelation_policy.use_your_own : 'None'  }</h2>
                      {activeListingDetail !== null && activeListingDetail.cancelation_policy && activeListingDetail.cancelation_policy.flexible === 1
                        ? (<p>You may cancel your charter for full refund if made 48 hours before start date. No refunds for cancellations made sooner than 48 hours.</p>)
                        : activeListingDetail.cancelation_policy.moderate === 1
                        ? (<p>You may cancel your charter for full refund if made 5 days before start date. No refunds for cancellations made sooner than 5 days.</p>)
                        : activeListingDetail.cancelation_policy.strict === 1
                        ? (<p>You may cancel your charter for full refund if made 7 days before start date. No refunds for cancellations made sooner than 7 days.</p>)
                        : activeListingDetail.cancelation_policy.use_your_own !== ''
                        ? activeListingDetail.cancelation_policy.use_your_own
                        : 'None'  }
                    </Box>
                  )
                  :null
                }
              </ListingMoreDetailsContainer>
            </Box>
          </Box>
        )
        break;

      case active_index === 3:
        return(
          <Box display={'flex'} flex={1} flexDirection={'column'}>
            <Box display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
              <Box>
                {activeListingDetail && activeListingDetail.owner &&
                  <AvatarCardWithReviews first_name={activeListingDetail.owner.firstName} last_name={activeListingDetail.owner.lastName} avatar={activeListingDetail.owner.profileImage} rank={'gold'} numOfReviews={0} verified={true}/>
                }
              </Box>
              <Box>
                <ContactOwnerBtn onClick={()=>history.push(`/messages?newConversation=${activeListingDetail && activeListingDetail.owner.username}&listing_id=${activeListingDetail && activeListingDetail.listing_id}`)}>
                  Contact Owner
                </ContactOwnerBtn>
              </Box>
            </Box>
            <Box flex={1}>
              <p>{activeListingDetail && activeListingDetail.owner.about_me}</p>
            </Box>
            <Box display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
              <Box maxWidth={"530px"} display={'flex'} alignItems={'center'}>
                <PinIcon src={process.env.PUBLIC_URL+'/teal-pin.svg'}/>
                <p>To protect your payment, never transfer money or communicate outside of the Beyond Boats website and app.</p>
              </Box>
              <Box>
                <ProfileBox>
                  <p>Language: <span>English</span></p>
                  <p>Response rate:   <span>{activeListingDetail && activeListingDetail.owner.response_rate}</span></p>
                  <p>Response time: <span>{activeListingDetail && activeListingDetail.owner.response_time}</span></p>
                </ProfileBox>
              </Box>
            </Box>

          </Box>
        )
        break;

      case active_index === 4:
        return(
          <Box display={'flex'} flex={1} flexDirection={'column'} maxWidth={600}>
            <Box display={'flex'} flex={1} justifyContent={'flex-start'} alignItems={'center'}>
              <Rating name="read-only" value={5} readOnly />
              <p style={{marginLeft:10}}><b>{reviewAvg.toFixed(2)} ({activeListingDetail && activeListingDetail.reviews?.length} reviews)</b></p>
            </Box>
            <Box display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
              <Box>
                <p style={{lineHeight:"0em"}}>Kindness</p>
              </Box>
              <Box sx={{ flex:1}}/>
              <Box sx={{ width: '50%', justifyContent:"right"}}>
               <ReviewProgressBar variant="determinate" value={kindnessRating*20} />
              </Box>
              <Box display={'flex'} ml={5} minWidth={20}>
                <p style={{lineHeight:"0em"}}>{kindnessRating}</p>
              </Box>
            </Box>
            <Box display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
              <Box>
                <p style={{lineHeight:"0em"}}>Communication</p>
              </Box>
              <Box sx={{ flex:1}}/>
              <Box sx={{ width: '50%', justifyContent:"right"}}>
               <ReviewProgressBar variant="determinate" value={commRating*20} />
              </Box>
              <Box display={'flex'} ml={5} minWidth={20}>
                <p style={{lineHeight:"0em"}}>{commRating}</p>
              </Box>
            </Box>
            <Box display={'flex'} flex={1} justifyContent={'space-between'} alignItems={'center'}>
              <Box>
                <p style={{lineHeight:"0em"}}>Service As Described</p>
              </Box>
              <Box sx={{ flex:1}}/>
              <Box sx={{ width: '50%', justifyContent:"right"}}>
               <ReviewProgressBar variant="determinate" value={serviceRating*20} />
              </Box>
              <Box display={'flex'} ml={5} minWidth={20}>
                <p style={{lineHeight:"0em"}}>{serviceRating}</p>
              </Box>
            </Box>
            <Box flex={1} style={{lineHeight:"1em"}}>
              {activeListingDetail && activeListingDetail.reviews.map((review:any) => (
                <ReviewCard first_name={review && review.renter.firstName} last_name={review.renter.lastName} avatar={review.renter.profileImage} rank={review.renter.rank} review={review.review_comment} date={moment(review.created_at).fromNow()}/>
              ))}

            </Box>


          </Box>
        )
        break;
      default:
        break;
    }
  }

  function handleBookNow(e:any) {

    //setTimeout(() => dispatch(actions.getListingPricing({id:id, start_date:'', end_date:'', start_time:startTime, end_time:endTime, guest_capacity: parseInt(calculateGuests(adults, child)) ,duration:duration})), 0);

    history.push(`/book/listing/${id}?numberOfAdults=${adults}&numberOfChildren=${child}&start_time=${startTime}&end_time=${endTime}&start_date=${startDate}&end_date=${endDate}&duration=${JSON.stringify(duration)}`)
  }

  function handleDurationChange(name, value, current_duration) {
    let newModified = Object.assign({}, current_duration)
    newModified[name] = value
    setDuration(newModified)
  }


  function renderDurationText(duration:any) {
    let durationText = ''
    if (duration.weeks !== '') {
      let wks = `${duration.weeks} Wks`
      durationText = durationText + wks
    }

    if (duration.days !== '') {
      let days = ` ${duration.days} Days`
      durationText = durationText + days
    }

    if (duration.hours !== '') {
      let hrs = ` ${duration.hours} Hours`
      durationText = durationText + hrs
    }

    if (duration.minutes !== '') {
      let min = ` ${duration.minutes} Minutes`
      durationText = durationText + min
    }

    if (durationText === '') {
      durationText = 'Select Duration'
    }
    return durationText
  }

  return (
    <>
      <Helmet>
        <title>Detail</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Nav/>
      <BasicModal open={detailActive} onClose={toggleDetailActiveModal}>

      </BasicModal>

      <Popper open={durationOpen} anchorEl={anchorDuration}>
        <Box sx={{ p: 3, bgcolor: 'background.paper', width:500, borderRadius:5,boxShadow: "0px 0px 20px rgba(179, 179, 179, 0.25)", justifyContent:"center", textAlign:"center"}}>
          <h3>Duration</h3>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <DefaultSelectBase name="days" placeholder="Days" value={duration.days}  onChange={(e)=>handleDurationChange('days',e.target.value, duration)} label="Max Size">
              {activeListingDetail && activeListingDetail.day_trips === 1 &&
                <option value={'0'}>Same Day (Day Trip)</option>
              }
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
            </DefaultSelectBase>
            {parseInt(duration.days) === 0 &&
              <DefaultSelectBase name="hours" placeholder="Hours" value={duration.hours} onChange={(e)=>handleDurationChange('hours',e.target.value, duration)} label="Min Size">
                <option>4</option>
                <option>6</option>
                <option>8</option>
              </DefaultSelectBase>
            }
          </Box>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'} mt={2}>
            {parseInt(duration.days) !== 0 &&
            <DefaultSelectBase name="weeks" placeholder="Weeks" value={duration.weeks}  onChange={(e)=>handleDurationChange('weeks',e.target.value, duration)} label="Max Size">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14+</option>
            </DefaultSelectBase>
            }

            {parseInt(duration.days) === 0 &&
              <DefaultSelectBase name="minutes" placeholder="Minutes" value={duration.minutes} onChange={(e)=>handleDurationChange('minutes',e.target.value, duration)} label="Min Size">
                <option>15</option>
                <option>30</option>
                <option>45</option>
              </DefaultSelectBase>
            }

          </Box>
          <Box mt={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <AddFilterBtn onClick={handleDurationClick}>
              Add
            </AddFilterBtn>
          </Box>
        </Box>
      </Popper>

      <Popper open={timesOpen} anchorEl={anchorTimes}>
        <Box sx={{ p: 3, bgcolor: 'background.paper', width:300, borderRadius:5,boxShadow: "0px 0px 20px rgba(179, 179, 179, 0.25)", justifyContent:"flex-start", textAlign:"left"}}>
          <h3>Time</h3>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <DefaultSelectBase value={startTime} name="starttime" placeholder="Start Time" onChange={(e)=>setStartTime(e.target.value)} label="Start Time">
              <option value="00:00">12.00 AM</option>
              <option value="00:30">12.30 AM</option>
              <option value="01:00">01.00 AM</option>
              <option value="01:30">01.30 AM</option>
              <option value="02:00">02.00 AM</option>
              <option value="02:30">02.30 AM</option>
              <option value="03:00">03.00 AM</option>
              <option value="03:30">03.30 AM</option>
              <option value="04:00">04.00 AM</option>
              <option value="04:30">04.30 AM</option>
              <option value="05:00">05.00 AM</option>
              <option value="05:30">05.30 AM</option>
              <option value="06:00">06.00 AM</option>
              <option value="06:30">06.30 AM</option>
              <option value="07:00">07.00 AM</option>
              <option value="07:30">07.30 AM</option>
              <option value="08:00">08.00 AM</option>
              <option value="08:30">08.30 AM</option>
              <option value="09:00">09.00 AM</option>
              <option value="09:30">09.30 AM</option>
              <option value="10:00">10.00 AM</option>
              <option value="10:30">10.30 AM</option>
              <option value="11:00">11.00 AM</option>
              <option value="11:30">11.30 AM</option>
              <option value="12:00">12.00 PM</option>
              <option value="12:30">12.30 PM</option>
              <option value="13:00">01.00 PM</option>
              <option value="13:30">01.30 PM</option>
              <option value="14:00">02.00 PM</option>
              <option value="14:30">02.30 PM</option>
              <option value="15:00">03.00 PM</option>
              <option value="15:30">03.30 PM</option>
              <option value="16:00">04.00 PM</option>
              <option value="16:30">04.30 PM</option>
              <option value="17:00">05.00 PM</option>
              <option value="17:30">05.30 PM</option>
              <option value="18:00">06.00 PM</option>
              <option value="18:30">06.30 PM</option>
              <option value="19:00">07.00 PM</option>
              <option value="19:30">07.30 PM</option>
              <option value="20:00">08.00 PM</option>
              <option value="20:30">08.30 PM</option>
              <option value="21:00">09.00 PM</option>
              <option value="21:30">09.30 PM</option>
              <option value="22:00">10.00 PM</option>
              <option value="22:30">10.30 PM</option>
              <option value="23:00">11.00 PM</option>
              <option value="23:30">11.30 PM</option>
            </DefaultSelectBase>
            <DefaultSelectBase value={endTime} name="endTime" placeholder="End Time" onChange={(e)=>setEndTime(e.target.value)} label="End Time">
                <option value="00:00">12.00 AM</option>
                <option value="00:30">12.30 AM</option>
                <option value="01:00">01.00 AM</option>
                <option value="01:30">01.30 AM</option>
                <option value="02:00">02.00 AM</option>
                <option value="02:30">02.30 AM</option>
                <option value="03:00">03.00 AM</option>
                <option value="03:30">03.30 AM</option>
                <option value="04:00">04.00 AM</option>
                <option value="04:30">04.30 AM</option>
                <option value="05:00">05.00 AM</option>
                <option value="05:30">05.30 AM</option>
                <option value="06:00">06.00 AM</option>
                <option value="06:30">06.30 AM</option>
                <option value="07:00">07.00 AM</option>
                <option value="07:30">07.30 AM</option>
                <option value="08:00">08.00 AM</option>
                <option value="08:30">08.30 AM</option>
                <option value="09:00">09.00 AM</option>
                <option value="09:30">09.30 AM</option>
                <option value="10:00">10.00 AM</option>
                <option value="10:30">10.30 AM</option>
                <option value="11:00">11.00 AM</option>
                <option value="11:30">11.30 AM</option>
                <option value="12:00">12.00 PM</option>
                <option value="12:30">12.30 PM</option>
                <option value="13:00">01.00 PM</option>
                <option value="13:30">01.30 PM</option>
                <option value="14:00">02.00 PM</option>
                <option value="14:30">02.30 PM</option>
                <option value="15:00">03.00 PM</option>
                <option value="15:30">03.30 PM</option>
                <option value="16:00">04.00 PM</option>
                <option value="16:30">04.30 PM</option>
                <option value="17:00">05.00 PM</option>
                <option value="17:30">05.30 PM</option>
                <option value="18:00">06.00 PM</option>
                <option value="18:30">06.30 PM</option>
                <option value="19:00">07.00 PM</option>
                <option value="19:30">07.30 PM</option>
                <option value="20:00">08.00 PM</option>
                <option value="20:30">08.30 PM</option>
                <option value="21:00">09.00 PM</option>
                <option value="21:30">09.30 PM</option>
                <option value="22:00">10.00 PM</option>
                <option value="22:30">10.30 PM</option>
                <option value="23:00">11.00 PM</option>
                <option value="23:30">11.30 PM</option>
            </DefaultSelectBase>
          </Box>
          <Box mt={3} display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <AddFilterBtn onClick={handleTimesClick}>
              Add
            </AddFilterBtn>
          </Box>
        </Box>
      </Popper>

      <Popper open={datesOpen} anchorEl={anchorDates}>
        <Box sx={{ p: 3, bgcolor: 'background.paper', width:300, borderRadius:5,boxShadow: "0px 0px 20px rgba(179, 179, 179, 0.25)", justifyContent:"flex-start", textAlign:"left"}}>
          <h2>Select Dates</h2>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'flex-start'} flexDirection={'column'}>
            <h3>Start Date</h3>
            <input type="date" value={startDate} onChange={(e)=>setStartDate(e.target.value)} />

            <h3>Start Date</h3>
            <input type="date" value={endDate} onChange={(e)=>setEndDate(e.target.value)} />

          </Box>
          <Box mt={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <AddFilterBtn onClick={handleDatesClick}>
              Add
            </AddFilterBtn>
          </Box>
        </Box>
      </Popper>

      <Popper open={guestsOpen} anchorEl={anchorGuests}>
        <Box sx={{ p: 3, bgcolor: 'background.paper', width:300, borderRadius:5,boxShadow: "0px 0px 20px rgba(179, 179, 179, 0.25)", justifyContent:"center", textAlign:"center"}}>
          <h3>Guests</h3>
          <Box display={'flex'} justifyContent={'space-between'} alignItems={'center'}>
            <DefaultSelectBase name="adults" value={adults} placeholder="Adults" onChange={(e)=>setAdults(parseInt(e.target.value))} label="Adults">
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14+</option>
            </DefaultSelectBase>
            <DefaultSelectBase name="kids" value={child} placeholder="Kids" onChange={(e)=>setChild(parseInt(e.target.value))} label="Kids">
              <option>0</option>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
              <option>13</option>
              <option>14+</option>
            </DefaultSelectBase>
          </Box>
          <Box mt={3} display={'flex'} justifyContent={'center'} alignItems={'center'}>
            <AddFilterBtn onClick={handleGuestsClick}>
              Add
            </AddFilterBtn>
          </Box>
        </Box>
      </Popper>

      <Container style={{paddingBottom:60}}>
        <Grid container spacing={2} mt={5}>
          <Grid item xs={8}>
              {
                activeListingDetail && activeListingDetail.images && activeListingDetail.images?.length > 0? (

                  <Carousels>
                    {activeListingDetail.images.map(element => (
                      <ListingDetailImgContainer>
                        <img src={element.location}/>
                      </ListingDetailImgContainer>
                    ))}
                  </Carousels>

                ) : (
                  <Skeleton variant="rectangular" width={500} height={300} style={{borderRadius:20}} />
                )
              }
          </Grid>
          <Grid item xs={4}>
            <ListingDetailContainer style={{padding:"10px 25px"}}>
              <Grid container spacing={2} alignItems="center">
                <Grid item xs={10}>
                  {parseInt(duration.days) > 0 ?
                    (
                    <>
                      <p><Price>${activeListingDetail && activeListingDetail.overnights_related.price_per_day}</Price>/day <Price style={{marginLeft:5}}>${activeListingDetail && activeListingDetail.overnights_related.price_per_week}</Price>/week</p>
                    </>
                    )
                    : (
                      <p><Price>${activeListingDetail && activeListingDetail.day_trip_related && activeListingDetail.day_trip_related.price_for_4_hours}</Price>/4 HRS <Price style={{marginLeft:5}}>${activeListingDetail && activeListingDetail.day_trip_related && activeListingDetail.day_trip_related.price_for_6_hours}</Price>/6 HRS <Price style={{marginLeft:5}}>${activeListingDetail && activeListingDetail.day_trip_related && activeListingDetail.day_trip_related.price_for_8_hours}</Price>/8 HRS</p>
                    )
                  }
                </Grid>
                <Grid item xs={2}>
                  <FavoriteIcon>
                    <img src={process.env.PUBLIC_URL + '/icons/listing/heart-outline.svg'}/>
                  </FavoriteIcon>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={10} alignItems={'center'}>
                  <Box display={'flex'} alignItems={'center'}>
                    <FavoriteIcon>
                      <img src={process.env.PUBLIC_URL + '/icons/listing/gold-star.svg'}/>
                    </FavoriteIcon>
                    <p style={{margin:"5px 0px 0px 8px"}}>{isNaN(reviewAvg) ? 'No reviews yet...': reviewAvg.toFixed(1)} <span style={{color:"#828282"}}>({activeListingDetail && activeListingDetail.reviews && activeListingDetail.reviews?.length})</span></p>
                  </Box>
                </Grid>
                <Grid item xs={2}>
                  <FavoriteIcon>
                    <img src={process.env.PUBLIC_URL + '/icons/listing/share.svg'}/>
                  </FavoriteIcon>
                </Grid>
              </Grid>

              <BookingFieldContainer>
              <Grid container spacing={2} height={"100%"} alignItems={'stretch'} style={{marginTop:0}} >
                <Grid item xs={6} style={{paddingTop:0}} >
                  <Box display={'flex'} flexDirection={'column'} height={'100%'}>
                    <BookingField onClick={handleDurationClick} style={{borderRadius:"10px 0px 0px 0px"}} >
                      <p>Duration</p>
                      <p style={{fontFamily:"GilroyMedium"}}>{renderDurationText(duration)}</p>
                    </BookingField>
                    <BookingField onClick={handleDatesClick} style={{borderRadius:"0px 0px 0px 10px"}}>
                      <p>Dates</p>
                      <p style={{fontFamily:"GilroyMedium"}}>{startDate} - {endDate}</p>
                    </BookingField>
                  </Box>
                </Grid>
                <Grid item xs={6} style={{paddingTop:0}} >
                  <Box display={'flex'} flexDirection={'column'} height={'100%'}>
                    <BookingField onClick={handleGuestsClick} style={{borderRadius:"0px 10px 0px 0px"}}>
                      <p>Guests</p>
                      <p style={{fontFamily:"GilroyMedium"}}>{calculateGuests(adults, child)}</p>
                    </BookingField>

                    <BookingField onClick={handleTimesClick} style={{borderRadius:"10px 0px 10px 0px"}}>
                      <p>Times</p>
                      <p style={{fontFamily:"GilroyMedium"}}>{startTime} - {endTime}</p>
                    </BookingField>
                  </Box>
                </Grid>
              </Grid>
              </BookingFieldContainer>

              {pricingData !== null
              ? (
                <>
                <Grid container spacing={1} alignItems={'center'} mt={2}>
                  <Grid item xs={8} >
                    <p style={{margin:0, marginTop:5}}>Trip Total</p>
                  </Grid>
                  <Grid item xs={4} style={{paddingTop:0}} textAlign="right">
                    {loading
                        ? <Skeleton variant="text" height={16} width={50} animation="wave" />
                        : <h3 style={{margin:0, marginTop:5}}>${pricingData.subtotal !== null ? pricingData.subtotal : null}</h3>
                    }
                  </Grid>
                  <Grid item xs={8} >
                    <p style={{margin:0, marginTop:5}}>Taxes & Fees</p>
                  </Grid>
                  <Grid item xs={4} style={{paddingTop:0}} textAlign="right">
                    {loading
                        ? <Skeleton variant="text" height={16} width={50} animation="wave" />
                        : <h3 style={{margin:0, marginTop:5}}>{pricingData.taxes_fees !== null ? pricingData.taxes_fees : null}</h3>
                    }
                  </Grid>
                  <Grid item xs={8} >
                    <p style={{margin:0, marginTop:5}}>Optional Addons</p>
                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    <h3 style={{margin:0, marginTop:5}}>-</h3>
                  </Grid>
                  <Grid item xs={12}>
                    <BookingDottedDivider/>
                  </Grid>
                  <Grid item xs={8} >
                    {loading
                        ? <Skeleton variant="text" height={16} width={50} animation="wave" />
                        : <h3 style={{margin:0, marginTop:5}}>Total</h3>
                    }

                  </Grid>
                  <Grid item xs={4} textAlign="right">
                    {loading
                        ? <Skeleton variant="text" height={16} width={50} animation="wave" />
                        : <h3 style={{margin:0, marginTop:5}}>${pricingData.total !== null ? pricingData.total : null}</h3>
                    }
                  </Grid>
                </Grid>

                <Box mt={5} width={"100%"}>
                  <BookNowBtn onClick={handleBookNow}>
                    {loading && loading === true
                      ? (
                        <CircularProgress
                            size={30}
                            sx={{
                              color: "#fff",
                            }}
                          />
                      )
                      : "Book Now"
                    }
                  </BookNowBtn>
                </Box>
                </>
              )
              : null}



              <Box mt={3} width={"100%"} textAlign={'center'}>
                <ContactOwnerLink href="/messages/">Contact Owner</ContactOwnerLink>
              </Box>

              <Box mt={3} mb={3} width={"100%"} textAlign={'center'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
                <FavoriteIcon>
                  <img src={process.env.PUBLIC_URL + '/icons/listing/flag.svg'}/>
                </FavoriteIcon>
                <ReportLink href="#" style={{marginLeft:5}}>Report This Listing</ReportLink>
              </Box>
            </ListingDetailContainer>
          </Grid>
        </Grid>
        <ListingDetailsMoreFlex>
          <ListingTab onClick={()=>set_active_tab_index(0)} selected={active_tab_index === 0?true:false}>
            <p>Specs & Description</p>
          </ListingTab>
          <ListingTab onClick={()=>set_active_tab_index(1)} selected={active_tab_index === 1?true:false}>
            <p>Water Toys</p>
          </ListingTab>
          <ListingTab onClick={()=>set_active_tab_index(2)} selected={active_tab_index === 2?true:false}>
            <p>Policies</p>
          </ListingTab>
          <ListingTab onClick={()=>set_active_tab_index(3)} selected={active_tab_index === 3?true:false}>
            <p>Owner</p>
          </ListingTab>
          <ListingTab onClick={()=>set_active_tab_index(4)} selected={active_tab_index === 4?true:false}>
            <p>Reviews</p>
          </ListingTab>
        </ListingDetailsMoreFlex>

        {renderDetailView(active_tab_index)}
      </Container>
    </>
  );
}

export const ReportLink = styled.a`
  font-family: GilroyMedium;
  font-size: 10px;
  line-height: 12px;
  text-decoration-line: underline;
  color: #828282;
`

export const ContactOwnerLink = styled.a`
  font-family: GilroyMedium;
  font-size: 18px;
  text-align: center;
  text-decoration-line: underline;
  color: #333333;
  font-weight:700;
`

export const AddFilterBtn = styled(Button)`
  && {
    width: 135px;
    height: 50px;
    color: #fff;
    font-family: GilroyBold;
    font-size: 18px;
    text-transform: capitalize;
    background: linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%);
    border-radius: 15px;
    color: #fff;
    padding:.5vw 0;

    &&:hover{
      background: linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.90) 51.04%, #00C2CB 100%);
    }

    &&:disabled{
      background: #f3f3f3;
      cursor: not-allowed;
      pointer-events:auto;
    }


  }
`;

export const BookNowBtn = styled(Button)`
  && {
    width: 100%;
    height: 50px;
    color: #fff;
    font-family: GilroyBold;
    font-size: 18px;
    text-transform: capitalize;
    background: linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%);
    border-radius: 60px;
    color: #fff;
    padding:.5vw 0;

    &&:hover{
      background: linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%);
    }

    &&:disabled{
      background: #f3f3f3;
      cursor: not-allowed;
      pointer-events:auto;
    }


  }
`;

const BookingDottedDivider = styled.div`
  border: 1px dashed #BDBDBD;
  width:100%;
  margin-top:10px;
  margin-bottom:10px;

`;
const BookingField = styled.div`
  cursor:pointer;
  flex:1;
  padding:10px;

  &&:hover{
    background: #FAFAFA;
  }
  p{
    margin-top:0px;
    margin-bottom:3px;
  }
`;

const BookingFieldContainer = styled.div`
  width:100%;
  height: 120px;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top:25px;
`;


const FavoriteIcon = styled.div`
  width:20px;
  height:20px;
  img{
    width:100%;
    height:100%;
  }
`;

const ReviewProgressBar = styled(LinearProgress)`
  &&{
    background: #F2F2F2;
    border-radius: 10px;
    .MuiLinearProgress-barColorPrimary{
      background: linear-gradient(180deg, #F3C63D 0%, #FFEBAD 54.17%, rgba(226, 176, 23, 0.94) 100%);
      border-radius: 10px;
    }
  }

`;

const PinIcon = styled.img`
  width:65px;
  height:65px;
  margin-right:25px;
`;

const ProfileBox = styled.div`
  display:flex;
  flex-direction:column;
  padding:20px;
  background: #FFFFFF;
  border: 2px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 20px;
  span{
    color: black;
    font-weight:900;
  }
  p{
    font-family: GilroyMedium;
    font-size: 18px;
    color: #BDBDBD;
    margin-top:5px;
    margin-bottom:5px;
  }
`;


const ContactOwnerBtn = styled(Button)`
  &&{
    min-width: 200px;
    height: 50px;
    background: #FFFFFF;
    border-radius: 8px;
    border: 4px solid black;
    color:black;
    font-family: GilroyBold;
    font-size: 18px;
    padding:20px;
    text-transform: capitalize;
  }
`;

const RulesSpan = styled.div`
  padding:5px 15px;
  text-align:center;
  background: #FFFFFF;
  border: 2px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 15px;
  transition: all ease-in-out .2s;
  cursor: not-allowed;
  &&:hover{
    color: white;
    background: linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%);
  }
   p{
     font-family: GilroyBold;
     font-size: 18px;
   }

`;

const ListDetailSectionButton = styled.div<{selected:boolean}>`
  padding:5px 20px;
  text-align:left;
  cursor:pointer;
  margin-right:20px;
  background: #FFFFFF;
  border: 2px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 15px;
  margin-bottom:15px;
  &&:hover{
    color: black;
  }

  ${({ selected }) => selected === true && `
    border: 2px solid #333333;
    p{
      color: black !important;
    }
   `}

   p{
     font-family: GilroyBold;
     font-size: 20px;
     line-height: 21px;
     color: #828282;
   }

`;

const ListDetailImage = styled.img`
  width:30px;
  height:30px;
  margin-right:25px;
`;


const ListDetailItem = styled.div<{top?:boolean, bottom?:boolean}>`
  display:flex;
  flex:1;
  flex-direction:row;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 0px 0px 0px 0px;
  padding: 10px 20px;
  justify-content:space-between;

  ${({ top }) => top === true && `
    border-radius: 20px 20px 0px 0px;
   `}

   ${({ bottom }) => bottom === true && `
     border-radius: 0px 0px 20px 20px;
    `}

    p{
      font-family: GilroyMedium;
    }

    h3{
      margin:0px;
    }
`;


const ListingMoreDetailsContainer = styled.div`
  display:flex;
  flex:1;
  flex-direction:column;
  background: #FFFFFF;
  border: 1px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 20px;
  padding:25px;


  h3{
    margin:0px 0px 20px 0px;

  }

`;

const ListingDetailsMoreFlex = styled.div`
  display:flex;
  width:100%;
  justify-content:space-around;
  background: #FFFFFF;
  border: 2px solid #E0E0E0;
  box-sizing: border-box;
  border-radius: 20px;
  padding: 0px 20px 0px 20px;
  margin-top:45px;
  margin-bottom:45px;

`;

const ListingTab = styled.div<{selected:boolean}>`
  padding:15px;
  text-align:center;
  cursor:pointer;
  margin-right:20px;
  border-bottom: 0px;
  font-size: 18px;
  &&:hover{
    border-bottom: 4px solid black;
    color:#00C2CB;
  }

  ${({ selected }) => selected === true && `
    border-bottom: 4px solid black;
    color:#00C2CB;

    p{
      font-family: GilroyBold;
    }
   `}

   p{
     color:black;
   }

`;


export const ListingDetailImgContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items:center;
  flex-direction:column;
  width:100%;

  img{
    width:90%;
  }
`;

export const Price = styled.span`
  font-family: GilroyBold;
  font-size: 20px;
  line-height: 35px;
  color: #333333;
`;

export const ListingDetailContainer = styled.div`
  display:flex;
  justify-content: flex-start;
  align-items:flex-start;
  flex-direction:column;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 20px;
  padding:10px;
`;
