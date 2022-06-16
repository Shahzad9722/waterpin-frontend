/**
 *
 * Nav
 *
 */
import * as React from 'react';
import styled, { keyframes } from 'styled-components/macro';
import { media, sizes } from '../../../styles/media';
import { Logo } from './Logo';
import {
  useHistory,
  useParams,
  RouteComponentProps,
  withRouter,
} from 'react-router-dom';
import { ChangeEvent } from 'react';
import { useAppSlice } from '../../slice';
import { FaRegBell, FaCog, FaSignOutAlt } from 'react-icons/fa';
import { BsChevronDown, BsSearch } from 'react-icons/bs';
import {
  Menu,
  MenuItem,
  Avatar,
  Box,
  IconButton,
  Divider,
  ListItemIcon,
  TextField,
} from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';

import {
  selectUser,
  selectError,
  selectLoading,
  selectToken,
  selectSuccess,
  selectNotifications,
  selectActiveViewMode,
  selectLoginSuccess,
  selectLoginSuccessAfterVerify,
} from '../../slice/selectors';

interface Props {
  searchValue?: string;
  handleSearch?: any;
}

// export const NotifcationLink: React.FC<{notification:any}> = ({children, notification}) => {
//   const history = useHistory();
//   let actor = ''
//   actor = notification.actor.username
//   let verb = ''
//   verb = notification.type.verb
//
//   return (<ListItemContainer onClick={()=>{if(notification.url !== null){history.push(notification.url)}}}>
//       <Flex alignItems={'center'} pl={3} pr={3} pb={2} pt={2}>
//         <Box w={'3%'}>
//         {notification && notification.is_read === false
//         ? <UnreadIndicator/>
//         : null
//         }
//         </Box>
//
//
//         <Text ml={2} mr={1} color="white" size="12px" >
//
//         {notification && notification.type.id === 2
//         ? (` ${notification.actor.first_name}, ${verb}` ||  <Skeleton height="20px" />)
//         : (
//           <>
//           <Link variant="inverted" href={'/creators/'+notification.actor.slug}>@{actor}</Link>
//           { ` ${verb} ` ||  <Skeleton height="20px" />}
//           </>
//         )
//         }
//
//
//         </Text>
//       </Flex>
//       </ListItemContainer>
//   );
// }

export function Nav(props: Props) {
  const { actions } = useAppSlice();

  const [user, set_user] = React.useState({
    username: '',
    firstName: '',
    lastName: '',
    profile_image: '',
    notifications: [],
    role_id: 1,
    is_owner: false,
  });
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, set_open] = React.useState(false);
  const loginSuccess = useSelector(selectLoginSuccess);
  const loginSuccessAfterVerify = useSelector(selectLoginSuccessAfterVerify);
  const handleClick = event => {
    if (open) {
      set_open(false);
    } else {
      setAnchorEl(event.currentTarget);
      set_open(true);
    }
  };
  const handleClose = () => {
    set_open(false);
  };

  const history = useHistory();
  const dispatch = useDispatch();

  const [errorMsg, set_errorMsg] = React.useState('');
  const [errorActive, set_errorActive] = React.useState(false);

  const appUser = useSelector(selectUser);
  const appToken = useSelector(selectToken);
  const notifications = useSelector(selectNotifications);
  const loading = useSelector(selectLoading);
  const errors = useSelector(selectError);
  const view_mode = useSelector(selectActiveViewMode);

  const [isLoggedIn, set_isLoggedIn] = React.useState(false);

  // React.useEffect(() => {
  //   if(errors !== null && errors !== undefined){
  //     if(errors.hasOwnProperty('msg')){
  //       let msg = errors['msg']
  //       set_errorActive(true)
  //       set_errorMsg(msg)
  //     }
  //     setTimeout(() => {
  //         toast(
  //             {
  //               title: "Uh oh, something went wrong.",
  //               description: "Feeback submission failed. Please try again, or contact support for more assistance...",
  //               status: "error",
  //               position:"top-right",
  //               duration: 9000,
  //               isClosable: true,
  //             },
  //         );
  //     }, 100);
  //   }
  // },[errors])
  React.useEffect(() => {
    if (appUser !== null && appUser !== undefined) {
      set_user(appUser);
    }
  }, [appUser]);

  React.useEffect(() => {
    const userStorage = localStorage.getItem('user');
    if (userStorage !== null) {
      var parsedUser = JSON.parse(userStorage);
      set_user(parsedUser);
    }
    setTimeout(() => dispatch(actions.loadNotifications()), 100);
  }, []);

  React.useEffect(() => {
    if (
      appUser !== null &&
      appUser !== undefined &&
      appToken !== null &&
      appToken !== undefined
    ) {
      set_isLoggedIn(true);
    }
  }, [appUser, appToken]);

  function handleLogout(e: any) {
    setTimeout(() => dispatch(actions.logout()), 100);
  }

  function handleToggleSignup(e: any) {
    setTimeout(() => dispatch(actions.toggleSignupModal()), 100);
  }

  function handleToggleLogin(e: any) {
    setTimeout(() => dispatch(actions.toggleLoginModal()), 100);
  }

  function handleToggleNotifs(e: any) {
    setTimeout(() => dispatch(actions.toggleNotificationsModal()), 100);
  }
  console.log(window.location.pathname);
  return (
    <NavWrapper>
      <NavBar>
        {view_mode === 'owner' ? <Logo owner={true} /> : <Logo />}

        <NavLink>
          {window.location.pathname === '/destination' ? (
            <SearchDiv>
              <SearchField
                id="outlined-basic"
                label=" Where To Next"
                variant="outlined"
                value={props.searchValue}
                onChange={e => {
                  props.handleSearch(e.target.value);
                }}
              ></SearchField>
              <RoundButton>
                <i className="fa fa-search"></i>
              </RoundButton>
            </SearchDiv>
          ) : (
            <>
              <Item
                href="/listings/overnights/"
                target="_self"
                title=""
                rel="noopener noreferrer"
              >
                Overnight Stays
              </Item>
              <Item
                href="/listings/day-trips/"
                target="_self"
                title="Browse..."
                rel="noopener noreferrer"
              >
                Day Trips
              </Item>
              <Item
                href="/listings/water-activities/"
                target="_self"
                title="Messages"
                rel="noopener noreferrer"
              >
                Water Activities
              </Item>
            </>
          )}
        </NavLink>
        <Div>
          <div>
            <IconButton onClick={handleClick} size="small" sx={{ ml: 2 }}>
              <NavIcon
                src={process.env.PUBLIC_URL + '/menu.svg'}
                style={{ width: 30, height: 30 }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClick}
              onClick={handleClick}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  borderRadius: 5,
                  width: 235,
                  mt: 4,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
            >
              {isLoggedIn === false ? (
                <MenuSection>
                  <CustomMenuItem onClick={e => handleToggleLogin(e)}>
                    <ListItemIcon>
                      <NavIcon src={process.env.PUBLIC_URL + '/login.svg'} />
                    </ListItemIcon>
                    Log in
                  </CustomMenuItem>
                  <CustomMenuItem onClick={e => handleToggleSignup(e)}>
                    <ListItemIcon>
                      <NavIcon src={process.env.PUBLIC_URL + '/signup.svg'} />
                    </ListItemIcon>
                    Create Account
                  </CustomMenuItem>
                </MenuSection>
              ) : null}

              {isLoggedIn ? (
                <MenuSection>
                  <CustomMenuItem onClick={e => history.push('/dashboard')}>
                    <ListItemIcon>
                      <NavIcon
                        src={process.env.PUBLIC_URL + '/home-icon.svg'}
                      />
                    </ListItemIcon>
                    Dashboard
                  </CustomMenuItem>
                  <CustomMenuItem onClick={e => history.push('/messages')}>
                    <ListItemIcon>
                      <NavIcon src={process.env.PUBLIC_URL + '/email.svg'} />
                    </ListItemIcon>
                    Messages
                  </CustomMenuItem>
                  <CustomMenuItem onClick={e => handleToggleNotifs(e)}>
                    <ListItemIcon>
                      <NavIcon src={process.env.PUBLIC_URL + '/bell.svg'} />
                    </ListItemIcon>
                    Notifications
                  </CustomMenuItem>
                  <DottedDivider />
                  <CustomMenuItem onClick={e => history.push('/account')}>
                    <ListItemIcon>
                      <NavIcon src={process.env.PUBLIC_URL + '/settings.svg'} />
                    </ListItemIcon>
                    Account Settings
                  </CustomMenuItem>
                  <CustomMenuItem
                    onClick={e => history.push('/create-listing')}
                  >
                    <ListItemIcon>
                      <NavIcon
                        src={process.env.PUBLIC_URL + '/newlisting.svg'}
                      />
                    </ListItemIcon>
                    New Listing
                  </CustomMenuItem>
                  <DottedDivider />
                  <CustomMenuItem onClick={e => history.push('/help-center')}>
                    <ListItemIcon>
                      <NavIcon src={process.env.PUBLIC_URL + '/help.svg'} />
                    </ListItemIcon>
                    Help
                  </CustomMenuItem>
                  <CustomMenuItem onClick={e => handleLogout(e)}>
                    <ListItemIcon>
                      <NavIcon src={process.env.PUBLIC_URL + '/login.svg'} />
                    </ListItemIcon>
                    Logout
                  </CustomMenuItem>
                </MenuSection>
              ) : null}
              {isLoggedIn === false ? (
                <MenuSection>
                  <DottedDivider />
                  <CustomMenuItem>
                    <ListItemIcon>
                      <NavIcon
                        src={process.env.PUBLIC_URL + '/newlisting.svg'}
                      />
                    </ListItemIcon>
                    New Listing
                  </CustomMenuItem>
                  <CustomMenuItem onClick={e => history.push('/help-center')}>
                    <ListItemIcon>
                      <NavIcon src={process.env.PUBLIC_URL + '/help.svg'} />
                    </ListItemIcon>
                    Help
                  </CustomMenuItem>
                </MenuSection>
              ) : null}
            </Menu>
          </div>
          <div>
            {window.location.pathname === '/destination' ? (
              <OwnerButton>Switch to owner</OwnerButton>
            ) : null}
          </div>
        </Div>
      </NavBar>
    </NavWrapper>
  );
}

const Div = styled.div`
  display: flex;
  align-items: center;
`;

const SearchDiv = styled.div`
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const MenuSection = styled.div``;

const SearchField = styled(TextField)`
  fieldset {
    width: 335px;
    height: 65px;
    border-radius: 50px;
    border: 1px solid;
  }
  label {
    margin-left: 10px;
    font-family: GilroyMedium;
    font-size: 18px;
    color: #333333;
  }
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;

const RoundButton = styled.button`
  border-radius: 50%;
  height: 50px;
  width: 50px;
  padding: 10px 10px 10px 10px;
  color: #ffffff;
  background: #00c2cb;
  border: 0px;
  margin-left: 55px;
  margin-top: 5px;
  transform: rotate(90deg);
  cursor: pointer;
`;

const OwnerButton = styled.button`
  border: 0px;
  font-family: GilroyBold;
  padding: 10px 10px 10px 10px;
  font-size: 20px;
  line-height: 30px;
  align-items: center;
  cursor: pointer;
  text-align: center;
  color: #333333;
  background: #ffffff;
  border-radius: 15px;
  &:hover {
    color: #ffffff;
    background: #00c2cb;
  }
  @media only screen and (max-width: 600px) {
    display: none;
  }
  @media only screen and (max-width: 800px) and (min-width: 599.98px) {
    display: none;
  }
`;

const CustomMenuItem = styled(MenuItem)`
  && {
    min-height: 60px;
  }
`;

const DottedDivider = styled.div`
  border: 1px dashed #bdbdbd;
`;

const NavIcon = styled.img`
  width: 20px;
  height: 20px;
`;

const NavWrapper = styled.div`
  display: flex;
  align-items: center;
`;

const NavLink = styled.div`
  display: flex;
  align-items: center;
  margin-left: -60px;
`;

const NavBar = styled.nav`
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(179, 179, 179, 0.25);
  display: flex;
  margin-right: -1rem;
  align-items: center;
  width: 100%;
  height: 100px;
  justify-content: space-around;
`;

export const Item = styled.a`
  color: #000;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  padding: 0.25rem 1rem;
  font-size: 0.875rem;
  font-weight: 500;
  align-items: center;

  &:hover {
    opacity: 0.8;
    color: #00c2cb;
  }

  &:active {
    opacity: 0.4;
  }

  .icon {
    margin-right: 0.25rem;
  }

  @media (max-width: ${sizes.xsmall}px) {
    font-size: 0.55rem;
  }
`;
