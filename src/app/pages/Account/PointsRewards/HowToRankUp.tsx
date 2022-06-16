import * as React from 'react';
import styled from 'styled-components/macro';
import {Grid} from '@mui/material';


export default function HowToRankUp() {
    return (
     <Grid
       container
       justifyContent="center"
       direction="row"
       alignItems="center"
       style={{ height: '20vh', marginTop: '20em' }}
     >
       <Grid item>
         <h1 style={{ color: '#333333', fontSize: '36px' }}>How To Rank Up</h1>
       </Grid>

       <Grid container justifyContent="center" alignContent="center">
         <Grid item lg={2} style={{ position: 'relative' }}>
           <DotLines>1</DotLines>

           <p>Completing your profile: 5 points</p>
         </Grid>
         <Grid item lg={2}>
           <DotLines>2</DotLines>

           <p>Verify your profile: 10 points </p>
         </Grid>
         <Grid item lg={2}>
           <DotLines>3</DotLines>
           <p>Invite a friend: 15 points</p>
           <EndDotLines />
         </Grid>
       </Grid>

       <Grid container justifyContent="center">
         <Grid item lg={2}>
           <DotLines>4</DotLines>
           <p>Completing your profile: 5 points</p>
         </Grid>
         <Grid item lg={2}>
           <DotLines>5</DotLines>
           <p>Verify your profile: 10 points </p>
         </Grid>
         <Grid item lg={2}>
           <DotLines>6</DotLines>
           <p>Invite a friend: 15 points</p>
         </Grid>
       </Grid>
       {/*  <Grid container>
          <DotLines>7</DotLines>
          <p>Invite a friend: 15 points</p>
        </Grid> */}
        </Grid>
    )

}


export const DotLines = styled.h1`
  &:after {
    width: 10em;
    border-bottom: 0.1em dotted #bdbdbd;
    position: absolute;
    display: block;
    content: '';
    margin-top: -0.8em;
    margin-left: 0.2em;
  }
`;

export const EndDotLines = styled.div`
  width: 10em;
  height: 8em;
  border-radius: 40%;
  background-color: transparent;
  display: block;
  position: absolute;
  margin-top: -5em;
  margin-left: 13em;
  border-right: 0.3em dotted #bdbdbd;
`;
