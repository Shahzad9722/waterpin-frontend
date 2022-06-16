import * as React from 'react';
import {Fade} from '@mui/material';
import PointsHeader from "./PointsHeader"
import LevelUp from './LevelUp';


interface Props {
  user:any,
  actions:any
}

export function PointsRewards(props: Props) {


  console.log(props)
  return (
    <Fade in={true}>
      <div>
       <PointsHeader user={props.user} />
       <LevelUp user={props.user} /> 
      </div>
    </Fade>
  );
}
