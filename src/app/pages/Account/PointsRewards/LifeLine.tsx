import * as React from 'react';
import styled from 'styled-components/macro';
import {Grid,Paper,
} from '@mui/material';
export default function LifeLine() { 

    return (
      <Grid
        container
        justifyContent="center"
        style={{
          background:
            'linear-gradient(180deg, #00C2CB 0%, rgba(0, 194, 203, 0.76) 51.04%, #00C2CB 100%)',
          height: '375px',
        }}
      >
        <Grid item>
          <h2>Lifeline</h2>
        </Grid>
        <Grid container justifyContent="center">
          <Grid item>
            <Paper
              style={{
                width: '45em',
                height: '26em',
                padding: '2em',
                position: 'relative',
                top: '5em',
                boxShadow: '0px 0px 20px rgba(179, 179, 179, 0.25)',
                borderRadius: '20px',
                textAlign: 'start',
              }}
            >
              <Grid container>
                <Grid item>
                  <img
                    style={{
                      marginRight: '1em',
                      top: '1.5em',
                      position: 'relative',
                    }}
                    src={process.env.PUBLIC_URL + '/icons/lifeline.svg'}
                  />
                </Grid>
                <Grid item lg={10}>
                  <LifeLineContent>
                    You start out with 5 lives and they are like your lifeline.
                  </LifeLineContent>
                 
                </Grid>
              </Grid>

              <Grid container>
                <Grid item>
                  <img
                    style={{
                      marginRight: '1em',
                      top: '1.5em',
                      position: 'relative',
                    }}
                    src={process.env.PUBLIC_URL + '/icons/lifeline.svg'}
                  />
                </Grid>
                <Grid item lg={10}>
                  <LifeLineContent>
                    Your lives start over at 5 every 3 months or every time you
                    rank up.
                  </LifeLineContent>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item>
                  <img
                    style={{
                      marginRight: '1em',
                      top: '1.5em',
                      position: 'relative',
                    }}
                    src={process.env.PUBLIC_URL + '/icons/lifeline.svg'}
                  />
                </Grid>
                <Grid item lg={10}>
                  <LifeLineContent>
                    If you lose all 5 lives, you go down a ranking.
                  </LifeLineContent>
                </Grid>
              </Grid>

              <Grid container>
                <Grid item>
                  <img
                    style={{
                      marginRight: '1em',
                      top: '1.5em',
                      position: 'relative',
                    }}
                    src={process.env.PUBLIC_URL + '/icons/lifeline.svg'}
                  />
                </Grid>
                <Grid item lg={10}>
                  <LifeLineContent>
                    You lose 1 life by getting a Bad Review (2 or 1 star
                    reviews), a Trip Cancellation, or by responding later than
                    24 hours.
                  </LifeLineContent>
                </Grid>
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    );

}


export const LifeLineContent = styled.p`
    
font-weight:bold;
font-size:1.1em;
line-height:36px;
    `