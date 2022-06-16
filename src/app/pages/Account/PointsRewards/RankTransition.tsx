import * as React from 'react';
import styled from 'styled-components/macro';
import { Grid, Button } from '@mui/material';
interface Props {
  color: any;
}

export default function RankTransition(props: Props) {
    
    return (
      <svg
        width="21"
        height="21"
        viewBox="0 0 21 21"
        fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{marginRight:'0.2em'}}
      >
        <path
          d="M20.6883 9.75744L11.238 0.307135C10.8285 -0.102378 10.1617 -0.102378 9.75744 0.307135L0.307135 9.75744C-0.102378 10.167 -0.102378 10.8337 0.307135 11.2433L9.75744 20.6883V20.6936C10.167 21.1031 10.8337 21.1031 11.2433 20.6936L20.6936 11.2433C21.103 10.8285 21.103 10.167 20.6883 9.75744ZM12.5977 13.1228V10.4977H8.39763V13.6478H6.29754V9.4477C6.29754 8.86493 6.76479 8.39768 
        7.34756 8.39768H12.5977V5.77256L16.2729 9.4477L12.5977 13.1228Z"
          fill={props.color}
        />
      </svg>
    );


}