/**
 *
 * SpinTheWheel
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  Container,
  Stack,
  Box,
  Button,
  IconButton,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectActiveViewMode,
} from '../../slice/selectors';

interface Props {
  user:any;
  title?:string;
  children:React.ReactNode;
}



export function DashboardLayout(props: Props) {
  const view_mode = useSelector(selectActiveViewMode);

  const history = useHistory();

  return (<>
        <PageFlex>
          <SideMenu>
            {view_mode === 'renter' ? (
              <DashboardIconHeader onClick={()=>history.push('/')}>
                <DashboardIcon
                  src={process.env.PUBLIC_URL + '/logo-notitle-white.svg'}
                />
              </DashboardIconHeader>
            ) : (
              <DashboardIconHeader
                onClick={()=>history.push('/')}
                style={{ background: 'linear-gradient(0deg, #4285F4, #4285F4)' }}
              >
                <DashboardIcon
                  src={process.env.PUBLIC_URL + '/logo-notitle-white.svg'}
                />
              </DashboardIconHeader>
            )}

            <DashboardMenu>
              <Box
                display={'flex'}
                flexWrap={'wrap'}
                width={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}
                alignContent={'center'}
              >
                <DashboardHeaderIcon
                  src={process.env.PUBLIC_URL + '/icons/rope-left.svg'}
                />
                <DashboardSectionText>General</DashboardSectionText>
                <DashboardHeaderIcon
                  src={process.env.PUBLIC_URL + '/icons/rope-right.svg'}
                />
              </Box>

              <MenuItem onClick={() => history.push('/messages')}>
                <DashboardMenuIcon
                  src={process.env.PUBLIC_URL + '/icons/messagebubble.svg'}
                />
                <DashboardMenuLink>Messages</DashboardMenuLink>
              </MenuItem>
              <MenuItem onClick={() => history.push('/profile')}>
                <DashboardMenuIcon
                  src={process.env.PUBLIC_URL + '/icons/profile.svg'}
                />
                <DashboardMenuLink>Profile</DashboardMenuLink>
              </MenuItem>
              <MenuItem onClick={() => history.push('/account')}>
                <DashboardMenuIcon
                  src={process.env.PUBLIC_URL + '/icons/settings.svg'}
                />
                <DashboardMenuLink>Settings</DashboardMenuLink>
              </MenuItem>

              <Box
                display={'flex'}
                flexWrap={'wrap'}
                width={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}
                alignContent={'center'}
              >
                <DashboardHeaderIcon
                  src={process.env.PUBLIC_URL + '/icons/rope-left.svg'}
                />
                <DashboardSectionText>
                  {view_mode === 'renter' ? 'Renter' : 'Owner'}
                </DashboardSectionText>
                <DashboardHeaderIcon
                  src={process.env.PUBLIC_URL + '/icons/rope-right.svg'}
                />
              </Box>

              {view_mode === 'renter' ? (
                <>
                  <MenuItem onClick={() => history.push('/trips')}>
                    <DashboardMenuIcon
                      src={process.env.PUBLIC_URL + '/icons/globe.svg'}
                    />
                    <DashboardMenuLink>Trips</DashboardMenuLink>
                  </MenuItem>
                  <MenuItem onClick={() => history.push('/favorites')}>
                    <DashboardMenuIcon
                      src={process.env.PUBLIC_URL + '/icons/heart.svg'}
                    />
                    <DashboardMenuLink>My Favorites</DashboardMenuLink>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={() => history.push('/bookings')}>
                    <DashboardMenuIcon
                      src={process.env.PUBLIC_URL + '/booking.svg'}
                    />
                    <DashboardMenuLink>Bookings</DashboardMenuLink>
                  </MenuItem>
                  <MenuItem onClick={() => history.push('/my-fleet')}>
                    <DashboardMenuIcon
                      src={process.env.PUBLIC_URL + '/boat.svg'}
                    />
                    <DashboardMenuLink>My Fleet</DashboardMenuLink>
                  </MenuItem>
                </>
              )}

              <Box
                display={'flex'}
                flexWrap={'wrap'}
                width={'100%'}
                justifyContent={'space-between'}
                alignItems={'center'}
                alignContent={'center'}
              >
                <DashboardHeaderIcon
                  src={process.env.PUBLIC_URL + '/icons/rope-left.svg'}
                />
                <DashboardSectionText>Support</DashboardSectionText>
                <DashboardHeaderIcon
                  src={process.env.PUBLIC_URL + '/icons/rope-right.svg'}
                />
              </Box>

              <MenuItem onClick={() => history.push('/contact')}>
                <DashboardMenuIcon
                  src={process.env.PUBLIC_URL + '/icons/contact.svg'}
                />
                <DashboardMenuLink>Contact Us</DashboardMenuLink>
              </MenuItem>
              <MenuItem onClick={() => history.push('/help-center/')}>
                <DashboardMenuIcon
                  src={process.env.PUBLIC_URL + '/icons/help.svg'}
                />
                <DashboardMenuLink>Help</DashboardMenuLink>
              </MenuItem>
            </DashboardMenu>
            <DashboardMenu style={{height:'auto'}}>
            <MenuItem onClick={() => history.push('/help-center/')}>
              <DashboardMenuIcon
                src={process.env.PUBLIC_URL + '/login.svg'}
              />
              <DashboardMenuLink>Logout</DashboardMenuLink>
            </MenuItem>
            </DashboardMenu>
          </SideMenu>
          <DashboardContainer>
            <DashboardHeader>
              <DashboardHeaderText>{props.title || 'Dashboard'}</DashboardHeaderText>
              <Box>
                <DashboardHeaderText>
                  Welcome Back, {props.user.firstName || ''}
                </DashboardHeaderText>
                <DashboardHeaderSubtitle>
                  It pays to be loyal
                </DashboardHeaderSubtitle>
              </Box>
            </DashboardHeader>
            <DashboardBody>
              {props.children}
            </DashboardBody>
          </DashboardContainer>
        </PageFlex>

      </>);
}

const Div = styled.div``;

export const AccountCardLink = styled.a`
  margin-top:5px;
  cursor: pointer;
  color: #4285F4;
`;

export const DashboardHeaderIcon = styled.img`
  height: 45px;
  width: 45px;
`;

export const DashboardSectionText = styled.h3`
  font-family: GilroyBold;
  font-size: 20px;
  line-height: 23px;
`;
export const DashboardMenuIcon = styled.img`
  height: 25px;
  width: 25px;
  margin-right: 15px;
`;

export const DashboardMenuLink = styled.p`
  font-family: GilroyMedium;
  font-size: 18px;
  line-height: 21px;
`;

export const MenuItem = styled.a`
  display: flex;
  justify-content: flex-start;
  height: 45px;
  padding: 10px;
  align-items: center;
  margin-top: 5px;
  cursor: pointer;

  &&:hover {
    background: #f7f7f7;
    color: #00c2cb;
  }
`;

export const DashboardButton = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(179, 179, 179, 0.25);
  border-radius: 10px;
  transition: all ease-in-out 0.15s;
  font-family: GilroyBold;
  font-size: 1.2vw;
  line-height: 28px;
  text-align: center;
  cursor: pointer;

  &&:hover {
    background: #00c2cb;
    color: #fff;
  }
`;


export const DashboardVerticalDivider = styled.div`
  height: 100%;
  width: 1px;
  border: 1px solid #e0e0e0;
  opacity: 0.5;
  margin-right: 10px;
  margin-left: 10px;
`;

export const DashboardHeaderSubtitle = styled.p`
  font-family: GilroyRegular;
  font-size: 18px;
  line-height: 21px;
  color: #000000;
  margin-top: 10px;
`;

export const DashboardHeaderText = styled.h3`
  font-family: GilroyBold;
  font-size: 1.2vw;
  line-height: 28px;
  color: #000000;
  margin-bottom: 0px;
  margin-top: 0px;
`;

export const DashboardMenu = styled.div`
  width: 100%;
  height: 100%;
  background: #fff;
  padding: 30px;
`;

export const DashboardIcon = styled.img`
  height: 60px;
  width: 60px;
`;

export const DashboardBody = styled.div`
  display: flex;
  width: 100%;
  flex-direction: column;
  flex-wrap: wrap;
  padding: 5px 60px;
`;

export const DashboardIconHeader = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  flex-wrap: wrap;
  cursor:pointer;
  background: linear-gradient(
    180deg,
    #00c2cb 0%,
    rgba(0, 194, 203, 0.76) 51.04%,
    #00c2cb 100%
  );
`;

export const DashboardHeader = styled.div`
  display: flex;
  width: 100%;
  height: 100px;
  justify-content: space-between;
  align-items: center;
  align-content: center;
  flex-direction: row;
  flex-wrap: wrap;
  background: #fff;
  box-shadow: 0px 4px 20px rgba(179, 179, 179, 0.25);
  margin-bottom: 30px;
  padding: 0px 25px;
`;

export const PageFlex = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-direction: row;
  flex-wrap: wrap;
  width: 100%;
  background:#F5F5F7;
`;

export const DashboardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-direction: column;
  height: 100%;
  flex: 1;
  flex-wrap: wrap;
`;

export const SideMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  max-width: 300px;
  flex: 1;
  background: #ffffff;
  box-shadow: 2px -4px 20px rgba(179, 179, 179, 0.25);

`;
