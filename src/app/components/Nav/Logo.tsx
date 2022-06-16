import * as React from 'react';
import styled from 'styled-components/macro';
import { media, sizes } from '../../../styles/media';

interface Props{
  owner?: boolean;
}

export function Logo(props:Props) {
  return (
    <Wrapper>
      <LogoLink href="/">
        {props.owner && props.owner === true
        ? <LogoImg src={process.env.PUBLIC_URL + '/logo-owner.svg'}/>
        : <LogoImg src={process.env.PUBLIC_URL + '/logo.svg'}/>
        }

      </LogoLink>
    </Wrapper>
  );
}

const LogoImg = styled.img`
  height:50px;
  @media (max-width: ${sizes.small}px) {
    height:30px;
  }
`;

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  flex-wrap:wrap;
  margin-right:10px;

`;

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  flex-wrap:no-wrap;
`;


const Title = styled.div`
  font-size: 1.5rem;
  color: #fff;
  font-weight: bold;
  margin-right: 1rem;
`;

const Description = styled.div`
  font-size: 0.875rem;
  color: #fff;
  font-weight: normal;
`;

const LogoTitle = styled.p`
  font-size: 1.35rem;
  color: #000;
  font-weight: bold;
  margin-left:5px;
  margin-top:-5px;

  @media (max-width: ${sizes.small}px) {
    font-size: 1.35rem;
  }

`;
