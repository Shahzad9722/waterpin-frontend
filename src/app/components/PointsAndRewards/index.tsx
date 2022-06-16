/**
 *
 * SpinTheWheel
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';
import {
  Box,
  Button,
  IconButton,
  Grid,
  Skeleton
} from '@mui/material';

interface Props {}

export function PointsAndRewards(props: Props) {
  return <></>;
}

interface ProgressProps {
  rank:string;
}

export function RankingProgress(props: ProgressProps) {
  return(<>
      <Grid container spacing={0}>
        <Grid item xs={12} sm={'auto'}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} textAlign={'center'}>
            {props.rank
              ? <RewardProgressIcon src={process.env.PUBLIC_URL + '/icons/rewards/teal-circle.svg'} />
              : <Skeleton variant="circular" width={30} height={30} />
            }
          </Box>
        </Grid>
        <Grid item flex={1} display={'flex'} pt={2}>
          <Line/>
        </Grid>
        <Grid item xs={12} sm={'auto'}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} textAlign={'center'}>
            {props.rank
              ? <RewardProgressIcon src={process.env.PUBLIC_URL + '/icons/rewards/bronze-circle.svg'} />
              : <Skeleton variant="circular" width={30} height={30} />
            }
          </Box>
        </Grid>
        <Grid item flex={1} display={'flex'} pt={2}>
          <Line/>
        </Grid>
        <Grid item xs={12} sm={'auto'}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} textAlign={'center'}>
            {props.rank
              ? <RewardProgressIcon src={process.env.PUBLIC_URL + '/icons/rewards/silver-circle.svg'} />
              : <Skeleton variant="circular" width={30} height={30} />
            }
          </Box>
        </Grid>
        <Grid item flex={1} display={'flex'} pt={2}>
          <Line/>
        </Grid>
        <Grid item xs={12} sm={'auto'}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} textAlign={'center'}>
            {props.rank
              ? <RewardProgressIcon src={process.env.PUBLIC_URL + '/icons/rewards/gold-circle.svg'} />
              : <Skeleton variant="circular" width={30} height={30} />
            }
          </Box>
        </Grid>
        <Grid item flex={1} display={'flex'} pt={2}>
          <Line/>
        </Grid>
        <Grid item xs={12} sm={'auto'}>
          <Box display={'flex'} flexDirection={'column'} alignItems={'center'} textAlign={'center'}>
            {props.rank
              ? <RewardProgressIcon src={process.env.PUBLIC_URL + '/icons/rewards/plat-circle.svg'} />
              : <Skeleton variant="circular" width={30} height={30} />
            }
          </Box>
        </Grid>
      </Grid>
      <Box display={'flex'} flexDirection={'row'} justifyContent={'space-between'} alignItems={'flex-start'} textAlign={'left'} flexWrap={'wrap'} width={'100%'}>
        <Box width={'60px'} textAlign={'left'}>
          <p>Start</p>
        </Box>
        <Box textAlign={'center'}>
          <p>Bronze</p>
        </Box>
        <Box width={'90px'} textAlign={'center'}>
          <p>Silver</p>
        </Box>
        <Box textAlign={'center'}>
          <p>Gold</p>
        </Box>
        <Box textAlign={'center'}>
          <p>Platinum</p>
        </Box>
      </Box>
    </>);
}

const Line = styled.div`
  width: 100%;
  height: 3px;
  background: #E0E0E0;
  border-radius: 1.5px;
`;

const RewardProgressIcon = styled.img`
  width: 30px;
  height: 30px;
`;
