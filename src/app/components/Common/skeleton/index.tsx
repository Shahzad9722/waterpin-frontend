import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  source:string;
  heading:string;
  content:React.ReactNode
}

export const Skeleton: React.FC<Props> = (props) => {

  const {source, heading, content } = props;

  return(
    <div className='skeleton-container'>
          <img src={source}/>
          <h2>{heading}</h2>
          <div className='skeleton-content-container'>
            {content}
          </div>
    </div>
  )

}
