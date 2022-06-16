import * as React from 'react';
import styled from 'styled-components/macro';
import './css/rewards.css';
import {Grid} from '@mui/material';
import {SettingsBox, SettingsCard} from '../index';

interface Props {
  user: any;
}

export default function PointsHeader(props: Props) {
  return (
    <SettingsCard>
      <Grid
        container
        justifyContent="center"
        flexDirection="column"
        alignItems="center"
      >
        <Grid item>
          <h2>Earn Points and Maximize Your Benefits!</h2>
        </Grid>

        <Grid
          container
          justifyContent="center"
          style={{ position: 'relative' }}
        >
          <Grid item lg={1.7} style={{ position: 'relative' }}>
            {props.user.rank === 'new' ? <HeadImage /> : null}
            <RankItem
              color="#C49F8D"
              lineColor="linear-gradient(180deg, #D5D5D7 0%, #F5F5F5 48.96%, #A2A2A4 100%)"
            >
              <h2 className="headPoint">0</h2>
            </RankItem>

            <RankTitle color="#D0D0D0">Start</RankTitle>
          </Grid>
          <Grid item lg={1.7}>
            {props.user.rank === 'bronze' ? <HeadImage /> : null}
            <RankItem
              color="#C49F8D"
              lineColor="linear-gradient(180deg, #D5D5D7 0%, #F5F5F5 48.96%, #A2A2A4 100%)"
            >
              <h2>150</h2>
            </RankItem>
            <RankTitle color="#C49F8D">Bronze</RankTitle>
          </Grid>
          <Grid item lg={1.7} style={{ position: 'relative' }}>
            {props.user.rank === 'silver' ? <HeadImage /> : null}
            <RankItem
              color="#C1C1C2"
              lineColor="linear-gradient(180deg, #F3C63D 0%, #FFEBAD 54.17%, rgba(226, 176, 23, 0.94) 100%)"
            >
              <h2>350</h2>
            </RankItem>
            <RankTitle color="#C1C1C2">Silver</RankTitle>
          </Grid>
          <Grid item lg={1.7} style={{ position: 'relative' }}>
            {props.user.rank === 'gold' ? <HeadImage /> : null}
            <RankItem
              color="#F5CB4B"
              lineColor="linear-gradient(180deg, #9815C3 0%, #CD2CFF 48.96%, #571670 100%)"
            >
              <h2>750</h2>
            </RankItem>
            <RankTitle
              style={{ left: '0.2em', position: 'relative' }}
              color="#F5CB4B"
            >
              Gold
            </RankTitle>
          </Grid>
          <Grid item lg={1.7} textAlign="left">
            {props.user.rank === 'platinum' ? <HeadImage /> : null}
            <LastHead>
              <h2>1500</h2>
            </LastHead>
            <RankTitle
              style={{ left: '-0.5em', position: 'relative' }}
              color="#B622E5"
            >
              Platinum
            </RankTitle>
          </Grid>
        </Grid>
      </Grid>
    </SettingsCard>
  );
}

export const RankTitle = styled.h1<{ color }>`
  color: ${props => props.color};
  font-size: 1em;
  font-weight: bold;
  margin-left: 0.7em;
`;

export const RankItem = styled.div<{ lineColor; color }>`
  width: 4em;
  height: 4em;
  border-radius: 100%;
  border: 3px solid #d0d0d0;
  position: relative;
  margin-top: 5em;

  h2 {
    font-size: 1em;
    position: absolute;
    top: 0.2em;
    left: 1em;
    color: ${props => props.color};
    &:after {
      content: '';
      position: absolute;
      width: 2.5em;
      height: 0.2em;
      background: ${props => props.lineColor};
      top: 0.7em;
      left: 2.7em;
    }
  }
`;

export const HeadImage = styled.div`
  position: absolute;
  background-image: url(${process.env.PUBLIC_URL}/boat_color.svg);
  background-size: contain;
  background-repeat: no-repeat;
  width: 4em;
  height: 4em;
  top: 0;
`;

export const LastHead = styled.div`
  position: relative;
  width: 4em;
  height: 4em;
  border-radius: 100%;
  border: 3px solid #d0d0d0;
  margin-top: 5em;
  &:before {
    content: '';
    width: 3em;
    height: 3em;
    position: absolute;
    background-image: url(${process.env.PUBLIC_URL}/banner.svg);
    background-size: contain;
    background-repeat: no-repeat;
    top: -5em;
    left: 1em;
  }
  h2 {
    color: #b622e5;
    font-size: 1em;
    white-space: nowrap;
    top: 0.2em;
    left: 0.8em;
    position: absolute;
  }
`;
