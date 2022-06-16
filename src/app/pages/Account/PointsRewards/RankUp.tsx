import * as React from 'react';
import styled from 'styled-components/macro';
import {Grid} from '@mui/material';

export function RankUp() {

    return (
      <Grid container alignContent="center" direction="column">
        <Grid item>
          <Title>Why Rank Up?</Title>
        </Grid>
        <Grid item>
          <Grid container gap={{ xs: 1, sm: 2, md: 3, lg: 10 }}>
            <Grid item lg={3}>
              <RankUpItem>
                <ImagePlaceHolder>Imagess</ImagePlaceHolder>
              </RankUpItem>
              <div style={{ width: '15em' }}>
                <h2 style={{ fontSize: '1.2em', color: '#333333' }}>
                  Get Exclusive Access
                </h2>
                <p style={{ lineHeight: '1.5em', color: '#828282' }}>
                  Your ranking shows how you are as a guest on board. Certain
                  yachts may offer exclusive access to renters with higher
                  rankings.
                </p>
              </div>
            </Grid>
            <Grid item lg={3}>
              <RankUpItem>
                <ImagePlaceHolder>Imagess</ImagePlaceHolder>
              </RankUpItem>
              <div style={{ width: '15em' }}>
                <h2 style={{ fontSize: '1.2em', color: '#333333' }}>
                  Attract More Boats
                </h2>
                <p style={{ lineHeight: '1.5em', color: '#828282' }}>
                  The higher your ranking Namo boat owners will want you on
                  their vessel.
                </p>
              </div>
            </Grid>
            <Grid item lg={3}>
              <RankUpItem>
                <ImagePlaceHolder>Imagess</ImagePlaceHolder>
              </RankUpItem>
              <div style={{ width: '15em' }}>
                <h2 style={{ fontSize: '1.2em', color: '#333333' }}>
                  Spend Less & Get More
                </h2>
                <p style={{ lineHeight: '1.5em', color: '#828282' }}>
                  Owners may offer lower rates, discounts or premium amenities
                  based on their level of your ranking.
                </p>
              </div>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    );

}


export const RankUpItem = styled.div`
  width: 350px;
  height: 300px;
  background: #fafafa;
  border-radius: 20px;
  text-align: center;
`;
export const ImagePlaceHolder = styled.span`
  color: red;
  top: 7em;
  position: relative;
`;

export const Title = styled.h1`
  color: #333333;
  font-size: 1.3em;
`;








