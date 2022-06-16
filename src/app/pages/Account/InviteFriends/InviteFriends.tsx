/**
 *
 * Account
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { Container, Stack, Divider, Box, Button, IconButton, Grid, Paper, InputBase } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { SettingsHeader, SettingsBox, SettingsLabel, SettingsText, SettingsCard} from '../index';
import invite from '../../../assets/invites/mail.svg';
import discount from '../../../assets/invites/discount.svg';
import book from '../../../assets/invites/discount.svg';
import { CommonQuestions } from './CommonQuestions'
import {BasicModal} from '../../../components/modals';
import {DefaultButton} from '../../../components/buttons';
import { useSelector, useDispatch } from 'react-redux';
import { selectInviteSuccess, selectLoading, selectUser } from '../slice/selectors';
import { useAccountSlice } from '../slice';



import './invite.scss'

interface Props {
  user:any,
  actions:any
}



export function InviteFriends(props: Props) {

  const { actions } = useAccountSlice();
  const dispatch = useDispatch();

  const [inviteEmail, setInviteEmail] = React.useState('');
  const [inviteModal, setInviteModal] = React.useState(false);
  const [inviteLink, setInviteLink] = React.useState('https://www.waterpin.com');
  const [invitationCheck, setInvitationCheck] = React.useState(false);
  const [copy, setCopy] = React.useState(false);

  const loading = useSelector(selectLoading)
  const invite_success = useSelector(selectInviteSuccess)
  const user = useSelector(selectUser)

  // React.useEffect(() => {
  //   setTimeout(() => dispatch(actions.resetInviteModal()), 0);
  // },[])

  React.useEffect(() => {
    if(invite_success !== null && invite_success !== undefined && invite_success === true){
      setInviteModal(true);
      setTimeout(() => dispatch(actions.resetInviteModal()), 3000);
    }
  },[invite_success])

  const handleCopy = (e) => {
    navigator.clipboard.writeText(inviteLink);
    setCopy(true);

    setTimeout(function () {
      setCopy(false);
    }, 9000);
  };

  function handleInviteFriend(e:any) {
    setInvitationCheck(false);
    let invitation;
    let invitationCheck = false;
    let isEmail = false;
    var phone = /^\d{10}$/;
    if (/\S+@\S+\.\S+/.test(inviteEmail)) {
      invitation = {
        "email": inviteEmail
      }
      invitationCheck = true;
      isEmail = true
    } else if (inviteEmail.match(phone)) {
      invitation = {
        "phoneNumber": inviteEmail
      }
      invitationCheck = true;
    } else {
      invitationCheck = false;
      setInvitationCheck(true);
    }

    //Invite API
    if (invitationCheck === true) {
      if (isEmail === true) {
        setTimeout(() => dispatch(actions.inviteFriend({isEmail:true, inviteEmail:inviteEmail})), 0);
      }else{
        setTimeout(() => dispatch(actions.inviteFriend({isEmail:false, invitePhone:inviteEmail})), 0);
      }
    }
  }

  return (
    <>
      <Helmet>
        <title>Account Settings</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <BasicModal onClose={()=>setInviteModal(false)} open={inviteModal} title={'Congratulations!'}>
        <Box display={'flex'} flexDirection={'column'} width={'100%'} alignItems={'center'} textAlign="center">
        <p>You have succesfully invited {inviteEmail}.</p>
        <DefaultButton onClick={()=>setInviteModal(false)} text="OK"/>
        </Box>
      </BasicModal>
      <SettingsBox>
      <Grid container spacing={1} mt={3}>
          <Grid item sm={12} textAlign={'center'}>
              <h2>Join The Waterpin Community</h2>
              <p className="how-it-works">HOW IT WORKS?</p>
          </Grid>
          <Grid item sm={12} md={4}>
              <div className='grid-img'>
                <img src={invite} style={{ width: '40px', height: '50px' }} />
              </div>
              <h4>Invite Friends Who Are New.</h4>
              <p>
                Invite people who don't have an account yet to sign up through
                your link.
              </p>
          </Grid>
          <Grid item sm={12} md={4}>
              <div className='grid-img'>
                <img src={discount} style={{ width: '50px', height: '50px' }} />
              </div>
              <h4>You both get a discount!</h4>
              <p>
                Once a friend signs up with your link you both can get up to
                $200 off your next trip.
              </p>
          </Grid>
          <Grid item sm={12} md={4}>
              <div className='grid-img'>
                <img src={book} style={{ width: '55px', height: '50px' }} />
              </div>
              <h4>Don't forget to book!</h4>
              <p>
                Once you both get your discount. You can use this towards any
                qualifying booking.
              </p>
          </Grid>
        </Grid>
        <div className="share-container">
          <Grid container spacing={2}>
              <Grid item sm={12} md={8}>
              <h3>Share WaterPin with Friends</h3>
              <p>Invite friends who've never tried WaterPin</p>
              <div className='field-container'>
                <InputBase
                    name={'email-phone'}
                    sx={{ ml: 1, flex:1}}
                    value={inviteEmail}
                    placeholder={'Email Address or Phone Number'}
                    inputProps={{ 'aria-label': 'phone number' }}
                    onChange={(e)=>setInviteEmail(e.target.value)}
                  />
                  <button className='field-btn' onClick={(e) => handleInviteFriend(e)}>
                    Send
                  </button>
              </div>
              <div className='field-container'>
                <p>{inviteLink}</p>
                {copy
                ? (
                  <p><b>Copied!</b></p>
                )
                : (
                  <a className="copy-link" onClick={(e) => handleCopy(e)}>
                    Copy Link
                  </a>
                )
                }

              </div>
              </Grid>
              <Grid item sm={12} md={4}>
                <h3 className="track-header">Invite 3 friends and get a bonus reward!</h3>
                <div className='track-wrapper'>
                  <div className='heading'>Track your referrals</div>
                  <div className='record'>
                    <span className='float-left'> Completed referrals</span>
                    <span className='float-right'>0</span>
                  </div>
                </div>
              </Grid>
            </Grid>
          </div>
      </SettingsBox>
      <Box>
        <CommonQuestions />
      </Box>
    </>
  );
}

const Div = styled.div``;
