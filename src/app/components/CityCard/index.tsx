/**
 *
 * CityCard
 *
 */
import * as React from 'react';
import styled from 'styled-components/macro';

interface Props {
  title?: string;
  image?: string;
}

export function CityCard(props: Props) {
  return (
    <>
      <Div>
        <DestinationImages>
          <DestinationVectorImages src={props.image} />
        </DestinationImages>
        <DestinationVectorText>{props.title}</DestinationVectorText>
      </Div>
    </>
  );
}

const Div = styled.div`
  &:hover {
    opacity: 0.8;
    color: #00c2cb;
  }
`;

const DestinationVectorImages = styled.img`
  border-radius: 20px;
  border: 1px solid;
  padding: 10px 10px 10px 10px;
  justify-content: center;
  box-sizing: border-box;
  box-shadow: 0px 0px 20px rgba(179, 179, 179, 0.25);
  width: 155px;
  height: 140px;
  cursor: pointer;
  @media only screen and (max-width: 600px) {
    width: 265px;
    height: 220px;
  }
`;

const DestinationImages = styled.div`
  background: #ffffff;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const DestinationVectorText = styled.p`
  text-align: center;
  justify-content: center;
  font-size: 18px;
  line-height: 21px;
  font-family: GilroyMedium;
  cursor: pointer;
`;
