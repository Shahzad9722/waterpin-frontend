import * as React from 'react';
import styled from 'styled-components/macro';
import { Grid, Paper } from '@mui/material';

export default function RewardRank() {
    const RewardsPoints = [
      {
        points: 0,
        content: 'Basic access and usage',
        color: '',
      },
      {
        points: 150,
        content: 'Basic access and usage',
        color: '',
      },
      {
        points: 350,
        content: 'Basic access and usage',
        color: '',
      },
      {
        step: 750,
        content: 'Basic access and usage',
        color: '',
      },
      {
        step: 1500,
        content: 'Basic access and usage',
        color: '',
      },
    ];

    return (
      <Grid
        container
        style={{ height: '20vh', marginTop: '20em' }}
        justifyContent="center"
      >
        <Grid item style={{ marginBottom: '5em' }}>
          <h1>Rank Rewards</h1>
        </Grid>
        <Grid
          container
          direction="row"
          alignContent="center"
          justifyContent="center"
        >
          <Grid item lg={4}>
            <Grid container>
              <Grid
                item
                lg={2}
                style={{ marginRight: '1.5em', marginBottom: '7.4em' }}
              >
                <RankRewardsItem>
                  <h2>0</h2>
                </RankRewardsItem>
              </Grid>
              <Grid item lg={8}>
                <RankRewardTitle>No Rank</RankRewardTitle>

                <RankContent>Basic access and usage</RankContent>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                lg={2}
                style={{ marginRight: '1.5em', marginBottom: '7.4em' }}
              >
                <RankRewardsItem>
                  <h2>150</h2>
                </RankRewardsItem>
              </Grid>
              <Grid item lg={8}>
                <RankRewardTitle>Bronze</RankRewardTitle>

                <RankContent>Spin the wheel for ranking up</RankContent>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                lg={2}
                style={{ marginRight: '1.5em', marginBottom: '7.4em' }}
              >
                <RankRewardsItem>
                  <h2>350</h2>
                </RankRewardsItem>
              </Grid>
              <Grid item lg={8}>
                <RankRewardTitle>Silver</RankRewardTitle>

                <RankContent>Spin the wheel for ranking up</RankContent>
                <RankContent>Birthday discounts</RankContent>
                <RankContent>2x trip points</RankContent>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                lg={2}
                style={{ marginRight: '1.5em', marginBottom: '7.4em' }}
              >
                <RankRewardsItem>
                  <h2>750</h2>
                </RankRewardsItem>
              </Grid>
              <Grid item lg={8}>
                <RankRewardTitle>Gold</RankRewardTitle>
                <RankContent> Spin the wheel for ranking up</RankContent>
                <RankContent>
                  Higher connectivity with higher ranked owners
                </RankContent>
                <RankContent>Birthday & holiday discounts</RankContent>
                <RankContent>2x trip points</RankContent>
              </Grid>
            </Grid>
            <Grid container>
              <Grid
                item
                lg={2}
                style={{ marginRight: '1.5em', marginBottom: '7.5em' }}
              >
                <RankRewardsItem>
                  <h2>1500</h2>
                </RankRewardsItem>
              </Grid>
              <Grid item lg={8}>
                <RankRewardTitle>Platinum</RankRewardTitle>
                <RankContent>Spin the wheel for ranking up</RankContent>
                <RankContent>Best discounts and free add-ons</RankContent>
                <RankContent>Exclusive access to all yachts, boats and activities</RankContent>
                <RankContent>Higher connectivity with higher ranked owners</RankContent>
                <RankContent>Birthday & holiday discounts</RankContent>
                <RankContent>$100 gift card</RankContent>
              </Grid>
            </Grid>
          </Grid>

          <Grid item>
            <Paper
              style={{
                height: '918px',
                width: '629px',
                backgroundColor: '#FAFAFA',
              }}
            >
              <span>Image/Video</span>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );

}

export const RankContent = styled.p`
  color: blue;
  position: relative;
  margin-left: 1em;

  &:before {
    content: '';
    width: 1em;
    height: 1em;
    border-radius: 100%;
    background-color: blue;
    display: block;
    position: absolute;
    left: -2em;
  }
`;

export const RankRewardTitle = styled.h1`
  font-size: 1.3em;
  font-weight: bold;
  position: relative;
  left: -1em;
`;

export const RankRewardsItem = styled.div`
  width: 4.5em;
  height: 4.5em;
  border-radius: 100%;
  border: 3px solid #d0d0d0;
  
  position: relative;
  top: 1.5em;
  margin-left: 1em;
 

  h2 {
    position: absolute;
    color: #d0d0d0;
    top: -0.1em;
    left: 0.5em;
    font-size:1.2em;
  }
  &:before {
    width: 0.2em;
    height: 7.8em;
    content: '';
    display: block;
    position: absolute;
    background: #d09e84;
    top: 4.2em;
    left: 2em;
  }

  h2:first-child{
      color:red;
  }
`;