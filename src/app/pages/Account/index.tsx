/**
 *
 * Account
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import { messages } from './messages';
import { Container, Stack, Divider, Box, Button, IconButton, Fade, Grid} from '@mui/material';
import { useAccountSlice } from './slice';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLoading,
  selectPayload,
  selectError,
  selectUser,
  selectSuccess
} from './slice/selectors';
import { Nav } from '../../components/Nav/index';
import { Footer } from '../../components/Footer';
import { AccountEdit } from './AccountEdit';
import { AccountPayments } from './AccountPayments';
import { LoginAndSecurity } from './LoginAndSecurity';
import { Notifications } from './Notifications';
import { InviteFriends } from './InviteFriends/InviteFriends';
import { PointsRewards } from './PointsRewards/index';
import { useAppSlice } from '../../slice';

interface Props {}

export function Account(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { t, i18n } = useTranslation();
  const [page_index, set_page_index] = React.useState(0);

  const { actions } = useAccountSlice();
  const { actions:appActions } = useAppSlice();
  const dispatch = useDispatch();

  const [user, set_user] = React.useState({username:'', firstName:'',lastName:'', profile_image:'', notifications:[], role_id:1, is_owner:false});


  const authUser = useSelector(selectUser)
  const loading = useSelector(selectLoading)
  const errors = useSelector(selectError)
  const success = useSelector(selectSuccess)
  const payload = useSelector(selectPayload)

  React.useEffect(() => {
    if(authUser !== null && authUser !== undefined){
      set_user(authUser)
    }
  },[authUser])

  React.useEffect(() => {
    setTimeout(() => dispatch(actions.loadAccount()), 100);
  },[])

  function renderSettingsView(index:number) {
      if (index === 0) {
        return <AccountEdit user={user} actions={actions}/>
      }else if (index === 1) {
        return <AccountPayments user={user} actions={actions}/>
      }else if (index === 2) {
        return <LoginAndSecurity user={user} actions={actions}/>
      }else if (index === 3) {
        return <Notifications user={user} actions={actions}/>
      }else if (index === 4) {
        return <InviteFriends user={user} actions={actions}/>
      }else if (index === 5) {
        return <PointsRewards user={user} actions={actions}/>
      }else{
        return null;
      }
  }

  function handlePageNumChange(index:number) {
    set_page_index(index)
  }

  return (
    <>
      <Helmet>
        <title>Account Settings</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Nav/>
      <Fade
         in={true}
         style={{ transformOrigin: '0 0 0' }}
         {...(true ? { timeout: 1000 } : {})}
       >
      <Container>
        <SettingsFlex>

        <Grid container spacing={5}>
          <Grid item xs={12} sm={12} md={4} lg={4}>
            <SettingsCard>
              <SettingMenuItem selected={page_index === 0?true:false} onClick={()=>handlePageNumChange(0)}>Personal Information {page_index === 0 ? <img src={process.env.PUBLIC_URL + `/icons/menu-triangle.svg`}/>:null}</SettingMenuItem>
              <SettingMenuItem selected={page_index === 1?true:false} onClick={()=>handlePageNumChange(1)}>Payments & Payouts {page_index === 1 ? <img src={process.env.PUBLIC_URL + `/icons/menu-triangle.svg`}/>:null}</SettingMenuItem>
              <SettingMenuItem selected={page_index === 2?true:false} onClick={()=>handlePageNumChange(2)}>Login & Security {page_index === 2 ? <img src={process.env.PUBLIC_URL + `/icons/menu-triangle.svg`}/>:null}</SettingMenuItem>
              <SettingMenuItem selected={page_index === 3?true:false} onClick={()=>handlePageNumChange(3)}>Notifications {page_index === 3 ? <img src={process.env.PUBLIC_URL + `/icons/menu-triangle.svg`}/>:null}</SettingMenuItem>
              <SettingMenuItem selected={page_index === 4?true:false} onClick={()=>handlePageNumChange(4)}>Invite Friends {page_index === 4 ? <img src={process.env.PUBLIC_URL + `/icons/menu-triangle.svg`}/>:null}</SettingMenuItem>
              <SettingMenuItem selected={page_index === 5?true:false} onClick={()=>handlePageNumChange(5)}>Points & Rewards {page_index === 5 ? <img src={process.env.PUBLIC_URL + `/icons/menu-triangle.svg`}/>:null}</SettingMenuItem>
            </SettingsCard>
          </Grid>
          <Grid item xs={12} sm={12} md={8} lg={8}>
            {renderSettingsView(page_index)}
          </Grid>
        </Grid>
        </SettingsFlex>
        <br/>
        <br/>
      </Container>
      </Fade>
      <Footer/>

    </>
  );
}

const Div = styled.div``;

const SettingMenuItem = styled.div<{selected:boolean}>`
  display:flex;
  align-items:center;
  min-height:60px;
  background: #FFFFFF;
  margin-bottom:5px;
  padding: 10px 35px;
  justify-content:space-between;
  font-family: GilroyMedium;
  font-size: 20px;
  line-height: 23px;
  color: #828282;
  cursor:pointer;

  &&:hover{
    color: #000;
  }

  :first-child{
    border-radius:10px 10px 0px 0px;
  }
  :last-child{
    border-radius:0px 0px 10px 10px;
  }

  ${({ selected }) => selected === true && `
      padding: 30px 35px;
   `}
`;


const SettingsFlex = styled.div`
  display:flex;
  margin-top:60px;

`;

export const SettingsCard = styled.div`
  display:flex;
  flex-direction:column;
  width: 100%;
  height: auto;
  background: #F5F5F7;
  border-radius: 20px;
  padding:15px;
  margin-bottom:20px;
`;


export const SettingsHeader = styled.div`
  display:flex;
  width: 100%;
  justify-content:space-between;
  align-items:center;
`;

export const SettingsBox = styled.div`
  display:flex;
  width: 100%;
  background: #FFFFFF;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  border-radius: 15px;
  margin-bottom:10px;
  flex-direction:column;
  padding: 0px 25px;

`;

export const SettingsLabel = styled.h2`
  font-family: GilroyBold;
  font-size: 20px;
  line-height: 23px;
  margin-bottom:5px;
`;

export const SettingsText = styled.p`
  font-family: GilroyRegular;
  font-size: 20px;
  line-height: 23px;
  margin-top:0px;
`;
