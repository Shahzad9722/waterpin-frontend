import * as React from 'react';
import styled from 'styled-components/macro';
import { Grid, Button } from '@mui/material';
import RankTransition from './RankTransition';
import { returnStatusImage } from './ReturnRewardsStatus';
import { CustomModal } from '../../../components/modals';

interface Props {
  user: any;
  rewardItems: [];
  userRank: any;
}
export default function BronzeReward(props: Props) {
  return (
    <>
      <Grid container style={{ background: '#F5F5F7' }}>
        <Grid
          container
          flexDirection="row"
          style={{ padding: '2em' }}
          justifyContent="center"
          item
          textAlign="center"
        >
          <Grid item>
            <h2 style={{ fontSize: 30, color: '#C49F8D ' }}>
              Silver ️<RankTransition color="#F5CB4B" />
              <span style={{ color: '#F5CB4B' }}>Gold</span> : How To Level Up
            </h2>
          </Grid>

          {props.rewardItems
            ? props.rewardItems.map(rankItem => {
                const { reward } = rankItem;
                const { reward_name } = reward;
                const { points } = reward;
                const { rank } = reward;
                const { status } = rankItem;
                const { actionsCompleted } = rankItem;
                const { actionsRequired } = reward;

                return (
                  <>
                    {props.userRank === rank ? (
                      <RankUpItem>
                        <Grid item>
                          <img
                            style={{ paddingRight: '1em' }}
                            src={returnStatusImage(
                              status,
                              actionsCompleted,
                              actionsRequired,
                            )}
                            alt="silver-rank"
                          />
                          <span>
                            ({actionsCompleted}/{actionsRequired})
                          </span>
                          <span
                            className={
                              actionsCompleted === actionsRequired
                                ? 'completed'
                                : ''
                            }
                          >
                            &nbsp; {reward_name}
                          </span>
                        </Grid>
                        <Grid item>
                          <span
                            style={{
                              color: 'green',
                              fontWeight: 'bold',
                              fontSize: 20,
                              paddingLeft: 1,
                            }}
                          >
                            {points}{' '}
                            <span style={{ color: '#E5E5E5' }}>Points</span>
                          </span>
                        </Grid>
                      </RankUpItem>
                    ) : null}
                  </>
                );
              })
            : null}

          <Grid container justifyContent="flex-end" style={{ padding: '1em' }}>
            <Grid item lg={3}>
              <Button
                disabled
                fullWidth
                variant="contained"
                disableElevation={true}
                style={{
                  padding: '1em',
                  background: '#27AE60',
                  borderRadius: 10,
                }}
              >
                <span
                  style={{
                    fontSize: 15,
                    fontWeight: 'bold',
                  }}
                >
                  Rank Up!
                </span>
              </Button>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
      <CustomModal open={false} onClose={false}>
        <Grid
          container={true}
          justifyContent="center"
          direction="column"
          alignItems="center"
        >
          <h1 style={{ color: 'rgba(51, 51, 51, 1)' }}>Congratulations!</h1>
          <Grid item>
            <h2 style={{ color: 'rgba(51, 51, 51, 1)' }}>
              you are now a Bronze member
            </h2>
          </Grid>
          <Grid item>
            <Button
              className="button"
              variant="contained"
              style={{
                padding: '1.5em',
                height: '4em',
                width: '20em',
                marginBottom: '-8em',
              }}
            >
              <span className="rank-button-title"> Review Benifits</span>
            </Button>
          </Grid>
          <Grid item>
            <img src="/congratulation.svg" alt="rank benifits" />
          </Grid>
        </Grid>
      </CustomModal>
    </>
  );
}

export const RankUpItem = styled.div`
  width: 45em;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  border-radius: 15px 15px 0px 0px;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  padding: 1em;

  font-family: Gilroy-Regular;
  margin-top: 1em;
`;
