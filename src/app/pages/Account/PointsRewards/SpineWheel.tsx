import * as React from 'react';
import styled from 'styled-components/macro';
import {Grid} from '@mui/material';
export default function RankUp() { 
    return (
      <>
        <Grid container justifyContent="center">
          <Grid item lg={5}>
            <img
              style={{ width: '700px', height: '700px', left: '15em' }}
              src={process.env.PUBLIC_URL + '/Wheel.svg'}
            />
          </Grid>
          <Grid item lg={3}>
            <SpineWheelContent>
              Invite friends, rank up, and stay active for a chance to spin the
              wheel and earn
              <span>
                rewards up to $250!
              </span>
            </SpineWheelContent>
         
          </Grid>
        </Grid>
      </>
    );
}

export const SpineWheelContent = styled.p`
    font-size: 2em;
    line-height: 1.2em;
    top: 5em;
    position: relative;
    width: 9.5em;
    span{
        font-weight: bold;
        color: #333333;
        boxShadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
        border-radius: 20px;
    }

`;