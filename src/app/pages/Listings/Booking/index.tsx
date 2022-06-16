import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Stack,
  Divider,
  Box,
  Button,
  IconButton,
  Grid,
  Skeleton,
  CircularProgress,
} from '@mui/material';
import { Nav } from '../../../components/Nav';
import { EditIconComponent } from '../../../components/user-related';
import {
  AddPaymentMethodModal,
  AddPaymentMethodWrapper,
  BookingConfirmModal,
} from '../../../components/modals';

import {
  AvatarCardWithReviews,
  ReviewCard,
  renderPaymentMethods,
} from '../../../components/user-related';
import {
  useHistory,
  useParams,
  RouteComponentProps,
  withRouter,
  useLocation,
} from 'react-router-dom';

import { DefaultInput, DefaultSelectBase } from '../../../components/input';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { FaSearch } from 'react-icons/fa';
import { useListingSlice } from '../slice';
import {
  selectLoading,
  selectError,
  selectActiveListingDetail,
  selectActiveListingPricing,
  selectBookingSuccess,
  selectPmSecret,
} from '../slice/selectors';

import { selectUser } from '../../Account/slice/selectors';

import { useAccountSlice } from '../../Account/slice/';

import { useTranslation } from 'react-i18next';

// import {
//   selectLoading,
//   selectPayload,
//   selectError,
//   selectUser,
//   selectToken,
//   selectSuccess,
//   selectLoginSuccess
// } from '../../slice/selectors';
interface Props extends RouteComponentProps {
  id: string;
}

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export function Booking() {
  const history = useHistory();
  const { actions } = useListingSlice();
  const { actions: accountActions } = useAccountSlice();

  const dispatch = useDispatch();

  const userDetails = useSelector(selectUser);
  const activeListingDetail = useSelector(selectActiveListingDetail);
  const activeListingPricing = useSelector(selectActiveListingPricing);
  const loading = useSelector(selectLoading);

  const bookingSuccess = useSelector(selectBookingSuccess);
  const pmSecret = useSelector(selectPmSecret);

  const { id }: any = useParams();

  // const authUser = useSelector(selectUser)
  // const loading = useSelector(selectLoading)
  // const errors = useSelector(selectError)
  // const success = useSelector(selectSuccess)
  // const payload = useSelector(selectPayload)

  const [user, set_user] = React.useState({
    id: '',
    firstName: '',
    lastName: '',
    gender: '',
    dob: '',
    email: '',
    phoneNumber: '',
    governmentID: '',
    address1: '',
    address2: '',
    payment_methods: [],
    emergencyContactName: '',
    emergencyContactNo: '',
  });
  const [dateChangeActive, set_dateChangeActive] = React.useState(false);
  const [durationChangeActive, set_durationChangeActive] =
    React.useState(false);
  const [guestChangeActive, set_guestChangeActive] = React.useState(false);
  const [timeChangeActive, set_timeChangeActive] = React.useState(false);
  const [addNewPMActive, set_addNewPMActive] = React.useState(false);

  const [purchaseModalOpen, set_purchaseModalOpen] = React.useState(false);

  const [messageToOwner, set_messageToOwner] = React.useState('');
  const [special_occasion, set_specialOccasion] = React.useState('');
  const [refferalType, set_refferalType] = React.useState('');
  const [pricingData, setPricingData] = React.useState<any>(null);

  const [selectedPM, set_selectedPM] = React.useState<any>(null);

  const [child, setChild] = React.useState(0);
  const [adults, setAdults] = React.useState(1);
  const [startTime, setStartTime] = React.useState('');
  const [endTime, setEndTime] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  const [duration, setDuration] = React.useState({
    weeks: '',
    days: '',
    hours: '',
    minutes: '',
  });

  const query = useQuery();
  const numberOfAdults_query = query.get('numberOfAdults');
  const numberOfChildren_query = query.get('numberOfChildren');
  const start_time_query = query.get('start_time');
  const end_time_query = query.get('end_time');
  const start_date_query = query.get('start_date');
  const end_date_query = query.get('end_date');
  const duration_query = query.get('duration');

  const calculateGuests = (adultsCount: number, kidCount: number) => {
    let sum = adultsCount + kidCount;
    return `${sum}`;
  };

  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    if (userDetails !== null && userDetails !== undefined) {
      set_user(userDetails);

      if (userDetails.payment_methods.length > 0) {
        set_selectedPM(userDetails.payment_methods[0]);
      }
    }
  }, [userDetails]);
  //
  React.useEffect(() => {
    console.log(activeListingPricing);

    setTimeout(() => dispatch(accountActions.loadAccount()), 0);

    if (numberOfAdults_query !== null && numberOfAdults_query !== undefined) {
      setAdults(parseInt(numberOfAdults_query));
    }

    if (
      numberOfChildren_query !== null &&
      numberOfChildren_query !== undefined
    ) {
      setChild(parseInt(numberOfChildren_query));
    }

    if (start_time_query !== null && start_time_query !== undefined) {
      setStartTime(start_time_query);
    }

    if (end_time_query !== null && end_time_query !== undefined) {
      setEndTime(end_time_query);
    }

    if (start_date_query !== null && start_date_query !== undefined) {
      setStartDate(start_date_query);
    }

    if (end_date_query !== null && end_date_query !== undefined) {
      setEndDate(end_date_query);
    }

    if (duration_query !== null && duration_query !== undefined) {
      setDuration(JSON.parse(duration_query));
    }
  }, []);

  function handleAddPMToggle() {
    set_addNewPMActive(!addNewPMActive);
  }

  const modalRoot: any = React.useRef();

  React.useEffect(() => {
    if (activeListingPricing !== null && activeListingPricing !== undefined) {
      setPricingData(activeListingPricing);
      setTimeout(
        () =>
          dispatch(
            actions.createPaymentIntent({ amount: activeListingPricing.total }),
          ),
        0,
      );
    }
  }, [activeListingPricing]);

  // React.useEffect(() => {
  //   if (activeListingPricing !== null && activeListingPricing !== undefined && pmSecret !== null && pmSecret !== undefined) {
  //     setTimeout(() => dispatch(actions.createPaymentIntent({amount:activeListingPricing.total})), 0);
  //   }
  // },[activeListingPricing, pmSecret])

  React.useEffect(() => {
    if (
      bookingSuccess !== null &&
      bookingSuccess !== undefined &&
      bookingSuccess === true
    ) {
    }
  }, [bookingSuccess]);

  function handleCompleteBooking(e: any) {
    set_purchaseModalOpen(true);
    setTimeout(
      () =>
        dispatch(
          actions.bookListing({
            id: id,
            guest_capacity: calculateGuests(adults, child),
            startDate: startDate,
            endDate: endDate,
            startTime: startTime,
            endTime: endTime,
            pricingData: activeListingPricing,
            user_id: user.id,
            duration: duration,
            pmId: selectedPM.cardId,
            paymentIntentID: pmSecret.id,
          }),
        ),
      0,
    );
  }

  function renderDurationText(duration: any) {
    let durationText = '';
    if (duration.weeks !== '') {
      let wks = `${duration.weeks} Wks`;
      durationText = durationText + wks;
    }

    if (duration.days !== '') {
      let days = ` ${duration.days} Days`;
      durationText = durationText + days;
    }

    if (duration.hours !== '') {
      let hrs = ` ${duration.hours} Hours`;
      durationText = durationText + hrs;
    }

    if (duration.minutes !== '') {
      let min = ` ${duration.minutes} Minutes`;
      durationText = durationText + min;
    }

    if (durationText === '') {
      durationText = 'Select Duration';
    }
    return durationText;
  }

  const [search, setSearch]: any = React.useState('');
  return (
    <>
      <Helmet>
        <title>Booking</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Nav searchValue={search} handleSearch={setSearch} />
      <BookingConfirmModal
        open={purchaseModalOpen}
        onClose={() => set_purchaseModalOpen(!purchaseModalOpen)}
        title={'Booking Your Reservation...'}
      >
        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100%'}
        >
          {loading === false ? (
            <CircularProgress
              size={85}
              sx={{
                color: '#00C2CB',
              }}
            />
          ) : null}
          <p>Please wait while we submit your reservation...</p>
        </Box>

        <Box
          display={'flex'}
          flexDirection={'column'}
          justifyContent={'center'}
          alignItems={'center'}
          height={'100%'}
        >
          <img src={process.env.PUBLIC_URL + '/teal-check.svg'} />
          <p>Please wait while we submit your reservation...</p>
        </Box>
      </BookingConfirmModal>
      <AddPaymentMethodWrapper>
        <div ref={modalRoot} id="modal-root"></div>
        <AddPaymentMethodModal
          open={addNewPMActive}
          onClose={handleAddPMToggle}
          modalRoot={modalRoot}
          user={user}
        />
      </AddPaymentMethodWrapper>
      <Container maxWidth="xl" style={{ paddingTop: 60, paddingBottom: 120 }}>
        <Grid container spacing={8}>
          <Grid item xs={9} alignItems={'center'}>
            <BookingStepsContainer>
              <Box>
                <BookingStepsHeaderAlt>Select Listing</BookingStepsHeaderAlt>
              </Box>
              <ChevronIcon
                src={
                  process.env.PUBLIC_URL +
                  '/icons/listing/chevron-teal-right.svg'
                }
              />
              <Box>
                <BookingStepsHeader>Payment Method</BookingStepsHeader>
              </Box>
              <ChevronIcon
                src={
                  process.env.PUBLIC_URL +
                  '/icons/listing/chevron-teal-right.svg'
                }
              />
              <Box>
                <BookingStepsHeaderAlt>Confirmation</BookingStepsHeaderAlt>
              </Box>
            </BookingStepsContainer>
            <TabHeaderContainer>
              <HeaderTab selected={true}>Trip Details</HeaderTab>
            </TabHeaderContainer>
            <TabBodyContainer>
              <Grid container spacing={2}>
                <Grid item xs={10} alignItems={'center'}>
                  <Box>
                    <h4 style={{ marginBottom: 5, marginTop: 0 }}>Dates</h4>
                    <p style={{ margin: 0 }}>
                      {startDate} - {endDate}
                    </p>
                  </Box>
                </Grid>
                <Grid item xs={2} alignItems={'center'}>
                  <EditIconComponent
                    onClick={() => set_dateChangeActive(!dateChangeActive)}
                  />
                </Grid>
                <Grid item xs={10} alignItems={'center'}>
                  <Box>
                    <h4 style={{ marginBottom: 5, marginTop: 0 }}>Duration</h4>
                    <p style={{ margin: 0 }}>{renderDurationText(duration)}</p>
                  </Box>
                </Grid>
                <Grid item xs={2} alignItems={'center'}>
                  <EditIconComponent
                    onClick={() => set_dateChangeActive(!dateChangeActive)}
                  />
                </Grid>
                <Grid item xs={10} alignItems={'center'}>
                  <Box>
                    <h4 style={{ marginBottom: 5, marginTop: 0 }}>Time</h4>
                    <p style={{ margin: 0 }}>
                      {startTime} - {endTime}
                    </p>
                  </Box>
                </Grid>
                <Grid item xs={2} alignItems={'center'}>
                  <EditIconComponent
                    onClick={() => set_dateChangeActive(!dateChangeActive)}
                  />
                </Grid>
                <Grid item xs={10} alignItems={'center'}>
                  <Box>
                    <h4 style={{ marginBottom: 5, marginTop: 0 }}>Guests</h4>
                    <p style={{ margin: 0 }}>
                      {adults} Adults {child > 0 ? `${child} Children` : null}
                    </p>
                  </Box>
                </Grid>
                <Grid item xs={2} alignItems={'center'}>
                  <EditIconComponent
                    onClick={() => set_dateChangeActive(!dateChangeActive)}
                  />
                </Grid>
              </Grid>
            </TabBodyContainer>
            <TabHeaderContainer>
              <HeaderTab selected={true}>Payment</HeaderTab>
              <a onClick={handleAddPMToggle}>Add a New Payment Method</a>
            </TabHeaderContainer>
            <TabBodyContainer>
              <Grid container spacing={2}>
                <Grid item xs={12} alignItems={'center'}>
                  <Box>{renderPaymentMethods(user.payment_methods)}</Box>
                </Grid>
              </Grid>
            </TabBodyContainer>
            <TabHeaderContainer>
              <HeaderTab selected={true}>Owner Info</HeaderTab>
            </TabHeaderContainer>
            <TabBodyContainer>
              <Grid container spacing={10}>
                <Grid item xs={7} alignItems={'center'}>
                  <Box>
                    {activeListingDetail && activeListingDetail.owner && (
                      <AvatarCardWithReviews
                        first_name={activeListingDetail.owner.firstName}
                        last_name={activeListingDetail.owner.lastName}
                        avatar={activeListingDetail.owner.profileImage}
                        rank={'gold'}
                        numOfReviews={0}
                        verified={true}
                      />
                    )}
                  </Box>
                  <Box width={'100%'} mt={3}>
                    <DefaultInput
                      name="message"
                      type="textarea"
                      placeholder="Message to owner"
                      label="Owner Message"
                      onChange={e => set_messageToOwner(e.target.value)}
                      multiline={true}
                      rows={6}
                    />
                  </Box>
                </Grid>
                <Grid item xs={5} alignItems={'center'}>
                  <Box mt={3}>
                    <DefaultSelectBase
                      name="special_occasion"
                      placeholder="Select One..."
                      value={special_occasion}
                      onChange={e => set_specialOccasion(e.target.value)}
                      label="What’s Your Special Occasion?"
                      variant="outline"
                    >
                      <option>Birthday</option>
                      <option>Surprise Celebration</option>
                      <option>Engagement Proposal</option>
                      <option>Wedding</option>
                      <option>Anniversary</option>
                      <option>Bachelor Party</option>
                      <option>Bachelorette Party</option>
                      <option>Friends / Family Trip</option>
                      <option>Graduation</option>
                    </DefaultSelectBase>
                  </Box>
                  <Box mt={3}>
                    <DefaultSelectBase
                      name="refferalType"
                      placeholder="Select One..."
                      value={refferalType}
                      onChange={e => set_refferalType(e.target.value)}
                      label="Where Did You Hear From Us?"
                      variant="outline"
                    >
                      <option>Word of Mouth</option>
                      <option>Online Ads</option>
                      <option>Social Media</option>
                      <option>SEO (Google, Bing, Yahoo)</option>
                      <option>Corporate Partner</option>
                    </DefaultSelectBase>
                  </Box>
                </Grid>
              </Grid>
            </TabBodyContainer>
          </Grid>
          <Grid item xs={3}>
            <BookinReserveContainer>
              <Box>
                <p>{activeListingDetail && activeListingDetail.listing_name}</p>
              </Box>
              <BookingFieldContainer>
                <Grid
                  container
                  spacing={2}
                  height={'100%'}
                  alignItems={'stretch'}
                  style={{ marginTop: 0 }}
                >
                  <Grid item xs={6} style={{ paddingTop: 0 }}>
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      height={'100%'}
                    >
                      <BookingField
                        style={{ borderRadius: '10px 0px 0px 0px' }}
                      >
                        <p>Duration</p>
                        <p style={{ fontFamily: 'GilroyMedium' }}>
                          {renderDurationText(duration)}
                        </p>
                      </BookingField>
                      <BookingField
                        style={{ borderRadius: '0px 0px 0px 10px' }}
                      >
                        <p>Start Charter</p>
                        <p style={{ fontFamily: 'GilroyMedium' }}>
                          {startDate}
                        </p>
                      </BookingField>
                    </Box>
                  </Grid>
                  <Grid item xs={6} style={{ paddingTop: 0 }}>
                    <Box
                      display={'flex'}
                      flexDirection={'column'}
                      height={'100%'}
                    >
                      <BookingField
                        style={{ borderRadius: '0px 10px 0px 0px' }}
                      >
                        <p>Guests</p>
                        <p style={{ fontFamily: 'GilroyMedium' }}>
                          {calculateGuests(adults, child)}
                        </p>
                      </BookingField>

                      <BookingField
                        style={{ borderRadius: '10px 0px 10px 0px' }}
                      >
                        <p>End Charter</p>
                        <p style={{ fontFamily: 'GilroyMedium' }}>{endDate}</p>
                      </BookingField>
                    </Box>
                  </Grid>
                </Grid>
              </BookingFieldContainer>
              {pricingData !== null ? (
                <>
                  <Grid container spacing={1} alignItems={'center'} mt={2}>
                    <Grid item xs={8}>
                      <p style={{ margin: 0, marginTop: 5 }}>Trip Total</p>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{ paddingTop: 0 }}
                      textAlign="right"
                    >
                      {loading ? (
                        <Skeleton
                          variant="text"
                          height={16}
                          width={50}
                          animation="wave"
                        />
                      ) : (
                        <h3 style={{ margin: 0, marginTop: 5 }}>
                          $
                          {pricingData.subtotal !== null
                            ? pricingData.subtotal
                            : null}
                        </h3>
                      )}
                    </Grid>
                    <Grid item xs={8}>
                      <p style={{ margin: 0, marginTop: 5 }}>Taxes & Fees</p>
                    </Grid>
                    <Grid
                      item
                      xs={4}
                      style={{ paddingTop: 0 }}
                      textAlign="right"
                    >
                      {loading ? (
                        <Skeleton
                          variant="text"
                          height={16}
                          width={50}
                          animation="wave"
                        />
                      ) : (
                        <h3 style={{ margin: 0, marginTop: 5 }}>
                          {pricingData.taxes_fees !== null
                            ? pricingData.taxes_fees
                            : null}
                        </h3>
                      )}
                    </Grid>
                    <Grid item xs={8}>
                      <p style={{ margin: 0, marginTop: 5 }}>Optional Addons</p>
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      <h3 style={{ margin: 0, marginTop: 5 }}>-</h3>
                    </Grid>
                    <Grid item xs={12}>
                      <BookingDottedDivider />
                    </Grid>
                    <Grid item xs={8}>
                      {loading ? (
                        <Skeleton
                          variant="text"
                          height={16}
                          width={50}
                          animation="wave"
                        />
                      ) : (
                        <h3 style={{ margin: 0, marginTop: 5 }}>Total</h3>
                      )}
                    </Grid>
                    <Grid item xs={4} textAlign="right">
                      {loading ? (
                        <Skeleton
                          variant="text"
                          height={16}
                          width={50}
                          animation="wave"
                        />
                      ) : (
                        <h3 style={{ margin: 0, marginTop: 5 }}>
                          $
                          {pricingData.total !== null
                            ? pricingData.total
                            : null}
                        </h3>
                      )}
                    </Grid>
                  </Grid>

                  <Box mt={5} width={'100%'}>
                    <BookNowBtn onClick={handleCompleteBooking}>
                      {loading && loading === true ? (
                        <CircularProgress
                          size={30}
                          sx={{
                            color: '#fff',
                          }}
                        />
                      ) : (
                        'Book Now'
                      )}
                    </BookNowBtn>
                  </Box>
                </>
              ) : null}
            </BookinReserveContainer>
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

const BookingField = styled.div`
  cursor: pointer;
  flex: 1;
  padding: 10px;

  &&:hover {
    background: #fafafa;
  }
  p {
    margin-top: 0px;
    margin-bottom: 3px;
  }
`;

const BookingFieldContainer = styled.div`
  width: 100%;
  height: 120px;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 10px;
  margin-top: 25px;
`;

export const BookNowBtn = styled(Button)`
  && {
    width: 100%;
    height: 50px;
    color: #fff;
    font-family: GilroyBold;
    font-size: 18px;
    text-transform: capitalize;
    background: linear-gradient(
      180deg,
      #00c2cb 0%,
      rgba(0, 194, 203, 0.76) 51.04%,
      #00c2cb 100%
    );
    border-radius: 60px;
    color: #fff;
    padding: 0.5vw 0;

    &&:hover {
      background: linear-gradient(
        180deg,
        #00c2cb 0%,
        rgba(0, 194, 203, 0.76) 51.04%,
        #00c2cb 100%
      );
    }

    &&:disabled {
      background: #f3f3f3;
      cursor: not-allowed;
      pointer-events: auto;
    }
  }
`;

const BookingDottedDivider = styled.div`
  border: 1px dashed #bdbdbd;
  width: 100%;
  margin-top: 10px;
  margin-bottom: 10px;
`;

export const BookinReserveContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 10px 30px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 20px;
  height: 65vh;
  margin-top: 72px;
`;

const HeaderTab = styled.div<{ selected?: boolean }>`
  padding: 15px;
  text-align: center;
  cursor: pointer;
  margin-right: 20px;
  border-bottom: 0px;
  font-size: 18px;
  &&:hover {
    border-bottom: 4px solid black;
    color: #00c2cb;
  }

  ${({ selected }) =>
    selected === true &&
    `
    border-bottom: 4px solid black;
    color:black;
    font-weight:900;
    font-family: GilroyBold;
   `}
`;

export const ChevronIcon = styled.img`
  height: 45px;
  width: 45px;
`;

export const BookingStepsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: row;
  padding: 10px 30px;
  background: #ffffff;
  border: 2px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 20px;
  height: 100px;
`;

export const BookingStepsHeader = styled.h3`
  font-family: GilroyBold;
  font-size: 30px;
  line-height: 35px;
  color: #333333;
`;

export const BookingStepsHeaderAlt = styled.h3`
  font-family: GilroyMedium;
  font-size: clamp(16px, 3.5vw, 30px);
  line-height: 35px;
  color: #6d6d6d;
  font-weight: 500;
`;

export const TabBodyContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-direction: column;
  padding: 30px 50px 30px 45px;
  margin-bottom: 5px;
  width: 100%;
  height: auto;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 0px 0px 15px 15px;
`;

export const TabHeaderContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 0px 45px;
  margin-bottom: 5px;
  width: 100%;
  height: auto;
  min-height: 65px;
  background: #ffffff;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 15px 15px 0px 0px;
  margin-top: 30px;
  margin-bottom: 10px;
`;
