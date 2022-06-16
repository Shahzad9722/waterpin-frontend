/**
 *
 * Account
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import { useTranslation } from 'react-i18next';
import { messages } from './messages';
import { Container, Stack, Divider, Box, Button, IconButton, Fade } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { SettingsHeader, SettingsBox, SettingsLabel, SettingsText, SettingsCard} from './index';
import { CardBase, CardBaseHeaderFlex} from '../../components/layout';
import { DefaultSwitch} from '../../components/input';
import { useSelector, useDispatch } from 'react-redux';

import {
  selectLoading,
  selectError,
  selectNotificationSettings,
  selectSuccess
} from './slice/selectors';

interface Props {
  user:any,
  actions:any
}

export function Notifications(props: Props) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const dispatch = useDispatch();


  const notif_settings = useSelector(selectNotificationSettings)

  const loading = useSelector(selectLoading)

  const [notifSettings, set_notifSettings] = React.useState({
    booking_expire_notifications: 0,
    cancelations_notifications: 0,
    discount_special_credit_notifications: 0,
    get_review_notifications: 0,
    important_messages_news_announcement_notifications: 0,
    leave_review_notifications: 0,
    messages_notifications: 0,
    reminders_tips_notifications: 0,
    unsubscribe_marketing_emails: 0,
    upcoming_trips_notifications: 0,
  });


  function handleNotificationsChange(event:any) {

    const { name, checked } = event.target;

    if (checked) {
      setTimeout(() => dispatch(props.actions.updateNotificationSettings({
        name:name, value:1
      })), 0);

    }else{
      setTimeout(() => dispatch(props.actions.updateNotificationSettings({
        name:name, value:0
      })), 0);
    }

    console.log(event)


  }

  return (
    <>
      <Helmet>
        <title>Account Settings</title>
        <meta name="description" content="The water platform for everyone" />
      </Helmet>
      <Fade in={true}>
        <SettingsCard>
          <SettingsBox>
            <SettingsHeader>
              <SettingsLabel style={{marginTop:45,marginBottom:20, paddingLeft:20}} >View and update your notification preferences:</SettingsLabel>
            </SettingsHeader>
            <Box mt={1}>
              <CardBase style={{borderRadius:"10px"}}>
                <CardBaseHeaderFlex>
                  <p>Notify me of my upcoming trips</p>
                  <DefaultSwitch name="upcoming_trips_notifications" checked={notif_settings.upcoming_trips_notifications || false} onChange={handleNotificationsChange}/>
                </CardBaseHeaderFlex>
              </CardBase>
            </Box>
            <Box mt={1}>
              <CardBase style={{borderRadius:"10px"}}>
                <CardBaseHeaderFlex>
                  <p>Notify me when someone sends a message</p>
                  <DefaultSwitch name="messages_notifications" checked={notif_settings.messages_notifications || false} onChange={handleNotificationsChange}/>
                </CardBaseHeaderFlex>
              </CardBase>
            </Box>
            <Box mt={1}>
              <CardBase style={{borderRadius:"10px"}}>
                <CardBaseHeaderFlex>
                  <p>Important messages, news and announcements</p>
                  <DefaultSwitch name="important_messages_news_announcement_notifications" checked={notif_settings.important_messages_news_announcement_notifications || false} onChange={handleNotificationsChange}/>
                </CardBaseHeaderFlex>
              </CardBase>
            </Box>
            <Box mt={1}>
              <CardBase style={{borderRadius:"10px"}}>
                <CardBaseHeaderFlex>
                  <p>Reminders and tips to get the most out of Waterpin </p>
                  <DefaultSwitch name="reminders_tips_notifications" checked={notif_settings.reminders_tips_notifications || false} onChange={handleNotificationsChange}/>
                </CardBaseHeaderFlex>
              </CardBase>
            </Box>
            <Box mt={1}>
              <CardBase style={{borderRadius:"10px"}}>
                <CardBaseHeaderFlex>
                  <p>Notify me of cancelations</p>
                  <DefaultSwitch name="cancelations_notifications" checked={notif_settings.cancelations_notifications || false} onChange={handleNotificationsChange}/>
                </CardBaseHeaderFlex>
              </CardBase>
            </Box>
            <Box mt={1}>
              <CardBase style={{borderRadius:"10px"}}>
                <CardBaseHeaderFlex>
                  <p>Notify me when I get a review</p>
                  <DefaultSwitch name="get_review_notifications" checked={notif_settings.get_review_notifications || false} onChange={handleNotificationsChange}/>
                </CardBaseHeaderFlex>
              </CardBase>
            </Box>
            <Box mt={1}>
              <CardBase style={{borderRadius:"10px"}}>
                <CardBaseHeaderFlex>
                  <p>Reminder to leave a review</p>
                  <DefaultSwitch name="leave_review_notifications" checked={notif_settings.leave_review_notifications || false} onChange={handleNotificationsChange}/>
                </CardBaseHeaderFlex>
              </CardBase>
            </Box>
            <Box mt={1}>
              <CardBase style={{borderRadius:"10px"}}>
                <CardBaseHeaderFlex>
                  <p>Notification when a booking expires</p>
                  <DefaultSwitch name="booking_expire_notifications"  checked={notif_settings.booking_expire_notifications || false} onChange={handleNotificationsChange}/>
                </CardBaseHeaderFlex>
              </CardBase>
            </Box>
            <Box mt={1} mb={6}>
              <CardBase style={{borderRadius:"10px"}}>
                <CardBaseHeaderFlex>
                  <p>Unsubscribe from all marketing emails</p>
                  <DefaultSwitch name="unsubscribe_marketing_emails" checked={notif_settings.unsubscribe_marketing_emails || false} onChange={handleNotificationsChange}/>
                </CardBaseHeaderFlex>
              </CardBase>
            </Box>
          </SettingsBox>

        </SettingsCard>
      </Fade>
    </>
  );
}

const Div = styled.div``;
