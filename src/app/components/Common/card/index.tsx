import * as React from 'react';
import styled from 'styled-components/macro';
import { Link } from 'react-router-dom'
import './card.scss'

interface Props {
  source:string;
  heading:string;
  content?:React.ReactNode
  link?:string;
  alt:boolean;
}

export const Card: React.FC<Props> = (props) => {

  const {source, heading, content, link, alt } = props;

  return(
    <Link to={link || '#'}>
    <div className={alt === true ? 'card-container alt': 'card-container'} style={{backgroundImage:`url(${source})`}} >
          <div className={alt === true ? 'card-content-container alt': 'card-content-container'}>
             <h2>{heading}</h2>
             {content
             ? <div>{content}</div>
             : null
             }
           </div>
    </div>
    </Link>
  )

}
