/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import * as React from 'react';
import { Helmet } from 'react-helmet-async';
import { Switch, Route, BrowserRouter, Redirect } from 'react-router-dom';

import { GlobalStyle } from 'styles/global-styles';
import './../styles/global-styles'
import { Alert, Snackbar, Box } from '@mui/material';
import { CreateListing } from './pages/Listings/ListingCreation/CreateListing';
import { ListBoat } from './pages/Listings/ListingCreation/ListBoat';
import { ListYacht } from './pages/Listings/ListingCreation/ListYacht';
import { ListWaterActivity } from './pages/Listings/ListingCreation/ListWaterActivity';
import { ListingDetail } from './pages/Listings/ListingDetail';
import { Booking } from './pages/Listings/Booking/index';

import { Account } from './pages/Account/Loadable';
import { Dashboard } from './pages/Dashboard/Loadable';
import { MyFleet } from './pages/Dashboard/MyFleet';

import { Messages } from './pages/Messages/Loadable';
import { ProfilePage } from './pages/ProfilePage/Loadable';
import {PointsRewards} from "./pages/Account/PointsRewards/Loadable"

import { HomePage } from './pages/HomePage/Loadable';
import { Listings } from './pages/Listings/Loadable';
import { SignUp } from './components/SignUp/Loadable';
import { Login } from './components/Login/Loadable';
import { Trips } from './pages/Trips/Loadable';
import { OwnerBookings } from './pages/Trips/OwnerBookings';
import { Destinations } from './pages/Destinations';
import { Favorites } from './pages/Favorites';



import { HelpCenter } from './pages/HelpCenter/Loadable';

import { PublicHome } from './pages/HomePage/PublicHome';
import { Blog } from './pages/HomePage/Blog';
import { BlogDetail } from './pages/HomePage/BlogDetail';
import { Page } from './pages/HomePage/Page';

import styled, { keyframes } from 'styled-components/macro';

import { NotFoundPage } from './components/NotFoundPage/Loadable';
import { NotificationsModal } from './components/modals';
import { useTranslation } from 'react-i18next';
import { useAppSlice } from './slice';

import { Storyblok } from './storyblok';

import { useSelector, useDispatch } from 'react-redux';
import {
  selectLoading,
  selectPayload,
  selectError,
  selectUser,
  selectToken,
  selectSuccess,
  selectSignupModalOpen,
  selectLoginModalOpen,
  selectAppAlertOpen,
  selectAppAlertSeverity,
  selectAppAlert,
  selectNotificationsModalOpen,
  selectNotifications,
} from './slice/selectors';
import { WaterActivity } from './pages/WaterActivity';

const PrivateRoute = ({ component: Component, user: user, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = localStorage.getItem("user")


  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn !== undefined && isLoggedIn !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/', state: { from: props.location } }} />
        )
      }
    />
  )
}


const PrivateAdminRoute = ({ component: Component, user: user, ...rest }) => {
  // Add your own authentication on the below line.
  const isLoggedIn = localStorage.getItem("user")
  let parsedUser:any = null;
  let isAdmin = false;
  if (isLoggedIn) {
    parsedUser = JSON.parse(isLoggedIn)
    isAdmin = parsedUser.role_id >= 2
  }

  return (
    <Route
      {...rest}
      render={props =>
        isLoggedIn !== undefined && isLoggedIn !== null ? (
          <>
          {isAdmin
            ? (<Component {...props} />)
            : (<Redirect to={{ pathname: '/', state: { from: props.location } }} />)
          }
          </>
        ) : (
          <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
        )
      }
    />
  )
}




const HomeRoute = ({ component: Component, ...rest }) => {

  const pageRef = React.useRef(null);

  React.useEffect(() => {
    // In this case, whether we are mounting or remounting,
    // we use a ref so that we only log an impression once.
    if (pageRef.current === null) {
      let story:any = null;
      // Add your own authentication on the below line.
      story = Storyblok.get(`cdn/stories/home`, {
        version: process.env.REACT_APP_ENV === 'production' ? "published" : "draft"
      })
      .then(response => {
        //setTimeout(() => dispatch(dashboardActions.loadCMSData({data:response.data})), 0);
        console.log(response)
        pageRef.current = response.data.story;
        return response.data.story
      }).catch(error => {
        console.log(error)
        return null
      })


    }
    //console.log(didLogRef)

  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        {
          return <Component {...props} story={pageRef.current} />
        }
      }
    />
  )
}

const BlogRoute = ({ component: Component, ...rest }) => {

  const pageRef = React.useRef(null);

  React.useEffect(() => {
    // In this case, whether we are mounting or remounting,
    // we use a ref so that we only log an impression once.
    if (pageRef.current === null) {
      let story:any = null;
      // Add your own authentication on the below line.
      story = Storyblok.get(`cdn/stories`,{
        starts_with:"blog",
        version: process.env.REACT_APP_ENV === 'production' ? "published" : "draft"
      })
      .then(response => {
        //setTimeout(() => dispatch(dashboardActions.loadCMSData({data:response.data})), 0);
        //console.log(response)
        pageRef.current = response.data.stories;
        return response.data.stories
      }).catch(error => {
        console.log(error)
        return null
      })


    }
    //console.log(didLogRef)

  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        {
          return <Component {...props} blogs={pageRef.current} />
        }
      }
    />
  )
}


const HelpCenterRoute = ({ component: Component, ...rest }) => {

  const pageRef = React.useRef(null);

  React.useEffect(() => {
    // In this case, whether we are mounting or remounting,
    // we use a ref so that we only log an impression once.
    if (pageRef.current === null) {
      let story:any = null;
      // Add your own authentication on the below line.
      story = Storyblok.get(`cdn/stories`,{
        starts_with:"help-center",
        per_page:100,
        version: process.env.REACT_APP_ENV === 'production' ? "published" : "draft"
      })
      .then(response => {
        //setTimeout(() => dispatch(dashboardActions.loadCMSData({data:response.data})), 0);
        //console.log(response)
        pageRef.current = response.data.stories;
        return response.data.stories
      }).catch(error => {
        console.log(error)
        return null
      })


    }
    //console.log(didLogRef)

  }, []);

  return (
    <Route
      {...rest}
      render={props =>
        {
          return <Component {...props} articles={pageRef.current} />
        }
      }
    />
  )
}

const HelpCenterDetailRoute = ({ component: Component, ...rest }) => {

  const pageRef = React.useRef(null);
  const [notFound, set_notFound] = React.useState(false);

  React.useEffect(() => {

    let slug = rest.computedMatch.params.slug
    console.log(slug)

    // In this case, whether we are mounting or remounting,
    // we use a ref so that we only log an impression once.
    if (pageRef.current === null) {
      let story:any = null;
      // Add your own authentication on the below line.
      story = Storyblok.get(`cdn/stories/help-center/${slug}`, {
          version: process.env.REACT_APP_ENV === 'production' ? "published" : "draft"
        }
      )
      .then(response => {
        pageRef.current = response.data.story;
        return response.data.story
      }).catch(error => {
        console.log(error)
        set_notFound(true)
        return null
      })
    }
    //console.log(didLogRef)

  }, []);

  if (notFound === true) {
    return (
      <Route
        {...rest}
        render={props =>
          (
            <Route component={NotFoundPage} />
          )
        }
      />
    )
  }

  return (
    <Route
      {...rest}
      render={props =>
        {
          return <Component {...props} story={pageRef.current} />
        }
      }
    />
  )
}

const BlogDetailRoute = ({ component: Component, ...rest }) => {

  const pageRef = React.useRef(null);
  const [notFound, set_notFound] = React.useState(false);

  React.useEffect(() => {

    let slug = rest.computedMatch.params.slug
    console.log(slug)

    // In this case, whether we are mounting or remounting,
    // we use a ref so that we only log an impression once.
    if (pageRef.current === null) {
      let story:any = null;
      // Add your own authentication on the below line.
      story = Storyblok.get(`cdn/stories/blog/${slug}`, {
          version: process.env.REACT_APP_ENV === 'production' ? "published" : "draft"
        }
      )
      .then(response => {
        pageRef.current = response.data.story;
        return response.data.story
      }).catch(error => {
        console.log(error)
        set_notFound(true)
        return null
      })
    }
    //console.log(didLogRef)

  }, []);

  if (notFound === true) {
    return (
      <Route
        {...rest}
        render={props =>
          (
            <Route component={NotFoundPage} />
          )
        }
      />
    )
  }

  return (
    <Route
      {...rest}
      render={props =>
        {
          return <Component {...props} story={pageRef.current} />
        }
      }
    />
  )
}





const CMSRoute = ({ component: Component, ...rest }) => {

  const pageRef = React.useRef(null);
  const [notFound, set_notFound] = React.useState(false);

  React.useEffect(() => {

    let slug = rest.computedMatch.params.slug
    console.log(rest)

    // In this case, whether we are mounting or remounting,
    // we use a ref so that we only log an impression once.
    if (pageRef.current === null) {
      let story:any = null;
      // Add your own authentication on the below line.
      story = Storyblok.get(`cdn/stories/${slug}`, {
        version: process.env.REACT_APP_ENV === 'production' ? "published" : "draft"
      })
      .then(response => {
        pageRef.current = response.data.story;
        return response.data.story
      }).catch(error => {
        console.log(error)
        set_notFound(true)
        return null
      })
    }
    //console.log(didLogRef)

  }, []);

  if (notFound === true) {
    return (
      <Route
        {...rest}
        render={props =>
          (
            <Route component={NotFoundPage} />
          )
        }
      />
    )
  }

  return (
    <Route
      {...rest}
      render={props =>
        {
          return <Component {...props} story={pageRef.current} />
        }
      }
    />
  )
}


export function App() {
  const { i18n } = useTranslation();

  const { actions } = useAppSlice();
  const dispatch = useDispatch();

  const authUser = useSelector(selectUser);
  const loading = useSelector(selectLoading);
  const errors = useSelector(selectError);
  const success = useSelector(selectSuccess);
  const payload = useSelector(selectPayload);
  const notifications = useSelector(selectNotifications);

  const isSignupOpen = useSelector(selectSignupModalOpen);
  const isLoginOpen = useSelector(selectLoginModalOpen);

  const isAlertOpen = useSelector(selectAppAlertOpen);
  const isNotificationsModalOpen = useSelector(selectNotificationsModalOpen);

  const alertMsg = useSelector(selectAppAlert);
  const alertSeverity = useSelector(selectAppAlertSeverity);

  const [user, set_user] = React.useState({ id: 0 });

  React.useEffect(() => {
    const view = localStorage.getItem('viewmode');
    console.log(view);
    if (view) {
      setTimeout(() => dispatch(actions.set_view_mode({ view: view })), 0);
    }

    const userCookie = localStorage.getItem('user');
    const expires_at = localStorage.getItem('expires_at');
    const orig_iat = localStorage.getItem('orig_iat');
    const tokenCookie = localStorage.getItem('token');

    const now = new Date();

    if (tokenCookie !== null && userCookie !== null && expires_at !== null) {
      const parsedUser = JSON.parse(userCookie);

      set_user(parsedUser);
      dispatch(actions.set_authUser(parsedUser));
      dispatch(actions.set_authToken(tokenCookie));
      //set_isLoggedIn(true)

      let now = new Date();
      let expiresAt = new Date(parseInt(expires_at) * 1000);

      if (now > expiresAt) {
        setTimeout(() => dispatch(actions.logout()), 100);
      }
    }
  }, []);

  function handleToggleSignup(e: any) {
    setTimeout(() => dispatch(actions.toggleSignupModal()), 100);
  }

  function handleToggleLogin(e: any) {
    setTimeout(() => dispatch(actions.toggleLoginModal()), 100);
  }

  function handleCloseAlert(e: any) {
    setTimeout(() => dispatch(actions.closeNotify()), 100);
  }

  function handleToggleNotificationsModal(e: any) {
    setTimeout(() => dispatch(actions.toggleNotificationsModal()), 100);
  }

  return (
    <BrowserRouter>
      <Helmet
        titleTemplate="%s - Waterpin"
        defaultTitle="Waterpin - The water platform for everyone."
        htmlAttributes={{ lang: i18n.language }}
      >
        <meta name="description" content="The water platform for everyone." />
      </Helmet>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={isAlertOpen}
        autoHideDuration={10000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alertSeverity}
          sx={{
            width: '100%',
            fontSize: 18,
            alignItems: 'center',
            borderRadius: '25px',
          }}
        >
          {alertMsg}
        </Alert>
      </Snackbar>
      <SignUp open={isSignupOpen} onClose={handleToggleSignup} />
      <Login open={isLoginOpen} onClose={handleToggleLogin} />
      <NotificationsModal
        open={isNotificationsModalOpen}
        onClose={handleToggleNotificationsModal}
        title={'Notifications'}
      >
        {notifications && notifications.length > 0 ? (
          <>
            {notifications.map(notif => (
              <NotificationContainer>
                <Box p={2}>
                  <NotificationAvatar>
                    <img src={process.env.PUBLIC_URL + '/pin.svg'} />
                  </NotificationAvatar>
                </Box>
                <Box p={2} flex={1}>
                  <h4 style={{ marginTop: 0, marginBottom: 0 }}>
                    {notif.type.type === 'system'
                      ? 'Waterpin'
                      : notif.type.type === 'user'
                      ? 'New Message'
                      : 'Notification'}
                  </h4>
                  <p style={{ marginTop: 1 }}>{notif.type.verb}</p>
                </Box>
                <Box p={1}>
                  <p>23min</p>
                </Box>
              </NotificationContainer>
            ))}
          </>
        ) : (
          <Box flex={1}>
            <h3 style={{ marginTop: 0, marginBottom: 0 }}>
              No notifications found.
            </h3>
          </Box>
        )}
      </NotificationsModal>
      <Switch>
        <CMSRoute exact path="/site/:slug" component={Page} />
        <BlogRoute exact path="/blog" component={Blog} />
        <BlogDetailRoute exact path="/blog/:slug" component={BlogDetail} />
        <HelpCenterRoute exact path="/help-center" component={HelpCenter} />
        <HelpCenterRoute exact path="/help-center/:folder" component={HelpCenter} />
        <HelpCenterRoute exact path="/help-center/:folder/:slug" component={HelpCenter} />

        {/* // Renter Views */}
        <Route exact path="/" component={HomePage} />
        <Route exact path="/forgot" component={HomePage} />
        <PrivateRoute exact path="/dashboard" user={user} component={Dashboard}/>
        {/* <PrivateRoute exact path="/messages" user={user} component={Messages} /> */}
        <Route exact path="/messages" component={Messages} />
        <PrivateRoute
          exact
          path="/destinations"
          user={user}
          component={Destinations}
        />
        <PrivateRoute exact path="/account" user={user} component={Account} />
        <Route exact path="/rewards" component={PointsRewards} />
        <Route exact path="/listings/overnights/" component={Listings} />
        <Route exact path="/listings/day-trips/" component={Listings} />
        <Route exact path="/listings/water-activities/" component={WaterActivity} />
        <Route exact path="/listings/detail/:id" component={ListingDetail} />
        <PrivateRoute
          exact
          path="/favorites"
          user={user}
          component={Favorites}
        />
        <PrivateRoute exact path="/profile" user={user} component={ProfilePage} />
        <PrivateRoute exact path="/book/listing/:id" user={user} component={Booking} />
        <PrivateRoute exact path="/trips/" user={user} component={Trips} />
        <PrivateRoute exact path="/bookings/" user={user} component={OwnerBookings} />

        {/* // Owner Links */}
        <PrivateRoute
          exact
          path="/create-listing/"
          user={user}
          component={CreateListing}
        />
        <PrivateRoute
          exact
          path="/create-listing/boat/"
          user={user}
          component={ListBoat}
        />
        <PrivateRoute
          exact
          path="/create-listing/yacht/"
          user={user}
          component={ListYacht}
        />
        <PrivateRoute
          exact
          path="/create-listing/water-activity/"
          user={user}
          component={ListWaterActivity}
        />
        <PrivateRoute
          exact
          path="/create-listing/boat/:id"
          user={user}
          component={ListBoat}
        />
        <PrivateRoute
          exact
          path="/create-listing/yacht/:id"
          user={user}
          component={ListYacht}
        />
        <PrivateRoute
          exact
          path="/create-listing/water-activity/:id"
          user={user}
          component={ListWaterActivity}
        />
        <PrivateRoute
          exact
          path="/my-fleet/"
          user={user}
          component={MyFleet}
        />
        <PrivateRoute
          exact
          path="/my-fleet/:id"
          user={user}
          component={MyFleet}
        />
        <Route component={NotFoundPage} />
      </Switch>
      <GlobalStyle />
    </BrowserRouter>
  );
}

const NotificationContainer = styled.div`
  display: flex;
  background: #ffffff;
  border: 1px solid #e0e0e0;
  box-sizing: border-box;
  border-radius: 10px;
  max-height: 88px;
`;

const NotificationAvatar = styled.div`
  background: #ffffff;
  border: 1px solid #bdbdbd;
  box-sizing: border-box;
  width: 48px;
  height: 48px;
  border-radius: 75px;
  align-items: center;
  justify-content: center;
  flex-direction: row;
  display: flex;
`;
