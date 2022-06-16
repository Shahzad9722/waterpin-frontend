import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  Container,
  Stack,
  Box,
  Button,
  IconButton,
  Grid,
  Skeleton,
  Grow,
  Fade,
} from '@mui/material';
import { Nav } from '../../components/Nav';
import { Search } from '../../components/Search';
import {
  AvatarImg,
  AvatarImgContainer,
  Divider,
  Card,
  DottedDivider,
} from '../../components/layout';
import {
  DashboardLayout,
  DashboardButton,
  DashboardSectionText,
  DashboardHeaderIcon,
  DashboardVerticalDivider,
  DashboardHeaderText,
  AccountCardLink,
} from '../../components/DashboardLayout';

import { Footer } from '../../components/Footer';
import { RankingProgress } from '../../components/PointsAndRewards';
import { AvatarCircleWithRank } from '../../components/user-related';

import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components/macro';
import { FaSearch, FaHeart } from 'react-icons/fa';
import { useDashboardSlice } from './slice';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import profileEye from '../../assets/dashboard/eye.svg';
import profDetail from '../../assets/dashboard/reward.svg';

import {
  selectLoading,
  selectPayload,
  selectError,
  selectUser,
  selectToken,
  selectSuccess,
  selectLoginSuccess,
  selectActiveViewMode,
} from '../../slice/selectors';

import { useAppSlice } from '../../slice';

export function Dashboard() {
  const history = useHistory();
  const { actions } = useDashboardSlice();

  const { actions: appActions } = useAppSlice();

  const dispatch = useDispatch();

  const authUser = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const errors = useSelector(selectError);
  const success = useSelector(selectSuccess);
  const payload = useSelector(selectPayload);
  const view_mode = useSelector(selectActiveViewMode);

  const [user, set_user] = React.useState({
    username: '',
    firstName: '',
    lastName: '',
    profileImage: '',
    rank: 'new',
    notifications: [],
    favorites: [],
    role_id: 1,
    is_owner: false,
    points: 0,
  });

  const [favorites, set_favorites] = React.useState<any>(null);

  const { t, i18n } = useTranslation();

  React.useEffect(() => {
    if (authUser !== null && authUser !== undefined) {
      set_user(authUser);
      set_favorites(authUser.favorites);
    }
  }, [authUser]);

  React.useEffect(() => {
    setTimeout(() => dispatch(actions.getDashboardData()), 100);
  }, []);

  function handleSwitchToOwner(e: any) {
    setTimeout(() => dispatch(appActions.switchToOwnerView()), 0);

    setTimeout(() => window.location.reload(), 1000);
  }

  function handleSwitchToRenter(e: any) {
    //setTimeout(() => window.location.reload(), 1000);
    setTimeout(() => dispatch(appActions.switchToRenterView()), 0);

    setTimeout(() => window.location.reload(), 1000);
  }
  return (
    <>
      <Helmet>
        <title>Dashboard</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <DashboardLayout user={user}>
        <>
          <Grid container spacing={0}>
            <Grid item xs={12} sm={12} md={8}>
              <Box flex={1} pr={2} flexWrap={'wrap'}>
                <Card>
                  <Box width={'100%'} p={3}>
                    <Grid container spacing={0} alignItems={'center'}>
                      <Grid item xs={12} sm={7}>
                        <DashboardHeaderText>Account</DashboardHeaderText>
                      </Grid>
                      <Grid item xs={12} sm={4}>
                        <p style={{ margin: 0 }}>
                          Rank: <b> {user.points || '0'} </b> / 150
                        </p>
                      </Grid>
                      <Grid item xs={12} sm={1}>
                        <Box
                          display={'flex'}
                          width={'100%'}
                          justifyContent={'flex-end'}
                        >
                          <FaHeart color="#EB5757" />
                          <p
                            style={{
                              marginBottom: 0,
                              marginTop: 0,
                              marginLeft: 10,
                            }}
                          >
                            <b>
                              {(user.favorites && user.favorites.length) || '0'}
                            </b>
                          </p>
                        </Box>
                      </Grid>
                    </Grid>
                  </Box>
                  <Divider />
                  <Fade
                    in={true}
                    style={{ transformOrigin: '0 0 0' }}
                    {...(true ? { timeout: 1000 } : {})}
                  >
                    <Grid container spacing={5} p={5}>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={3}
                        display={'flex'}
                        flexDirection={'column'}
                        alignItems={'center'}
                      >
                        <AvatarCircleWithRank
                          avatar={user.profileImage}
                          w={'8vw'}
                          h={'8vw'}
                          firstName={user.firstName}
                          lastName={user.lastName}
                          rank={user.rank}
                        />
                        <DottedDivider />
                        <Box display={'flex'} flexDirection={'column'} mt={2}>
                          <AccountCardLink href="/profile" className="link">
                            <img src={profileEye} style={{ marginRight: 15 }} />
                            View Profile
                          </AccountCardLink>
                          <AccountCardLink
                            href="/account?points"
                            className="link"
                          >
                            <img src={profDetail} style={{ marginRight: 15 }} />
                            Reward Details
                          </AccountCardLink>
                        </Box>
                      </Grid>
                      <Grid
                        item
                        xs={12}
                        sm={12}
                        md={12}
                        lg={9}
                        display={'flex'}
                        flexDirection={'column'}
                        justifyContent={'space-between'}
                      >
                        <div>
                          <RankingProgress rank="new" />
                        </div>
                        <div>
                          <p>
                            <b>Quick Tip!</b>
                          </p>
                          <p>
                            Almost There! Invite a friend and get 10 points.
                          </p>
                        </div>
                      </Grid>
                    </Grid>
                  </Fade>
                </Card>
              </Box>
            </Grid>
            <Grid item xs={12} sm={12} md={4}>
              <Box width={'100%'} height={'100%'}>
                <Card>
                  <Box
                    display={'flex'}
                    flexWrap={'wrap'}
                    width={'100%'}
                    p={3}
                    justifyContent={'space-between'}
                  >
                    <DashboardHeaderText>My Favorites</DashboardHeaderText>
                    <a href={`/favorites`}>View All</a>
                  </Box>
                  <Divider />
                  <Box width={'100%'} p={3}>
                    <Fade in={true}>
                      {favorites && favorites !== null ? (
                        <>
                          {favorites.length > 0 ? (
                            <Grid container spacing={1}>
                              {favorites &&
                                favorites
                                  .map(fav => (
                                    <Grid item xs={12} sm={6}>
                                      <a
                                        href={`/listings/detail/${
                                          fav && fav.listing && fav.listing.listing_id
                                        }`}
                                      >
                                        <img
                                          src={
                                            fav && fav.listing && fav.listing.images &&
                                            fav.listing.images[0].location
                                          }
                                          style={{
                                            height: '160px',
                                            width: '100%',
                                            borderRadius: 20,
                                          }}
                                        />
                                      </a>
                                    </Grid>
                                  ))
                                  .splice(0, 4)}
                            </Grid>
                          ) : (
                            <h3>No favorites added yet...</h3>
                          )}
                        </>
                      ) : (
                        <Grid container spacing={1}>
                          <Grid item xs={12} sm={6}>
                            <Skeleton
                              variant="rectangular"
                              height={172}
                              style={{ borderRadius: 20 }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Skeleton
                              variant="rectangular"
                              height={172}
                              style={{ borderRadius: 20 }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Skeleton
                              variant="rectangular"
                              height={172}
                              style={{ borderRadius: 20 }}
                            />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Skeleton
                              variant="rectangular"
                              height={172}
                              style={{ borderRadius: 20 }}
                            />
                          </Grid>
                        </Grid>
                      )}
                    </Fade>
                  </Box>
                </Card>
              </Box>
            </Grid>
          </Grid>
          <Box
            display={'flex'}
            flex={1}
            mt={5}
            flexWrap={'wrap'}
            height={'400px'}
          >
            <Card>
              <Box
                display={'flex'}
                flexWrap={'wrap'}
                width={'100%'}
                p={3}
                justifyContent={'space-between'}
              >
                <DashboardHeaderText>Messages</DashboardHeaderText>
                <a href={`/messages`}>View All</a>
              </Box>
              <Divider />
              <Fade in={true}>
                <Box width={'100%'} p={3}>
                  <MessageContainer>
                    <Box
                      display={'flex'}
                      flexWrap={'wrap'}
                      width={'25%'}
                      alignItems={'center'}
                      alignContent={'center'}
                    >
                      <AvatarImgContainer>
                        <AvatarImg
                          src={
                            process.env.PUBLIC_URL + '/logo-notitle-white.svg'
                          }
                        />
                      </AvatarImgContainer>
                      <DashboardHeaderText>Tom Harry</DashboardHeaderText>
                    </Box>
                    <DashboardVerticalDivider />
                    <Box display={'flex'} p={1}>
                      <MessageText>
                        To protect your payment, never transfer money or
                        communicate outside of the Beyond Boatsn website and
                        app. To protect your payment, never transfer money or
                        communicate outside of the Beyond Boatsn website and
                        app.
                      </MessageText>
                    </Box>
                    <Box display={'flex'} p={1}>
                      <img src={process.env.PUBLIC_URL + '/message.svg'} />
                    </Box>
                  </MessageContainer>
                  <MessageContainer>
                    <Box
                      display={'flex'}
                      flexWrap={'wrap'}
                      width={'25%'}
                      alignItems={'center'}
                      alignContent={'center'}
                    >
                      <AvatarImgContainer>
                        <AvatarImg
                          src={
                            process.env.PUBLIC_URL + '/logo-notitle-white.svg'
                          }
                        />
                      </AvatarImgContainer>
                      <DashboardHeaderText>Tom Harry</DashboardHeaderText>
                    </Box>
                    <DashboardVerticalDivider />
                    <Box display={'flex'} p={1}>
                      <MessageText>
                        To protect your payment, never transfer money or
                        communicate outside of the Beyond Boatsn website and
                        app. To protect your payment, never transfer money or
                        communicate outside of the Beyond Boatsn website and
                        app.
                      </MessageText>
                    </Box>
                    <Box display={'flex'} p={1}>
                      <img src={process.env.PUBLIC_URL + '/message.svg'} />
                    </Box>
                  </MessageContainer>
                  <MessageContainer>
                    <Box
                      display={'flex'}
                      flexWrap={'wrap'}
                      width={'25%'}
                      alignItems={'center'}
                      alignContent={'center'}
                    >
                      <AvatarImgContainer>
                        <AvatarImg
                          src={
                            process.env.PUBLIC_URL + '/logo-notitle-white.svg'
                          }
                        />
                      </AvatarImgContainer>
                      <DashboardHeaderText>Tom Harry</DashboardHeaderText>
                    </Box>
                    <DashboardVerticalDivider />
                    <Box display={'flex'} p={1}>
                      <MessageText>
                        To protect your payment, never transfer money or
                        communicate outside of the Beyond Boatsn website and
                        app. To protect your payment, never transfer money or
                        communicate outside of the Beyond Boatsn website and
                        app.
                      </MessageText>
                    </Box>
                    <Box display={'flex'} p={1}>
                      <img src={process.env.PUBLIC_URL + '/message.svg'} />
                    </Box>
                  </MessageContainer>
                </Box>
              </Fade>
            </Card>
          </Box>
          <Fade in={true}>
            {view_mode === 'renter' ? (
              <Grid container spacing={5} mt={1}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                  <DashboardButton
                    onClick={() => history.push('/destinations')}
                  >
                    Explore
                  </DashboardButton>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                  <DashboardButton onClick={() => history.push('/')}>
                    Reviews
                  </DashboardButton>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                  <DashboardButton onClick={() => history.push('/trips')}>
                    Trips
                  </DashboardButton>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                  <DashboardButton onClick={handleSwitchToOwner}>
                    Switch to Owner
                  </DashboardButton>
                </Grid>
              </Grid>
            ) : (
              <Grid container spacing={5} mt={1}>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                  <DashboardButton
                    onClick={() => history.push('/create-listing')}
                  >
                    Create New Listing
                  </DashboardButton>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                  <DashboardButton onClick={() => history.push('/reviews')}>
                    Reviews
                  </DashboardButton>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                  <DashboardButton onClick={() => history.push('/bookings')}>
                    Bookings
                  </DashboardButton>
                </Grid>
                <Grid item xs={12} sm={12} md={6} lg={6} xl={3}>
                  <DashboardButton onClick={handleSwitchToRenter}>
                    Switch to Renter
                  </DashboardButton>
                </Grid>
              </Grid>
            )}
          </Fade>
        </>
      </DashboardLayout>
      <Footer no_margin={true} />
    </>
  );
}

export const MessageText = styled.p`
  font-family: GilroyMedium;
  font-size: 0.85vw;
  color: #000000;
`;

export const MessageContainer = styled.div`
  display: flex;
  padding: 15px;
  align-items: center;
  justify-content: space-between;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 10px;
  height: 78px;
  width: 100%;
  margin-bottom: 10px;

  &&:hover {
    background: #f7f7f7;
  }
`;
